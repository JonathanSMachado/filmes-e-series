import type { MetaFunction } from "react-router";
import { CardsContainer } from "~/components/CardsContainer";
import { MainLayout } from "~/layouts/Main";
import { useFavorites } from "~/hooks/useFavorites";

export const meta: MetaFunction = () => {
  return [
    { title: "Meus Favoritos | Filmes & Séries" },
    {
      name: "description",
      content: "Sua lista personalizada de filmes e séries favoritos.",
    },
  ];
};

export default function Favoritos() {
  const { favorites, isHydrated } = useFavorites();

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 mb-4 drop-shadow-sm">
            Meus Favoritos
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Sua coleção pessoal. Todos os filmes e séries que você marcou como
            favoritos estão salvos aqui.
          </p>
          <p className="text-slate-400 text-sm md:text-base mt-4">
            <span className="font-bold text-red-400 mr-2">Importante:</span>
            Atualmente, os favoritos são salvos apenas no navegador. Se você limpar
            os dados do navegador, perderá seus favoritos.
          </p>
        </div>

        {isHydrated ? (
          <CardsContainer
            items={favorites}
            infinityScroll={false}
            emptyTitle="Nenhum favorito ainda"
            emptyDescription="Você ainda não adicionou nenhum filme ou série aos seus favoritos. Navegue pelo catálogo e clique no coração para salvar seus títulos preferidos!"
          />
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
