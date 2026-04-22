import React from "react";

const WHY = [
  { icon: "🚀", title: "Fast Delivery", desc: "Projects delivered on time, every time — without compromising on quality or attention to detail." },
  { icon: "🎧", title: "24/7 Support", desc: "Round-the-clock assistance ensuring your business never misses a beat or a customer." },
  { icon: "🎓", title: "Certified Experts", desc: "Industry-certified professionals with deep expertise across every digital discipline." },
  { icon: "💰", title: "Affordable Pricing", desc: "Premium quality services at competitive prices — exceptional value for every budget." },
  { icon: "🌍", title: "Global Reach", desc: "Proven track record of delivering outstanding results for clients in 15+ countries." },
  { icon: "🛡️", title: "Secure & Trusted", desc: "Enterprise-grade security, complete confidentiality, and total peace of mind on every project." },
];

const PROCESS = [
  { step: "01", title: "Requirement Analysis", desc: "We deep-dive into your business goals, target audience, and project requirements to create a clear roadmap.", icon: "🔍" },
  { step: "02", title: "Strategy & Planning", desc: "Our experts craft a tailored strategy with timelines, milestones, and deliverables aligned to your objectives.", icon: "📋" },
  { step: "03", title: "Design & Execution", desc: "Our creative and technical teams bring your vision to life with precision, creativity, and cutting-edge tools.", icon: "⚙️" },
  { step: "04", title: "Delivery & Support", desc: "We deliver on time, then stand by with ongoing support, optimisation, and growth-focused recommendations.", icon: "🚀" },
];

const STATS = [
  { n: "200+", l: "Happy Clients" },
  { n: "500+", l: "Projects Delivered" },
  { n: "5+", l: "Years of Excellence" },
  { n: "15+", l: "Countries Served" },
];

export default function WhyUsNew() {
  return (
    <>
      {/* ── WHY CHOOSE US ────────────────────────── */}
      <section className="wcu">
        <div className="wcu__bg">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
            alt="Team working"
            className="wcu__bg-img"
            loading="lazy"
          />
          <div className="wcu__overlay" />
        </div>

        <div className="wcu__inner">
          <div className="wcu__head">
            <div className="wcu__eyebrow">
              <span className="wcu__eyebrow-dot" />
              Why Choose Us
            </div>
            <h2 className="wcu__h2">
              What Sets Technosaga
              <span className="wcu__h2-gold"> Apart</span>
            </h2>
            <p className="wcu__sub">
              Industry-leading expertise, proven results, and genuine partnership —
              every step of your digital journey.
            </p>
          </div>

          <div className="wcu__grid">
            {WHY.map((w) => (
              <div key={w.title} className="wcu__card">
                <div className="wcu__card-icon">{w.icon}</div>
                <h3 className="wcu__card-title">{w.title}</h3>
                <p className="wcu__card-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ──────────────────────────── */}
      <section className="stb">
        <div className="stb__inner">
          <div className="stb__label">Our Impact in Numbers</div>
          <div className="stb__grid">
            {STATS.map((s, i) => (
              <div key={s.l} className="stb__item">
                {i > 0 && <div className="stb__divider" />}
                <div className="stb__n">{s.n}</div>
                <div className="stb__l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ─────────────────────── */}
      <section className="proc">
        <div className="proc__inner">
          <div className="proc__head">
            <div className="proc__eyebrow">
              <span className="proc__eyebrow-dot" />
              How We Work
            </div>
            <h2 className="proc__h2">
              Our Simple 4-Step
              <span className="proc__h2-gold"> Process</span>
            </h2>
            <p className="proc__sub">
              A proven, transparent workflow designed to deliver outstanding
              results on every project — from day one to delivery.
            </p>
          </div>

          <div className="proc__steps">
            {/* Connector line */}
            <div className="proc__line" />

            {PROCESS.map((p, i) => (
              <div key={p.step} className="proc__step">
                <div className="proc__step-circle">
                  <span className="proc__step-num">{p.step}</span>
                  <div className="proc__step-ring" />
                </div>
                <div className="proc__step-card">
                  <span className="proc__step-icon">{p.icon}</span>
                  <h3 className="proc__step-title">{p.title}</h3>
                  <p className="proc__step-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── WHY CHOOSE US ─────────────────── */
        .wcu {
          position: relative;
          padding: 6rem 0;
          overflow: hidden;
        }
        .wcu__bg {
          position: absolute;
          inset: 0;
        }
        .wcu__bg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .wcu__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(11,15,26,0.95) 0%, rgba(18,24,38,0.92) 100%);
        }
        .wcu__inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .wcu__head {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .wcu__eyebrow {
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
        .wcu__eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #D4AF37;
          animation: pulse 2s infinite;
        }
        .wcu__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.9rem, 3.2vw, 2.7rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .wcu__h2-gold { color: #D4AF37; }
        .wcu__sub {
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.5);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .wcu__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .wcu__card {
          background: rgba(18,24,38,0.7);
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 14px;
          padding: 1.8rem 1.5rem;
          text-align: center;
          backdrop-filter: blur(8px);
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .wcu__card:hover {
          transform: translateY(-5px);
          border-color: rgba(212,175,55,0.35);
          box-shadow: 0 12px 36px rgba(212,175,55,0.1);
        }
        .wcu__card-icon {
          width: 60px; height: 60px;
          background: rgba(212,175,55,0.12);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 1.1rem;
          transition: background 0.3s;
        }
        .wcu__card:hover .wcu__card-icon {
          background: rgba(212,175,55,0.2);
        }
        .wcu__card-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.6rem;
        }
        .wcu__card-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
        }

        /* ── STATS BAND ──────────────────── */
        .stb {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          padding: 3rem 0;
        }
        .stb__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }
        .stb__label {
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(11,15,26,0.6);
          margin-bottom: 1.5rem;
        }
        .stb__grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .stb__item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 3.5rem;
        }
        .stb__divider {
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 1px; height: 50px;
          background: rgba(11,15,26,0.2);
        }
        .stb__n {
          font-family: 'Montserrat', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #0B0F1A;
          line-height: 1;
        }
        .stb__l {
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(11,15,26,0.65);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        /* ── PROCESS ──────────────────────── */
        .proc {
          background: #0B0F1A;
          padding: 6rem 0;
        }
        .proc__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .proc__head {
          text-align: center;
          margin-bottom: 4rem;
        }
        .proc__eyebrow {
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
        .proc__eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #D4AF37;
          animation: pulse 2s infinite;
        }
        .proc__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.9rem, 3.2vw, 2.7rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .proc__h2-gold { color: #D4AF37; }
        .proc__sub {
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.5);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Steps layout */
        .proc__steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .proc__line {
          position: absolute;
          top: 32px;
          left: calc(12.5% + 16px);
          right: calc(12.5% + 16px);
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4) 20%, rgba(212,175,55,0.4) 80%, transparent);
          z-index: 0;
        }

        .proc__step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .proc__step-circle {
          position: relative;
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 6px 24px rgba(212,175,55,0.35);
          flex-shrink: 0;
        }
        .proc__step-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #0B0F1A;
        }
        .proc__step-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.25);
          animation: spinSlow 8s linear infinite;
        }
        .proc__step-card {
          background: #121826;
          border: 1px solid rgba(212,175,55,0.1);
          border-radius: 14px;
          padding: 1.5rem 1.2rem;
          transition: border-color 0.3s, transform 0.3s;
        }
        .proc__step-card:hover {
          border-color: rgba(212,175,55,0.3);
          transform: translateY(-4px);
        }
        .proc__step-icon {
          font-size: 1.8rem;
          display: block;
          margin-bottom: 0.8rem;
        }
        .proc__step-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.6rem;
        }
        .proc__step-desc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .wcu__grid { grid-template-columns: repeat(2, 1fr); }
          .proc__steps { grid-template-columns: repeat(2, 1fr); }
          .proc__line { display: none; }
        }
        @media (max-width: 640px) {
          .wcu { padding: 4rem 0; }
          .wcu__grid { grid-template-columns: 1fr; }
          .proc { padding: 4rem 0; }
          .proc__steps { grid-template-columns: 1fr; }
          .stb__item { padding: 0.5rem 2rem; }
        }
      `}</style>
    </>
  );
}
