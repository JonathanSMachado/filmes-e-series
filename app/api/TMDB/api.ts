import {
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  TMDBResponseItem,
} from "~/utils/type";

type MediaType = "movie" | "tv";

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
    const token = process.env.TMDB_TOKEN;
    const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;
    let collection: TMDBItem[] = [];

    if (type) {
      const response = await fetch(
        `http://api.themoviedb.org/3/${type}/popular?language=pt-BR&page=${
          page ?? 1
        }`,
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      collection = data.results.map(
        (item: TMDBResponseItem): TMDBItem => ({
          id: item.id,
          title: item.title || item.name || "",
          adult: item.adult || false,
          vote_average: item.vote_average,
          poster_path: tmdbImagesUrl + item.poster_path,
          type: item.title ? "movie" : "tv",
          popularity: item.popularity,
        })
      );
    } else {
      const types = ["movie", "tv"];

      for (const type of types) {
        const response = await fetch(
          `http://api.themoviedb.org/3/${type}/popular?language=pt-BR&page=${
            page ?? 1
          }`,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const items = data.results.map(
          (item: TMDBResponseItem): TMDBItem => ({
            id: item.id,
            title: item.title || item.name || "",
            adult: item.adult || false,
            vote_average: item.vote_average,
            poster_path: tmdbImagesUrl + item.poster_path,
            type: item.title ? "movie" : "tv",
            popularity: item.popularity,
          })
        );

        collection = [...collection, ...items];
      }
    }

    collection.sort((a, b) => b.popularity - a.popularity);

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
    const token = process.env.TMDB_TOKEN;
    const posterUrl = process.env.TMDB_POSTER_IMAGES_URL;
    const backdropUrl = process.env.TMDB_BACKDROP_IMAGES_URL;

    const response = await fetch(
      `http://api.themoviedb.org/3/${type}/${id}?language=pt-BR`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

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
      type: data.title ? "movie" : "tv",
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
  type: string;
  id: number;
  page?: number;
  limit?: number;
}): Promise<TMDBResponse> {
  try {
    const token = process.env.TMDB_TOKEN;
    const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;

    const response = await fetch(
      `http://api.themoviedb.org/3/${type}/${id}/recommendations?language=pt-BR&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (limit) {
      data.results = data.results.slice(0, limit);
    }

    data.results = data.results.map(
      (item: TMDBResponseItem): TMDBItem => ({
        id: item.id,
        title: item.title || item.name || "",
        adult: item.adult || false,
        vote_average: item.vote_average,
        poster_path: `${tmdbImagesUrl}/${item.poster_path}`,
        type: item.title ? "movie" : "tv",
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
  type: string;
  id: number;
  page?: number;
  limit?: number;
}) {
  const token = process.env.TMDB_TOKEN;
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;

  const response = await fetch(
    `http://api.themoviedb.org/3/${type}/${id}/similar?language=pt-BR&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (limit) {
    data.results = data.results.slice(0, limit);
  }

  data.results = data.results.map(
    (item: TMDBResponseItem): TMDBItem => ({
      id: item.id,
      title: item.title || item.name || "",
      adult: item.adult || false,
      vote_average: item.vote_average,
      poster_path: `${tmdbImagesUrl}/${item.poster_path}`,
      type: item.title ? "movie" : "tv",
      popularity: item.popularity,
    })
  );

  return data;
}

export async function search({
  query,
  type,
}: {
  query: string;
  type?: "movie" | "tv";
}): Promise<TMDBItem[]> {
  const token = process.env.TMDB_TOKEN;
  const tmdbImagesUrl = process.env.TMDB_POSTER_IMAGES_URL;

  if (type) {
    const response = await fetch(
      `http://api.themoviedb.org/3/search/${type}?query=${query}&language=pt-BR`,
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data.results.map(
      (item: TMDBResponseItem): TMDBItem => ({
        id: item.id,
        title: item.title || item.name || "",
        adult: item.adult || false,
        vote_average: item.vote_average,
        poster_path: `${tmdbImagesUrl}/${item.poster_path}`,
        type: item.title ? "movie" : "tv",
        popularity: item.popularity,
      })
    );
  }
}
