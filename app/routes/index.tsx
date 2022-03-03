import { ActionFunction, LoaderFunction, useLoaderData } from "remix";
import CardContainer from "~/components/CardContainer";
import AppError from "~/components/AppError";
import { TMDBItem } from "~/utils/type";
import { TMDBApi } from "~/api/TMDB";

const getPage = (searchParams: URLSearchParams) =>
  Number(searchParams.get("page") || "1");

export const loader: LoaderFunction = async ({
  request,
}): Promise<TMDBItem[]> => {
  const page = getPage(new URL(request.url).searchParams);

  return await TMDBApi.discover({});
};

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);

  console.log(url);
};

export default function Index() {
  const items = useLoaderData<TMDBItem[]>();

  return <CardContainer items={items} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
