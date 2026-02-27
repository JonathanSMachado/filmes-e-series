import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import { Header } from "../Header";
import { Search } from "../Search";

export function HeroArea() {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { items } = useLoaderData<{ items: TMDBItem[] | [] }>();

  const backdropPaths = items
    .map((item: TMDBItem) => item.backdrop_path)
    .filter(Boolean) as string[] | undefined;

  useEffect(() => {
    if (backdropPaths && backdropPaths.length > 0) {
      const randomBg =
        backdropPaths[Math.floor(Math.random() * backdropPaths.length)];
      setBgImage(randomBg ?? null);
    }
  }, [pathname]);

  return (
    <section
      className="hero flex flex-col gap-4 w-full min-h-86 pb-8"
      style={{
        backgroundColor: bgImage ? "rgba(0, 0, 0, 0.7)" : "transparent",
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
      }}
    >
      <Header />
      <div className="w-full self-center flex flex-col gap-6 max-w-2xl mt-7 px-2 text-slate-300">
        {isHome && (
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl">Bem vindo(a)!</h1>
            <h2 className="text-2xl">
              Explore nosso catálogo de filmes e séries
            </h2>
            <p>
              Aqui você pode visualizar a sinópse dos filmes e séries, assim
              como ver as notas e trailers dos mesmos
            </p>
          </div>
        )}
        <Search />
      </div>
    </section>
  );
}
