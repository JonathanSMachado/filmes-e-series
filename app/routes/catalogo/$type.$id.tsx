import { useEffect, useState } from "react";
import { Link, LoaderFunction, Outlet, useFetcher, useLoaderData } from "remix";
import Card from "~/components/Card";
import { formatToPtBr } from "~/utils/date";
import {
  TMDBItem,
  TMDBItemDetails,
  TMDBResponse,
  MediaType,
} from "~/utils/type";
import { TMDBApi } from "~/api/TMDB";

export const loader: LoaderFunction = async ({ params }) => {
  const { type, id } = params;

  if (typeof type !== "string" || typeof id !== "string") {
    throw new Error("Invalid params.");
  }

  return await TMDBApi.getDetails({ type: type as MediaType, id });
};

export default function Details() {
  const item = useLoaderData<TMDBItemDetails>();

  const emptyTMDBResponse: TMDBResponse = {
    page: 1,
    total_pages: 1,
    total_results: 1,
    results: [],
  };

  const [recommendations, setRecommendations] =
    useState<TMDBResponse>(emptyTMDBResponse);
  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load(`/catalogo/${item.type}/${item.id}/recommendations?limit=6`);
  }, [item]);

  useEffect(() => {
    if (fetcher.data) {
      setRecommendations(fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <main className="mt-10 text-slate-400">
      <section
        className="flex flex-col sm:flex-row gap-10 p-10 py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${item.backdrop_path})`,
          backgroundColor: "rgba(0,0,0,.7)",
          backgroundBlendMode: "darken",
        }}
      >
        <Card item={item} size={"large"} />
        <article>
          <h1 className="text-4xl text-slate-300">{item.title}</h1>
          <p className="text-sm">
            {item.release_date &&
              `Data do lançamento ${formatToPtBr(item.release_date)}`}
          </p>
          {item.tagline && <p className="italic my-6">{item.tagline}</p>}
          <div className="mt-6">
            <h3 className="text-2xl mb-4 font-semibold text-slate-300">
              Sinopse
            </h3>
            <p className="text-xl text-slate-200">{item.overview}</p>
          </div>
        </article>
      </section>
      <section className="p-10">
        <p className="text-xl text-slate-300 mb-10">Recomendados</p>
        <div className="flex flex-wrap justify-around items-center gap-6">
          {recommendations.results.map((item: TMDBItem) => (
            <Card
              key={`${item.type}-${item.id}`}
              item={item}
              size="small"
              link={`/catalogo/${item.type}/${item.id}`}
            />
          ))}
        </div>

        <Outlet context={recommendations.results} />

        {recommendations.results.length < recommendations.total_results && (
          <Link to={`recommendations`}>Ver mais</Link>
        )}
      </section>
    </main>
  );
}
