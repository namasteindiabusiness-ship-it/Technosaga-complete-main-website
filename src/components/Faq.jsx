import React, { useState } from "react";

const FAQS = [
  { q:"What services does your digital agency provide?", a:"We offer full-stack website development, digital marketing, SEO, branding and creative design — tailored for growth-driven businesses across India and globally." },
  { q:"How long does a website project usually take?", a:"Timelines depend on scope — straightforward sites take around two weeks, while complex platforms with custom backends typically require four to six weeks." },
  { q:"Do you offer SEO and digital marketing packages?", a:"Yes. We craft personalised campaigns spanning SEO, paid media and social that boost visibility and generate qualified leads for your business." },
  { q:"Can you redesign our existing website?", a:"Absolutely. We specialise in transforming outdated digital presences into high-performance, on-brand experiences that convert visitors into customers." },
  { q:"Do you provide ongoing support after project delivery?", a:"Yes, we offer comprehensive post-delivery support, maintenance packages, and growth-focused optimisation plans tailored to your business needs." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq2">
      <div className="faq2__inner">
        {/* Left */}
        <div className="faq2__left">
          <div className="faq2__eyebrow"><span className="faq2__eyebrow-dot" />FAQ</div>
          <h2 className="faq2__h2">
            Frequently<br />Asked<br />
            <span className="faq2__gold">Questions</span>
          </h2>
          <p className="faq2__hint">
            Can't find what you're looking for? Reach out and we'll be happy to help.
          </p>
          <a href="/contact" className="faq2__contact-btn">Ask Us a Question →</a>
          <div className="faq2__img-wrap">
            <img src="./static/faq-banner.png" alt="FAQ Support" className="faq2__img" loading="lazy" />
          </div>
        </div>

        {/* Right accordion */}
        <div className="faq2__list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq2__item${open === i ? " faq2__item--open" : ""}`}>
              <button className="faq2__q" onClick={() => setOpen(open === i ? null : i)}>
                <span className="faq2__num">0{i+1}</span>
                <span className="faq2__qtext">{f.q}</span>
                <span className="faq2__toggle">{open === i ? "−" : "+"}</span>
              </button>
              <div className={`faq2__a${open === i ? " faq2__a--open" : ""}`}>
                <p className="faq2__atext">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq2 {
          background: #0f1521;
          padding: 6rem 0;
        }
        .faq2__inner {
          max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: 5rem; align-items: start;
        }
        .faq2__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #D4AF37;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px; padding: 5px 14px; margin-bottom: 1.2rem;
        }
        .faq2__eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D4AF37; animation: pulse 2s infinite; flex-shrink: 0;
        }
        .faq2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800; color: #fff;
          line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .faq2__gold { color: #D4AF37; }
        .faq2__hint {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem; color: rgba(255,255,255,0.45);
          line-height: 1.65; margin-bottom: 1.5rem;
        }
        .faq2__contact-btn {
          display: inline-flex; align-items: center;
          background: linear-gradient(135deg, #D4AF37, #b8962d);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif;
          font-weight: 700; font-size: 0.84rem;
          padding: 10px 20px; border-radius: 8px; text-decoration: none;
          box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s; margin-bottom: 2rem;
        }
        .faq2__contact-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.4); color:#0B0F1A; }
        .faq2__img-wrap { border-radius: 14px; overflow: hidden; }
        .faq2__img { width: 100%; max-width: 280px; display: block; opacity: 0.85; }

        /* Accordion */
        .faq2__list { display: flex; flex-direction: column; gap: 0; }
        .faq2__item {
          border-bottom: 1px solid rgba(212,175,55,0.1);
          overflow: hidden;
        }
        .faq2__item:first-child { border-top: 1px solid rgba(212,175,55,0.1); }
        .faq2__q {
          width: 100%; display: flex; align-items: center; gap: 14px;
          padding: 1.2rem 0; background: none; border: none; cursor: pointer;
          text-align: left;
          transition: background 0.18s;
        }
        .faq2__q:hover { background: rgba(212,175,55,0.02); }
        .faq2__num {
          font-family: 'Montserrat', sans-serif; font-size: 0.75rem;
          font-weight: 700; color: rgba(212,175,55,0.5); flex-shrink: 0; width: 24px;
        }
        .faq2__item--open .faq2__num { color: #D4AF37; }
        .faq2__qtext {
          flex: 1; font-family: 'Poppins', sans-serif; font-size: 0.92rem;
          font-weight: 500; color: rgba(255,255,255,0.8); line-height: 1.4;
        }
        .faq2__item--open .faq2__qtext { color: #fff; }
        .faq2__toggle {
          flex-shrink: 0; width: 28px; height: 28px;
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: #D4AF37; font-weight: 600;
          transition: background 0.2s, transform 0.25s;
        }
        .faq2__item--open .faq2__toggle {
          background: #D4AF37; color: #0B0F1A; transform: rotate(0deg);
        }
        .faq2__a {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s;
          padding: 0 0 0 38px;
        }
        .faq2__a--open {
          max-height: 300px;
          padding: 0 0 1.2rem 38px;
        }
        .faq2__atext {
          font-family: 'Poppins', sans-serif; font-size: 0.85rem;
          color: rgba(255,255,255,0.5); line-height: 1.75;
        }

        @media (max-width: 900px) {
          .faq2__inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .faq2__img { max-width: 200px; }
        }
        @media (max-width: 560px) { .faq2 { padding: 4rem 0; } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
