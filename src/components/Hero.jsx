import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ onQuote }) {
  return (
    <section className="hero">
      <div className="hero__pane">
        <div className="hero__pane-inner">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Startup India Certified · Est. 2021 · Patna, Bihar
          </div>
          <h1 className="hero__h1">
            Patna's Most Trusted
            <br />
            <i>BPO</i> &amp; <i>Digital</i>
            <br />
            <span className="hero__h1-sub">Marketing Partner</span>
          </h1>
          <p className="hero__desc">
            Grow your business with proven digital strategies — 200+ happy
            clients, 500+ projects delivered across India and 15+ countries.
          </p>
          <div className="hero__actions">
            <button className="btn-primary" onClick={onQuote}>
              Get a Free Consultation →
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore Services
            </button>
          </div>
          {/* Trust signals — audit P1 */}
          <div className="hero__trust">
            <span className="hero__trust-item">✅ Startup India Certified</span>
            <span className="hero__trust-item">⭐ 200+ Happy Clients</span>
            <span className="hero__trust-item">📞 +91 9155031859</span>
          </div>
        </div>
        <div className="hero__stats">
          {[
            ["200+", "Happy Clients"],
            ["500+", "Projects Done"],
            ["5+", "Years Exp"],
            ["15+", "Countries"],
          ].map(([n, l]) => (
            <div key={l} className="hero__stat">
              <div className="hero__stat-n">{n}</div>
              <div className="hero__stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__photo">
        <img src="./static/bpo-service-banner.jpg" alt="Best BPO and Digital Marketing Company in Patna Bihar - Technosaga Infotech" />
        <div className="hero__photo-overlay" />
        <div className="hero__badge">
          <div className="hero__badge-icon">🏆</div>
          <div className="hero__badge-n">5+</div>
          <div className="hero__badge-l">Years of Excellence</div>
        </div>
      </div>
      <style>{`
        .hero__trust {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 1.2rem;
        }
        .hero__trust-item {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.7);
          background: rgba(207,150,69,0.12);
          border: 1px solid rgba(207,150,69,0.25);
          border-radius: 20px;
          padding: 4px 12px;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}
