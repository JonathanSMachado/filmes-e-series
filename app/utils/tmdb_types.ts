type TMDBGenre = {
  id: number;
  name: string;
};

type TMDBVideo = {
  id: string;
  name: string;
  url?: string;
  published_at?: string | null;
};

type TMDBResponse = {
  page: number;
  results: TMDBResponseItem[];
  total_pages: number;
  total_results: number;
};

type TMDBResponseItem = {
  adult: boolean | false;
  backdrop_path: string | null;
  genres: TMDBGenre[];
  homepage: string | null;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  status: string;
  tag_line: string;
  title?: string;
  first_air_date?: string;
  genre_ids: number[];
  vote_count: number;
  original_language: string;
  name?: string;
  media_type: "movie" | "tv";
  videos?: { results: TMDBVideo[] };
  number_of_episodes?: number;
  number_of_seasons?: number;
  runtime?: number;
};

type TMDBItem = {
  id: number;
  title: string;
  adult: boolean;
  vote_average: number;
  popularity: number;
  poster_path: string | null;
  media_type_slug: "filmes" | "series";
  media_type: "Filmes" | "Séries";
  release_date?: string;
  backdrop_path: string | null;
  link: string;
};

type TMDBItemDetails = {
  adult: boolean;
  backdrop_path: string | null;
  genres: TMDBGenre[];
  homepage: string | null;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string | null;
  title: string;
  media_type_slug: string;
  media_type: "Filmes" | "Séries";
  vote_average: number;
  vote_count: number;
  release_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  tagline: string | null;
  runtime: number;
  videos: TMDBVideo[] | null;
  recommendations: TMDBItem[] | null;
};

export type {
  TMDBGenre,
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  TMDBResponseItem,
  TMDBVideo,
};
