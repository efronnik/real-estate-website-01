export const UTM_STORAGE_KEY = "find_utm_v1";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type UtmRecord = Partial<Record<UtmKey, string>>;

const MAX_LEN = 120;

function trimValue(raw: string): string {
  return raw.trim().slice(0, MAX_LEN);
}

export function parseUtmFromSearchParams(searchParams: URLSearchParams): UtmRecord {
  const out: UtmRecord = {};
  for (const key of UTM_KEYS) {
    const raw = searchParams.get(key);
    if (raw == null) continue;
    const v = trimValue(raw);
    if (v) {
      out[key] = v;
    }
  }
  return out;
}

function readSessionUtm(): UtmRecord {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    const out: UtmRecord = {};
    for (const key of UTM_KEYS) {
      const v = (parsed as Record<string, unknown>)[key];
      if (typeof v === "string" && v.trim()) {
        out[key] = trimValue(v);
      }
    }
    return out;
  } catch {
    return {};
  }
}

function writeSessionUtm(utm: UtmRecord) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // quota / private mode
  }
}

/** URL values override stored values per key (last-touch within session). */
function mergeUtm(stored: UtmRecord, fromUrl: UtmRecord): UtmRecord {
  return { ...stored, ...fromUrl };
}

/**
 * Persist any UTM params from the current navigation into sessionStorage.
 * Call from a client effect when the query string changes.
 */
export function persistUtmFromSearchParams(searchParams: URLSearchParams) {
  const fromUrl = parseUtmFromSearchParams(searchParams);
  if (Object.keys(fromUrl).length === 0) {
    return;
  }
  const merged = mergeUtm(readSessionUtm(), fromUrl);
  writeSessionUtm(merged);
}

/**
 * Session attribution merged with the current window URL (URL wins per key).
 * Persists when the URL introduces new non-empty UTM params.
 */
export function resolveCurrentUtm(): UtmRecord {
  if (typeof window === "undefined") {
    return {};
  }
  const stored = readSessionUtm();
  const fromUrl = parseUtmFromSearchParams(new URLSearchParams(window.location.search));
  const merged = mergeUtm(stored, fromUrl);
  if (Object.keys(fromUrl).length > 0) {
    writeSessionUtm(merged);
  }
  return merged;
}

export function utmRecordForGa(utm: UtmRecord): Partial<Record<UtmKey, string>> {
  const out: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const v = utm[key];
    if (v) {
      out[key] = v;
    }
  }
  return out;
}

export function applyUtmToLeadFormFields(form: HTMLFormElement, utm: UtmRecord) {
  for (const key of UTM_KEYS) {
    const el = form.elements.namedItem(key);
    if (el instanceof HTMLInputElement) {
      el.value = utm[key] ?? "";
    }
  }
}
