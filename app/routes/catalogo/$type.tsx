import { json, LoaderFunction, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import CardContainer from "~/components/CardContainer";
import { TMDBItem } from "~/utils/types";

type LoaderData = {
  items: TMDBItem[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const type = params.type;
  const items = await TMDBApi.getMostPopular({ type });

  return json(
    { items },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};

export default function Type() {
  const { items } = useLoaderData<LoaderData>();

  return <CardContainer items={items} infinityScroll={true} />;
}
