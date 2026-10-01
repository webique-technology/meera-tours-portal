"use client";

import { useParams } from "next/navigation";
import EnquiryForm from "@/components/common/EnquiryForm";
import { ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchAirports, fetchFlightById } from "@/services/flights";
import { airportLabel, formatINR } from "@/utils/format";

export default function FlightDetailClient({ id: propId }) {
  const params = useParams();
  const id = propId || params?.id;
  const flight = useFetch(() => fetchFlightById(id), [id]);
  const airports = useFetch(() => fetchAirports(), []);
  const item = flight.data;

  if (flight.loading) return <section className="section"><div className="container"><LoadingState label="Loading flight..." /></div></section>;
  if (flight.error || !item) return <section className="section"><div className="container"><ErrorState message={flight.error || "Flight not found."} /></div></section>;

  return (
    <section className="section">
      <div className="container two-col">
        <article className="detail-panel">
          <div className="eyebrow">Flight {item.id}</div>
          <h1>{item.airline}</h1>
          <p className="lead">
            {airportLabel(airports.data || [], item.from)} → {airportLabel(airports.data || [], item.to)}
          </p>
          <div className="grid grid--2">
            <div>
              <strong>{item.departTime}</strong>
              <p>Departs</p>
            </div>
            <div>
              <strong>{item.arriveTime}</strong>
              <p>Arrives · {item.duration}</p>
            </div>
          </div>
          <ul>
            <li>Aircraft: {item.aircraft}</li>
            <li>Cabin: {item.cabin}</li>
            <li>Baggage: {item.baggage}</li>
            <li>{item.refundable ? "Refundable fare available" : "Typically non-refundable"}</li>
            <li>{item.seats} seats currently shown</li>
          </ul>
          <div className="price">{formatINR(item.price)} <small>per adult, excl. extras</small></div>
        </article>
        <aside className="sticky-quote">
          <EnquiryForm
            type="flight"
            title="Hold this fare"
            details={{ flightId: item.id, airline: item.airline, from: item.from, to: item.to, price: item.price }}
          />
        </aside>
      </div>
    </section>
  );
}
