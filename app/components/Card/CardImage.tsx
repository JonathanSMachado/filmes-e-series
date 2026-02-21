import React from "react";
import type { CardImageProps } from "./types";
import fallbackImage from "/images/filmes_series.png";

export function CardImage({ src, alt, className = "" }: CardImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage;
  };

  return (
    <img
      className={className}
      src={src || fallbackImage}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={handleError}
    />
  );
}
