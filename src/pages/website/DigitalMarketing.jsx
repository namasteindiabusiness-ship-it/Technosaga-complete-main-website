import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { SiGoogleads } from "react-icons/si";
import { FaMeta } from "react-icons/fa6";
import { structuredData } from "../../libs/static";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

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

const DM_SERVICES = [
  {
    icon: "🔍",
    title: "Search Engine Optimisation",
    desc: "Technical SEO, on-page optimisation, and link-building strategies that push you to page one and keep you there.",
  },
  {
    icon: "💰",
    title: "Pay-Per-Click Advertising",
    desc: "Google Ads, Meta Ads, and programmatic campaigns with laser-targeted audiences and measurable ROI every month.",
  },
  {
    icon: "📲",
    title: "Social Media Marketing",
    desc: "Platform-native content strategies, community management, and paid social campaigns that grow your brand audience.",
  },
  {
    icon: "✉️",
    title: "Email Marketing",
    desc: "Automated drip sequences, newsletters, and retention campaigns engineered to turn leads into loyal customers.",
  },
  {
    icon: "✍️",
    title: "Content Marketing",
    desc: "Blog posts, whitepapers, video scripts, and long-form assets that establish authority and drive organic traffic.",
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    desc: "Real-time dashboards, attribution modelling, and monthly reports that reveal exactly what's working and what to do next.",
  },
  {
    icon: "🤝",
    title: "Influencer Marketing",
    desc: "Identifying, negotiating, and managing influencer partnerships that reach new audiences with authentic credibility.",
  },
  {
    icon: "🌐",
    title: "Online Reputation Management",
    desc: "Monitoring, responding to, and improving your brand's perception across review platforms, forums, and social media.",
  },
];

const CHANNELS = [
  {
    name: "Google Ads",
    img: <SiGoogleads size={35} />,
  },
  {
    name: "Meta Ads",
    img: <FaMeta size={35} />,
  },
  {
    name: "Instagram",
    img: <FaInstagram size={35} />,
  },
  {
    name: "LinkedIn",
    img: <FaLinkedinIn size={35} />,
  },
  {
    name: "YouTube",
    img: <FaYoutube size={35} />,
  },
  {
    name: "Twitter",
    img: <FaTwitter size={35} />,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Audit & Discovery",
    desc: "We analyse your current digital footprint — channels, competitors, audience data, and conversion funnel — to identify gaps and opportunities.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    step: "02",
    title: "Strategy Blueprint",
    desc: "A custom multi-channel marketing strategy built around your goals, budget, and ideal customer — complete with KPIs and a 90-day roadmap.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    step: "03",
    title: "Creative Production",
    desc: "Ad creatives, copy, landing pages, and content assets produced by our in-house creative team, aligned to your brand identity.",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
  {
    step: "04",
    title: "Campaign Launch",
    desc: "Precise campaign setup across all agreed channels — targeting, bidding, tracking pixels, and conversion goals configured for maximum impact.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    step: "05",
    title: "Optimise & Scale",
    desc: "Ongoing A/B testing, bid adjustments, audience refinement, and content iteration to continuously improve performance and reduce cost per acquisition.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  },
  {
    step: "06",
    title: "Report & Grow",
    desc: "Monthly performance reports with clear insights and actionable recommendations. We celebrate wins, learn from data, and plan the next phase of growth.",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    name: "Kavya Reddy",
    role: "CMO, GreenLeaf Organics",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    quote:
      "Within 6 months our organic traffic grew by over 400%. The team's understanding of SEO strategy and content marketing is unmatched. Our revenue from search alone covers their fees five times over.",
  },
  {
    name: "Michael Torres",
    role: "CEO, Apex Legal Group",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    quote:
      "We were spending a fortune on Google Ads with almost no return. This team restructured our entire PPC strategy and cut our cost per lead by 62% while tripling conversions. Remarkable results.",
  },
  {
    name: "Priya Nair",
    role: "Head of Growth, Urban Fitness Co",
    avatar: "https://i.pravatar.cc/80?img=20",
    rating: 5,
    quote:
      "Their social media strategy completely transformed our brand presence. We went from 8,000 followers to over 58,000 in under a year — and these are real, engaged customers, not vanity metrics.",
  },
];

const FAQS = [
  {
    q: "How soon will I see results from digital marketing?",
    a: "SEO typically shows meaningful results in 3–6 months due to the nature of organic growth. Paid channels like Google Ads and Meta Ads can generate leads within the first week of launch. We set realistic timelines during onboarding and provide monthly benchmarks.",
  },
  {
    q: "Do you manage campaigns in-house or outsource?",
    a: "Everything is done in-house. Our certified specialists manage your campaigns directly — no white-labelling, no third parties. You get dedicated experts who understand your business deeply.",
  },
  {
    q: "What budget do I need for paid advertising?",
    a: "Our management fees are separate from your ad spend. We recommend a minimum ad spend of $500/month for meaningful data and results. We'll advise on the right budget based on your industry, goals, and competitive landscape.",
  },
  {
    q: "Can you take over campaigns that are already running?",
    a: "Absolutely. We conduct a thorough audit of existing campaigns, identify waste and opportunities, and take over management with a transition plan that maintains performance while we improve it.",
  },
  {
    q: "How do you measure and report on results?",
    a: "We build custom dashboards tied to your specific KPIs — whether that's leads, revenue, traffic, or brand metrics. You receive a detailed monthly report plus access to a live dashboard, so you're never in the dark.",
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
    minHeight: 640,
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
      "linear-gradient(105deg, rgba(10,6,0,0.94) 0%, rgba(10,6,0,0.78) 55%, rgba(10,6,0,0.42) 100%)",
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

  /* ── HERO RIGHT — IMAGE CARD ── */
  heroImgSide: {
    position: "relative",
  },
  heroFloatTag: {
    position: "absolute",
    top: 18,
    right: -10,
    background: T.gold,
    color: T.white,
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    padding: "5px 14px",
    borderRadius: 100,
    textTransform: "uppercase",
    boxShadow: "0 4px 14px rgba(207,150,69,0.4)",
    zIndex: 3,
  },
  heroImgFrame: {
    borderRadius: T.radius.xl,
    overflow: "hidden",
    position: "relative",
    border: "1px solid rgba(207,150,69,0.25)",
  },
  heroImg: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.88)",
  },
  heroImgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(160deg, rgba(14,10,4,0.08) 0%, rgba(14,10,4,0.5) 100%)",
  },
  heroImgStatsBadge: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    background: "rgba(14,10,4,0.72)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(207,150,69,0.25)",
    borderRadius: T.radius.lg,
    padding: "1rem 1.2rem",
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
    gap: "0.6rem",
    alignItems: "center",
  },
  heroStatDividerV: {
    width: 1,
    height: 32,
    background: "rgba(207,150,69,0.2)",
    margin: "0 auto",
  },
  heroStatItem: { textAlign: "center" },
  heroStatNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  heroStatLabel: {
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.38)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: 3,
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
    height: 460,
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
  aboutTextCol: {},
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

  /* ── SERVICES GRID ── */
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
  serviceBar: {
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

  /* ── PROCESS ── */
  processBg: { background: T.dark, padding: "5rem 0" },
  processGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  processCard: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: T.radius.xl,
    overflow: "hidden",
    border: "1px solid rgba(207,150,69,0.15)",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  processImgWrap: { height: 180, overflow: "hidden", position: "relative" },
  processImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    opacity: 0.75,
    transition: "transform 0.45s ease, opacity 0.3s",
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
    color: T.white,
    margin: "0 0 0.45rem",
  },
  processDesc: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.7,
  },

  /* ── RESULTS ── */
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  resultCard: {
    background: T.white,
    borderRadius: T.radius.xl,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 16px rgba(160,110,30,0.08)",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  resultImgWrap: { height: 200, overflow: "hidden", position: "relative" },
  resultImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  resultImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,6,0,0.6) 0%, transparent 55%)",
  },
  resultIndustryTag: {
    position: "absolute",
    bottom: 12,
    left: 12,
    background: T.gold,
    color: T.white,
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 3,
  },
  resultBody: { padding: "1.4rem 1.5rem 1.6rem" },
  resultBrand: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 1.1rem",
  },
  resultMetricsRow: { display: "flex", gap: "1.5rem" },
  resultMetric: { textAlign: "left" },
  resultMetricNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.7rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  resultMetricLabel: { fontSize: "0.72rem", color: T.textMuted, marginTop: 2 },

  /* ── CHANNELS ── */
  channelsBg: {
    background: T.goldLight,
    padding: "4rem 0",
    borderTop: `1px solid ${T.goldBorder}`,
    borderBottom: `1px solid ${T.goldBorder}`,
  },
  channelsInner: { maxWidth: 1200, margin: "0 auto", padding: "0 2rem" },
  channelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "1.2rem",
    marginTop: "2.5rem",
  },
  channelItem: { textAlign: "center" },
  channelImgWrap: {
    width: 72,
    height: 72,
    borderRadius: T.radius.lg,
    background: T.white,
    border: `1.5px solid ${T.goldBorder}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.6rem",
    padding: "14px",
    boxShadow: "0 2px 10px rgba(160,110,30,0.1)",
  },
  channelImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
  channelName: { fontSize: "0.76rem", color: T.textMid, fontWeight: 600 },

  /* ── TESTIMONIALS ── */
  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  testimonialCard: {
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
  testimonialText: {
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
  tAuthorName: { fontSize: "0.84rem", fontWeight: 600, color: T.text },
  tAuthorRole: { fontSize: "0.73rem", color: T.textMuted, marginTop: 1 },

  /* ── PACKAGES ── */
  packagesBg: {
    background: `linear-gradient(160deg, ${T.dark} 0%, ${T.darkMid} 55%, ${T.darkSoft} 100%)`,
    padding: "5rem 0",
    position: "relative",
    overflow: "hidden",
  },
  packagesGlow: {
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
  packagesGrid: {
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
    transition: "transform 0.22s",
  },
  pkgCardHL: {
    background: "rgba(207,150,69,0.12)",
    borderRadius: T.radius.xl,
    padding: "2.2rem 2rem",
    border: `2px solid ${T.gold}`,
    position: "relative",
    transition: "transform 0.22s",
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
    fontSize: "2.7rem",
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
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.serviceCard,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 14px 36px rgba(160,110,30,0.15)"
          : "0 2px 12px rgba(160,110,30,0.07)",
        borderColor: hovered ? T.gold : T.goldBorder,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.serviceIconWrap} aria-hidden="true">
        {s.icon}
      </div>
      {/* FIX: h4 → h3 for correct heading hierarchy */}
      <h3 style={styles.serviceTitle}>{s.title}</h3>
      <p style={styles.serviceDesc}>{s.desc}</p>
      <div style={styles.serviceBar}>
        <div
          style={{ ...styles.serviceBarFill, width: hovered ? "100%" : "30%" }}
        />
      </div>
    </div>
  );
}

function ProcessCard({ step }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.processCard,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.35)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.processImgWrap}>
        {/* FIX: lazy load + descriptive alt + dimensions */}
        <img
          src={step.img}
          alt={`Step ${step.step}: ${step.title} — digital marketing process`}
          style={{
            ...styles.processImg,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: hovered ? 0.9 : 0.75,
          }}
          loading="lazy"
          decoding="async"
          width="600"
          height="180"
        />
        <span style={styles.processStepTag} aria-hidden="true">
          {step.step}
        </span>
      </div>
      <div style={styles.processBody}>
        {/* FIX: h4 → h3 */}
        <h3 style={styles.processTitle}>{step.title}</h3>
        <p style={styles.processDesc}>{step.desc}</p>
      </div>
    </div>
  );
}

function ResultCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.resultCard,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 14px 36px rgba(160,110,30,0.15)"
          : "0 2px 16px rgba(160,110,30,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.resultImgWrap}>
        {/* FIX: lazy load + descriptive alt */}
        <img
          src={item.img}
          alt={`${item.brand} — ${item.industry} digital marketing case study`}
          style={{
            ...styles.resultImg,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
          width="600"
          height="200"
        />
        <div style={styles.resultImgOverlay} />
        <span style={styles.resultIndustryTag}>{item.industry}</span>
      </div>
      <div style={styles.resultBody}>
        <div style={styles.resultBrand}>{item.brand}</div>
        <div style={styles.resultMetricsRow}>
          <div style={styles.resultMetric}>
            <div style={styles.resultMetricNum}>{item.metric1}</div>
            <div style={styles.resultMetricLabel}>{item.label1}</div>
          </div>
          <div style={{ width: 1, background: T.goldBorder }} />
          <div style={styles.resultMetric}>
            <div style={styles.resultMetricNum}>{item.metric2}</div>
            <div style={styles.resultMetricLabel}>{item.label2}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.faqItem}>
      <button
        style={styles.faqQ}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <IcoChevron open={open} />
      </button>
      {open && <div style={styles.faqA}>{faq.a}</div>}
    </div>
  );
}

/* ── Main ── */
export default function DigitalMarketing() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>
          Digital Marketing Services in Ranchi | Technosaga Infotech
        </title>
        <meta
          name="description"
          content="Data-driven digital marketing services in Patna by Technosaga Infotech — SEO, Google Ads, Meta Ads, social media, email marketing and more. Get a free audit today."
        />
        <meta
          name="keywords"
          content="digital marketing Patna, SEO services Patna, Google Ads Patna, social media marketing Patna, PPC agency Patna, email marketing, content marketing, Technosaga Infotech"
        />
        <meta name="author" content="Technosaga Infotech" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://technosagainfotech.in/services/digital-marketing"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div style={styles.page}>
        <style>{`
          @media (max-width: 1024px) {
            .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .channels-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 900px) {
            .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
            .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .about-img-sec { display: none !important; }
            .about-badge { left: 12px !important; }
            .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .process-grid, .results-grid, .testimonial-grid, .packages-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .channels-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .hero-img { height: 280px !important; }
          }
          @media (max-width: 580px) {
            .services-grid, .process-grid, .results-grid, .testimonial-grid, .packages-grid { grid-template-columns: 1fr !important; }
            .channels-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .section-wrap { padding: 3rem 1.2rem !important; }
            .hero-img { height: 240px !important; }
          }
        `}</style>

        {/* ══ HERO ══ */}
        <div style={styles.hero}>
          {/*
            FIX: LCP image — fetchPriority="high", NO lazy load.
            Alt is now descriptive and keyword-rich.
          */}
          <img
            src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1400&q=80"
            alt="Digital marketing strategy session — data analytics and campaign planning"
            style={styles.heroBgImg}
            fetchPriority="high"
            decoding="async"
            width="1400"
            height="640"
          />
          <div style={styles.heroBgOverlay} />
          <div style={styles.heroInner} className="hero-inner">
            {/* LEFT: copy */}
            <div>
              {/* FIX: Breadcrumb links now have real href + nav landmark */}
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} aria-hidden="true" />
                <span style={styles.heroBadgeText}>Digital Marketing</span>
              </div>
              <h1 style={styles.heroTitle}>
                Grow Faster.
                <br />
                Reach Further.
                <br />
                <span style={styles.heroAccent}>Convert More.</span>
              </h1>
              <p style={styles.heroBody}>
                Data-driven digital marketing strategies that put your brand in
                front of the right audience, at the right moment, with the right
                message — and measurable results every step of the way.
              </p>
              <div style={styles.heroCTARow}>
                <button
                  style={styles.heroBtnPrimary}
                  onClick={() => navigate("/contact")}
                >
                  Get a Free Audit <IcoArrow />
                </button>
                <button
                  style={styles.heroBtnOutline}
                  onClick={() => navigate("/works")}
                >
                  View Our Works
                </button>
              </div>
            </div>

            {/* RIGHT: image card with frosted stats overlay (replaces stat grid) */}
            <div style={styles.heroImgSide}>
              <div style={styles.heroFloatTag}>Full-Service Agency</div>
              <div style={styles.heroImgFrame}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Digital marketing team reviewing campaign analytics and performance reports"
                  style={styles.heroImg}
                  className="hero-img"
                  decoding="async"
                  width="800"
                  height="400"
                />
                <div style={styles.heroImgOverlay} />
              </div>
            </div>
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <div style={styles.aboutBg}>
          <div style={styles.aboutGrid} className="about-grid">
            <div style={styles.aboutImgCol}>
              {/* FIX: lazy load + descriptive alt + dimensions */}
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80"
                alt="Digital marketing strategy planning with analytics dashboard on screen"
                style={styles.aboutImgMain}
                loading="lazy"
                decoding="async"
                width="900"
                height="460"
              />
              {/* FIX: lazy load + descriptive alt */}
              <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=80"
                alt="Marketing analytics graphs and performance metrics"
                style={styles.aboutImgSecondary}
                className="about-img-sec"
                loading="lazy"
                decoding="async"
                width="500"
                height="155"
              />
              <div style={styles.aboutFloatBadge} className="about-badge">
                <div>
                  <div style={styles.aboutBadgeNum}>4.2×</div>
                  <div style={styles.aboutBadgeLabel}>
                    Average
                    <br />
                    ROAS
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.aboutTextCol}>
              <h2
                style={{
                  ...styles.sectionTitle,
                  textAlign: "left",
                  marginBottom: "1rem",
                }}
              >
                What Is{" "}
                <span style={styles.titleAccent}>Digital Marketing?</span>
              </h2>
              <p style={styles.aboutP}>
                Digital marketing is the strategic use of online channels —
                search engines, social media, email, paid advertising, and
                content — to attract, engage, and convert your ideal customers.
                Unlike traditional advertising, every action is measurable,
                every audience is targetable, and every campaign can be
                continuously improved.
              </p>
              <p style={styles.aboutP}>
                In today's world, your customers live online. They search for
                products on Google, discover brands on Instagram, read reviews
                before buying, and respond to emails from brands they trust.
                Digital marketing is how you meet them where they already are.
              </p>
              {/* FIX: div → blockquote for semantic correctness */}
              <blockquote style={styles.aboutPullQuote}>
                "We don't run campaigns for the sake of impressions. Every
                strategy we build is tied to real business outcomes — leads,
                revenue, growth — and backed by data at every step."
              </blockquote>
              <div style={styles.aboutChecks}>
                {[
                  "Full-funnel strategy from awareness to conversion and retention",
                  "Certified specialists across every major platform and channel",
                  "Transparent reporting with real KPIs — not vanity metrics",
                  "No long-term lock-ins — we earn your business every month",
                  "Dedicated account manager who knows your brand inside out",
                ].map((item) => (
                  <div key={item} style={styles.aboutCheckItem}>
                    <div style={styles.aboutCheckBubble} aria-hidden="true">
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
              Our Services
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              8 Channels.{" "}
              <span style={styles.titleAccent}>One Unified Strategy.</span>
            </h2>
            <p style={styles.sectionSub}>
              We combine every digital marketing channel into a cohesive,
              data-driven strategy that grows your brand from every direction.
            </p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {DM_SERVICES.map((s) => (
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
            <div style={{ ...styles.eyebrow, color: T.gold }}>
              <div style={styles.eyebrowLine} />
              How We Work
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={{ ...styles.sectionTitle, color: T.white }}>
              Our <span style={styles.titleAccent}>6-Step Process</span>
            </h2>
            <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
              A structured methodology that ensures every campaign is built on
              insight, executed with precision, and continuously optimised.
            </p>
          </div>
          <div style={styles.processGrid} className="process-grid">
            {PROCESS.map((step) => (
              <ProcessCard key={step.step} step={step} />
            ))}
          </div>
        </div>

        {/* ══ CHANNELS ══ */}
        <div style={styles.channelsBg}>
          <div style={styles.channelsInner}>
            <div style={{ ...styles.sectionHeader, marginBottom: 0 }}>
              <div style={styles.eyebrow}>
                <div style={styles.eyebrowLine} />
                Platforms We Master
                <div style={styles.eyebrowLine} />
              </div>
              <h2 style={styles.sectionTitle}>
                Every Channel <span style={styles.titleAccent}>Covered</span>
              </h2>
            </div>
            <div style={styles.channelsGrid} className="channels-grid">
              {CHANNELS.map((c) => (
                <div key={c.name} style={styles.channelItem}>
                  <div style={styles.channelImgWrap}>
                    {/* FIX: lazy load + alt already good */}
                    <span style={styles.channelImg}>{c.img}</span>
                  </div>
                  <div style={styles.channelName}>{c.name}</div>
                </div>
              ))}
            </div>
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
              Hear It From <span style={styles.titleAccent}>Our Clients</span>
            </h2>
          </div>
          <div style={styles.testimonialGrid} className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={styles.testimonialCard}>
                <span style={styles.quoteIcon} aria-hidden="true">
                  "
                </span>
                <p style={styles.testimonialText}>{t.quote}</p>
                <div
                  style={styles.ratingRow}
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array(t.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} style={styles.star} aria-hidden="true">
                        ★
                      </span>
                    ))}
                </div>
                <div style={styles.tDivider} />
                <div style={styles.tAuthorRow}>
                  {/* FIX: lazy load + descriptive alt */}
                  <img
                    src={t.avatar}
                    alt={`${t.name}, ${t.role}`}
                    style={styles.tAvatar}
                    loading="lazy"
                    decoding="async"
                    width="38"
                    height="38"
                  />
                  <div>
                    <div style={styles.tAuthorName}>{t.name}</div>
                    <div style={styles.tAuthorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PACKAGES ══ */}
        {/* <div style={styles.packagesBg}>
          <div style={styles.packagesGlow} />
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ ...styles.eyebrow, color: T.gold }}>
              <div style={styles.eyebrowLine} />
              Pricing
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={{ ...styles.sectionTitle, color: T.white }}>
              Transparent <span style={styles.titleAccent}>Monthly Plans</span>
            </h2>
            <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
              No hidden fees. No lock-in contracts. Just results-driven
              marketing that pays for itself.
            </p>
          </div>
          <div style={styles.packagesGrid} className="packages-grid">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                style={pkg.tag ? styles.pkgCardHL : styles.pkgCard}
              >
                {pkg.tag && <div style={styles.pkgPopTag}>{pkg.tag}</div>}
                <div style={styles.pkgName}>{pkg.name}</div>
                <div style={styles.pkgPrice}>{pkg.price}</div>
                <div style={styles.pkgPeriod}>{pkg.period}</div>
                <div style={styles.pkgDesc}>{pkg.desc}</div>
                <div style={styles.pkgDivider} />
                {pkg.features.map((f) => (
                  <div key={f} style={styles.pkgFeat}>
                    <div style={styles.pkgFeatDot} aria-hidden="true">
                      <IcoCheck />
                    </div>
                    <div style={styles.pkgFeatText}>{f}</div>
                  </div>
                ))}
                <button
                  style={pkg.tag ? styles.pkgBtnHL : styles.pkgBtnOutline}
                >
                  {pkg.price === "Custom" ? "Request a Quote" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div> */}

        {/* ══ FAQ ══ */}
        <div style={styles.sectionWrap} className="section-wrap">
          <div style={styles.sectionHeader}>
            <div style={styles.eyebrow}>
              <div style={styles.eyebrowLine} />
              FAQ
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              Frequently Asked <span style={styles.titleAccent}>Questions</span>
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
            <div style={styles.ctaEyebrow}>Let's Grow Together</div>
            <h2 style={styles.ctaTitle}>
              Ready to{" "}
              <span style={styles.titleAccent}>
                Dominate
                <br />
                Your Market?
              </span>
            </h2>
            <p style={styles.ctaBody}>
              Book a free 30-minute strategy call. We'll audit your current
              digital presence and show you exactly where the growth
              opportunities are.
            </p>
            <div style={styles.ctaBtnRow}>
              <button
                style={styles.ctaBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Book a Free Audit <IcoArrow />
              </button>
              <button
                style={styles.ctaBtnOutline}
                onClick={() => navigate("/works")}
              >
                View Our Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
