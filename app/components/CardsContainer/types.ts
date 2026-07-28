import type { TMDBItem } from "~/core/lib/TMDB/types";

type CardsContainerProps = {
  items: TMDBItem[];
  infinityScroll?: boolean;
  type?: string | null;
  search?: string | null;
  trends?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
};

export type { CardsContainerProps };
