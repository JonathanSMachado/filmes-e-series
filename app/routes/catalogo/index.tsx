import { LoaderFunction, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import CardContainer from "~/components/CardContainer";
import { TMDBItem } from "~/utils/type";

const getPage = (searchParams: URLSearchParams) => {
  const page = searchParams.get("page");
  return page ? parseInt(page) : 1;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<TMDBItem[]> => {
  const url = new URL(request.url);
  const page = getPage(url.searchParams);
  const search = url.searchParams.get("search");

  if (search) {
    return TMDBApi.search({ query: search, page });
  }

  return TMDBApi.getMostPopular({ page });
};

export default function Catalog() {
  const items = useLoaderData<TMDBItem[]>();

  return (
    <CardContainer items={items} showSearch={true} infinityScroll={true} />
  );
}
