import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { itemPatha } from "../libs/apiCall";
import { dateStringConvert, getExcerpt } from "../libs/library";
const StyleSheet = { create: (s) => s };
const T = {
  gold: "#CF9645",
  goldDark: "#b8762a",
  goldLight: "#fdf6e9",
  goldBorder: "rgba(207,150,69,0.22)",
  bg: "#f8f4ef",
  white: "#ffffff",
  text: "#1a1208",
  textMid: "#5a4020",
  textMuted: "#9e8c6e",
  radius: { sm: 6, md: 10, lg: 14, xl: 20 },
};
const styles = StyleSheet.create({
  /* ── Blog grid ── */
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  card: {
    background: T.white,
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
    background: T.goldLight,
    borderRadius: 4,
    padding: "3px 8px",
    marginBottom: 8,
    border: `1px solid ${T.goldBorder}`,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.22rem",
    fontWeight: 700,
    color: T.text,
    lineHeight: 1.25,
    margin: "0 0 0.55rem",
  },
  cardExcerpt: {
    fontSize: "0.83rem",
    color: T.textMuted,
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
    color: T.text,
  },
  cardDate: {
    fontSize: "0.71rem",
    color: T.textMuted,
  },
  cardReadTime: {
    fontSize: "0.72rem",
    color: T.textMuted,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
});

export default function BlogCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${post.pageUrl}  `)}
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 12px 32px rgba(160,110,30,0.15)"
          : "0 2px 14px rgba(160,110,30,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.cardImgWrap}>
        <img
          src={`${itemPatha}${post.file}`}
          alt={post.title}
          loading="lazy"
          style={{
            ...styles.cardImg,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>
      <div style={styles.cardBody}>
        <span style={styles.cardCategoryPill}>{post.categoryName}</span>
        <h3 style={styles.cardTitle}>{post.title}</h3>
        <p style={styles.cardExcerpt}>{getExcerpt(post?.content, 80)}</p>
        <div style={styles.cardFooter}>
          <div style={styles.cardAuthorRow}>
            {post?.authorId.avatar ? (
              <img
                src={post?.authorId.avatar}
                alt={post.authorId?.name}
                style={styles.cardAvatarSm}
              />
            ) : (
              <div style={styles.authorAvatarPlaceholder}>
                {post.authorId?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div>
              <div style={styles.cardAuthorName}>
                {post?.authorId.name.toUpperCase()}
              </div>
              <div style={styles.cardDate}>
                {dateStringConvert(post?.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
