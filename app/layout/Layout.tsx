import Footer from "~/components/Footer";
import Header from "~/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </>
  );
}
