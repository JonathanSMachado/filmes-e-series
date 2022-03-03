import { LoaderFunction, Outlet } from "remix";
import Header from "~/components/Header";
import Layout from "~/layout/Layout";

export const loader: LoaderFunction = async ({ request }) => {
  // const url = request.url
  //   .split("/")
  //   .filter((el) => el !== "")
  //   .pop();

  return false;
};

// export default function Detalhes() {
//   return <Layout></Layout>;
// }
