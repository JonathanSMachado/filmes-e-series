import type { CardProps } from "./types";

export function CardSkeleton(props: Partial<CardProps>) {
  return (
    <div
      className={`relative overflow-hidden aspect-2/3 bg-gray-200 p-4 shrink-0 rounded-md shadow-slate-700 shadow-lg ring-1 ring-slate-700 animate-pulse ${props.className}`}
    >
      {/* Camada do Brilho (Shimmer) */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />

      {/* Conteúdo do Card (Formas estáticas) */}
      <div className="space-y-3">
        <div className="h-24 w-full rounded-lg bg-gray-300"></div>
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
