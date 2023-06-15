import { LoaderFunction, json } from "remix";
import { TMDBApi } from "~/api/TMDB";
import AppError from "~/components/AppError";
import IndexPage from "~/pages";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  const url = new URL(request.url);
  const period = url.searchParams.get("tendencias");
  const data = await TMDBApi.getTrending({ period });

  return json(data, {
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};

export default function Index() {
  return <IndexPage />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
