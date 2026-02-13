import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, useLocation, useSearchParams, useSubmit } from "react-router";
import { getInputSearchPlaceholder } from "../HeroArea/utils";
import type { SearchProps } from "./types";

export function Search({ action, placeholder, method = "get" }: SearchProps) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const activeAction = action ?? pathname;
  const activePlaceholder = placeholder ?? getInputSearchPlaceholder(pathname);
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== (searchParams.get("search") ?? "")) {
        submit({ search: query }, { replace: true, action: activeAction });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, submit, activeAction, activePlaceholder]);

  return (
    <Form
      method={method}
      action={activeAction}
      className="flex w-full max-w-3xl mx-auto"
    >
      <div className="relative text-slate-300 w-full">
        <input
          type="search"
          name="search"
          value={query}
          placeholder={activePlaceholder}
          className="w-full h-10 pl-4 pr-10 rounded-full bg-slate-700 border border-cyan-700 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-slate-500"
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <button type="submit" className="absolute right-0 top-2 mr-4">
          <SearchIcon className="text-slate-400" />
        </button>
      </div>
    </Form>
  );
}
