import React from "react";
import { Link } from "react-router-dom";

const BULLETS = [
  { icon: "🏆", text: "Startup India Certified Company" },
  { icon: "👨‍💻", text: "Expert team of 50+ professionals" },
  { icon: "🌍", text: "Serving clients across 15+ countries" },
  { icon: "⭐", text: "500+ successful projects delivered" },
];

const STATS = [
  { n: "200+", l: "Happy Clients" },
  { n: "500+", l: "Projects Done" },
  { n: "5+", l: "Years Exp." },
  { n: "15+", l: "Countries" },
];

export default function AboutNew({ onQuote }) {
  return (
    <section className="ab2">
      <div className="ab2__inner">
        {/* Left: Image */}
        <div className="ab2__visual">
          <div className="ab2__img-frame">
            <img
              src="./static/about-us.webp"
              alt="Technosaga Infotech Team — Best Digital Agency in Patna"
              className="ab2__img"
              loading="lazy"
            />
            <div className="ab2__img-border" />
          </div>

          {/* Floating stats card */}
          <div className="ab2__float-card">
            {STATS.map((s) => (
              <div key={s.l} className="ab2__float-stat">
                <span className="ab2__float-n">{s.n}</span>
                <span className="ab2__float-l">{s.l}</span>
              </div>
            ))}
          </div>

          {/* Certified badge */}
          <div className="ab2__cert">
            <span className="ab2__cert-icon">🏅</span>
            <span className="ab2__cert-text">Startup India<br />Certified</span>
          </div>

          {/* Gold accent lines */}
          <div className="ab2__accent-tl" />
          <div className="ab2__accent-br" />
        </div>

        {/* Right: Content */}
        <div className="ab2__content">
          <div className="ab2__eyebrow">
            <span className="ab2__eyebrow-dot" />
            About Technosaga Infotech
          </div>

          <h2 className="ab2__h2">
            Patna's Most Trusted
            <br />
            <span className="ab2__h2-gold">Digital Growth Partner</span>
          </h2>

          <p className="ab2__lead">
            We are a Startup India Certified technology company based in Patna, Bihar —
            delivering world-class digital marketing, web development, BPO, and IT services
            to businesses across India and beyond.
          </p>

          <p className="ab2__body">
            Since 2021, our passionate team of experts has been helping startups, SMEs,
            and enterprises build powerful digital presences. We combine creativity with
            data-driven strategy to deliver results that genuinely move the needle.
          </p>

          <ul className="ab2__bullets">
            {BULLETS.map((b) => (
              <li key={b.text} className="ab2__bullet">
                <span className="ab2__bullet-icon">{b.icon}</span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="ab2__actions">
            <Link to="/about" className="ab2__btn-primary">
              Read More About Us
            </Link>
            <button className="ab2__btn-ghost" onClick={onQuote}>
              Get a Free Quote →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* ── ABOUT SECTION ─────────────────────── */
        .ab2 {
          background: #0B0F1A;
          padding: 6rem 0;
          overflow: hidden;
        }
        .ab2__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* Visual */
        .ab2__visual { position: relative; }

        .ab2__img-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }
        .ab2__img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
          filter: brightness(0.9);
          transition: transform 0.6s ease, filter 0.4s;
        }
        .ab2__visual:hover .ab2__img {
          transform: scale(1.03);
          filter: brightness(1);
        }
        .ab2__img-border {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          border: 1px solid rgba(212,175,55,0.2);
          pointer-events: none;
        }

        /* Floating stats */
        .ab2__float-card {
          position: absolute;
          bottom: -1.5rem;
          right: -1.5rem;
          background: #121826;
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 14px;
          padding: 1rem 1.2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem 1.2rem;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
        }
        .ab2__float-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .ab2__float-n {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #D4AF37;
          line-height: 1;
        }
        .ab2__float-l {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 2px;
          white-space: nowrap;
        }

        /* Certified */
        .ab2__cert {
          position: absolute;
          top: 1.2rem;
          left: -1.2rem;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          border-radius: 10px;
          padding: 0.7rem 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(212,175,55,0.35);
        }
        .ab2__cert-icon { font-size: 1.4rem; }
        .ab2__cert-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          color: #0B0F1A;
          line-height: 1.3;
        }

        /* Gold accent corners */
        .ab2__accent-tl,
        .ab2__accent-br {
          position: absolute;
          width: 60px; height: 60px;
          pointer-events: none;
        }
        .ab2__accent-tl {
          top: -12px; left: -12px;
          border-top: 3px solid #D4AF37;
          border-left: 3px solid #D4AF37;
          border-radius: 4px 0 0 0;
        }
        .ab2__accent-br {
          bottom: -12px; right: -12px;
          border-bottom: 3px solid #D4AF37;
          border-right: 3px solid #D4AF37;
          border-radius: 0 0 4px 0;
        }

        /* Content */
        .ab2__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 1.2rem;
        }
        .ab2__eyebrow-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #D4AF37;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        .ab2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 1.2rem;
          letter-spacing: -0.02em;
        }
        .ab2__h2-gold { color: #D4AF37; }

        .ab2__lead {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          margin-bottom: 0.9rem;
        }
        .ab2__body {
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          margin-bottom: 1.6rem;
        }

        .ab2__bullets {
          list-style: none;
          padding: 0; margin: 0 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .ab2__bullet {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.7);
        }
        .ab2__bullet-icon {
          width: 32px; height: 32px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .ab2__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .ab2__btn-primary {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 13px 26px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 18px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ab2__btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(212,175,55,0.45);
          color: #0B0F1A;
        }
        .ab2__btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.8);
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 13px 26px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .ab2__btn-ghost:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.45);
          color: #fff;
        }

        @media (max-width: 900px) {
          .ab2__inner { grid-template-columns: 1fr; gap: 4rem; }
          .ab2__float-card { right: 0.5rem; bottom: -1rem; }
          .ab2__cert { left: 0.5rem; top: 0.5rem; }
          .ab2__img { height: 360px; }
        }
        @media (max-width: 560px) {
          .ab2 { padding: 4rem 0; }
          .ab2__float-card { position: static; margin-top: 1rem; width: 100%; }
        }
      `}</style>
    </section>
  );
}
