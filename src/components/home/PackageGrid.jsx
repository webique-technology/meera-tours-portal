"use client";

import PackageCard from "@/components/cards/PackageCard";
import SectionHead from "@/components/common/SectionHead";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchPackages } from "@/services/packages";

export default function PackageGrid() {
  const { data, loading, error } = useFetch(() => fetchPackages(), []);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead
          eyebrow="Ready to go"
          title="Popular travel packages"
          href="/holiday-packages"
        />
        {loading ? <LoadingState label="Loading packages..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !data?.length ? <EmptyState /> : null}
        <div className="grid grid--3">
          {(data || []).slice(0, 6).map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
