import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  dark: "#0B0F1A",
  darkMid: "#0f1521",
  darkSoft: "#121826",
  text: "rgba(255,255,255,0.85)",
  textMid: "rgba(255,255,255,0.6)",
  textMuted: "rgba(255,255,255,0.4)",
  radius: { sm: 6, md: 10, lg: 14, xl: 20 },
};

const SERVICES = [
  {
    icon: "🎙️",
    title: "Political Rallies",
    desc: "End-to-end rally management — venue selection, stage construction, sound and lighting, crowd logistics, security, and live streaming for audiences of any size.",
  },
  {
    icon: "🗳️",
    title: "Election Campaign Events",
    desc: "Strategic campaign event planning aligned with your political messaging, constituency outreach goals, and media coverage objectives.",
  },
  {
    icon: "🏛️",
    title: "Inauguration Ceremonies",
    desc: "Formal inauguration events and swearing-in ceremonies managed with protocol compliance, dignitary coordination, and broadcast production.",
  },
  {
    icon: "🤝",
    title: "Public Meetings & Jalsas",
    desc: "Community gatherings, public address meetings, and political jalsas — from intimate constituency meetings to large open-air assemblies.",
  },
  {
    icon: "📡",
    title: "Live Political Broadcasting",
    desc: "Multi-platform live streaming of rallies, press conferences, speeches, and debates — reaching digital audiences across YouTube, Facebook, and TV feeds.",
  },
  {
    icon: "🎪",
    title: "Party Conventions & Conferences",
    desc: "Political party conventions, national conferences, and delegate assemblies with full stage production, simultaneous translation, and media facilities.",
  },
  {
    icon: "🚐",
    title: "Roadshow & Campaign Tours",
    desc: "Multi-city campaign tours with branded vehicles, route planning, venue logistics, local coordination, and rolling media coverage.",
  },
  {
    icon: "🛡️",
    title: "Security & Crowd Management",
    desc: "Professional crowd control planning, coordination with law enforcement, VIP security protocols, and emergency response frameworks.",
  },
];

const CAPABILITIES = [
  { icon: "🏟️", label: "Stadium-Scale Staging" },
  { icon: "🔊", label: "Line Array Sound Systems" },
  { icon: "💡", label: "Architectural Lighting" },
  { icon: "📺", label: "LED Jumbotrons" },
  { icon: "🎥", label: "Multi-Camera Live Production" },
  { icon: "📡", label: "Satellite & OB Van" },
  { icon: "🛡️", label: "Security Coordination" },
  { icon: "🚁", label: "Aerial Coverage" },
  { icon: "🎪", label: "Crowd Management" },
  { icon: "🚌", label: "Transport & Logistics" },
  { icon: "📰", label: "Media Press Facilities" },
  { icon: "🎆", label: "Special Effects & Pyro" },
];

const PROCESS = [
  {
    step: "01",
    title: "Strategic Brief",
    desc: "Understanding your political goals, target constituency, key messages, campaign timeline, and the narrative each event must advance — before any logistics are discussed.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    step: "02",
    title: "Venue & Route Planning",
    desc: "Venue selection, ground surveys, capacity analysis, traffic flow mapping, accessibility planning, and government liaison for permits and police coordination.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    step: "03",
    title: "Production Design",
    desc: "Stage architecture, LED screen layout, branding integration, lighting design, sound system specification, and broadcast camera positioning — engineered to project authority.",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
  {
    step: "04",
    title: "Logistics & Operations",
    desc: "Crowd flow management, transport coordination, VIP movement protocols, catering logistics, media accreditation, and a minute-by-minute programme of events.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    step: "05",
    title: "Day-of Execution",
    desc: "Our on-ground command team manages every element in real time — crowd arrivals, stage management, speaker cues, technical production, security coordination, and media handling.",
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80",
  },
  {
    step: "06",
    title: "Media & Digital Broadcast",
    desc: "Live streaming to all digital platforms, OB van feed for TV channels, press conference management, social media war room support, and post-event media monitoring.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    name: "Senior Campaign Manager",
    role: "National Political Party — 2024 General Election",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    quote:
      "We needed to organise 24 rallies across 6 provinces in 30 days. This team handled every single one — 80,000 attendees at peak — with zero incidents, zero stage failures, and production quality that put other parties to shame. Our rallies defined the visual narrative of the campaign.",
  },
  {
    name: "Provincial Event Director",
    role: "Government Inauguration Ceremony — State House",
    avatar: "https://i.pravatar.cc/80?img=68",
    rating: 5,
    quote:
      "An inauguration ceremony demands absolute protocol precision. Every dignitary, every camera angle, every second of the programme was choreographed and executed flawlessly. The broadcast reached 4 million viewers. We have never worked with a more professional team.",
  },
  {
    name: "Campaign Coordinator",
    role: "Opposition Party — Multi-City Campaign Tour",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    quote:
      "12 cities, 150,000 people, 12 days. Transport, staging, sound, security, live streaming — all coordinated by one team. Not a single event ran late. Not a single technical failure. The professionalism gave our campaign real credibility on the ground.",
  },
];

const FAQS = [
  {
    q: "What is the largest crowd you have managed?",
    a: "Our largest single event managed 80,000 attendees at a national election rally. Our multi-city campaign tours have collectively moved over 150,000 people across 12 cities in 12 days. We have the systems, experience, and vendor network to scale to any size safely.",
  },
  {
    q: "How do you handle government permits and security coordination?",
    a: "We have an established relationship with relevant government authorities, police departments, and security agencies. Our team handles all permit applications, venue approvals, noise ordinances, road closures, and law enforcement coordination. You focus on your message — we handle the compliance.",
  },
  {
    q: "Can you manage live broadcasting for TV and digital platforms simultaneously?",
    a: "Yes. We operate OB vans and full satellite uplinks for live TV feeds, while simultaneously streaming to YouTube, Facebook, and all digital platforms. Our broadcast team can feed multiple channels in real time and manage press facilities for accredited media.",
  },
  {
    q: "How early do we need to book for a large national rally?",
    a: "For events expecting 10,000+ attendees, we recommend engaging us at least 8–12 weeks in advance. National-scale events with complex venue, permit, and security requirements may need 3–6 months of lead time. Shorter timelines are sometimes possible — contact us to discuss.",
  },
  {
    q: "Do you provide VIP and principal security protocols?",
    a: "Yes. We design and implement VIP movement plans, principal protection zones, press buffer management, and crowd separation protocols in coordination with your personal security detail and law enforcement. All VIP logistics are managed with absolute discretion.",
  },
];

const styles = StyleSheet.create({
  page: {
    fontFamily: "'Poppins', sans-serif",
    background: "#0B0F1A",
    minHeight: "100vh",
  },

  /* ── HERO ── */
  hero: {
    position: "relative",
    overflow: "hidden",
    minHeight: 700,
    display: "flex",
    alignItems: "center",
    marginTop: 72,
  },
  heroBgImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroBgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(105deg, rgba(10,6,0,0.97) 0%, rgba(10,6,0,0.88) 55%, rgba(10,6,0,0.5) 100%)",
  },
  heroInner: {
    position: "relative",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "6rem 2rem",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
  },
  heroBreadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: "1.2rem",
    fontSize: "0.74rem",
  },
  breadLink: {
    color: "rgba(255,255,255,0.45)",
    cursor: "pointer",
    textDecoration: "none",
  },
  breadSep: { color: "rgba(255,255,255,0.25)" },
  breadCurrent: { color: T.gold, fontWeight: 600 },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(212,175,55,0.15)",
    border: "1px solid rgba(212,175,55,0.3)",
    borderRadius: 100,
    padding: "5px 16px 5px 10px",
    marginBottom: "1.2rem",
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
    fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
    fontWeight: 700,
    color: T.white,
    lineHeight: 1.06,
    margin: "0 0 1rem",
    letterSpacing: "-0.02em",
  },
  heroAccent: { color: T.gold },
  heroBody: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.8,
    margin: "0 0 2rem",
    maxWidth: 460,
  },
  heroCTARow: { display: "flex", gap: 12, flexWrap: "wrap" },
  heroBtnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: T.gold,
    color: T.white,
    borderRadius: T.radius.sm,
    padding: "11px 24px",
    fontSize: "0.84rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    border: "none",
    cursor: "pointer",
  },
  heroBtnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "rgba(255,255,255,0.75)",
    borderRadius: T.radius.sm,
    padding: "11px 24px",
    fontSize: "0.84rem",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },

  /* ── HERO RIGHT IMAGE ── */
  heroRight: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  heroImgWrapper: {
    position: "relative",
    borderRadius: T.radius.xl,
    overflow: "hidden",
    height: 420,
    boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
    border: "1px solid rgba(212,175,55,0.25)",
  },
  heroRightImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroImgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,6,0,0.75) 0%, rgba(10,6,0,0.1) 60%, transparent 100%)",
  },
  heroImgStatRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.4rem 1.4rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0.6rem",
  },
  heroImgStat: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: T.radius.md,
    padding: "0.75rem 0.6rem",
    textAlign: "center",
  },
  heroImgStatNum: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.6rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  heroImgStatLabel: {
    fontSize: "0.62rem",
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    marginTop: 4,
    lineHeight: 1.3,
  },
  heroImgTopBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    background: "rgba(212,175,55,0.92)",
    borderRadius: T.radius.sm,
    padding: "5px 12px",
    fontSize: "0.67rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: T.white,
    textTransform: "uppercase",
  },
  heroImgTopRight: {
    position: "absolute",
    top: 14,
    right: 14,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 100,
    padding: "4px 12px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: "0.67rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
  },
  heroLiveDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
    animation: "pulse 1.8s infinite",
  },

  /* ── AUTHORITY BAR ── */
  authorityBar: {
    background: T.dark,
    padding: "1.6rem 0",
    borderBottom: "1px solid rgba(212,175,55,0.12)",
  },
  authorityInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  authorityItem: { display: "flex", alignItems: "center", gap: 8 },
  authorityDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: T.gold,
    flexShrink: 0,
  },
  authorityText: {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.5)",
    fontWeight: 500,
  },

  /* ── SHARED ── */
  sectionWrap: { maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem" },
  sectionHeader: { textAlign: "center", marginBottom: "3.5rem" },
  eyebrow: {
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
  eyebrowLine: { width: 22, height: 2, background: T.gold, borderRadius: 2 },
  sectionTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    margin: "0 0 0.8rem",
    lineHeight: 1.12,
  },
  titleAccent: { color: T.gold },
  sectionSub: {
    fontSize: "0.92rem",
    color: "rgba(255,255,255,0.4)",
    maxWidth: 560,
    margin: "0 auto",
    lineHeight: 1.75,
  },

  /* ── ABOUT ── */
  aboutBg: {
    background: "#121826",
    borderTop: `1px solid ${T.goldBorder}`,
    padding: "5rem 0",
  },
  aboutGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "center",
  },
  aboutImgCol: { position: "relative", paddingBottom: 28 },
  aboutImgMain: {
    width: "100%",
    height: 500,
    objectFit: "cover",
    display: "block",
    borderRadius: T.radius.xl,
    boxShadow: "0 16px 48px rgba(160,110,30,0.14)",
  },
  aboutImgSecondary: {
    position: "absolute",
    bottom: 0,
    right: -24,
    width: 190,
    height: 155,
    objectFit: "cover",
    borderRadius: T.radius.lg,
    border: `4px solid ${T.white}`,
    boxShadow: "0 8px 28px rgba(160,110,30,0.18)",
  },
  aboutFloatBadge: {
    position: "absolute",
    top: 20,
    left: -16,
    background: "#121826",
    borderRadius: T.radius.lg,
    padding: "1rem 1.2rem",
    boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
    border: `1.5px solid ${T.goldBorder}`,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  aboutBadgeNum: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  aboutBadgeLabel: {
    fontSize: "0.76rem",
    color: "rgba(255,255,255,0.6)",
    fontWeight: 500,
    lineHeight: 1.4,
  },
  aboutP: {
    fontSize: "0.93rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.85,
    margin: "0 0 1.1rem",
  },
  aboutPullQuote: {
    background: "rgba(212,175,55,0.08)",
    borderLeft: `4px solid ${T.gold}`,
    borderRadius: `0 ${T.radius.md}px ${T.radius.md}px 0`,
    padding: "1rem 1.3rem",
    margin: "1.5rem 0",
    fontSize: "0.94rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.75,
    fontStyle: "italic",
  },
  aboutChecks: {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    marginTop: "1.5rem",
  },
  aboutCheckItem: { display: "flex", alignItems: "flex-start", gap: 10 },
  aboutCheckBubble: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: T.gold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  aboutCheckText: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.6,
    fontWeight: 500,
  },
  aboutStatsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginTop: "2rem",
    paddingTop: "2rem",
    borderTop: `1px solid ${T.goldBorder}`,
  },
  aboutStatItem: {
    textAlign: "center",
    padding: "0.8rem",
    background: "rgba(212,175,55,0.08)",
    borderRadius: T.radius.md,
    border: `1px solid ${T.goldBorder}`,
  },
  aboutStatNum: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.9rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  aboutStatLabel: {
    fontSize: "0.71rem",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.07em",
    marginTop: 3,
  },

  /* ── SERVICES ── */
  servicesBg: {
    background: `linear-gradient(180deg, #0B0F1A 0%, "#0f1521" 100%)`,
    padding: "5rem 0",
  },
  servicesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.2rem",
  },
  serviceCard: {
    background: "#121826",
    borderRadius: T.radius.lg,
    padding: "1.6rem 1.4rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 12px rgba(160,110,30,0.07)",
    transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
  },
  serviceIconWrap: {
    width: 46,
    height: 46,
    borderRadius: T.radius.md,
    background: "rgba(212,175,55,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.9rem",
    fontSize: "1.3rem",
    border: `1px solid ${T.goldBorder}`,
  },
  serviceTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    margin: "0 0 0.45rem",
  },
  serviceDesc: { fontSize: "0.81rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 },
  serviceBarWrap: {
    marginTop: "0.9rem",
    height: 2,
    background: T.goldBorder,
    borderRadius: 2,
    overflow: "hidden",
  },
  serviceBarFill: {
    height: "100%",
    background: T.gold,
    borderRadius: 2,
    transition: "width 0.4s ease",
  },

  /* ── PORTFOLIO ── */
  portfolioBg: { background: T.dark, padding: "5rem 0" },
  portfolioGridOuter: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "265px",
    gap: "1rem",
  },
  portfolioCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: T.radius.lg,
    cursor: "pointer",
    background: "#1a1005",
  },
  portfolioImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
  },
  portfolioGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,6,0,0.9) 0%, transparent 55%)",
    transition: "opacity 0.3s",
  },
  portfolioCrowdTag: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "rgba(212,175,55,0.9)",
    borderRadius: 4,
    padding: "3px 9px",
    fontSize: "0.6rem",
    color: T.white,
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  portfolioMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.2rem 1.2rem",
    transition: "transform 0.3s",
  },
  portfolioCatPill: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.85)",
    fontSize: "0.6rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 3,
    marginBottom: 5,
  },
  portfolioTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.98rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 3px",
  },
  portfolioLocation: {
    fontSize: "0.73rem",
    color: "rgba(255,255,255,0.5)",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  portfolioCrowdNum: {
    fontSize: "0.78rem",
    color: T.gold,
    fontWeight: 700,
    marginTop: 3,
  },

  /* ── PROCESS ── */
  processBg: {
    background: "rgba(212,175,55,0.08)",
    padding: "5rem 0",
    borderTop: `1px solid ${T.goldBorder}`,
  },
  processGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  processCard: {
    background: "#121826",
    borderRadius: T.radius.xl,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.08)",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  processImgWrap: { height: 185, overflow: "hidden", position: "relative" },
  processImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  processStepTag: {
    position: "absolute",
    top: 12,
    left: 12,
    background: T.gold,
    color: T.white,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 4,
  },
  processBody: { padding: "1.3rem 1.5rem 1.6rem" },
  processTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.82)",
    margin: "0 0 0.45rem",
  },
  processDesc: { fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 },

  /* ── CAPABILITIES ── */
  capabilitiesBg: { background: T.dark, padding: "5rem 0" },
  capabilitiesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "1rem",
  },
  capItem: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: T.radius.md,
    padding: "1.2rem 0.7rem",
    border: "1px solid rgba(212,175,55,0.12)",
    textAlign: "center",
    transition: "border-color 0.2s, background 0.2s",
  },
  capIcon: { fontSize: "1.5rem", marginBottom: "0.5rem", display: "block" },
  capLabel: {
    fontSize: "0.71rem",
    color: "rgba(255,255,255,0.45)",
    fontWeight: 500,
    lineHeight: 1.4,
  },

  /* ── DISCRETION STRIP ── */
  discretionBg: {
    background: `linear-gradient(135deg, ${T.darkMid} 0%, ${T.darkSoft} 100%)`,
    padding: "4rem 2rem",
    borderTop: "1px solid rgba(212,175,55,0.12)",
    borderBottom: "1px solid rgba(212,175,55,0.12)",
  },
  discretionInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2rem",
  },
  discretionItem: { textAlign: "center", padding: "0 1rem" },
  discretionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(212,175,55,0.15)",
    border: "1px solid rgba(212,175,55,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
    fontSize: "1.4rem",
  },
  discretionTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.white,
    marginBottom: 6,
  },
  discretionDesc: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.7,
  },

  /* ── TESTIMONIALS ── */
  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  tCard: {
    background: "#121826",
    borderRadius: T.radius.xl,
    padding: "2rem 1.8rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.07)",
  },
  quoteIcon: {
    fontSize: "2rem",
    color: T.gold,
    lineHeight: 1,
    marginBottom: "0.7rem",
    display: "block",
    fontFamily: "Georgia, serif",
  },
  tText: {
    fontSize: "0.87rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.78,
    margin: "0 0 1.2rem",
    fontStyle: "italic",
  },
  ratingRow: { display: "flex", gap: 2, marginBottom: "1.1rem" },
  star: { color: T.gold, fontSize: "0.88rem" },
  tDivider: { height: 1, background: T.goldBorder, marginBottom: "1.1rem" },
  tAuthorRow: { display: "flex", alignItems: "center", gap: 10 },
  tAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${T.goldBorder}`,
  },
  tName: { fontSize: "0.84rem", fontWeight: 600, color: T.text },
  tRole: { fontSize: "0.73rem", color: "rgba(255,255,255,0.4)", marginTop: 1 },

  /* ── PACKAGES ── */
  packagesBg: {
    background: `linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 55%, ${T.darkSoft} 100%)`,
    padding: "5rem 0",
    position: "relative",
    overflow: "hidden",
  },
  pkgGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  pkgGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    position: "relative",
  },
  pkgCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: T.radius.xl,
    padding: "2.2rem 2rem",
    border: "1px solid rgba(212,175,55,0.15)",
  },
  pkgCardHL: {
    background: "rgba(212,175,55,0.12)",
    borderRadius: T.radius.xl,
    padding: "2.2rem 2rem",
    border: `2px solid ${T.gold}`,
    position: "relative",
  },
  pkgPopTag: {
    position: "absolute",
    top: -13,
    left: "50%",
    transform: "translateX(-50%)",
    background: T.gold,
    color: T.white,
    fontSize: "0.62rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "4px 14px",
    borderRadius: 100,
    whiteSpace: "nowrap",
  },
  pkgName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: T.white,
    marginBottom: 4,
  },
  pkgPrice: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "2.5rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
    marginBottom: 2,
  },
  pkgPeriod: {
    fontSize: "0.74rem",
    color: "rgba(255,255,255,0.35)",
    marginBottom: "0.8rem",
  },
  pkgDesc: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.65,
    marginBottom: "1.3rem",
  },
  pkgDivider: {
    height: 1,
    background: "rgba(212,175,55,0.15)",
    marginBottom: "1.3rem",
  },
  pkgFeat: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    marginBottom: 8,
  },
  pkgFeatDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "rgba(212,175,55,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  pkgFeatText: {
    fontSize: "0.81rem",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.5,
  },
  pkgBtnHL: {
    width: "100%",
    marginTop: "1.8rem",
    padding: "0.85rem",
    background: T.gold,
    color: T.white,
    border: "none",
    borderRadius: T.radius.sm,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "0.84rem",
    letterSpacing: "0.06em",
    cursor: "pointer",
  },
  pkgBtnOutline: {
    width: "100%",
    marginTop: "1.8rem",
    padding: "0.85rem",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: T.radius.sm,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: "0.84rem",
    letterSpacing: "0.06em",
    cursor: "pointer",
  },

  /* ── FAQ ── */
  faqWrap: {
    maxWidth: 760,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  faqItem: {
    background: "#121826",
    borderRadius: T.radius.md,
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 1px 8px rgba(160,110,30,0.06)",
    overflow: "hidden",
  },
  faqQ: {
    width: "100%",
    padding: "1.1rem 1.4rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.92rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.82)",
    cursor: "pointer",
    textAlign: "left",
    gap: "1rem",
  },
  faqA: {
    padding: "1rem 1.4rem 1.2rem",
    fontSize: "0.87rem",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.75,
    borderTop: `1px solid ${T.goldBorder}`,
  },

  /* ── CTA ── */
  ctaBg: {
    background: `linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 55%, ${T.darkSoft} 100%)`,
    padding: "5rem 2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    width: 700,
    height: 700,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  ctaInner: { position: "relative", maxWidth: 680, margin: "0 auto" },
  ctaEyebrow: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 1rem",
    lineHeight: 1.12,
  },
  ctaBody: {
    fontSize: "0.92rem",
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
    width="10"
    height="10"
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
const IcoChevron = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={T.gold}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform 0.25s",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Sub-components ── */
function ServiceCard({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.serviceCard,
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov
          ? "0 14px 36px rgba(160,110,30,0.15)"
          : "0 2px 12px rgba(160,110,30,0.07)",
        borderColor: hov ? T.gold : T.goldBorder,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.serviceIconWrap}>{s.icon}</div>
      <h4 style={styles.serviceTitle}>{s.title}</h4>
      <p style={styles.serviceDesc}>{s.desc}</p>
      <div style={styles.serviceBarWrap}>
        <div
          style={{ ...styles.serviceBarFill, width: hov ? "100%" : "30%" }}
        />
      </div>
    </div>
  );
}

function ProcessCard({ step }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.processCard,
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov
          ? "0 12px 32px rgba(160,110,30,0.18)"
          : "0 2px 14px rgba(160,110,30,0.08)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.processImgWrap}>
        <img
          src={step.img}
          alt={`Step ${step.step}: ${step.title} — political event management process`}
          style={{
            ...styles.processImg,
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
        />
        <span style={styles.processStepTag}>{step.step}</span>
      </div>
      <div style={styles.processBody}>
        <h4 style={styles.processTitle}>{step.title}</h4>
        <p style={styles.processDesc}>{step.desc}</p>
      </div>
    </div>
  );
}

function CapItem({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.capItem,
        borderColor: hov ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.12)",
        background: hov ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.05)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={styles.capIcon}>{item.icon}</span>
      <div style={styles.capLabel}>{item.label}</div>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.faqItem}>
      <button style={styles.faqQ} onClick={() => setOpen(!open)}>
        <span>{faq.q}</span>
        <IcoChevron open={open} />
      </button>
      {open && <div style={styles.faqA}>{faq.a}</div>}
    </div>
  );
}

export default function PoliticalRallies() {
  const navigate = useNavigate();
  return (
    <div style={{...styles.page, background:"#0B0F1A", fontFamily:"'Poppins', sans-serif", paddingTop: 72}}>
      {/* ══ SEO HELMET ══ */}
      <Helmet>
        <title>
          Political Rallies & Event Management | Professional Campaign Events
        </title>
        <meta
          name="description"
          content="Expert political rally and campaign event management — rallies, inaugurations, conventions, and roadshows. Stadium-scale production, live broadcast, crowd management, and VIP security. 200+ events managed. Zero incidents."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://yourdomain.com/services/political-rallies-events"
        />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 1024px) {
          .capabilities-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; grid-auto-rows: 220px !important; }
          .discretion-inner { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-sec { display: none !important; }
          .about-badge { left: 12px !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 200px !important; }
          .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .capabilities-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .discretion-inner { grid-template-columns: 1fr 1fr !important; }
          .hero-img-stat-row { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .services-grid, .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; }
          .capabilities-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .section-wrap { padding: 3rem 1.2rem !important; }
          .discretion-inner { grid-template-columns: 1fr !important; }
          .authority-inner { justify-content: center !important; }
          .hero-img-wrapper { height: 280px !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1400&q=80"
          alt="Large political rally crowd filling a stadium with banners and stage lighting"
          style={styles.heroBgImg}
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div style={styles.heroBgOverlay} />
        <div style={styles.heroInner} className="hero-inner">
          {/* LEFT — Text content */}
          <div>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot} />
              <span style={styles.heroBadgeText}>
                Political Rallies & Events
              </span>
            </div>
            <h1 style={styles.heroTitle}>
              Mobilise Your Base.
              <br />
              Command the <span style={styles.heroAccent}>Stage.</span>
              <br />
              Win the Narrative.
            </h1>
            <p style={styles.heroBody}>
              Strategic political event management for rallies, campaigns,
              inaugurations, and conventions — delivered with military
              precision, broadcast quality, and absolute discretion.
            </p>
            <div style={styles.heroCTARow}>
              <button
                style={styles.heroBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Plan Your Event <IcoArrow />
              </button>
              <button
                style={styles.heroBtnOutline}
                onClick={() => navigate("/works")}
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT — Hero Image with overlay stats */}
          <div style={styles.heroRight}>
            <div style={styles.heroImgWrapper} className="hero-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
                alt="Professional stage production at a large-scale political convention with LED screens and crowd"
                style={styles.heroRightImg}
                loading="eager"
                decoding="async"
              />
              <div style={styles.heroImgOverlay} />

              {/* Top-left badge */}
              <div style={styles.heroImgTopBadge}>200+ Events Managed</div>

              {/* Top-right live indicator */}
              <div style={styles.heroImgTopRight}>
                <span style={styles.heroLiveDot} />
                Zero Incidents
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <div style={styles.aboutBg}>
        <div style={styles.aboutGrid} className="about-grid">
          <div style={styles.aboutImgCol}>
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
              alt="Professionally managed political convention with full stage production and packed audience"
              style={styles.aboutImgMain}
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80"
              alt="Event production team coordinating stage and technical setup for a political rally"
              style={styles.aboutImgSecondary}
              className="about-img-sec"
              loading="lazy"
              decoding="async"
            />
            <div style={styles.aboutFloatBadge} className="about-badge">
              <div>
                <div style={styles.aboutBadgeNum}>200+</div>
                <div style={styles.aboutBadgeLabel}>
                  Political
                  <br />
                  Events Managed
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2
              style={{
                ...styles.sectionTitle,
                textAlign: "left",
                marginBottom: "1rem",
              }}
            >
              Political Event Management
              <br />
              <span style={styles.titleAccent}>Done Right</span>
            </h2>
            <p style={styles.aboutP}>
              Political events are unlike any other. They carry reputational
              stakes that go beyond the event itself. A poorly managed rally — a
              sound failure during the keynote speech, a crowd incident, a stage
              that looks underwhelming on camera — can define a campaign for the
              wrong reasons. Conversely, a powerfully executed rally creates
              visual moments that echo through news cycles.
            </p>
            <p style={styles.aboutP}>
              We have managed over 200 political events — from local
              constituency meetings to national rallies of 80,000 people. We
              understand the operational complexity, the security sensitivities,
              the media dynamics, and the political stakes. Our team operates
              with the professionalism and discretion that high-stakes political
              environments demand.
            </p>
            <div style={styles.aboutPullQuote}>
              "A political rally is not just an event — it is a visual statement
              of strength, organisation, and public support. We make sure that
              statement is unmistakable."
            </div>
            <div style={styles.aboutChecks}>
              {[
                "Experienced in managing crowds from 500 to 80,000+ attendees safely",
                "Government liaison for permits, police coordination, and venue approvals",
                "Broadcast-quality stage production that looks powerful on every screen",
                "Multi-platform live streaming and OB van feeds for TV coverage",
                "Absolute operational discretion — we protect your campaign's privacy",
              ].map((item) => (
                <div key={item} style={styles.aboutCheckItem}>
                  <div style={styles.aboutCheckBubble}>
                    <IcoCheck />
                  </div>
                  <div style={styles.aboutCheckText}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <div style={styles.servicesBg}>
        <div
          style={{
            ...styles.sectionHeader,
            padding: "0 2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={styles.eyebrow}>
            <div style={styles.eyebrowLine} />
            What We Manage
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            8 Political Event <span style={styles.titleAccent}>Services</span>
          </h2>
          <p style={styles.sectionSub}>
            From local constituency meetings to national-scale rallies —
            comprehensive political event management tailored to your campaign's
            specific needs.
          </p>
        </div>
        <div style={styles.servicesGrid} className="services-grid">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </div>

      {/* ══ PROCESS ══ */}
      <div style={styles.processBg}>
        <div
          style={{
            ...styles.sectionHeader,
            padding: "0 2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={styles.eyebrow}>
            <div style={styles.eyebrowLine} />
            How We Work
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            Strategic to <span style={styles.titleAccent}>Operational</span>
          </h2>
          <p style={styles.sectionSub}>
            From political strategy alignment to boots on the ground — a
            rigorous 6-step process that leaves nothing to chance.
          </p>
        </div>
        <div style={styles.processGrid} className="process-grid">
          {PROCESS.map((step) => (
            <ProcessCard key={step.step} step={step} />
          ))}
        </div>
      </div>

      {/* ══ CAPABILITIES ══ */}
      <div style={styles.capabilitiesBg}>
        <div
          style={{
            ...styles.sectionHeader,
            padding: "0 2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ ...styles.eyebrow, color: T.gold }}>
            <div style={styles.eyebrowLine} />
            Production Capabilities
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={{ ...styles.sectionTitle, color: T.white }}>
            Full-Scale{" "}
            <span style={styles.titleAccent}>Event Infrastructure</span>
          </h2>
          <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
            Every physical and technical element of a major political event —
            owned, operated, and managed by our team.
          </p>
        </div>
        <div style={styles.capabilitiesGrid} className="capabilities-grid">
          {CAPABILITIES.map((item) => (
            <CapItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* ══ TESTIMONIALS ══ */}
      <div style={styles.sectionWrap} className="section-wrap">
        <div style={styles.sectionHeader}>
          <div style={styles.eyebrow}>
            <div style={styles.eyebrowLine} />
            Client Stories
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            What Campaign <span style={styles.titleAccent}>Teams Say</span>
          </h2>
        </div>
        <div style={styles.testimonialGrid} className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={styles.tCard}>
              <span style={styles.quoteIcon}>"</span>
              <p style={styles.tText}>{t.quote}</p>
              <div style={styles.ratingRow}>
                {Array(t.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} style={styles.star}>
                      ★
                    </span>
                  ))}
              </div>
              <div style={styles.tDivider} />
              <div style={styles.tAuthorRow}>
                <img
                  src={t.avatar}
                  alt={`${t.name} — ${t.role}`}
                  style={styles.tAvatar}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div style={styles.tName}>{t.name}</div>
                  <div style={styles.tRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FAQ ══ */}
      <div style={styles.sectionWrap} className="section-wrap">
        <div style={styles.sectionHeader}>
          <div style={styles.eyebrow}>
            <div style={styles.eyebrowLine} />
            FAQ
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            Common <span style={styles.titleAccent}>Questions</span>
          </h2>
        </div>
        <div style={styles.faqWrap}>
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>

      {/* ══ CTA ══ */}
      <div style={styles.ctaBg}>
        <div style={styles.ctaGlow} />
        <div style={styles.ctaInner}>
          <div style={styles.ctaEyebrow}>Confidential Consultation</div>
          <h2 style={styles.ctaTitle}>
            Ready to Plan Your{" "}
            <span style={styles.titleAccent}>
              Next Political
              <br />
              Event?
            </span>
          </h2>
          <p style={styles.ctaBody}>
            All enquiries are handled with absolute confidentiality. Share your
            event brief, timeline, and expected scale — we will respond with a
            strategic proposal within 24 hours.
          </p>
          <div style={styles.ctaBtnRow}>
            <button
              style={styles.ctaBtnPrimary}
              onClick={() => navigate("/contact")}
            >
              Request a Consultation <IcoArrow />
            </button>
            <button
              style={styles.ctaBtnOutline}
              onClick={() => navigate("/works")}
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
