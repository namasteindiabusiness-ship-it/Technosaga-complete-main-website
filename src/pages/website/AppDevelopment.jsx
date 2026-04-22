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
    icon: "🍎",
    title: "iOS App Development",
    desc: "Native Swift and SwiftUI apps built for iPhone and iPad — performant, elegant, and optimised for App Store approval.",
  },
  {
    icon: "🤖",
    title: "Android App Development",
    desc: "Kotlin-powered Android apps engineered for the full spectrum of Android devices with smooth UX and Play Store compliance.",
  },
  {
    icon: "⚛️",
    title: "React Native / Flutter",
    desc: "Cross-platform apps that look and feel native on both iOS and Android — built once, deployed everywhere, zero compromise.",
  },
  {
    icon: "🌐",
    title: "Progressive Web Apps (PWA)",
    desc: "Web apps that work offline, install on home screens, and deliver app-like experiences without app store friction.",
  },
  {
    icon: "🛒",
    title: "E-Commerce Mobile Apps",
    desc: "Feature-rich shopping apps with product catalogues, payments, push notifications, loyalty programmes, and order tracking.",
  },
  {
    icon: "🔗",
    title: "API & Backend Development",
    desc: "Scalable REST and GraphQL APIs, cloud infrastructure, database architecture, and third-party integrations built to grow with you.",
  },
  {
    icon: "🔒",
    title: "App Security & Compliance",
    desc: "End-to-end encryption, OAuth 2.0, GDPR and HIPAA compliance, and penetration testing to keep your app and users safe.",
  },
  {
    icon: "🔧",
    title: "App Maintenance & Support",
    desc: "Post-launch monitoring, OS update compatibility, crash fixing, performance tuning, and feature releases on a rolling basis.",
  },
];

const APP_TYPES = [
  {
    icon: "🏥",
    type: "Healthcare",
    desc: "Appointment booking, telemedicine, patient records, and medication reminders.",
  },
  {
    icon: "🎓",
    type: "EdTech",
    desc: "Learning management systems, quizzes, video streaming, and progress tracking.",
  },
  {
    icon: "🏦",
    type: "Fintech",
    desc: "Digital wallets, budgeting tools, investment dashboards, and payment processing.",
  },
  {
    icon: "🛍️",
    type: "Retail & Commerce",
    desc: "Product discovery, AR try-on, cart, checkout, and loyalty programmes.",
  },
  {
    icon: "🚗",
    type: "On-Demand",
    desc: "Driver/rider matching, real-time tracking, dynamic pricing, and ratings.",
  },
  {
    icon: "💪",
    type: "Fitness & Wellness",
    desc: "Workout tracking, nutrition logging, wearable sync, and coaching features.",
  },
];

const TECH_STACK = [
  { category: "iOS", tools: ["Swift", "SwiftUI", "Xcode", "CoreData"] },
  {
    category: "Android",
    tools: ["Kotlin", "Jetpack Compose", "Android Studio", "Room"],
  },
  {
    category: "Cross-Platform",
    tools: ["React Native", "Flutter", "Expo", "Dart"],
  },
  { category: "Backend", tools: ["Node.js", "Python", "Firebase", "AWS"] },
  {
    category: "Database",
    tools: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
  },
  {
    category: "DevOps",
    tools: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & Scoping",
    desc: "We define your app's purpose, core features, target users, platform requirements, and technical architecture before a single screen is designed.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    imgAlt:
      "Team conducting discovery and project scoping session around a table",
  },
  {
    step: "02",
    title: "UI/UX Design",
    desc: "User journey mapping, wireframes, interactive prototypes, and high-fidelity Figma mockups reviewed and iterated with your team.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    imgAlt: "Designer working on UI/UX wireframes and mobile app prototypes",
  },
  {
    step: "03",
    title: "Development Sprints",
    desc: "Agile two-week sprints with working builds after each cycle. You see real progress, can give feedback, and remain in control throughout.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    imgAlt:
      "Developer writing code on a laptop during an agile development sprint",
  },
  {
    step: "04",
    title: "QA & Testing",
    desc: "Device matrix testing, automated regression tests, performance benchmarking, security audits, and user acceptance testing before any release.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    imgAlt:
      "QA engineer running automated tests and reviewing code on multiple screens",
  },
  {
    step: "05",
    title: "App Store Launch",
    desc: "We handle all submission assets, metadata, screenshots, store listing optimisation, and review process management for App Store and Play Store.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    imgAlt: "Mobile phone showing a freshly launched app on the App Store",
  },
  {
    step: "06",
    title: "Post-Launch Growth",
    desc: "Analytics integration, crash monitoring, user feedback loops, feature roadmap planning, and regular OS update maintenance packages.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    imgAlt:
      "Analytics dashboard showing app growth metrics and user engagement after launch",
  },
];

const TESTIMONIALS = [
  {
    name: "Dr. Ananya Rao",
    role: "Founder, HealthPulse",
    avatar: "https://i.pravatar.cc/80?img=5",
    avatarAlt: "Portrait of Dr. Ananya Rao, Founder of HealthPulse",
    rating: 5,
    quote:
      "The team translated a complex healthcare workflow into an app that patients love. 50,000 downloads in three months and a 4.7-star rating. The attention to UX detail was extraordinary — every screen feels intuitive.",
  },
  {
    name: "Kevin Marsh",
    role: "CEO, PaySwift",
    avatar: "https://i.pravatar.cc/80?img=12",
    avatarAlt: "Portrait of Kevin Marsh, CEO of PaySwift",
    rating: 5,
    quote:
      "Building a fintech app requires precision and security. This team delivered both. Our React Native app passes PCI compliance, handles 10,000 daily transactions, and has a 4.8-star rating. Exceptional work.",
  },
  {
    name: "Fatima Al-Rashidi",
    role: "Head of Product, LearnSpark",
    avatar: "https://i.pravatar.cc/80?img=20",
    avatarAlt: "Portrait of Fatima Al-Rashidi, Head of Product at LearnSpark",
    rating: 5,
    quote:
      "From wireframe to 200,000 users in 14 months. The team's agile process meant we could pivot quickly when user feedback came in. They're not just developers — they think like product owners.",
  },
];

const FAQS = [
  {
    q: "How long does it take to build an app?",
    a: "A simple MVP on a single platform typically takes 8–12 weeks. A full-featured dual-platform app with custom backend usually takes 16–24 weeks. We provide a detailed project timeline during scoping, broken down by sprint.",
  },
  {
    q: "Should I build native or cross-platform?",
    a: "It depends on your budget, timeline, and performance requirements. Native apps (Swift for iOS, Kotlin for Android) offer the best performance and OS integration. React Native and Flutter deliver 90–95% of native performance at significantly lower cost and faster timelines. We'll recommend the right approach for your specific use case.",
  },
  {
    q: "Do you handle App Store and Google Play submission?",
    a: "Yes. We manage the entire submission process — from creating developer accounts and preparing store assets to writing compelling descriptions, uploading screenshots, and navigating the review process. We've successfully launched 50+ apps across both stores.",
  },
  {
    q: "Who owns the source code?",
    a: "You do — completely and unconditionally. All source code, design files, and assets are transferred to you upon final payment. We include a code handover session to ensure your team understands the codebase.",
  },
  {
    q: "Can you take over an existing app that needs rebuilding?",
    a: "Absolutely. We regularly take on legacy apps that need modernisation, performance improvements, or a full rebuild. We start with a thorough code audit and architecture review before recommending a path forward.",
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
    minHeight: 640,
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
      "linear-gradient(105deg, rgba(10,6,0,0.95) 0%, rgba(10,6,0,0.8) 55%, rgba(10,6,0,0.45) 100%)",
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
    border: "1px solid rgba(212,175,55,0.25)",
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
    border: "1px solid rgba(212,175,55,0.3)",
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
    border: "1px solid rgba(212,175,55,0.3)",
    borderRadius: T.radius.md,
    padding: "8px 14px",
    textAlign: "center",
    minWidth: 80,
  },
  heroImgStatNum: {
    fontFamily: "'Montserrat', sans-serif",
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
    background: "rgba(212,175,55,0.12)",
    border: "1px solid rgba(212,175,55,0.2)",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.72rem",
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: 100,
  },

  /* ── PLATFORM STRIP ── */
  platformStrip: {
    background: T.dark,
    padding: "1.8rem 0",
    borderBottom: "1px solid rgba(212,175,55,0.12)",
  },
  platformInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "1rem",
    flexWrap: "wrap",
  },
  platformItem: { display: "flex", alignItems: "center", gap: 8 },
  platformIcon: { fontSize: "1.2rem" },
  platformText: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.55)",
    fontWeight: 600,
  },
  platformDivider: {
    width: 1,
    height: 24,
    background: "rgba(212,175,55,0.15)",
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

  /* ── APP TYPES ── */
  appTypesBg: { background: T.dark, padding: "5rem 0" },
  appTypesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.2rem",
  },
  appTypeCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: T.radius.lg,
    padding: "1.6rem 1.5rem",
    border: "1px solid rgba(212,175,55,0.15)",
    transition: "border-color 0.22s, background 0.22s",
    cursor: "default",
  },
  appTypeIcon: { fontSize: "1.6rem", marginBottom: "0.8rem", display: "block" },
  appTypeName: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 0.4rem",
  },
  appTypeDesc: {
    fontSize: "0.81rem",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.65,
  },

  /* ── TECH STACK ── */
  techBg: {
    background: "rgba(212,175,55,0.08)",
    padding: "5rem 0",
    borderTop: `1px solid ${T.goldBorder}`,
    borderBottom: `1px solid ${T.goldBorder}`,
  },
  techGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.3rem",
  },
  techCard: {
    background: "#121826",
    borderRadius: T.radius.lg,
    padding: "1.4rem 1.5rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 10px rgba(160,110,30,0.07)",
  },
  techCategory: {
    fontSize: "0.67rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: "0.8rem",
  },
  techTagRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  techTag: {
    background: "rgba(212,175,55,0.08)",
    border: `1px solid ${T.goldBorder}`,
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.76rem",
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 100,
  },

  /* ── PROCESS ── */
  processBg: { background: "#0B0F1A", padding: "5rem 0" },
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

  /* ── PORTFOLIO ── */
  portfolioBg: {
    background: `linear-gradient(180deg, #0B0F1A 0%, "#0f1521" 100%)`,
    padding: "5rem 0",
  },
  portfolioGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.3rem",
  },
  portfolioCard: {
    borderRadius: T.radius.lg,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    height: 280,
    background: "#e8e0d4",
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
      "linear-gradient(to top, rgba(10,6,0,0.82) 0%, transparent 50%)",
    transition: "opacity 0.3s",
  },
  portfolioMeta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1.2rem 1.3rem",
    transition: "transform 0.3s",
  },
  portfolioTypePill: {
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
  portfolioCatPill: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.6rem",
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 3,
    marginBottom: 5,
    marginLeft: 5,
  },
  portfolioTitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 3px",
  },
  portfolioMetric: { fontSize: "0.75rem", color: T.gold, fontWeight: 600 },

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
    transition: "transform 0.22s",
  },
  pkgCardHL: {
    background: "rgba(212,175,55,0.12)",
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
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
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

function AppTypeCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.appTypeCard,
        borderColor: hov ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.15)",
        background: hov ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.05)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={styles.appTypeIcon}>{item.icon}</span>
      <div style={styles.appTypeName}>{item.type}</div>
      <div style={styles.appTypeDesc}>{item.desc}</div>
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
        alt={item.imgAlt}
        style={{
          ...styles.portfolioImg,
          transform: hov ? "scale(1.07)" : "scale(1)",
        }}
        loading="lazy"
        decoding="async"
      />
      <div style={{ ...styles.portfolioOverlay, opacity: hov ? 1 : 0.75 }} />
      <div
        style={{
          ...styles.portfolioMeta,
          transform: hov ? "translateY(0)" : "translateY(5px)",
        }}
      >
        <span style={styles.portfolioTypePill}>{item.type}</span>
        <span style={styles.portfolioCatPill}>{item.category}</span>
        <div style={styles.portfolioTitle}>{item.title}</div>
        <div style={styles.portfolioMetric}>{item.metric}</div>
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
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80"
          alt="Developer building a mobile app on a smartphone with lines of code visible in the background"
          style={{
            ...styles.heroImgMain,
            transform: hov ? "scale(1.04)" : "scale(1)",
          }}
          loading="lazy"
          decoding="async"
        />
        <div style={styles.heroImgOverlay} />

        {/* Live badge bottom-left */}
        <div style={styles.heroImgBadge}>
          <span style={styles.heroImgBadgeDot} />
          <span style={styles.heroImgBadgeText}>
            Currently building 5 active projects
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AppDevelopment() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>
          App Development Services — iOS, Android & Cross-Platform | Technosaga
          Infotech
        </title>
        <meta
          name="description"
          content="Expert iOS, Android, React Native, and Flutter app development. We build high-performance, beautiful mobile apps from idea to App Store launch — with full post-launch support."
        />
        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://technosagainfotech.com/services/app-development"
        />
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div style={{...styles.page, background:"#0B0F1A", fontFamily:"'Poppins', sans-serif", paddingTop: 72}}>
        <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-sec { display: none !important; }
          .about-badge { left: 12px !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .app-types-grid, .process-grid, .portfolio-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .platform-inner { justify-content: center !important; gap: 1.2rem !important; }
          .platform-divider { display: none !important; }
        }
        @media (max-width: 580px) {
          .services-grid, .app-types-grid, .process-grid, .portfolio-grid, .testimonial-grid, .pkg-grid, .tech-grid { grid-template-columns: 1fr !important; }
          .section-wrap { padding: 3rem 1.2rem !important; }
        }
      `}</style>

        {/* ══ HERO ══ */}
        <div style={styles.hero}>
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&q=80"
            alt="Mobile app development — abstract background showing a smartphone with glowing app interfaces"
            style={styles.heroBgImg}
            loading="lazy"
            decoding="async"
          />
          <div style={styles.heroBgOverlay} />
          <div style={styles.heroInner} className="hero-inner">
            {/* LEFT — copy */}
            <div>
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeDot} />
                <span style={styles.heroBadgeText}>App Development</span>
              </div>
              <h1 style={styles.heroTitle}>
                Apps That Users
                <br />
                <span style={styles.heroAccent}>Love. Rate. Return</span>
                <br />
                To Every Day.
              </h1>
              <p style={styles.heroBody}>
                Native iOS, Android, and cross-platform mobile apps engineered
                for performance, designed for delight, and built to scale — from
                idea to App Store launch and beyond.
              </p>
              <div style={styles.heroCTARow}>
                <button
                  style={styles.heroBtnPrimary}
                  onClick={() => navigate("/contact")}
                >
                  Start Your App <IcoArrow />
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
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80"
                alt="Close-up of a mobile phone showing a running app, representing our mobile app development process"
                style={styles.aboutImgMain}
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&q=80"
                alt="Multiple smartphone screens displaying polished app UI designs"
                style={styles.aboutImgSecondary}
                className="about-img-sec"
                loading="lazy"
                decoding="async"
              />
              <div style={styles.aboutFloatBadge} className="about-badge">
                <div>
                  <div style={styles.aboutBadgeNum}>4.8★</div>
                  <div style={styles.aboutBadgeLabel}>
                    Average
                    <br />
                    Store Rating
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
                What Is <span style={styles.titleAccent}>App Development?</span>
              </h2>
              <p style={styles.aboutP}>
                App development is the end-to-end process of designing,
                building, testing, and launching mobile applications for iOS and
                Android devices. A great app isn't just functional — it's fast,
                intuitive, and genuinely enjoyable to use. It solves a real
                problem in a way that keeps users coming back.
              </p>
              <p style={styles.aboutP}>
                Whether you need a consumer-facing product, an internal
                enterprise tool, or a platform that powers your entire business,
                we have the expertise to build it — from a lean MVP to a
                full-scale application with hundreds of thousands of users.
              </p>
              <div style={styles.aboutPullQuote}>
                "We don't just write code — we think deeply about your users'
                experience at every step, because the difference between a good
                app and a great app is felt in the details."
              </div>
              <div style={styles.aboutChecks}>
                {[
                  "End-to-end ownership — design, development, QA, launch, and support",
                  "Agile sprints with working builds every two weeks for full visibility",
                  "Native performance on iOS and Android — no compromises",
                  "App Store & Play Store launch management included",
                  "Post-launch analytics, crash monitoring, and ongoing maintenance",
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
              What We Build
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              Full-Cycle <span style={styles.titleAccent}>App Development</span>
            </h2>
            <p style={styles.sectionSub}>
              From native iOS and Android to cross-platform, PWAs, and the
              backend that powers it all — every layer handled by specialists.
            </p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} s={s} />
            ))}
          </div>
        </div>

        {/* ══ APP TYPES ══ */}
        <div style={styles.appTypesBg}>
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ ...styles.eyebrow, color: T.gold }}>
              <div style={styles.eyebrowLine} />
              Industries & App Types
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={{ ...styles.sectionTitle, color: T.white }}>
              Apps Built for{" "}
              <span style={styles.titleAccent}>Every Industry</span>
            </h2>
            <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
              We've built apps across 6 major industries with deep domain
              knowledge and feature sets specific to each sector.
            </p>
          </div>
          <div style={styles.appTypesGrid} className="app-types-grid">
            {APP_TYPES.map((item) => (
              <AppTypeCard key={item.type} item={item} />
            ))}
          </div>
        </div>

        {/* ══ TECH STACK ══ */}
        <div style={styles.techBg}>
          <div
            style={{
              ...styles.sectionHeader,
              padding: "0 2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={styles.eyebrow}>
              <div style={styles.eyebrowLine} />
              Technology Stack
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              Built with{" "}
              <span style={styles.titleAccent}>Best-in-Class Tools</span>
            </h2>
            <p style={styles.sectionSub}>
              We use the right technology for each layer of your app — proven,
              modern, and maintainable by any developer long after launch.
            </p>
          </div>
          <div style={styles.techGrid} className="tech-grid">
            {TECH_STACK.map((tech) => (
              <div key={tech.category} style={styles.techCard}>
                <div style={styles.techCategory}>{tech.category}</div>
                <div style={styles.techTagRow}>
                  {tech.tools.map((tool) => (
                    <span key={tool} style={styles.techTag}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
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
              How We Build
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              From Idea to <span style={styles.titleAccent}>App Store</span>
            </h2>
            <p style={styles.sectionSub}>
              Our agile process keeps you informed and in control at every step
              — no black boxes, no surprises, just consistent progress.
            </p>
          </div>
          <div style={styles.processGrid} className="process-grid">
            {PROCESS.map((step) => (
              <ProcessCard key={step.step} step={step} />
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
            <div style={styles.ctaEyebrow}>Let's Build Together</div>
            <h2 style={styles.ctaTitle}>
              Have an App Idea?{" "}
              <span style={styles.titleAccent}>
                Let's Make
                <br />
                It Real.
              </span>
            </h2>
            <p style={styles.ctaBody}>
              Share your idea with us — even a rough concept. We'll scope it,
              estimate it, and show you a realistic path from idea to App Store
              launch.
            </p>
            <div style={styles.ctaBtnRow}>
              <button
                style={styles.ctaBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Start Your App <IcoArrow />
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
