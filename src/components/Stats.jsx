import React from "react";

const STATS = [
  { n: "200+", l: "Happy Clients" },
  { n: "500+", l: "Projects Delivered" },
  { n: "5+", l: "Years Experience" },
  { n: "15+", l: "Countries Served" },
];

export default function Stats() {
  return (
    <section className="stats">
      <img
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80&auto=format&fit=crop"
        alt="Office"
        className="stats__bg"
      />
      <div className="stats__overlay" />
      <div className="stats__inner">
        <div className="stats__label">Our Impact in Numbers</div>
        <div className="stats__grid">
          {STATS.map((s, i) => (
            <div key={s.l} className="stat-item">
              {i > 0 && <div className="stat-item__div" />}
              <div className="stat-item__n">{s.n}</div>
              <div className="stat-item__l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
