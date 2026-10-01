"use client";

import DestinationCard from "@/components/cards/DestinationCard";
import SectionHead from "@/components/common/SectionHead";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchDestinations } from "@/services/content";
import { Col, Row } from "react-bootstrap";

export default function DestinationGrid() {
  const { data, loading, error } = useFetch(() => fetchDestinations(), []);

  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="Where next"
          title="Featured destinations"
          text="A short list of places we sell most weeks — beaches, cities and the Himalayas."
          href="/holiday-packages"
          cta="All holidays"
        />
        {loading ? <LoadingState label="Loading destinations..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !data?.length ? <EmptyState /> : null}
        {/* <div className="grid grid--4">
          {(data || []).slice(0, 8).map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div> */}
        <Row className="mt-4 g-4">
          {(data || []).slice(0, 6).map((item, i) => (
            <Col sm={6} md={6} lg={4} key={i}>
              <DestinationCard item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
