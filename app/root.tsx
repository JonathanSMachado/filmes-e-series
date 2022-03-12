import { useTransition } from "@remix-run/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";
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
      href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap",
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
      <body className="flex flex-col items-center bg-gradient-to-tr from-slate-800 to-slate-600 min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
