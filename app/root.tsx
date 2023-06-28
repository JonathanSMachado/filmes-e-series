import { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  V2_MetaFunction,
  useTransition,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";
import progressBarStyles from "react-circular-progressbar/dist/styles.css";
import tailwindStyles from "~/styles/tailwind.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Filmes e Séries" },
    { name: "description", content: "Catálogo de filmes e séries" },
    { property: "og:title", content: "Filmes e Séries" },
    { property: "og:description", content: "Catálogo de filmes e séries" },
    { property: "og:image", content: "" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://filmes-e-series.vercel.app/" },
    { property: "og:site_name", content: "Filmes e Séries" },
    { property: "twitter:title", content: "Filmes e Séries" },
    { property: "twitter:description", content: "Catálogo de filmes e séries" },
    { property: "twitter:image", content: "" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:url", content: "https://filmes-e-series.vercel.app/" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwindStyles,
    },
    {
      rel: "stylesheet",
      href: nProgressStyles,
    },
    {
      rel: "icon",
      type: "image/ico",
      href: "/fav_icon.ico",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
    },
    {
      rel: "stylesheet",
      href: progressBarStyles,
    },
  ];
};

export default function App() {
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === "idle") {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }, [transition.state]);

  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col items-center bg-gradient-to-tr from-slate-900 to-slate-700 min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
