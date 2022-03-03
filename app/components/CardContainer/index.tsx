import { useCallback, useEffect, useState } from "react";
import { Form, useFetcher } from "remix";
import { CardContainerProps, TMDBItem } from "~/utils/type";
import Card from "../Card";

const sortByPopularity = (a: TMDBItem, b: TMDBItem) =>
  b.vote_average - a.vote_average;

export default function CardContainer(props: CardContainerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [height, setHeight] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [page, setPage] = useState(2);
  const fetcher = useFetcher();
  const [items, setItems] = useState<TMDBItem[]>(props.items);

  const mainHeight = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [items.length]
  );

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
    if (clientHeight + scrollPosition + 400 < height) return;

    fetcher.load(`?page=${page}`);

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

  return (
    <main ref={mainHeight}>
      <div className="flex justify-center my-10">
        <Form method="post" action="">
          <input type="search" name="search" />
          <button type="submit">Procurar</button>
        </Form>
      </div>
      <div className="flex flex-wrap justify-around items-center gap-10">
        {items.sort(sortByPopularity).map((item: TMDBItem) => (
          <Card key={`${item.type}-${item.id}`} item={item} islink={true} />
        ))}
      </div>
    </main>
  );
}
