import {
  MediaType,
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  TMDBResponseItem,
} from "~/utils/type";

export async function getMostPopular({
  type,
  page,
  limit,
}: {
  type?: MediaType;
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
        })
      );
    } else {
      const types: MediaType[] = ["filmes", "series"];

      for (const type of types) {
        const data = await fetchData({
          endpoint: `${convertTypeToTMDB(type)}/popular`,
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
  type: MediaType;
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
      release_date: data.release_date,
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: data.number_of_seasons,
      tagline: data.tagline || "",
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
  type: MediaType;
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
  type: MediaType;
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
    })
  );

  return data;
}

export async function getTrending({
  type,
  page,
  limit,
}: {
  type?: MediaType;
  page?: number;
  limit?: number;
}): Promise<TMDBItem[]> {
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;
  const endpoint = type
    ? `${convertTypeToTMDB(type)}/trending/week`
    : "trending/all/week";

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
    };
  });
}

export async function search({
  query,
  type,
  page,
}: {
  query: string;
  type?: MediaType;
  page?: number;
}): Promise<TMDBItem[]> {
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;

  console.log(page);

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
      })
    );
  } else {
    const types: MediaType[] = ["filmes", "series"];

    let collection: TMDBItem[] = [];

    for (const type of types) {
      const data = await fetchData({
        endpoint: `search/${convertTypeToTMDB(type)}`,
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

function convertTypeToTMDB(type: MediaType): string {
  switch (type) {
    case "filmes":
      return "movie";
    case "series":
      return "tv";
    default:
      return "";
  }
}
