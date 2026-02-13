import type { TMDBItem, TMDBItemDetails } from "~/utils/tmdb_types";

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
