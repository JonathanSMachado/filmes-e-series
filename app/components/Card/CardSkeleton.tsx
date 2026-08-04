import type { CardProps } from "./types";

export function CardSkeleton(props: Partial<CardProps>) {
  return (
    <div
      className={`relative overflow-hidden aspect-2/3 bg-slate-900 border border-slate-800 rounded-2xl shadow-md p-4 ${props.className || ""}`}
    >
      {/* Camada do Brilho (Shimmer) */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-slate-800/60 to-transparent" />

      {/* Shapes inside skeleton */}
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="h-5 w-14 rounded-md bg-slate-800/80" />
          <div className="h-10 w-10 rounded-full bg-slate-800/80" />
        </div>
        <div className="space-y-2.5">
          <div className="h-4 w-3/4 rounded bg-slate-800/80" />
          <div className="h-3 w-1/2 rounded bg-slate-800/60" />
          <div className="flex gap-2 pt-1">
            <div className="h-4 w-12 rounded-full bg-slate-800/50" />
            <div className="h-4 w-12 rounded-full bg-slate-800/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
