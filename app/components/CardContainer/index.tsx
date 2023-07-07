import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useReducer } from "react";
import { CardContainerProps, TMDBItem } from "~/utils/types";
import { Card } from "../Card";
import { Score } from "../Score";

export default function CardContainer(props: CardContainerProps) {
  const [state, updateState] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      scrollPosition: 0,
      clientHeight: 0,
      height: null,
      shouldFetch: true,
      page: 2,
      items: props.items,
      type: props.type,
      search: props.search,
    }
  );
  const fetcher = useFetcher();
  const infinityScroll = props.infinityScroll || false;

  const mainHeight = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        updateState({ height: node.getBoundingClientRect().height });
      }
    },
    [state.items.length]
  );

  if (infinityScroll) {
    useEffect(() => {
      const scrollListener = () => {
        updateState({
          clientHeight: window.innerHeight,
          scrollPosition: window.scrollY,
        });
      };

      if (typeof window !== "undefined") {
        window.addEventListener("scroll", scrollListener);
      }

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", scrollListener);
        }
      };
    }, []);

    useEffect(() => {
      if (!state.shouldFetch || !state.height) return;
      if (state.clientHeight + state.scrollPosition + 100 < state.height)
        return;

      let endpoint: string = `/catalogo${
        state.type ? `/${state.type}` : ""
      }?index&page=${state.page}`;

      if (state.search) {
        endpoint += `&search=${state.search}`;
      }

      fetcher.load(endpoint);

      updateState({ shouldFetch: false });
    }, [state.clientHeight, state.scrollPosition, fetcher]);

    useEffect(() => {
      const items = fetcher?.data?.items;

      if (items?.length === 0) {
        updateState({ shouldFetch: false });
        return;
      }

      if (items?.length > 0) {
        updateState({
          items: [...state.items, ...items],
          page: state.page + 1,
        });
        updateState({ shouldFetch: true });
      }
    }, [fetcher.data]);
  }

  useEffect(() => {
    updateState({ items: props.items });
  }, [props.items]);

  useEffect(() => updateState({ type: props.type }), [props.type]);
  useEffect(() => updateState({ search: props.search }), [props.search]);

  return (
    <>
      <div ref={mainHeight} className="card-container">
        {!state.items.length ? (
          <p className="text-slate-300">Nenhum item encontrado!</p>
        ) : (
          state.items.map((item: TMDBItem) => (
            <Card
              key={`${item.media_type_slug}-${item.id}`}
              item={item}
              link={`/catalogo/${item.media_type_slug}/${item.id}`}
            >
              <Score value={item.vote_average} />
            </Card>
          ))
        )}
      </div>
      {fetcher.state === "loading" && (
        <div className="flex justify-center mt-10 text-slate-300">
          <span className="inline-flex items-center gap-px">
            <span className="animate-blink mx-px h-3 w-3 rounded-full bg-cyan-500"></span>
            <span className="animate-blink animation-delay-200 mx-px h-3 w-3 rounded-full bg-cyan-500"></span>
            <span className="animate-blink animation-delay-[400ms] mx-px h-3 w-3 rounded-full bg-cyan-500"></span>
          </span>
        </div>
      )}
    </>
  );
}
