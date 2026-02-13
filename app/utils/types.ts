import type { TMDBItem } from "./tmdb_types";

type MessageObject = {
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  to: string[];
};

type ApiItemsLoader = {
  search: string | null;
  items: TMDBItem[] | [];
  nextPage?: number | null;
  type?: "filmes" | "series";
};

export type { ApiItemsLoader, MessageObject };
