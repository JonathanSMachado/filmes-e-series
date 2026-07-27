import { SearchIcon, X } from "lucide-react";
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

  const handleClear = () => {
    setQuery("");
    submit({ search: "" }, { replace: true, action: activeAction });
  };

  return (
    <Form
      method={method}
      action={activeAction}
      className="flex w-full max-w-2xl mx-auto group"
    >
      <div className="relative flex items-center w-full shadow-2xl rounded-full">
        <SearchIcon className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors pointer-events-none z-10" />

        <input
          type="text"
          name="search"
          value={query}
          placeholder={activePlaceholder}
          className="w-full h-12 sm:h-14 pl-12 pr-12 rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-100 text-sm sm:text-base placeholder:text-slate-500 backdrop-blur-xl transition-all duration-300 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 shadow-inner"
          onChange={(e) => setQuery(e.currentTarget.value)}
        />

        {query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
            title="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </Form>
  );
}
