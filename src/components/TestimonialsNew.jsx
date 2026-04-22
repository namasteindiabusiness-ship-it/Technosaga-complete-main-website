import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const REVIEWS = [
  {
    name: "Rahul Meshram",
    role: "CEO — TechStart India",
    text: "Technosaga's SEO and paid campaign strategies transformed our online visibility completely. Within just 3 months, our leads doubled and our cost-per-acquisition dropped significantly. Truly exceptional professionals.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
    stars: 5,
  },
  {
    name: "Tamonash Roy",
    role: "Founder — GrowthLab",
    text: "Their strategies were both effective and measurable, giving us real confidence in achieving our business objectives. The team is responsive, creative, and genuinely invested in our success.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
    stars: 5,
  },
  {
    name: "Preety Prasad",
    role: "Director — VisionBrand Co",
    text: "We are extremely satisfied with the guidance and creative output from Technosaga. Our website traffic increased by 180% in 6 months. Highly recommended for any business serious about digital growth.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
    stars: 5,
  },
  {
    name: "Vikram Sharma",
    role: "MD — Nova Enterprises",
    text: "Outstanding BPO services that streamlined our customer support operations. The team is professional, well-trained, and always delivers. Our customer satisfaction scores improved dramatically after partnering with them.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80&auto=format&fit=crop&facepad=3&crop=faces",
    stars: 5,
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="tst2__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`tst2__star${i < count ? " tst2__star--on" : ""}`}>★</span>
      ))}
    </div>
  );
}

export function TestimonialsNew() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 350);
  }, [active, animating]);

  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, [active, goTo]);

  const r = REVIEWS[active];

  return (
    <section className="tst2">
      <div className="tst2__bg">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt="Modern office"
          className="tst2__bg-img"
          loading="lazy"
        />
        <div className="tst2__overlay" />
      </div>

      <div className="tst2__inner">
        <div className="tst2__head">
          <div className="tst2__eyebrow">
            <span className="tst2__eyebrow-dot" />
            Client Testimonials
          </div>
          <h2 className="tst2__h2">
            What Our Clients
            <span className="tst2__h2-gold"> Say About Us</span>
          </h2>
        </div>

        <div className="tst2__layout">
          {/* Quote card */}
          <div className={`tst2__card${animating ? " tst2__card--exit" : " tst2__card--enter"}`}>
            <div className="tst2__quote-mark">"</div>
            <Stars count={r.stars} />
            <p className="tst2__text">{r.text}</p>
            <div className="tst2__author">
              <img src={r.img} alt={r.name} className="tst2__avatar" />
              <div>
                <div className="tst2__name">{r.name}</div>
                <div className="tst2__role">{r.role}</div>
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="tst2__nav">
            {REVIEWS.map((rv, i) => (
              <button
                key={rv.name}
                className={`tst2__nav-btn${i === active ? " tst2__nav-btn--active" : ""}`}
                onClick={() => goTo(i)}
              >
                <img src={rv.img} alt={rv.name} className="tst2__nav-av" />
                <div className="tst2__nav-info">
                  <div className="tst2__nav-name">{rv.name}</div>
                  <div className="tst2__nav-role">{rv.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="tst2__dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`tst2__dot${i === active ? " tst2__dot--active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .tst2 {
          position: relative;
          padding: 6rem 0;
          overflow: hidden;
        }
        .tst2__bg { position: absolute; inset: 0; }
        .tst2__bg-img { width: 100%; height: 100%; object-fit: cover; }
        .tst2__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(11,15,26,0.96) 0%, rgba(18,24,38,0.93) 100%);
        }
        .tst2__inner {
          position: relative; z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .tst2__head { text-align: center; margin-bottom: 3rem; }
        .tst2__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #D4AF37;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px;
          padding: 6px 16px;
          margin-bottom: 1.2rem;
        }
        .tst2__eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #D4AF37;
          animation: pulse 2s infinite;
        }
        .tst2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.9rem, 3.2vw, 2.7rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .tst2__h2-gold { color: #D4AF37; }

        .tst2__layout {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 3rem;
          align-items: start;
        }

        /* Quote card */
        .tst2__card {
          background: #121826;
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 20px;
          padding: 2.5rem;
          position: relative;
        }
        .tst2__card--enter { animation: fadeUp 0.4s ease forwards; }
        .tst2__card--exit { animation: fadeOut 0.3s ease forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }

        .tst2__quote-mark {
          font-family: 'Montserrat', serif;
          font-size: 5rem;
          color: #D4AF37;
          opacity: 0.25;
          line-height: 0.8;
          margin-bottom: 0.5rem;
          display: block;
        }

        .tst2__stars { display: flex; gap: 4px; margin-bottom: 1rem; }
        .tst2__star { font-size: 1rem; color: rgba(255,255,255,0.15); }
        .tst2__star--on { color: #D4AF37; }

        .tst2__text {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          margin-bottom: 1.8rem;
          font-style: italic;
        }
        .tst2__author {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(212,175,55,0.12);
        }
        .tst2__avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #D4AF37;
        }
        .tst2__name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          color: #fff;
          font-size: 0.95rem;
        }
        .tst2__role {
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
          margin-top: 2px;
        }

        /* Nav */
        .tst2__nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .tst2__nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(18,24,38,0.6);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 0.85rem 1rem;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s, background 0.2s;
        }
        .tst2__nav-btn--active {
          border-color: rgba(212,175,55,0.4);
          background: rgba(212,175,55,0.06);
        }
        .tst2__nav-av {
          width: 40px; height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 1.5px solid rgba(212,175,55,0.3);
        }
        .tst2__nav-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #fff;
        }
        .tst2__nav-role {
          font-family: 'Poppins', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          margin-top: 2px;
        }

        /* Dots */
        .tst2__dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 2rem;
        }
        .tst2__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .tst2__dot--active {
          background: #D4AF37;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 900px) {
          .tst2__layout { grid-template-columns: 1fr; }
          .tst2__nav { flex-direction: row; flex-wrap: wrap; }
          .tst2__nav-btn { flex: 1; min-width: 140px; }
        }
        @media (max-width: 560px) {
          .tst2 { padding: 4rem 0; }
          .tst2__card { padding: 1.5rem; }
        }
      `}</style>
    </section>
  );
}

export function CTASection({ onQuote }) {
  return (
    <section className="cta2">
      <div className="cta2__bg" />
      <div className="cta2__inner">
        <div className="cta2__content">
          <div className="cta2__eyebrow">Ready to Get Started?</div>
          <h2 className="cta2__h2">
            Let's Grow Your Business
            <span className="cta2__h2-gold"> Together</span>
          </h2>
          <p className="cta2__sub">
            Join 200+ businesses that trust Technosaga Infotech to power their
            digital growth. Get a free consultation today.
          </p>
          <div className="cta2__actions">
            <button className="cta2__btn-primary" onClick={onQuote}>
              Get a Free Quote →
            </button>
            <Link to="/contact" className="cta2__btn-ghost">
              Contact Us
            </Link>
          </div>
          <div className="cta2__trust">
            {["✅ No Commitment", "⚡ Quick Response", "🔒 100% Confidential"].map((t) => (
              <span key={t} className="cta2__trust-item">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cta2 {
          position: relative;
          padding: 6rem 0;
          overflow: hidden;
          background: #0B0F1A;
        }
        .cta2__bg {
          position: absolute; inset: 0;
          background: 
            radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%),
            linear-gradient(135deg, #0B0F1A 0%, #121826 100%);
        }
        .cta2__inner {
          position: relative; z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }
        .cta2__eyebrow {
          display: inline-block;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #D4AF37;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px;
          padding: 6px 16px;
          margin-bottom: 1.2rem;
        }
        .cta2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 1.2rem;
          line-height: 1.15;
        }
        .cta2__h2-gold { color: #D4AF37; }
        .cta2__sub {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin-bottom: 2.2rem;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta2__actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .cta2__btn-primary {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 15px 32px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(212,175,55,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta2__btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(212,175,55,0.55);
        }
        .cta2__btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.8);
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 15px 32px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.25);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .cta2__btn-ghost:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }
        .cta2__trust {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cta2__trust-item {
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
        }
        @media (max-width: 560px) {
          .cta2 { padding: 4rem 0; }
        }
      `}</style>
    </section>
  );
}
