function formatDateToPtBR(dateString: string): string {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString + "T23:59:59"));
}

/**
 * Converte minutos para o formato 'Xh Ym'
 * @param totalMinutes Minutos totais (ex: 130)
 * @returns String formatada (ex: '2h 10m')
 */
function convertMinutesToFormattedHours(totalMinutes: number): string {
  if (!totalMinutes || totalMinutes <= 0) return "N/A";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

/**
 * Formata uma string de data ISO para o padrão local
 * @param dateString Data no formato '2024-05-20'
 * @returns String formatada '20/05/2024'
 */
function formatReleaseDate(dateString: string): string {
  if (!dateString) return "Data desconhecida";

  try {
    const date = new Date(dateString);

    // Usamos o locale pt-BR para garantir o formato dia/mês/ano
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC", // Importante: datas do TMDB não têm hora, use UTC para evitar erros de fuso
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

export { convertMinutesToFormattedHours, formatDateToPtBR, formatReleaseDate };
