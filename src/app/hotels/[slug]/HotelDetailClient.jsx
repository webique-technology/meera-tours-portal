"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BookingPanel from "@/components/booking/BookingPanel";
import PhotoMosaic from "@/components/common/PhotoMosaic";
import { ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchHotelBySlug } from "@/services/hotels";
import { normalizeHotel } from "@/utils/catalog";
import { addDaysISO, addDaysToISO, formatDateShort, formatINR, stars } from "@/utils/format";
import { Container } from "react-bootstrap";

function HotelDetailContent({ slug: propSlug }) {
  const routeParams = useParams();
  const searchParams = useSearchParams();
  const slug = propSlug || routeParams?.slug;
  const { data, loading, error } = useFetch(() => fetchHotelBySlug(slug), [slug]);
  const hotel = data ? normalizeHotel(data) : null;
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [date, setDate] = useState(searchParams.get("checkIn") || addDaysISO(6));
  const [adults, setAdults] = useState(Number(searchParams.get("guests") || 2));
  const [childrenCount, setChildrenCount] = useState(0);

  const gallery = useMemo(() => {
    if (!hotel) return [];
    return [hotel.image, ...(hotel.gallery || [])];
  }, [hotel]);

  if (loading) {
    return (
      <section className="pkg-page">
        <Container>
          <LoadingState label="Loading hotel..." />
        </Container>
      </section>
    );
  }
  if (error || !hotel) {
    return (
      <section className="pkg-page">
        <Container>
          <ErrorState message={error || "Hotel not found."} />
        </Container>
      </section>
    );
  }

  const nights = 1;
  const checkout = addDaysToISO(date, nights);
  const total = hotel.priceFrom * Math.max(1, adults);

  return (
    <section className="pkg-page">
      <Container>
        <div className="pkg-head">
          <h1>{hotel.name}</h1>
          <p>
            {stars(hotel.stars)} · {hotel.city}, {hotel.country}
            {searchParams.get("checkIn") ? ` · ${formatDateShort(searchParams.get("checkIn"))}` : ""}
          </p>
        </div>

        {galleryOpen ? (
          <div className="photo-mosaic__full">
            {gallery.map((src, index) => (
              <img key={`${src}-${index}`} src={src} alt="" />
            ))}
            <button type="button" className="photo-mosaic__close" onClick={() => setGalleryOpen(false)}>
              Close gallery
            </button>
          </div>
        ) : (
          <PhotoMosaic images={gallery} alt={hotel.name} onViewAll={() => setGalleryOpen(true)} />
        )}

        <div className="pkg-layout">
          <div>
            <article className="stay-card">
              <header className="stay-card__head">
                <span className="stay-card__icon" aria-hidden="true">🏨</span>
                <div>
                  <h2>Hotel</h2>
                  <p>
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
              </header>
              <div className="stay-card__body">
                <div className="stay-card__art" aria-hidden="true">
                  <span>⌂</span>
                </div>
                <div className="stay-card__info">
                  <h3>
                    {hotel.name} <em>{stars(hotel.stars).slice(0, hotel.stars)}</em>
                  </h3>
                  <p className="stay-card__dates">
                    📅 {formatDateShort(date)} - {formatDateShort(checkout)}
                  </p>
                  <div className="stay-card__meta">
                    <div>
                      <b>Room Type:</b> {hotel.rooms?.[0]?.name || "Standard"}
                    </div>
                    <div>
                      <b>Meal Plan:</b> {hotel.mealType}
                    </div>
                    <div>
                      <b>Room Inclusion:</b> {hotel.cancellation}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="itin-card">
              <header className="itin-card__head">
                <span aria-hidden="true">★</span>
                <h2>Rooms & amenities</h2>
              </header>
              <p className="itin-row__detail" style={{ display: "block", padding: "0.8rem 1rem 0" }}>
                {hotel.summary}
              </p>
              {(hotel.rooms || []).map((room) => (
                <div key={room.id} className="itin-row">
                  <div className="itin-row__day">
                    <span className="itin-dot">R</span>
                    <div>
                      <strong>{room.name}</strong>
                      <small>
                        {room.beds} · {room.guests} guests
                      </small>
                    </div>
                  </div>
                  <div className="itin-row__price">{formatINR(room.price)}</div>
                </div>
              ))}
              <ul className="hotel-tile__amenities" style={{ padding: "0.8rem 1.1rem 1rem" }}>
                {(hotel.amenities || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <BookingPanel
            type="hotel"
            details={{ hotel: hotel.name, slug: hotel.slug, city: hotel.city }}
            date={date}
            onDate={setDate}
            adults={adults}
            childrenCount={childrenCount}
            onAdults={setAdults}
            onChildren={setChildrenCount}
            total={total}
            extraFields={[
              { name: "checkIn", label: "Check-in", type: "date", required: true },
              { name: "checkOut", label: "Check-out", type: "date", required: true },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}

export default function HotelDetailClient({ slug, searchParams }) {
  return (
    <Suspense fallback={<LoadingState label="Loading hotel..." />}>
      <HotelDetailContent slug={slug} initialSearchParams={searchParams} />
    </Suspense>
  );
}
