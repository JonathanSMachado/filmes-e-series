import { Link, NavLink } from "remix";
import Search from "../Search";

export default function Header() {
  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out outline-none hover:border-cyan-500 hover:text-cyan-500 focus:border-cyan-500 focus:text-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";

  return (
    <header className="w-full px-6 flex flex-col lg:flex-row items-center justify-between bg-transparent text-slate-300">
      <Link to="/" className="self-start">
        <img
          src="/images/logo.png"
          alt="Filmes e Séries"
          className="w-64 h-auto outline-none hover:scale-105 focus:scale-105 transition-transform ease-in-out"
          width="256"
          height="110"
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
        <div className="mx-0 my-4 lg:my-0 lg:mx-14">
          <Search method="get" action="/catalogo" />
        </div>
        <a
          href="https://github.com/JonathanSMachado/filmes-e-series"
          target="_blank"
          className="absolute top-10 right-4 ml-14 opacity-90 hover:opacity-100 transition-opacity"
        >
          <img
            src="/images/GitHub-Mark-Light-32px.png"
            alt="Projeto no GitHub"
            title="Projeto no GitHub"
            width="32"
            height="32"
          />
        </a>
      </div>
    </header>
  );
}
