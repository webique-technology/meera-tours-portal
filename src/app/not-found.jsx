import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container state-box">
        <h1>That page has left the terminal</h1>
        <p>The link may be outdated. Head home or start a new search.</p>
        <Link href="/" className="btn btn--primary">
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
