import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import { CardsContainer } from "~/components/CardsContainer";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import { MainLayout } from "~/layouts/Main";
import { convertMediaTypeToUILabel } from "~/utils/string-helpers";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Meus Favoritos | Filmes & Séries" },
    {
      name: "description",
      content: "Sua lista personalizada de filmes e séries favoritos.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { supabase } = createSupabaseServerClient(request);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { favorites: [] };
    }

    const { data, error } = await supabase
      .from("favorites")
      .select(
        "tmdb_id, title, poster_path, vote_average, media_type, overview, created_at",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Erro ao buscar favoritos no Supabase:", error);
      return { favorites: [] };
    }

    const favorites: TMDBItem[] = data.map((fav) => {
      const isMovie = fav.media_type === "movie";
      const itemTitle = fav.title || "";
      const mediaTypeLabel = convertMediaTypeToUILabel(fav.media_type);
      const mediaTypeSlug = isMovie ? "filme" : "serie";

      return {
        id: fav.tmdb_id,
        title: isMovie ? itemTitle : undefined,
        name: !isMovie ? itemTitle : undefined,
        poster_path: fav.poster_path,
        vote_average: fav.vote_average,
        media_type: mediaTypeLabel,
        overview: fav.overview || "",
        backdrop_path: fav.poster_path || "",
        adult: false,
        popularity: 0,
        vote_count: 0,
        genre_ids: [] as number[],
        genres: [] as { id: number; name: string }[],
        original_language: "pt",
        media_type_slug: mediaTypeSlug,
        link: `/${mediaTypeSlug}/${fav.tmdb_id}`,
      } as TMDBItem;
    });

    return { favorites };
  } catch (err) {
    console.error("Exceção no loader de favoritos:", err);
    return { favorites: [] };
  }
}

export default function Favoritos() {
  const data = useLoaderData<typeof loader>();
  const favorites = data?.favorites ?? [];

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 mb-4 drop-shadow-sm">
            Meus Favoritos
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Sua coleção pessoal. Todos os filmes e séries que você marcou como
            favoritos estão salvos aqui.
          </p>
        </div>

        <CardsContainer
          items={favorites}
          infinityScroll={false}
          emptyTitle="Nenhum favorito ainda"
          emptyDescription="Você ainda não adicionou nenhum filme ou série aos seus favoritos. Navegue pelo catálogo e clique no coração para salvar seus títulos preferidos!"
        />
      </div>
    </MainLayout>
  );
}
