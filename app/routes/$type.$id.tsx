import ReactPlayer from "react-player";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Badge } from "~/components/Badge";
import { AdultAlert, Card, Score } from "~/components/Card";
import { TMDB } from "~/core/lib/TMDB/TMDB";
import type { TMDBItem, TMDBItemDetails } from "~/core/lib/TMDB/types";
import { MainLayout } from "~/layouts/Main";
import {
  convertMinutesToFormattedHours,
  formatReleaseDate,
} from "~/utils/date-helpers";

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
        className="relative flex flex-col md:flex-row items-center md:items-start gap-10 p-10 py-20 min-h-[550px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.7) 100%), url(${item.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Card item={item} className="w-72 h-96" showScore={false} />
        <article className="text-slate-200 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold text-slate-100">{item.title}</h1>
            {item.adult && <AdultAlert />}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm mt-3 text-slate-300">
            <span className="font-medium text-cyan-400">
              {formatReleaseDate(item.release_date ?? "")} (BR)
            </span>

            <span className="text-slate-500">•</span>

            <div className="flex gap-1">
              {item.genres.map((genre) => (
                <Badge key={genre.id} className="text-[10px]">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {item.runtime > 0 && (
              <>
                <span className="text-slate-500">•</span>
                <span>{convertMinutesToFormattedHours(item.runtime)}</span>
              </>
            )}
          </div>

          {item.tagLine && (
            <p className="italic my-6 text-slate-400 text-lg border-l-4 border-cyan-500/30 pl-4">
              "{item.tagLine}"
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 my-8 p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-1">
                Status
              </h4>
              <p className="text-sm font-medium">
                {item.release_date ? "Lançado" : "Em produção"}
              </p>
            </div>

            {item.number_of_seasons && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-1">
                  Duração
                </h4>
                <p className="text-sm font-medium">
                  {item.number_of_seasons} Temporada
                  {item.number_of_seasons > 1 ? "s" : ""}
                </p>
              </div>
            )}

            {item.homepage && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-1">
                  Site Oficial
                </h4>
                <a
                  href={item.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Visitar <span className="text-[10px]">↗</span>
                </a>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-2xl mb-2 font-semibold text-slate-100">
              Sinopse
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              {item.overview || (
                <span className="italic opacity-50">
                  Nenhuma sinopse disponível em português.
                </span>
              )}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative w-16 h-16 group">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/40 transition-colors rounded-full" />
              <Score value={item.vote_average} />
            </div>
            <div>
              <p className="text-slate-100 font-bold leading-none">Avaliação</p>
              <p className="text-slate-400 text-xs mt-1.5">
                Baseado em{" "}
                <span className="text-slate-200">
                  {item.vote_count.toLocaleString()}
                </span>{" "}
                votos
              </p>
            </div>
          </div>
        </article>
      </section>

      {item.videos && item.videos.length > 0 && (
        <section className="w-full p-10 bg-slate-950/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-100">
              Trailers e Vídeos
            </h3>
            <Badge>{item.videos.length} Vídeo(s)</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {item.videos.map((video) => (
              <div key={video.id} className="group flex flex-col gap-2">
                <div className="w-full h-44 md:h-60 relative rounded-xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl">
                  <ReactPlayer
                    src={video.url}
                    controls
                    width="100%"
                    height="100%"
                    light={true} // Melhora performance carregando apenas a imagem
                    playIcon={
                      <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-10 border-t-transparent border-l-15 border-l-white border-b-10 border-b-transparent ml-1" />
                      </div>
                    }
                  />
                </div>
                <div className="px-1">
                  <p className="text-sm font-medium text-slate-200 truncate">
                    {video.name}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                    {video.type} • {video.official ? "Oficial" : "Extra"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {item.recommendations.length ? (
        <section className="p-10">
          <h3 className="text-2xl font-bold text-slate-100 mb-8">
            Recomendados
          </h3>
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
            {item.recommendations.map((rec: TMDBItem) => (
              <div key={rec.id} className="min-w-45">
                <Card
                  item={rec}
                  className="w-full h-64"
                  link={`/${rec.media_type_slug}/${rec.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </MainLayout>
  );
}
