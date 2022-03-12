import { json, LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  const type = params.type;

  return json({ type });
};

export default function Type() {
  const { type } = useLoaderData();
  return <h1>{type}</h1>;
}
