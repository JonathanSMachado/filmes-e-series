import { twMerge } from "tailwind-merge";
import type { BadgeProps } from "./BadgeProps";

export function Badge({ children, className = "" }: BadgeProps) {
  const baseStyles =
    "text-[9px] text-slate-200 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/10";

  return <span className={twMerge(baseStyles, className)}>{children}</span>;
}
