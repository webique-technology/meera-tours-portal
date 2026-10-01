import HotelsPageComponent from "./HotelPage";

export const metadata = {
  title: "Hotel booking",
  description:
    "Search hotels by city and dates, then filter by price, star rating and amenities.",
};

const QUICK = ["Goa", "Kullu", "Manali", "Dubai", "Singapore"];

export default function HotelsPage() {
  return <HotelsPageComponent />;
}

// import Link from "next/link";
// import BookingWidget from "@/components/booking/BookingWidget";
// import PageHero from "@/components/common/PageHero";
// import HotelCard from "@/components/cards/HotelCard";
// import { SearchSteps } from "@/components/filters/FilterSidebar";
// import { getHotelsFromCsv } from "@/services/hotelsCsv";

// export const metadata = {
//   title: "Hotel booking",
//   description:
//     "Search hotels by city and dates, then filter by price, star rating and amenities.",
// };

// const QUICK = ["Goa", "Mumbai", "Delhi", "Jaipur", "Manali", "Kochi"];

// export default function HotelsPage() {
//   const hotels = getHotelsFromCsv();

//   return (
//     <>
//       <PageHero
//         eyebrow="Hotel Booking"
//         title="Search hotels, then filter the list"
//         text="Step 1: city and dates. Step 2: star, meal, property and amenity filters. Step 3: open a stay and enquire."
//       />
//       <section className="section" style={{ paddingTop: 0 }}>
//         <div className="container">
//           <SearchSteps
//             steps={["Search", "Filter hotels", "View stay"]}
//             active={1}
//           />
//           <BookingWidget initialTab="hotels" />
//           <div className="chip-row" style={{ margin: "1.2rem 0 2rem" }}>
//             {QUICK.map((city) => (
//               <Link
//                 key={city}
//                 className="chip"
//                 href={`/hotels/search?city=${encodeURIComponent(city)}`}
//               >
//                 {city}
//               </Link>
//             ))}
//           </div>
//           <h2>Popular stays ({hotels.length} Available)</h2>
//           <div className="grid grid--3">
//             {hotels.slice(0, 9).map((item) => (
//               <HotelCard key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
