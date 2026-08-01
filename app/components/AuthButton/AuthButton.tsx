import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useFetcher } from "react-router";
import type AuthButtonProps from "./AuthButtonProps";

export default function AuthButton({
  iconOnly = false,
  label = "Entrar com Google",
  className = "",
  onClick,
}: AuthButtonProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/api/auth/google">
      <button
        type="submit"
        onClick={onClick}
        title={iconOnly ? label : undefined}
        aria-label={label}
        disabled={fetcher.state !== "idle"}
        className={`
          group relative flex items-center justify-center gap-3
          bg-slate-800/90 hover:bg-slate-800
          border border-slate-700/80 hover:border-slate-600
          text-slate-200 hover:text-white font-medium text-sm
          rounded-xl transition-all duration-200 ease-in-out
          active:scale-[0.98] shadow-md hover:shadow-cyan-500/10
          backdrop-blur-sm overflow-hidden
          ${iconOnly ? "p-3" : "px-5 py-3 w-full"}
          ${className}
        `}
      >
        <span className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <SiGoogle
          title={label}
          className="w-5 h-5 shrink-0 text-[#4285F4] group-hover:scale-110 transition-transform duration-200"
        />
        {!iconOnly && <span className="truncate tracking-wide">{label}</span>}
      </button>
    </fetcher.Form>
  );
}
