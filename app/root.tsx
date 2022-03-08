import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "~/styles/tailwind.css";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useTransition } from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return { title: "Catálogo de Filmes e Séries" };
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col bg-gradient-to-tr from-slate-900 to-slate-700 min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
