"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";

// Import essential Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

export const DynamicSwiper = ({
  items = [],
  renderItem,
  slidesPerView = 1,
  spaceBetween = 20,
  navigation = true,
  pagination = { clickable: true },
  autoplay = false, // Pass boolean or object e.g. { delay: 3500, disableOnInteraction: false }
  loop = false,
  freeMode = false,
  breakpoints = {
    640: { slidesPerView: 1.5, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
    1280: { slidesPerView: 4, spaceBetween: 24 },
  },
  className = "",
  ...swiperProps
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  // Determine active Swiper modules
  const modules = [Navigation, Pagination];
  if (autoplay) modules.push(Autoplay);
  if (freeMode) modules.push(FreeMode);

  return (
    <div className={`dynamic-swiper-wrapper ${className}`}>
      <Swiper
        modules={modules}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={autoplay}
        loop={loop}
        freeMode={freeMode}
        breakpoints={breakpoints}
        className="w-100"
        {...swiperProps}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || item.slug || index} className="h-auto">
            {typeof renderItem === "function" ? renderItem(item, index) : item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DynamicSwiper;
