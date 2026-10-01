import Link from "next/link";
import SmartImage from "@/components/common/SmartImage";
import { formatINR, stars } from "@/utils/format";
import { Card } from "react-bootstrap";
import { CommonBtn, FaveHeartButton } from "@/components/common/Button";
import { ArrowUpRight } from "lucide-react";

export default function HotelCard({ item }) {
  return (
    <Card className="p-3 border-0 rounded-4 overflow-hidden position-relative h-100">
      {/* Media Wrapper */}
      <div className="position-relative rounded-4 card-3d__media overflow-hidden">
        <Link href={`/hotels/${item.slug}`} className="d-block w-100 h-100">
          <SmartImage
            src={item.image}
            alt={item.name}
            sizes="(max-width: 800px) 100vw, 33vw"
          />
        </Link>

        {/* Floating Favorite Heart */}
        <FaveHeartButton
          onToggle={(liked) =>
            console.log(
              liked === false
                ? { name: item.name, liked }
                : { item, name: item.name, liked },
            )
          }
        />
      </div>

      <Card.Body className="card-3d__body p-0 mt-2 d-flex flex-column justify-content-between">
        <div>
          <div className="card-3d__meta d-flex justify-content-between align-items-center mb-2">
            <span className="text-warning">{stars(item.stars)}</span>
            <span className="text-muted small">
              {item.rating} · {item.reviews || "120+"} reviews
            </span>
          </div>

          <Card.Title as="h3" className="fs-6 mb-1">
            <Link
              href={`/hotels/${item.slug}`}
              className="text-dark text-decoration-none hover-gold transition-colors"
            >
              {item.name}
            </Link>
          </Card.Title>

          <Card.Text className="lead text-14 mb-2 text-muted line-clamp-2">
            <span className="fw-semibold">
              {item.city}
              {item.country ? `, ${item.country}` : ""}
            </span>{" "}
            {item.summary}
          </Card.Text>
          <div>
            <ul className="list-unstyled d-flex gap-2 flex-wrap">
              {item.amenities.slice(0, 3).map((amenity, index) => (
                <li
                  key={index}
                  className="py-1 px-3 rounded-pill bg-warning"
                  style={{ fontSize: "12px" }}
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="card-3d__meta d-flex justify-content-between align-items-center pt-2 border-top">
          <div className="price d-flex flex-column">
            <span className="fs-5 fw-bold text-dark">
              {formatINR(item.priceFrom)}
            </span>
            <small className="text-muted" style={{ fontSize: "0.72rem" }}>
              per night from
            </small>
          </div>

          <CommonBtn
            href={`/hotels/${item.slug}`}
            smallBtn
            className="x-smallBtn"
            rightIcon={<ArrowUpRight size={12} />}
          >
            View stay
          </CommonBtn>
        </div>
      </Card.Body>
    </Card>
  );
}
