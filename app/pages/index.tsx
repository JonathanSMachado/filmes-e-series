import { useEffect, useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import CardContainer from "~/components/CardContainer";
import { SwitchTrends } from "~/components/SwitchTrends";
import Layout from "~/layout/Layout";
import { TMDBItem } from "~/utils/types";

export default function IndexPage() {
  const data = useLoaderData<TMDBItem[]>();
  const [isTodayActive, setIsTodayActive] = useState(true);

  useEffect(() => {
    setIsTodayActive(
      window.location.search.includes("tendencias=hoje") ||
        !window.location.search.includes("tendencias")
    );
  }, [data]);

  return (
    <Layout showHero={true}>
      <SwitchTrends isTodayActive={isTodayActive} />
      <CardContainer items={data} />
      <div className="mt-10 flex justify-center">
        <Link
          to={"catalogo"}
          className="btn btn-primary btn-medium mt-6 px-4 py-2 text-white"
        >
          Ver catálogo completo
        </Link>
      </div>
    </Layout>
  );
}
