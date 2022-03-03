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
  poster_path: string;
  type: string;
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
  type: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  tagline?: string;
};

export type CardSize = "small" | "medium" | "large";

export type CardProps = {
  item: {
    id: number;
    title: string | undefined;
    type: string;
    poster_path: string;
    vote_average: number;
    link?: string;
    size?: CardSize;
  };
  islink?: boolean;
  size?: CardSize;
};

export type CardContainerProps = {
  items: TMDBItem[];
};
