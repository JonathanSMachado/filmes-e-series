import { MailIcon } from "@heroicons/react/outline";
import { NavLink } from "remix";
import Logo from "../Logo";
import Search from "../Search";

export default function Header() {
  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out outline-none hover:border-cyan-500 hover:text-cyan-500 focus:border-cyan-500 focus:text-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";

  return (
    <header className="w-full px-6 mb-4 lg:mb-0 flex flex-col lg:flex-row items-center justify-between bg-transparent text-slate-300 relative">
      <Logo />
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
        <div className="mx-0 my-4 lg:my-0 lg:mx-10">
          <Search method="get" action="/catalogo" />
        </div>
        <div className="flex items-center gap-3 absolute lg:relative top-6 lg:top-0 right-4 lg:right-auto">
          <a
            href="https://github.com/JonathanSMachado/filmes-e-series"
            target="_blank"
            className="opacity-90 hover:opacity-100 transition-opacity"
          >
            <img
              src="/images/GitHub-Mark-Light-32px.png"
              alt="Projeto no GitHub"
              title="Projeto no GitHub"
              width="32"
              height="32"
            />
          </a>
          <NavLink
            to="/contato"
            title="Entre em contato"
            className="opacity-80 hover:opacity-90 transition-opacity text-white"
          >
            <MailIcon className="w-8 h-8" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
