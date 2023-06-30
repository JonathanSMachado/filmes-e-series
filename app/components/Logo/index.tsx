import { Link } from "@remix-run/react";

export default function Logo() {
  return (
    <Link to="/">
      <img
        src="/images/filmes_series.png"
        alt="Filmes e Séries"
        className="w-44 h-auto mt-4 outline-none hover:scale-105 focus:scale-105 transition-transform ease-in-out"
      />
    </Link>
  );
}
