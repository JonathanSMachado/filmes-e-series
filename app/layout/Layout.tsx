import { useEffect, useState } from "react";
import Header from "~/components/Header";
import HeroArea from "~/components/HeroArea";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
