import Link from "next/link";

export default function SectionHead({
  eyebrow,
  title,
  text,
  href,
  cta,
  WrapperClass,
}) {
  return (
    <div className={`section__head d-flex flex-row justify-content-center justify-content-md-between align-items-center ${WrapperClass}`}>
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2 className="fs-1 fw-bold">{title}</h2>
        {text ? <p className="lead">{text}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="btn btn-warning">
          {cta || "View all"}
        </Link>
      ) : null}
    </div>
  );
}
