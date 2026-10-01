"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import BookingPanel from "@/components/booking/BookingPanel";
import PhotoMosaic from "@/components/common/PhotoMosaic";
import { ErrorState, LoadingState } from "@/components/common/StateBoxes";
import { useFetch } from "@/hooks/useFetch";
import { fetchPackageBySlug } from "@/services/packages";
import { packageGallery, packageHotel } from "@/utils/catalog";
import { addDaysISO, addDaysToISO, formatDateShort, stars } from "@/utils/format";

export default function PackageDetailClient({ slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;
  const { data: pack, loading, error } = useFetch(() => fetchPackageBySlug(slug), [slug]);
  const [openDay, setOpenDay] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [date, setDate] = useState(addDaysISO(6));
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const gallery = useMemo(() => (pack ? packageGallery(pack) : []), [pack]);
  const hotel = useMemo(() => (pack ? packageHotel(pack) : null), [pack]);
  const total = pack ? pack.price * adults + Math.round(pack.price * 0.7) * childrenCount : 0;

  if (loading) {
    return (
      <section className="pkg-page">
        <div className="container">
          <LoadingState label="Loading package..." />
        </div>
      </section>
    );
  }
  if (error || !pack) {
    return (
      <section className="pkg-page">
        <div className="container">
          <ErrorState message={error || "Package not found."} />
        </div>
      </section>
    );
  }

  const checkout = addDaysToISO(date, pack.nights);

  return (
    <section className="pkg-page">
      <div className="container">
        <div className="pkg-head">
          <h1>{pack.title}</h1>
          <p>
            {pack.nights} Nights | {pack.days} Days
            <span> • </span>
            ({pack.nights}N) In {pack.destination}
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
          <PhotoMosaic images={gallery} alt={pack.title} onViewAll={() => setGalleryOpen(true)} />
        )}

        <div className="pkg-layout">
          <div>
            <article className="stay-card">
              <header className="stay-card__head">
                <span className="stay-card__icon" aria-hidden="true">🏨</span>
                <div>
                  <h2>Hotel</h2>
                  <p>{hotel.city}</p>
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
                      <b>Room Type:</b> {hotel.roomType}
                    </div>
                    <div>
                      <b>Meal Plan:</b> {hotel.mealPlan}
                    </div>
                    <div>
                      <b>Room Inclusion:</b> {hotel.inclusion}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article className="itin-card">
              <header className="itin-card__head">
                <span aria-hidden="true">📍</span>
                <h2>Day Wise Itinerary</h2>
              </header>
              {pack.itinerary.map((day) => (
                <div key={day.day} className={`itin-row${openDay === day.day ? " is-open" : ""}`}>
                  <div className="itin-row__day">
                    <span className="itin-dot">{day.day}</span>
                    <div>
                      <strong>Day {day.day}</strong>
                      <small>{formatDateShort(addDaysToISO(date, day.day - 1))}</small>
                    </div>
                  </div>
                  <button type="button" onClick={() => setOpenDay(openDay === day.day ? 0 : day.day)}>
                    <span>{day.title}</span>
                    <em>{openDay === day.day ? "▴" : "▾"}</em>
                  </button>
                  {openDay === day.day ? <p className="itin-row__detail">{day.detail}</p> : null}
                </div>
              ))}
            </article>

            <article className="exclude-card">
              <h2>Exclusions</h2>
              <ul>
                {pack.excludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <BookingPanel
            type="holiday"
            details={{ package: pack.title, slug: pack.slug, price: pack.price }}
            date={date}
            onDate={setDate}
            adults={adults}
            childrenCount={childrenCount}
            onAdults={setAdults}
            onChildren={setChildrenCount}
            total={total}
            extraFields={[{ name: "travelDate", label: "Preferred travel date", type: "date", required: true }]}
          />
        </div>
      </div>
    </section>
  );
}
