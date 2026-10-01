import PageHero from "@/components/common/PageHero";
import WhyUs from "@/components/home/WhyUs";
import { siteInfo, stats } from "@/data/site";

export const metadata = {
  title: "About us",
  description: "Meera Tours & Travels is a Nashik travel desk for flights, hotels, holidays, buses and visas.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Nashik desk that still answers the phone"
        text="Meera Tours & Travels started as a local ticketing and cab counter. Today we book flights, hotels, holidays, buses and visas for families across Maharashtra — with the same people on the line."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container two-col">
          <article className="detail-panel">
            <p>
              The online booking layer you see here is built for the same workflow our counsellors already use:
              search, compare, then confirm in person. We do not hide fare rules behind a checkout button you cannot undo.
            </p>
            <p>
              Visit us at {siteInfo.address}. The counter runs {siteInfo.hours.toLowerCase()}.
            </p>
            <p>
              For groups, destination weddings and corporate movements, write to {siteInfo.email} with dates and headcount.
            </p>
          </article>
          <aside className="grid">
            {stats.map((item) => (
              <div className="stat-card" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </aside>
        </div>
      </section>
      <WhyUs />
    </>
  );
}
