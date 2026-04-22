import React from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  { label: "Web Design & Development", link: "/services/web-design-development" },
  { label: "Digital Marketing", link: "/services/digital-marketing" },
  { label: "BPO & Call Centre", link: "/services/bpo-services" },
  { label: "App Development", link: "/services/app-development" },
  { label: "Graphic Design", link: "/services/graphic-design" },
  { label: "Event Management", link: "/services/event-management" },
];

const COMPANY = [
  { label: "About Us", link: "/about" },
  { label: "Our Team", link: "/teams" },
  { label: "Our Work", link: "/works" },
  { label: "Gallery", link: "/gallery" },
  { label: "Careers", link: "/career" },
  { label: "Blog", link: "/blogs" },
];

const SOCIALS = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/technosagainfotech/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/technosagainfotech",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/919155031859",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function FooterNew() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft2">
      {/* Gold top line */}
      <div className="ft2__topline" />

      {/* CTA band */}
      <div className="ft2__cta-band">
        <div className="ft2__cta-inner">
          <div>
            <h3 className="ft2__cta-h">Ready to Grow Your Business?</h3>
            <p className="ft2__cta-p">Let's build something extraordinary together. Get a free consultation today.</p>
          </div>
          <a href="/contact" className="ft2__cta-btn">
            Get a Free Quote →
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="ft2__main">
        <div className="ft2__inner">
          <div className="ft2__grid">
            {/* Brand column */}
            <div className="ft2__brand">
              <div className="ft2__logo-wrap">
                <img src="/static/logo-new.png" alt="Technosaga Infotech" className="ft2__logo" />
                <div>
                  <div className="ft2__brand-name">Technosaga</div>
                  <div className="ft2__brand-sub">Infotech Pvt. Ltd.</div>
                </div>
              </div>
              <p className="ft2__desc">
                Technosaga Infotech is a Startup India Certified company delivering world-class digital marketing,
                web development, BPO, and IT solutions that drive measurable business growth.
              </p>
              <div className="ft2__socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.link}
                    className="ft2__soc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="ft2__cert">
                <span className="ft2__cert-badge">🏆 Startup India Certified</span>
                <span className="ft2__cert-badge">⭐ Est. 2021</span>
              </div>
            </div>

            {/* Company links */}
            <div>
              <h4 className="ft2__col-head">Company</h4>
              <ul className="ft2__list">
                {COMPANY.map((c) => (
                  <li key={c.label}>
                    <Link to={c.link} className="ft2__link">
                      <span className="ft2__link-arrow">›</span>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services links */}
            <div>
              <h4 className="ft2__col-head">Our Services</h4>
              <ul className="ft2__list">
                {SERVICES.map((s) => (
                  <li key={s.label}>
                    <Link to={s.link} className="ft2__link">
                      <span className="ft2__link-arrow">›</span>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="ft2__col-head">Get in Touch</h4>
              <ul className="ft2__contact-list">
                {[
                  { icon: "📍", label: "M2/12, Near Yamuna Apartment, Boring Road, Patna – 800001, Bihar" },
                  { icon: "📞", label: "+91 9155031859", link: "tel:+919155031859" },
                  { icon: "✉️", label: "info@technosagainfotech.com", link: "mailto:info@technosagainfotech.com" },
                  { icon: "🌐", label: "www.technosagainfotech.in", link: "https://technosagainfotech.in" },
                ].map((c) => (
                  <li key={c.label} className="ft2__contact-item">
                    <span className="ft2__contact-icon">{c.icon}</span>
                    {c.link ? (
                      <a href={c.link} className="ft2__contact-text ft2__contact-link">{c.label}</a>
                    ) : (
                      <span className="ft2__contact-text">{c.label}</span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Quick CTA */}
              <a
                href="https://wa.me/919155031859"
                className="ft2__wa-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft2__bottom">
        <div className="ft2__bottom-inner">
          <span className="ft2__copy">
            © {year} <strong>Technosaga Infotech Pvt. Ltd.</strong> All Rights Reserved.
          </span>
          <span className="ft2__made">
            Designed & Developed by{" "}
            <a href="https://technosagainfotech.in" className="ft2__made-link">Technosaga Infotech</a>
          </span>
          <Link to="/webs/login" className="ft2__admin-btn">
            🔐 Admin Login
          </Link>
        </div>
      </div>

      <style>{`
        /* ── FOOTER ──────────────────────────────────── */
        .ft2 {
          background: #0B0F1A;
          color: rgba(255,255,255,0.7);
          font-family: 'Poppins', 'DM Sans', sans-serif;
        }

        .ft2__topline {
          height: 3px;
          background: linear-gradient(90deg, transparent, #D4AF37 30%, #b8962d 70%, transparent);
        }

        /* CTA Band */
        .ft2__cta-band {
          background: linear-gradient(135deg, #121826 0%, #1a2235 100%);
          border-bottom: 1px solid rgba(212,175,55,0.12);
        }
        .ft2__cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .ft2__cta-h {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.3rem;
        }
        .ft2__cta-p {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.55);
        }
        .ft2__cta-btn {
          flex-shrink: 0;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 13px 28px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .ft2__cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(212,175,55,0.45);
          color: #0B0F1A;
        }

        /* Main */
        .ft2__main { padding: 3.5rem 0 2rem; }
        .ft2__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .ft2__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1.5fr;
          gap: 3rem;
        }

        /* Brand */
        .ft2__logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
        }
        .ft2__logo {
          width: 50px; height: 50px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(212,175,55,0.35));
        }
        .ft2__brand-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #D4AF37;
        }
        .ft2__brand-sub {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .ft2__desc {
          font-size: 0.82rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.2rem;
        }
        .ft2__socials {
          display: flex;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .ft2__soc {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(212,175,55,0.2);
          background: rgba(212,175,55,0.06);
          color: rgba(255,255,255,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .ft2__soc:hover {
          background: rgba(212,175,55,0.15);
          border-color: #D4AF37;
          color: #D4AF37;
          transform: translateY(-2px);
        }
        .ft2__cert {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .ft2__cert-badge {
          font-size: 0.72rem;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 4px;
          padding: 3px 10px;
          color: rgba(255,255,255,0.5);
        }

        /* Columns */
        .ft2__col-head {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #D4AF37;
          margin-bottom: 1.2rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(212,175,55,0.15);
        }
        .ft2__list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .ft2__link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.83rem;
          transition: color 0.15s, gap 0.15s;
        }
        .ft2__link:hover { color: #D4AF37; gap: 8px; }
        .ft2__link-arrow {
          color: #D4AF37;
          font-size: 1rem;
          line-height: 1;
        }

        /* Contact */
        .ft2__contact-list {
          list-style: none;
          padding: 0; margin: 0 0 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .ft2__contact-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .ft2__contact-icon { font-size: 0.85rem; flex-shrink: 0; margin-top: 2px; }
        .ft2__contact-text {
          font-size: 0.81rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }
        .ft2__contact-link {
          text-decoration: none;
          transition: color 0.15s;
        }
        .ft2__contact-link:hover { color: #D4AF37; }

        .ft2__wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          padding: 9px 18px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .ft2__wa-btn:hover {
          background: #1ebe5a;
          transform: translateY(-1px);
          color: #fff;
        }

        /* Bottom */
        .ft2__bottom {
          border-top: 1px solid rgba(212,175,55,0.1);
          padding: 1.2rem 0;
        }
        .ft2__bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ft2__copy {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
        }
        .ft2__copy strong { color: rgba(255,255,255,0.55); }
        .ft2__made {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }
        .ft2__made-link {
          color: #D4AF37;
          text-decoration: none;
        }
        .ft2__made-link:hover { text-decoration: underline; }

        /* Admin Login Button */
        .ft2__admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          padding: 5px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          font-family: 'Poppins', sans-serif;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .ft2__admin-btn:hover {
          color: #D4AF37;
          border-color: rgba(212,175,55,0.35);
          background: rgba(212,175,55,0.06);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ft2__grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 600px) {
          .ft2__grid { grid-template-columns: 1fr; gap: 1.75rem; }
          .ft2__cta-inner { flex-direction: column; align-items: flex-start; }
          .ft2__bottom-inner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
