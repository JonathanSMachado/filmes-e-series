import { LoaderFunction, json, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import CardContainer from "~/components/CardContainer";
import { getPage } from "~/utils/general";
import { TMDBItem } from "~/utils/types";

type LoaderData = {
  items: TMDBItem[];
  search: string | undefined;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const url = new URL(request.url);
  const page = getPage(url.searchParams);
  const search = url.searchParams.get("search");
  let items: TMDBItem[] = [];

  if (search) {
    items = await TMDBApi.search({ query: search, page });
  } else {
    items = await TMDBApi.getMostPopular({ page });
  }

  return json(
    { search, items },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};

export default function Catalog() {
  const { search, items } = useLoaderData<LoaderData>();

  return (
    <>
      {search && (
        <p className="text-slate-400 text-xl mx-10 mb-16">
          Resultado da busca por <em>{search}</em>
        </p>
      )}
      <CardContainer items={items} infinityScroll={true} search={search} />
    </>
  );
}
