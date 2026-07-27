import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "../Badge";
import { AdultAlert } from "./AdultAlert";
import { CardImage } from "./CardImage";
import { Score } from "./Score";
import type { CardProps } from "./types";

export function Card(props: CardProps) {
  const { item, link, className = "", showScore = true, onImageError } = props;

  const [imageSrc, setImageSrc] = useState<string | null>(item.poster_path);
  const fallbackImageSrc = "/images/fallback_poster.png";

  const handleImageError = () => {
    setImageSrc(fallbackImageSrc);
    if (onImageError) onImageError();
  };

  const cardStyleClasses = `
    relative group block overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 shadow-md hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1.5 ${className} ${!link ? "pointer-events-none" : ""}
  `.trim();

  const cardContent = (
    <div className="relative w-full h-full aspect-2/3 overflow-hidden rounded-2xl">
      <CardImage
        src={imageSrc}
        alt={`Poster for ${item.title}`}
        className="object-cover w-full h-full aspect-2/3 group-hover:scale-105 transition-transform duration-500 ease-out"
        onError={handleImageError}
      />

      <div className="absolute top-2.5 left-2.5 z-30 pointer-events-none">
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-slate-950/80 backdrop-blur-md border border-slate-700/60 rounded-md shadow-md">
          {item.media_type}
        </span>
      </div>

      {showScore && (
        <div className="absolute top-2.5 right-2.5 w-10 h-10 z-30 pointer-events-none drop-shadow-md">
          <Score value={item.vote_average} />
        </div>
      )}

      {link && (
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20"
          role="presentation"
        >
          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-1.5">
            <p className="font-bold text-slate-100 text-sm sm:text-base leading-tight line-clamp-2">
              {item.title}
            </p>

            <div className="flex items-center gap-2">
              {item.release_date && (
                <span className="text-cyan-400 text-xs font-bold">
                  {new Date(item.release_date).getFullYear()}
                </span>
              )}
              {item.genres && item.genres.length > 0 && (
                <span className="text-slate-400 text-xs">
                  • {item.genres.map((g) => g.name).slice(0, 2).join(", ")}
                </span>
              )}
            </div>

            {item.overview && (
              <p className="text-xs text-slate-300/90 line-clamp-3 leading-snug font-normal pt-1">
                {item.overview}
              </p>
            )}

            <div className="flex flex-wrap gap-1 pt-1">
              {item.genres?.slice(0, 2).map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {item.adult && <AdultAlert />}
    </div>
  );

  if (!link) return <div className={cardStyleClasses}>{cardContent}</div>;

  return (
    <Link
      prefetch="intent"
      to={link}
      className={cardStyleClasses}
      title={item.title}
      aria-label={`View details for ${item.title}`}
    >
      {cardContent}
    </Link>
  );
}
