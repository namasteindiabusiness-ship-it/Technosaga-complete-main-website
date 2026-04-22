import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    eyebrow: "🏆 Startup India Certified — Est. 2021",
    heading: "Patna's Premier Digital\nMarketing Agency",
    sub: "Drive real growth with data-backed strategies. 200+ clients served across India and 15+ countries.",
    cta1: "Get a Free Quote",
    cta2: "Contact Us",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600&q=80",
    eyebrow: "🌐 World-Class Web Solutions",
    heading: "Custom Websites That\nConvert & Captivate",
    sub: "From stunning UI/UX to blazing-fast performance — we build digital experiences your customers love.",
    cta1: "Get a Free Quote",
    cta2: "View Our Work",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80",
    eyebrow: "🎧 End-to-End BPO Services",
    heading: "Reliable BPO & Call Centre\nSolutions for Every Business",
    sub: "Inbound, outbound, data entry, and telecalling — let us handle your operations while you focus on growth.",
    cta1: "Get a Free Quote",
    cta2: "Contact Us",
  },
  {
    id: 4,
    bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80",
    eyebrow: "📱 Next-Gen App Development",
    heading: "Mobile & Web Apps Built\nfor Scale & Success",
    sub: "iOS, Android, and cross-platform apps engineered for seamless performance and outstanding user experience.",
    cta1: "Get a Free Quote",
    cta2: "Explore Services",
  },
  {
    id: 5,
    bg: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80",
    eyebrow: "🚀 500+ Projects Delivered",
    heading: "Your Trusted Technology\nPartner Since 2021",
    sub: "From startups to enterprises — Technosaga Infotech delivers innovative IT solutions that power business growth.",
    cta1: "Get a Free Quote",
    cta2: "About Us",
  },
];

const CTA2_LINKS = ["/contact", "/works", "/contact", "/services/app-development", "/about"];

export default function HeroSlider({ onQuote }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const goTo = useCallback((idx, dir = "next") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 600);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev");
  }, [current, goTo]);

  // Auto-advance every 5s
  useEffect(() => {
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [current, next]);

  const s = SLIDES[current];

  return (
    <section className="hs">
      {/* Background images — preload all, show current */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`hs__bg${i === current ? " hs__bg--active" : ""}${animating && i === current ? ` hs__bg--${direction}` : ""}`}
          style={{ backgroundImage: `url(${slide.bg})` }}
          aria-hidden={i !== current}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="hs__overlay" />

      {/* Animated gold grain texture */}
      <div className="hs__grain" />

      {/* Content */}
      <div className={`hs__content${animating ? " hs__content--exit" : " hs__content--enter"}`}>
        <div className="hs__eyebrow">
          <span className="hs__eyebrow-dot" />
          {s.eyebrow}
        </div>
        <h1 className="hs__h1">
          {s.heading.split("\n").map((line, i) => (
            <span key={i} className={i === 1 ? "hs__h1-gold" : ""}>
              {line}
              {i < s.heading.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="hs__sub">{s.sub}</p>
        <div className="hs__actions">
          <button className="hs__btn-primary" onClick={onQuote}>
            {s.cta1} <span className="hs__btn-arrow">→</span>
          </button>
          <Link to={CTA2_LINKS[current]} className="hs__btn-ghost">
            {s.cta2}
          </Link>
        </div>

        {/* Trust badges */}
        <div className="hs__trust">
          {["✅ Startup India Certified", "⭐ 200+ Happy Clients", "🌍 15+ Countries", "🏗️ 500+ Projects"].map((t) => (
            <span key={t} className="hs__trust-badge">{t}</span>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <button className="hs__arrow hs__arrow--prev" onClick={prev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hs__arrow hs__arrow--next" onClick={next} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hs__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hs__dot${i === current ? " hs__dot--active" : ""}`}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="hs__counter">
        <span className="hs__counter-cur">{String(current + 1).padStart(2, "0")}</span>
        <span className="hs__counter-sep"> / </span>
        <span className="hs__counter-tot">{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      <style>{`
        /* ─── HERO SLIDER ─────────────────────────────────────── */
        .hs {
          position: relative;
          height: 100vh;
          min-height: 620px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* Backgrounds */
        .hs__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.08);
          transition: opacity 0.8s ease, transform 6s ease;
          will-change: transform, opacity;
        }
        .hs__bg--active {
          opacity: 1;
          transform: scale(1);
        }

        /* Overlay */
        .hs__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(11,15,26,0.88) 0%,
            rgba(11,15,26,0.65) 55%,
            rgba(11,15,26,0.35) 100%
          );
          z-index: 1;
        }

        /* Grain */
        .hs__grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        /* Content */
        .hs__content {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
          padding-top: 80px;
        }
        .hs__content--enter {
          animation: hsEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hs__content--exit {
          animation: hsExit 0.4s ease forwards;
        }
        @keyframes hsEnter {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hsExit {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-16px); }
        }

        .hs__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #D4AF37;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 40px;
          padding: 6px 16px;
          margin-bottom: 1.5rem;
        }
        .hs__eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #D4AF37;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        .hs__h1 {
          font-family: 'Montserrat', 'Poppins', sans-serif;
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.12;
          color: #fff;
          margin-bottom: 1.3rem;
          max-width: 700px;
          letter-spacing: -0.02em;
        }
        .hs__h1-gold {
          color: #D4AF37;
          display: block;
        }

        .hs__sub {
          font-size: clamp(0.95rem, 1.6vw, 1.12rem);
          color: rgba(255,255,255,0.75);
          max-width: 560px;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .hs__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .hs__btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(212,175,55,0.35);
          letter-spacing: 0.02em;
        }
        .hs__btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(212,175,55,0.5);
        }
        .hs__btn-arrow {
          transition: transform 0.2s;
        }
        .hs__btn-primary:hover .hs__btn-arrow {
          transform: translateX(4px);
        }

        .hs__btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          font-family: 'Montserrat', 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 28px;
          border-radius: 8px;
          border: 1.5px solid rgba(255,255,255,0.35);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          text-decoration: none;
        }
        .hs__btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
          color: #fff;
        }

        /* Trust badges */
        .hs__trust {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .hs__trust-badge {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 4px 12px;
          white-space: nowrap;
          backdrop-filter: blur(4px);
        }

        /* Arrows */
        .hs__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.4);
          background: rgba(11,15,26,0.5);
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          backdrop-filter: blur(8px);
        }
        .hs__arrow:hover {
          background: rgba(212,175,55,0.15);
          border-color: #D4AF37;
          transform: translateY(-50%) scale(1.08);
        }
        .hs__arrow--prev { left: 2rem; }
        .hs__arrow--next { right: 2rem; }

        /* Dots */
        .hs__dots {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .hs__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.5);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .hs__dot--active {
          background: #D4AF37;
          border-color: #D4AF37;
          width: 28px;
          border-radius: 4px;
        }

        /* Counter */
        .hs__counter {
          position: absolute;
          bottom: 2.4rem;
          right: 2rem;
          z-index: 4;
          font-family: 'Montserrat', monospace;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
        }
        .hs__counter-cur {
          color: #D4AF37;
          font-weight: 700;
          font-size: 1rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hs { height: 100svh; min-height: 560px; }
          .hs__h1 { font-size: 2rem; }
          .hs__arrow--prev { left: 0.75rem; width: 38px; height: 38px; }
          .hs__arrow--next { right: 0.75rem; width: 38px; height: 38px; }
          .hs__content { padding: 0 1.25rem; padding-top: 80px; }
          .hs__actions { gap: 0.75rem; }
          .hs__btn-primary, .hs__btn-ghost { font-size: 0.88rem; padding: 12px 20px; }
          .hs__trust { display: none; }
        }
      `}</style>
    </section>
  );
}
