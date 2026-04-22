import React from "react";

const CARDS = [
  { icon:"⚙️", title:"Technology Evolution", desc:"Deep expertise across changing frameworks, platforms and architectures over a full decade of practice." },
  { icon:"🧩", title:"Problem Understanding", desc:"Real-world technical and commercial challenges across diverse clients and industries, solved with precision." },
  { icon:"📋", title:"Process Maturity", desc:"Structured workflows refined through thousands of hours of execution, iteration and continuous learning." },
];

export default function Experience() {
  return (
    <section className="exp2">
      <div className="exp2__inner">
        {/* Top grid */}
        <div className="exp2__top">
          <div className="exp2__left">
            <div className="exp2__eyebrow"><span className="exp2__eyebrow-dot" />Our Journey</div>
            <h2 className="exp2__h2">
              Our Journey of <span className="exp2__gold">Real</span>
              <br />IT Experience
            </h2>
            <p className="exp2__desc">
              Technosaga Infotech has grown with technology — we've seen trends rise,
              systems evolve and challenges transform into opportunities.
              That experience shapes everything we build.
            </p>
            <div className="exp2__badge">
              <div className="exp2__badge-n">5<span>+</span></div>
              <div className="exp2__badge-l">Years of Continuous<br />Industry Excellence</div>
            </div>
          </div>
          <div className="exp2__right">
            <div className="exp2__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85&auto=format&fit=crop"
                alt="Technosaga Infotech Team"
                className="exp2__img"
                loading="lazy"
              />
              <div className="exp2__img-overlay" />
              <div className="exp2__img-caption">Est. 2021 · Patna, Bihar</div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="exp2__cards">
          {CARDS.map((c) => (
            <div key={c.title} className="exp2__card">
              <div className="exp2__card-icon">{c.icon}</div>
              <h3 className="exp2__card-title">{c.title}</h3>
              <p className="exp2__card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp2 {
          background: #0B0F1A;
          padding: 6rem 0;
        }
        .exp2__inner {
          max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
        }
        .exp2__top {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center; margin-bottom: 3.5rem;
        }
        .exp2__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #D4AF37;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px; padding: 5px 14px; margin-bottom: 1.2rem;
        }
        .exp2__eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D4AF37; animation: pulse 2s infinite; flex-shrink: 0;
        }
        .exp2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          font-weight: 800; color: #fff;
          line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 1.1rem;
        }
        .exp2__gold { color: #D4AF37; }
        .exp2__desc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem; color: rgba(255,255,255,0.5);
          line-height: 1.75; margin-bottom: 1.6rem;
        }
        .exp2__badge {
          display: inline-flex; align-items: center; gap: 14px;
          background: #121826; border: 1px solid rgba(212,175,55,0.2);
          border-radius: 14px; padding: 1rem 1.4rem;
        }
        .exp2__badge-n {
          font-family: 'Montserrat', sans-serif;
          font-size: 2.2rem; font-weight: 900; color: #D4AF37; line-height: 1;
        }
        .exp2__badge-n span { font-size: 1.2rem; }
        .exp2__badge-l {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem; color: rgba(255,255,255,0.55); line-height: 1.5;
        }

        /* Image */
        .exp2__img-wrap { position: relative; border-radius: 16px; overflow: hidden; }
        .exp2__img {
          width: 100%; height: 360px; object-fit: cover; display: block;
          filter: brightness(0.8); transition: filter 0.4s;
        }
        .exp2__img-wrap:hover .exp2__img { filter: brightness(1); }
        .exp2__img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(11,15,26,0.7) 0%, transparent 50%);
          pointer-events: none;
        }
        .exp2__img-caption {
          position: absolute; bottom: 14px; left: 14px;
          font-family: 'Poppins', sans-serif; font-size: 0.75rem;
          color: rgba(255,255,255,0.6); font-weight: 500;
          background: rgba(11,15,26,0.6); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 20px; padding: 4px 12px;
          backdrop-filter: blur(4px);
        }

        /* Cards */
        .exp2__cards {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1.2rem;
        }
        .exp2__card {
          background: #121826; border: 1px solid rgba(212,175,55,0.1);
          border-radius: 14px; padding: 1.6rem;
          transition: border-color 0.25s, transform 0.25s;
        }
        .exp2__card:hover {
          border-color: rgba(212,175,55,0.35); transform: translateY(-4px);
        }
        .exp2__card-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; margin-bottom: 1rem;
          transition: background 0.25s;
        }
        .exp2__card:hover .exp2__card-icon { background: rgba(212,175,55,0.18); }
        .exp2__card-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.6rem;
        }
        .exp2__card-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem; color: rgba(255,255,255,0.5); line-height: 1.65;
        }

        @media (max-width: 900px) {
          .exp2__top { grid-template-columns: 1fr; gap: 2.5rem; }
          .exp2__img { height: 260px; }
        }
        @media (max-width: 640px) {
          .exp2 { padding: 4rem 0; }
          .exp2__cards { grid-template-columns: 1fr; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
