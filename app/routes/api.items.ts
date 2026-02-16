import type { LoaderFunctionArgs } from "react-router";
import { TMDB } from "~/core/lib/TMDB/TMDB";
import type { TMDBItem } from "~/utils/tmdb_types";
import type { ApiItemsLoader } from "~/utils/types";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<ApiItemsLoader> {
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

  return {
    search,
    items,
    nextPage: items.length ? page + 1 : null,
  };
}
