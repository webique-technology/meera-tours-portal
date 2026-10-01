import Link from "next/link";
import BookingWidget from "@/components/booking/BookingWidget";
import PageHero from "@/components/common/PageHero";
import { SearchSteps } from "@/components/filters/FilterSidebar";

export const metadata = {
  title: "Bus tickets",
  description: "Book AC sleeper and seater buses from Nashik, Mumbai, Pune, Delhi and Goa.",
};

const ROUTES = [
  { from: "Nashik", to: "Mumbai" },
  { from: "Nashik", to: "Pune" },
  { from: "Mumbai", to: "Goa" },
  { from: "Pune", to: "Goa" },
  { from: "Delhi", to: "Manali" },
];

export default function BusPage() {
  return (
    <>
      <PageHero
        eyebrow="Bus tickets"
        title="Search a route, filter, then select a seat"
        text="Step 1: from, to and date. Step 2: price, departure, AC and boarding filters. Step 3: select a seat and enquire."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SearchSteps steps={["Search route", "Filter buses", "Select seat"]} active={1} />
          <BookingWidget initialTab="bus" />
          <div className="chip-row" style={{ margin: "1.2rem 0 0" }}>
            {ROUTES.map((route) => (
              <Link
                key={`${route.from}-${route.to}`}
                className="chip"
                href={`/bus/search?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}
              >
                {route.from} → {route.to}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
