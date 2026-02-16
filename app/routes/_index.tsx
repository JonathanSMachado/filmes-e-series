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
  let items: TMDBItem[] = [];
  const TMDBApi = new TMDB();

  if (search) {
    items = await TMDBApi.search({ query: search, page });
  } else {
    items = await TMDBApi.getMostPopular({ page });
  }

  return Response.json(
    { search, items },
    {
      headers: {
        "Cache-Control": "private, max-age=300",
      },
    },
  );
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { search, items } = loaderData as unknown as ApiItemsLoader;
  const location = useLocation();
  const getIsToday = (search: string) =>
    new URLSearchParams(search).get("trends") !== "week";

  const [isTodayActive, setIsTodayActive] = useState(() =>
    getIsToday(location.search ?? window.location.search),
  );

  useEffect(() => {
    setIsTodayActive(getIsToday(location.search ?? window.location.search));
  }, [location.search]);

  return (
    <MainLayout showHeroArea={true}>
      {search ? (
        <p className="text-2xl text-slate-300 my-4 text-center">
          Resultados da busca por{" "}
          <span className="italic font-semibold">{search}</span>
        </p>
      ) : (
        <SwitchTrends isTodayActive={isTodayActive} />
      )}

      <CardsContainer items={items} infinityScroll={true} search={search} />
    </MainLayout>
  );
}
