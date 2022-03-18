import { Link } from "remix";
import { formatToPtBr } from "~/utils/date";
import { CardProps } from "~/utils/types";

export default function Card({ item, link, size }: CardProps) {
  return (
    <Link
      prefetch="intent"
      to={link ?? ""}
      className={`card group${!link ? " pointer-events-none" : ""}${
        size ? ` card-${size}` : ""
      }`}
      title={item.title}
    >
      <img
        className="card-background"
        src={item.poster_path}
        alt={item.title}
      />
      {link && (
        <div className="card-description group-hover:opacity-100 group-hover:h-1/4 group-focus:opacity-100 group-focus:h-1/4">
          <p className="text-slate-100">{item.title}</p>
          <small>{formatToPtBr(item.release_date!)}</small>
        </div>
      )}
      <div className="absolute top-0 right-0 text-slate-100">
        {item.vote_average * 10}%
      </div>
      {item.adult && (
        <div className="card-adult-content-alert">
          <div className="image"></div>
        </div>
      )}
    </Link>
  );
}
