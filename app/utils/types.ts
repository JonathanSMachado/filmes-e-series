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
  trends?: string | null;
  items: TMDBItem[] | [];
  nextPage?: number | null;
};

type AuthContextType = {
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

type UserProfile = {
  name: string;
  avatarUrl?: string;
  email?: string;
};

export type { ApiItemsLoader, AuthContextType, MessageObject, UserProfile };
