import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TMDBApi } from "~/api/TMDB";
import CardContainer from "~/components/CardContainer";
import { getPage } from "~/utils/general";
import { TMDBItem } from "~/utils/types";

type LoaderData = {
  items: TMDBItem[];
  type: "filmes" | "series";
  search?: string;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const type = params.type;
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const page = getPage(url.searchParams);

  let items: TMDBItem[] = [];

  if (search) {
    items = await TMDBApi.search({ query: search, page, type });
  } else {
    items = await TMDBApi.getMostPopular({ page, type });
  }

  return json(
    { items, type, search },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};

export default function Type() {
  const { items, type, search } = useLoaderData<LoaderData>();

  return (
    <>
      {search && (
        <p className="text-slate-400 text-xl mx-10 mb-16">
          Resultado da busca por <em>{search}</em>
        </p>
      )}
      <CardContainer
        items={items}
        infinityScroll={true}
        type={type}
        search={search}
      />
    </>
  );
}
