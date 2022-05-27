import { ArrowUpIcon } from "@heroicons/react/outline";
import { Action, KBarProvider } from "kbar";
import { useEffect } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const actions: Action[] = [
    {
      id: "films",
      name: "Filmes",
      shortcut: ["f"],
      keywords: "filmes",
      perform: () => (window.location.pathname = "catalogo/filmes"),
    },
    {
      id: "series",
      name: "Séries",
      shortcut: ["s"],
      keywords: "séries",
      perform: () => (window.location.pathname = "catalogo/series"),
    },
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home",
      perform: () => (window.location.pathname = "/"),
    },
  ];

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
    <KBarProvider actions={actions}>
      <Header />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
      <button
        id="back-to-top-button"
        title="Voltar ao topo"
        className="hidden fixed bottom-5 right-6 border-0 outline-none bg-cyan-700 cursor-pointer p-2 rounded-full text-lg transition-all hover:bg-cyan-500"
      >
        <ArrowUpIcon className=" w-5 h-5 text-slate-300 hover:text-slate-100" />
      </button>
    </KBarProvider>
  );
}
