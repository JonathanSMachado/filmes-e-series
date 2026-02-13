import React from "react";
import type { CardImageProps } from "./types";

export function CardImage({
  src,
  alt,
  className = "",
  onError,
}: CardImageProps) {
  const fallback = "/images/fallback_poster.png";
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallback;
    if (onError) onError();
  };

  return (
    <img
      className={className}
      src={src ?? fallback}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  );
}
