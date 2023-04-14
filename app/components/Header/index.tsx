import { MailIcon } from "@heroicons/react/outline";
import { NavLink } from "remix";
import Logo from "../Logo";

export default function Header() {
  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out outline-none hover:border-cyan-500 hover:text-cyan-500 focus:border-cyan-500 focus:text-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";

  return (
    <header className="w-full px-10 mb-4 lg:mb-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between bg-transparent text-slate-300 relative">
      <Logo />
      <nav className="flex items-center justify-between gap-8 text-xl">
        <NavLink
          to="/catalogo/filmes"
          role="button"
          className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Filmes
        </NavLink>
        <NavLink
          to="/catalogo/series"
          role="button"
          className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Séries
        </NavLink>
        <NavLink
          to="/contato"
          title="Entre em contato"
          className="opacity-80 hover:opacity-90 transition-opacity text-white"
        >
          <MailIcon className="w-8 h-8" />
        </NavLink>
      </nav>
    </header>
  );
}
