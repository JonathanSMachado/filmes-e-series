import { useEffect, useState } from "react";
import Header from "~/components/Header";
import HeroArea from "~/components/HeroArea";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showHeroArea, setShowHeroArea] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setShowHeroArea(true);
    }
  }, []);

  return (
    <>
      <Header />
      {showHeroArea && <HeroArea />}
      {children}
    </>
  );
}
