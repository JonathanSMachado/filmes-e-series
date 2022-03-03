import { CardProps } from "~/utils/type";

export default function Card({ item, islink, size }: CardProps) {
  return (
    <a
      {...(islink && { href: `/${item.type}/${item.id}` })}
      className={`card group ${!islink ? "pointer-events-none" : ""} ${
        size ? `card-${size}` : ""
      }`}
    >
      <img src={item.poster_path} alt={item.title} />
      {islink && (
        <p className="absolute bottom-0 w-full rounded-b-3xl border-0 opacity-0 h-0 flex justify-center items-center bg-cyan-700 text-slate-300 uppercase text-sm transition-all ease-in-out group-hover:delay-200 group-hover:opacity-100 group-hover:h-7 group-focus:delay-200 group-focus:opacity-100 group-focus:h-7">
          ver detalhes
        </p>
      )}
    </a>
  );
}
