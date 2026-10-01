export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {text ? <p className="lead">{text}</p> : null}
        {children}
      </div>
    </section>
  );
}
