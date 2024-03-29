import {
  convertMediaType,
  convertTypeToTMDB,
  mapToTMDBItem,
  translatePeriodToEN,
} from "~/utils/converters";
import { getVideoBaseUrl, slugify } from "~/utils/general";
import { TMDBItem, TMDBItemDetails, TMDBVideo } from "~/utils/types";

const TYPES = ["movie", "tv"];
const POSTER_URL = ENV.TMDB_POSTER_IMAGES_URL;
const BACKDROP_URL = ENV.TMDB_BACKDROP_IMAGES_URL;

export async function getMostPopular({
  type,
  page,
  limit,
}: {
  type?: string | null;
  page?: number;
  limit?: number;
}): Promise<TMDBItem[]> {
  try {
    let items: TMDBItem[] = [];

    if (type) {
      items = await fetchPopularItemsByType(convertTypeToTMDB(type), page ?? 1);
    } else {
      for (const itemType of TYPES) {
        const typeItems = await fetchPopularItemsByType(itemType, page ?? 1);
        items = [...items, ...typeItems];
      }
    }

    if (limit) {
      items = items.slice(0, limit);
    }

    return items;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getTopRated({
  type,
  page,
  limit,
}: {
  type?: string | null;
  page?: number;
  limit?: number;
}): Promise<TMDBItem[]> {
  try {
    let items: TMDBItem[] = [];

    if (type) {
      items = await fetchTopRatedItemsByType(
        convertTypeToTMDB(type),
        page ?? 1
      );
    } else {
      for (const itemType of TYPES) {
        const typeItems = await fetchTopRatedItemsByType(itemType, page ?? 1);
        items = [...items, ...typeItems];
      }
    }

    if (limit) {
      items = items.slice(0, limit);
    }

    return items;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDetails({
  type,
  id,
}: {
  type: string;
  id: string;
}): Promise<TMDBItemDetails> {
  try {
    const data = await fetchData(`${convertTypeToTMDB(type)}/${id}`, {
      appendVideos: true,
    });

    const videos = data?.videos?.results?.map((video: any): TMDBVideo => {
      const { id, name, site, key, published_at } = video;

      return {
        id,
        name,
        url: `${getVideoBaseUrl(site)}${key}`,
        published_at,
      };
    });

    const {
      adult,
      backdrop_path,
      genres,
      homepage,
      id: itemId,
      overview,
      popularity,
      poster_path,
      title,
      name,
      vote_average,
      vote_count,
      release_date,
      first_air_date,
      number_of_episodes,
      number_of_seasons,
      tagline,
      runtime,
    } = data;
    const mediaType = convertMediaType(title ? "movie" : "tv");

    return {
      adult: adult,
      backdrop_path: BACKDROP_URL + backdrop_path,
      genres: genres,
      homepage: homepage,
      id: itemId,
      overview: overview,
      popularity: popularity,
      poster_path: POSTER_URL + poster_path,
      title: title || name,
      media_type_slug: slugify(mediaType),
      media_type: mediaType,
      vote_average: vote_average,
      vote_count: vote_count,
      release_date: release_date ?? first_air_date,
      number_of_episodes: number_of_episodes,
      number_of_seasons: number_of_seasons,
      tagline: tagline || "",
      runtime: runtime,
      videos,
      recommendations: [],
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getRecommendations({
  type,
  id,
  page,
  limit,
}: {
  type: string;
  id: number;
  page?: number;
  limit?: number;
}): Promise<TMDBItem[]> {
  try {
    const data = await fetchData(
      `${convertTypeToTMDB(type)}/${id}/recommendations`,
      {
        page: page ?? 1,
      }
    );

    if (limit) {
      data.results = data.results.slice(0, limit);
    }

    return data.results.map(mapToTMDBItem);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getTrending({
  type,
  page,
  limit,
  period,
}: {
  type?: string;
  page?: number;
  limit?: number;
  period?: string | null;
}): Promise<TMDBItem[]> {
  const trendingEndpoint = type
    ? `trending/${convertTypeToTMDB(type)}/`
    : "trending/all/";

  const endpoint = period
    ? `${trendingEndpoint}${translatePeriodToEN(period)}`
    : `${trendingEndpoint}day`;

  const data = await fetchData(endpoint, {
    page: page ?? 1,
  });

  const results = limit ? data.results.slice(0, limit) : data.results;

  return results.map(mapToTMDBItem);
}

export async function search({
  query,
  type,
  page,
}: {
  query: string;
  type?: string;
  page?: number;
}): Promise<TMDBItem[]> {
  if (type) {
    return await searchItemsByType(convertTypeToTMDB(type), query, page ?? 1);
  } else {
    let items: TMDBItem[] = [];

    for (const type of TYPES) {
      const data = await searchItemsByType(type, query, page ?? 1);
      items = [...items, ...data];
    }

    return items;
  }
}

async function fetchPopularItemsByType(
  type: string,
  page: number
): Promise<TMDBItem[]> {
  const data = await fetchData(`${type}/popular`, { page });

  return data.results.map(mapToTMDBItem);
}

async function fetchTopRatedItemsByType(
  type: string,
  page: number
): Promise<TMDBItem[]> {
  const data = await fetchData(`${type}/top_rated`, { page });

  return data.results.map(mapToTMDBItem);
}

async function searchItemsByType(type: string, query: string, page: number) {
  const data = await fetchData(`search/${type}`, {
    query,
    page: page ?? 1,
  });

  return data.results.map(mapToTMDBItem);
}

async function fetchData(
  endpoint: string,
  params?: {
    page?: number;
    query?: string;
    appendVideos?: boolean;
    include_adult?: boolean;
  }
) {
  const token = ENV.TMDB_TOKEN;

  const queryParams = ["language=pt-BR"];

  if (params) {
    if (params.page) {
      queryParams.push(`page=${params.page}`);
    }

    if (params.query) {
      queryParams.push(`query=${params.query}`);
    }

    if (params.appendVideos) {
      queryParams.push("append_to_response=videos");
    }

    if (params.include_adult) {
      queryParams.push("include_adult=true");
    }
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/${endpoint}?${queryParams.join("&")}`,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
}
