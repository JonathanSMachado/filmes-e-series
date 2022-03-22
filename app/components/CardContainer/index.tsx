import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "remix";
import { CardContainerProps, TMDBItem } from "~/utils/types";
import Card from "../Card";

const sortByPopularity = (a: TMDBItem, b: TMDBItem) =>
  b.popularity - a.popularity;

export default function CardContainer(props: CardContainerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [height, setHeight] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [page, setPage] = useState(2);
  const fetcher = useFetcher();
  const [items, setItems] = useState<TMDBItem[]>(props.items);
  const infinityScroll = props.infinityScroll || false;
  const [search, setSearch] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

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
        const url = new URL(window.location.href);
        setSearch(url.searchParams.get("search"));
        setType(url.pathname.split("/")[2]);
      }

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", scrollListener);
        }
      };
    }, []);

    useEffect(() => {
      if (!shouldFetch || !height) return;
      if (clientHeight + scrollPosition + 200 < height) return;

      let endpoint: string = `/catalogo?page=${page}`;

      if (search) {
        endpoint += `&search=${search}`;
      }

      if (type) {
        endpoint += `&type=${type}`;
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

  return (
    <div ref={mainHeight} className="px-6 mt-10">
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-10">
        {!items.length ? (
          <p className="text-slate-300">Nenhum item encontrado</p>
        ) : (
          items
            .sort(sortByPopularity)
            .map((item: TMDBItem) => (
              <Card
                key={`${item.type}-${item.id}`}
                item={item}
                link={`/catalogo/${item.type}/${item.id}`}
              />
            ))
        )}
      </div>
    </div>
  );
}
