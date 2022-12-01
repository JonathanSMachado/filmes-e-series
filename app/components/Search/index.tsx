import { Form, useTransition } from "remix";

type SearchProps = {
  action: string;
  method: "get" | "post";
};

export default function Search(props: SearchProps) {
  const { action, method } = props;
  const transition = useTransition();

  return (
    <Form method={method} action={action} className="flex" id="form-search">
      <input
        type="search"
        name="search"
        required
        placeholder="Buscar filmes e séries..."
        autoComplete="off"
        className="w-auto sm:w-80 rounded-r-none rounded-l-md border border-slate-400 border-r-0 text-slate-700 outline-none focus:border-slate-400"
      />
      <button
        type="submit"
        className="rounded-r-md border border-l-0 border-slate-400 h-auto px-7 text-slate-200 bg-slate-600 hover:bg-cyan-600 hover:text-slate-100 transition-all ease-in-out"
      >
        {transition.state !== "idle" ? "Buscando..." : "Buscar"}
      </button>
    </Form>
  );
}
