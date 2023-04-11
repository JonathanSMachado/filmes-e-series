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

export function convertMediaTypeToSlug(mediaType: string): "filmes" | "series" {
  const mediaTypeMap: Record<string, "filmes" | "series"> = {
    movie: "filmes",
    tv: "series",
  };

  return mediaTypeMap[mediaType];
}

export function convertMediaType(mediaType: string): "Filmes" | "Séries" {
  const mediaTypeMap: Record<string, "Filmes" | "Séries"> = {
    movie: "Filmes",
    tv: "Séries",
  };

  return mediaTypeMap[mediaType];
}
