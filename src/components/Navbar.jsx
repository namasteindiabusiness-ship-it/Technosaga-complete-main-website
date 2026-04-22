import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Home", link: "/" },
  {
    label: "About",
    sub: [
      { label: "About Company", link: "/about", icon: "🏢" },
      { label: "Our Team", link: "/teams", icon: "👥" },
    ],
  },
  { label: "Works", link: "/works" },
  {
    label: "Services",
    wide: true,
    sub: [
      { label: "Web Design & Development", link: "/services/web-design-development", icon: "🌐" },
      { label: "Digital Marketing", link: "/services/digital-marketing", icon: "📣" },
      { label: "BPO & Call Centre Services", link: "/services/bpo-services", icon: "🎧" },
      { label: "App Development", link: "/services/app-development", icon: "📱" },
      { label: "Graphic Design", link: "/services/graphic-design", icon: "🎨" },
      { label: "Photo & Video Production", link: "/services/photo-video-production", icon: "🎬" },
      { label: "Job Consultancy", link: "/services/job-consultancy", icon: "💼" },
      { label: "Event Management", link: "/services/event-management", icon: "🎪" },
      { label: "Live Streaming", link: "/services/live-streaming", icon: "📡" },
      { label: "Political Rallies & Events", link: "/services/political-rallies-events", icon: "🏛️" },
    ],
  },
  { label: "Blog", link: "/blogs" },
  { label: "Gallery", link: "/gallery" },
  { label: "Careers", link: "/career" },
  { label: "Contact", link: "/contact" },
];

export default function Navbar({ onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const [mobSub, setMobSub] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const leaveTimer = useRef(null);

  // Scroll detection for solid navbar
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setSub(null);
    setMobSub(null);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setSub(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className={`nav2${scrolled ? " nav2--solid" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav2__inner">
          {/* Logo */}
          <Link to="/" className="nav2__logo" onClick={() => setSub(null)}>
            <img
              src="/static/logo-new.png"
              alt="Technosaga Infotech Pvt. Ltd."
              className="nav2__logo-img"
              loading="eager"
            />
            <span className="nav2__logo-text">
              <span className="nav2__logo-main">Technosaga</span>
              <span className="nav2__logo-sub">Infotech Pvt. Ltd.</span>
            </span>
          </Link>

          {/* Desktop navigation links */}
          <ul className="nav2__links">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="nav2__item"
                onMouseEnter={() => { clearTimeout(leaveTimer.current); item.sub && setSub(item.label); }}
                onMouseLeave={() => { if (item.sub) { leaveTimer.current = setTimeout(() => setSub(null), 150); } }}
              >
                {item.sub ? (
                  <button
                    className="nav2__link"
                    aria-haspopup="true"
                    aria-expanded={sub === item.label}
                  >
                    {item.label}
                    <svg className="nav2__caret" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </button>
                ) : (
                  <Link to={item.link} className="nav2__link">
                    {item.label}
                  </Link>
                )}

                {item.sub && (
                  <div
                    className={`nav2__drop${item.wide ? " nav2__drop--wide" : ""}${sub === item.label ? " nav2__drop--open" : ""}`}
                    role="menu"
                    onMouseEnter={() => clearTimeout(leaveTimer.current)}
                    onMouseLeave={() => { leaveTimer.current = setTimeout(() => setSub(null), 150); }}
                  >
                    {item.sub.map((s) => (
                      <Link
                        key={s.label}
                        to={s.link}
                        className="nav2__drop-item"
                        role="menuitem"
                        onClick={() => setSub(null)}
                      >
                        <span className="nav2__drop-icon">{s.icon}</span>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button className="nav2__cta" onClick={onQuote}>
            Get a Quote
          </button>

          {/* Mobile burger */}
          <button
            className="nav2__burger"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`nav2__bline${open ? " nav2__bline--t" : ""}`} />
            <span className={`nav2__bline${open ? " nav2__bline--m" : ""}`} />
            <span className={`nav2__bline${open ? " nav2__bline--b" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <div
        className={`nav2__backdrop${open ? " nav2__backdrop--on" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        className={`nav2__drawer${open ? " nav2__drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Drawer header */}
        <div className="nav2__drawer-head">
          <img src="/static/logo-new.png" alt="Technosaga" className="nav2__drawer-logo" />
          <span className="nav2__drawer-brand">Technosaga <span>Infotech</span></span>
          <button
            className="nav2__drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >✕</button>
        </div>

        <nav className="nav2__drawer-nav">
          {NAV.map((item) => (
            <div key={item.label} className="nav2__mob-row">
              {item.sub ? (
                <button
                  className="nav2__mob-link"
                  onClick={() => setMobSub(mobSub === item.label ? null : item.label)}
                  aria-expanded={mobSub === item.label}
                >
                  {item.label}
                  <span className="nav2__mob-caret">{mobSub === item.label ? "▴" : "▾"}</span>
                </button>
              ) : (
                <Link to={item.link} className="nav2__mob-link">
                  {item.label}
                </Link>
              )}
              {item.sub && (
                <div className={`nav2__mob-sub${mobSub === item.label ? " nav2__mob-sub--open" : ""}`}>
                  {item.sub.map((s) => (
                    <Link key={s.label} to={s.link} className="nav2__mob-sub-item">
                      <span>{s.icon}</span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="nav2__drawer-foot">
          <button className="nav2__drawer-cta" onClick={() => { setOpen(false); onQuote(); }}>
            Get a Free Quote →
          </button>
          <a href="tel:+919155031859" className="nav2__drawer-phone">
            📞 +91 9155031859
          </a>
        </div>
      </aside>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

        /* ── NAVBAR ─────────────────────────────────── */
        .nav2 {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 900;
          height: 72px;
          background: linear-gradient(180deg, rgba(11,15,26,0.96) 0%, rgba(11,15,26,0.7) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212,175,55,0.15);
          transition: background 0.3s, border-color 0.3s, height 0.3s, box-shadow 0.3s;
        }
        .nav2--solid {
          background: rgba(11,15,26,0.98);
          border-bottom-color: rgba(212,175,55,0.25);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
          height: 64px;
        }

        .nav2__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        /* ── LOGO ── */
        .nav2__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav2__logo-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(212,175,55,0.4));
          transition: filter 0.3s;
        }
        .nav2__logo:hover .nav2__logo-img {
          filter: drop-shadow(0 0 14px rgba(212,175,55,0.7));
        }
        .nav2__logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .nav2__logo-main {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.05rem;
          color: #D4AF37;
          letter-spacing: 0.02em;
        }
        .nav2__logo-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 0.62rem;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── DESKTOP LINKS ── */
        .nav2__links {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
          gap: 0;
        }
        .nav2__item { position: relative; }
        .nav2__link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0.45rem 0.7rem;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.18s;
          position: relative;
        }
        .nav2__link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%; right: 50%;
          height: 2px;
          background: #D4AF37;
          border-radius: 2px;
          transition: left 0.25s, right 0.25s;
        }
        .nav2__link:hover { color: #D4AF37; }
        .nav2__link:hover::after { left: 0.7rem; right: 0.7rem; }

        .nav2__caret {
          flex-shrink: 0;
          opacity: 0.5;
          margin-top: 1px;
        }

        /* ── DROPDOWN ── */
        .nav2__drop {
          position: absolute;
          top: calc(100% + 0px);
          left: 0;
          min-width: 210px;
          background: #0f1521;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          z-index: 1000;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(4px);
          transition: opacity 0.2s, transform 0.2s, visibility 0s linear 0.2s;
          /* Bridge gap so mouse doesn't lose hover when moving from nav to dropdown */
          margin-top: 0px;
        }
        /* Invisible bridge between nav item and dropdown */
        .nav2__item::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          height: 12px;
          background: transparent;
        }
        .nav2__drop--open {
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: opacity 0.2s, transform 0.2s, visibility 0s;
        }
        .nav2__drop--wide {
          position: fixed;
          top: 64px;
          left: 50%;
          transform: translateX(-50%);
          min-width: 520px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }
        .nav2__drop--wide.nav2__drop--open {
          transform: translateX(-50%);
        }

        .nav2__drop-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.6rem 0.85rem;
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          border-radius: 8px;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .nav2__drop-item:hover {
          background: rgba(212,175,55,0.1);
          color: #D4AF37;
        }
        .nav2__drop-icon {
          width: 22px;
          text-align: center;
          flex-shrink: 0;
          font-size: 0.9rem;
        }

        /* ── DESKTOP CTA ── */
        .nav2__cta {
          flex-shrink: 0;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          letter-spacing: 0.02em;
        }
        .nav2__cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(212,175,55,0.45);
        }

        /* ── BURGER ── */
        .nav2__burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px; height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          flex-shrink: 0;
        }
        .nav2__bline {
          display: block;
          width: 100%; height: 2px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.2s;
          transform-origin: center;
        }
        .nav2__bline--t { transform: translateY(7px) rotate(45deg); background: #D4AF37; }
        .nav2__bline--m { opacity: 0; transform: scaleX(0); }
        .nav2__bline--b { transform: translateY(-7px) rotate(-45deg); background: #D4AF37; }

        /* ── BACKDROP ── */
        .nav2__backdrop {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 950;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.28s;
          backdrop-filter: blur(3px);
        }
        .nav2__backdrop--on {
          opacity: 1;
          pointer-events: auto;
        }

        /* ── MOBILE DRAWER ── */
        .nav2__drawer {
          display: none;
          position: fixed;
          top: 0; right: 0;
          height: 100dvh;
          width: min(320px, 85vw);
          background: #0B0F1A;
          border-left: 1px solid rgba(212,175,55,0.15);
          z-index: 999;
          flex-direction: column;
          transform: translateX(100%);
          visibility: hidden;
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), visibility 0s linear 0.32s;
          overflow-y: auto;
        }
        .nav2__drawer--open {
          transform: translateX(0);
          visibility: visible;
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), visibility 0s;
        }

        .nav2__drawer-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 1.2rem 1.2rem;
          border-bottom: 1px solid rgba(212,175,55,0.12);
        }
        .nav2__drawer-logo {
          width: 38px; height: 38px;
          object-fit: contain;
        }
        .nav2__drawer-brand {
          flex: 1;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
        }
        .nav2__drawer-brand span { color: #D4AF37; }
        .nav2__drawer-close {
          background: none; border: none;
          color: rgba(255,255,255,0.4);
          font-size: 1rem;
          cursor: pointer;
          padding: 6px;
          transition: color 0.18s;
        }
        .nav2__drawer-close:hover { color: #D4AF37; }

        .nav2__drawer-nav { flex: 1; padding: 0.5rem 0; }

        .nav2__mob-row {
          border-bottom: 1px solid rgba(212,175,55,0.07);
        }
        .nav2__mob-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.85rem 1.4rem;
          color: rgba(255,255,255,0.8);
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          background: none; border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .nav2__mob-link:hover { color: #D4AF37; background: rgba(212,175,55,0.05); }
        .nav2__mob-caret { font-size: 0.65rem; color: rgba(255,255,255,0.35); }

        .nav2__mob-sub {
          max-height: 0;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
          transition: max-height 0.3s ease;
        }
        .nav2__mob-sub--open { max-height: 700px; }

        .nav2__mob-sub-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.7rem 1.4rem 0.7rem 1.8rem;
          color: rgba(255,255,255,0.55);
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem;
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
        }
        .nav2__mob-sub-item:hover { color: #D4AF37; background: rgba(212,175,55,0.06); }

        .nav2__drawer-foot {
          padding: 1.2rem;
          border-top: 1px solid rgba(212,175,55,0.1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .nav2__drawer-cta {
          width: 100%;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 13px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(212,175,55,0.3);
        }
        .nav2__drawer-phone {
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 0.82rem;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .nav2__links { display: none; }
          .nav2__cta { display: none; }
          .nav2__burger { display: flex; }
          .nav2__backdrop { display: block; }
          .nav2__drawer { display: flex; }
          .nav2__logo-text { display: none; }
          .nav2__logo-img { width: 40px; height: 40px; }
        }
        @media (min-width: 1025px) {
          .nav2__logo-text { display: flex; }
        }
      `}</style>
    </>
  );
}
