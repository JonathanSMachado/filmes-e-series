type TMDBGenre = {
  id: number;
  name: string;
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
};

export type TMDBItem = {
  id: number;
  title: string;
  adult: boolean;
  vote_average: number;
  popularity: number;
  poster_path: string;
  type: "filmes" | "series";
  release_date?: string;
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
  type: "filmes" | "series";
  vote_average: number;
  vote_count: number;
  release_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  tagline?: string;
};

export type CardSize = "small" | "medium" | "large";

export type CardProps = {
  item: TMDBItem | TMDBItemDetails;
  link?: string;
  size?: CardSize;
};

export type CardContainerProps = {
  items: TMDBItem[];
  infinityScroll?: boolean;
};
