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
    icon: "📞",
    title: "Inbound Call Handling",
    desc: "24/7 professional inbound support — customer queries, order management, complaints, and technical helpdesk — answered with care and precision.",
  },
  {
    icon: "📣",
    title: "Outbound Telemarketing",
    desc: "Trained agents drive lead generation, appointment setting, follow-up calls, and customer reactivation campaigns with measurable conversion rates.",
  },
  {
    icon: "💬",
    title: "Live Chat Support",
    desc: "Real-time website and app chat handled by skilled agents, reducing bounce rates and converting visitors into paying customers around the clock.",
  },
  {
    icon: "📧",
    title: "Email & Ticket Management",
    desc: "Structured inbox management with SLA-compliant response times — from customer support emails to helpdesk ticketing systems.",
  },
  {
    icon: "🗄️",
    title: "Back-Office Processing",
    desc: "Data entry, document processing, verification, claims management, and administrative functions handled accurately and at scale.",
  },
  {
    icon: "🔍",
    title: "Quality Assurance & Monitoring",
    desc: "Call recording, agent coaching, live monitoring, and detailed QA scorecards to ensure every customer interaction meets your brand standards.",
  },
  {
    icon: "🌍",
    title: "Multilingual Support",
    desc: "Support delivered in multiple languages by native speakers, enabling you to serve international customers without language barriers.",
  },
  {
    icon: "🤖",
    title: "AI-Assisted Operations",
    desc: "CRM integration, chatbot deployment, and AI-powered call routing that reduces handle time and boosts first-call resolution rates.",
  },
];

const INDUSTRIES = [
  {
    icon: "🛒",
    name: "E-Commerce & Retail",
    desc: "Order tracking, returns, and customer care for online retailers.",
  },
  {
    icon: "🏦",
    name: "Banking & Finance",
    desc: "Compliance-ready support for account queries, disputes, and onboarding.",
  },
  {
    icon: "🏥",
    name: "Healthcare",
    desc: "HIPAA-aware patient communication and appointment scheduling.",
  },
  {
    icon: "✈️",
    name: "Travel & Hospitality",
    desc: "Reservations, cancellations, and guest relations at every touchpoint.",
  },
  {
    icon: "📡",
    name: "Telecom & ISP",
    desc: "Technical support, billing queries, and customer retention campaigns.",
  },
  {
    icon: "🏗️",
    name: "Real Estate",
    desc: "Lead qualification, appointment booking, and property inquiry handling.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Requirements Workshop",
    desc: "We map your call flows, customer personas, SLAs, compliance requirements, and KPIs before building anything.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    step: "02",
    title: "Agent Selection & Training",
    desc: "Handpicked agents trained on your brand voice, product knowledge, scripts, and objection handling — ready before Day 1.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
  },
  {
    step: "03",
    title: "Technology Setup",
    desc: "CRM integration, call routing configuration, live chat deployment, ticketing system setup, and QA tools — all configured to your stack.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    step: "04",
    title: "Soft Launch & Testing",
    desc: "A controlled rollout with real calls, supervised by senior QA managers, to validate scripts, workflows, and performance benchmarks.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
  {
    step: "05",
    title: "Full Operations",
    desc: "Seamless handover to 24/7 live operations, with your dedicated account manager monitoring performance and escalation paths daily.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  },
  {
    step: "06",
    title: "Reporting & Optimisation",
    desc: "Weekly performance reviews, monthly strategic reports, and continuous agent coaching to improve every metric that matters to your business.",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    name: "Rachel Kim",
    role: "Head of Customer Experience, SwiftShop",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    quote:
      "Handing over our customer support was a big decision. Within 60 days, our CSAT jumped from 74% to 92%. The agents genuinely feel like part of our team — they know our products, our brand, and our customers.",
  },
  {
    name: "David Osei",
    role: "Operations Director, Meridian Bank",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    quote:
      "Compliance was our biggest concern. The team was GDPR-ready from day one and their SLA adherence has been flawless. We've reduced our customer support cost by 38% without any drop in quality.",
  },
  {
    name: "Anjali Sharma",
    role: "CEO, VitaCare Health",
    avatar: "https://i.pravatar.cc/80?img=20",
    rating: 5,
    quote:
      "Patient communication is sensitive and cannot be compromised. This team exceeded every expectation — professional, empathetic, and always on-brand. Our average wait time dropped by 45%.",
  },
];

const PACKAGES = [
  {
    name: "Starter",
    price: "$999",
    period: "/ month",
    tag: null,
    desc: "For small businesses needing reliable, professional customer support coverage.",
    features: [
      "Up to 5 dedicated agents",
      "Inbound call handling",
      "Email & ticket support",
      "8-hour coverage window",
      "Weekly performance report",
      "Basic CRM integration",
      "English support",
    ],
  },
  {
    name: "Business",
    price: "$2,499",
    period: "/ month",
    tag: "Most Popular",
    desc: "For growing businesses that need round-the-clock, multi-channel support.",
    features: [
      "Up to 15 dedicated agents",
      "Inbound + outbound calls",
      "Live chat & email support",
      "24/7 coverage",
      "QA monitoring & coaching",
      "Full CRM integration",
      "Bi-weekly strategy calls",
      "Multilingual support (2 languages)",
      "Dedicated account manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "/ month",
    tag: null,
    desc: "Full BPO outsourcing for established companies with complex, high-volume operations.",
    features: [
      "Unlimited agents & departments",
      "All channels — omnichannel",
      "AI-assisted call routing",
      "Custom workflow automation",
      "White-glove onboarding",
      "Real-time dashboards",
      "Compliance & security audits",
      "SLA-guaranteed contracts",
      "Priority escalation support",
    ],
  },
];

const FAQS = [
  {
    q: "How quickly can you onboard our customer support?",
    a: "A standard onboarding takes 2–3 weeks, covering requirements workshops, agent training, system setup, and a supervised soft launch. Enterprise clients with complex workflows may require 4–6 weeks for a full rollout. We never go live until we're confident every agent is ready.",
  },
  {
    q: "Will our customers know they're speaking to an outsourced team?",
    a: "Not unless you tell them. Our agents work under your brand identity — using your scripts, your tone of voice, and your name. To your customers, they are simply your support team. We pride ourselves on seamless brand integration.",
  },
  {
    q: "What languages do your agents support?",
    a: "We currently offer support in English, French, Arabic, Spanish, and Urdu, with more languages available on request. All language support is delivered by native or near-native speakers, never machine translation.",
  },
  {
    q: "How do you ensure quality and consistency?",
    a: "Every call is recorded and subject to QA review. We score agents against your defined quality rubric, provide weekly coaching, and share detailed QA reports. Our QA managers listen to a random sample of every agent's calls daily.",
  },
  {
    q: "Can we scale up or down as our volume changes?",
    a: "Absolutely. Our operations are built for elasticity. You can add or reduce agents with 2 weeks notice for planned changes, and we have surge capacity for seasonal peaks and unexpected volume spikes.",
  },
];

// ── FAQ JSON-LD schema ──
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

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
  heroImgSide: { position: "relative" },
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
    whiteSpace: "nowrap",
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
      "linear-gradient(160deg, rgba(14,10,4,0.06) 0%, rgba(14,10,4,0.55) 100%)",
  },
  heroStatsBadge: {
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

  /* ── TRUST BAR ── */
  trustBar: {
    background: T.dark,
    padding: "1.6rem 0",
    borderBottom: "1px solid rgba(207,150,69,0.12)",
  },
  trustInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap",
  },
  trustItem: { display: "flex", alignItems: "center", gap: 8 },
  trustDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: T.gold,
    flexShrink: 0,
  },
  trustText: {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.55)",
    fontWeight: 500,
  },
  trustDivider: { width: 1, height: 20, background: "rgba(207,150,69,0.15)" },

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
    height: 470,
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

  /* ── INDUSTRIES ── */
  industriesBg: { background: T.dark, padding: "5rem 0" },
  industriesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.2rem",
  },
  industryCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: T.radius.lg,
    padding: "1.6rem 1.5rem",
    border: "1px solid rgba(207,150,69,0.15)",
    transition: "border-color 0.22s, background 0.22s",
  },
  industryIconWrap: { fontSize: "1.6rem", marginBottom: "0.8rem" },
  industryName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 0.4rem",
  },
  industryDesc: {
    fontSize: "0.81rem",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.65,
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
      <div style={styles.serviceIconWrap} aria-hidden="true">
        {s.icon}
      </div>
      {/* FIX: h4 → h3 for correct heading hierarchy */}
      <h3 style={styles.serviceTitle}>{s.title}</h3>
      <p style={styles.serviceDesc}>{s.desc}</p>
      <div style={styles.serviceBar}>
        <div
          style={{ ...styles.serviceBarFill, width: hov ? "100%" : "30%" }}
        />
      </div>
    </div>
  );
}

function IndustryCard({ ind }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.industryCard,
        borderColor: hov ? "rgba(207,150,69,0.4)" : "rgba(207,150,69,0.15)",
        background: hov ? "rgba(207,150,69,0.1)" : "rgba(255,255,255,0.05)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.industryIconWrap} aria-hidden="true">
        {ind.icon}
      </div>
      {/* FIX: plain div → h3 for semantic structure */}
      <h3 style={styles.industryName}>{ind.name}</h3>
      <p style={styles.industryDesc}>{ind.desc}</p>
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
        {/* FIX: lazy load + descriptive alt + dimensions */}
        <img
          src={step.img}
          alt={`Step ${step.step}: ${step.title} — BPO onboarding process`}
          style={{
            ...styles.processImg,
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
          width="600"
          height="185"
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

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.faqItem}>
      {/* FIX: aria-expanded added */}
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

export default function BPOService() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>BPO & Call Center Services in Patna | Technosaga Infotech</title>
        <meta
          name="description"
          content="Professional BPO and call center outsourcing services in Patna by Technosaga Infotech — 24/7 inbound, outbound, live chat, back-office processing, and multilingual support. Get a free consultation."
        />
        <meta
          name="keywords"
          content="BPO services Patna, call center Patna, customer support outsourcing Jharkhand, inbound call center, outbound telemarketing, back office processing, multilingual support, Technosaga Infotech"
        />
        <meta name="author" content="Technosaga Infotech" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://technosagainfotech.in/services/bpo-services"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* ── FAQPage Schema ── */}
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>

        {/* ── BreadcrumbList Schema ── */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://technosagainfotech.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://technosagainfotech.in/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "BPO & Call Center Services",
                item: "https://technosagainfotech.in/services/bpo-services",
              },
            ],
          })}
        </script>
      </Helmet>

      <div style={styles.page}>
        <style>{`
          @media (max-width: 1024px) {
            .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 900px) {
            .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
            .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .about-img-sec { display: none !important; }
            .about-badge { left: 12px !important; }
            .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .industries-grid, .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .trust-inner { justify-content: center !important; }
            .trust-divider { display: none !important; }
            .hero-img { height: 280px !important; }
          }
          @media (max-width: 580px) {
            .services-grid, .industries-grid, .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: 1fr !important; }
            .section-wrap { padding: 3rem 1.2rem !important; }
            .hero-img { height: 240px !important; }
          }
        `}</style>

        {/* ══ HERO ══ */}
        <div style={styles.hero}>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80"
            alt="Professional call center agents providing customer support — Technosaga Infotech BPO services"
            style={styles.heroBgImg}
            fetchPriority="high"
            loading="lazy"
            decoding="async"
            width="1400"
            height="640"
          />
          <div style={styles.heroBgOverlay} />

          <div style={styles.heroInner} className="hero-inner">
            {/* LEFT: copy */}
            <div>
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} aria-hidden="true" />
                <span style={styles.heroBadgeText}>
                  BPO & Call Center Services
                </span>
              </div>
              <h1 style={styles.heroTitle}>
                Your Customers Deserve
                <br />
                <span style={styles.heroAccent}>World-Class</span> Support.
              </h1>
              <p style={styles.heroBody}>
                Professional inbound, outbound, and back-office operations
                staffed by trained agents who represent your brand with
                excellence — 24 hours a day, 7 days a week, 365 days a year.
              </p>
              <div style={styles.heroCTARow}>
                <button
                  style={styles.heroBtnPrimary}
                  onClick={() => navigate("/contact")}
                >
                  Get a Free Consultation <IcoArrow />
                </button>
                <button
                  style={styles.heroBtnOutline}
                  onClick={() => navigate("/works")}
                >
                  View Results
                </button>
              </div>
            </div>

            {/* RIGHT: image card with frosted stats overlay */}
            <div style={styles.heroImgSide}>
              <div style={styles.heroFloatTag}>24/7 Operations</div>
              <div style={styles.heroImgFrame}>
                {/*
                  Above the fold — visible on load.
                  decoding="async" only, no lazy loading.
                */}
                <img
                  src="https://plus.unsplash.com/premium_photo-1661414432619-290cff769e15?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Dedicated BPO call center agent team handling customer support calls"
                  style={styles.heroImg}
                  className="hero-img"
                  loading="lazy"
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
                src="https://plus.unsplash.com/premium_photo-1661284813803-825c7453c03b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional call center agents at workstations handling customer calls at Technosaga Infotech"
                style={styles.aboutImgMain}
                loading="lazy"
                decoding="async"
                width="900"
                height="470"
              />
              {/* FIX: lazy load + descriptive alt */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80"
                alt="Customer support team collaborating in a BPO office environment"
                style={styles.aboutImgSecondary}
                className="about-img-sec"
                loading="lazy"
                decoding="async"
                width="500"
                height="155"
              />
              <div style={styles.aboutFloatBadge} className="about-badge">
                <div>
                  <div style={styles.aboutBadgeNum}>92%</div>
                  <div style={styles.aboutBadgeLabel}>
                    Average
                    <br />
                    CSAT Score
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
                  BPO & Call Center
                  <br />
                  Outsourcing?
                </span>
              </h2>
              <p style={styles.aboutP}>
                Business Process Outsourcing (BPO) is the strategic delegation
                of specific business functions — most commonly customer support,
                sales calls, and back-office operations — to a specialised
                third-party team. For growing businesses, it's one of the most
                powerful ways to scale operations without scaling headcount.
              </p>
              <p style={styles.aboutP}>
                Our call center and BPO services give you a fully trained,
                brand-aligned team that handles your customer communications
                with the same care and professionalism you would expect from an
                in-house team — at a fraction of the cost.
              </p>
              {/* FIX: div → blockquote for semantic correctness */}
              <blockquote style={styles.aboutPullQuote}>
                "Every call is an opportunity to build loyalty or lose a
                customer. We take that responsibility seriously — and our CSAT
                scores prove it."
              </blockquote>
              <div style={styles.aboutChecks}>
                {[
                  "Dedicated agents trained exclusively on your brand and products",
                  "Full omnichannel coverage — phone, chat, email, and social",
                  "Real-time QA monitoring with transparent performance reports",
                  "Scalable capacity — add or reduce agents with 2 weeks notice",
                  "Compliance-ready across GDPR, HIPAA, and PCI-DSS requirements",
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
              Full-Spectrum{" "}
              <span style={styles.titleAccent}>BPO Solutions</span>
            </h2>
            <p style={styles.sectionSub}>
              From the first ring to the final report — every touchpoint handled
              by specialists who care as much as you do.
            </p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} s={s} />
            ))}
          </div>
        </div>

        {/* ══ INDUSTRIES ══ */}
        <div style={styles.industriesBg}>
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ ...styles.eyebrow, color: T.gold }}>
              <div style={styles.eyebrowLine} />
              Industries We Serve
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={{ ...styles.sectionTitle, color: T.white }}>
              Deep Expertise Across{" "}
              <span style={styles.titleAccent}>6 Sectors</span>
            </h2>
            <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
              Our agents are trained with industry-specific knowledge,
              terminology, and compliance requirements for every sector we
              serve.
            </p>
          </div>
          <div style={styles.industriesGrid} className="industries-grid">
            {INDUSTRIES.map((ind) => (
              <IndustryCard key={ind.name} ind={ind} />
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
              How We Onboard
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              From Handshake to{" "}
              <span style={styles.titleAccent}>Live Operations</span>
            </h2>
            <p style={styles.sectionSub}>
              A structured onboarding process that gets your team live in as
              little as 2 weeks — without any disruption to your current
              operations.
            </p>
          </div>
          <div style={styles.processGrid} className="process-grid">
            {PROCESS.map((step) => (
              <ProcessCard key={step.step} step={step} />
            ))}
          </div>
        </div>

        {/* ══ TESTIMONIALS ══ */}
        <div
          style={{
            background: T.goldLight,
            padding: "5rem 0",
            borderTop: `1px solid ${T.goldBorder}`,
          }}
        >
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={styles.eyebrow}>
              <div style={styles.eyebrowLine} />
              Client Stories
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              What Our <span style={styles.titleAccent}>Clients Say</span>
            </h2>
          </div>
          <div
            style={{
              ...styles.testimonialGrid,
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 2rem",
            }}
            className="testimonial-grid"
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={styles.tCard}>
                <span style={styles.quoteIcon} aria-hidden="true">
                  "
                </span>
                <p style={styles.tText}>{t.quote}</p>
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
                  {/* FIX: lazy load + descriptive alt including role */}
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
            <div style={styles.ctaEyebrow}>Let's Talk</div>
            <h2 style={styles.ctaTitle}>
              Ready to Deliver{" "}
              <span style={styles.titleAccent}>
                Exceptional
                <br />
                Customer Experiences?
              </span>
            </h2>
            <p style={styles.ctaBody}>
              Book a free consultation. We'll assess your current support setup
              and show you exactly how we can reduce costs while improving
              customer satisfaction.
            </p>
            <div style={styles.ctaBtnRow}>
              <button
                style={styles.ctaBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Book Free Consultation <IcoArrow />
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
