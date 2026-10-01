"use client";

import { useParams } from "next/navigation";
import EnquiryForm from "@/components/common/EnquiryForm";
import { ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchVisaBySlug } from "@/services/visa";
import { formatINR } from "@/utils/format";

export default function VisaDetailClient({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;
  const { data: visa, loading, error } = useFetch(() => fetchVisaBySlug(slug), [slug]);

  if (loading) return <section className="section"><div className="container"><LoadingState label="Loading visa..." /></div></section>;
  if (error || !visa) return <section className="section"><div className="container"><ErrorState message={error || "Visa service not found."} /></div></section>;

  return (
    <section className="section">
      <div className="container two-col">
        <article>
          <div className="detail-hero">
            <img src={visa.image} alt={visa.title} />
            <div className="detail-hero__caption">
              <div className="eyebrow">{visa.country}</div>
              <h1>{visa.title}</h1>
            </div>
          </div>
          <div className="detail-panel" style={{ marginTop: "1.2rem" }}>
            <p>{visa.notes}</p>
            <p>Processing: {visa.processingDays} · Validity: {visa.validity}</p>
            <div className="price">{formatINR(visa.price)} <small>service fee from</small></div>
            <h3>Documents we usually need</h3>
            <ul>
              {visa.documents.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
        </article>
        <aside className="sticky-quote">
          <EnquiryForm
            type="visa"
            title="Start a visa file"
            details={{ visa: visa.title, slug: visa.slug, country: visa.country }}
            extraFields={[{ name: "travelDate", label: "Intended travel date", type: "date", required: true }]}
          />
        </aside>
      </div>
    </section>
  );
}
