import { format, formatDistanceToNow, isFuture, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

function formatDateToPtBR(dateString: string): string {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString + "T23:59:59"));
}

function convertMinutesToFormattedHours(minutes: number): string {
  if (minutes <= 0) return "0h";

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

function formatReleaseDate(dateString: string) {
  const date = parseISO(dateString);

  if (isFuture(date)) {
    return `Estreia ${formatDistanceToNow(date, { addSuffix: true, locale: ptBR })}`;
  }

  return format(date, "dd 'de' MMMM, yyyy", { locale: ptBR });
}

export { convertMinutesToFormattedHours, formatDateToPtBR, formatReleaseDate };
