import { Compass, Film, Sparkles, Tv } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import { Header } from "../Header";
import { Search } from "../Search";

export function HeroArea() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { items = [] } = useLoaderData<{ items?: TMDBItem[] }>() || {};

  const backdropPaths = items
    .map((item: TMDBItem) => item.backdrop_path)
    .filter(Boolean) as string[] | undefined;

  useEffect(() => {
    if (backdropPaths && backdropPaths.length > 0) {
      const randomBg =
        backdropPaths[Math.floor(Math.random() * backdropPaths.length)];
      setBgImage(randomBg ?? null);
    }
  }, [pathname, items]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pb-12 sm:pb-16 transition-all duration-700">
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 opacity-35 blur-[1px]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      <div className="absolute inset-0 bg-linear-to-b from-slate-950/90 via-slate-700/20 to-slate-950/90" />
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col w-full min-h-105">
        <Header />

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-6 mt-8 sm:mt-12 px-4 text-center">
          {isHome && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-cyan-950/50">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Explorar Filmes & Séries TMDB</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-100 tracking-tight leading-tight max-w-3xl">
                O que você quer assistir{" "}
                <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
                  hoje?
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300/90 max-w-xl font-normal leading-relaxed">
                Descubra sinopses, avaliações, trailers e produções em alta no
                nosso catálogo interativo em tempo real.
              </p>
            </div>
          )}

          <div className="w-full mt-2">
            <Search />
          </div>

          {isHome && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs sm:text-sm">
              <span className="text-slate-400 font-medium">Navegar por:</span>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Em Alta
              </Link>
              <Link
                to="/filmes"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all"
              >
                <Film className="w-3.5 h-3.5 text-cyan-400" />
                Filmes
              </Link>
              <Link
                to="/series"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all"
              >
                <Tv className="w-3.5 h-3.5 text-cyan-400" />
                Séries
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
