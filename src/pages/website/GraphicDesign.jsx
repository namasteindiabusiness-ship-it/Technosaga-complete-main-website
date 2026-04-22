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
    icon: "✨",
    title: "Brand Identity Design",
    desc: "Logo, colour palette, typography system, brand guidelines, and visual language — everything your brand needs to be consistent and unforgettable.",
  },
  {
    icon: "📦",
    title: "Packaging Design",
    desc: "Product packaging that stands out on shelves and online — from structural dielines to print-ready artwork, crafted to attract and convert buyers.",
  },
  {
    icon: "📰",
    title: "Print & Editorial Design",
    desc: "Brochures, catalogues, magazines, annual reports, and marketing collateral that communicate with authority and visual impact.",
  },
  {
    icon: "🖥️",
    title: "UI & Digital Design",
    desc: "Digital assets, web graphics, app UI components, ad creatives, and social media design systems that scale across all your digital touchpoints.",
  },
  {
    icon: "🪧",
    title: "Outdoor & Signage Design",
    desc: "Billboards, banners, hoardings, vehicle wraps, trade show displays, and environmental graphics designed for maximum visual impact at scale.",
  },
  {
    icon: "📣",
    title: "Marketing & Ad Creatives",
    desc: "High-converting social media ads, Google display banners, email headers, and campaign visuals optimised for engagement and brand recall.",
  },
  {
    icon: "🎴",
    title: "Stationery & Corporate ID",
    desc: "Business cards, letterheads, envelopes, presentation folders, and corporate stationery designed to make every touchpoint memorable.",
  },
  {
    icon: "🎨",
    title: "Illustration & Custom Art",
    desc: "Custom illustrations, icons, infographics, mascots, and bespoke artwork that give your brand a truly unique visual personality.",
  },
];

const PORTFOLIO = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    imgAlt:
      "Aurum Jewellery brand identity design — elegant gold logo and visual system",
    title: "Aurum Jewellery",
    category: "Brand Identity",
    span: 2,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1547298680-7e73a6cbe948?w=700&q=80",
    imgAlt:
      "Verde Packaging design — eco-friendly product packaging with clean typography",
    title: "Verde Packaging",
    category: "Packaging Design",
    span: 1,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80",
    imgAlt:
      "Orbit Annual Report editorial design — structured layout with data visualisations",
    title: "Orbit Annual Report",
    category: "Editorial Design",
    span: 1,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
    imgAlt:
      "Nexus UI System — comprehensive digital design system with component library",
    title: "Nexus UI System",
    category: "Digital Design",
    span: 1,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&q=80",
    imgAlt:
      "Atlas Campaign ad creatives — bold visual campaign across multiple formats",
    title: "Atlas Campaign",
    category: "Ad Creatives",
    span: 1,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80",
    imgAlt:
      "Pulse Brand Suite — full brand identity system with collateral and guidelines",
    title: "Pulse Brand Suite",
    category: "Brand Identity",
    span: 2,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & Brief",
    desc: "We begin with a detailed brand questionnaire and discovery session to understand your audience, competitors, values, and design vision.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    imgAlt:
      "Team conducting a brand discovery and briefing session around a conference table",
  },
  {
    step: "02",
    title: "Research & Moodboarding",
    desc: "Visual research, competitor analysis, and a curated moodboard that captures the aesthetic direction — presented and agreed before any design begins.",
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
    imgAlt:
      "Designer arranging visual inspiration and moodboard references on a screen",
  },
  {
    step: "03",
    title: "Concept Development",
    desc: "Initial design concepts presented in 2–3 distinct directions, each with rationale. You choose the direction that resonates most deeply.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    imgAlt:
      "Graphic designer sketching initial brand concept directions on a tablet",
  },
  {
    step: "04",
    title: "Refinement & Iteration",
    desc: "Focused refinement of your chosen concept through structured feedback rounds until the design is exactly right — not close, exactly right.",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    imgAlt:
      "Designer refining and iterating on a brand design with client feedback",
  },
  {
    step: "05",
    title: "Finalisation & Assets",
    desc: "Production-ready files delivered in every format you need: print-ready PDFs, web-optimised PNGs, scalable SVGs, and editable source files.",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    imgAlt:
      "Final brand asset files organised and ready for delivery across print and digital",
  },
  {
    step: "06",
    title: "Brand Guidelines",
    desc: "A comprehensive brand guidelines document covering logo usage, colour system, typography rules, and do's and don'ts — so your brand stays consistent forever.",
    img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80",
    imgAlt:
      "Open brand guidelines document showing logo usage rules and colour system",
  },
];

const TOOLS = [
  { name: "Adobe Illustrator", icon: "Ai" },
  { name: "Adobe Photoshop", icon: "Ps" },
  { name: "Adobe InDesign", icon: "Id" },
  { name: "Figma", icon: "Fg" },
  { name: "Adobe After Effects", icon: "Ae" },
  { name: "Blender", icon: "3D" },
];

const TESTIMONIALS = [
  {
    name: "Priya Nair",
    role: "Founder, Verde Organics",
    avatar: "https://i.pravatar.cc/80?img=5",
    avatarAlt: "Portrait of Priya Nair, Founder of Verde Organics",
    rating: 5,
    quote:
      "Our new brand identity has completely transformed how customers perceive us. The team's attention to detail was exceptional — from the logo construction to the packaging design, every element felt intentional and beautifully crafted.",
  },
  {
    name: "James Okafor",
    role: "CMO, Nexus Consulting",
    avatar: "https://i.pravatar.cc/80?img=12",
    avatarAlt: "Portrait of James Okafor, CMO of Nexus Consulting",
    rating: 5,
    quote:
      "We needed a full brand overhaul under a very tight deadline. Not only did they deliver on time, they delivered work that made our entire leadership team say 'that's exactly us'. Incredible output.",
  },
  {
    name: "Sofia Chen",
    role: "Creative Director, Pulse Media",
    avatar: "https://i.pravatar.cc/80?img=47",
    avatarAlt: "Portrait of Sofia Chen, Creative Director at Pulse Media",
    rating: 5,
    quote:
      "Working with genuinely talented designers who understand strategy as much as aesthetics is rare. They didn't just make things look beautiful — they made sure every design decision served the brand's commercial goals.",
  },
];

const PACKAGES = [
  {
    name: "Starter",
    price: "$799",
    period: "one-time",
    tag: null,
    desc: "Essential brand identity for businesses starting their visual journey.",
    features: [
      "Logo design (3 concepts)",
      "Primary & alternate logo",
      "Colour palette (5 colours)",
      "Typography selection",
      "Business card design",
      "Social media profile assets",
      "Final files in all formats",
    ],
  },
  {
    name: "Professional",
    price: "$2,499",
    period: "one-time",
    tag: "Most Popular",
    desc: "A complete brand identity system built to scale across every medium.",
    features: [
      "Logo design (3 concepts + revisions)",
      "Full brand identity system",
      "Colour + typography guidelines",
      "Stationery suite (4 items)",
      "Social media template kit",
      "Marketing collateral (3 items)",
      "Brand guidelines document",
      "Editable source files",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored quote",
    tag: null,
    desc: "Full-scale brand strategy and design systems for established organisations.",
    features: [
      "Brand strategy workshop",
      "Visual identity system",
      "Full guidelines documentation",
      "Packaging design",
      "Environmental & signage design",
      "Digital design system",
      "Illustration & iconography",
      "Ongoing design retainer options",
    ],
  },
];

const FAQS = [
  {
    q: "How long does a brand identity project take?",
    a: "A foundational brand identity (logo, colours, typography, stationery) typically takes 3–4 weeks. A comprehensive brand system with packaging, collateral, and guidelines takes 6–10 weeks. We'll give you a precise timeline after the initial brief.",
  },
  {
    q: "How many revisions do we get?",
    a: "Our Professional and Enterprise packages include unlimited revisions within defined feedback rounds. We work in structured cycles — concept presentation, direction selection, then focused refinement — to keep the process efficient and the outcome exceptional.",
  },
  {
    q: "What files will we receive at the end?",
    a: "You receive everything: print-ready PDFs and AI/EPS vector files for print, PNG and SVG for web, editable source files (Illustrator, Figma, InDesign), and a complete brand guidelines document. You own all files outright — no licences, no restrictions.",
  },
  {
    q: "Can you redesign an existing logo or brand?",
    a: "Absolutely. Brand refreshes are a significant part of our work. We conduct a thorough audit of your current brand, identify what's worth retaining, and evolve it into something modern and compelling without losing your brand equity.",
  },
  {
    q: "Do you offer ongoing design support after the project?",
    a: "Yes. We offer monthly design retainer packages for ongoing support — whether you need new marketing materials, social media assets, campaign visuals, or ad creatives. Many clients retain us after their initial project.",
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
      "linear-gradient(105deg, rgba(10,6,0,0.95) 0%, rgba(10,6,0,0.8) 55%, rgba(10,6,0,0.4) 100%)",
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
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heroImgWrapper: {
    position: "relative",
    borderRadius: T.radius.xl,
    overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
    border: "1px solid rgba(207,150,69,0.25)",
    height: 420,
  },
  heroImgMain: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.5s ease",
  },
  heroImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,6,0,0.6) 0%, transparent 55%)",
    pointerEvents: "none",
  },
  heroImgBadge: {
    position: "absolute",
    bottom: 18,
    left: 18,
    background: "rgba(10,6,0,0.75)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(207,150,69,0.3)",
    borderRadius: T.radius.md,
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  heroImgBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 8px rgba(74,222,128,0.7)",
    flexShrink: 0,
  },
  heroImgBadgeText: {
    fontSize: "0.74rem",
    color: "rgba(255,255,255,0.85)",
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  heroImgStatRow: {
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  heroImgStatChip: {
    background: "rgba(10,6,0,0.75)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(207,150,69,0.3)",
    borderRadius: T.radius.md,
    padding: "8px 14px",
    textAlign: "center",
    minWidth: 80,
  },
  heroImgStatNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.3rem",
    fontWeight: 700,
    color: T.gold,
    lineHeight: 1,
  },
  heroImgStatLabel: {
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    marginTop: 3,
  },
  heroTagRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  heroTag: {
    background: "rgba(207,150,69,0.12)",
    border: "1px solid rgba(207,150,69,0.2)",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.72rem",
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: 100,
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
    height: 480,
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

  /* ── PORTFOLIO MASONRY ── */
  portfolioBg: { background: T.dark, padding: "5rem 0" },
  portfolioGridOuter: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "240px",
    gap: "1rem",
  },
  portfolioCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: T.radius.lg,
    cursor: "pointer",
    background: "#1a1005",
    width: "100%",
    height: "100%",
  },
  portfolioImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  portfolioOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,6,0,0.85) 0%, transparent 55%)",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  portfolioMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.2rem 1.2rem",
    transform: "translateY(6px)",
    transition: "transform 0.3s",
  },
  portfolioCatPill: {
    display: "inline-block",
    background: T.gold,
    color: T.white,
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 3,
    marginBottom: 5,
  },
  portfolioTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: T.white,
    margin: 0,
  },
  portfolioExpandDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s",
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

  /* ── TOOLS ── */
  toolsBg: { background: T.dark, padding: "4rem 0" },
  toolsInner: { maxWidth: 1200, margin: "0 auto", padding: "0 2rem" },
  toolsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "1.2rem",
    marginTop: "2.5rem",
  },
  toolItem: { textAlign: "center" },
  toolIconBox: {
    width: 68,
    height: 68,
    borderRadius: T.radius.lg,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(207,150,69,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.6rem",
  },
  toolIconText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: T.gold,
  },
  toolName: {
    fontSize: "0.73rem",
    color: "rgba(255,255,255,0.4)",
    fontWeight: 500,
    lineHeight: 1.3,
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
          alt={step.imgAlt}
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

/* ── Hero Right Image Panel ── */
function HeroImagePanel() {
  const [hov, setHov] = useState(false);
  return (
    <div style={styles.heroRight}>
      <div
        style={styles.heroImgWrapper}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <img
          src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=900&q=80"
          alt="Graphic designer working on brand identity designs with colour palettes and typography layouts spread across a desk"
          style={{
            ...styles.heroImgMain,
            transform: hov ? "scale(1.04)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
        />
        <div style={styles.heroImgOverlay} />

        {/* Live badge — bottom left */}
        <div style={styles.heroImgBadge}>
          <span style={styles.heroImgBadgeDot} />
          <span style={styles.heroImgBadgeText}>
            5+ years of design excellence
          </span>
        </div>
      </div>
    </div>
  );
}

export default function GraphicDesign() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>
          Graphic Design Services — Brand Identity, Packaging & Print |
          Technosaga Infotech
        </title>
        <meta
          name="description"
          content="Strategic graphic design that builds brands and drives results — logo design, brand identity, packaging, print, digital, and illustration. 800+ projects delivered."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://technosagainfotech.com/services/graphic-design"
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
            .portfolio-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .tools-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 900px) {
            .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
            .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .about-img-sec { display: none !important; }
            .about-badge { left: 12px !important; }
            .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 200px !important; }
            .portfolio-span2 { grid-column: span 2 !important; }
            .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .tools-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 580px) {
            .services-grid, .process-grid, .testimonial-grid, .pkg-grid { grid-template-columns: 1fr !important; }
            .portfolio-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; }
            .tools-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .section-wrap { padding: 3rem 1.2rem !important; }
          }
        `}</style>

        {/* ══ HERO ══ */}
        <div style={styles.hero}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
            alt="Creative graphic design workspace — abstract background with design tools and brand visuals"
            style={styles.heroBgImg}
            loading="eager"
            decoding="async"
          />
          <div style={styles.heroBgOverlay} />
          <div style={styles.heroInner} className="hero-inner">
            {/* LEFT — copy */}
            <div>
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} />
                <span style={styles.heroBadgeText}>Graphic Design</span>
              </div>
              <h1 style={styles.heroTitle}>
                Design That Makes
                <br />
                People <span style={styles.heroAccent}>Stop, Look</span>
                <br />& Remember.
              </h1>
              <p style={styles.heroBody}>
                Strategic, beautiful graphic design that builds brands, drives
                engagement, and turns first impressions into lasting
                relationships — across print, digital, and everything in
                between.
              </p>
              <div style={styles.heroCTARow}>
                <button
                  style={styles.heroBtnPrimary}
                  onClick={() => navigate("/contact")}
                >
                  Start a Project <IcoArrow />
                </button>
                <button
                  style={styles.heroBtnOutline}
                  onClick={() => navigate("/works")}
                >
                  View Portfolio
                </button>
              </div>
            </div>

            {/* RIGHT — image panel */}
            <HeroImagePanel />
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <div style={styles.aboutBg}>
          <div style={styles.aboutGrid} className="about-grid">
            <div style={styles.aboutImgCol}>
              <img
                src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=900&q=80"
                alt="Professional graphic designer reviewing brand identity designs and colour palettes at their workstation"
                style={styles.aboutImgMain}
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80"
                alt="Close-up of brand design work showing typography and logo construction on screen"
                style={styles.aboutImgSecondary}
                className="about-img-sec"
                loading="lazy"
                decoding="async"
              />
              <div style={styles.aboutFloatBadge} className="about-badge">
                <div>
                  <div style={styles.aboutBadgeNum}>800+</div>
                  <div style={styles.aboutBadgeLabel}>
                    Projects
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
                What Is <span style={styles.titleAccent}>Graphic Design</span>
                <br />& Why Does It Matter?
              </h2>
              <p style={styles.aboutP}>
                Graphic design is the art and science of visual communication —
                using imagery, typography, colour, and composition to convey
                messages that words alone cannot. It is what makes your brand
                instantly recognisable, your marketing materials compelling, and
                your products irresistible on a shelf.
              </p>
              <p style={styles.aboutP}>
                Great design isn't decoration. It's strategy made visible. Every
                colour choice, every typeface, every layout decision either
                builds or erodes the trust your audience has in your brand. We
                design with purpose — creating visuals that are not only
                beautiful but that do real commercial work for you.
              </p>
              <div style={styles.aboutPullQuote}>
                "Design is the silent ambassador of your brand. We make sure it
                speaks with clarity, conviction, and unmistakable character."
              </div>
              <div style={styles.aboutChecks}>
                {[
                  "Strategic design rooted in brand purpose and audience psychology",
                  "Senior designers with 10+ years of industry experience",
                  "Every deliverable is production-ready — print and digital formats",
                  "You own all source files outright — no licensing restrictions",
                  "Structured feedback process for clear, efficient collaboration",
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
              What We Design
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              8 Design Services,{" "}
              <span style={styles.titleAccent}>One Creative Team</span>
            </h2>
            <p style={styles.sectionSub}>
              From brand identity to packaging, print to digital — every
              creative discipline handled by specialist designers under one
              roof.
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
              Our Creative <span style={styles.titleAccent}>Process</span>
            </h2>
            <p style={styles.sectionSub}>
              A structured approach that ensures every design decision is
              intentional, collaborative, and rooted in strategy.
            </p>
          </div>
          <div style={styles.processGrid} className="process-grid">
            {PROCESS.map((step) => (
              <ProcessCard key={step.step} step={step} />
            ))}
          </div>
        </div>

        {/* ══ TOOLS ══ */}
        <div style={styles.toolsBg}>
          <div style={styles.toolsInner}>
            <div style={{ ...styles.sectionHeader, marginBottom: 0 }}>
              <div style={{ ...styles.eyebrow, color: T.gold }}>
                <div style={styles.eyebrowLine} />
                Our Tools
                <div style={styles.eyebrowLine} />
              </div>
              <h2 style={{ ...styles.sectionTitle, color: T.white }}>
                Industry-Standard{" "}
                <span style={styles.titleAccent}>Creative Suite</span>
              </h2>
            </div>
            <div style={styles.toolsGrid} className="tools-grid">
              {TOOLS.map((tool) => (
                <div key={tool.name} style={styles.toolItem}>
                  <div style={styles.toolIconBox}>
                    <span style={styles.toolIconText}>{tool.icon}</span>
                  </div>
                  <div style={styles.toolName}>{tool.name}</div>
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
                    alt={t.avatarAlt}
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
            <div style={styles.ctaEyebrow}>Let's Create Together</div>
            <h2 style={styles.ctaTitle}>
              Ready for Design That{" "}
              <span style={styles.titleAccent}>
                Truly
                <br />
                Represents You?
              </span>
            </h2>
            <p style={styles.ctaBody}>
              Share your brief — even a rough idea — and we'll show you how we'd
              approach it. No obligation, just a conversation about your vision.
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
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
