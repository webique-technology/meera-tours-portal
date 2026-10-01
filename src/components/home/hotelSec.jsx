"use client";

import { Container } from "react-bootstrap";
import { CommonBtn } from "../common/Button";
import DynamicSwiper from "../common/DynamicSwiper";
import { hotels } from "@/data/hotels";
import HotelCard from "../cards/HotelCard";
import SectionHead from "../common/SectionHead";
import { ArrowUpRight } from "lucide-react";

export const HotelSlider = () => {
  return (
    <section className="section">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <SectionHead eyebrow="Your Stay in Hotels" title="Where to Stay" />

          <div>
            <CommonBtn
              href="/hotels"
              smallBtn
              rightIcon={<ArrowUpRight size={14} />}
            >
              Explore More
            </CommonBtn>
          </div>
        </div>

        <div>
          <DynamicSwiper
            items={hotels}
            slidesPerView={1.2}
            spaceBetween={24}
            navigation={false}
            pagination={false}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 16 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            renderItem={(hotel) => (
              <div className="h-100 w-100">
                <HotelCard item={hotel} />
              </div>
            )}
          />
        </div>
      </Container>
    </section>
  );
};
