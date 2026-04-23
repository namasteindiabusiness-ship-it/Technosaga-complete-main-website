import { useState, useEffect, useCallback } from "react";
import API from "../../libs/apiCall";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet-async";

const StyleSheet = { create: (s) => s };

/* ── GLOBAL DARK THEME OVERRIDE ── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');
  body { background: #0B0F1A; }
`;



const T = {
  gold: "#D4AF37",
  bg: "#0B0F1A",
  dark: "rgba(10,6,0,0.94)",
  radius: 12,
};

const styles = StyleSheet.create({
  page: {
    background: "#0B0F1A",
    minHeight: "100vh",
    padding: "2.5rem 1.5rem 4rem",
  },

  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
    marginTop: "120px",
  },
  headerTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
    fontWeight: 700,
    color: "#1a1208",
    margin: "0 0 0.4rem",
    letterSpacing: "-0.02em",
  },
  headerAccent: { color: T.gold },
  headerLine: {
    width: 48,
    height: 3,
    background: T.gold,
    borderRadius: 2,
    margin: "0.6rem auto 0",
  },

  // empty state
  emptyWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5rem 1rem",
    gap: "1rem",
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "#ede8e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#1a1208",
    margin: 0,
  },
  emptyText: {
    fontSize: "0.9rem",
    color: "#8a7d6b",
    margin: 0,
  },

  grid: {
    maxWidth: 1200,
    margin: "0 auto",
    columns: "4 220px",
    gap: "1rem",
    columnGap: "1rem",
  },

  tileWrap: {
    breakInside: "avoid",
    marginBottom: "1rem",
    display: "block",
  },

  tile: {
    width: "100%",
    display: "block",
    borderRadius: T.radius,
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    background: "#e8e0d4",
  },

  tileImg: {
    width: "100%",
    height: "auto",
    display: "block",
    transition:
      "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s",
  },

  backdrop: {
    position: "fixed",
    inset: 0,
    background: T.dark,
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lightboxImg: {
    maxWidth: "90vw",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: T.radius,
    display: "block",
    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
  },
  btnClose: {
    position: "fixed",
    top: "1.2rem",
    right: "1.2rem",
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  btnNav: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  counter: {
    position: "fixed",
    bottom: "1.2rem",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.14em",
    fontFamily: "'Poppins', sans-serif",
  },
});

const IcoClose = () => (
  <svg
    width="16"
    height="16"
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
const IcoLeft = () => (
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
const IcoRight = () => (
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
const IcoImage = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a89880"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

function PhotoTile({ photo, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={styles.tileWrap}>
      <div
        style={styles.tile}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(photo)}
      >
        <img
          src={photo.photo} // fixed: was photo.thumb — the model field is "photo"
          alt={photo.title || ""}
          loading="lazy"
          style={{
            ...styles.tileImg,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: hovered ? 0.88 : 1,
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [active, setActive] = useState(null);

  const idx = active ? galleryData.findIndex((p) => p._id === active._id) : -1;

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    if (idx > 0) setActive(galleryData[idx - 1]);
  }, [idx, galleryData]);
  const next = useCallback(() => {
    if (idx < galleryData.length - 1) setActive(galleryData[idx + 1]);
  }, [idx, galleryData]);

  const getGallery = async () => {
    try {
      const { data: res } = await API.get("/gallery/galleryList");
      setGalleryData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getGallery();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!active) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, close, prev, next]);

  if (pageLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Photo Gallery | Technosaga Infotech</title>
        <link rel="canonical" href="https://technosagainfotech.in/gallery" />
      </Helmet>
      <div style={{...styles.page, background:"#0B0F1A", fontFamily:"'Poppins', sans-serif", paddingTop: 72}}>
        <style>{`
        @media (max-width: 900px)  { .gal-grid { columns: 3 180px !important; } }
        @media (max-width: 600px)  { .gal-grid { columns: 2 140px !important; } }
        @media (max-width: 380px)  { .gal-grid { columns: 1 !important; } }
      `}</style>

        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            Our <span style={styles.headerAccent}>Gallery</span>
          </h1>
          <div style={styles.headerLine} />
        </div>

        {/* empty state */}
        {galleryData.length === 0 ? (
          <div style={styles.emptyWrap}>
            <div style={styles.emptyIcon}>
              <IcoImage />
            </div>
            <p style={styles.emptyTitle}>No photos yet</p>
            <p style={styles.emptyText}>
              Check back soon — we're adding new memories.
            </p>
          </div>
        ) : (
          <div style={styles.grid} className="gal-grid">
            {galleryData.map((photo) => (
              <PhotoTile key={photo._id} photo={photo} onClick={setActive} />
            ))}
          </div>
        )}

        {/* Lightbox */}
        {active && (
          <div style={styles.backdrop} onClick={close}>
            <img
              src={active.photo} // fixed: was active.src — the model field is "photo"
              alt={active.title || ""}
              style={styles.lightboxImg}
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
              decoding="async"
            />

            <button style={styles.btnClose} onClick={close}>
              <IcoClose />
            </button>

            {idx > 0 && (
              <button
                style={{ ...styles.btnNav, left: "1.2rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <IcoLeft />
              </button>
            )}

            {idx < galleryData.length - 1 && (
              <button
                style={{ ...styles.btnNav, right: "1.2rem" }}
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <IcoRight />
              </button>
            )}

            <div style={styles.counter}>
              {idx + 1} / {galleryData.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
