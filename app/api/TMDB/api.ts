import {
  convertMediaType,
  convertMediaTypeToSlug,
  convertPeriodToTMDB,
  convertTypeToTMDB,
} from "~/utils/converters";
import { getVideoBaseUrl } from "~/utils/general";
import {
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  TMDBResponseItem,
  TMDBVideo,
} from "~/utils/types";

const TYPES = ["movie", "tv"];

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
    const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
    let collection: TMDBItem[] = [];

    if (type) {
      const data = await fetchData(`${convertTypeToTMDB(type)}/popular`, {
        page: page ?? 1,
      });

      collection = data.results.map(
        (item: TMDBResponseItem): TMDBItem => ({
          id: item.id,
          title: item.title || item.name || "",
          adult: item.adult || false,
          vote_average: item.vote_average,
          poster_path: tmdbImagesUrl + item.poster_path,
          media_type_slug: convertMediaTypeToSlug(item.media_type),
          media_type: convertMediaType(item.media_type),
          popularity: item.popularity,
          release_date: item.release_date ?? item.first_air_date,
        })
      );
    } else {
      for (const type of TYPES) {
        const data = await fetchData(`${type}/popular`, {
          page: page ?? 1,
        });

        const items = data.results.map(
          (item: TMDBResponseItem): TMDBItem => ({
            id: item.id,
            title: item.title || item.name || "",
            adult: item.adult || false,
            vote_average: item.vote_average,
            poster_path: tmdbImagesUrl + item.poster_path,
            media_type_slug: convertMediaTypeToSlug(item.media_type),
            media_type: convertMediaType(item.media_type),
            popularity: item.popularity,
            release_date: item.release_date ?? item.first_air_date,
          })
        );

        collection = [...collection, ...items];
      }
    }

    if (limit) {
      collection = collection.slice(0, limit);
    }

    return collection;
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
    const posterUrl = ENV.TMDB_POSTER_IMAGES_URL;
    const backdropUrl = ENV.TMDB_BACKDROP_IMAGES_URL;
    const data = await fetchData(`${convertTypeToTMDB(type)}/${id}`, {
      appendVideos: true,
    });

    const videos = data?.videos?.results?.map((video: any): TMDBVideo => {
      return {
        id: video.id,
        name: video.name,
        url: `${getVideoBaseUrl(video.site)}${video.key}`,
        published_at: video.published_at,
      };
    });

    return {
      adult: data.adult,
      backdrop_path: backdropUrl + data.backdrop_path,
      genres: data.genres,
      homepage: data.homepage,
      id: data.id,
      overview: data.overview,
      popularity: data.popularity,
      poster_path: posterUrl + data.poster_path,
      title: data.title || data.name,
      media_type_slug: convertMediaTypeToSlug(data.title ? "movie" : "tv"),
      media_type: convertMediaType(data.title ? "movie" : "tv"),
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      release_date: data.release_date ?? data.first_air_date,
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: data.number_of_seasons,
      tagline: data.tagline || "",
      runtime: data.runtime,
      videos,
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
}): Promise<TMDBResponse> {
  try {
    const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;

    const data = await fetchData(
      `${convertTypeToTMDB(type)}/${id}/recommendations`,
      {
        page: page ?? 1,
      }
    );

    if (limit) {
      data.results = data.results.slice(0, limit);
    }

    data.results = data.results.map(
      (item: TMDBResponseItem): TMDBItem => ({
        id: item.id,
        title: item.title || item.name || "",
        adult: item.adult || false,
        vote_average: item.vote_average,
        poster_path: tmdbImagesUrl + item.poster_path,
        media_type_slug: convertMediaTypeToSlug(item.media_type),
        media_type: convertMediaType(item.media_type),
        popularity: item.popularity,
        release_date: item.release_date ?? item.first_air_date,
      })
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getSimilar({
  type,
  id,
  page,
  limit,
}: {
  type: string;
  id: number;
  page?: number;
  limit?: number;
}) {
  const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
  const data = await fetchData(`${convertTypeToTMDB(type)}/${id}/similar`, {
    page: page ?? 1,
  });

  if (limit) {
    data.results = data.results.slice(0, limit);
  }

  data.results = data.results.map(
    (item: TMDBResponseItem): TMDBItem => ({
      id: item.id,
      title: item.title || item.name || "",
      adult: item.adult || false,
      vote_average: item.vote_average,
      poster_path: tmdbImagesUrl + item.poster_path,
      media_type_slug: convertMediaTypeToSlug(item.media_type),
      media_type: convertMediaType(item.media_type),
      popularity: item.popularity,
      release_date: item.release_date ?? item.first_air_date,
    })
  );

  return data;
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
  const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;
  let endpoint = type
    ? `trending/${convertTypeToTMDB(type)}/`
    : "trending/all/";
  endpoint += period ? convertPeriodToTMDB(period) : "day";

  const data = await fetchData(endpoint, {
    page: page ?? 1,
  });

  if (limit) {
    data.results = data.results.slice(0, limit);
  }

  return data.results.map((item: TMDBResponseItem): TMDBItem => {
    return {
      id: item.id,
      title: item.title || item.name || "",
      adult: item.adult || false,
      vote_average: item.vote_average,
      poster_path: tmdbImagesUrl + item.poster_path,
      media_type_slug: convertMediaTypeToSlug(item.media_type),
      media_type: convertMediaType(item.media_type),
      popularity: item.popularity,
      release_date: item.release_date ?? item.first_air_date,
    };
  });
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
  const tmdbImagesUrl = ENV.TMDB_POSTER_IMAGES_URL;

  if (type) {
    const data = await fetchData(`search/${convertTypeToTMDB(type)}`, {
      query,
      page: page ?? 1,
    });

    return data.results.map(
      (item: TMDBResponseItem): TMDBItem => ({
        id: item.id,
        title: item.title || item.name || "",
        adult: item.adult || false,
        vote_average: item.vote_average,
        poster_path: tmdbImagesUrl + item.poster_path,
        media_type_slug: convertMediaTypeToSlug(item.title ? "movie" : "tv"),
        media_type: convertMediaType(item.title ? "movie" : "tv"),
        popularity: item.popularity,
        release_date: item.release_date ?? item.first_air_date,
      })
    );
  } else {
    let collection: TMDBItem[] = [];

    for (const type of TYPES) {
      const data = await fetchData(`search/${type}`, {
        query,
        page: page ?? 1,
      });

      const items = data.results.map(
        (item: TMDBResponseItem): TMDBItem => ({
          id: item.id,
          title: item.title || item.name || "",
          adult: item.adult || false,
          vote_average: item.vote_average,
          poster_path: `${tmdbImagesUrl}/${item.poster_path}`,
          media_type_slug: convertMediaTypeToSlug(item.title ? "movie" : "tv"),
          media_type: convertMediaType(item.title ? "movie" : "tv"),
          popularity: item.popularity,
          release_date: item.release_date ?? item.first_air_date,
        })
      );

      collection = [...collection, ...items];
    }

    return collection;
  }
}

async function fetchData(
  endpoint: string,
  params?: {
    page?: number;
    query?: string;
    appendVideos?: boolean;
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
