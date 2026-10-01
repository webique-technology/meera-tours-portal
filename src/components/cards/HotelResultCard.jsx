import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import { formatINRCode, stars } from "@/utils/format";

export default function HotelResultCard({ item, checkIn = "", checkOut = "" }) {
  const features = item.features?.length ? item.features : (item.amenities || []).slice(0, 4);
  const query = new URLSearchParams();
  if (checkIn) query.set("checkIn", checkIn);
  if (checkOut) query.set("checkOut", checkOut);
  const href = `/hotels/${item.slug}${query.toString() ? `?${query.toString()}` : ""}`;

  return (
    <article className="hotel-tile p-3 rounded-4">
      <Link href={href} className="hotel-tile__media">
        <SmartImage src={item.image} alt={item.name} sizes="(max-width: 800px) 100vw, 33vw" className={"rounded-4"}/>
      </Link>
      <div className="hotel-tile__body p-0 mt-2">
        <h3>
          <Link href={href}>{item.name}</Link>
        </h3>
        <p className="hotel-tile__meta">
          <span>{stars(item.stars).replace(/☆/g, "")}</span>
          <em>{item.propertyType || "Hotel"}</em>
        </p>
        <p className="hotel-tile__copy">{item.summary}</p>
        <ul className="hotel-tile__amenities">
          {features.slice(0, 5).map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
        <div className="hotel-tile__price">
          <div>
            <span>For 1 Room per night</span>
            <small>(With Taxes & Fee)</small>
          </div>
          <strong>{formatINRCode(item.priceFrom)}</strong>
        </div>
      </div>
    </article>
  );
}
