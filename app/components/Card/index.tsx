import { Link } from "remix";
import { CardProps } from "~/utils/type";

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
      <img src={item.poster_path} alt={item.title} />
      <div className="absolute top-0 right-0 text-slate-100">
        {item.popularity}
      </div>
      {link && (
        <p className="absolute bottom-0 w-full rounded-b-3xl border-0 opacity-0 h-0 flex justify-center items-center bg-cyan-500 text-slate-200 uppercase text-sm transition-all ease-in-out group-hover:delay-100 group-hover:opacity-100 group-hover:h-7 group-focus:delay-100 group-focus:opacity-100 group-focus:h-7">
          Ver detalhes
        </p>
      )}
    </Link>
  );
}
