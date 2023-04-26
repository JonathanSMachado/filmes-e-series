import { useEffect, useState } from "react";
import { useMatches } from "remix";
import Header from "../Header";
import { Search } from "../Search";

function getInputSearchPlaceholder(pathname: string) {
  if (pathname.includes("/filmes")) {
    return "Buscar filmes";
  }

  if (pathname.includes("/serie")) {
    return "Buscar séries";
  }

  return "Buscar filmes e séries";
}

export function HeroArea() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const matches = useMatches();
  const pathname = matches.at(matches.length - 1)?.pathname!;
  const action = pathname === "/" ? "/catalogo" : pathname!;
  const placeholder = getInputSearchPlaceholder(pathname);
  const isHome = pathname === "/";

  useEffect(() => {
    const items =
      matches.at(matches.length - 1)?.data?.items ||
      matches.at(matches.length - 1)?.data;

    const backgroundImage =
      items[Math.floor(Math.random() * items.length)].backdrop_path;

    setBackgroundImage(backgroundImage);
  }, [pathname]);

  return (
    <section
      className="hero flex flex-col w-full mb-4 min-h-[345px]"
      style={{
        backgroundColor: "rgba(0,0,0,.7)",
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      <div className="w-full self-center max-w-[768px] mt-7 px-4 text-slate-300">
        {isHome && (
          <>
            <h1 className="text-5xl">Bem vindo(a)!</h1>
            <h2 className="text-2xl mb-5">
              Explore nosso catálogo de filmes e séries
            </h2>
          </>
        )}
        <Search action={action} placeholder={placeholder} />
      </div>
    </section>
  );
}
