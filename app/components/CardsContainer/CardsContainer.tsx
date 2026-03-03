import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { TMDBItem } from "~/core/lib/TMDB/types";
import type { ApiItemsLoader } from "~/utils/types";
import { Card, CardSkeleton } from "../Card";
import type { CardsContainerProps } from "./types";

export function CardsContainer(props: CardsContainerProps) {
  const [items, setItems] = useState(props.items);
  const [page, setPage] = useState(2);
  const fetcher = useFetcher<ApiItemsLoader>();
  const loaderRef = useRef(null);
  const type = props.type;
  const pageRequested = useRef<number | null>(null);

  useEffect(() => {
    setItems(props.items);
    setPage(2);
    pageRequested.current = null;
  }, [props.items]);

  useEffect(() => {
    if (fetcher.data?.items) {
      setItems((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const uniqueNewItems = fetcher.data!.items.filter(
          (i) => !existingIds.has(i.id),
        );

        return [...prev, ...uniqueNewItems];
      });

      if (fetcher.data.nextPage) setPage(fetcher.data.nextPage);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!props.infinityScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (
          target.isIntersecting &&
          fetcher.state === "idle" &&
          page !== pageRequested.current
        ) {
          pageRequested.current = page;

          let url = `/api/items?page=${page}`;

          if (type) {
            url += `&type=${type}`;
          }

          fetcher.load(url);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, fetcher.state, type, props.infinityScroll]);

  useEffect(() => setItems(props.items), [props.items]);

  return (
    <>
      <div className="grid place-items-center gap-6 auto-rows-max grid-cols-[repeat(auto-fill,minmax(240px,1fr))] px-4">
        {!items.length ? (
          <p className="text-center text-slate-300">Nenhum item encontrado!</p>
        ) : (
          items.map((item: TMDBItem) => (
            <Card
              key={`${item.media_type_slug}-${item.id}`}
              item={item}
              link={item.link}
              className="w-56 h-80"
            />
          ))
        )}

        {fetcher.state === "loading" && (
          <>
            <CardSkeleton className="w-56 h-80" />
            <CardSkeleton className="w-56 h-80" />
            <CardSkeleton className="w-56 h-80" />
            <CardSkeleton className="w-56 h-80" />
          </>
        )}
      </div>

      <div ref={loaderRef} className="h-10 w-full"></div>
    </>
  );
}
