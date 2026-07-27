import { useEffect, useState } from "react";
import type { TMDBItem, TMDBItemDetails } from "~/core/lib/TMDB/types";

const FAVORITES_KEY = "@filmes-e-series:favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<TMDBItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error reading favorites from localStorage", error);
    }
    setIsHydrated(true);
  }, []);

  const toggleFavorite = (item: TMDBItem | TMDBItemDetails) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.id === item.id && fav.media_type_slug === item.media_type_slug
      );

      if (isAlreadyFavorite) {
        updatedFavorites = prevFavorites.filter(
          (fav) => !(fav.id === item.id && fav.media_type_slug === item.media_type_slug)
        );
      } else {
        const itemToSave: TMDBItem = {
          id: item.id,
          title: item.title,
          adult: item.adult,
          vote_average: item.vote_average,
          popularity: item.popularity,
          poster_path: item.poster_path,
          media_type_slug: item.media_type_slug,
          media_type: item.media_type,
          release_date: item.release_date,
          backdrop_path: item.backdrop_path,
          link: "link" in item ? item.link : `/${item.media_type_slug}/${item.id}`,
          genres: item.genres || [],
          overview: item.overview || "",
        };
        updatedFavorites = [...prevFavorites, itemToSave];
      }

      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error("Error saving favorites to localStorage", error);
      }

      return updatedFavorites;
    });
  };

  const isFavorite = (item: TMDBItem | TMDBItemDetails) => {
    return favorites.some(
      (fav) => fav.id === item.id && fav.media_type_slug === item.media_type_slug
    );
  };

  return { favorites, toggleFavorite, isFavorite, isHydrated };
}
