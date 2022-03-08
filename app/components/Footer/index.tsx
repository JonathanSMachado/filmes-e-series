export default function Footer() {
  const linkStyle =
    "cursor-pointer transition-colors ease-in-out text-slate-500 hover:text-slate-400";
  return (
    <footer className="absolute bottom-0 left-0 right-0">
      <div className="flex items-center justify-center py-5 text-slate-500">
        <p>
          Desenvolvido com
          <span className="mx-4">|</span>
          <a
            href="https://remix.run"
            target="_blank"
            rel="noreferrer"
            className={linkStyle}
          >
            Remix.run
          </a>
          <span className="mx-4">|</span>
          <a
            href="https://www.themoviedb.org/documentation/api"
            target="_blank"
            rel="noreferrer"
            className={linkStyle}
          >
            The Movie Database API
          </a>
        </p>
      </div>
    </footer>
  );
}
