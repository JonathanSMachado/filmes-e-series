export function convertTypeToTMDB(type: string): string {
  switch (type) {
    case "series":
      return "tv";
    default:
      return "movie";
  }
}

export function convertPeriodToTMDB(period: string): string {
  switch (period) {
    case "semana":
      return "week";
    default:
      return "day";
  }
}
