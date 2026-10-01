import BookingWidget from "@/components/booking/BookingWidget";
import SmartImage from "@/components/common/SmartImage";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <SmartImage
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
          alt="Travel road through mountains"
          priority
        />
        <div className="hero__shade" />
      </div>
      <div className="container hero__content">
        <div className="eyebrow">Nashik travel desk · Open 24 hours</div>
        <h1>Book Affordable Flights, Hotels, Holiday Packages, Bus Tickets & Visa Services Online</h1>
        <p className="hero__copy">
          Search hotels, buses and holidays with live filters, then send an enquiry — the same step-by-step flow as a booking portal.
        </p>
        <BookingWidget />
      </div>
    </section>
  );
}
