import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
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
    icon: "🎬",
    title: "Commercial Video Production",
    desc: "High-impact brand commercials, product launches, and campaign films shot and edited to broadcast quality by our full in-house production crew.",
  },
  {
    icon: "📸",
    title: "Brand & Product Photography",
    desc: "Editorial and commercial photography that brings products and brands to life — crisp, consistent, and ready for web, print, and social media.",
  },
  {
    icon: "🎙️",
    title: "Corporate Video & Interviews",
    desc: "Executive interviews, testimonial reels, company culture films, and conference coverage — professional, natural, and on-brand.",
  },
  {
    icon: "📱",
    title: "Social Media Content Creation",
    desc: "Short-form video reels, TikToks, Instagram Stories, and platform-native content designed to stop thumbs and drive engagement at scale.",
  },
  {
    icon: "🎞️",
    title: "Documentary & Storytelling",
    desc: "Long-form narrative films, brand documentaries, and human-interest stories told with cinematic craft and genuine emotional resonance.",
  },
  {
    icon: "🏠",
    title: "Real Estate & Architecture",
    desc: "Architectural photography, drone aerials, walk-through tours, and twilight shoots that showcase properties in their absolute best light.",
  },
  {
    icon: "✂️",
    title: "Post-Production & Editing",
    desc: "Professional colour grading, motion graphics, sound design, subtitles, and full post-production from raw footage to final delivery.",
  },
  {
    icon: "🚁",
    title: "Aerial & Drone Cinematography",
    desc: "Licensed drone operators delivering stunning aerial photography and cinematic footage that adds perspective and production value to any project.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Creative Brief",
    desc: "We start by understanding your vision, audience, goals, tone, and technical requirements — translating the brief into a detailed creative treatment.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    step: "02",
    title: "Pre-Production",
    desc: "Shot list, storyboard, location scouting, casting, equipment prep, call sheets, and timeline — everything planned to ensure the shoot runs flawlessly.",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
  {
    step: "03",
    title: "Production Day",
    desc: "Our full crew on location — director, DOP, lighting, sound, and styling — executing the creative vision with professional precision and calm control.",
    img: "https://images.unsplash.com/photo-1577190651915-bf62d54d5b36?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    step: "04",
    title: "Post-Production",
    desc: "Editing, colour grading, sound design, motion graphics, VFX, and delivery in every format — from 4K broadcast masters to compressed social cuts.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    step: "05",
    title: "Review & Revisions",
    desc: "Structured review rounds through an online approval platform. You mark up changes directly on the video — clear, fast, and professional.",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
  },
  {
    step: "06",
    title: "Delivery & Licensing",
    desc: "Final assets delivered via cloud in all agreed formats, with full commercial usage rights. Archival raw footage retained for future projects.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

const EQUIPMENT = [
  {
    category: "Cameras",
    items: ["Sony FX9", "Sony FX3", "Canon EOS R5", "DJI Ronin 4D"],
  },
  {
    category: "Lenses",
    items: [
      "Sony G Master",
      "Sigma Art Series",
      "Canon L Series",
      "Zeiss Otus",
    ],
  },
  {
    category: "Lighting",
    items: ["ARRI SkyPanel", "Aputure 600D", "Godox AD600", "Dedolight"],
  },
  {
    category: "Audio",
    items: [
      "Sennheiser MKH 416",
      "Rode NTG5",
      "Sound Devices MixPre",
      "DPA Lavs",
    ],
  },
  {
    category: "Stabilisation",
    items: ["DJI RS 3 Pro", "Tiffen Steadicam", "Syrp Genie", "Freefly MōVI"],
  },
  {
    category: "Aerial",
    items: ["DJI Mavic 3 Pro", "DJI Air 3", "DJI FPV", "CAA Licensed Pilots"],
  },
];

const TESTIMONIALS = [
  {
    name: "Fatima Al-Rashidi",
    role: "Marketing Director, Aurum Jewellery",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    quote:
      "The campaign photography they produced was absolutely stunning. Our website traffic increased by 60% after the rebrand, and we've received constant compliments from customers and industry peers alike. Genuinely world-class work.",
  },
  {
    name: "Marcus Webb",
    role: "CEO, Nexus Consulting",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    quote:
      "We needed a corporate brand film that represented who we really are — not corporate stock footage, but something authentic and compelling. They nailed it. Dozens of clients have commented on how much the film impresses them.",
  },
  {
    name: "Kavya Reddy",
    role: "Brand Manager, FitCo",
    avatar: "https://i.pravatar.cc/80?img=20",
    rating: 5,
    quote:
      "Our social media content was inconsistent and low quality before we started working with this team. Now every reel, every post looks premium. Our engagement rate has tripled and follower growth has been incredible.",
  },
];

const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "For standard shoots, we recommend booking 2–3 weeks in advance. For larger productions requiring extensive pre-production, location scouting, or casting, 4–8 weeks is ideal. We do accommodate urgent requests where our schedule allows.",
  },
  {
    q: "Do you provide all equipment and crew?",
    a: "Yes — we bring everything. Our productions are fully self-sufficient: cameras, lenses, lighting, audio, stabilisation, and a complete crew. You don't need to organise anything on the technical side. For large-scale productions we also manage location permits and insurance.",
  },
  {
    q: "What is included in post-production?",
    a: "Our standard post-production includes editing, colour grading, sound mixing, and export in all agreed formats. More comprehensive packages include motion graphics, title sequences, sound design, and music licensing. We'll agree on the full scope during pre-production.",
  },
  {
    q: "Who owns the footage and final deliverables?",
    a: "You receive full commercial usage rights to all final delivered assets. We retain the raw footage in our archive for 12 months, allowing us to produce additional edits if you need them. Usage rights for music and licensed assets are included in the project cost.",
  },
  {
    q: "Can you shoot internationally or on location outside the city?",
    a: "Yes. We travel for productions regularly, both domestically and internationally. Travel costs (flights, accommodation, equipment logistics) are quoted separately and transparently. We've shot across 15+ countries.",
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
    position: "relative",
    overflow: "hidden",
    minHeight: 680,
    display: "flex",
    alignItems: "center",
    marginTop: 90,
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
      "linear-gradient(105deg, rgba(10,6,0,0.96) 0%, rgba(10,6,0,0.82) 55%, rgba(10,6,0,0.5) 100%)",
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
    background: "rgba(207,150,69,0.15)",
    border: "1px solid rgba(207,150,69,0.3)",
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
    fontWeight: 700,
    color: T.white,
    lineHeight: 1.08,
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

  /* ── HERO RIGHT — IMAGE COLLAGE ── */
  heroImageCollage: {
    position: "relative",
    height: 420,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  heroImgRow1: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "0.75rem",
    flex: "0 0 55%",
  },
  heroImgRow2: {
    display: "grid",
    gridTemplateColumns: "1fr 1.6fr",
    gap: "0.75rem",
    flex: "0 0 43%",
  },
  heroCollageImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: T.radius.lg,
    border: "2px solid rgba(207,150,69,0.25)",
  },
  heroCollageOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(207,150,69,0.06) 0%, transparent 60%)",
    borderRadius: T.radius.lg,
    pointerEvents: "none",
  },
  heroCollageBadge: {
    position: "absolute",
    bottom: -12,
    left: "50%",
    transform: "translateX(-50%)",
    background: T.gold,
    color: T.white,
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "6px 18px",
    borderRadius: 100,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 16px rgba(207,150,69,0.45)",
  },

  /* ── REEL STRIP ── */
  reelStrip: {
    background: T.dark,
    padding: "2rem 0",
    borderBottom: "1px solid rgba(207,150,69,0.12)",
    overflow: "hidden",
  },
  reelInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    gap: "2.5rem",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  reelItem: { display: "flex", alignItems: "center", gap: 8 },
  reelDot: { width: 6, height: 6, borderRadius: "50%", background: T.gold },
  reelText: {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.5)",
    fontWeight: 500,
    letterSpacing: "0.04em",
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.8rem",
    lineHeight: 1.12,
  },
  titleAccent: { color: T.gold },
  sectionSub: {
    fontSize: "0.92rem",
    color: T.textMuted,
    maxWidth: 560,
    margin: "0 auto",
    lineHeight: 1.75,
  },

  /* ── ABOUT ── */
  aboutBg: {
    background: T.white,
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
    height: 490,
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
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1rem 1.2rem",
    boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
    border: `1.5px solid ${T.goldBorder}`,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  aboutBadgeNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  aboutBadgeLabel: {
    fontSize: "0.76rem",
    color: T.textMid,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  aboutP: {
    fontSize: "0.93rem",
    color: T.textMid,
    lineHeight: 1.85,
    margin: "0 0 1.1rem",
  },
  aboutPullQuote: {
    background: T.goldLight,
    borderLeft: `4px solid ${T.gold}`,
    borderRadius: `0 ${T.radius.md}px ${T.radius.md}px 0`,
    padding: "1rem 1.3rem",
    margin: "1.5rem 0",
    fontSize: "0.94rem",
    color: T.textMid,
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
    color: T.textMid,
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
    background: T.goldLight,
    borderRadius: T.radius.md,
    border: `1px solid ${T.goldBorder}`,
  },
  aboutStatNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.9rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  aboutStatLabel: {
    fontSize: "0.71rem",
    color: T.textMuted,
    letterSpacing: "0.07em",
    marginTop: 3,
  },

  /* ── SERVICES ── */
  servicesBg: {
    background: `linear-gradient(180deg, ${T.bg} 0%, #f0e8dc 100%)`,
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
    background: T.white,
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
    background: T.goldLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.9rem",
    fontSize: "1.3rem",
    border: `1px solid ${T.goldBorder}`,
  },
  serviceTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.45rem",
  },
  serviceDesc: { fontSize: "0.81rem", color: T.textMuted, lineHeight: 1.7 },
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
    gridAutoRows: "260px",
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
    background:
      "linear-gradient(to top, rgba(10,6,0,0.88) 0%, transparent 60%)",
    opacity: 0,
    transition: "opacity 0.35s",
  },
  portfolioMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.3rem 1.2rem",
    transform: "translateY(8px)",
    transition: "transform 0.35s",
  },
  portfolioTypeBadge: {
    display: "inline-block",
    background: T.gold,
    color: T.white,
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 3,
    marginBottom: 6,
  },
  portfolioTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: T.white,
    margin: 0,
  },
  portfolioPlayBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%) scale(0.8)",
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(207,150,69,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.35s, transform 0.35s",
  },

  /* ── PROCESS ── */
  processBg: {
    background: T.goldLight,
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
    background: T.white,
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 4,
  },
  processBody: { padding: "1.3rem 1.5rem 1.6rem" },
  processTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.45rem",
  },
  processDesc: { fontSize: "0.82rem", color: T.textMuted, lineHeight: 1.7 },

  /* ── EQUIPMENT ── */
  equipmentBg: { background: T.dark, padding: "5rem 0" },
  equipmentGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.3rem",
  },
  equipCard: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: T.radius.lg,
    padding: "1.6rem 1.5rem",
    border: "1px solid rgba(207,150,69,0.15)",
    transition: "border-color 0.22s, background 0.22s",
  },
  equipCategory: {
    fontSize: "0.67rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "0.9rem",
    paddingBottom: "0.6rem",
    borderBottom: "1px solid rgba(207,150,69,0.15)",
  },
  equipItemRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  equipDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: T.gold,
    flexShrink: 0,
  },
  equipItemText: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.55)",
    fontWeight: 500,
  },

  /* ── TESTIMONIALS ── */
  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  tCard: {
    background: T.white,
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
    color: T.textMid,
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
  tRole: { fontSize: "0.73rem", color: T.textMuted, marginTop: 1 },

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
      "radial-gradient(circle, rgba(207,150,69,0.08) 0%, transparent 70%)",
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
    border: "1px solid rgba(207,150,69,0.15)",
  },
  pkgCardHL: {
    background: "rgba(207,150,69,0.12)",
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: T.white,
    marginBottom: 4,
  },
  pkgPrice: {
    fontFamily: "'Cormorant Garamond', serif",
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
    background: "rgba(207,150,69,0.15)",
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
    background: "rgba(207,150,69,0.2)",
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
    fontFamily: "'DM Sans', sans-serif",
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
    border: "1px solid rgba(207,150,69,0.25)",
    borderRadius: T.radius.sm,
    fontFamily: "'DM Sans', sans-serif",
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
    background: T.white,
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
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.92rem",
    fontWeight: 600,
    color: T.text,
    cursor: "pointer",
    textAlign: "left",
    gap: "1rem",
  },
  faqA: {
    padding: "1rem 1.4rem 1.2rem",
    fontSize: "0.87rem",
    color: T.textMuted,
    lineHeight: 1.75,
    borderTop: `1px solid ${T.goldBorder}`,
  },

  /* ── CTA ── */
  ctaBg: {
    background: `linear-gradient(135deg, ${T.darkMid} 0%, ${T.darkSoft} 100%)`,
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
  ctaInner: { position: "relative", maxWidth: 600, margin: "0 auto" },
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
const IcoPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <polygon points="5 3 19 12 5 21 5 3" />
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

function PortfolioCard({ item }) {
  const [hov, setHov] = useState(false);
  const isVideo =
    item.type === "Video" ||
    item.type === "Corporate" ||
    item.type === "Social Media" ||
    item.type === "Documentary";
  return (
    <div
      style={{
        ...styles.portfolioCard,
        ...(item.span === 2 ? { gridColumn: "span 2" } : {}),
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={item.img}
        alt={`${item.title} — ${item.type} production by our studio`}
        style={{
          ...styles.portfolioImg,
          transform: hov ? "scale(1.06)" : "scale(1)",
        }}
        loading="lazy"
        decoding="async"
      />
      <div style={{ ...styles.portfolioGradient, opacity: hov ? 1 : 0.5 }} />
      {isVideo && (
        <div
          style={{
            ...styles.portfolioPlayBtn,
            opacity: hov ? 1 : 0,
            transform: hov
              ? "translate(-50%,-50%) scale(1)"
              : "translate(-50%,-50%) scale(0.8)",
          }}
        >
          <IcoPlay />
        </div>
      )}
      <div
        style={{
          ...styles.portfolioMeta,
          transform: hov ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <span style={styles.portfolioTypeBadge}>{item.type}</span>
        <div style={styles.portfolioTitle}>{item.title}</div>
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
          alt={`Step ${step.step}: ${step.title} — photo and video production process`}
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

function EquipCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.equipCard,
        borderColor: hov ? "rgba(207,150,69,0.35)" : "rgba(207,150,69,0.15)",
        background: hov ? "rgba(207,150,69,0.08)" : "rgba(255,255,255,0.04)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.equipCategory}>{item.category}</div>
      {item.items.map((tool) => (
        <div key={tool} style={styles.equipItemRow}>
          <div style={styles.equipDot} />
          <span style={styles.equipItemText}>{tool}</span>
        </div>
      ))}
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

export default function PhotoVideoService() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      {/* ══ SEO HELMET ══ */}
      <Helmet>
        <title>
          Professional Photo & Video Production Services | Cinematic Brand
          Storytelling
        </title>
        <meta
          name="description"
          content="Award-winning photo and video production studio. Brand films, commercial photography, drone aerials, corporate video, social content, and full post-production. 600+ productions delivered across 15+ countries."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Photo & Video Production Studio" />
        <link
          rel="canonical"
          href="https://technosagainfotech.in/services/photo-video-production"
        />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; grid-auto-rows: 220px !important; }
          .equipment-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
          .hero-image-collage { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-sec { display: none !important; }
          .about-badge { left: 12px !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 200px !important; }
          .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .services-grid, .process-grid, .testimonial-grid, .pkg-grid, .equipment-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; }
          .section-wrap { padding: 3rem 1.2rem !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=80"
          alt="Professional video production crew filming a cinematic brand commercial on location"
          style={styles.heroBgImg}
          // Hero BG is LCP image — intentionally NOT lazy loaded
          decoding="async"
        />
        <div style={styles.heroBgOverlay} />
        <div style={styles.heroInner} className="hero-inner">
          {/* LEFT — Copy */}
          <div>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot} />
              <span style={styles.heroBadgeText}>Photo & Video Production</span>
            </div>
            <h1 style={styles.heroTitle}>
              Visuals That Make
              <br />
              Your Audience <span style={styles.heroAccent}>Feel</span>
              <br />
              Before They Think.
            </h1>
            <p style={styles.heroBody}>
              Cinematic photography and video production that captures the
              essence of your brand — crafted with professional precision,
              creative vision, and the storytelling power to move people.
            </p>
            <div style={styles.heroCTARow}>
              <button
                style={styles.heroBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Book a Shoot <IcoArrow />
              </button>
              <button
                style={styles.heroBtnOutline}
                onClick={() => navigate("/works")}
              >
                View Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT — Cinematic Image Collage */}
          <div style={styles.heroImageCollage} className="hero-image-collage">
            {/* Row 1 */}
            <div style={styles.heroImgRow1}>
              <div
                style={{
                  position: "relative",
                  borderRadius: T.radius.lg,
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1497015289639-54688650d173?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Cinematographer operating a Sony cinema camera during a brand film shoot"
                  style={styles.heroCollageImg}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div
                style={{
                  position: "relative",
                  borderRadius: T.radius.lg,
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&q=80"
                  alt="Production team reviewing storyboard during video pre-production planning"
                  style={styles.heroCollageImg}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            {/* Row 2 */}
            <div style={styles.heroImgRow2}>
              <div
                style={{
                  position: "relative",
                  borderRadius: T.radius.lg,
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=500&q=80"
                  alt="Professional video post-production editing suite with colour grading monitors"
                  style={styles.heroCollageImg}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div
                style={{
                  position: "relative",
                  borderRadius: T.radius.lg,
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1611784728558-6c7d9b409cdf?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Drone aerial cinematography capturing sweeping landscape footage for a brand campaign"
                  style={styles.heroCollageImg}
                  loading="eager"
                  decoding="async"
                />
                {/* Gold badge overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "rgba(10,6,0,0.75)",
                    border: `1px solid ${T.gold}`,
                    borderRadius: T.radius.md,
                    padding: "6px 12px",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: T.gold,
                      lineHeight: 1,
                    }}
                  >
                    600+
                  </div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.08em",
                      marginTop: 2,
                    }}
                  >
                    PRODUCTIONS
                  </div>
                </div>
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
              src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Full production crew setting up cinema lighting rigs on a professional brand film set"
              style={styles.aboutImgMain}
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80"
              alt="Close-up of professional cinema camera lens and follow focus system on a film rig"
              style={styles.aboutImgSecondary}
              className="about-img-sec"
              loading="lazy"
              decoding="async"
            />
            <div style={styles.aboutFloatBadge} className="about-badge">
              <div>
                <div style={styles.aboutBadgeNum}>600+</div>
                <div style={styles.aboutBadgeLabel}>
                  Productions
                  <br />
                  Delivered
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
              What Is{" "}
              <span style={styles.titleAccent}>
                Professional Photo &<br />
                Video Production?
              </span>
            </h2>
            <p style={styles.aboutP}>
              Professional photo and video production is the craft of creating
              high-quality visual content using broadcast-grade equipment,
              skilled crew, and a proven creative process. It is what separates
              brands that look premium from brands that look ordinary — and in a
              world of infinite content, the difference between the two is
              everything.
            </p>
            <p style={styles.aboutP}>
              Whether you need a stunning campaign that stops people mid-scroll,
              a corporate film that builds investor confidence, a product shoot
              that drives online conversions, or a documentary that builds your
              brand story — we have the team, the equipment, and the creative
              vision to deliver it.
            </p>
            <div style={styles.aboutPullQuote}>
              "Great production isn't about having the most expensive camera —
              it's about knowing what story you're telling and having the craft
              to tell it compellingly."
            </div>
            <div style={styles.aboutChecks}>
              {[
                "Full in-house crew — director, DOP, sound, lighting, and styling",
                "Sony Cinema Line cameras shooting in 4K/6K with RAW capability",
                "Licensed drone pilots for aerial photography and cinematography",
                "Complete post-production — editing, colour grade, sound design, graphics",
                "Delivery in every format — broadcast, web, social, and archival masters",
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
            What We Produce
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            8 Production Services,{" "}
            <span style={styles.titleAccent}>One Creative Vision</span>
          </h2>
          <p style={styles.sectionSub}>
            From concept to final cut — every type of photography and video
            content, handled by our in-house production team with
            professional-grade equipment.
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
            From Brief to <span style={styles.titleAccent}>Final Delivery</span>
          </h2>
          <p style={styles.sectionSub}>
            A structured production process that ensures exceptional results
            every time — collaborative, transparent, and creatively exciting
            from start to finish.
          </p>
        </div>
        <div style={styles.processGrid} className="process-grid">
          {PROCESS.map((step) => (
            <ProcessCard key={step.step} step={step} />
          ))}
        </div>
      </div>

      {/* ══ EQUIPMENT ══ */}
      <div style={styles.equipmentBg}>
        <div
          style={{
            ...styles.sectionHeader,
            padding: "0 2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ ...styles.eyebrow, color: T.gold }}>
            <div style={styles.eyebrowLine} />
            Our Kit
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={{ ...styles.sectionTitle, color: T.white }}>
            Professional <span style={styles.titleAccent}>Grade Equipment</span>
          </h2>
          <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
            We own and operate our entire equipment inventory — Sony Cinema
            Line, broadcast audio, professional lighting, and CAA-licensed
            drones.
          </p>
        </div>
        <div style={styles.equipmentGrid} className="equipment-grid">
          {EQUIPMENT.map((item) => (
            <EquipCard key={item.category} item={item} />
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
            What Our <span style={styles.titleAccent}>Clients Say</span>
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
                  alt={`${t.name}, ${t.role} — client testimonial`}
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
          <div style={styles.ctaEyebrow}>Lights. Camera. Action.</div>
          <h2 style={styles.ctaTitle}>
            Ready to Create Something{" "}
            <span style={styles.titleAccent}>Truly Unforgettable?</span>
          </h2>
          <p style={styles.ctaBody}>
            Tell us about your project — the vision, the scale, the deadline.
            We'll come back with a creative treatment and transparent quote
            within 48 hours.
          </p>
          <div style={styles.ctaBtnRow}>
            <button
              style={styles.ctaBtnPrimary}
              onClick={() => navigate("/contact")}
            >
              Book a Shoot <IcoArrow />
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
