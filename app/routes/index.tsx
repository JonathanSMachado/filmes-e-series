import { useEffect, useState } from "react";
import { Form, json, LoaderFunction, NavLink, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import AppError from "~/components/AppError";
import Button from "~/components/Button";
import CardContainer from "~/components/CardContainer";
import HeroArea from "~/components/HeroArea";
import Layout from "~/layout/Layout";
import { TMDBItem } from "~/utils/types";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const url = new URL(request.url);
  const period = url.searchParams.get("tendencias");
  const data = await TMDBApi.getTrending({ period });

  return json(data);
};

export default function Index() {
  const data = useLoaderData<TMDBItem[]>();
  const [isTodayActive, setIsTodayActive] = useState(true);

  useEffect(() => {
    setIsTodayActive(
      window.location.search.includes("tendencias=hoje") ||
        !window.location.search.includes("tendencias")
    );
  }, [data]);

  return (
    <Layout>
      <HeroArea />
      <div className="px-10 flex items-center">
        <h3 className="text-2xl text-slate-300">Tendências</h3>
        <nav className="relative ml-10 flex bg-slate-300 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 bottom-0 rounded-full bg-cyan-500 w-full z-10 transition-all ease-in-out duration-200 ${
              isTodayActive ? "-translate-x-32" : "translate-x-16"
            }`}
          ></div>
          <NavLink
            to="?tendencias=hoje"
            className={`px-4 py-1 rounded-full bg-transparent z-10 ${
              isTodayActive && "text-slate-200"
            }`}
          >
            Hoje
          </NavLink>
          <NavLink
            to="?tendencias=semana"
            className={`px-4 py-1 rounded-full bg-transparent z-10 ${
              !isTodayActive && "text-slate-200"
            }`}
          >
            Nesta semana
          </NavLink>
        </nav>
      </div>
      <CardContainer items={data} />
      <div className="mt-10 flex justify-center">
        <Form action="catalogo">
          <Button className="mt-6" type="submit" size="large" variant="primary">
            Ver catálogo completo
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
