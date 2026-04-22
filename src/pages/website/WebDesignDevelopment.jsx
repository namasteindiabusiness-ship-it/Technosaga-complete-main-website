import { useState } from "react";
import { FaReact } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { FaAngular } from "react-icons/fa";
import { RiFigmaLine } from "react-icons/ri";
import { GrNode } from "react-icons/gr";
import { DiMongodb } from "react-icons/di";
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

const SERVICES_LIST = [
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Pixel-perfect interfaces built around real user behaviour, with intuitive flows that convert visitors into customers.",
  },
  {
    icon: "⚡",
    title: "Performance Optimisation",
    desc: "Lightning-fast load times, Core Web Vitals excellence, and technical SEO foundations baked in from day one.",
  },
  {
    icon: "📱",
    title: "Responsive Development",
    desc: "Flawless experiences on every device — from 4K monitors to foldable phones — using modern CSS and component architecture.",
  },
  {
    icon: "🛒",
    title: "E-Commerce Solutions",
    desc: "Custom Shopify, WooCommerce, and headless commerce builds designed to maximise conversions and average order value.",
  },
  {
    icon: "🔒",
    title: "Security & Maintenance",
    desc: "Ongoing site hardening, SSL management, uptime monitoring, and monthly performance reports to keep you protected.",
  },
  {
    icon: "🔗",
    title: "API & Integrations",
    desc: "Seamless connection to CRMs, payment gateways, analytics tools, and third-party services via robust REST and GraphQL APIs.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We begin with a deep-dive workshop to understand your brand, audience, goals, and competitive landscape.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Information architecture, sitemap planning, and content strategy — we blueprint the project before a single line of code is written.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    step: "03",
    title: "Design",
    desc: "High-fidelity mockups in Figma, reviewed collaboratively with your team. We iterate until every detail feels exactly right.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    step: "04",
    title: "Development",
    desc: "Clean, semantic code built on modern frameworks. Accessible, performant, and maintainable by your team long after launch.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  },
  {
    step: "05",
    title: "Testing",
    desc: "Cross-browser, cross-device QA. Load testing, accessibility audits, and user acceptance testing before any code goes live.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },
  {
    step: "06",
    title: "Launch & Support",
    desc: "Smooth deployment, post-launch monitoring, and ongoing support packages to ensure your site grows with your business.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

const TECH = [
  { name: "React", img: <FaReact size={35} /> },
  { name: "Next.js", img: <RiNextjsLine size={35} /> },
  { name: "Angular", img: <FaAngular size={35} /> },
  { name: "MongoDB", img: <DiMongodb size={35} /> },
  { name: "Figma", img: <RiFigmaLine size={35} /> },
  { name: "Node.js", img: <GrNode size={35} /> },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Nexus Consulting",
    avatar: "https://i.pravatar.cc/80?img=47",
    quote:
      "The team completely transformed our online presence. Our website now generates 3x more qualified leads than before. The attention to detail and strategic thinking was outstanding.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Founder, Orbit SaaS",
    avatar: "https://i.pravatar.cc/80?img=12",
    quote:
      "From the first wireframe to launch day, the process was seamless. They understood our product deeply and created a UI that our users love. We couldn't be happier.",
    rating: 5,
  },
  {
    name: "Aisha Rahman",
    role: "Director, Verde Organics",
    avatar: "https://i.pravatar.cc/80?img=5",
    quote:
      "Our e-commerce conversion rate jumped from 1.2% to 4.8% after the redesign. The ROI has been extraordinary. These guys genuinely care about results.",
    rating: 5,
  },
];

const FAQS = [
  {
    q: "How long does a website project take?",
    a: "A standard 5–10 page website typically takes 4–6 weeks from kickoff to launch. More complex projects with custom functionality can take 8–16 weeks. We will give you a precise timeline during our initial consultation.",
  },
  {
    q: "Do you build on WordPress, Shopify, or custom code?",
    a: "We work across all major platforms and build fully custom solutions. Our recommendation depends on your specific needs, budget, and long-term goals. We'll advise you honestly on which approach is right for you.",
  },
  {
    q: "Will my website be optimised for search engines?",
    a: "Absolutely. Every website we build includes foundational on-page SEO: clean semantic code, proper heading structure, meta tags, schema markup, sitemap, and performance optimisation — all contributing to strong search visibility.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. Redesigns are a significant part of our work. We audit your existing site, identify what's working and what isn't, and create a new version that retains your SEO equity while delivering a dramatically improved experience.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "We offer flexible monthly maintenance packages covering updates, backups, security monitoring, performance checks, and content changes. We become your long-term digital partner, not just a one-off vendor.",
  },
];

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
    minHeight: 520,
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
      "linear-gradient(100deg, rgba(10,6,0,0.93) 0%, rgba(10,6,0,0.75) 55%, rgba(10,6,0,0.4) 100%)",
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
  heroLeft: {},
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
    transition: "background 0.18s",
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
    letterSpacing: "0.06em",
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
      "linear-gradient(160deg, rgba(14,10,4,0.06) 0%, rgba(14,10,4,0.52) 100%)",
  },
  /* Frosted stats badge pinned to bottom of image */
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
    fontSize: "1.55rem",
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

  /* ── Shared ── */
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

  /* ── SERVICES ── */
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.3rem",
  },
  serviceCard: {
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1.8rem 1.6rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.07)",
    transition: "transform 0.22s, box-shadow 0.22s, border-color 0.22s",
  },
  serviceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: T.radius.md,
    background: T.goldLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    fontSize: "1.4rem",
    border: `1px solid ${T.goldBorder}`,
  },
  serviceTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.5rem",
  },
  serviceDesc: { fontSize: "0.84rem", color: T.textMuted, lineHeight: 1.7 },
  serviceBarWrap: {
    marginTop: "1rem",
    height: 2,
    background: T.goldBorder,
    borderRadius: 2,
    overflow: "hidden",
  },
  serviceBar: {
    height: "100%",
    background: T.gold,
    borderRadius: 2,
    transition: "width 0.4s ease",
  },

  /* ── PROCESS ── */
  processBg: {
    background: `linear-gradient(180deg, ${T.bg} 0%, #f0e8dc 100%)`,
    padding: "5rem 0",
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
    boxShadow: "0 2px 16px rgba(160,110,30,0.08)",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  processImgWrap: { height: 190, overflow: "hidden", position: "relative" },
  processImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  processStepBadge: {
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
    letterSpacing: "0.04em",
  },
  processBody: { padding: "1.3rem 1.5rem 1.6rem" },
  processTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 0.45rem",
  },
  processDesc: { fontSize: "0.83rem", color: T.textMuted, lineHeight: 1.7 },

  /* ── ABOUT SECTION ── */
  aboutBg: {
    background: T.white,
    padding: "5rem 0",
    borderTop: `1px solid ${T.goldBorder}`,
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
  aboutImgCol: { position: "relative" },
  aboutImgMain: {
    width: "100%",
    height: 480,
    objectFit: "cover",
    display: "block",
    borderRadius: T.radius.xl,
    boxShadow: "0 16px 48px rgba(160,110,30,0.15)",
  },
  aboutImgSecondary: {
    position: "absolute",
    bottom: -28,
    right: -28,
    width: 200,
    height: 160,
    objectFit: "cover",
    borderRadius: T.radius.lg,
    border: `4px solid ${T.white}`,
    boxShadow: "0 8px 28px rgba(160,110,30,0.2)",
  },
  aboutImgBadge: {
    position: "absolute",
    top: 24,
    left: -20,
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1rem 1.3rem",
    boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
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
    fontSize: "0.78rem",
    color: T.textMid,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  aboutTextCol: {},
  aboutP: {
    fontSize: "0.94rem",
    color: T.textMid,
    lineHeight: 1.85,
    margin: "0 0 1.1rem",
  },
  aboutHighlight: {
    background: T.goldLight,
    borderLeft: `4px solid ${T.gold}`,
    borderRadius: `0 ${T.radius.md}px ${T.radius.md}px 0`,
    padding: "1rem 1.3rem",
    margin: "1.5rem 0",
    fontSize: "0.95rem",
    color: T.textMid,
    lineHeight: 1.75,
    fontStyle: "italic",
  },
  aboutCheckList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    marginTop: "1.5rem",
  },
  aboutCheckItem: { display: "flex", alignItems: "flex-start", gap: 10 },
  aboutCheckIcon: {
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

  /* ── TECH STACK ── */
  techBg: { background: T.dark, padding: "4rem 0", overflow: "hidden" },
  techInner: { maxWidth: 1200, margin: "0 auto", padding: "0 2rem" },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "1.5rem",
    alignItems: "center",
  },
  techItem: { textAlign: "center" },
  techImgWrap: {
    width: 64,
    height: 64,
    borderRadius: T.radius.md,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(207,150,69,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.6rem",
    padding: "12px",
  },
  techImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    filter: "brightness(0) invert(1)",
    opacity: 0.7,
  },
  techName: {
    fontSize: "0.74rem",
    color: "rgba(255,255,255,0.4)",
    fontWeight: 500,
  },

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
    fontSize: "1.8rem",
    color: T.gold,
    lineHeight: 1,
    marginBottom: "0.8rem",
    display: "block",
    fontFamily: "Georgia, serif",
  },
  testimonialText: {
    fontSize: "0.88rem",
    color: T.textMid,
    lineHeight: 1.78,
    margin: "0 0 1.4rem",
    fontStyle: "italic",
  },
  ratingRow: { display: "flex", gap: 3, marginBottom: "1.2rem" },
  star: { color: T.gold, fontSize: "0.9rem" },
  testimonialDivider: {
    height: 1,
    background: T.goldBorder,
    marginBottom: "1.2rem",
  },
  testimonialAuthorRow: { display: "flex", alignItems: "center", gap: 10 },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${T.goldBorder}`,
  },
  testimonialName: { fontSize: "0.86rem", fontWeight: 600, color: T.text },
  testimonialRole: { fontSize: "0.74rem", color: T.textMuted, marginTop: 1 },

  /* ── FAQ ── */
  faqList: {
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
  faqQuestion: {
    width: "100%",
    padding: "1.1rem 1.4rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.93rem",
    fontWeight: 600,
    color: T.text,
    cursor: "pointer",
    textAlign: "left",
    gap: "1rem",
  },
  faqAnswer: {
    padding: "1rem 1.4rem 1.2rem",
    fontSize: "0.88rem",
    color: T.textMuted,
    lineHeight: 1.75,
    borderTop: `1px solid ${T.goldBorder}`,
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

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.faqItem}>
      <button
        style={styles.faqQuestion}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <IcoChevron open={open} />
      </button>
      {open && <div style={styles.faqAnswer}>{faq.a}</div>}
    </div>
  );
}

function ServiceCard({ s }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...styles.serviceCard,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 14px 36px rgba(160,110,30,0.15)"
          : "0 2px 14px rgba(160,110,30,0.07)",
        borderColor: hovered ? T.gold : T.goldBorder,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.serviceIconWrap} aria-hidden="true">
        {s.icon}
      </div>
      <h3 style={styles.serviceTitle}>{s.title}</h3>
      <p style={styles.serviceDesc}>{s.desc}</p>
      <div style={styles.serviceBarWrap}>
        <div
          style={{ ...styles.serviceBar, width: hovered ? "100%" : "35%" }}
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
        boxShadow: hovered
          ? "0 12px 30px rgba(160,110,30,0.15)"
          : "0 2px 16px rgba(160,110,30,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.processImgWrap}>
        <img
          src={step.img}
          alt={`Step ${step.step}: ${step.title} — web design process`}
          style={{
            ...styles.processImg,
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
          width="600"
          height="190"
        />
        <span style={styles.processStepBadge} aria-hidden="true">
          {step.step}
        </span>
      </div>
      <div style={styles.processBody}>
        <h3 style={styles.processTitle}>{step.title}</h3>
        <p style={styles.processDesc}>{step.desc}</p>
      </div>
    </div>
  );
}

export default function WebDesignDevelopment() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          Web Design & Development Services in Patna | Technosaga Infotech
        </title>
        <meta
          name="description"
          content="Professional web design and development services in Patna by Technosaga Infotech. We build fast, SEO-ready, mobile-first websites and web apps using React, Next.js, and WordPress. Get a free quote today."
        />
        <meta
          name="keywords"
          content="web design Patna, web development Patna, website design Jharkhand, React developer Patna, Next.js development, WordPress development Patna, e-commerce website Patna, Technosaga Infotech"
        />
        <meta name="author" content="Technosaga Infotech" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://technosagainfotech.in/services/web-design-development"
        />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div style={styles.page}>
        <style>{`
          @media (max-width: 1024px) {
            .tech-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 900px) {
            .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
            .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .about-img-secondary { display: none !important; }
            .about-badge { left: 16px !important; }
            .services-grid, .process-grid, .testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .hero-img { height: 280px !important; }
          }
          @media (max-width: 580px) {
            .services-grid, .process-grid { grid-template-columns: 1fr !important; }
            .testimonial-grid { grid-template-columns: 1fr !important; }
            .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .section-wrap { padding: 3.5rem 1.2rem !important; }
            .hero-img { height: 240px !important; }
          }
        `}</style>

        {/* ══ HERO ══ */}
        <div style={styles.hero}>
          {/* LCP background image — no lazy, fetchPriority high */}
          <img
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80"
            alt="Web design and development workspace with laptop showing code — Technosaga Infotech"
            style={styles.heroBgImg}
            fetchPriority="high"
            loading="lazy"
            decoding="async"
            width="1400"
            height="520"
          />
          <div style={styles.heroBgOverlay} />

          <div style={styles.heroInner} className="hero-inner">
            {/* LEFT: copy */}
            <div style={styles.heroLeft}>
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} aria-hidden="true" />
                <span style={styles.heroBadgeText}>
                  Web Design & Development
                </span>
              </div>
              <h1 style={styles.heroTitle}>
                Websites That Work
                <br />
                as Hard as <span style={styles.heroAccent}>You Do</span>
              </h1>
              <p style={styles.heroBody}>
                We design and build high-performance websites that attract
                visitors, build trust, and convert them into loyal customers —
                backed by strategy, craft, and measurable results.
              </p>
              <div style={styles.heroCTARow}>
                <button
                  style={styles.heroBtnPrimary}
                  onClick={() => navigate("/contact")}
                >
                  Start Your Project <IcoArrow />
                </button>
                <button
                  style={styles.heroBtnOutline}
                  onClick={() => navigate("/works")}
                >
                  View Our Work
                </button>
              </div>
            </div>

            {/* RIGHT: image card with frosted stats overlay */}
            <div style={styles.heroImgSide}>
              <div style={styles.heroFloatTag}>Full-Service Agency</div>
              <div style={styles.heroImgFrame}>
                {/*
                  Above the fold — visible on page load, so no lazy loading.
                  Using decoding="async" only to avoid blocking the main thread.
                */}
                <img
                  src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80"
                  alt="Web design team collaborating on a client website project at Technosaga Infotech"
                  style={styles.heroImg}
                  className="hero-img"
                  decoding="async"
                  width="800"
                  height="400"
                  loading="lazy"
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
              <img
                src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=900&q=80"
                alt="Technosaga Infotech web design team collaborating on a client project"
                style={styles.aboutImgMain}
                loading="lazy"
                decoding="async"
                width="900"
                height="480"
              />
              <img
                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=500&q=80"
                alt="Developer writing code on screen for a web project"
                style={styles.aboutImgSecondary}
                className="about-img-secondary"
                loading="lazy"
                decoding="async"
                width="500"
                height="160"
              />
              <div style={styles.aboutImgBadge} className="about-badge">
                <div>
                  <div style={styles.aboutBadgeNum}>500+</div>
                  <div style={styles.aboutBadgeLabel}>
                    Websites
                    <br />
                    Delivered
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
                <span style={styles.titleAccent}>
                  Web Design &<br />
                  Development?
                </span>
              </h2>
              <p style={styles.aboutP}>
                Web design and development is the complete process of planning,
                designing, building, and launching a website or web application.
                It combines visual creativity with technical engineering to
                produce digital experiences that are both beautiful and
                functional.
              </p>
              <p style={styles.aboutP}>
                A great website is far more than a digital brochure. It is your
                most powerful sales tool — working 24/7 to attract visitors,
                build credibility and convert strangers into paying customers.
              </p>
              <blockquote style={styles.aboutHighlight}>
                "We don't just build websites — we engineer digital experiences
                designed to perform. Every pixel, every line of code, and every
                interaction is crafted with your business goals in mind."
              </blockquote>
              <p style={styles.aboutP}>
                Our team combines strategic UX thinking, modern development
                frameworks, and deep performance expertise to deliver websites
                that rank, load fast, and convert.
              </p>
              <div style={styles.aboutCheckList}>
                {[
                  "Built on modern, scalable frameworks — React, Next.js, React Native",
                  "Mobile-first, fully responsive across all devices and screen sizes",
                  "Optimised for speed, Core Web Vitals, and search engine visibility",
                  "Accessible, secure, and maintainable for years to come",
                ].map((item) => (
                  <div key={item} style={styles.aboutCheckItem}>
                    <div style={styles.aboutCheckIcon} aria-hidden="true">
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
                    </div>
                    <div style={styles.aboutCheckText}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ SERVICES ══ */}
        <div style={styles.sectionWrap} className="section-wrap">
          <div style={styles.sectionHeader}>
            <div style={styles.eyebrow}>
              <div style={styles.eyebrowLine} />
              What's Included
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              Everything You Need to{" "}
              <span style={styles.titleAccent}>Dominate Online</span>
            </h2>
            <p style={styles.sectionSub}>
              Our web design and development service is comprehensive by design
              — every component you need under one roof.
            </p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {SERVICES_LIST.map((s) => (
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
              Our <span style={styles.titleAccent}>6-Step Process</span>
            </h2>
            <p style={styles.sectionSub}>
              A proven methodology refined across 500+ projects — transparent,
              collaborative, and results-focused at every stage.
            </p>
          </div>
          <div style={styles.processGrid} className="process-grid">
            {PROCESS.map((step) => (
              <ProcessCard key={step.step} step={step} />
            ))}
          </div>
        </div>

        {/* ══ TECH STACK ══ */}
        <div style={styles.techBg}>
          <div style={styles.techInner}>
            <div style={{ ...styles.sectionHeader, marginBottom: "2.5rem" }}>
              <div style={{ ...styles.eyebrow, color: T.gold }}>
                <div style={styles.eyebrowLine} />
                Tech Stack
                <div style={styles.eyebrowLine} />
              </div>
              <h2 style={{ ...styles.sectionTitle, color: T.white }}>
                Built with <span style={styles.titleAccent}>Modern Tools</span>
              </h2>
            </div>
            <div style={styles.techGrid} className="tech-grid">
              {TECH.map((t) => (
                <div key={t.name} style={styles.techItem}>
                  <div
                    style={styles.techImgWrap}
                    role="img"
                    aria-label={t.name}
                  >
                    <span style={styles.techImg} aria-hidden="true">
                      {t.img}
                    </span>
                  </div>
                  <div style={styles.techName}>{t.name}</div>
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
              What Our <span style={styles.titleAccent}>Clients Say</span>
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
                <div style={styles.testimonialDivider} />
                <div style={styles.testimonialAuthorRow}>
                  <img
                    src={t.avatar}
                    alt={`${t.name}, ${t.role}`}
                    style={styles.testimonialAvatar}
                    loading="lazy"
                    decoding="async"
                    width="40"
                    height="40"
                  />
                  <div>
                    <div style={styles.testimonialName}>{t.name}</div>
                    <div style={styles.testimonialRole}>{t.role}</div>
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
              Frequently Asked <span style={styles.titleAccent}>Questions</span>
            </h2>
          </div>
          <div style={styles.faqList}>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
