import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import API from "../../libs/apiCall";
import { Helmet } from "react-helmet-async";

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
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: T.bg,
    minHeight: "100vh",
  },

  /* ── Hero ── */
  hero: {
    background:
      "linear-gradient(160deg, #1a1005 0%, #2e1f08 55%, #4a3010 100%)",
    padding: "5rem 2rem 4rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    marginTop: 90,
  },
  heroGlow: {
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
  },
  heroCircle1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.08)",
    top: -150,
    right: -100,
    pointerEvents: "none",
  },
  heroCircle2: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.06)",
    bottom: -80,
    left: -60,
    pointerEvents: "none",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(207,150,69,0.15)",
    border: "1px solid rgba(207,150,69,0.3)",
    borderRadius: 100,
    padding: "5px 16px 5px 10px",
    marginBottom: "1.4rem",
    position: "relative",
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
    fontWeight: 700,
    color: T.white,
    lineHeight: 1.08,
    margin: "0 0 1rem",
    letterSpacing: "-0.02em",
    position: "relative",
  },
  heroAccent: { color: T.gold },
  heroSub: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.5)",
    maxWidth: 480,
    margin: "0 auto 3rem",
    lineHeight: 1.75,
    position: "relative",
  },

  /* Stats row */
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "3rem",
    flexWrap: "wrap",
    position: "relative",
    borderTop: "1px solid rgba(207,150,69,0.15)",
    paddingTop: "2.5rem",
  },
  statItem: { textAlign: "center" },
  statNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.4rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: 4,
  },

  /* ── Content ── */
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "4rem 2rem 5rem",
  },

  /* Section label */
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "2rem",
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

  /* ── Leadership cards ── */
  leadersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.6rem",
    marginBottom: "4rem",
  },
  leaderCard: {
    background: T.white,
    borderRadius: T.radius.xl,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 4px 24px rgba(160,110,30,0.09)",
    transition: "transform 0.24s, box-shadow 0.24s",
    cursor: "default",
  },
  leaderImgWrap: {
    position: "relative",
    height: 280,
    overflow: "hidden",
    background: "#e8e0d4",
  },
  leaderImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
  },
  leaderImgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,6,0,0.55) 0%, transparent 55%)",
    transition: "opacity 0.3s",
  },
  leaderDeptBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    background: T.gold,
    color: T.white,
    fontSize: "0.61rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 4,
  },
  leaderBody: {
    padding: "1.6rem 1.8rem 1.8rem",
  },
  leaderName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 3px",
    lineHeight: 1.2,
  },
  leaderRole: {
    fontSize: "0.8rem",
    color: T.gold,
    fontWeight: 600,
    letterSpacing: "0.05em",
    marginBottom: "0.9rem",
  },
  leaderBio: {
    fontSize: "0.84rem",
    color: T.textMuted,
    lineHeight: 1.75,
    margin: "0 0 1.3rem",
  },
  leaderDivider: {
    height: 1,
    background: T.goldBorder,
    marginBottom: "1.2rem",
  },
  socialRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  socialBtn: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: `1.5px solid ${T.goldBorder}`,
    background: T.goldLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.18s, border-color 0.18s",
    textDecoration: "none",
  },
  emailBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    marginLeft: "auto",
    fontSize: "0.74rem",
    color: T.goldDark,
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: `1px solid ${T.goldBorder}`,
    paddingBottom: 1,
  },

  /* ── Team grid ── */
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.2rem",
  },
  teamCard: {
    background: T.white,
    borderRadius: T.radius.lg,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.07)",
    transition: "transform 0.22s, box-shadow 0.22s",
    cursor: "default",
  },
  teamImgWrap: {
    height: 200,
    overflow: "hidden",
    background: "#e8e0d4",
    position: "relative",
  },
  teamImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.42s ease",
  },
  teamDeptTag: {
    position: "absolute",
    top: 10,
    left: 10,
    background: "rgba(255,255,255,0.9)",
    color: T.goldDark,
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "3px 8px",
    borderRadius: 4,
    border: `1px solid ${T.goldBorder}`,
  },
  teamBody: {
    padding: "1rem 1.1rem 1.2rem",
  },
  teamName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 2px",
  },
  teamRole: {
    fontSize: "0.76rem",
    color: T.textMuted,
    marginBottom: "0.9rem",
  },
  teamSocialRow: {
    display: "flex",
    gap: 6,
    alignItems: "center",
    paddingTop: "0.7rem",
    borderTop: `1px dashed ${T.goldBorder}`,
  },
  teamSocialBtn: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: `1px solid ${T.goldBorder}`,
    background: T.goldLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textDecoration: "none",
  },

  /* ── Join us CTA ── */
  joinCta: {
    background: "linear-gradient(135deg, #1a1005 0%, #3a2508 100%)",
    borderRadius: T.radius.xl,
    padding: "4rem 3rem",
    marginTop: "4rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(207,150,69,0.18)",
  },
  joinGlow: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(207,150,69,0.09) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  joinEyebrow: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 10,
    position: "relative",
  },
  joinTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 0.8rem",
    lineHeight: 1.12,
    position: "relative",
  },
  joinSub: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.48)",
    maxWidth: 420,
    margin: "0 auto 2rem",
    lineHeight: 1.75,
    position: "relative",
  },
  joinBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: T.gold,
    color: T.white,
    borderRadius: T.radius.sm,
    padding: "12px 28px",
    fontSize: "0.84rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    border: "none",
    cursor: "pointer",
    position: "relative",
    transition: "background 0.18s",
  },
  joinBtnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    borderRadius: T.radius.sm,
    padding: "12px 28px",
    fontSize: "0.84rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    border: "1px solid rgba(255,255,255,0.18)",
    cursor: "pointer",
    position: "relative",
    marginLeft: 12,
    transition: "border-color 0.18s, color 0.18s",
  },
});

/* ── Team card ── */
function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.teamCard,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 10px 28px rgba(160,110,30,0.14)"
          : "0 2px 14px rgba(160,110,30,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.teamImgWrap}>
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          style={{
            ...styles.teamImg,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>
      <div style={styles.teamBody}>
        <h4 style={styles.teamName}>{member.name}</h4>
        <div style={styles.teamRole}>{member.designation}</div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function Team() {
  const [memberData, setMemberData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const getMembers = async () => {
    try {
      const { data: res } = await API.get("/member/memberList");
      setMemberData(res.data.reverse());
      console.log(res.data);
    } catch (error) {
      console.error(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    getMembers();
  }, []);

  if (pageLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Contact Us | Technosaga Infotech</title>
        <link rel="canonical" href="https://technosagainfotech.in/contact" />
      </Helmet>
      <div style={styles.page}>
        <style>{`
        @media (max-width: 960px) {
          .leaders-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .leaders-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-pad { padding: 3rem 1.2rem 2.5rem !important; }
          .content-pad { padding: 2.5rem 1.2rem 4rem !important; }
          .stats-row { gap: 1.5rem !important; }
          .join-cta { padding: 2.5rem 1.5rem !important; }
          .join-btns { display: flex; flex-direction: column; align-items: center; gap: 10px; }
          .join-btns button { margin-left: 0 !important; }
        }
        @media (max-width: 420px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

        <div style={styles.hero} className="hero-pad">
          <div style={styles.heroGlow} />
          <div style={styles.heroCircle1} />
          <div style={styles.heroCircle2} />
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            <span style={styles.heroBadgeText}>Meet the Team</span>
          </div>
          <h1 style={styles.heroTitle}>
            The People Behind
            <br />
            <span style={styles.heroAccent}>Every Great Idea</span>
          </h1>
        </div>

        <div style={styles.content} className="content-pad">
          <div style={styles.sectionLabel}>
            <span style={styles.sectionLabelText}>Our Team Mmebers</span>
            <div style={styles.sectionLabelLine} />
          </div>
          <div style={styles.teamGrid} className="team-grid">
            {memberData.map((m) => (
              <TeamCard key={m._id} member={m} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
