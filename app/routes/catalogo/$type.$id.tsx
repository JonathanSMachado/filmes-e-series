import { useEffect, useState } from "react";
import { json, LoaderFunction, useFetcher, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import Card from "~/components/Card";
import { convertMinutesToFormattedHours, formatDateToPtBr } from "~/utils/date";
import { TMDBItem, TMDBItemDetails, TMDBResponse } from "~/utils/types";

export const loader: LoaderFunction = async ({ params }): Promise<Response> => {
  const { type, id } = params;

  if (typeof type !== "string" || typeof id !== "string") {
    throw new Error("Invalid params.");
  }

  const data = await TMDBApi.getDetails({ type, id });

  return json(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
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
    fetcher.load(`/catalogo/${item.type}/${item.id}/recomendacoes?limit=6`);
  }, [item]);

  useEffect(() => {
    if (fetcher.data) {
      setRecommendations(fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <>
      <section
        className="flex flex-col sm:flex-row gap-10 p-10 py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${item.backdrop_path})`,
          backgroundColor: "rgba(0,0,0,.7)",
          backgroundBlendMode: "darken",
        }}
      >
        <Card item={item} size={"large"} />
        <article className="text-slate-400">
          <h1 className="text-4xl text-slate-300">{item.title}</h1>
          <p className="text-sm mt-2">
            {item.release_date && formatDateToPtBr(item.release_date)}
            <span className="mx-2">-</span>
            {item.genres.map((genre) => genre.name).join(", ")}
            <span className="mx-2">-</span>
            {convertMinutesToFormattedHours(item.runtime)}
          </p>
          {item.tagline && <p className="italic my-6">{item.tagline}</p>}
          <div className="mt-6">
            <h3 className="text-2xl mb-4 font-semibold text-slate-300">
              Sinopse
            </h3>
            <p className="text-justify text-xl text-slate-200">
              {item.overview ? (
                item.overview
              ) : (
                <span className="italic">Nenhuma informação disponível</span>
              )}
            </p>
          </div>
        </article>
      </section>
      <section className="p-10">
        <p className="text-xl text-slate-300 mb-10">Recomendados</p>
        <div className="flex flex-wrap justify-around items-center gap-6 mb-10 text-slate-400">
          {recommendations.results.length ? (
            recommendations.results.map((item: TMDBItem) => (
              <Card
                key={`${item.type}-${item.id}`}
                item={item}
                size="small"
                link={`/catalogo/${item.type}/${item.id}`}
              />
            ))
          ) : (
            <p>Ainda não existem recomendações para este título!</p>
          )}
        </div>
      </section>
    </>
  );
}
