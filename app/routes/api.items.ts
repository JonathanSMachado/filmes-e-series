import type { LoaderFunctionArgs } from "react-router";
import { TMDB } from "~/core/lib/TMDB/TMDB";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import type { ApiItemsLoader } from "~/utils/types";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<ApiItemsLoader> {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const search = url.searchParams.get("search");
  const type = url.searchParams.get("type");
  let items: TMDBItem[] = [];
  const TMDBApi = new TMDB();

  if (search) {
    items = await TMDBApi.search({ query: search, type, page });
  } else {
    items = await TMDBApi.getMostPopular({ type, page });
  }

  return {
    search,
    type,
    items,
    nextPage: items.length ? page + 1 : null,
  };
}
