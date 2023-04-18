import { useEffect, useState } from "react";
import Header from "../Header";
import { Search } from "../Search";

type HeroAreaProps = {
  backgroundImage?: string;
};

export function HeroArea(props: HeroAreaProps) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (props.backgroundImage) {
      setStyle({
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundColor: "rgba(0,0,0,.7)",
        backgroundBlendMode: "darken",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      });
    }
  }, [props]);

  return (
    <section className="hero flex flex-col w-full mb-4" style={style}>
      <Header />
      <div className="w-full self-center max-w-[768px] mt-7 px-4 text-slate-300">
        <h1 className="text-5xl">Bem vindo(a)!</h1>
        <h2 className="text-2xl mb-5">
          Explore nosso catálogo de filmes e séries
        </h2>
        <Search />
      </div>
    </section>
  );
}
