export default function Footer() {
  const linkStyle =
    "cursor-pointer transition-colors ease-in-out text-cyan-700 hover:text-cyan-500";
  return (
    <footer className="container mt-8">
      <div className="flex items-center justify-center py-5 text-cyan-700">
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
