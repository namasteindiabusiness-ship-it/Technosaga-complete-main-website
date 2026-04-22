import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { structuredData } from "../../libs/static";

const StyleSheet = { create: (s) => s };

const T = {
  gold: "#CF9645",
  goldDark: "#b8762a",
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

const SERVICES = [
  {
    id: 1,
    title: "Web Design & Development",
    icon: "🌐",
    desc: "Crafting high-performance websites and web apps that are beautiful, fast, and built for results.",
    link: "/services/web-design-development",
  },
  {
    id: 2,
    title: "Digital Marketing",
    icon: "📣",
    desc: "Data-driven campaigns across SEO, social, PPC, and content to grow your brand and drive conversions.",
    link: "/services/digital-marketing",
  },
  {
    id: 3,
    title: "BPO & Call Center Services",
    icon: "🎧",
    desc: "24/7 inbound and outbound support, back-office processing, and customer engagement at scale.",
    link: "/services/bpo-services",
  },
  {
    id: 4,
    title: "App Development",
    icon: "📱",
    desc: "Native and cross-platform mobile applications engineered for performance and delightful user experience.",
    link: "/services/app-development",
  },
  {
    id: 5,
    title: "Graphic Design",
    icon: "🎨",
    desc: "Brand identities, print collateral, UI kits, and visual communication that leaves a lasting impression.",
    link: "/services/graphic-design",
  },
  {
    id: 6,
    title: "Photo & Video Production",
    icon: "🎬",
    desc: "Professional photography, videography, and post-production that tells your story with cinematic quality.",
    link: "/services/photo-video-production",
  },
  {
    id: 7,
    title: "Job Consultancy",
    icon: "💼",
    desc: "Connecting top talent with the right opportunities — career guidance, recruitment, and HR advisory.",
    link: "/services/job-consultancy",
  },
  {
    id: 8,
    title: "Event Management",
    icon: "🎪",
    desc: "End-to-end event planning and execution: corporate, social, cultural, and large-scale public events.",
    link: "/services/event-management",
  },
  {
    id: 9,
    title: "Live Streaming",
    icon: "📡",
    desc: "Multi-platform live broadcasts with professional-grade equipment, direction, and real-time production.",
    link: "/services/live-streaming",
  },
  {
    id: 10,
    title: "Political Rallies & Events",
    icon: "🏛️",
    desc: "Strategic planning and flawless execution of political rallies, campaigns, and public mobilisation events.",
    link: "/services/political-rallies-events",
  },
];

const VALUES = [
  {
    title: "Excellence",
    desc: "We hold ourselves to the highest standards in every project, big or small.",
  },
  {
    title: "Integrity",
    desc: "Transparent communication and honest partnerships form the foundation of everything we do.",
  },
  {
    title: "Innovation",
    desc: "We stay ahead of the curve, embracing new technologies and fresh thinking.",
  },
  {
    title: "Impact",
    desc: "We measure success not just in deliverables, but in the real-world difference we make.",
  },
];

const MILESTONES = [
  {
    year: "2020",
    title: "Founded",
    desc: "Started as a two-person web design studio with a vision to build something greater.",
  },
  {
    year: "2021",
    title: "Digital Growth",
    desc: "Expanded into digital marketing and BPO, tripling our team and client base.",
  },
  {
    year: "2023",
    title: "Full Service",
    desc: "Launched app development, video production, and event management divisions.",
  },
  {
    year: "2024",
    title: "National Scale",
    desc: "Delivered 300+ projects nationally, including major political and corporate events.",
  },
  {
    year: "2026",
    title: "Innovation Hub",
    desc: "Opened a dedicated live streaming and media production studio.",
  },
];

const styles = StyleSheet.create({
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: T.bg,
    minHeight: "100vh",
  },

  /* ── HERO ── */
  hero: {
    background: `linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 55%, ${T.darkSoft} 100%)`,
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
      "radial-gradient(circle, rgba(207,150,69,0.07) 0%, transparent 65%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  heroRing1: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.06)",
    top: -200,
    right: -120,
    pointerEvents: "none",
    zIndex: 1,
  },
  heroRing2: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.06)",
    bottom: -100,
    left: -60,
    pointerEvents: "none",
    zIndex: 1,
  },
  heroInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "4.5rem 2.5rem",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: "4rem",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  heroLeft: {},
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "rgba(207,150,69,0.13)",
    border: "1px solid rgba(207,150,69,0.28)",
    borderRadius: 100,
    padding: "5px 14px 5px 9px",
    marginBottom: "1.4rem",
  },
  heroBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: T.gold,
    display: "inline-block",
    flexShrink: 0,
  },
  heroBadgeText: {
    fontSize: "0.65rem",
    color: T.gold,
    letterSpacing: "0.15em",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
    fontWeight: 700,
    color: T.white,
    lineHeight: 1.03,
    margin: "0 0 1.1rem",
    letterSpacing: "-0.025em",
  },
  heroAccent: { color: T.gold },
  heroDivider: {
    width: 40,
    height: 2,
    background: "rgba(207,150,69,0.5)",
    borderRadius: 2,
    margin: "0.9rem 0",
  },
  heroBody: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.48)",
    lineHeight: 1.85,
    margin: "0 0 2rem",
    maxWidth: 420,
  },
  heroCTARow: { display: "flex", gap: 10, flexWrap: "wrap" },
  heroCtaPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: T.gold,
    color: T.white,
    borderRadius: T.radius.sm,
    padding: "11px 22px",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    border: "none",
    cursor: "pointer",
    transition: "background 0.18s",
  },
  heroCtaOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    background: "transparent",
    color: "rgba(255,255,255,0.65)",
    borderRadius: T.radius.sm,
    padding: "11px 22px",
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    border: "1px solid rgba(255,255,255,0.16)",
    cursor: "pointer",
    transition: "border-color 0.18s",
  },

  /* ── HERO PHOTO SIDE ── */
  heroPhotoSide: {
    position: "relative",
  },
  heroFloatTag: {
    position: "absolute",
    top: 22,
    right: -10,
    background: T.gold,
    color: T.white,
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    padding: "5px 14px",
    borderRadius: 100,
    textTransform: "uppercase",
    boxShadow: "0 4px 14px rgba(207,150,69,0.35)",
    zIndex: 3,
  },
  heroPhotoFrame: {
    borderRadius: T.radius.xl,
    overflow: "hidden",
    position: "relative",
    border: `1px solid ${T.goldBorder}`,
  },
  heroPhotoImg: {
    width: "100%",
    height: 420,
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.88)",
  },
  heroPhotoOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(160deg, rgba(14,10,4,0.1) 0%, rgba(14,10,4,0.5) 100%)",
  },
  heroPhotoBadge: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    background: "rgba(14,10,4,0.72)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(207,150,69,0.25)",
    borderRadius: T.radius.lg,
    padding: "1rem 1.2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: "0.8rem",
  },
  heroPhotoBadgeDividerH: {
    gridColumn: "1 / -1",
    height: 1,
    background: "rgba(207,150,69,0.18)",
  },
  heroPhotoBadgeDividerV: {
    width: 1,
    background: "rgba(207,150,69,0.18)",
  },
  heroPhotoBadgeStat: { textAlign: "center" },
  heroPhotoBadgeNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.8rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  heroPhotoBadgeLabel: {
    fontSize: "0.62rem",
    color: "rgba(255,255,255,0.38)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: 3,
  },

  /* ── HERO SERVICES STRIP ── */
  heroStrip: {
    borderTop: "1px solid rgba(207,150,69,0.12)",
    padding: "1.1rem 2.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1.4rem",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  heroStripLabel: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "rgba(207,150,69,0.6)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    flexShrink: 0,
  },
  heroStripDot: {
    width: 3,
    height: 3,
    borderRadius: "50%",
    background: "rgba(207,150,69,0.4)",
    flexShrink: 0,
    display: "inline-block",
  },
  heroStripPill: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.35)",
    whiteSpace: "nowrap",
  },

  /* ── Section wrapper ── */
  section: { maxWidth: 1200, margin: "0 auto", padding: "5rem 0" },
  sectionSm: { maxWidth: 1200, margin: "0 auto", padding: "0 0 5rem" },

  /* Section header */
  sectionHeader: { textAlign: "center", marginBottom: "3.5rem" },
  sectionEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  sectionEyebrowLine: {
    width: 24,
    height: 2,
    background: T.gold,
    borderRadius: 2,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.8rem",
    lineHeight: 1.12,
  },
  sectionTitleAccent: { color: T.gold },
  sectionSubtitle: {
    fontSize: "0.93rem",
    color: T.textMuted,
    maxWidth: 560,
    margin: "0 auto",
    lineHeight: 1.75,
  },

  /* ── STORY ── */
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "center",
  },
  storyImgWrap: {
    position: "relative",
    borderRadius: T.radius.xl,
    overflow: "hidden",
  },
  storyImg: {
    width: "100%",
    height: 480,
    objectFit: "cover",
    display: "block",
  },
  storyImgBadge: {
    position: "absolute",
    bottom: 24,
    left: 24,
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1rem 1.3rem",
    boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
    border: `1.5px solid ${T.goldBorder}`,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  storyBadgeNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  storyBadgeLabel: {
    fontSize: "0.78rem",
    color: T.textMid,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  storyBody: {},
  storyP: {
    fontSize: "0.95rem",
    color: T.textMid,
    lineHeight: 1.85,
    margin: "0 0 1.2rem",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "1.8rem",
  },
  valueItem: {
    background: T.goldLight,
    borderRadius: T.radius.md,
    padding: "1rem 1.1rem",
    border: `1px solid ${T.goldBorder}`,
  },
  valueTitle: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: T.gold,
    marginBottom: 4,
    letterSpacing: "0.05em",
  },
  valueDesc: { fontSize: "0.8rem", color: T.textMuted, lineHeight: 1.6 },

  /* ── SERVICES ── */
  servicesBg: {
    background: `linear-gradient(180deg, ${T.bg} 0%, #f0e8dc 100%)`,
    padding: "5rem 20px",
  },
  servicesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1rem",
  },
  serviceCard: {
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1.5rem 1.2rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.07)",
    transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
    cursor: "pointer",
    textAlign: "center",
  },
  serviceIcon: { fontSize: "1.8rem", marginBottom: "0.8rem", display: "block" },
  serviceTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.5rem",
    lineHeight: 1.25,
  },
  serviceDesc: { fontSize: "0.78rem", color: T.textMuted, lineHeight: 1.65 },
  serviceHoverLine: {
    width: 28,
    height: 2,
    background: T.gold,
    borderRadius: 2,
    margin: "0.7rem auto 0",
    transition: "width 0.3s",
  },

  /* ── MISSION VISION ── */
  mvBg: {
    background: `linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 60%, ${T.darkSoft} 100%)`,
    padding: "5rem 0",
    position: "relative",
    overflow: "hidden",
  },
  mvGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(207,150,69,0.08) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  mvGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    position: "relative",
  },
  mvCard: {
    borderRadius: T.radius.xl,
    padding: "2.5rem 2.2rem",
    border: "1px solid rgba(207,150,69,0.2)",
    position: "relative",
    overflow: "hidden",
  },
  mvCardMission: { background: "rgba(207,150,69,0.12)" },
  mvCardVision: { background: "rgba(255,255,255,0.05)" },
  mvCardFuture: { background: "rgba(207,150,69,0.07)" },
  mvIconWrap: {
    width: 52,
    height: 52,
    borderRadius: T.radius.md,
    background: "rgba(207,150,69,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.3rem",
    fontSize: "1.3rem",
  },
  mvEyebrow: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  mvTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.6rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 0.8rem",
    lineHeight: 1.15,
  },
  mvBody: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.8,
  },
  mvCardAccent: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "rgba(207,150,69,0.08)",
    transform: "translate(30px, 30px)",
  },

  /* ── TIMELINE ── */
  timelineWrap: {
    position: "relative",
    maxWidth: 800,
    margin: "0 auto",
    padding: "0 2rem",
  },
  timelineLine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    background: T.goldBorder,
    transform: "translateX(-50%)",
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "1fr 40px 1fr",
    gap: "1.5rem",
    marginBottom: "2.5rem",
    alignItems: "center",
  },
  timelineLeft: { textAlign: "right" },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: T.gold,
    border: `3px solid ${T.white}`,
    boxShadow: `0 0 0 4px ${T.goldBorder}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    zIndex: 1,
    position: "relative",
  },
  timelineYear: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  timelineTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.text,
    marginBottom: 4,
  },
  timelineDesc: { fontSize: "0.83rem", color: T.textMuted, lineHeight: 1.65 },
  timelineCard: {
    background: T.white,
    borderRadius: T.radius.md,
    padding: "1rem 1.2rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 10px rgba(160,110,30,0.08)",
  },

  /* ── FUTURE PLAN ── */
  futureBg: {
    background: T.goldLight,
    padding: "5rem 20px",
    borderTop: `1px solid ${T.goldBorder}`,
  },
  futureGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "5rem",
    alignItems: "center",
  },
  futureLeft: {},
  futureTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.9rem, 3vw, 2.7rem)",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 1rem",
    lineHeight: 1.12,
  },
  futureBody: {
    fontSize: "0.93rem",
    color: T.textMid,
    lineHeight: 1.8,
    marginBottom: "1.8rem",
  },
  futureList: { display: "flex", flexDirection: "column", gap: "0.9rem" },
  futureItem: { display: "flex", alignItems: "flex-start", gap: 12 },
  futureCheckCircle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: T.gold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  futureItemText: {
    fontSize: "0.88rem",
    color: T.textMid,
    lineHeight: 1.6,
    fontWeight: 500,
  },
  futureRight: { display: "flex", flexDirection: "column", gap: "1rem" },
  futurePlanCard: {
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1.4rem 1.5rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 16px rgba(160,110,30,0.09)",
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
  },
  futurePlanYear: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
    minWidth: 48,
  },
  futurePlanTitle: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: T.text,
    marginBottom: 3,
  },
  futurePlanDesc: { fontSize: "0.8rem", color: T.textMuted, lineHeight: 1.6 },

  /* ── CTA ── */
  ctaBg: {
    background: `linear-gradient(135deg, ${T.dark} 0%, ${T.darkSoft} 100%)`,
    padding: "5rem 2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(207,150,69,0.1) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  ctaInner: { position: "relative", maxWidth: 580, margin: "0 auto" },
  ctaEyebrow: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 1rem",
    lineHeight: 1.12,
  },
  ctaBody: {
    fontSize: "0.93rem",
    color: "rgba(255,255,255,0.48)",
    lineHeight: 1.75,
    marginBottom: "2rem",
  },
  ctaBtnRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaBtnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: T.gold,
    color: T.white,
    borderRadius: T.radius.sm,
    padding: "12px 28px",
    fontSize: "0.84rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    border: "none",
    cursor: "pointer",
    transition: "background 0.18s",
  },
  ctaBtnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
    borderRadius: T.radius.sm,
    padding: "12px 28px",
    fontSize: "0.84rem",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.18)",
    cursor: "pointer",
    transition: "border-color 0.18s",
  },
});

/* ── Icons ── */
const IcoArrow = ({ color = "#fff" }) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IcoCheck = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Service card ── */
function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      style={{
        ...styles.serviceCard,
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered
          ? "0 14px 36px rgba(160,110,30,0.16)"
          : "0 2px 14px rgba(160,110,30,0.07)",
        borderColor: hovered ? T.gold : T.goldBorder,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(service.link)}
    >
      <span style={styles.serviceIcon}>{service.icon}</span>
      <h4 style={styles.serviceTitle}>{service.title}</h4>
      <p style={styles.serviceDesc}>{service.desc}</p>
      <div style={{ ...styles.serviceHoverLine, width: hovered ? 48 : 28 }} />
    </div>
  );
}

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          About Us | Technosaga Infotech — Digital & Creative Services
        </title>
        <meta
          name="description"
          content="We're a full-service agency offering web design, digital marketing, BPO, app development, event management and more. Founded 2020, 500+ projects delivered."
        />
        <link rel="canonical" href="https://technosagainfotech.in/about" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div style={styles.page}>
        <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-photo-img { height: 300px !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .story-img { height: 320px !important; }
          .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .mv-grid { grid-template-columns: 1fr !important; }
          .future-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .tl-item { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
          .tl-left { text-align: left !important; }
          .tl-dot { display: none !important; }
          .tl-line { display: none !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-inner { padding: 3.5rem 1.2rem !important; }
          .section { padding: 3.5rem 1.2rem !important; }
          .mv-grid { padding: 0 1.2rem !important; }
          .cta-bg { padding: 3.5rem 1.2rem !important; }
          .hero-strip { padding: 1rem 1.2rem !important; }
        }
        @media (max-width: 400px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

        {/* ══ HERO ══ */}
        <div style={styles.hero}>
          <div style={styles.heroGlow} />
          <div style={styles.heroRing1} />
          <div style={styles.heroRing2} />

          {/* Two-column layout */}
          <div style={styles.heroInner} className="hero-inner">
            {/* LEFT: copy */}
            <div style={styles.heroLeft}>
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} />
                <span style={styles.heroBadgeText}>About Us</span>
              </div>
              <h1 style={styles.heroTitle}>
                We Build.
                <br />
                We Market.
                <br />
                <span style={styles.heroAccent}>We Deliver.</span>
              </h1>
              <div style={styles.heroDivider} />
              <p style={styles.heroBody}>
                A full-service agency powering brands with cutting-edge digital
                solutions, creative production, strategic marketing, and
                large-scale event execution — all under one roof.
              </p>
              <div style={styles.heroCTARow}>
                <button
                  style={styles.heroCtaPrimary}
                  onClick={() => {
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Our Services <IcoArrow />
                </button>
                <button
                  style={styles.heroCtaOutline}
                  onClick={() => navigate("/contact")}
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* RIGHT: photo with frosted stats overlay */}
            <div style={styles.heroPhotoSide}>
              <div style={styles.heroFloatTag}>Full-Service Agency</div>
              <div style={styles.heroPhotoFrame}>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
                  alt="Our team at work"
                  style={styles.heroPhotoImg}
                  className="hero-photo-img"
                  loading="lazy"
                  decoding="async"
                />
                <div style={styles.heroPhotoOverlay} />
              </div>
            </div>
          </div>
        </div>

        {/* ══ OUR STORY ══ */}
        <div style={styles.section} className="section">
          <div style={styles.storyGrid} className="story-grid">
            <div style={styles.storyImgWrap}>
              <img
                src="https://images.unsplash.com/photo-1571677246347-5040036b95cc?q=80&w=387&auto=format&fit=crop"
                alt="Our team"
                style={styles.storyImg}
                className="story-img"
                loading="lazy"
                decoding="async"
              />
              <div style={styles.storyImgBadge}>
                <div>
                  <div style={styles.storyBadgeNum}>5+</div>
                  <div style={styles.storyBadgeLabel}>
                    Years of
                    <br />
                    Excellence
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.storyBody}>
              <h2
                style={{
                  ...styles.sectionTitle,
                  textAlign: "left",
                  marginBottom: "1rem",
                }}
              >
                Our <span style={styles.sectionTitleAccent}>Story</span>
              </h2>
              <p style={styles.storyP}>
                Founded in 2020, we began as a small web design studio driven by
                a singular belief: that every business, regardless of size,
                deserves world-class digital presence. Over the years, that
                belief expanded into a full-service agency spanning ten
                disciplines.
              </p>
              <p style={styles.storyP}>
                Today, we are a team of designers, developers, marketers,
                filmmakers, event architects, and strategists — united by an
                uncompromising commitment to craft and impact. From a startup's
                first website to a national political rally, we bring the same
                passion to every brief.
              </p>
              <div style={styles.valuesGrid}>
                {VALUES.map((v) => (
                  <div key={v.title} style={styles.valueItem}>
                    <div style={styles.valueTitle}>{v.title}</div>
                    <div style={styles.valueDesc}>{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ SERVICES ══ */}
        <div style={styles.servicesBg} id="services">
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={styles.sectionEyebrow}>
              <div style={styles.sectionEyebrowLine} />
              What We Do
              <div style={styles.sectionEyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              Our <span style={styles.sectionTitleAccent}> Services</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Everything your business needs to grow, operate, and stand out —
              delivered by specialists under one roof.
            </p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* ══ MISSION · VISION · FUTURE PLAN ══ */}
        <div style={styles.mvBg}>
          <div style={styles.mvGlow} />
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ ...styles.sectionEyebrow, color: T.gold }}>
              <div style={styles.sectionEyebrowLine} />
              Our Direction
              <div style={styles.sectionEyebrowLine} />
            </div>
            <h2 style={{ ...styles.sectionTitle, color: T.white }}>
              Mission, Vision &<br />
              <span style={styles.sectionTitleAccent}>Future Plan</span>
            </h2>
          </div>
          <div style={styles.mvGrid} className="mv-grid">
            <div style={{ ...styles.mvCard, ...styles.mvCardMission }}>
              <div style={styles.mvCardAccent} />
              <div style={styles.mvIconWrap}>🎯</div>
              <div style={styles.mvEyebrow}>Our Mission</div>
              <h3 style={styles.mvTitle}>
                Empowering Growth Through Creative Solutions
              </h3>
              <p style={styles.mvBody}>
                To deliver innovative, high-quality digital and creative
                services that empower businesses and individuals to achieve
                their goals — by combining technology, strategy, and creativity
                with a relentless focus on results.
              </p>
            </div>
            <div style={{ ...styles.mvCard, ...styles.mvCardVision }}>
              <div style={styles.mvCardAccent} />
              <div style={styles.mvIconWrap}>🔭</div>
              <div style={styles.mvEyebrow}>Our Vision</div>
              <h3 style={styles.mvTitle}>
                To Be the Region's Most Trusted Creative Agency
              </h3>
              <p style={styles.mvBody}>
                We envision a future where every business has access to premium
                creative and digital services. Our goal is to be the go-to
                agency for end-to-end brand building — recognised for integrity,
                excellence, and transformative impact across industries.
              </p>
            </div>
            <div style={{ ...styles.mvCard, ...styles.mvCardFuture }}>
              <div style={styles.mvCardAccent} />
              <div style={styles.mvIconWrap}>🚀</div>
              <div style={styles.mvEyebrow}>Future Plan</div>
              <h3 style={styles.mvTitle}>Scaling Smart, Growing Global</h3>
              <p style={styles.mvBody}>
                By 2027, we plan to expand into three new markets, launch a
                dedicated AI-powered marketing platform, and grow our team to
                150+ specialists. We are investing in automation, talent
                development, and global partnerships to deliver even greater
                value.
              </p>
            </div>
          </div>
        </div>

        {/* ══ TIMELINE ══ */}
        <div style={{ background: T.bg }}>
          <div style={styles.section} className="section">
            <div style={styles.sectionHeader}>
              <div style={styles.sectionEyebrow}>
                <div style={styles.sectionEyebrowLine} />
                Our Journey
                <div style={styles.sectionEyebrowLine} />
              </div>
              <h2 style={styles.sectionTitle}>
                From Startup to{" "}
                <span style={styles.sectionTitleAccent}>
                  Full-Service Agency
                </span>
              </h2>
              <p style={styles.sectionSubtitle}>
                A decade of milestones, growth, and unwavering commitment to our
                clients.
              </p>
            </div>
            <div style={styles.timelineWrap}>
              <div style={styles.timelineLine} className="tl-line" />
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  style={styles.timelineItem}
                  className="tl-item"
                >
                  {i % 2 === 0 ? (
                    <>
                      <div style={styles.timelineLeft} className="tl-left">
                        <div style={styles.timelineYear}>{m.year}</div>
                      </div>
                      <div style={styles.timelineDot} className="tl-dot">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div style={styles.timelineCard}>
                        <div style={styles.timelineTitle}>{m.title}</div>
                        <div style={styles.timelineDesc}>{m.desc}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.timelineCard}>
                        <div style={styles.timelineTitle}>{m.title}</div>
                        <div style={styles.timelineDesc}>{m.desc}</div>
                      </div>
                      <div style={styles.timelineDot} className="tl-dot">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div style={styles.timelineLeft} className="tl-left">
                        <div style={styles.timelineYear}>{m.year}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FUTURE PLAN DETAIL ══ */}
        <div style={styles.futureBg}>
          <div style={styles.futureGrid} className="future-grid">
            <div style={styles.futureLeft}>
              <div style={styles.sectionEyebrow}>
                <div style={styles.sectionEyebrowLine} />
                Roadmap
              </div>
              <h2 style={styles.futureTitle}>
                Building Towards{" "}
                <span style={styles.sectionTitleAccent}>2030</span>
              </h2>
              <p style={styles.futureBody}>
                Our future is bold, focused, and deeply purposeful. We are not
                just growing — we are evolving into a technology-first creative
                powerhouse that will redefine how agencies operate in our
                region.
              </p>
              <div style={styles.futureList}>
                {[
                  "Launch an AI-powered marketing automation platform",
                  "Expand operations into 3 international markets",
                  "Build a 10,000 sq ft integrated media production facility",
                  "Grow to 150+ full-time creative and technical specialists",
                  "Establish a startup accelerator focused on digital businesses",
                ].map((item) => (
                  <div key={item} style={styles.futureItem}>
                    <div style={styles.futureCheckCircle}>
                      <IcoCheck />
                    </div>
                    <div style={styles.futureItemText}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.futureRight}>
              {[
                {
                  year: "2026",
                  title: "AI Platform Launch",
                  desc: "Deploy our proprietary marketing automation and analytics platform for client campaigns.",
                },
                {
                  year: "2027",
                  title: "International Expansion",
                  desc: "Open offices in 3 new markets with dedicated local teams and partnerships.",
                },
                {
                  year: "2028",
                  title: "Media Production Hub",
                  desc: "Complete our integrated studio facility for film, streaming, and live events at scale.",
                },
                {
                  year: "2030",
                  title: "Industry Leadership",
                  desc: "Establish ourselves as the region's leading end-to-end creative and digital agency.",
                },
              ].map((plan) => (
                <div key={plan.year} style={styles.futurePlanCard}>
                  <div style={styles.futurePlanYear}>{plan.year}</div>
                  <div>
                    <div style={styles.futurePlanTitle}>{plan.title}</div>
                    <div style={styles.futurePlanDesc}>{plan.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CTA ══ */}
        <div style={styles.ctaBg} className="cta-bg">
          <div style={styles.ctaGlow} />
          <div style={styles.ctaInner}>
            <div style={styles.ctaEyebrow}>Let's Work Together</div>
            <h2 style={styles.ctaTitle}>
              Ready to Build Something{" "}
              <span style={styles.sectionTitleAccent}>Extraordinary?</span>
            </h2>
            <p style={styles.ctaBody}>
              Whether you need a website, a campaign, a live event, or a
              complete brand overhaul — we have the team, the tools, and the
              passion to make it happen.
            </p>
            <div style={styles.ctaBtnRow}>
              <button
                style={styles.ctaBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Start a Project <IcoArrow />
              </button>
              <button
                style={styles.ctaBtnOutline}
                onClick={() => navigate("/works")}
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
