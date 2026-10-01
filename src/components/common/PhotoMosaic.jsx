"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoMosaic({ images = [], alt = "" }) {
  const list = images.length ? images : [];
  const hero = [0, 1, 2].map((index) => list[index] || list[0]);
  const thumbs = [3, 4, 5, 6, 7, 8].map(
    (index) => list[index] || list[index % list.length] || list[0]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index = 0) => {
    setActiveIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  }, [list.length]);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  }, [list.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextImage, prevImage]);

  if (!list.length) return null;

  return (
    <>
      <div className="photo-mosaic">
        {/* Top 3 Hero Images */}
        <div className="photo-mosaic__hero d-none d-lg-grid">
          {hero.map((src, index) => (
            <div
              key={`hero-${index}`}
              className="photo-mosaic__hero-item"
              onClick={() => openLightbox(index)}
            >
              <img src={src} alt={index === 0 ? alt : ""} />
            </div>
          ))}
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="photo-mosaic__row mb-3">
          {thumbs.map((src, index) => {
            const actualIndex = index + 3;
            const isLast = index === thumbs.length - 1;

            return (
              <div
                className="photo-mosaic__thumb"
                key={`thumb-${index}`}
                onClick={() => openLightbox(actualIndex % list.length)}
              >
                <img src={src} alt="" />
                {isLast ? (
                  <button
                    type="button"
                    className="photo-mosaic__all"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(0);
                    }}
                  >
                    View All
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal Popup */}
      {isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Counter & Close */}
            <div className="lightbox-header">
              <span className="lightbox-counter">
                {activeIndex + 1} / {list.length}
              </span>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Active Image with Left/Right Buttons */}
            <div className="lightbox-main">
              {list.length > 1 && (
                <button
                  type="button"
                  className="lightbox-nav-btn prev"
                  onClick={prevImage}
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              <div className="lightbox-image-wrapper">
                <img
                  src={list[activeIndex]}
                  alt={`${alt} preview ${activeIndex + 1}`}
                  className="lightbox-active-img"
                />
              </div>

              {list.length > 1 && (
                <button
                  type="button"
                  className="lightbox-nav-btn next"
                  onClick={nextImage}
                  aria-label="Next"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>

            {/* Bottom Active Image Strip */}
            <div className="lightbox-thumbnails">
              {list.map((thumbSrc, idx) => (
                <button
                  key={`lightbox-thumb-${idx}`}
                  type="button"
                  className={`lightbox-thumb-btn ${
                    idx === activeIndex ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <img src={thumbSrc} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}