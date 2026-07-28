import { Heart } from "lucide-react";
import type { TMDBItem, TMDBItemDetails } from "~/core/lib/TMDB/types";
import { useFavorites } from "~/hooks/useFavorites";

type FavoriteButtonProps = {
  item: TMDBItem | TMDBItemDetails;
  className?: string;
};

export function FavoriteButton({ item, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites();

  // Se não estiver hidratado (SSR), não renderiza o estado interativo para evitar mismatch
  if (!isHydrated) return null;

  const favorite = isFavorite(item);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`group flex items-center justify-center p-2 rounded-full backdrop-blur-md border shadow-md transition-all duration-300 transform active:scale-90 ${
        favorite
          ? "bg-rose-500/20 border-rose-500/50 hover:bg-rose-500/30 shadow-rose-500/20"
          : "bg-slate-900/60 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600/80 shadow-slate-900/50"
      } ${className}`}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-300 ${
          favorite
            ? "fill-rose-500 text-rose-500 scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
            : "text-slate-300 group-hover:text-rose-400 group-hover:scale-110"
        }`}
      />
    </button>
  );
}
