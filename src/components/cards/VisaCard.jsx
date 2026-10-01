import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import { formatINR } from "@/utils/format";

export default function VisaCard({ item }) {
  return (
    <article className="card-3d">
      <Link href={`/visa/${item.slug}`} className="card-3d__media">
        <SmartImage src={item.image} alt={item.title} sizes="(max-width: 800px) 100vw, 33vw" />
      </Link>
      <div className="card-3d__body">
        <span className="chip">{item.type}</span>
        <h3>
          <Link href={`/visa/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="lead">{item.processingDays} · {item.validity}</p>
        <div className="card-3d__meta">
          <div className="price">
            {formatINR(item.price)}
            <small>service fee from</small>
          </div>
          <Link href={`/visa/${item.slug}`} className="btn btn--outline">
            Documents
          </Link>
        </div>
      </div>
    </article>
  );
}
