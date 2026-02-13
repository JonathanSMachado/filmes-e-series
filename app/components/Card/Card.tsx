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
            className="absolute bottom-0 w-full rounded-b-md bg-linear-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:h-2/4 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end gap-2 p-4 z-20"
            role="text"
          >
            <p className="font-bold text-white leading-tight drop-shadow-md">
              {item.title}
            </p>
            <div className="flex items-center gap-2">
              {item.release_date && (
                <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-medium border border-cyan-500/30">
                  {new Date(item.release_date).getFullYear()}
                </span>
              )}
              <span className="text-slate-400 text-[10px] uppercase tracking-wider">
                • {item.media_type}
              </span>
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
