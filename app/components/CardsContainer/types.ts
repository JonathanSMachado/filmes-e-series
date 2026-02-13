import type { TMDBItem } from "~/utils/tmdb_types";

type CardsContainerProps = {
  items: TMDBItem[];
  infinityScroll?: boolean;
  type?: "movie" | "film" | "filmes" | "series";
  search?: string | null;
};

export type { CardsContainerProps };
