import { Form, json, LoaderFunction, useLoaderData } from "remix";
import CardContainer from "~/components/CardContainer";
import AppError from "~/components/AppError";
import { TMDBItem } from "~/utils/type";
import { TMDBApi } from "~/api/TMDB";
import Layout from "~/layout/Layout";
import HeroArea from "~/components/HeroArea";

export const loader: LoaderFunction = async (): Promise<Response> => {
  const data = await TMDBApi.getMostPopular({ limit: 12 });

  return json(data);
};

export default function Index() {
  const data = useLoaderData<TMDBItem[]>();

  return (
    <Layout>
      <HeroArea />
      <CardContainer items={data} />
      <div className="px-10 mt-10 flex justify-center">
        <Form action="catalogo">
          <button
            type="submit"
            className="px-5 py-3 rounded-xl border border-slate-500 text-slate-400 shadow-md shadow-slate-700 hover:bg-slate-700 hover:scale-105 hover:shadow-lg hover:shadow-slate-700 transition-all ease-in-out duration-100"
          >
            Ver catálogo completo
          </button>
        </Form>
      </div>
    </Layout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
