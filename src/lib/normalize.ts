// Shared normalization used everywhere a Lead or Order needs to be matched
// against another record by contact info — keep both sides of every
// comparison passing through these same two functions.

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Digits-only, with a leading US country code ("1" + 10 digits) collapsed
// to the bare 10-digit number, so "+1 (555) 123-4567", "15551234567", and
// "555-123-4567" all normalize identically. Deliberately simple (no
// libphonenumber dependency) — good enough for matching, not for
// validating international numbers.
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }
  return digits;
}
