import type { TMDBItem } from "~/core/lib/TMDB/types";

type CardsContainerProps = {
  items: TMDBItem[];
  infinityScroll?: boolean;
  type?: string | null;
  search?: string | null;
};

export type { CardsContainerProps };
