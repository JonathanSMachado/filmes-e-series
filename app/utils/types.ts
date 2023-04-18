export type TMDBGenre = {
  id: number;
  name: string;
};

export type TMDBVideo = {
  id: string;
  name: string;
  url: string;
  published_at: string;
};

export type TMDBResponse = {
  page: number;
  results: TMDBItem[];
  total_pages: number;
  total_results: number;
};

export type TMDBResponseItem = {
  poster_path: string;
  adult?: boolean;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids: number[];
  vote_count: number;
  name?: string;
  title?: string;
  media_type: string;
};

export type TMDBItem = {
  id: number;
  title: string;
  adult: boolean;
  vote_average: number;
  popularity: number;
  poster_path: string;
  media_type_slug: string;
  media_type: "Filmes" | "Séries";
  release_date?: string;
  backdrop_path: string;
};

export type TMDBItemDetails = {
  adult: boolean;
  backdrop_path: string;
  genres: TMDBGenre[];
  homepage: string;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string | undefined;
  media_type_slug: string;
  media_type: "Filmes" | "Séries";
  vote_average: number;
  vote_count: number;
  release_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  tagline: string;
  runtime: number;
  videos: TMDBVideo[] | undefined;
};

export type CardSize = "small" | "medium" | "large";

export type CardProps = {
  item: TMDBItem | TMDBItemDetails;
  link?: string;
  size?: CardSize;
  showScore?: boolean;
};

export type CardContainerProps = {
  items: TMDBItem[];
  infinityScroll?: boolean;
  type?: "filmes" | "series";
  search?: string;
};

export type MessageObject = {
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  to?: string;
};
