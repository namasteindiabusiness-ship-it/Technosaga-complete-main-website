import React, { useState } from "react";

const REVIEWS = [
  {
    name: "Rahul Meshram",
    role: "CEO — TechStart India",
    text: "Their SEO and paid campaign strategies significantly improved our online visibility and lead generation. Expertise and professionalism at every stage of our engagement.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
  },
  {
    name: "Tamonash Roy",
    role: "Founder — GrowthLab",
    text: "Their strategies were both effective and measurable, giving us real confidence in achieving our business objectives. A genuinely professional and talented team.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
  },
  {
    name: "Preety Prasad",
    role: "Director — VisionBrand Co",
    text: "We are extremely satisfied with their guidance and creative output. Genuinely recommended for any business serious about establishing a strong digital presence.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const r = REVIEWS[active];
  return (
    <section className="testimonials">
      <div className="testi__bg">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
          alt="Modern office"
          className="testi__bg-img"
        />
        <div className="testi__bg-overlay" />
      </div>
      <div className="testi__inner">
        <div className="testi__header">
          <div className="eyebrow" style={{ color: "var(--gold)" }}>
            Client Stories
          </div>
          <h2 className="display-title display-title--white">
            What Our Clients <em>Say</em>
          </h2>
        </div>
        <div className="testi__layout">
          {/* Nav: real avatar photos */}
          <div className="testi__nav">
            {REVIEWS.map((rv, i) => (
              <button
                key={rv.name}
                className={`testi__nav-btn${i === active ? " testi__nav-btn--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <img src={rv.img} alt={rv.name} className="testi__nav-av" />
                <div className="testi__nav-info">
                  <div className="testi__nav-name">{rv.name}</div>
                  <div className="testi__nav-role">{rv.role}</div>
                </div>
                {i === active && <div className="testi__nav-bar" />}
              </button>
            ))}
          </div>
          {/* Quote */}
          <div className="testi__quote">
            <div className="testi__quote-mark">"</div>
            <div className="testi__stars">★★★★★</div>
            <p className="testi__quote-text" key={active}>
              {r.text}
            </p>
            <div className="testi__author">
              <img src={r.img} alt={r.name} className="testi__author-av" />
              <div>
                <div className="testi__author-name">{r.name}</div>
                <div className="testi__author-role">{r.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
