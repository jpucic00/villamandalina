import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skipLink">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
