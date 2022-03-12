import { useEffect, useState } from "react";
import { Link, NavLink } from "remix";

export default function Header() {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(window.location.pathname === "/");
  }, []);

  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out hover:border-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";

  return (
    <header className="container flex items-center justify-between bg-transparent text-slate-300">
      <Link to="/">
        <img
          src="/images/logo.png"
          alt="Filmes e Séries"
          className="w-64 h-auto hover:scale-105 transition-transform ease-in-out"
        />
      </Link>
      <nav className="flex gap-6 text-xl">
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
      </nav>
    </header>
  );
}
