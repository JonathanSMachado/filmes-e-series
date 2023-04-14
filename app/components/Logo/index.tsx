import { Link } from "remix";

export default function Logo() {
  return (
    <Link to="/">
      <img
        src="/images/logo.png"
        alt="Filmes e Séries"
        className="w-64 h-auto outline-none hover:scale-105 focus:scale-105 transition-transform ease-in-out delay-1000"
        width="256"
        height="110"
      />
    </Link>
  );
}
