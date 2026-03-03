import type { TMDBItem } from "~/core/lib/TMDB/types";

type MessageObject = {
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  to: string[];
};

type ApiItemsLoader = {
  search: string | null;
  type: string | null;
  items: TMDBItem[] | [];
  nextPage?: number | null;
};

export type { ApiItemsLoader, MessageObject };
