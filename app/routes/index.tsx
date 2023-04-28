import { useEffect, useState } from "react";
import { Link, LoaderFunction, json, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import AppError from "~/components/AppError";
import CardContainer from "~/components/CardContainer";
import { SwitchTrends } from "~/components/SwitchTrends";
import Layout from "~/layout/Layout";
import { TMDBItem } from "~/utils/types";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const url = new URL(request.url);
  const period = url.searchParams.get("tendencias");
  const data = await TMDBApi.getTrending({ period });

  return json(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};

export default function Index() {
  const data = useLoaderData<TMDBItem[]>();
  const [isTodayActive, setIsTodayActive] = useState(true);

  useEffect(() => {
    setIsTodayActive(
      window.location.search.includes("tendencias=hoje") ||
        !window.location.search.includes("tendencias")
    );
  }, [data]);

  return (
    <Layout showHero={true}>
      <SwitchTrends isTodayActive={isTodayActive} />
      <CardContainer items={data} />
      <div className="mt-10 flex justify-center">
        <Link
          to={"catalogo"}
          className="btn btn-primary btn-medium mt-6 px-4 py-2 text-white"
        >
          Ver catálogo completo
        </Link>
      </div>
    </Layout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
