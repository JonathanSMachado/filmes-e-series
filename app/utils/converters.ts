import { slugify } from "./general";
import { TMDBItem, TMDBResponseItem } from "./types";

export function convertTypeToTMDB(type: string): string {
  switch (type) {
    case "series":
      return "tv";
    default:
      return "movie";
  }
}

export function translatePeriodToEN(period: string): string {
  switch (period) {
    case "semana":
      return "week";
    default:
      return "day";
  }
}

export function convertMediaType(mediaType: string): "Filmes" | "Séries" {
  const mediaTypeMap: Record<string, "Filmes" | "Séries"> = {
    movie: "Filmes",
    tv: "Séries",
  };

  return mediaTypeMap[mediaType];
}

export function mapToTMDBItem(item: TMDBResponseItem): TMDBItem {
  const POSTER_URL = ENV.TMDB_POSTER_IMAGES_URL;
  const BACKDROP_URL = ENV.TMDB_BACKDROP_IMAGES_URL;

  const {
    id,
    title,
    name,
    adult,
    vote_average,
    poster_path,
    media_type,
    popularity,
    release_date,
    first_air_date,
    backdrop_path,
  } = item;

  const mediaType = convertMediaType(title ? "movie" : "tv");

  return {
    id: id,
    title: title || name || "",
    adult: adult || false,
    vote_average: vote_average,
    poster_path: POSTER_URL + poster_path,
    media_type_slug: slugify(mediaType),
    media_type: mediaType,
    popularity: popularity,
    release_date: release_date ?? first_air_date,
    backdrop_path: BACKDROP_URL + backdrop_path,
  };
}
