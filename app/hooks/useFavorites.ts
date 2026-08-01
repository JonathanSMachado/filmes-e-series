// app/hooks/useFavorites.ts
import { useCallback, useEffect, useState } from "react";
import type { TMDBItem, TMDBItemDetails } from "~/core/lib/TMDB/types";
import { convertMediaTypeToDBType } from "~/utils/string-helpers";
import { supabase } from "~/utils/supabase.client";

export function useFavorites() {
  const [favoritesMap, setFavoritesMap] = useState<Map<number, boolean>>(
    new Map(),
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (isMounted) {
          setIsHydrated(true);
        }
        return;
      }

      if (isMounted) {
        setUserId(session.user.id);
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("tmdb_id")
        .eq("user_id", session.user.id);

      if (!error && data && isMounted) {
        const map = new Map<number, boolean>();
        data.forEach((fav) => map.set(fav.tmdb_id, true));
        setFavoritesMap(map);
      }

      if (isMounted) {
        setIsHydrated(true);
      }
    }

    loadFavorites();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUserId(null);
        setFavoritesMap(new Map());
      } else if (session.user.id !== userId) {
        setUserId(session.user.id);
        setIsAuthModalOpen(false);
        loadFavorites();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isFavorite = useCallback(
    (item: TMDBItem | TMDBItemDetails) => {
      return !!favoritesMap.get(item.id);
    },
    [favoritesMap],
  );

  const toggleFavorite = useCallback(
    async (item: TMDBItem | TMDBItemDetails) => {
      if (!userId) {
        setIsAuthModalOpen(true);
        return;
      }

      const mediaType = convertMediaTypeToDBType(item.media_type);
      const title = item.title;
      const currentlyFavorite = favoritesMap.get(item.id);

      setFavoritesMap((prevMap) => {
        const nextMap = new Map(prevMap);

        if (currentlyFavorite) {
          nextMap.delete(item.id);
        } else {
          nextMap.set(item.id, true);
        }

        return nextMap;
      });

      if (currentlyFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("tmdb_id", item.id)
          .eq("media_type", mediaType);

        if (error) {
          console.error("Erro ao remover favorito:", error);
          setFavoritesMap((prevMap) => new Map(prevMap).set(item.id, true));
        }
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: userId,
          tmdb_id: item.id,
          media_type: mediaType,
          title: title || "",
          poster_path: item.poster_path || "",
          vote_average: item.vote_average || 0,
          overview: item.overview || "",
        });

        if (error) {
          console.error("Erro ao adicionar favorito:", error);
          setFavoritesMap((prevMap) => {
            const nextMap = new Map(prevMap);
            nextMap.delete(item.id);
            return nextMap;
          });
        }
      }
    },
    [userId, favoritesMap],
  );

  return {
    isFavorite,
    toggleFavorite,
    isHydrated,
    isAuthModalOpen,
    closeAuthModal: () => setIsAuthModalOpen(false),
  };
}
