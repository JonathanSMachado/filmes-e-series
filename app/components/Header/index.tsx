import { Link, NavLink } from "remix";
import Search from "../Search";

export default function Header() {
  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out hover:border-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";

  return (
    <header className="container w-full px-6 flex flex-col lg:flex-row items-center justify-between bg-transparent text-slate-300">
      <Link to="/">
        <img
          src="/images/logo.png"
          alt="Filmes e Séries"
          className="w-64 h-auto hover:scale-105 transition-transform ease-in-out"
        />
      </Link>
      <div className="flex flex-col lg:flex-row items-center">
        <nav className="flex gap-6 text-xl">
          <NavLink
            to="/catalogo/filmes"
            role="button"
            className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
          >
            Filmes
          </NavLink>
          <NavLink
            to="/catalogo/series"
            role="button"
            className={({ isActive }) =>
              isActive ? activeLinkStyle : linkStyle
            }
          >
            Séries
          </NavLink>
        </nav>
        <div className="m-0 lg:ml-14">
          <Search method="get" action="/catalogo" />
        </div>
      </div>
    </header>
  );
}
