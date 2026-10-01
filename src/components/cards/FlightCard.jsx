import Link from "next/link";
import { airportLabel, formatINR } from "@/utils/format";

export default function FlightCard({ item, airports = [] }) {
  return (
    <article className="flight-row">
      <div>
        <strong>{item.airline}</strong>
        <div className="lead">{item.id} · {item.aircraft}</div>
      </div>
      <div>
        <div className="card-3d__meta">
          <div className="time-block">
            <strong>{item.departTime}</strong>
            <span>{airportLabel(airports, item.from)}</span>
          </div>
          <div>
            <div className="route-line" />
            <small>{item.duration} · {item.stops === 0 ? "Non-stop" : `${item.stops} stop`}</small>
          </div>
          <div className="time-block">
            <strong>{item.arriveTime}</strong>
            <span>{airportLabel(airports, item.to)}</span>
          </div>
        </div>
      </div>
      <div className="price">
        {formatINR(item.price)}
        <small>{item.seats} seats left</small>
      </div>
      <Link href={`/flights/${item.id}`} className="btn btn--primary">
        View fare
      </Link>
    </article>
  );
}
