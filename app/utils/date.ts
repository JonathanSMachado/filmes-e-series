export function formatDateToPtBr(date: string): string {
  if (!date || typeof date !== "string") {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T23:59:59"));
}

export function convertMinutesToFormattedHours(minutes: number): string {
  if (minutes === 0) {
    return "";
  }

  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  return `${hours}h ${minutesLeft}m`;
}
