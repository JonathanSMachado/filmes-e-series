import { Form, json, LoaderFunction, useLoaderData } from "remix";
import { TMDBApi } from "~/api/TMDB";
import AppError from "~/components/AppError";
import Button from "~/components/Button";
import CardContainer from "~/components/CardContainer";
import HeroArea from "~/components/HeroArea";
import Layout from "~/layout/Layout";
import { TMDBItem } from "~/utils/type";

export const loader: LoaderFunction = async (): Promise<Response> => {
  const data = await TMDBApi.getTrending({ limit: 12 });

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
