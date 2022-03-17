export default function Footer() {
  const linkStyle =
    "cursor-pointer transition-colors ease-in-out text-cyan-700 hover:text-cyan-500";
  return (
    <footer className="container mt-8 py-5 text-cyan-700">
      <p className="flex flex-col sm:flex-row justify-center items-center">
        Desenvolvido com &nbsp;
        <a
          href="https://remix.run"
          target="_blank"
          rel="noreferrer"
          className={linkStyle}
        >
          Remix.run
        </a>
        <span className="hidden sm:block">&nbsp; & &nbsp;</span>
        <a
          href="https://www.themoviedb.org/documentation/api"
          target="_blank"
          rel="noreferrer"
          className={linkStyle}
        >
          The Movie Database API
        </a>
      </p>
    </footer>
  );
}
