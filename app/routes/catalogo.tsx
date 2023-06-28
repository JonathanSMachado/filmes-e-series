import { Outlet, useMatches } from "@remix-run/react";
import AppError from "~/components/AppError";
import Layout from "~/layout/Layout";

export default function CatalogLayout() {
  const matches = useMatches();
  const showHero = !matches[matches.length - 1]?.params.id;

  return (
    <Layout showHero={showHero}>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
