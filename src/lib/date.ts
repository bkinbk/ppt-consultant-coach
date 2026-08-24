const TIMEZONE = "Asia/Bangkok";

export function bangkokDateString(d: Date = new Date()): string {
  // en-CA locale formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function bangkokDayIndex(d: Date = new Date()): number {
  const [y, m, day] = bangkokDateString(d).split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, day) / 86_400_000);
}

export function addDaysToDateString(dateStr: string, days: number): string {
  const [y, m, day] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, day + days));
  return dt.toISOString().slice(0, 10);
}
