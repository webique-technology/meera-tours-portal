import { stats } from "@/data/site";

export default function StatsRow() {
  return (
    <section className="container">
      <div className="stats-row">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
