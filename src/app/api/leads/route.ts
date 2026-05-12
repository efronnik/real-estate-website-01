import { NextResponse } from "next/server";
import { sanitizeText, validateAndSanitizeLead } from "@/lib/lead-validation";

type LeadRequestBody = {
  data?: Record<string, unknown>;
};

const STRAPI_URL = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MAX_CONTENT_LENGTH_BYTES = 16 * 1024;
const MAX_PAYLOAD_KEYS = 16;
const ALLOWED_INPUT_KEYS = new Set([
  "fullName",
  "phone",
  "leadType",
  "sourcePage",
  "website",
  "email",
  "message",
  "city",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "consentData",
]);
const requestTimestampsByIp = new Map<string, number[]>();
const ALLOWED_ORIGINS = new Set([SITE_URL, "http://localhost:3000", "http://127.0.0.1:3000"]);

type LeadLogLevel = "info" | "warn" | "error";
type SafeLogPrimitive = string | number | boolean | null;
type SafeLogValue = SafeLogPrimitive | SafeLogPrimitive[];

const PII_LOG_KEYS = new Set([
  "fullName",
  "phone",
  "email",
  "message",
  "city",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "consentData",
  "rawData",
  "payload",
  "body",
]);

function maskIp(ip: string): string {
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.x.x`;
    }
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return `${parts.slice(0, 3).join(":")}:x:x`;
  }
  return "unknown";
}

function toSafeLogValue(value: unknown): SafeLogValue | undefined {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) {
    const normalized = value
      .map((item) => (typeof item === "string" || typeof item === "number" || typeof item === "boolean" ? item : null))
      .filter((item): item is SafeLogPrimitive => item !== undefined);
    return normalized;
  }
  return undefined;
}

function sanitizeLogMeta(meta: Record<string, unknown>): Record<string, SafeLogValue> {
  const safe: Record<string, SafeLogValue> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (PII_LOG_KEYS.has(key)) continue;
    const normalized = toSafeLogValue(value);
    if (normalized !== undefined) {
      safe[key] = normalized;
    }
  }
  return safe;
}

function logLeadEvent(level: LeadLogLevel, event: string, meta: Record<string, unknown>) {
  const payload = {
    domain: "lead-api",
    level,
    event,
    ...sanitizeLogMeta(meta),
  };
  if (level === "error") {
    console.error(JSON.stringify(payload));
    return;
  }
  if (level === "warn") {
    console.warn(JSON.stringify(payload));
    return;
  }
  console.info(JSON.stringify(payload));
}

function getRequestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    const parsed = new URL(origin);
    return parsed.origin;
  } catch {
    return null;
  }
}

function buildCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : null;
  return {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    ...(allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin } : {}),
  };
}

function jsonResponse(
  request: Request,
  requestId: string,
  body: Record<string, unknown>,
  status: number,
  extraHeaders: HeadersInit = {},
) {
  const origin = getRequestOrigin(request);
  return NextResponse.json(body, {
    status,
    headers: {
      ...buildCorsHeaders(origin),
      "X-Request-Id": requestId,
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }

  return "unknown";
}

function getUnknownKeys(input: Record<string, unknown>): string[] {
  return Object.keys(input).filter((key) => !ALLOWED_INPUT_KEYS.has(key));
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const existing = requestTimestampsByIp.get(ip) ?? [];
  const recent = existing.filter((timestamp) => timestamp >= windowStart);
  const limited = recent.length >= RATE_LIMIT_MAX_REQUESTS;

  if (!limited) {
    recent.push(now);
  }

  requestTimestampsByIp.set(ip, recent);
  return limited;
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const requestId = crypto.randomUUID();
  const maskedIp = maskIp(clientIp);
  const requestOrigin = getRequestOrigin(request);

  if (requestOrigin && !ALLOWED_ORIGINS.has(requestOrigin)) {
    logLeadEvent("warn", "origin_rejected", { requestId, ip: maskedIp, origin: requestOrigin });
    return jsonResponse(request, requestId, { error: "Origin not allowed." }, 403);
  }

  const rawContentLength = request.headers.get("content-length");
  const contentLength = rawContentLength ? Number(rawContentLength) : 0;
  if (Number.isFinite(contentLength) && contentLength > MAX_CONTENT_LENGTH_BYTES) {
    logLeadEvent("warn", "payload_too_large", { requestId, ip: maskedIp, contentLength });
    return jsonResponse(request, requestId, { error: "Payload too large." }, 413);
  }

  if (isRateLimited(clientIp)) {
    logLeadEvent("warn", "rate_limited", { requestId, ip: maskedIp });
    return jsonResponse(
      request,
      requestId,
      { error: "Too many requests. Please try again later." },
      429,
      { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
    );
  }

  let body: LeadRequestBody;
  let rawBodyText = "";
  try {
    rawBodyText = await request.text();
    const bodySize = new TextEncoder().encode(rawBodyText).length;
    if (bodySize > MAX_CONTENT_LENGTH_BYTES) {
      logLeadEvent("warn", "payload_too_large_runtime", { requestId, ip: maskedIp, bodySize });
      return jsonResponse(request, requestId, { error: "Payload too large." }, 413);
    }
    body = JSON.parse(rawBodyText) as LeadRequestBody;
  } catch {
    logLeadEvent("warn", "invalid_json", { requestId, ip: maskedIp });
    return jsonResponse(request, requestId, { error: "Invalid JSON body." }, 400);
  }

  const rawData = body?.data;
  if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) {
    logLeadEvent("warn", "invalid_payload", { requestId, ip: maskedIp });
    return jsonResponse(request, requestId, { error: "Invalid payload." }, 400);
  }

  const payloadKeys = Object.keys(rawData);
  if (payloadKeys.length > MAX_PAYLOAD_KEYS) {
    logLeadEvent("warn", "payload_keys_exceeded", { requestId, ip: maskedIp, count: payloadKeys.length });
    return jsonResponse(request, requestId, { error: "Payload has too many fields." }, 400);
  }

  const unknownKeys = getUnknownKeys(rawData);
  if (unknownKeys.length > 0) {
    logLeadEvent("warn", "payload_unknown_keys", { requestId, ip: maskedIp, unknownKeys });
    return jsonResponse(
      request,
      requestId,
      {
        error: "Payload contains unsupported fields.",
        details: unknownKeys,
      },
      400,
    );
  }

  const result = validateAndSanitizeLead(rawData);
  if (!result.ok) {
    logLeadEvent("warn", "validation_failed", { requestId, ip: maskedIp, reasons: result.errors });
    return NextResponse.json(
      {
        error: "Validation failed.",
        details: result.errors,
      },
      { status: 400, headers: { ...buildCorsHeaders(requestOrigin), "X-Request-Id": requestId, "X-Content-Type-Options": "nosniff" } },
    );
  }

  // Honeypot: bots often fill hidden text fields.
  const honeypotValue = sanitizeText(rawData.website, 255);
  if (honeypotValue) {
    logLeadEvent("warn", "honeypot_triggered", { requestId, ip: maskedIp });
    return jsonResponse(request, requestId, { ok: true }, 200);
  }

  let response: Response;
  try {
    response = await fetch(`${STRAPI_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: result.payload }),
      cache: "no-store",
    });
  } catch {
    logLeadEvent("error", "strapi_unreachable", { requestId, ip: maskedIp });
    return jsonResponse(request, requestId, { error: "Lead submit failed." }, 502);
  }

  if (!response.ok) {
    logLeadEvent("error", "strapi_error_response", { requestId, ip: maskedIp, status: response.status });
    return jsonResponse(request, requestId, { error: "Lead submit failed." }, 502);
  }

  logLeadEvent("info", "lead_created", {
    requestId,
    ip: maskedIp,
    leadType: result.payload.leadType,
    sourcePage: result.payload.sourcePage,
  });
  return jsonResponse(request, requestId, { ok: true }, 201);
}

export async function OPTIONS(request: Request) {
  const requestId = crypto.randomUUID();
  const origin = getRequestOrigin(request);
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new NextResponse(null, { status: 403, headers: buildCorsHeaders(origin) });
  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...buildCorsHeaders(origin),
      "X-Request-Id": requestId,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
