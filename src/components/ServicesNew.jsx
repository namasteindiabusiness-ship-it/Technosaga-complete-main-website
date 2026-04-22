import React, { useState } from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Design & Development",
    desc: "Bespoke, conversion-focused websites built for speed, SEO, and long-term business growth.",
    features: ["Custom UI/UX Design", "Mobile Responsive", "SEO Optimised Code", "Fast Loading < 3s"],
    link: "/services/web-design-development",
    color: "#4A90E2",
  },
  {
    icon: "📣",
    title: "Digital Marketing",
    desc: "Full-funnel digital strategies combining SEO, social media, and paid ads to amplify your brand.",
    features: ["Search Engine Optimisation", "Social Media Marketing", "Google & Meta Ads", "Content Strategy"],
    link: "/services/digital-marketing",
    color: "#D4AF37",
  },
  {
    icon: "🎧",
    title: "BPO & Call Centre Services",
    desc: "Professional inbound and outbound BPO solutions to streamline your operations and delight customers.",
    features: ["Inbound / Outbound Calls", "Data Entry & Processing", "Customer Support", "Lead Generation"],
    link: "/services/bpo-services",
    color: "#50C878",
  },
  {
    icon: "📱",
    title: "App Development",
    desc: "Native and cross-platform mobile apps engineered for seamless performance and outstanding UX.",
    features: ["iOS & Android Apps", "Cross-Platform (React Native)", "UI/UX Design", "App Store Deployment"],
    link: "/services/app-development",
    color: "#FF6B6B",
  },
  {
    icon: "🎨",
    title: "Graphic Design",
    desc: "Powerful brand identities and visual systems that communicate your story with clarity and impact.",
    features: ["Logo & Brand Identity", "Social Media Graphics", "Brochure & Print Design", "Motion Graphics"],
    link: "/services/graphic-design",
    color: "#9B59B6",
  },
  {
    icon: "🎬",
    title: "Photo & Video Production",
    desc: "High-quality production for brand films, social content, events, and advertising campaigns.",
    features: ["Brand Films & Reels", "Product Photography", "Corporate Videos", "Event Coverage"],
    link: "/services/photo-video-production",
    color: "#E67E22",
  },
  {
    icon: "💼",
    title: "Job Consultancy",
    desc: "Connecting talented professionals with the right opportunities across industries nationwide.",
    features: ["Talent Sourcing", "Resume Building", "Interview Preparation", "Placement Assistance"],
    link: "/services/job-consultancy",
    color: "#1ABC9C",
  },
  {
    icon: "🎪",
    title: "Event Management",
    desc: "End-to-end event planning and execution — from corporate conferences to large-scale rallies.",
    features: ["Corporate Events", "Product Launches", "Stage & Logistics", "Live Streaming Setup"],
    link: "/services/event-management",
    color: "#3498DB",
  },
  {
    icon: "📡",
    title: "Live Streaming",
    desc: "Professional live streaming services ensuring seamless, high-quality broadcasts for any event.",
    features: ["Multi-Platform Streaming", "HD/4K Broadcast", "Real-Time Engagement", "Technical Support"],
    link: "/services/live-streaming",
    color: "#E74C3C",
  },
];

export default function ServicesNew({ onQuote }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="sv2" id="services">
      {/* Section header */}
      <div className="sv2__head">
        <div className="sv2__eyebrow">
          <span className="sv2__eyebrow-dot" />
          What We Offer
        </div>
        <h2 className="sv2__h2">
          Our Premium
          <span className="sv2__h2-gold"> Services</span>
        </h2>
        <p className="sv2__sub">
          Comprehensive digital solutions tailored to elevate your brand,
          drive growth, and deliver measurable results for your business.
        </p>
      </div>

      {/* Services grid */}
      <div className="sv2__grid">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`sv2__card${hovered === i ? " sv2__card--hov" : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ "--svc-color": s.color }}
          >
            {/* Gold glow on hover */}
            <div className="sv2__card-glow" />

            {/* Icon */}
            <div className="sv2__icon-wrap">
              <span className="sv2__icon">{s.icon}</span>
            </div>

            {/* Title & desc */}
            <h3 className="sv2__title">{s.title}</h3>
            <p className="sv2__desc">{s.desc}</p>

            {/* Feature bullets */}
            <ul className="sv2__features">
              {s.features.map((f) => (
                <li key={f} className="sv2__feature">
                  <span className="sv2__feature-dot">›</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="sv2__btns">
              <Link to={s.link} className="sv2__btn-know">
                Know More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <button className="sv2__btn-quote" onClick={onQuote}>
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View all CTA */}
      <div className="sv2__footer">
        <Link to="/services/web-design-development" className="sv2__view-all">
          View All Services →
        </Link>
      </div>

      <style>{`
        /* ── SERVICES SECTION ──────────────────── */
        .sv2 {
          background: #0f1521;
          padding: 6rem 0;
          overflow: hidden;
        }

        /* Header */
        .sv2__head {
          max-width: 1200px;
          margin: 0 auto 3.5rem;
          padding: 0 1.5rem;
          text-align: center;
        }
        .sv2__eyebrow {
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
        .sv2__eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #D4AF37;
          animation: pulse 2s infinite;
        }
        .sv2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .sv2__h2-gold { color: #D4AF37; }
        .sv2__sub {
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.5);
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* Grid */
        .sv2__grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Card */
        .sv2__card {
          position: relative;
          background: #121826;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem 1.6rem;
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .sv2__card--hov {
          transform: translateY(-6px);
          border-color: rgba(212,175,55,0.4);
          box-shadow: 0 12px 40px rgba(212,175,55,0.12), 0 0 0 1px rgba(212,175,55,0.15);
        }

        /* Glow */
        .sv2__card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sv2__card--hov .sv2__card-glow { opacity: 1; }

        /* Icon */
        .sv2__icon-wrap {
          width: 52px; height: 52px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
          transition: background 0.3s, border-color 0.3s;
        }
        .sv2__card--hov .sv2__icon-wrap {
          background: rgba(212,175,55,0.18);
          border-color: rgba(212,175,55,0.4);
        }
        .sv2__icon { font-size: 1.6rem; }

        /* Title */
        .sv2__title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }

        /* Desc */
        .sv2__desc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.65;
          margin-bottom: 1.1rem;
        }

        /* Features */
        .sv2__features {
          list-style: none;
          padding: 0; margin: 0 0 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .sv2__feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
        }
        .sv2__feature-dot {
          color: #D4AF37;
          font-size: 1rem;
          line-height: 1;
          flex-shrink: 0;
        }

        /* Buttons */
        .sv2__btns {
          display: flex;
          gap: 0.7rem;
          flex-wrap: wrap;
        }
        .sv2__btn-know {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid rgba(212,175,55,0.4);
          color: #D4AF37;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.76rem;
          padding: 8px 14px;
          border-radius: 7px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .sv2__btn-know:hover {
          background: rgba(212,175,55,0.1);
          border-color: #D4AF37;
          color: #D4AF37;
        }
        .sv2__btn-quote {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.76rem;
          padding: 8px 14px;
          border-radius: 7px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sv2__btn-quote:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(212,175,55,0.35);
        }

        /* Footer */
        .sv2__footer {
          max-width: 1200px;
          margin: 2.5rem auto 0;
          padding: 0 1.5rem;
          text-align: center;
        }
        .sv2__view-all {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #D4AF37;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(212,175,55,0.3);
          padding-bottom: 2px;
          transition: border-color 0.2s, gap 0.2s;
        }
        .sv2__view-all:hover { border-color: #D4AF37; gap: 10px; color: #D4AF37; }

        /* Responsive */
        @media (max-width: 1024px) {
          .sv2__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sv2 { padding: 4rem 0; }
          .sv2__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
