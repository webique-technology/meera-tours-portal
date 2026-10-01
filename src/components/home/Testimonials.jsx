"use client";

import SectionHead from "@/components/common/SectionHead";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/StateBoxes";
import { DynamicSwiper } from "@/components/common/DynamicSwiper";
import { useFetch } from "@/hooks/useFetch";
import { fetchTestimonials } from "@/services/content";

export default function Testimonials() {
  const { data, loading, error } = useFetch(() => fetchTestimonials(), []);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead
          eyebrow="From the road"
          title="Travellers we have already sent"
        />

        {loading ? <LoadingState label="Loading reviews..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !data?.length ? <EmptyState /> : null}

        {!loading && !error && data?.length > 0 && (
          <DynamicSwiper
            items={data}
            className="dynamic-swiper-wrapper p-0"
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={false}
            pagination={true}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            renderItem={(item) => (
              <article
                className="review-card h-100 d-flex flex-column justify-content-between"
                key={item.id}
              >
                <div>
                  <div className="review-card__stars">
                    {"★".repeat(item.rating)}
                  </div>
                  <p>{item.text}</p>
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <div className="lead fs-6">
                    {item.place} · {item.trip}
                  </div>
                </div>
              </article>
            )}
          />
        )}
      </div>
    </section>
  );
}
