type TMDBGenre = {
  id: number;
  name: string;
};

type TMDBResponseList = {
  page: number;
  results: TMDBResponseItem[];
  total_pages: number;
  total_results: number;
};

type TMDBResponseGenres = {
  genres: TMDBGenre[];
};

type TMDBResponseItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  vote_average: number;
  vote_count: number;
};

type TMDBResponseItemDetails = {
  adult: boolean;
  backdrop_path: string;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  revenue: number;
  runtime: number;
  status: string;
  tagLine: string;
  title?: string;
  name?: string;
  vote_average: number;
  vote_count: number;
  videos: { results: TMDBResponseVideo[] };
  number_of_episodes?: number;
  number_of_seasons?: number;
};

type TMDBResponseVideo = {
  name: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

type TMDBVideo = {
  id: string;
  name: string;
  url?: string;
  type: string;
  official: boolean;
  published_at: string;
};

type TMDBItemDetails = {
  adult: boolean;
  backdrop_path: string | null;
  genres: TMDBGenre[];
  homepage: string;
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
  tagLine: string;
  runtime: number;
  videos: TMDBVideo[] | null;
  recommendations: TMDBItem[] | [];
};

type TMDBItem = {
  id: number;
  title: string;
  adult: boolean;
  vote_average: number;
  popularity: number;
  poster_path: string | null;
  media_type_slug: string;
  media_type: "Filmes" | "Séries";
  release_date?: string;
  backdrop_path: string | null;
  link: string;
  genres: TMDBGenre[];
  overview: string;
};

export type {
  TMDBGenre,
  TMDBItem,
  TMDBItemDetails,
  TMDBResponseGenres,
  TMDBResponseItem,
  TMDBResponseItemDetails,
  TMDBResponseList,
  TMDBResponseVideo,
  TMDBVideo,
};
