"use client";

import SectionHead from "@/components/common/SectionHead";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchOffers } from "@/services/content";
import { Col, Row } from "react-bootstrap";

export default function OffersRow() {
  const { data, loading, error } = useFetch(() => fetchOffers(), []);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead eyebrow="This month" title="Offers worth asking about" />
        {loading ? <LoadingState label="Loading offers..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !data?.length ? <EmptyState /> : null}
        <Row className="g-4">
          {(data || []).slice(0, 2).map((offer, i) => (
            <Col md={6} key={i}>
              <article
                className={`offer-card offer-card--${offer.accent} h-100 d-flex p-0 overflow-hidden rounded-4`}
              >
                <div className="w-50 h-100 d-grid p-4">
                  <h3>{offer.title}</h3>
                  <p>{offer.text}</p>
                  <code className="">{offer.code}</code>
                </div>
                <div className="w-50">
                  <img
                    className="img-fluid w-100 h-100 object-fit-cover"
                    src={offer.image}
                    alt={offer.title + "/" + offer.image}
                  />
                </div>
              </article>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
