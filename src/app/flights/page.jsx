import BookingWidget from "@/components/booking/BookingWidget";
import PageHero from "@/components/common/PageHero";

export const metadata = {
  title: "Flight booking",
  description: "Search domestic and international flights and send a fare enquiry to Meera Tours & Travels.",
};

export default function FlightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Flights"
        title="Search fares, then talk to a person"
        text="One-way and return searches across Indian metros and popular international gateways. We confirm seats only after you approve the fare rules."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <BookingWidget initialTab="flights" />
        </div>
      </section>
    </>
  );
}
