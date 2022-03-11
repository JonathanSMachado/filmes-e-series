import { useEffect, useState } from "react";

export default function Header() {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(window.location.pathname === "/");
  }, []);

  return (
    <header className="bg-transparent text-zinc-300">
      HEADER
      {!isHome && (
        <a href="/" className="float-right">
          Voltar
        </a>
      )}
    </header>
  );
}
