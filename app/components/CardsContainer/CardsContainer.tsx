import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import { Film, Loader2 } from "lucide-react";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import type { ApiItemsLoader } from "~/utils/types";
import { Card, CardSkeleton } from "../Card";
import type { CardsContainerProps } from "./types";

export function CardsContainer(props: CardsContainerProps) {
  const [items, setItems] = useState(props.items);
  const [page, setPage] = useState(2);
  const fetcher = useFetcher<ApiItemsLoader>();
  const loaderRef = useRef<HTMLDivElement>(null);
  const { type, search, trends, infinityScroll = true } = props;
  const pageRequested = useRef<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setItems(props.items);
    setPage(2);
    setHasMore(true);
    pageRequested.current = null;
  }, [props.items, props.search, props.trends, props.type]);

  useEffect(() => {
    if (fetcher.data?.items) {
      if (fetcher.data.items.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => {
        const existingIds = new Set(prev.map((i) => `${i.media_type_slug}-${i.id}`));
        const uniqueNewItems = fetcher.data!.items.filter(
          (i) => !existingIds.has(`${i.media_type_slug}-${i.id}`),
        );

        return [...prev, ...uniqueNewItems];
      });

      if (fetcher.data.nextPage) {
        setPage(fetcher.data.nextPage);
      } else {
        setHasMore(false);
      }
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!infinityScroll || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (
          target.isIntersecting &&
          fetcher.state === "idle" &&
          page !== pageRequested.current
        ) {
          pageRequested.current = page;

          const params = new URLSearchParams();
          params.set("page", page.toString());
          if (type) params.set("type", type);
          if (search) params.set("search", search);
          if (trends) params.set("trends", trends);

          fetcher.load(`/api/items?${params.toString()}`);
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, fetcher.state, type, search, trends, infinityScroll, hasMore]);

  const isLoadingMore = fetcher.state === "loading";

  return (
    <div className="w-full space-y-8">
      {!items.length && !isLoadingMore ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-2xl text-center backdrop-blur-sm">
          <Film className="w-16 h-16 text-slate-600 mb-4 stroke-1 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-200 mb-1">
            Nenhum título encontrado
          </h3>
          <p className="text-sm text-slate-400 max-w-md">
            Não encontramos nenhum filme ou série correspondente à sua busca. Tente buscar por outros termos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 w-full">
          {items.map((item: TMDBItem) => (
            <Card
              key={`${item.media_type_slug}-${item.id}`}
              item={item}
              link={item.link}
              className="w-full aspect-2/3"
            />
          ))}

          {isLoadingMore && (
            <>
              <CardSkeleton className="w-full aspect-2/3" />
              <CardSkeleton className="w-full aspect-2/3" />
              <CardSkeleton className="w-full aspect-2/3" />
              <CardSkeleton className="w-full aspect-2/3" />
              <CardSkeleton className="w-full aspect-2/3 hidden lg:block" />
            </>
          )}
        </div>
      )}

      {infinityScroll && (
        <div
          ref={loaderRef}
          className="flex justify-center items-center py-8 min-h-16 text-slate-400"
        >
          {isLoadingMore ? (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
              <span className="text-xs font-medium text-slate-300">Carregando mais conteúdo...</span>
            </div>
          ) : !hasMore && items.length > 0 ? (
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              Você chegou ao fim do catálogo ✨
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
