// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const NAV = [
//   { label: "Home", link: "/" },
//   {
//     label: "About",
//     sub: [
//       { label: "About Company", link: "/about" },
//       { label: "Team Members", link: "/teams" },
//     ],
//   },
//   { label: "Works", link: "/works" },
//   {
//     label: "Services",
//     sub: [
//       {
//         label: "Web Design & Development",
//         link: "/services/web-design-development",
//       },
//       { label: "Digital Marketing", link: "/services/digital-marketing" },
//       { label: "BPO & Call Center Services", link: "/services/bpo-services" },
//       { label: "App Development", link: "/services/app-development" },
//       { label: "Graphic Design", link: "/services/graphic-design" },
//       {
//         label: "Photo & Video Production",
//         link: "/services/photo-video-production",
//       },
//       { label: "Job Consultancy", link: "/services/job-consultancy" },
//       { label: "Event Management", link: "/services/event-management" },
//       { label: "Live Streaming", link: "/services/live-streaming" },
//       {
//         label: "Political Rallies & Events",
//         link: "/services/political-rallies-events",
//       },
//     ],
//   },
//   { label: "Blogs", link: "/blogs" },
//   { label: "Gallery", link: "/gallery" },
//   { label: "Careers", link: "/career" },
//   { label: "Contact", link: "/contact" },
// ];

// export default function Navbar({ solid, onQuote }) {
//   const [open, setOpen] = useState(false);
//   const [sub, setSub] = useState(null);
//   return (
//     <>
//       <nav className={`navbar${solid ? " navbar--solid" : ""}`}>
//         <Link to="/" className="navbar__logo">
//           <img
//             src="/static/logo.png"
//             alt="Technosaga Logo"
//             className="main-logo"
//           />
//         </Link>
//         <ul className="navbar__nav">
//           {NAV.map((item) => (
//             <li key={item.label} className="nav-item">
//               <Link to={item.link} className="nav-link">
//                 {item.label}
//                 {item.sub && <span className="nav-arrow">▾</span>}
//               </Link>
//               {item.sub && (
//                 <div className="nav-drop">
//                   {item.sub.map((s) => (
//                     <Link key={s.label} to={s.link} className="drop-item">
//                       {s.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//         <button className="navbar__cta" onClick={onQuote}>
//           Get A Quote
//         </button>
//         <button
//           className="navbar__burger"
//           onClick={() => setOpen(!open)}
//           aria-label="Menu"
//         >
//           <span />
//           <span />
//           <span />
//         </button>
//       </nav>
//       <div className={`mobile-nav${open ? " mobile-nav--open" : ""}`}>
//         {NAV.map((item) => (
//           <div key={item.label}>
//             <Link
//               to={item.link}
//               className="mob-link"
//               onClick={(e) => {
//                 if (item.sub) {
//                   e.preventDefault();
//                   setSub(sub === item.label ? null : item.label);
//                 } else setOpen(false);
//               }}
//             >
//               {item.label}
//               {item.sub && <span>{sub === item.label ? "▴" : "▾"}</span>}
//             </Link>
//             {item.sub && (
//               <div
//                 className={`mob-sub${sub === item.label ? " mob-sub--open" : ""}`}
//               >
//                 {item.sub.map((s) => (
//                   <Link
//                     key={s.label}
//                     to={s.link}
//                     className="mob-sub-item"
//                     onClick={() => setOpen(false)}
//                   >
//                     <span>{s.icon}</span>
//                     {s.label}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="mob-cta">
//           <button
//             className="btn-primary btn-primary--full"
//             onClick={() => {
//               setOpen(false);
//               onQuote();
//             }}
//           >
//             Get A Free Quote →
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "Home", link: "/" },
  {
    label: "About",
    sub: [
      { label: "About Company", link: "/about", icon: "🏢" },
      { label: "Team Members", link: "/teams", icon: "👥" },
    ],
  },
  { label: "Works", link: "/works" },
  {
    label: "Services",
    wide: true,
    sub: [
      {
        label: "Web Design & Development",
        link: "/services/web-design-development",
        icon: "🌐",
      },
      {
        label: "Digital Marketing",
        link: "/services/digital-marketing",
        icon: "📣",
      },
      {
        label: "BPO & Call Center Services",
        link: "/services/bpo-services",
        icon: "🎧",
      },
      {
        label: "App Development",
        link: "/services/app-development",
        icon: "📱",
      },
      { label: "Graphic Design", link: "/services/graphic-design", icon: "🎨" },
      {
        label: "Photo & Video Production",
        link: "/services/photo-video-production",
        icon: "🎬",
      },
      {
        label: "Job Consultancy",
        link: "/services/job-consultancy",
        icon: "💼",
      },
      {
        label: "Event Management",
        link: "/services/event-management",
        icon: "🎪",
      },
      { label: "Live Streaming", link: "/services/live-streaming", icon: "📡" },
      {
        label: "Political Rallies & Events",
        link: "/services/political-rallies-events",
        icon: "🏛️",
      },
    ],
  },
  { label: "Blogs", link: "/blogs" },
  { label: "Gallery", link: "/gallery" },
  { label: "Careers", link: "/career" },
  { label: "Contact", link: "/contact" },
];

export default function Navbar({ solid, onQuote }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const [mobSub, setMobSub] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setSub(null);
    setMobSub(null);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setSub(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <nav
        ref={navRef}
        className={`navbar${solid ? " navbar--solid" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link to="/" className="navbar__logo" onClick={() => setSub(null)}>
          <img
            src="/static/logo.png"
            alt="Technosaga Infotech"
            className="main-logo"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="navbar__nav">
          {NAV.map((item) => (
            <li
              key={item.label}
              className="nav-item"
              onMouseEnter={() => item.sub && setSub(item.label)}
              onMouseLeave={() => item.sub && setSub(null)}
            >
              {item.sub ? (
                <button
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded={sub === item.label}
                >
                  {item.label}
                  <span className="nav-caret" aria-hidden="true">
                    ▾
                  </span>
                </button>
              ) : (
                <Link
                  to={item.link}
                  className="nav-link"
                  onClick={() => setSub(null)}
                >
                  {item.label}
                </Link>
              )}

              {item.sub && (
                <div
                  className={`nav-drop${item.wide ? " nav-drop--wide" : ""}${sub === item.label ? " nav-drop--open" : ""}`}
                  role="menu"
                >
                  {item.sub.map((s) => (
                    <Link
                      key={s.label}
                      to={s.link}
                      className="drop-item"
                      role="menuitem"
                      onClick={() => setSub(null)}
                    >
                      <span className="drop-item__icon" aria-hidden="true">
                        {s.icon}
                      </span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button className="navbar__cta navbar__cta--desk" onClick={onQuote}>
          Get A Quote
        </button>

        <button
          className="navbar__burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className={`bline${open ? " bline--t" : ""}`} />
          <span className={`bline${open ? " bline--m" : ""}`} />
          <span className={`bline${open ? " bline--b" : ""}`} />
        </button>
      </nav>

      {/* ── BACKDROP ── */}
      <div
        className={`mob-backdrop${open ? " mob-backdrop--on" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── MOBILE DRAWER ──
          Always in DOM so transform transition works.
          Visibility hidden when closed so it's not tabbable.
      ── */}
      <aside
        id="mobile-nav"
        className={`mob-drawer${open ? " mob-drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <button
          className="mob-drawer__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <nav>
          {NAV.map((item) => (
            <div key={item.label} className="mob-row">
              {item.sub ? (
                <button
                  className="mob-link"
                  onClick={() =>
                    setMobSub(mobSub === item.label ? null : item.label)
                  }
                  aria-expanded={mobSub === item.label}
                >
                  {item.label}
                  <span className="mob-caret" aria-hidden="true">
                    {mobSub === item.label ? "▴" : "▾"}
                  </span>
                </button>
              ) : (
                <Link to={item.link} className="mob-link">
                  {item.label}
                </Link>
              )}

              {/* Mobile sub — always rendered, shown via max-height transition */}
              {item.sub && (
                <div
                  className={`mob-sub${mobSub === item.label ? " mob-sub--open" : ""}`}
                >
                  {item.sub.map((s) => (
                    <Link key={s.label} to={s.link} className="mob-sub-item">
                      <span className="mob-sub-item__icon" aria-hidden="true">
                        {s.icon}
                      </span>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mob-footer">
          <button className="btn-primary btn-primary--full" onClick={onQuote}>
            Get A Free Quote →
          </button>
        </div>
      </aside>

      <style>{`

        /* ══ LOGO ══ */
        .navbar__logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .main-logo {
          height: 40px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        /* ══ NAVBAR LAYOUT ══ */
        .navbar {
          display: flex;
          align-items: center;
        }

        /* ══ DESKTOP NAV ══ */
        .navbar__nav {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0.5rem 0.75rem;
          font-size: 0.84rem;
          font-weight: 500;
          color: inherit;
          text-decoration: none;
          white-space: nowrap;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          line-height: 1;
          transition: color 0.18s;
        }
        .nav-link:hover { color: #CF9645; }

        .nav-caret {
          font-size: 0.58rem;
          opacity: 0.7;
        }

        /* ══════════════════════════════════════
           DESKTOP DROPDOWN

           FIX 1 — POSITION:
           Both dropdowns use left: 0 so they open
           directly below and left-aligned with their
           trigger nav-item. This keeps the dropdown
           beside / under the button, not floating away.

           For the wide Services dropdown we use
           left: 0 too but allow it to be wider than
           the trigger. If it would overflow the right
           edge the browser clips it — so we also set
           right: auto and let the min-width do the work.
        ══════════════════════════════════════ */
        .nav-drop {
          position: absolute;
          top: calc(100% + 2px);
          left: 0;              /* aligned to left of its nav-item */
          min-width: 200px;
          background: #ffffff;
          border: 1px solid rgba(207,150,69,0.25);
          border-radius: 10px;
          padding: 6px 0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          z-index: 1000;
          /* Hidden by default — shown with visibility+opacity
             so we can transition it without touching display */
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-4px);
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0s linear 0.18s;
        }
        .nav-drop--open {
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0s linear 0s;
        }

        /* Wide dropdown (Services) — 2-column grid.
           Anchored left: 0 from its nav-item.
           If that causes right-overflow on small desktops,
           swap to right: 0 in the media query below. */
        .nav-drop--wide {
          min-width: 460px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          padding: 8px;
          left: auto;
          right: auto;
          position: fixed;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
        }

        /* On smaller desktops where left:0 would overflow right,
           anchor from the right instead */
        

        .drop-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 0.9rem;
          color: #1a1208;
          text-decoration: none;
          font-size: 0.81rem;
          font-weight: 500;
          border-radius: 6px;
          white-space: nowrap;
          transition: background 0.13s, color 0.13s;
        }
        .drop-item:hover {
          background: #fdf6e9;
          color: #CF9645;
        }
        .drop-item__icon {
          flex-shrink: 0;
          font-size: 0.95rem;
          width: 20px;
          text-align: center;
        }

        /* ══ DESKTOP CTA ══ */
        .navbar__cta--desk { flex-shrink: 0; }

        /* ══════════════════════════════════════
           BURGER — hidden on desktop (≥1025px)
        ══════════════════════════════════════ */
        .navbar__burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          color: inherit;
          flex-shrink: 0;
        }
        .bline {
          display: block;
          width: 100%;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.2s;
          transform-origin: center;
        }
        .bline--t { transform: translateY(7px) rotate(45deg); }
        .bline--m { opacity: 0; transform: scaleX(0); }
        .bline--b { transform: translateY(-7px) rotate(-45deg); }

        /* ══════════════════════════════════════
           BACKDROP — hidden on desktop
        ══════════════════════════════════════ */
        .mob-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 198;
          backdrop-filter: blur(2px);
          opacity: 0;
          transition: opacity 0.28s;
          pointer-events: none;
        }
        .mob-backdrop--on {
          opacity: 1;
          pointer-events: auto;
        }

        /* ══════════════════════════════════════
           MOBILE DRAWER — hidden on desktop.

           FIX 2 — TRANSITION:
           We keep display:flex always active inside
           the ≤1024px breakpoint and use transform
           to slide it. display:none kills transitions,
           so we avoid it inside the mobile breakpoint.

           Outside the breakpoint (desktop) it stays
           display:none so it's completely inert.
        ══════════════════════════════════════ */
        .mob-drawer {
          display: none; /* off on desktop */
          position: fixed;
          top: 0;
          right: 0;
          height: 100dvh;
          padding: 3rem 0 0rem 0rem;
          width: min(300px, 82vw);
          background: #0e0a04;
          z-index: 199;
          flex-direction: column;
          /* overflow-y on the drawer itself — but sub-menus
             use max-height accordion so they expand in-flow,
             no clipping issue */
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          visibility: hidden;
        }
        .mob-drawer--open {
          transform: translateX(0);
          visibility: visible;
        }

        .mob-drawer__close {
          display: flex;
          align-self: flex-end;
          padding: 1rem 1.2rem 0.5rem;
          background: none;
          border: none;
          color: rgba(255,255,255,0.45);
          font-size: 1.1rem;
          cursor: pointer;
          transition: color 0.18s;
        }
        .mob-drawer__close:hover { color: #CF9645; }

        /* ══ MOBILE ROWS ══ */
        .mob-row {
          border-bottom: 1px solid rgba(207,150,69,0.1);
        }

        .mob-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.88rem 1.4rem;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 500;
          background: none;
          border: none;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
          transition: color 0.15s, background 0.15s;
        }
        .mob-link:hover,
        .mob-link:focus-visible {
          color: #CF9645;
          background: rgba(207,150,69,0.06);
          outline: none;
        }

        .mob-caret {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════
           MOBILE SUB-MENU

           FIX 2b — SUB VISIBILITY:
           Always rendered in the DOM (not conditionally).
           Uses max-height accordion so it expands in
           normal document flow — no overflow clipping.
           display:none / conditional rendering caused
           the sub to appear but get clipped by the
           drawer's overflow-y:auto.
        ══════════════════════════════════════ */
        .mob-sub {
          max-height: 0;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border-top: 0px solid rgba(207,150,69,0.08);
          transition: max-height 0.28s ease, border-top-width 0.01s;
        }
        .mob-sub--open {
          /* Large enough for 10 items × ~44px each */
          max-height: 600px;
          border-top: 1px solid rgba(207,150,69,0.08);
        }

        .mob-sub-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.72rem 1.4rem 0.72rem 1.8rem;
          color: rgba(255,255,255,0.58);
          text-decoration: none;
          font-size: 0.84rem;
          transition: color 0.15s, background 0.15s;
        }
        .mob-sub-item:hover,
        .mob-sub-item:focus-visible {
          color: #CF9645;
          background: rgba(207,150,69,0.06);
          outline: none;
        }
        .mob-sub-item__icon {
          font-size: 0.95rem;
          flex-shrink: 0;
          width: 20px;
          text-align: center;
        }

        /* ══ MOBILE FOOTER CTA ══ */
        .mob-footer {
          margin-top: auto;
          padding: 1.4rem;
          border-top: 1px solid rgba(207,150,69,0.1);
        }
        .btn-primary--full { width: 100%; }

        /* ══════════════════════════════════════
           RESPONSIVE BREAKPOINT — ≤ 1024px
        ══════════════════════════════════════ */
        @media (max-width: 1024px) {
          /* Hide desktop elements */
          .navbar__nav        { display: none; }
          .navbar__cta--desk  { display: none; }

          /* Show burger */
          .navbar__burger     { display: flex; }

          /* Activate backdrop and drawer */
          .mob-backdrop       { display: block; }
          .mob-drawer         { display: flex; }  /* now transform transition works */

          /* Logo */
          .main-logo          { height: 34px; }
        }

        @media (max-width: 600px) {
          .main-logo          { height: 30px; }
        }

      `}</style>
    </>
  );
}
