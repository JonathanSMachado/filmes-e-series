import { json, LoaderFunction, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import CardContainer from "~/components/CardContainer";
import { TMDBItem } from "~/utils/types";

const getPage = (searchParams: URLSearchParams) => {
  const page = searchParams.get("page");
  return page ? parseInt(page) : 1;
};

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
  const type = url.searchParams.get("type");
  let items: TMDBItem[] = [];

  if (search) {
    items = await TMDBApi.search({ query: search, page });
  } else if (type) {
    items = await TMDBApi.getMostPopular({ type, page });
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
        <p className="text-slate-300 text-xl">
          Resultado da busca por <em className="text-slate-100">{search}</em>
        </p>
      )}
      <CardContainer items={items} infinityScroll={true} />
    </>
  );
}
