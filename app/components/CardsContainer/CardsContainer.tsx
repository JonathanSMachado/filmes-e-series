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

  if (props.infinityScroll) {
    useEffect(() => {
      if (fetcher.data && fetcher.data.items) {
        setItems((prev) => [...prev, ...(fetcher.data?.items ?? [])]);
        if (fetcher.data.nextPage) setPage(fetcher.data.nextPage);
      }
    }, [fetcher.data]);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && fetcher.state === "idle" && page) {
          fetcher.load(`/api/items?page=${page}`);
        }
      });

      if (loaderRef.current) observer.observe(loaderRef.current);

      return () => observer.disconnect();
    }, [page, fetcher]);
  }

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

        {props.infinityScroll && fetcher.state === "loading" && (
          <>
            <CardSkeleton className="w-56 h-80" />
            <CardSkeleton className="w-56 h-80" />
            <CardSkeleton className="w-56 h-80" />
            <CardSkeleton className="w-56 h-80" />
          </>
        )}
      </div>

      <div
        ref={loaderRef}
        className="h-20 flex justify-center items-center"
      ></div>
    </>
  );
}
