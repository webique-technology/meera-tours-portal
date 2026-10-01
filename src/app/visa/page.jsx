"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BookingWidget from "@/components/booking/BookingWidget";
import VisaCard from "@/components/cards/VisaCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchVisaServices } from "@/services/visa";

function VisaList() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const { data, loading, error } = useFetch(() => fetchVisaServices({ q }), [q]);

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow">Visa services</div>
        <h1>Visa help with a document checklist</h1>
        <p className="lead">Tourist and visitor filings for the corridors we handle most. Embassy fees are extra.</p>
        <div style={{ margin: "1.4rem 0 2rem" }}>
          <BookingWidget initialTab="visa" />
        </div>
        {loading ? <LoadingState label="Loading visa services..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !data?.length ? <EmptyState /> : null}
        <div className="grid grid--3">
          {(data || []).map((item) => (
            <VisaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VisaPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading visas..." />}>
      <VisaList />
    </Suspense>
  );
}
