import { useEffect, useState } from "react";
import { json, LoaderFunction, useLoaderData, useOutletContext } from "remix";
import Card from "~/components/Card";
import { MediaType, TMDBItem, TMDBResponse } from "~/utils/type";
import { TMDBApi } from "~/api/TMDB";

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
    type: type as MediaType,
    id,
    page,
    limit,
  });

  return json(data);
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
    <div className="flex flex-wrap justify-around items-center gap-6">
      {items.map((item: TMDBItem) => (
        <Card
          key={`${item.type}-${item.id}`}
          item={item}
          size="small"
          link={`/catalogo/${item.type}/${item.id}`}
        />
      ))}
    </div>
  );
}
