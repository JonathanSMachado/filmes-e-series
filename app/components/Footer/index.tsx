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
        <span className="hidden sm:block px-3">&</span>
        <a
          href="https://www.themoviedb.org/documentation/api"
          target="_blank"
          rel="noreferrer"
          className={linkStyle}
        >
          The Movie Database API
        </a>
        <span className="px-3 font-bold">|</span>
        <a
          href="https://github.com/JonathanSMachado/filmes-e-series"
          target="_blank"
          className="opacity-60 hover:opacity-90 focus:opacity-90 transition-opacity"
        >
          <img
            src="/images/github-mark-white.svg"
            alt="Projeto no GitHub"
            title="Projeto no GitHub"
            width="32"
            height="32"
          />
        </a>
      </p>
    </footer>
  );
}
