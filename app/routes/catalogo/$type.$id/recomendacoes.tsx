import { useEffect, useState } from "react";
import { LoaderFunction, json, useLoaderData, useOutletContext } from "remix";
import { TMDBApi } from "~/api/TMDB";
import Card from "~/components/Card";
import { TMDBItem, TMDBResponse } from "~/utils/types";

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response> => {
  const type = params.type;
  const id = Number(params.id);
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit"));

  if (!type || typeof type !== "string" || !id || typeof id !== "number") {
    throw new Error("Invalid params.");
  }

  const data = await TMDBApi.getRecommendations({
    type,
    id,
    page,
    limit,
  });

  return json(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};

export default function Recommendations() {
  const data = useLoaderData<TMDBResponse>();
  const oldItems = useOutletContext<TMDBItem[]>();

  const [items, setItems] = useState(oldItems);

  useEffect(() => {
    if (!oldItems.length || !data.results.length) {
      return;
    }

    setItems(
      data.results.filter((item) => {
        const oldIds = oldItems.map((oldItem) => oldItem.id);
        return !oldIds.includes(item.id);
      })
    );
  }, [oldItems, data]);

  return (
    <div className="flex flex-wrap justify-around items-center gap-y-10 gap-x-6 ">
      {items.map((item: TMDBItem) => (
        <Card
          key={`${item.media_type_slug}-${item.id}`}
          item={item}
          size="small"
          link={`/catalogo/${item.media_type_slug}/${item.id}`}
        />
      ))}
    </div>
  );
}
