import ReactPlayer from "react-player";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Card, Score } from "~/components/Card";
import { TMDB } from "~/core/lib/TMDB/TMDB";
import { MainLayout } from "~/layouts/Main";
import {
  convertMinutesToFormattedHours,
  formatReleaseDate,
} from "~/utils/date-helpers";
import type { TMDBItem, TMDBItemDetails, TMDBVideo } from "~/utils/tmdb_types";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { type, id } = params;
  const TMDBApi = new TMDB();

  if (typeof type !== "string" || typeof id !== "string") {
    throw new Error("Invalid params.");
  }

  const [data, recommendations] = await Promise.all([
    TMDBApi.getDetails({ id: +id, type }),
    TMDBApi.getRecommendations({
      type,
      id: +id,
      limit: 6,
    }),
  ]);

  return Response.json(
    { ...data, recommendations },
    {
      headers: {
        "Cache-Control": "private, max-age=300",
      },
    },
  );
}

export default function Details() {
  const item = useLoaderData<TMDBItemDetails>();

  return (
    <MainLayout>
      <section
        className="flex flex-col sm:flex-row items-center gap-10 p-10 py-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${item.backdrop_path})`,
          backgroundColor: "rgba(0,0,0,.7)",
          backgroundBlendMode: "darken",
        }}
      >
        <Card
          item={item as TMDBItemDetails}
          className="w-72 h-96"
          showScore={false}
        />
        <article className="text-slate-200">
          <h1 className="text-4xl text-slate-100">{item.title}</h1>
          <p className="text-sm mt-2">
            {item.release_date && (
              <span>{formatReleaseDate(item.release_date)} (BR)</span>
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
          <div className="mt-6 flex items-center gap-2">
            <div className="relative w-16 h-16 hover:scale-110 transform-gpu transition-transform duration-500">
              <Score value={item.vote_average} />
            </div>
            <p className="text-slate-300">Avaliação dos usuários</p>
          </div>
        </article>
      </section>

      {item.videos?.length ? (
        <section className="w-full p-10">
          <h3 className="text-xl text-slate-300 mb-10">Vídeos</h3>
          <div className="grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(320px,1fr))] place-items-center gap-6 w-full">
            {item.videos.map((video: TMDBVideo) => {
              return (
                <div className="w-full h-44 md:h-64 relative" key={video.id}>
                  <span className="absolute -top-1 left-1 text-slate-300">
                    {video.name}
                  </span>

                  <ReactPlayer
                    src={video.url}
                    controls={true}
                    width="100%"
                    height="100%"
                    light={true}
                    pip={true}
                    wrapper="div"
                  />
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {item.recommendations?.length ? (
        <section className="p-10">
          <h3 className="text-xl text-slate-300 mb-10">Recomendados</h3>
          <div className="flex flex-wrap gap-10 text-slate-400">
            {item.recommendations.map((item: TMDBItem) => (
              <Card
                key={`${item.media_type_slug}-${item.id}`}
                item={item}
                className="w-44 h-64"
                link={`/${item.media_type_slug}/${item.id}`}
              />
            ))}
          </div>
        </section>
      ) : null}
    </MainLayout>
  );
}
