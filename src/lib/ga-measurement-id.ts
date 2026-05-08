const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function getGaMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!raw || !GA_ID_PATTERN.test(raw)) {
    return null;
  }
  return raw;
}

export function isValidGaMeasurementId(id: string): boolean {
  return GA_ID_PATTERN.test(id);
}
