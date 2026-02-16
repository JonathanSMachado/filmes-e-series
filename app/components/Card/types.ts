import type { TMDBItem, TMDBItemDetails } from "~/core/lib/TMDB/types";

type CardProps = {
  item: TMDBItem | TMDBItemDetails;
  link?: string;
  className?: string;
  showScore?: boolean;
  onImageError?: () => void;
};

type CardImageProps = {
  src: string | null;
  alt: string;
  className?: string;
  onError?: () => void;
};

type ScoreProps = {
  value: number;
};

export type { CardImageProps, CardProps, ScoreProps };
