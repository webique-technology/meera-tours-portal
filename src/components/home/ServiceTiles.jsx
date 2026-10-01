import Link from "next/link";
import SectionHead from "@/components/common/SectionHead";

const services = [
  { href: "/flights", icon: "✈", title: "Flight booking", text: "Domestic and international tickets with fare-rule clarity before you pay." },
  { href: "/hotels", icon: "⌂", title: "Hotels & stays", text: "Beach resorts, city hotels and hill lodges with room-level pricing." },
  { href: "/holiday-packages", icon: "☀", title: "Holiday packages", text: "Ready itineraries you can still customise — honeymoon to family." },
  { href: "/bus", icon: "🚌", title: "Bus tickets", text: "Nashik corridors plus overnight Volvos to Goa, Pune and the hills." },
  { href: "/visa", icon: "✦", title: "Visa services", text: "Document checklists, filings and appointment help for popular corridors." },
  { href: "/contact", icon: "☎", title: "Travel desk", text: "One number for changes, insurance questions and group movements." },
];

export default function ServiceTiles() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow="One desk"
          title="Everything you need to leave town"
          text="The same structure you would expect from a full-service booking portal — minus the faceless chat bot."
        />
        <div className="grid grid--3">
          {services.map((item) => (
            <Link href={item.href} className="service-tile card-3d" key={item.href}>
              <div className="service-tile__icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="lead">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
