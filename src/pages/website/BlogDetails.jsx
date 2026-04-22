import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import API, { itemPatha } from "../../libs/apiCall";
import { useParams } from "react-router-dom";
import { dateStringConvert } from "../../libs/library";
import BlogCard from "../../components/BlogCard";
import { structuredData } from "../../libs/static";
import { Helmet } from "react-helmet-async";

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
  /* ── Hero ── */
  heroWrap: {
    position: "relative",
    background: "#0e0a04",
    overflow: "hidden",
  },
  heroImg: {
    width: "100%",
    height: 520,
    objectFit: "cover",
    display: "block",
    opacity: 0.45,
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(10,6,0,0.3) 0%, rgba(10,6,0,0.85) 100%)",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0 0 3.5rem",
  },
  heroInner: {
    maxWidth: 820,
    margin: "0 auto",
    padding: "0 2rem",
  },
  heroBreadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: "1.2rem",
    fontSize: "0.74rem",
  },
  breadcrumbLink: {
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    cursor: "pointer",
  },
  breadcrumbSep: {
    color: "rgba(255,255,255,0.3)",
  },
  breadcrumbCurrent: {
    color: T.gold,
    fontWeight: 600,
  },
  heroCategoryPill: {
    display: "inline-block",
    background: T.gold,
    color: T.white,
    fontSize: "0.63rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 4,
    marginBottom: "1rem",
  },
  heroTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(1.9rem, 4vw, 3rem)",
    fontWeight: 700,
    color: T.white,
    lineHeight: 1.1,
    margin: "0 0 0.9rem",
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.7,
    marginBottom: "1.6rem",
    maxWidth: 620,
  },
  heroMeta: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
    flexWrap: "wrap",
  },
  heroAuthorRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  heroAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${T.gold}`,
  },
  heroAuthorName: {
    fontSize: "0.86rem",
    fontWeight: 600,
    color: T.white,
  },
  heroAuthorRole: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.5)",
    marginTop: 1,
  },
  heroDividerDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
  },
  heroMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.5)",
  },

  /* ── Layout ── */
  layout: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "4rem 2rem 5rem",
    display: "flex",
    flexDirection: "row",
    gap: "4rem",
    alignItems: "start",
  },

  /* ── Article ── */
  article: {},
  articleBody: {
    background: "#121826",
    borderRadius: T.radius.xl,
    padding: "3rem 3.5rem",
    boxShadow: "0 4px 24px rgba(160,110,30,0.08)",
    border: `1px solid ${T.goldBorder}`,
    marginBottom: "2rem",
  },

  /* Content blocks */
  contentP: {
    fontSize: "1rem",
    color: "#2a1f0e",
    lineHeight: 1.85,
    margin: "0 0 1.4rem",
    fontWeight: 400,
  },
  contentH2: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.7rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    margin: "2.2rem 0 0.9rem",
    lineHeight: 1.2,
    paddingBottom: "0.5rem",
    borderBottom: `2px solid ${T.goldBorder}`,
  },
  contentQuote: {
    margin: "2rem 0",
    padding: "1.4rem 2rem",
    borderLeft: `4px solid ${T.gold}`,
    background: "rgba(212,175,55,0.08)",
    borderRadius: `0 ${T.radius.md}px ${T.radius.md}px 0`,
  },
  contentQuoteText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.3rem",
    fontStyle: "italic",
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.5,
    marginBottom: 8,
  },
  contentQuoteAuthor: {
    fontSize: "0.78rem",
    color: T.gold,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  contentImgWrap: {
    margin: "2rem 0",
    borderRadius: T.radius.lg,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
  },
  contentImg: {
    width: "100%",
    display: "block",
    objectFit: "cover",
  },
  contentImgCaption: {
    padding: "0.7rem 1rem",
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.4)",
    background: "rgba(212,175,55,0.08)",
    textAlign: "center",
    fontStyle: "italic",
  },

  /* Tags */
  tagsWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    paddingTop: "1.5rem",
    borderTop: `1px dashed ${T.goldBorder}`,
    marginTop: "1rem",
  },
  tagsLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  tag: {
    display: "inline-block",
    background: "rgba(212,175,55,0.08)",
    border: `1px solid ${T.goldBorder}`,
    color: T.goldDark,
    fontSize: "0.73rem",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 100,
    cursor: "pointer",
  },

  /* Share */
  shareBar: {
    background: "#121826",
    borderRadius: T.radius.lg,
    padding: "1.2rem 1.8rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 12px rgba(160,110,30,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem",
  },
  shareLabel: {
    fontSize: "0.78rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  shareBtns: { display: "flex", gap: 8 },
  shareBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: T.radius.sm,
    border: `1.5px solid ${T.goldBorder}`,
    background: "rgba(212,175,55,0.08)",
    color: T.goldDark,
    fontSize: "0.76rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.18s",
    textDecoration: "none",
  },

  /* Author bio */
  authorCard: {
    background: "#121826",
    borderRadius: T.radius.xl,
    padding: "2rem 2.2rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 4px 24px rgba(160,110,30,0.08)",
    display: "flex",
    gap: "1.2rem",
    alignItems: "flex-start",
  },
  authorAvatar: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
    border: `3px solid ${T.goldBorder}`,
  },
  authorInfo: {},
  authorLabel: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  authorName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    marginBottom: 2,
  },
  authorRole: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "0.7rem",
  },
  authorBio: {
    fontSize: "0.84rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.7,
  },

  /* ── Sidebar ── */
  sidebar: {},
  sideWidget: {
    background: "#121826",
    borderRadius: T.radius.lg,
    padding: "1.5rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.07)",
    marginBottom: "1.4rem",
  },
  sideWidgetTitle: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: "1.1rem",
    paddingBottom: "0.7rem",
    borderBottom: `1px solid ${T.goldBorder}`,
  },

  /* TOC */
  tocItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: "7px 0",
    borderBottom: `1px dashed ${T.goldBorder}`,
    cursor: "pointer",
  },
  tocDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: T.gold,
    flexShrink: 0,
    marginTop: 6,
  },
  tocText: {
    fontSize: "0.83rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.4,
    fontWeight: 500,
    transition: "color 0.18s",
  },

  /* Related posts */
  relatedCard: {
    display: "flex",
    gap: 10,
    padding: "0.8rem 0",
    borderBottom: `1px dashed ${T.goldBorder}`,
    cursor: "pointer",
  },
  relatedImg: {
    width: 64,
    height: 56,
    borderRadius: T.radius.sm,
    objectFit: "cover",
    flexShrink: 0,
  },
  relatedMeta: {},
  relatedCategory: {
    fontSize: "0.6rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  relatedTitle: {
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.35,
    marginBottom: 3,
  },
  relatedDate: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.4)",
  },

  /* Newsletter widget */
  newsInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0.7rem 0.9rem",
    background: "#0B0F1A",
    border: `1.5px solid ${T.goldBorder}`,
    borderRadius: T.radius.sm,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.84rem",
    color: "rgba(255,255,255,0.82)",
    outline: "none",
    marginBottom: 8,
  },
  newsBtn: {
    width: "100%",
    padding: "0.72rem",
    background: T.gold,
    color: T.white,
    border: "none",
    borderRadius: T.radius.sm,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "0.8rem",
    letterSpacing: "0.06em",
    cursor: "pointer",
    transition: "background 0.18s",
  },
  newsNote: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginTop: 8,
  },

  /* ── Related posts section ── */
  relatedSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem 5rem",
  },
  relatedSectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "1.8rem",
  },
  relatedLabelText: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  relatedLabelLine: { flex: 1, height: 1, background: T.goldBorder },
  relatedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  relatedFullCard: {
    background: "#121826",
    borderRadius: T.radius.lg,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.07)",
    cursor: "pointer",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  relatedFullImgWrap: { overflow: "hidden", height: 200 },
  relatedFullImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.42s ease",
  },
  relatedFullBody: { padding: "1.2rem 1.4rem 1.4rem" },
  relatedFullCat: {
    display: "inline-block",
    fontSize: "0.61rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    background: "rgba(212,175,55,0.08)",
    borderRadius: 4,
    padding: "3px 8px",
    border: `1px solid ${T.goldBorder}`,
    marginBottom: 8,
  },
  relatedFullTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 1.25,
    margin: "0 0 0.6rem",
  },
  relatedFullFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "0.8rem",
    borderTop: `1px dashed ${T.goldBorder}`,
  },
  relatedFullAuthorRow: { display: "flex", alignItems: "center", gap: 7 },
  relatedAvatarSm: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    objectFit: "cover",
    border: `1.5px solid ${T.goldBorder}`,
  },
  relatedAuthorName: { fontSize: "0.76rem", fontWeight: 600, color: T.text },
  relatedDate: { fontSize: "0.71rem", color: T.textMuted },
  relatedReadTime: {
    fontSize: "0.71rem",
    color: "rgba(255,255,255,0.4)",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
});

const IcoCalendar = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.5)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ── Main ── */
export default function BlogDetails() {
  const [posts, setPosts] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [pageLaoding, setPageLaoding] = useState(false);

  const { slug } = useParams();

  const fetchPostDetails = async () => {
    setPageLaoding(true);
    try {
      const { data: res } = await API.get(`/post/getPostByPageUrl/${slug}`);
      setPosts(res?.data);
      setRelatedPosts(res?.related || []);
    } catch (error) {
      console.error(error?.response?.data?.message);
    } finally {
      setPageLaoding(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [slug]);

  if (pageLaoding) return <Loading />;

  return (
    <>
      <Helmet>
        <title>
          {posts?.title
            ? `${posts.title} | Technosaga Infotech`
            : "Blog | Technosaga Infotech"}
        </title>
        <meta
          name="description"
          content="Read in-depth insights on web development, digital marketing, design, and business strategies. Discover practical tips and expert knowledge in this blog."
        />
        <link
          rel="canonical"
          href={`https://technosagainfotech.in/blog/${slug}`}
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div style={{...styles.page, background:"#0B0F1A", fontFamily:"'Poppins', sans-serif", paddingTop: 72}}>
        <style>{`
        @media (max-width: 960px) {
          .blog-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .sidebar { display: none !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .hero-img { height: 320px !important; }
          .article-body { padding: 2rem 1.5rem !important; }
          .related-grid { grid-template-columns: 1fr !important; }
          .blog-layout-wrap { padding: 2.5rem 1.2rem 4rem !important; }
          .related-section { padding: 0 1.2rem 4rem !important; }
          .share-bar { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

        {/* ── HERO ── */}
        <div style={styles.heroWrap}>
          <img
            src={
              posts.file
                ? `${itemPatha}${posts.file}`
                : "https://picsum.photos/seed/blog1/1200/800"
            }
            alt={posts.title}
            style={styles.heroImg}
            className="hero-img"
            loading="lazy"
            decoding="async"
          />
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <div style={styles.heroInner}>
              <div style={styles.heroBreadcrumb}>
                <a style={styles.breadcrumbLink}>Home</a>
                <span style={styles.breadcrumbSep}>›</span>
                <a style={styles.breadcrumbLink}>Blog</a>
                <span style={styles.breadcrumbSep}>›</span>
                <span style={styles.breadcrumbCurrent}>
                  {posts.categoryName}
                </span>
              </div>

              <span style={styles.heroCategoryPill}>{posts.categoryName}</span>
              <h1 style={styles.heroTitle}>{posts.title}</h1>
              <p style={styles.heroSubtitle}>{posts.subtitle}</p>

              <div style={styles.heroMeta}>
                <div style={styles.heroAuthorRow}>
                  {posts?.authorId?.avatar ? (
                    <img
                      src={posts?.authorId?.avatar}
                      alt={posts?.authorId?.name}
                      style={styles.cardAvatarSm}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div style={styles.authorAvatarPlaceholder}>
                      {posts?.authorId?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={styles.heroAuthorName}>
                      {posts?.authorId?.name}
                    </div>
                  </div>
                </div>
                <div style={styles.heroDividerDot} />
                <div style={styles.heroMetaItem}>
                  <IcoCalendar /> {dateStringConvert(posts.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── LAYOUT ── */}
        <div style={styles.layout} className="blog-layout blog-layout-wrap">
          <div style={styles.article}>
            <div style={styles.articleBody} className="article-body">
              <div className="blog-section">
                <div className="blog-details">
                  <p className="post-date">
                    <span className="category-box">{posts?.categoryName}</span>
                    <span>{dateStringConvert(posts.createdAt)}</span>
                  </p>
                  <h1>{posts?.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: posts?.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED POSTS (full width) ── */}
        <div style={styles.relatedSection} className="related-section">
          <div style={styles.relatedSectionLabel}>
            <span style={styles.relatedLabelText}>You Might Also Like</span>
            <div style={styles.relatedLabelLine} />
          </div>
          <div style={styles.relatedGrid} className="related-grid">
            {relatedPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
