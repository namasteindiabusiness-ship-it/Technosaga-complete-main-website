import React from "react";

export default function Experience() {
  const milestones = [
    { year: "2014", label: "Founded in Patna, Bihar" },
    { year: "2016", label: "First 100 clients milestone" },
    { year: "2019", label: "Startup India Certification" },
    { year: "2022", label: "1,000+ projects delivered" },
    { year: "2024", label: "15+ countries served" },
    { year: "2026", label: "Bihar's #1 digital agency" },
  ];
  return (
    <section className="experience">
      <div className="exp__top">
        <div className="exp__top-left">
          {/* <div className="eyebrow eyebrow--left">Our Journey</div> */}
          <h2 className="display-title">
            Our Journey of <em>Real</em>
            <br />
            IT Experience
          </h2>
          <p className="exp__desc">
            Technosaga Infotech has grown with technology — we've seen trends
            rise, systems evolve and challenges transform into opportunities.
            That experience shapes everything we build.
          </p>
          <div className="exp__badge">
            <div className="exp__badge-n">
              5<span>+</span>
            </div>
            <div className="exp__badge-l">
              Years of Continuous
              <br />
              Industry Excellence
            </div>
          </div>
        </div>
        <div className="exp__top-right">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85&auto=format&fit=crop"
            alt="Team collaborating"
            className="exp__photo"
          />
          <div className="exp__photo-caption">Est. 2021 · Patna, Bihar</div>
        </div>
      </div>

      {/* <div className="exp__timeline">
        <div className="exp__timeline-line" />
        {milestones.map((m, i) => (
          <div
            key={m.year}
            className={`exp__node${i % 2 === 0 ? " exp__node--up" : " exp__node--down"}`}
          >
            <div className="exp__node-dot">
              <div className="exp__node-dot-inner" />
            </div>
            <div className="exp__node-card">
              <div className="exp__node-year">{m.year}</div>
              <div className="exp__node-label">{m.label}</div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="exp__cards">
        {[
          {
            icon: "⚙️",
            title: "Technology Evolution",
            desc: "Deep expertise across changing frameworks, platforms and architectures over a full decade of practice.",
          },
          {
            icon: "🧩",
            title: "Problem Understanding",
            desc: "Real-world technical and commercial challenges across diverse clients and industries, solved with precision.",
          },
          {
            icon: "📋",
            title: "Process Maturity",
            desc: "Structured workflows refined through thousands of hours of execution, iteration and continuous learning.",
          },
        ].map((c) => (
          <div key={c.title} className="exp-card">
            <div className="exp-card__icon">{c.icon}</div>
            <div className="exp-card__title">{c.title}</div>
            <p className="exp-card__desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
