"use client";

import PackageCard from "@/components/cards/PackageCard";
import SectionHead from "@/components/common/SectionHead";
import { DynamicSwiper } from "@/components/common/DynamicSwiper";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchPackages } from "@/services/packages";
import Link from "next/link";

export default function PackageSlider() {
  const { data, loading, error } = useFetch(() => fetchPackages(), []);

  return (
    <section className="section bg-gradient-1 packages-slider-sec">
      <div className="container">
        <SectionHead
          eyebrow="Ready to go"
          title="Popular travel packages"
          href="/holiday-packages"
        />

        {loading ? <LoadingState label="Loading packages..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !data?.length ? <EmptyState /> : null}

        {!loading && !error && data?.length > 0 && (
          <DynamicSwiper
            items={data}
            slidesPerView={2.2}
            spaceBetween={24}
            navigation={false}
            pagination={false}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            renderItem={(item) => (
              <div className="h-100 w-100">
                {/* <PackageCard item={item} /> */}
                <article>
                  <div className="">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-4"
                      style={{ aspectRatio: "3/3", objectFit: "cover" }}
                    />
                  </div>
                  <div className="text-center mt-2">
                    <Link href={`/holiday-packages/${item.slug}`}>
                      <h3 className="fs-6 fs-md-4">{item.title}</h3>
                    </Link>
                  </div>
                </article>
              </div>
            )}
          />
        )}
      </div>
    </section>
  );
}
