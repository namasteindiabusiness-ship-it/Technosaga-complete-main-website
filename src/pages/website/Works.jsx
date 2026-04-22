import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { structuredData } from "../../libs/static";
import { Link } from "react-router-dom";

const T = {
  gold: "#CF9645",
  goldLight: "#fdf6e9",
  goldBorder: "rgba(207,150,69,0.22)",
  bg: "#f8f4ef",
  white: "#ffffff",
  dark: "#0e0a04",
  darkMid: "#1a1005",
  darkSoft: "#2e1f08",
  text: "#1a1208",
  textMid: "#5a4020",
  textMuted: "#9e8c6e",
  radius: { sm: 6, md: 10, lg: 14, xl: 20 },
};

const WORKS = [
  {
    id: 1,
    cat: "Web Design",
    img: "https://www.techesolver.com/image/work/ayushman-bihar.png",
    title: "Ayushman Bharat",
    link: "https://biswass.bihar.gov.in/",
  },
  {
    id: 2,
    cat: "Web Design",
    img: "https://www.techesolver.com/image/work/umang-india.png",
    title: "Umang India",
    link: "https://umang.pcidigitals.in/",
  },
  {
    id: 3,
    cat: "Web Design",
    img: "https://www.techesolver.com/image/work/socio.png",
    title: "SsocioPro",
    link: "https://ssociopro.com/",
  },
  {
    id: 4,
    cat: "Web Design",
    img: "https://www.techesolver.com/image/work/skn.jpg",
    title: "Skn Creative",
    link: "https://www.skncreative.org/",
  },
  {
    id: 4,
    cat: "App Development",
    img: "https://play-lh.googleusercontent.com/_8ok_tKkTabhUT_xOKgphIlRjJEsLpPDZQzsOUp22pRXjaxbH7GxJhZcYTXCqMRgskV8xfiIYJPWJesh3_ZBxA=w416-h235-rw",
    title: "Fastrise",
    link: "https://play.google.com/store/apps/details?id=com.hussurock.authmobileapp&hl=en_IN",
  },
];

/* ── Cat pill color map ── */
const CAT_COLORS = {
  "Web Design": { bg: "rgba(59,130,246,0.18)", text: "#93c5fd" },
  "Digital Marketing": { bg: "rgba(16,185,129,0.18)", text: "#6ee7b7" },
  "App Development": { bg: "rgba(139,92,246,0.18)", text: "#c4b5fd" },
  "Graphic Design": { bg: "rgba(236,72,153,0.18)", text: "#f9a8d4" },
  "Photo & Video": { bg: "rgba(245,158,11,0.18)", text: "#fcd34d" },
  "Event Management": { bg: "rgba(239,68,68,0.18)", text: "#fca5a5" },
  "Live Streaming": { bg: "rgba(20,184,166,0.18)", text: "#99f6e4" },
  "Political Events": { bg: "rgba(207,150,69,0.22)", text: "#CF9645" },
};

const IcoClose = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoChevLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IcoChevRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IcoTrophy = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke={T.gold}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="8 21 12 21 16 21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 4H17V11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11V4Z" />
    <path d="M17 6H20C20 6 20 11 17 11" />
    <path d="M7 6H4C4 6 4 11 7 11" />
  </svg>
);

/* ── Card ── */
function WorkCard({ work, onClick, index }) {
  const [hov, setHov] = useState(false);
  const cc = CAT_COLORS[work.cat] || CAT_COLORS["Web Design"];

  return (
    <Link
      to={work.link}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: T.radius.lg,
        cursor: "pointer",
        background: "#1a1005",
        aspectRatio: "4/3",
        animationDelay: `${(index % 12) * 0.04}s`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image */}
      <img
        src={work.img}
        alt={`${work.title} — ${work.cat} project for ${work.client}`}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hov ? "scale(1.07)" : "scale(1)",
        }}
      />

      {/* Permanent subtle gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,6,0,0.72) 0%, transparent 50%)",
        }}
      />

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,6,0,0.35)",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Cat pill — top left, shows on hover */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: cc.bg,
          color: cc.text,
          fontSize: "0.56rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 100,
          backdropFilter: "blur(6px)",
          border: `1px solid ${cc.text}30`,
          transform: hov ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 0.28s, transform 0.28s",
        }}
      >
        {work.cat}
      </div>

      {/* Bottom meta — always visible */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.1rem 1.1rem 1rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.97rem",
            fontWeight: 700,
            color: T.white,
            lineHeight: 1.2,
            marginBottom: 3,
          }}
        >
          {work.title}
        </div>
      </div>

      {/* Thin gold bottom border on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: T.gold,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />
    </Link>
  );
}

/* ── Main ── */
export default function OurWorks() {
  const [lightbox, setLightbox] = useState(null);
  const lbIdx = lightbox ? WORKS.findIndex((w) => w.id === lightbox.id) : -1;

  const openLb = (work) => setLightbox(work);
  const closeLb = () => setLightbox(null);
  const prevLb = () => {
    if (lbIdx > 0) setLightbox(WORKS[lbIdx - 1]);
  };
  const nextLb = () => {
    if (lbIdx < WORKS.length - 1) setLightbox(WORKS[lbIdx + 1]);
  };

  return (
    <>
      <Helmet>
        <title>
          Our Works | Technosaga Infotech — Digital & Creative Services
        </title>
        <meta
          name="description"
          content="Explore our portfolio of successful projects in web design, app development, marketing, and media services—built to drive growth and performance."
        />
        <link rel="canonical" href="https://technosagainfotech.in/works" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: T.bg,
          minHeight: "100vh",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .work-card {
            animation: fadeUp 0.5s ease both;
          }
          .works-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          }
          @media (max-width: 1100px) { .works-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 768px)  { .works-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px)  { .works-grid { grid-template-columns: repeat(2, 1fr); } }
          .hero-stats { gap: 3.5rem; }
          @media (max-width: 640px)  { .hero-stats { gap: 1.5rem; } }
        `}</style>

        {/* ══ HERO ══ */}
        <div
          style={{
            background: `linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 55%, ${T.darkSoft} 100%)`,
            padding: "5.5rem 2rem 4rem",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            marginTop: 90,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(207,150,69,0.1) 0%, transparent 65%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
          {/* Decorative rings */}
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px solid rgba(207,150,69,0.07)",
              top: -200,
              right: -150,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "1px solid rgba(207,150,69,0.06)",
              bottom: -100,
              left: -80,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(207,150,69,0.15)",
                border: "1px solid rgba(207,150,69,0.3)",
                borderRadius: 100,
                padding: "5px 16px 5px 10px",
                marginBottom: "1.4rem",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: T.gold,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.7rem",
                  color: T.gold,
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Our Portfolio
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3vw, 2rem)",
                fontWeight: 700,
                color: T.white,
                lineHeight: 1.08,
                margin: "0 0 1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Work That <span style={{ color: T.gold }}>Speaks</span>
              for Itself
            </h1>
          </div>
        </div>

        {/* ══ GRID ══ */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "2.5rem 2rem 5rem",
          }}
        >
          <div className="works-grid">
            {WORKS.map((work, i) => (
              <WorkCard key={work.id} work={work} onClick={openLb} index={i} />
            ))}
          </div>
        </div>

        {/* ══ LIGHTBOX ══ */}
        {lightbox && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(10,6,0,0.96)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={closeLb}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "90vw",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.img}
                alt={`${lightbox.title} — ${lightbox.cat} by ${lightbox.client}`}
                decoding="async"
                style={{
                  maxWidth: "85vw",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: T.radius.lg,
                  display: "block",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                }}
              />
              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    background:
                      (CAT_COLORS[lightbox.cat] || {}).bg ||
                      "rgba(207,150,69,0.2)",
                    color: (CAT_COLORS[lightbox.cat] || {}).text || T.gold,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: 4,
                    marginBottom: 8,
                    border: "1px solid rgba(207,150,69,0.3)",
                  }}
                >
                  {lightbox.cat}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: T.white,
                    margin: "0 0 4px",
                  }}
                >
                  {lightbox.title}
                </div>
                <div
                  style={{
                    fontSize: "0.84rem",
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 4,
                  }}
                >
                  {lightbox.client} · {lightbox.year}
                </div>
                <div
                  style={{
                    fontSize: "0.86rem",
                    color: T.gold,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <IcoTrophy /> {lightbox.result}
                </div>
              </div>
            </div>

            {/* Close */}
            <button
              style={{
                position: "fixed",
                top: "1.5rem",
                right: "1.5rem",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={closeLb}
            >
              <IcoClose />
            </button>

            {/* Prev */}
            {lbIdx > 0 && (
              <button
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "1.5rem",
                  transform: "translateY(-50%)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevLb();
                }}
              >
                <IcoChevLeft />
              </button>
            )}

            {/* Next */}
            {lbIdx < WORKS.length - 1 && (
              <button
                style={{
                  position: "fixed",
                  top: "50%",
                  right: "1.5rem",
                  transform: "translateY(-50%)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextLb();
                }}
              >
                <IcoChevRight />
              </button>
            )}

            {/* Counter */}
            <div
              style={{
                position: "fixed",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.12em",
              }}
            >
              {lbIdx + 1} / {WORKS.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
