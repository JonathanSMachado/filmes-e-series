import { Link } from "@remix-run/react";
import { formatDateToPtBr } from "~/utils/date";
import { TMDBItem, TMDBItemDetails } from "~/utils/types";

type CardSize = "small" | "medium" | "large";

interface CardProps {
  item: TMDBItem | TMDBItemDetails;
  link?: string;
  size?: CardSize;
  children?: React.ReactNode;
}

function getUserScore(votes_average: number): number {
  return votes_average ? votes_average * 10 : 0;
}

export function Card({ item, link, size, children }: CardProps) {
  return (
    <Link
      prefetch="intent"
      to={link ?? ""}
      className={`card group${!link ? " pointer-events-none" : ""}${
        size ? ` card-${size}` : ""
      }`}
      title={item.title}
    >
      {link && (
        <div className="card-description group-hover:opacity-100 group-hover:visible group-hover:h-1/4 group-focus:opacity-100 group-focus:h-1/4">
          <p className="text-slate-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity delay-75">
            {item.title}
            <br />
            <small>{formatDateToPtBr(item.release_date!)}</small>
          </p>
        </div>
      )}

      {item.adult && (
        <div className="card-adult-content-alert">
          <div className="image"></div>
        </div>
      )}

      {item.poster_path && (
        <img
          className="card__image__bg"
          src={item.poster_path}
          alt={item.title}
          loading="lazy"
        />
      )}

      {children}
    </Link>
  );
}
