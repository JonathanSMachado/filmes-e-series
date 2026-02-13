import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";
import { Link, NavLink } from "react-router";
import { Logo } from "../Logo";

export function Header() {
  const linkStyle =
    "text-slate-300 border-b-2 border-transparent transition-all ease-in-out outline-none hover:border-cyan-500 hover:text-cyan-500 focus:border-cyan-500 focus:text-cyan-500";
  const activeLinkStyle = "border-b-2 border-cyan-500";

  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  return (
    <header className="w-full px-10 py-2 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 bg-transparent text-slate-300 relative">
      <Logo />
      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xl">
        <NavLink
          to="/"
          role="button"
          className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Início
        </NavLink>
        <NavLink
          to="/filmes"
          role="button"
          className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Filmes
        </NavLink>
        <NavLink
          to="/series"
          role="button"
          className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Séries
        </NavLink>
        <NavLink
          to="/contato"
          role="button"
          title="Entre em contato"
          className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
        >
          Contato
        </NavLink>
      </nav>

      <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xl">
        <Link
          to={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Projeto no GitHub"
          className={`${linkStyle} hover:border-transparent`}
        >
          <SiGithub className="w-7 h-7" />
        </Link>
        <Link
          to={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Perfil no LinkedIn"
          className={`${linkStyle} hover:border-transparent`}
        >
          <Linkedin className="w-7 h-7" />
        </Link>
      </nav>
    </header>
  );
}
