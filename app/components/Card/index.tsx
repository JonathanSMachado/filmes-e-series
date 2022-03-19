import { Link } from "remix";
import { formatDateToPtBr } from "~/utils/date";
import { CardProps } from "~/utils/types";

function getUserScore(votes_average: number): string {
  if (votes_average === 0) {
    return "N/A";
  }

  return votes_average * 10 + "%";
}

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
          <small>{formatDateToPtBr(item.release_date!)}</small>
        </div>
      )}
      {/* <div className="absolute top-[5px] right-[5px]">
        {getUserScore(item.vote_average)}
      </div> */}
      {item.adult && (
        <div className="card-adult-content-alert">
          <div className="image"></div>
        </div>
      )}
    </Link>
  );
}
