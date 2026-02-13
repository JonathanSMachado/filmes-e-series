export function Footer() {
  const currentYear = new Date().getFullYear();
  const developerName = "Jonathan S. Machado";
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  return (
    <footer className="container mt-8 py-5 text-cyan-700">
      <p className="flex flex-col sm:flex-row sm:gap-3 justify-center items-center">
        <span>
          &copy;{currentYear}. Desenvolvido por
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-500 hover:underline"
          >
            {developerName}
          </a>
        </span>
        |
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Projeto no GitHub"
        >
          <img
            src="/images/github-mark-white.svg"
            alt="GitHub"
            className="w-7 h-7"
          />
        </a>
      </p>
    </footer>
  );
}
