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
    icon: "🎥",
    title: "Multi-Camera Live Production",
    desc: "Professional multi-camera setups with live switching, transitions, lower thirds, and broadcast-quality direction for any event scale.",
  },
  {
    icon: "🌐",
    title: "Platform Streaming",
    desc: "Simultaneous streaming to YouTube, Facebook, Instagram, LinkedIn, Zoom, Webex, and custom RTMP destinations — all from one production.",
  },
  {
    icon: "🏟️",
    title: "Large Event Live Streaming",
    desc: "Stadium-scale production for concerts, political rallies, conferences, and public events reaching audiences of thousands to millions.",
  },
  {
    icon: "💼",
    title: "Corporate & Hybrid Events",
    desc: "Seamless hybrid event production — connecting in-person audiences with remote participants through high-quality, interactive streaming.",
  },
  {
    icon: "📡",
    title: "Remote & Satellite Streaming",
    desc: "Field production units for breaking news, on-location coverage, and remote broadcasts from anywhere with reliable 4G/5G or satellite uplinks.",
  },
  {
    icon: "🎓",
    title: "Webinar & Online Events",
    desc: "Interactive webinar production with Q&A moderation, polls, breakout rooms, speaker management, and professional broadcast overlays.",
  },
  {
    icon: "🕌",
    title: "Religious & Cultural Events",
    desc: "Respectful, professional live coverage of Friday prayers, religious ceremonies, festivals, and cultural gatherings for global communities.",
  },
  {
    icon: "✂️",
    title: "Post-Production & VOD",
    desc: "Edited highlight reels, full event recordings, on-demand video publishing, and chapter-marked archives delivered post-broadcast.",
  },
];

const PLATFORMS = [
  { name: "YouTube Live", color: "#FF0000", abbr: "YT" },
  { name: "Facebook Live", color: "#1877F2", abbr: "FB" },
  { name: "Instagram Live", color: "#E1306C", abbr: "IG" },
  { name: "LinkedIn Live", color: "#0077B5", abbr: "LI" },
  { name: "Zoom Webinar", color: "#2D8CFF", abbr: "ZM" },
  { name: "Twitch", color: "#9146FF", abbr: "TW" },
  { name: "Custom RTMP", color: "#CF9645", abbr: "RT" },
  { name: "OTT / CDN", color: "#2e1f08", abbr: "OT" },
];

const PROCESS = [
  {
    step: "01",
    title: "Production Brief",
    desc: "We discuss your event, audience, platform requirements, expected viewer numbers, graphics needs, and any special technical requirements before planning begins.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    step: "02",
    title: "Technical Setup",
    desc: "Camera placement, encoder configuration, platform setup, graphics and lower thirds preparation, internet redundancy testing, and full dry-run before the event.",
    img: "https://plus.unsplash.com/premium_photo-1664910156787-46ecdd765f4b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    step: "03",
    title: "Pre-Show Testing",
    desc: "Full end-to-end stream test 2–4 hours before broadcast — confirming video quality, audio levels, platform connectivity, and backup systems are all ready.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    step: "04",
    title: "Live Broadcast",
    desc: "Our director manages the live feed in real time — switching cameras, adding graphics, monitoring stream health, and responding instantly to any technical issue.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
  },
  {
    step: "05",
    title: "Monitoring & Support",
    desc: "Dedicated technical monitor watching bitrate, latency, and viewer engagement throughout the broadcast — with backup hardware and uplinks on standby.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  },
  {
    step: "06",
    title: "VOD & Archive",
    desc: "Full broadcast recording, edited highlight packages, platform VOD publishing, and a downloadable archive of all stream assets delivered within 24 hours.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
];

const EQUIPMENT = [
  {
    category: "Cameras",
    items: [
      "Sony FX9 (4K)",
      "Sony FX3",
      "PTZ Remote Cameras",
      "GoPro Action Cams",
    ],
  },
  {
    category: "Encoders",
    items: [
      "Blackmagic ATEM Mini Pro",
      "vMix Pro",
      "OBS Studio",
      "Haivision Makito",
    ],
  },
  {
    category: "Networking",
    items: [
      "4G/5G Bonded Uplinks",
      "Starlink Satellite",
      "Dedicated Fibre",
      "VLAN Redundancy",
    ],
  },
  {
    category: "Audio",
    items: [
      "Yamaha QL5 Mixer",
      "Sennheiser IEM Systems",
      "DI Boxes",
      "Lavalier Arrays",
    ],
  },
  {
    category: "Graphics",
    items: [
      "CasparCG Graphics",
      "Lower Thirds Templates",
      "Chyron Lyric",
      "Viz Engine",
    ],
  },
  {
    category: "Monitoring",
    items: [
      "Wowza Streaming Engine",
      "StreamShark CDN",
      "Bitrate Alerts",
      "4K Preview Monitors",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Minister Qasim",
    role: "Event Director — National Political Rally",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    quote:
      "2.8 million people watched our rally live. The stream was completely uninterrupted for 4 hours across YouTube and Facebook simultaneously. The production quality, graphics, and directorial work were indistinguishable from a national broadcaster. Extraordinary.",
  },
  {
    name: "Dr. Sarah Collins",
    role: "Conference Director — International Tech Summit",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    quote:
      "120,000 registered attendees from 45 countries joined our hybrid summit. The team managed the technical complexity flawlessly — seamless transitions between in-person and remote speakers, interactive Q&A, and zero dropped connections.",
  },
  {
    name: "Amara Khan",
    role: "Producer — Arena Rock Concert",
    avatar: "https://i.pravatar.cc/80?img=20",
    rating: 5,
    quote:
      "Streaming a 12,000-capacity live concert with dynamic lighting, crowd shots, and artist close-ups in 4K takes skill. Our audience watching at home said it felt like being there. The switching speed and camera direction were exceptional.",
  },
];

const FAQS = [
  {
    q: "What internet speed is required for a live stream?",
    a: "For a quality 1080p stream, we recommend a minimum upload speed of 10Mbps dedicated to the stream. For 4K, we need 20–25Mbps. For large events where venue internet isn't reliable, we bring our own 4G/5G bonded uplinks and satellite connections as backup — your stream will not drop.",
  },
  {
    q: "Can you stream to multiple platforms at the same time?",
    a: "Yes. We stream simultaneously to as many platforms as required — YouTube, Facebook, Instagram, LinkedIn, Zoom, and any custom RTMP endpoint. Our Professional package handles 4 platforms simultaneously, and our Broadcast package has no limit.",
  },
  {
    q: "What happens if the internet drops during the stream?",
    a: "We build redundancy into every professional broadcast. We run a primary uplink and a fully independent backup uplink simultaneously. Our encoder automatically switches to the backup within seconds of any primary failure. In our history of live productions, we have never experienced a total stream failure.",
  },
  {
    q: "Can you add graphics, lower thirds, and branding to the stream?",
    a: "Yes — every stream we produce includes custom branded graphics. We create lower thirds, intro/outro animations, full-screen titles, score bugs, sponsor overlays, and any other graphic element you need. For large events, we use professional graphics engines like CasparCG and Chyron.",
  },
  {
    q: "Do you provide the recording after the stream?",
    a: "Yes. Every stream is recorded in full at the highest available quality. After the broadcast, we deliver the full recording, an edited highlight reel if requested, and publish the VOD to your chosen platforms. Recordings are typically delivered within 24 hours of broadcast end.",
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
    minHeight: 680,
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
      "linear-gradient(105deg, rgba(10,6,0,0.97) 0%, rgba(10,6,0,0.85) 55%, rgba(10,6,0,0.45) 100%)",
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
  heroLivePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(220,38,38,0.2)",
    border: "1px solid rgba(220,38,38,0.4)",
    borderRadius: 100,
    padding: "4px 12px 4px 8px",
    marginBottom: "1.2rem",
    marginLeft: 8,
  },
  heroLiveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#ef4444",
    display: "inline-block",
    animation: "pulse 1.5s infinite",
  },
  heroLiveText: {
    fontSize: "0.7rem",
    color: "#fca5a5",
    letterSpacing: "0.14em",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
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

  /* ── HERO RIGHT IMAGE ── */
  heroRight: {
    position: "relative",
    height: 420,
    borderRadius: T.radius.xl,
    overflow: "hidden",
  },
  heroRightImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: T.radius.xl,
  },
  heroRightOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,6,0,0.80) 0%, rgba(10,6,0,0.08) 55%)",
    borderRadius: T.radius.xl,
  },
  heroRightCornerTag: {
    position: "absolute",
    top: "1.2rem",
    right: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(220,38,38,0.88)",
    color: T.white,
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: 4,
  },
  heroRightCornerDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#121826",
    flexShrink: 0,
    animation: "pulse 1.5s infinite",
  },
  heroRightBadgeRow: {
    position: "absolute",
    bottom: "1.5rem",
    left: "1.5rem",
    right: "1.5rem",
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  heroRightBadge: {
    background: "rgba(212,175,55,0.18)",
    border: "1px solid rgba(212,175,55,0.35)",
    backdropFilter: "blur(6px)",
    borderRadius: 100,
    padding: "6px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroRightBadgeNum: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.3rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  heroRightBadgeLabel: {
    fontSize: "0.62rem",
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    marginTop: 2,
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
  aboutLiveBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "rgba(220,38,38,0.9)",
    borderRadius: T.radius.sm,
    padding: "5px 12px",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  aboutLiveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#fff",
  },
  aboutLiveText: {
    fontSize: "0.72rem",
    color: T.white,
    fontWeight: 700,
    letterSpacing: "0.1em",
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

  /* ── PLATFORMS ── */
  platformsBg: { background: T.dark, padding: "4rem 0" },
  platformsInner: { maxWidth: 1200, margin: "0 auto", padding: "0 2rem" },
  platformsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gap: "1rem",
    marginTop: "2.5rem",
  },
  platformCard: {
    borderRadius: T.radius.md,
    padding: "1.1rem 0.6rem",
    textAlign: "center",
    border: "1px solid rgba(212,175,55,0.12)",
    transition: "border-color 0.2s, transform 0.2s",
  },
  platformAbbr: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: 5,
    display: "block",
  },
  platformName: {
    fontSize: "0.68rem",
    color: "rgba(255,255,255,0.4)",
    fontWeight: 500,
    lineHeight: 1.3,
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
    background: "linear-gradient(to top, rgba(10,6,0,0.9) 0%, transparent 55%)",
    transition: "opacity 0.3s",
  },
  portfolioLiveBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "rgba(220,38,38,0.85)",
    borderRadius: 4,
    padding: "3px 8px",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  portfolioLiveDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#121826",
  },
  portfolioLiveText: {
    fontSize: "0.58rem",
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
  portfolioTypePill: {
    display: "inline-block",
    background: T.gold,
    color: T.white,
    fontSize: "0.58rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 3,
    marginBottom: 5,
  },
  portfolioTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 2px",
  },
  portfolioViewers: { fontSize: "0.73rem", color: T.gold, fontWeight: 600 },

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

  /* ── EQUIPMENT ── */
  equipmentBg: { background: T.dark, padding: "5rem 0" },
  equipGrid: {
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
    border: "1px solid rgba(212,175,55,0.15)",
    transition: "border-color 0.22s, background 0.22s",
  },
  equipCat: {
    fontSize: "0.67rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "0.9rem",
    paddingBottom: "0.6rem",
    borderBottom: "1px solid rgba(212,175,55,0.15)",
  },
  equipRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
  equipDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: T.gold,
    flexShrink: 0,
  },
  equipText: {
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
    background: `linear-gradient(135deg, ${T.darkMid} 0%, ${T.darkSoft} 100%)`,
    padding: "5rem 2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  ctaInner: { position: "relative", maxWidth: 640, margin: "0 auto" },
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
          alt={`Step ${step.step}: ${step.title} — live streaming production process`}
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
        borderColor: hov ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.15)",
        background: hov ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.04)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.equipCat}>{item.category}</div>
      {item.items.map((tool) => (
        <div key={tool} style={styles.equipRow}>
          <div style={styles.equipDot} />
          <span style={styles.equipText}>{tool}</span>
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

export default function LiveStreaming() {
  return (
    <div style={{...styles.page, background:"#0B0F1A", fontFamily:"'Poppins', sans-serif", paddingTop: 72}}>
      {/* ══ SEO HELMET ══ */}
      <Helmet>
        <title>
          Professional Live Streaming Services | Multi-Camera, Multi-Platform
          Broadcasting
        </title>
        <meta
          name="description"
          content="Broadcast-quality live streaming for corporate events, concerts, political rallies, webinars, and large-scale productions. Simultaneous multi-platform delivery with 99.9% uptime and 50M+ viewers reached."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://yourwebsite.com/services/live-streaming"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media (max-width: 1024px) {
          .platforms-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; grid-auto-rows: 220px !important; }
          .equip-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
          .hero-right-img { height: 280px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-sec { display: none !important; }
          .about-badge { left: 12px !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 200px !important; }
          .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .platforms-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .services-grid, .process-grid, .testimonial-grid, .pkg-grid, .equip-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; }
          .platforms-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .section-wrap { padding: 3rem 1.2rem !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80"
          alt="Professional live streaming production setup with multiple monitors and broadcast equipment"
          style={styles.heroBgImg}
          loading="eager"
          fetchpriority="high"
          decoding="sync"
        />
        <div style={styles.heroBgOverlay} />
        <div style={styles.heroInner} className="hero-inner">
          {/* LEFT — copy */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: "1.2rem",
                flexWrap: "wrap",
              }}
            >
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} />
                <span style={styles.heroBadgeText}>Live Streaming</span>
              </div>
              <div style={styles.heroLivePill}>
                <span
                  style={{
                    ...styles.heroLiveDot,
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span style={styles.heroLiveText}>ON AIR</span>
              </div>
            </div>
            <h1 style={styles.heroTitle}>
              Your Audience Is
              <br />
              Everywhere. <span style={styles.heroAccent}>Reach</span>
              <br />
              All of Them Live.
            </h1>
            <p style={styles.heroBody}>
              Broadcast-quality live streaming for events of every scale — from
              corporate webinars to national political rallies. Multi-camera
              production, simultaneous multi-platform delivery, and zero-failure
              reliability.
            </p>
            <div style={styles.heroCTARow}>
              <button style={styles.heroBtnPrimary}>
                Book a Stream <IcoArrow />
              </button>
              <button style={styles.heroBtnOutline}>View Productions</button>
            </div>
          </div>

          {/* RIGHT — feature image */}
          <div style={styles.heroRight} className="hero-right-img">
            <img
              src="https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Multi-camera live broadcast control room with director managing screens and live feed switching"
              style={styles.heroRightImg}
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div style={styles.heroRightOverlay} />
            <div style={styles.heroRightCornerTag}>
              <span style={styles.heroRightCornerDot} />
              On Air
            </div>
          </div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <div style={styles.aboutBg}>
        <div style={styles.aboutGrid} className="about-grid">
          <div style={styles.aboutImgCol}>
            <img
              src="https://images.unsplash.com/photo-1641077818264-e09d3b9b4d3e?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Live streaming director operating a professional multi-camera broadcast switcher"
              style={styles.aboutImgMain}
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80"
              alt="Stream health monitoring dashboard showing bitrate and viewer analytics in real time"
              style={styles.aboutImgSecondary}
              className="about-img-sec"
              loading="lazy"
              decoding="async"
            />
            <div style={styles.aboutLiveBadge}>
              <div style={styles.aboutLiveDot} />
              <span style={styles.aboutLiveText}>LIVE</span>
            </div>
            <div style={styles.aboutFloatBadge} className="about-badge">
              <div>
                <div style={styles.aboutBadgeNum}>50M+</div>
                <div style={styles.aboutBadgeLabel}>
                  Total
                  <br />
                  Viewers Reached
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
                Professional
                <br />
                Live Streaming?
              </span>
            </h2>
            <p style={styles.aboutP}>
              Professional live streaming is the real-time broadcast of your
              event to online audiences through a managed, broadcast-quality
              production. Unlike consumer streaming, professional live streaming
              uses dedicated hardware, redundant internet connections,
              multi-camera switching, and broadcast-grade encoding to deliver an
              experience that matches — or exceeds — television quality.
            </p>
            <p style={styles.aboutP}>
              Whether you need to reach 500 remote employees, 50,000 concert
              fans, or 2 million rally viewers simultaneously, our team has the
              equipment, expertise, and reliability track record to deliver. We
              have never had a stream fail. That is not a boast — it is the
              result of obsessive preparation and redundant systems.
            </p>
            <div style={styles.aboutPullQuote}>
              "In live streaming, failure is not an option. Every broadcast we
              manage runs on primary systems, backup systems, and contingency
              systems — because your audience is watching."
            </div>
            <div style={styles.aboutChecks}>
              {[
                "Simultaneous streaming to 8 platforms from a single production",
                "4K UHD output with hardware and software encoding redundancy",
                "Bonded 4G/5G + satellite uplinks — never dependent on venue internet",
                "Custom branded graphics, lower thirds, and motion templates",
                "Full post-production and same-day VOD publishing included",
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
            What We Stream
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            8 Live Streaming <span style={styles.titleAccent}>Solutions</span>
          </h2>
          <p style={styles.sectionSub}>
            From single-camera webinars to full broadcast productions — every
            type of live streaming event handled by our professional production
            team.
          </p>
        </div>
        <div style={styles.servicesGrid} className="services-grid">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </div>

      {/* ══ PLATFORMS ══ */}
      <div style={styles.platformsBg}>
        <div style={styles.platformsInner}>
          <div style={{ ...styles.sectionHeader, marginBottom: 0 }}>
            <div style={{ ...styles.eyebrow, color: T.gold }}>
              <div style={styles.eyebrowLine} />
              Platforms
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={{ ...styles.sectionTitle, color: T.white }}>
              Stream to <span style={styles.titleAccent}>Every Platform</span>{" "}
              Simultaneously
            </h2>
          </div>
          <div style={styles.platformsGrid} className="platforms-grid">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                style={{
                  ...styles.platformCard,
                  background: `${p.color}18`,
                  borderColor: `${p.color}30`,
                }}
              >
                <span style={{ ...styles.platformAbbr, color: p.color }}>
                  {p.abbr}
                </span>
                <div style={styles.platformName}>{p.name}</div>
              </div>
            ))}
          </div>
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
            From Brief to <span style={styles.titleAccent}>Live on Air</span>
          </h2>
          <p style={styles.sectionSub}>
            A rigorous production process that leaves nothing to chance —
            because once you go live, there are no second takes.
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
            Broadcast-Grade <span style={styles.titleAccent}>Equipment</span>
          </h2>
          <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
            We own and operate every piece of kit in our inventory — camera,
            encoder, audio, networking, graphics, and monitoring systems for any
            broadcast.
          </p>
        </div>
        <div style={styles.equipGrid} className="equip-grid">
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
          <div style={styles.ctaEyebrow}>Go Live With Confidence</div>
          <h2 style={styles.ctaTitle}>
            Ready to{" "}
            <span style={styles.titleAccent}>
              Broadcast
              <br />
              to the World?
            </span>
          </h2>
          <p style={styles.ctaBody}>
            Tell us your event date, expected audience size, and preferred
            platforms. We'll respond within 24 hours with a production plan and
            transparent quote.
          </p>
          <div style={styles.ctaBtnRow}>
            <button style={styles.ctaBtnPrimary}>
              Book a Stream <IcoArrow />
            </button>
            <button style={styles.ctaBtnOutline}>View All Services</button>
          </div>
        </div>
      </div>
    </div>
  );
}
