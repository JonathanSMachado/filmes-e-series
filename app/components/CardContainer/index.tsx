import { useCallback, useEffect, useState } from "react";
import { Form, useFetcher } from "remix";
import { CardContainerProps, TMDBItem } from "~/utils/type";
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
  const showSearch = props.showSearch || false;
  const infinityScroll = props.infinityScroll || false;
  const [search, setSearch] = useState<string | null>("");

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

        if (window && window.location.search.includes("search")) {
          const url = new URL(window.location.href);
          const search = url.searchParams.get("search");

          setSearch(search);
        }
      }

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", scrollListener);
        }
      };
    }, []);

    useEffect(() => {
      if (!shouldFetch || !height) return;
      if (clientHeight + scrollPosition + 400 < height) return;

      fetcher.load(
        `/catalogo?${search ? `search=${search}&` : ""}page=${page}`
      );

      setShouldFetch(false);
    }, [clientHeight, scrollPosition, fetcher]);

    useEffect(() => {
      if (fetcher.data && fetcher.data.length === 0) {
        setShouldFetch(false);
        return;
      }

      if (fetcher.data && fetcher.data.length > 0) {
        setItems((prevItems: TMDBItem[]) => [...prevItems, ...fetcher.data]);
        setPage((page: number) => page + 1);
        setShouldFetch(true);
      }
    }, [fetcher.data]);
  }

  return (
    <div ref={mainHeight} className="px-10 mt-10">
      {showSearch && (
        <div className="flex justify-center my-10">
          <Form reloadDocument method="get">
            <input
              type="search"
              name="search"
              placeholder="Buscar filmes e séries"
              className="rounded-l-md border border-r-0 border-slate-400 w-96 text-slate-700 focus:border-slate-400"
            />
            <button
              type="submit"
              className="rounded-r-md border border-l-0 border-slate-400 h-full px-7 text-slate-200 bg-slate-600 hover:bg-slate-500 transition-all ease-in-out"
            >
              Procurar
            </button>
          </Form>
        </div>
      )}
      <div className="flex flex-wrap justify-around items-center gap-6">
        {items.sort(sortByPopularity).map((item: TMDBItem) => (
          <Card
            key={`${item.type}-${item.id}`}
            item={item}
            link={`/catalogo/${item.type}/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
