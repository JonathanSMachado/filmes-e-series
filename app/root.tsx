import { useTransition } from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";
import progressBarStyles from "react-circular-progressbar/dist/styles.css";
import type { MetaFunction } from "remix";
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import tailwindStyles from "~/styles/tailwind.css";

export const meta: MetaFunction = () => {
  return {
    title: "Filmes e Séries",
    description: "Catálogo de filmes e séries",

    "og:type": "website",
    "og:url": "https://filmes-e-series.vercel.app/",
    "og:title": "Filmes e Séries",
    "og:description": "Catálogo de filmes e séries atualizado.",
    "og:image": "",
    "twitter:card": "summary_large_image",
    "twitter:url": "https://filmes-e-series.vercel.app/",
    "twitter:title": "Filmes e Séries",
    "twitter:description": "Catálogo de filmes e séries atualizado.",
    "twitter:image": "",
  };
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
