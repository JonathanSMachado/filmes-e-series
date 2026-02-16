import { useState } from "react";
import { Link } from "react-router";
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
    group shrink-0 rounded-md relative shadow-slate-700 shadow-lg 
    ring-1 ring-slate-700 transition-all overflow-visible
    hover:shadow-cyan-500 z-0 hover:z-10 hover:ring-2 
    focus-visible:outline-none focus:shadow-cyan-500 focus:z-10 focus:ring-2 
    ${className} ${!link ? "pointer-events-none" : ""} 
  `.trim();

  const cardContent = (
    <div className="w-full h-full">
      <div className="relative w-full h-full rounded-md transform-gpu transition-transform duration-500 ease-out origin-center group-hover:scale-110">
        <CardImage
          src={imageSrc}
          alt={`Poster for ${item.title}`}
          className="rounded-md object-cover w-full h-full aspect-2/3"
          onError={handleImageError}
        />

        {link && (
          <div
            className="absolute inset-0 bottom-0 w-full h-full rounded-md bg-linear-to-t from-black via-black/90 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end gap-2 p-4 z-20 pointer-events-none"
            role="presentation"
          >
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-semibold text-white leading-tight line-clamp-2 mb-1">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mb-2">
                {item.release_date && (
                  <span className="text-cyan-400 text-[10px] font-bold">
                    {new Date(item.release_date).getFullYear()}
                  </span>
                )}
                <span className="text-slate-400 text-[10px] uppercase tracking-widest font-medium">
                  • {item.media_type}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 mb-3 leading-snug">
                {item.overview}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="text-[9px] text-slate-200 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/10"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {showScore && (
          <div className="absolute top-2 right-2 w-12 h-12 z-40">
            <Score value={item.vote_average} />
          </div>
        )}
      </div>
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
