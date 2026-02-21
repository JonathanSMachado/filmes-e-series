export function VideoSkeleton() {
  return (
    <div className="w-full h-44 md:h-64 bg-slate-800 animate-pulse rounded-lg flex items-center justify-center">
      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-slate-600 border-b-8 border-b-transparent ml-1" />
      </div>
    </div>
  );
}
