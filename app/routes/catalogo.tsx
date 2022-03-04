import { Outlet } from "remix";
import Layout from "~/layout/Layout";

export default function CatalogLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
