export function AdultAlert() {
  return (
    <div
      className="absolute bg-slate-200 rounded-full top-1 left-1 w-10 h-10 p-0.5"
      role="alert"
      aria-label="Adult content"
    >
      <div
        className="w-full h-full bg-[rgb(223_19_19)]"
        style={{
          mask: 'url("/images/18-plus.svg")',
          WebkitMask: 'url("/images/18-plus.svg")',
        }}
      ></div>
    </div>
  );
}
