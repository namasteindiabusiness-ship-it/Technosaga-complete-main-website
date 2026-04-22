import React from "react";

const WHY = [
  {
    icon: "🎓",
    title: "Certified Experts",
    desc: "Industry-certified specialists committed to excellence on every engagement.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    desc: "Round-the-clock assistance so your business never misses a beat.",
  },
  {
    icon: "🌍",
    title: "Global Reach",
    desc: "Proven results for clients across 15+ countries worldwide.",
  },
  {
    icon: "⭐",
    title: "Top Rated Agency",
    desc: "Trusted digital partner recognised by clients and industry peers.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Rigorous timelines without any compromise on quality or craft.",
  },
  {
    icon: "🛡️",
    title: "Secure & Trusted",
    desc: "Enterprise-grade security and confidentiality on every project.",
  },
];

export default function WhyUs({ onQuote }) {
  return (
    <section className="why">
      {/* Full-bleed photo background */}
      <div className="why__bg">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80&auto=format&fit=crop"
          alt="Team at work"
          className="why__bg-img"
        />
        <div className="why__bg-overlay" />
      </div>
      <div className="why__inner">
        <div className="why__top">
          <div className="eyebrow" style={{ color: "var(--gold)" }}>
            Why Choose Us
          </div>
          <h2 className="display-title display-title--white">
            What Sets Us <em>Apart</em>
          </h2>
          <p className="why__sub">
            Industry-leading expertise, proven results and genuine partnership
            at every step.
          </p>
        </div>
        <div className="why__grid">
          {WHY.map((w) => (
            <div key={w.title} className="why-card">
              {/* <div className="why-card__num">0{i + 1}</div> */}
              <div className="why-card__icon">{w.icon}</div>
              <div className="why-card__title">{w.title}</div>
              <p className="why-card__desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
