import { convertPeriodToTMDB, convertTypeToTMDB } from "~/utils/converters";
import {
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  TMDBResponseItem,
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
    const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;
    let collection: TMDBItem[] = [];

    if (type) {
      const data = await fetchData({
        endpoint: `${convertTypeToTMDB(type)}/popular`,
        page: page ?? 1,
      });

      collection = data.results.map(
        (item: TMDBResponseItem): TMDBItem => ({
          id: item.id,
          title: item.title || item.name || "",
          adult: item.adult || false,
          vote_average: item.vote_average,
          poster_path: tmdbImagesUrl + item.poster_path,
          type: item.title ? "filmes" : "series",
          popularity: item.popularity,
          release_date: item.release_date ?? item.first_air_date,
        })
      );
    } else {
      for (const type of TYPES) {
        const data = await fetchData({
          endpoint: `${type}/popular`,
          page: page ?? 1,
        });

        const items = data.results.map(
          (item: TMDBResponseItem): TMDBItem => ({
            id: item.id,
            title: item.title || item.name || "",
            adult: item.adult || false,
            vote_average: item.vote_average,
            poster_path: tmdbImagesUrl + item.poster_path,
            type: item.title ? "filmes" : "series",
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
    const posterUrl = process.env.TMDB_POSTER_IMAGES_URL;
    const backdropUrl = process.env.TMDB_BACKDROP_IMAGES_URL;
    const data = await fetchData({
      endpoint: `${convertTypeToTMDB(type)}/${id}`,
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
      type: data.title ? "filmes" : "series",
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      release_date: data.release_date ?? data.first_air_date,
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: data.number_of_seasons,
      tagline: data.tagline || "",
      runtime: data.runtime || 0,
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
    const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;

    const data = await fetchData({
      endpoint: `${convertTypeToTMDB(type)}/${id}/recommendations`,
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
        type: item.title ? "filmes" : "series",
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
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;
  const data = await fetchData({
    endpoint: `${convertTypeToTMDB(type)}/${id}/similar`,
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
      type: item.title ? "filmes" : "series",
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
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;
  let endpoint = type
    ? `trending/${convertTypeToTMDB(type)}/`
    : "trending/all/";
  endpoint += period ? convertPeriodToTMDB(period) : "day";

  const data = await fetchData({ endpoint, page: page ?? 1 });

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
      type: item.title ? "filmes" : "series",
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
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;

  if (type) {
    const data = await fetchData({
      endpoint: `search/${convertTypeToTMDB(type)}`,
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
        type: item.title ? "filmes" : "series",
        popularity: item.popularity,
        release_date: item.release_date ?? item.first_air_date,
      })
    );
  } else {
    let collection: TMDBItem[] = [];

    for (const type of TYPES) {
      const data = await fetchData({
        endpoint: `search/${type}`,
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
          type: item.title ? "filmes" : "series",
          popularity: item.popularity,
          release_date: item.release_date ?? item.first_air_date,
        })
      );

      collection = [...collection, ...items];
    }

    return collection;
  }
}

async function fetchData({
  endpoint,
  page,
  query,
}: {
  endpoint: string;
  page?: number;
  query?: string;
}) {
  const token = process.env.TMDB_TOKEN;

  const params = [];

  if (page) {
    params.push(`page=${page}`);
  }

  if (query) {
    params.push(`query=${query}`);
  }

  const response = await fetch(
    `http://api.themoviedb.org/3/${endpoint}?language=pt-BR&${params.join(
      "&"
    )}`,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
}
