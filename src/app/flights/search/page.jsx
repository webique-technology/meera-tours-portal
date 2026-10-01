"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import FlightCard from "@/components/cards/FlightCard";
import BookingWidget from "@/components/booking/BookingWidget";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchAirports, fetchFlights } from "@/services/flights";
import { formatDate } from "@/utils/format";

function FlightResults() {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const depart = params.get("depart") || "";
  const query = { from, to };

  const flights = useFetch(() => fetchFlights(query), [from, to]);
  const airports = useFetch(() => fetchAirports(), []);

  return (
    <section className="section">
      <div className="container">
        <h1>Flights {from && to ? `${from} → ${to}` : ""}</h1>
        <p className="lead">{depart ? `Departing ${formatDate(depart)}` : "Choose a fare to request tickets."}</p>
        <div style={{ margin: "1.4rem 0 2rem" }}>
          <BookingWidget initialTab="flights" />
        </div>
        {flights.loading ? <LoadingState label="Searching flights..." /> : null}
        {flights.error ? <ErrorState message={flights.error} /> : null}
        {!flights.loading && !flights.error && !flights.data?.length ? (
          <EmptyState message="No flights on this city pair in the sample inventory. Try BOM–DEL or DEL–GOI." />
        ) : null}
        <div className="grid" style={{ gap: "0.9rem" }}>
          {(flights.data || []).map((item) => (
            <FlightCard key={item.id} item={item} airports={airports.data || []} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FlightSearchPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading search..." />}>
      <FlightResults />
    </Suspense>
  );
}
