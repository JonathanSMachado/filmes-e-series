import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { CardsContainer } from "~/components/CardsContainer";
import { Search } from "~/components/Search";
import { TMDB } from "~/core/lib/TMDB/TMDB";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import { MainLayout } from "~/layouts/Main";
import type { ApiItemsLoader } from "~/utils/types";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const type = params.type;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const search = url.searchParams.get("search");
  let items: TMDBItem[] = [];
  const TMDBApi = new TMDB();

  if (search) {
    items = await TMDBApi.search({ query: search, page, type });
  } else {
    items = await TMDBApi.getMostPopular({ page, type });
  }

  return Response.json(
    { search, items, type },
    {
      headers: {
        "Cache-Control": "private, max-age=300",
      },
    },
  );
}

export default function Type() {
  const { items, search } = useLoaderData<ApiItemsLoader>();

  return (
    <MainLayout>
      <div className="flex flex-col gap-10">
        <Search />
        {search && (
          <p className="text-2xl text-slate-300 my-4 text-center">
            Resultado da busca por{" "}
            <span className="italic font-semibold">{search}</span>
          </p>
        )}
        <CardsContainer items={items} infinityScroll={true} search={search} />
      </div>
    </MainLayout>
  );
}
