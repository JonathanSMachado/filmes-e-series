import { ArrowUp } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Footer } from "~/components/Footer";
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

    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton?.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
        backToTopButton?.classList.add("opacity-100", "translate-y-0");
      } else {
        backToTopButton?.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
        backToTopButton?.classList.remove("opacity-100", "translate-y-0");
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    backToTopButton?.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);

    return () => {
      backToTopButton?.removeEventListener("click", scrollToTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      {showHeroArea ? <HeroArea /> : <Header />}
      <main className="w-full grow py-8 sm:py-12">{children}</main>
      <Footer />

      <button
        id="back-to-top"
        title="Voltar ao topo"
        aria-label="Voltar ao topo da página"
        className="opacity-0 pointer-events-none translate-y-4 fixed bottom-6 right-6 z-50 p-3 rounded-full bg-slate-900/90 border border-slate-700/80 text-cyan-400 hover:text-white hover:bg-cyan-600 shadow-2xl backdrop-blur-md transition-all duration-300 cursor-pointer group"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
