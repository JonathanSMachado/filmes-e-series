import { json, LoaderFunction, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import CardContainer from "~/components/CardContainer";
import { TMDBItem } from "~/utils/type";

const getPage = (searchParams: URLSearchParams) => {
  const page = searchParams.get("page");
  return page ? parseInt(page) : 1;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const url = new URL(request.url);
  const page = getPage(url.searchParams);
  const search = url.searchParams.get("search");
  let data: TMDBItem[] = [];

  if (search) {
    data = await TMDBApi.search({ query: search, page });
  } else {
    data = await TMDBApi.getMostPopular({ page });
  }

  return json(data);
};

export default function Catalog() {
  const items = useLoaderData<TMDBItem[]>();

  return (
    <CardContainer items={items} showSearch={true} infinityScroll={true} />
  );
}
