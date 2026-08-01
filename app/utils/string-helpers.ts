import type { DBMediaType } from "~/core/lib/Supabase/types";
import type { TMDBFormattedType, TMDBType } from "~/core/lib/TMDB/types";

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Converte o tipo para a API do TMDB (retorna "movie" | "tv")
 */
export function convertTypeToTMDBType(type: string): TMDBType {
  const t = type.toLowerCase();
  if (t === "series" || t === "séries" || t === "serie" || t === "tv") {
    return "tv";
  }
  return "movie";
}

/**
 * Converte o tipo para gravar na tabela "favorites" do Supabase (retorna "movie" | "serie")
 */
export function convertMediaTypeToDBType(type: string): DBMediaType {
  const t = type.toLowerCase();
  if (t === "series" || t === "séries" || t === "serie" || t === "tv") {
    return "serie";
  }
  return "movie";
}

/**
 * Converte o tipo para a UI / Exibição no Frontend (retorna "Filmes" | "Séries")
 */
export function convertMediaTypeToUILabel(type: string): TMDBFormattedType {
  const t = type.toLowerCase();
  if (t === "series" || t === "séries" || t === "serie" || t === "tv") {
    return "Séries";
  }
  return "Filmes";
}
