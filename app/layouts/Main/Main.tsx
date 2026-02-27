import { ArrowUp } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Header } from "~/components/Header";
import { HeroArea } from "~/components/HeroArea";

type MasterLayoutProps = {
  showHeroArea?: boolean;
  children: ReactNode;
};

export default function MainLayout(props: MasterLayoutProps) {
  const { showHeroArea = false, children } = props;

  useEffect(() => {
    const backToTopButton = document.getElementById("back-to-top");

    backToTopButton?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        backToTopButton?.classList.remove("hidden");
      } else {
        backToTopButton?.classList.add("hidden");
      }
    });
  }, []);

  return (
    <>
      {showHeroArea ? <HeroArea /> : <Header />}
      <main className="w-full grow py-10">{children}</main>

      <button
        id="back-to-top"
        title="Voltar ao topo"
        className="hidden fixed bottom-5 right-6 z-10 border-0 outline-none bg-cyan-700 cursor-pointer p-2 rounded-full text-lg transition-all hover:bg-cyan-500"
      >
        <ArrowUp className="w-5 h-5 text-slate-300 hover:text-white" />
      </button>
    </>
  );
}
