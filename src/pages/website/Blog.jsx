import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API, { itemPatha } from "../../libs/apiCall";
import Loading from "../../components/Loading";
import { toast } from "sonner";
import { dateStringConvert, getExcerpt } from "../../libs/library";
import BlogCard from "../../components/BlogCard";
import { Helmet } from "react-helmet-async";
import { structuredData } from "../../libs/static";

const StyleSheet = { create: (s) => s };

/* ── GLOBAL DARK THEME OVERRIDE ── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');
  body { background: #0B0F1A; }
`;



const T = {
  gold: "#D4AF37",
  goldDark: "#b8962d",
  goldLight: "rgba(212,175,55,0.08)",
  goldBorder: "rgba(212,175,55,0.2)",
  bg: "#0B0F1A",
  white: "#fff",
  text: "rgba(255,255,255,0.85)",
  textMid: "rgba(255,255,255,0.6)",
  textMuted: "rgba(255,255,255,0.4)",
  radius: { sm: 6, md: 10, lg: 14, xl: 20 },
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "#0B0F1A",
    minHeight: "100vh",
  },

  /* ── Hero ── */
  hero: {
    background:
      "linear-gradient(160deg, #1a1005 0%, #2e1f08 60%, #4a3010 100%)",
    padding: "4.5rem 2rem 4rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(212,175,55,0.15)",
    border: "1px solid rgba(212,175,55,0.3)",
    borderRadius: 100,
    padding: "5px 16px 5px 10px",
    marginBottom: "1.4rem",
  },
  heroBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: T.gold,
    display: "inline-block",
  },
  heroBadgeText: {
    fontSize: "0.7rem",
    color: T.gold,
    letterSpacing: "0.14em",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
    fontWeight: 700,
    color: T.white,
    lineHeight: 1.08,
    margin: "0 0 1rem",
    letterSpacing: "-0.02em",
  },
  heroAccent: { color: T.gold },
  heroSub: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.5)",
    maxWidth: 460,
    margin: "0 auto",
    lineHeight: 1.75,
  },

  /* ── Content wrapper ── */
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "3.5rem 2rem 5rem",
  },

  /* ── Section label ── */
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "1.6rem",
  },
  sectionLabelText: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    background: T.goldBorder,
  },

  /* ── Featured post ── */
  featuredWrap: { marginBottom: "3.5rem" },
  featuredCard: {
    background: "#121826",
    borderRadius: T.radius.xl,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1.15fr 1fr",
    boxShadow: "0 4px 32px rgba(160,110,30,0.1)",
    border: `1px solid ${T.goldBorder}`,
  },
  featuredImgWrap: {
    position: "relative",
    overflow: "hidden",
    minHeight: 380,
  },
  featuredImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
  },
  featuredBadgeWrap: {
    position: "absolute",
    top: 16,
    left: 16,
    display: "flex",
    gap: 8,
  },
  featuredPill: {
    background: T.gold,
    color: T.white,
    fontSize: "0.63rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 4,
  },
  featuredPillCategory: {
    background: "rgba(255,255,255,0.92)",
    color: T.goldDark,
    fontSize: "0.63rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 4,
  },
  featuredBody: {
    padding: "2.8rem 2.6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  featuredCategoryChip: {
    fontSize: "0.67rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  featuredTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(1.6rem, 2.5vw, 2.15rem)",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.15,
    margin: "0 0 0.9rem",
  },
  featuredExcerpt: {
    fontSize: "0.91rem",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.78,
    margin: "0 0 1.8rem",
  },
  featuredReadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: T.gold,
    color: T.white,
    borderRadius: T.radius.sm,
    padding: "9px 20px",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    border: "none",
    cursor: "pointer",
    alignSelf: "flex-start",
    marginBottom: "1.8rem",
    transition: "background 0.18s",
  },
  featuredMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "1.2rem",
    borderTop: `1px solid ${T.goldBorder}`,
  },
  featuredAuthorRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${T.goldBorder}`,
  },
  authorName: {
    fontSize: "0.83rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.82)",
  },
  authorDate: {
    fontSize: "0.74rem",
    color: "rgba(255,255,255,0.4)",
    marginTop: 1,
  },
  readTimeBadge: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.4)",
  },

  /* ── Blog grid ── */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  card: {
    background: "#121826",
    borderRadius: T.radius.lg,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    cursor: "pointer",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  cardImgWrap: {
    overflow: "hidden",
    height: 210,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.42s ease",
  },
  cardBody: {
    padding: "1.3rem 1.4rem 1.5rem",
  },
  cardCategoryPill: {
    display: "inline-block",
    fontSize: "0.61rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    background: "rgba(212,175,55,0.08)",
    borderRadius: 4,
    padding: "3px 8px",
    marginBottom: 8,
    border: `1px solid ${T.goldBorder}`,
  },
  cardTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.22rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.25,
    margin: "0 0 0.55rem",
  },
  cardExcerpt: {
    fontSize: "0.83rem",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.7,
    margin: "0 0 1.2rem",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "0.85rem",
    borderTop: `1px dashed ${T.goldBorder}`,
  },
  cardAuthorRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardAvatarSm: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    objectFit: "cover",
    border: `1.5px solid ${T.goldBorder}`,
  },
  cardAuthorName: {
    fontSize: "0.77rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.82)",
  },
  cardDate: {
    fontSize: "0.71rem",
    color: "rgba(255,255,255,0.4)",
  },
  cardReadTime: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.4)",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  /* ── Newsletter ── */
  newsletter: {
    background: "linear-gradient(135deg, #1a1005 0%, #3a2508 100%)",
    borderRadius: T.radius.xl,
    padding: "3rem",
    marginTop: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    border: "1px solid rgba(212,175,55,0.2)",
    position: "relative",
    overflow: "hidden",
  },
  newsletterGlow: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
    right: -60,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  newsletterLeft: { position: "relative" },
  newsletterEyebrow: {
    fontSize: "0.67rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  newsletterTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 0.5rem",
    lineHeight: 1.15,
  },
  newsletterSub: {
    fontSize: "0.86rem",
    color: "rgba(255,255,255,0.48)",
    lineHeight: 1.7,
  },
  newsletterForm: {
    display: "flex",
    gap: "0.7rem",
    flexShrink: 0,
    position: "relative",
  },
  newsletterInput: {
    padding: "0.75rem 1.1rem",
    background: "rgba(255,255,255,0.08)",
    border: "1.5px solid rgba(212,175,55,0.3)",
    borderRadius: T.radius.sm,
    color: T.white,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
    width: 260,
  },
  newsletterBtn: {
    padding: "0.75rem 1.5rem",
    background: T.gold,
    color: T.white,
    border: "none",
    borderRadius: T.radius.sm,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "0.82rem",
    letterSpacing: "0.06em",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.18s",
  },
  authorAvatarPlaceholder: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    fontSize: "0.875rem",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    flexShrink: 0,
    userSelect: "none",
  },
});

/* ── Icons ── */
const IcoArrow = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Featured card ── */
function FeaturedCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      style={styles.featuredCard}
      className="featured-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.featuredImgWrap} className="featured-img-wrap">
        <img
          src={`${itemPatha}${post.file}`}
          alt={post.title}
          style={{
            ...styles.featuredImg,
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
        />
        <div style={styles.featuredBadgeWrap}>
          <span style={styles.featuredPillCategory}>{post.categoryName}</span>
        </div>
      </div>
      <div style={styles.featuredBody}>
        <div style={styles.featuredCategoryChip}>{post.categoryName}</div>
        <h2 style={styles.featuredTitle}>{post.title}</h2>
        <p style={styles.featuredExcerpt}>{getExcerpt(post?.content, 120)}</p>
        <button
          style={styles.featuredReadBtn}
          onClick={() => navigate(`/blog/${post.pageUrl}  `)}
        >
          Read Article <IcoArrow />
        </button>
        <div style={styles.featuredMeta}>
          <div style={styles.featuredAuthorRow}>
            {post?.authorId.avatar ? (
              <img
                src={post?.authorId.avatar}
                alt={post.authorId?.name}
                style={styles.authorAvatar}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div style={styles.authorAvatarPlaceholder}>
                {post.authorId?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div>
              <div style={styles.authorName}>
                {post.authorId?.name?.toUpperCase()}
              </div>
              <div style={styles.authorDate}>
                {dateStringConvert(post.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [pageLoading, setPageLoading] = useState(false);
  const [blogData, setBlogData] = useState([]);

  const location = useLocation();

  const fetchTopPosts = async () => {
    try {
      setPageLoading(true);
      const { data: res } = await API.get("/post/getActivePosts");
      setBlogData(res.data.reverse());
    } catch (error) {
      console.error(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPosts();
  }, []);

  if (pageLoading) return <Loading />;

  const featured = blogData[0];
  const rest = blogData.slice(1);

  const firstThree = location.pathname === "/" ? rest?.slice(0, 3) : rest;

  return (
    <>
      <Helmet>
        <title>
          Blog – Ideas, Trends & Digital Insights | Technosaga Infotech
        </title>
        <meta
          name="description"
          content="Dive into our blog for fresh ideas, industry trends, and practical tips in web design, app development, and digital marketing"
        />
        <link rel="canonical" href="https://technosagainfotech.in/blogs" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div style={{...styles.page, background:"#0B0F1A", fontFamily:"'Poppins', sans-serif", paddingTop: 72}}>
        <style>{`
      .hero-inner { margin-top: 90px; }
        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-img-wrap { min-height: 260px !important; }
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .newsletter-wrap { flex-direction: column !important; }
          .newsletter-form { flex-direction: column !important; width: 100% !important; }
          .newsletter-input { width: 100% !important; box-sizing: border-box !important; }
        }
        @media (max-width: 580px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .hero-inner { padding: 2.5rem 1.2rem 2rem !important; }
          .content { padding: 2rem 1.2rem 3rem !important; }
        }
      `}</style>

        {/* HERO */}
        <div style={styles.hero} className="hero-inner">
          <div style={styles.heroGlow} />
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            <span style={styles.heroBadgeText}>Blogs</span>
          </div>
          <h1 style={styles.heroTitle}>
            Stories, Ideas & <span style={styles.heroAccent}>Perspectives</span>
          </h1>
        </div>

        {/* CONTENT */}
        <div style={styles.content} className="content">
          {/* Featured */}
          {featured && (
            <div style={styles.featuredWrap}>
              <div style={styles.sectionLabel}>
                <span style={styles.sectionLabelText}>Featured</span>
                <div style={styles.sectionLabelLine} />
              </div>
              <FeaturedCard post={featured} />
            </div>
          )}

          {/* All posts grid */}
          <div style={styles.sectionLabel}>
            <span style={styles.sectionLabelText}>Latest Articles</span>
            <div style={styles.sectionLabelLine} />
          </div>
          <div style={styles.grid} className="blog-grid">
            {firstThree.map((post) => (
              <BlogCard key={post._id} post={post} styles={styles} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
