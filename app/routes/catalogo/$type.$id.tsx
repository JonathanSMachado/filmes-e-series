import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactPlayer from "react-player";
import { TMDBApi } from "~/api/TMDB";
import Card from "~/components/Card";
import Score from "~/components/Card/Score";
import { convertMinutesToFormattedHours, formatDateToPtBr } from "~/utils/date";
import { TMDBItem, TMDBItemDetails } from "~/utils/types";

export const loader: LoaderFunction = async ({ params }): Promise<Response> => {
  const { type, id } = params;

  if (typeof type !== "string" || typeof id !== "string") {
    throw new Error("Invalid params.");
  }

  const [data, recommendations] = await Promise.all([
    TMDBApi.getDetails({ type, id }),
    TMDBApi.getRecommendations({
      type,
      id: +id,
      limit: 6,
    }),
  ]);

  return json(
    { ...data, recommendations },
    {
      headers: {
        "Cache-Control": "max-age=60, stale-while-revalidate=60",
      },
    }
  );
};

export default function Details() {
  const item = useLoaderData<TMDBItemDetails>();

  return (
    <>
      <section
        className="flex flex-col sm:flex-row items-center gap-10 p-10 py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${item.backdrop_path})`,
          backgroundColor: "rgba(0,0,0,.7)",
          backgroundBlendMode: "darken",
        }}
      >
        <Card item={item as TMDBItemDetails} size={"large"} showScore={false} />
        <article className="text-slate-200">
          <h1 className="text-4xl text-slate-100">{item.title}</h1>
          <p className="text-sm mt-2">
            {item.release_date && (
              <span>{formatDateToPtBr(item.release_date)} (BR)</span>
            )}
            {item.genres && (
              <>
                <span className="mx-2">-</span>
                <span>{item.genres.map((genre) => genre.name).join(", ")}</span>
              </>
            )}
            {item.runtime && (
              <>
                <span className="mx-2">-</span>
                <span>{convertMinutesToFormattedHours(item.runtime)}</span>
              </>
            )}
            {item.number_of_seasons && (
              <>
                <span className="mx-2">-</span>
                <span>
                  {item.number_of_seasons}{" "}
                  {"Temporada" + (item.number_of_seasons > 1 ? "s" : "")} (
                  {item.number_of_episodes} Episódios)
                </span>
              </>
            )}
          </p>
          {item.tagline && (
            <p className="italic my-6 text-slate-300">{item.tagline}</p>
          )}
          <div className="mt-6">
            <h2 className="text-2xl mb-4 font-semibold">Sinopse</h2>
            <p className="text-justify text-lg">
              {item.overview ? (
                item.overview
              ) : (
                <span className="italic">Nenhuma informação disponível</span>
              )}
            </p>
          </div>
          <div className="mt-6 flex items-center">
            <div className="w-20 h-20 hover:scale-110 transition-all">
              <Score value={item.vote_average} />
            </div>
            <p className="ml-2 text-slate-300">Avaliação dos usuários</p>
          </div>
        </article>
      </section>
      {item.videos?.length && (
        <section className="p-10">
          <h3 className="text-xl text-slate-300 mb-10">Vídeos</h3>
          <div className="flex flex-wrap gap-6">
            {item.videos.map((video) => {
              return (
                <div
                  className="w-72 md:w-96 h-44 md:h-64 relative"
                  key={video.id}
                >
                  <span className="absolute top-0 left-1 text-slate-300">
                    {video.name}
                  </span>
                  <ReactPlayer
                    url={video.url}
                    controls={true}
                    width="100%"
                    height="100%"
                    light={true}
                    pip={true}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
      {item.recommendations.length && (
        <section className="p-10">
          <h3 className="text-xl text-slate-300 mb-10">Recomendados</h3>
          <div className="flex flex-wrap gap-10 text-slate-400">
            {item.recommendations.map((item: TMDBItem) => (
              <Card
                key={`${item.media_type_slug}-${item.id}`}
                item={item}
                size="small"
                link={`/catalogo/${item.media_type_slug}/${item.id}`}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
