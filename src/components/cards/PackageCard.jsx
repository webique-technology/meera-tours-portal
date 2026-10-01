import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import { formatINR } from "@/utils/format";

export default function PackageCard({ item }) {
  return (
    <article className="card-3d shadow-none">
      <Link href={`/holiday-packages/${item.slug}`} className="card-3d__media">
        <SmartImage src={item.image} alt={item.title} sizes="(max-width: 800px) 100vw, 33vw" />
      </Link>
      <div className="card-3d__body">
        <div className="card-3d__meta">
          <span className="chip">{item.theme}</span>
          <span>{item.nights}N / {item.days}D</span>
        </div>
        <h3>
          <Link href={`/holiday-packages/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="lead">{item.destination}, {item.country}</p>
        <div className="card-3d__meta">
          <div className="price">
            {formatINR(item.price)}
            <small>per person</small>
          </div>
          <Link href={`/holiday-packages/${item.slug}`} className="btn btn--navy">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
