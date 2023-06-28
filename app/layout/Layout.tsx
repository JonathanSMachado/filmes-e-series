import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { HeroArea } from "~/components/HeroArea";

type LayoutProps = {
  showHero?: boolean;
  children?: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { showHero, children } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const backToTopButton = document.getElementById("back-to-top-button");

      backToTopButton?.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      window.onscroll = function () {
        if (
          document.body.scrollTop > 100 ||
          document.documentElement.scrollTop > 100
        ) {
          backToTopButton?.classList.remove("hidden");
        } else {
          backToTopButton?.classList.add("hidden");
        }
      };
    }
  }, []);

  return (
    <>
      {showHero ? <HeroArea /> : <Header />}
      <main className="w-full flex-grow">{children}</main>
      <Footer />
      <button
        id="back-to-top-button"
        title="Voltar ao topo"
        className="hidden fixed bottom-5 right-6 border-0 outline-none bg-cyan-700 cursor-pointer p-2 rounded-full text-lg transition-all hover:bg-cyan-500"
      >
        <ArrowUpIcon className=" w-5 h-5 text-slate-300 hover:text-slate-100" />
      </button>
    </>
  );
}
