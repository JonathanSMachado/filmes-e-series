import { useFetcher } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import { CardContainerProps, TMDBItem } from "~/utils/types";
import Card from "../Card";

export default function CardContainer(props: CardContainerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [height, setHeight] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [page, setPage] = useState(2);
  const fetcher = useFetcher();
  const [items, setItems] = useState<TMDBItem[]>(props.items);
  const infinityScroll = props.infinityScroll || false;
  const [type, setType] = useState(props.type);
  const [search, setSearch] = useState(props.search);

  const mainHeight = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [items.length]
  );

  if (infinityScroll) {
    useEffect(() => {
      const scrollListener = () => {
        setClientHeight(window.innerHeight);
        setScrollPosition(window.scrollY);
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
      if (!shouldFetch || !height) return;
      if (clientHeight + scrollPosition + 100 < height) return;

      let endpoint: string = `/catalogo${
        type ? `/${type}` : ""
      }?index&page=${page}`;

      if (search) {
        endpoint += `&search=${search}`;
      }

      fetcher.load(endpoint);

      setShouldFetch(false);
    }, [clientHeight, scrollPosition, fetcher]);

    useEffect(() => {
      const items = fetcher?.data?.items;

      if (items?.length === 0) {
        setShouldFetch(false);
        return;
      }

      if (items?.length > 0) {
        setItems((prevItems: TMDBItem[]) => [...prevItems, ...items]);
        setPage((page: number) => page + 1);
        setShouldFetch(true);
      }
    }, [fetcher.data]);
  }

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  useEffect(() => setType(props.type), [props.type]);
  useEffect(() => setSearch(props.search), [props.search]);

  return (
    <>
      <div ref={mainHeight} className="card-container">
        {!items.length ? (
          <p className="text-slate-300">Nenhum item encontrado!</p>
        ) : (
          items.map((item: TMDBItem) => (
            <Card
              key={`${item.media_type_slug}-${item.id}`}
              item={item}
              link={`/catalogo/${item.media_type_slug}/${item.id}`}
            />
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
