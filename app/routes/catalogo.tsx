import { Outlet, useMatches } from "remix";
import Layout from "~/layout/Layout";

export default function CatalogLayout() {
  const matches = useMatches();
  const showHero = !matches.at(matches.length - 1)?.params.id;

  return (
    <Layout showHero={showHero}>
      <Outlet />
    </Layout>
  );
}
