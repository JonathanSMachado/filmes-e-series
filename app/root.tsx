import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ProgressBar } from "./components/ProgressBar";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    type: "image/ico",
    href: "/fav_icon.ico",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Filmes & Séries" },
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
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col items-center bg-linear-to-tr from-slate-950 to-slate-700 min-h-screen">
        <ProgressBar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
