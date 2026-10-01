import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function SiteLayout({ children }) {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-shell__main">{children}</main>
      <Footer />
    </div>
  );
}
