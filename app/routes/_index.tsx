import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CardsContainer } from "~/components/CardsContainer";
import { SwitchTrends } from "~/components/SwitchTrends";
import { TMDB } from "~/core/lib/TMDB/TMDB";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import { MainLayout } from "~/layouts/Main";
import type { ApiItemsLoader } from "~/utils/types";
import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const search = url.searchParams.get("search");
  const trends = url.searchParams.get("trends") || "day";
  let items: TMDBItem[] = [];
  const TMDBApi = new TMDB();

  if (search) {
    items = await TMDBApi.search({ query: search, page });
  } else {
    items = await TMDBApi.getTrending({
      period: trends === "week" ? "week" : "day",
      page,
    });
  }

  return Response.json(
    { search, trends, items },
    {
      headers: {
        "Cache-Control": "private, max-age=300",
      },
    },
  );
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { search, trends, items } = loaderData as unknown as ApiItemsLoader;
  const location = useLocation();

  const currentTrends = new URLSearchParams(location.search).get("trends") ?? trends ?? "day";
  const isTodayActive = currentTrends !== "week";

  return (
    <MainLayout showHeroArea={true}>
      <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {search ? (
          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center">
              Resultados para <span className="text-cyan-400 font-semibold">"{search}"</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Exibindo os principais títulos encontrados no catálogo
            </p>
          </div>
        ) : (
          <SwitchTrends isTodayActive={isTodayActive} />
        )}

        <CardsContainer
          items={items}
          infinityScroll={true}
          search={search}
          trends={isTodayActive ? "day" : "week"}
        />
      </div>
    </MainLayout>
  );
}
