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
    icon: "🏢",
    title: "Corporate Events",
    desc: "Conferences, product launches, AGMs, town halls, and corporate galas — executed with precision, professionalism, and brand consistency.",
  },
  {
    icon: "🎊",
    title: "Social & Private Events",
    desc: "Weddings, milestone celebrations, private parties, and family gatherings — designed around your vision and delivered with warmth and elegance.",
  },
  {
    icon: "🎤",
    title: "Concerts & Shows",
    desc: "Artist management, stage production, sound and lighting design, ticketing, crowd management, and post-show logistics for live entertainment.",
  },
  {
    icon: "🏛️",
    title: "Political & Public Events",
    desc: "Rallies, campaign events, public meetings, inaugurations, and government ceremonies managed with logistical mastery and security coordination.",
  },
  {
    icon: "🎓",
    title: "Seminars & Conferences",
    desc: "Academic, trade, and industry conferences with registration management, AV production, speaker coordination, and delegate engagement.",
  },
  {
    icon: "🏆",
    title: "Award Ceremonies",
    desc: "Gala nights, industry awards, and recognition events — from venue dressing and entertainment to trophies, certificates, and broadcast feeds.",
  },
  {
    icon: "🌿",
    title: "Exhibition & Expo Management",
    desc: "Trade shows, brand exhibitions, and product expos — full booth design, logistics, vendor coordination, and visitor experience management.",
  },
  {
    icon: "🚀",
    title: "Product & Brand Launches",
    desc: "Immersive launch events that generate media coverage, social buzz, and lasting audience impressions for new products and brand campaigns.",
  },
];

const EVENT_TYPES = [
  {
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
    title: "Corporate Conferences",
    attendees: "50–5,000+",
    highlight: "Brand-aligned",
  },
  {
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=80",
    title: "Gala Dinners & Awards",
    attendees: "100–1,000",
    highlight: "Black-tie standard",
  },
  {
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&q=80",
    title: "Concerts & Live Shows",
    attendees: "500–50,000+",
    highlight: "Full production",
  },
  {
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=700&q=80",
    title: "Political Rallies",
    attendees: "1,000–100K+",
    highlight: "Logistics mastery",
  },
  {
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80",
    title: "Weddings & Celebrations",
    attendees: "50–500",
    highlight: "Bespoke planning",
  },
  {
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&q=80",
    title: "Exhibitions & Expos",
    attendees: "200–10,000+",
    highlight: "End-to-end managed",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Vision & Brief",
    desc: "We begin with a detailed consultation to understand your event objectives, audience, budget, timeline, and the experience you want guests to have.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    step: "02",
    title: "Concept & Design",
    desc: "Creative theme development, venue selection, mood board presentation, and event design — all presented before a single booking is made.",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
  {
    step: "03",
    title: "Vendor & Venue Management",
    desc: "We source, negotiate, and manage every supplier — caterers, AV teams, florists, security, transport, and entertainment — under one contract.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    step: "04",
    title: "Logistics & Scheduling",
    desc: "Master run-of-show, floor plans, timeline management, and contingency planning — every minute of your event is scripted and rehearsed.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    step: "05",
    title: "On-Site Execution",
    desc: "Our on-site team manages every detail on the day — setup, guest management, technical direction, catering coordination, and real-time problem solving.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    step: "06",
    title: "Post-Event Review",
    desc: "Comprehensive post-event report with guest feedback, budget reconciliation, media coverage summary, and recommendations for your next event.",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
  },
];

const PORTFOLIO = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",
    title: "National Business Summit 2024",
    category: "Corporate Conference",
    guests: "2,500 guests",
    span: 2,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&q=80",
    title: "City Arena Live Concert",
    category: "Concert Production",
    guests: "12,000 attendees",
    span: 1,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=80",
    title: "Excellence Awards Gala Night",
    category: "Awards Ceremony",
    guests: "800 guests",
    span: 1,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80",
    title: "Sharma Grand Wedding",
    category: "Wedding & Celebration",
    guests: "350 guests",
    span: 1,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=700&q=80",
    title: "Regional Political Rally",
    category: "Political Event",
    guests: "25,000 attendees",
    span: 1,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&q=80",
    title: "International Trade Expo",
    category: "Exhibition",
    guests: "8,000 visitors",
    span: 2,
  },
];

const CAPABILITIES = [
  { icon: "🎙️", label: "PA & Sound Systems" },
  { icon: "💡", label: "Stage Lighting & LEDs" },
  { icon: "📹", label: "Live Video Production" },
  { icon: "🎆", label: "Special Effects & Pyro" },
  { icon: "🍽️", label: "Catering Management" },
  { icon: "🌺", label: "Décor & Floral Design" },
  { icon: "🛡️", label: "Security Coordination" },
  { icon: "🚌", label: "Transport & Logistics" },
  { icon: "📸", label: "Photography & Video" },
  { icon: "🎭", label: "Entertainment & Acts" },
  { icon: "🎟️", label: "Ticketing & RSVP" },
  { icon: "📡", label: "Live Streaming" },
];

const TESTIMONIALS = [
  {
    name: "Raza Khan",
    role: "CEO, Apex Group — Corporate Summit",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    quote:
      "We've hosted our annual summit with many agencies over the years. This team operated at a completely different level — meticulous planning, zero hiccups on the day, and 2,500 guests who genuinely loved every moment. They'll be our only choice going forward.",
  },
  {
    name: "Nadia Hussain",
    role: "Bride — Sharma Grand Wedding",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    quote:
      "I handed over every detail of my wedding and trusted them completely. They didn't just deliver my vision — they elevated it. Every guest told me it was the most beautiful event they had ever attended. I can never thank them enough.",
  },
  {
    name: "Commissioner Asif",
    role: "Event Director — Regional Political Rally",
    avatar: "https://i.pravatar.cc/80?img=68",
    rating: 5,
    quote:
      "Managing a crowd of 25,000 people requires military-level logistics. This team handled it with remarkable calm and efficiency. Security, staging, transport, sound — every element was flawless. Genuinely impressive.",
  },
];

const FAQS = [
  {
    q: "How early should I book for an event?",
    a: "For small to mid-sized events, we recommend booking 4–8 weeks in advance. Large-scale events — concerts, political rallies, multi-day conferences, and exhibitions — typically require 3–6 months of planning. The earlier you engage us, the better the venue and vendor availability.",
  },
  {
    q: "Do you manage all vendors or do we use our own?",
    a: "We can do either. Our preferred vendor network has been vetted over years for reliability and quality. However, if you have existing relationships with specific suppliers, we are happy to incorporate them into our management structure. We coordinate all vendors — yours and ours — under a single point of accountability.",
  },
  {
    q: "What happens if something goes wrong on the day?",
    a: "Every event we manage has a detailed contingency plan for every foreseeable scenario — bad weather, AV failure, supplier no-shows, medical incidents. Our on-site team is trained in crisis management, and we maintain relationships with backup suppliers for critical services.",
  },
  {
    q: "Can you manage events outside our city or internationally?",
    a: "Yes. We travel for events and have managed events across the country and internationally. For out-of-city events, we work with local partners and conduct site visits as part of our standard planning process. Travel and accommodation costs are quoted separately.",
  },
  {
    q: "Do you provide live streaming for events?",
    a: "Yes — live streaming is one of our core capabilities. We set up multi-camera live productions for hybrid events, streamed rallies, conferences, and award ceremonies. We handle the technical production, platform setup, and real-time streaming management in-house.",
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
      "linear-gradient(105deg, rgba(10,6,0,0.96) 0%, rgba(10,6,0,0.82) 55%, rgba(10,6,0,0.42) 100%)",
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
      "linear-gradient(to top, rgba(10,6,0,0.72) 0%, rgba(10,6,0,0.1) 55%)",
    borderRadius: T.radius.xl,
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
    background: "rgba(207,150,69,0.18)",
    border: "1px solid rgba(207,150,69,0.35)",
    backdropFilter: "blur(6px)",
    borderRadius: 100,
    padding: "6px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroRightBadgeNum: {
    fontFamily: "'Cormorant Garamond', serif",
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
  heroRightCornerTag: {
    position: "absolute",
    top: "1.2rem",
    right: "1.2rem",
    background: T.gold,
    color: T.white,
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: 4,
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

  /* ── EVENT TYPES ── */
  eventTypesBg: { background: T.dark, padding: "5rem 0" },
  eventTypesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.3rem",
  },
  eventTypeCard: {
    borderRadius: T.radius.lg,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    height: 280,
    background: "#1a1005",
  },
  eventTypeImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  eventTypeOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,6,0,0.88) 0%, rgba(10,6,0,0.2) 60%)",
    transition: "opacity 0.3s",
  },
  eventTypeMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.3rem 1.2rem",
    transition: "transform 0.3s",
  },
  eventTypeHighlight: {
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
  eventTypeTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 4px",
  },
  eventTypeAttendees: {
    fontSize: "0.76rem",
    color: "rgba(255,255,255,0.55)",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },

  /* ── PORTFOLIO ── */
  portfolioBg: {
    background: `linear-gradient(180deg, ${T.bg} 0%, #f0e8dc 100%)`,
    padding: "5rem 0",
  },
  portfolioGridOuter: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "250px",
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
      "linear-gradient(to top, rgba(10,6,0,0.88) 0%, transparent 55%)",
    transition: "opacity 0.3s",
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.95rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 2px",
  },
  portfolioGuests: { fontSize: "0.73rem", color: T.gold, fontWeight: 600 },

  /* ── PROCESS ── */
  processBg: {
    background: T.white,
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
    background: T.goldLight,
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
  capabilityItem: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: T.radius.md,
    padding: "1.2rem 0.8rem",
    border: "1px solid rgba(207,150,69,0.12)",
    textAlign: "center",
    transition: "border-color 0.2s, background 0.2s",
  },
  capabilityIcon: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    display: "block",
  },
  capabilityLabel: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.5)",
    fontWeight: 500,
    lineHeight: 1.4,
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
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(207,150,69,0.1) 0%, transparent 70%)",
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
const IcoUsers = ({ size = 12, color = "rgba(255,255,255,0.55)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

function EventTypeCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={styles.eventTypeCard}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={item.img}
        alt={`${item.title} — managed events for ${item.attendees} attendees`}
        style={{
          ...styles.eventTypeImg,
          transform: hov ? "scale(1.07)" : "scale(1)",
        }}
        loading="lazy"
        decoding="async"
      />
      <div style={{ ...styles.eventTypeOverlay }} />
      <div
        style={{
          ...styles.eventTypeMeta,
          transform: hov ? "translateY(0)" : "translateY(5px)",
        }}
      >
        <span style={styles.eventTypeHighlight}>{item.highlight}</span>
        <div style={styles.eventTypeTitle}>{item.title}</div>
        <div style={styles.eventTypeAttendees}>
          <IcoUsers /> {item.attendees}
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={styles.portfolioCard}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={item.img}
        alt={`${item.title} — ${item.category} for ${item.guests}`}
        style={{
          ...styles.portfolioImg,
          transform: hov ? "scale(1.07)" : "scale(1)",
        }}
        loading="lazy"
        decoding="async"
      />
      <div style={{ ...styles.portfolioGradient, opacity: hov ? 1 : 0.65 }} />
      <div
        style={{
          ...styles.portfolioMeta,
          transform: hov ? "translateY(0)" : "translateY(6px)",
        }}
      >
        <span style={styles.portfolioCatPill}>{item.category}</span>
        <div style={styles.portfolioTitle}>{item.title}</div>
        <div style={styles.portfolioGuests}>{item.guests}</div>
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
          alt={`Step ${step.step}: ${step.title} — event planning process`}
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

function CapabilityItem({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.capabilityItem,
        borderColor: hov ? "rgba(207,150,69,0.4)" : "rgba(207,150,69,0.12)",
        background: hov ? "rgba(207,150,69,0.1)" : "rgba(255,255,255,0.05)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={styles.capabilityIcon}>{item.icon}</span>
      <div style={styles.capabilityLabel}>{item.label}</div>
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

export default function EventManagement() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      <Helmet>
        <title>
          Professional Event Management Services | Concerts, Corporate, Weddings
          & More
        </title>
        <meta
          name="description"
          content="Expert event management for corporate conferences, weddings, concerts, political rallies, exhibitions, and award ceremonies. 400+ events delivered for 50 to 100,000+ attendees."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://yourwebsite.com/services/event-management"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <style>{`
        @media (max-width: 1024px) {
          .capabilities-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; grid-auto-rows: 220px !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
          .hero-right-img { height: 280px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-sec { display: none !important; }
          .about-badge { left: 12px !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .event-types-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 200px !important; }
          .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .capabilities-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .services-grid, .event-types-grid, .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; }
          .capabilities-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .section-wrap { padding: 3rem 1.2rem !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
          alt="Large-scale corporate conference hall with stage lighting and a full audience"
          style={styles.heroBgImg}
          loading="eager"
          fetchpriority="high"
          decoding="sync"
        />
        <div style={styles.heroBgOverlay} />
        <div style={styles.heroInner} className="hero-inner">
          {/* LEFT — copy */}
          <div>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot} />
              <span style={styles.heroBadgeText}>Event Management</span>
            </div>
            <h1 style={styles.heroTitle}>
              Events That People
              <br />
              <span style={styles.heroAccent}>Remember</span>
              <br />
              for a Lifetime.
            </h1>
            <p style={styles.heroBody}>
              From intimate gatherings to national-scale rallies — we plan,
              design, and execute extraordinary events with precision,
              creativity, and the experience to handle anything that comes our
              way.
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

          {/* RIGHT — feature image */}
          <div style={styles.heroRight} className="hero-right-img">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=80"
              alt="Elegantly lit gala dinner with guests seated at round tables in a grand ballroom"
              style={styles.heroRightImg}
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <div style={styles.heroRightOverlay} />
            <div style={styles.heroRightCornerTag}>400+ Events</div>
          </div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <div style={styles.aboutBg}>
        <div style={styles.aboutGrid} className="about-grid">
          <div style={styles.aboutImgCol}>
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=80"
              alt="Professional event management team coordinating a large banquet setup with floral centrepieces"
              style={styles.aboutImgMain}
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80"
              alt="Close-up of an elegantly dressed gala event with candlelit tables"
              style={styles.aboutImgSecondary}
              className="about-img-sec"
              loading="lazy"
              decoding="async"
            />
            <div style={styles.aboutFloatBadge} className="about-badge">
              <div>
                <div style={styles.aboutBadgeNum}>400+</div>
                <div style={styles.aboutBadgeLabel}>
                  Events
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
                Professional Event
                <br />
                Management?
              </span>
            </h2>
            <p style={styles.aboutP}>
              Professional event management is the art and science of turning a
              vision into a flawless lived experience. It encompasses every
              detail — from venue selection and décor to logistics, vendor
              coordination, crowd management, and on-site execution — all
              managed by specialists who have done this hundreds of times
              before.
            </p>
            <p style={styles.aboutP}>
              A great event doesn't happen by accident. It is the result of
              meticulous planning, creative thinking, and the ability to
              anticipate and resolve problems before they become visible to your
              guests. That is exactly what our team delivers — every time, for
              every scale.
            </p>
            <div style={styles.aboutPullQuote}>
              "Every event is a story. We are the authors who make sure every
              chapter unfolds exactly as it should — and that the ending leaves
              your audience wanting more."
            </div>
            <div style={styles.aboutChecks}>
              {[
                "End-to-end management — concept, planning, execution, and review",
                "In-house AV, lighting, staging, and technical production team",
                "Vetted vendor network for catering, décor, security, and entertainment",
                "Detailed contingency planning for every foreseeable scenario",
                "Capable of managing events from 50 to 100,000+ attendees",
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
            8 Event Categories,{" "}
            <span style={styles.titleAccent}>One Expert Team</span>
          </h2>
          <p style={styles.sectionSub}>
            Whether it's a 50-person boardroom dinner or a 100,000-strong public
            rally — we bring the same commitment to excellence to every event we
            touch.
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
            Our 6-Step <span style={styles.titleAccent}>Event Process</span>
          </h2>
          <p style={styles.sectionSub}>
            A structured, collaborative approach from the first conversation to
            the final post-event report — transparent and exciting at every
            stage.
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
            Everything Under <span style={styles.titleAccent}>One Roof</span>
          </h2>
          <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
            In-house production capabilities across sound, lighting, AV, décor,
            catering, security, and more — so you have one team accountable for
            everything.
          </p>
        </div>
        <div style={styles.capabilitiesGrid} className="capabilities-grid">
          {CAPABILITIES.map((item) => (
            <CapabilityItem key={item.label} item={item} />
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
          <div style={styles.ctaEyebrow}>
            Let's Create Something Unforgettable
          </div>
          <h2 style={styles.ctaTitle}>
            Tell Us About <span style={styles.titleAccent}>Your Event</span>
          </h2>
          <p style={styles.ctaBody}>
            Share your vision, your date, and your approximate guest count.
            We'll come back with a creative proposal and transparent quote
            within 48 hours — no obligation.
          </p>
          <div style={styles.ctaBtnRow}>
            <button
              style={styles.ctaBtnPrimary}
              onClick={() => navigate("/contact")}
            >
              Plan Your Event <IcoArrow />
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
