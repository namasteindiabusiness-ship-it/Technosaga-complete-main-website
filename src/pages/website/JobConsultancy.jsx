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

const FOR_EMPLOYERS = [
  {
    icon: "🔍",
    title: "Executive Search",
    desc: "Retained and contingency search for C-suite, VP, and senior leadership roles — discreet, thorough, and delivered within agreed timelines.",
  },
  {
    icon: "📋",
    title: "Bulk Recruitment",
    desc: "High-volume hiring campaigns for entry to mid-level positions, managed end-to-end with screening, shortlisting, and interview coordination.",
  },
  {
    icon: "🌐",
    title: "Overseas Manpower Supply",
    desc: "End-to-end placement of qualified candidates for international roles — documentation, visa processing, and pre-departure orientation included.",
  },
  {
    icon: "⚡",
    title: "Contract & Temp Staffing",
    desc: "Flexible workforce solutions for short-term projects, seasonal peaks, and interim management — pre-vetted candidates available fast.",
  },
  {
    icon: "🏗️",
    title: "Industry Specialists",
    desc: "Dedicated desks for Construction, IT, Healthcare, Finance, Hospitality, and Manufacturing — consultants who know your sector inside out.",
  },
  {
    icon: "📊",
    title: "HR Advisory Services",
    desc: "Compensation benchmarking, organisational design, employee retention strategies, and HR policy consulting for growing businesses.",
  },
];

const FOR_CANDIDATES = [
  {
    icon: "📝",
    title: "CV & Resume Writing",
    desc: "ATS-optimised CVs and compelling cover letters crafted by specialist writers who know what hiring managers and algorithms look for.",
  },
  {
    icon: "🎯",
    title: "Career Coaching",
    desc: "One-on-one sessions to clarify your career direction, overcome plateaus, and build a strategic plan to reach your professional goals.",
  },
  {
    icon: "🤝",
    title: "Interview Preparation",
    desc: "Role-specific mock interviews, competency frameworks, industry insights, and feedback sessions to maximise your confidence and performance.",
  },
  {
    icon: "🌍",
    title: "International Placement",
    desc: "Access to exclusive overseas job opportunities in the Gulf, UK, Europe, Canada, and Australia — with full documentation and visa support.",
  },
  {
    icon: "💼",
    title: "Salary Negotiation",
    desc: "Market intelligence and negotiation coaching to help you command the compensation you deserve — not just the first offer you receive.",
  },
  {
    icon: "🎓",
    title: "Skills & Upskilling Guidance",
    desc: "Assessment of your current skills, identification of gaps, and a roadmap of certifications and courses that will accelerate your job search.",
  },
];

const INDUSTRIES = [
  {
    icon: "💻",
    name: "Information Technology",
    roles: "Developers, DevOps, Data Scientists, Product Managers",
  },
  {
    icon: "🏥",
    name: "Healthcare & Medical",
    roles: "Nurses, Doctors, Allied Health, Admin",
  },
  {
    icon: "🏦",
    name: "Banking & Finance",
    roles: "Analysts, Compliance, Risk, Investment Banking",
  },
  {
    icon: "🏗️",
    name: "Construction & Engineering",
    roles: "Civil, Structural, MEP, Project Management",
  },
  {
    icon: "🛒",
    name: "Retail & FMCG",
    roles: "Sales, Supply Chain, Category Management, Marketing",
  },
  {
    icon: "✈️",
    name: "Hospitality & Tourism",
    roles: "Front Office, F&B, Events, Hotel Management",
  },
  {
    icon: "🎓",
    name: "Education & Training",
    roles: "Teachers, Trainers, Academic Administrators",
  },
  {
    icon: "🏭",
    name: "Manufacturing & Logistics",
    roles: "Operations, Quality, Supply Chain, Warehouse",
  },
];

const PROCESS_EMPLOYER = [
  {
    step: "01",
    title: "Needs Assessment",
    desc: "We meet with your team to understand the role, culture, compensation structure, and ideal candidate profile before beginning any search.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    imgAlt:
      "HR team conducting a recruitment needs assessment meeting around a conference table",
  },
  {
    step: "02",
    title: "Talent Search",
    desc: "Our consultants activate their networks, database, and targeted headhunting strategies to identify the strongest candidates in the market.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    imgAlt:
      "Recruitment consultant searching for candidates on a laptop in a modern office",
  },
  {
    step: "03",
    title: "Screening & Shortlist",
    desc: "Multi-stage candidate evaluation — competency interviews, technical assessments, reference checks — resulting in a curated shortlist of 3–5.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    imgAlt:
      "HR professional conducting a candidate screening interview in a professional setting",
  },
  {
    step: "04",
    title: "Interview Management",
    desc: "We coordinate interviews, provide candidate briefings, gather post-interview feedback, and manage expectations on both sides.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    imgAlt:
      "Panel interview being conducted with a candidate in a professional boardroom",
  },
  {
    step: "05",
    title: "Offer & Negotiation",
    desc: "Facilitation of the offer stage — managing expectations, countering offers, and ensuring both parties reach a successful agreement.",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    imgAlt:
      "Employer and recruitment consultant shaking hands after finalising a job offer",
  },
  {
    step: "06",
    title: "Onboarding Support",
    desc: "Post-placement check-ins with both candidate and employer to ensure a smooth transition, with our guarantee period providing peace of mind.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
    imgAlt:
      "New employee being welcomed and onboarded by HR team on their first day at work",
  },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Al-Farsi",
    role: "HR Director, Gulf Constructions LLC",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    type: "employer",
    quote:
      "We needed 45 engineers placed in Dubai within 8 weeks. The team delivered exactly that — pre-screened, qualified, and documentation-ready candidates. Unmatched speed and professionalism in overseas recruitment.",
  },
  {
    name: "Priya Shankar",
    role: "Registered Nurse, placed in the UK",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    type: "candidate",
    quote:
      "I had been trying to get a UK nursing placement for 2 years. Within 3 months of working with this consultancy, I had my offer letter, visa, and even help finding accommodation. They changed my life.",
  },
  {
    name: "Carlos Mendez",
    role: "Software Developer, placed in Canada",
    avatar: "https://i.pravatar.cc/80?img=68",
    rating: 5,
    type: "candidate",
    quote:
      "The CV rewrite alone was a game-changer — I started getting responses from companies I'd been applying to for months. Their interview coaching was incredibly thorough. I landed a Senior Developer role in Toronto.",
  },
];

const FAQS = [
  {
    q: "How long does a typical recruitment placement take?",
    a: "For standard mid-level roles, we typically present a shortlist within 5–10 business days. Senior executive search takes 3–6 weeks. Overseas placements with visa processing vary by destination but typically take 6–12 weeks from agreement to departure.",
  },
  {
    q: "Do you handle visa and documentation for overseas placements?",
    a: "Yes — end-to-end. Our overseas placement service includes CV formatting for destination requirements, attestation guidance, medical fitness coordination, visa application assistance, and pre-departure orientation. We have dedicated visa processing specialists on our team.",
  },
  {
    q: "What is your replacement guarantee?",
    a: "Our contingency placements come with a 60-day free replacement guarantee. If the placed candidate leaves within 60 days for any reason, we will find a replacement at no additional charge. Retained search clients receive a 90-day guarantee.",
  },
  {
    q: "What industries do you specialise in?",
    a: "We have dedicated desks for IT, Healthcare, Construction & Engineering, Banking & Finance, Retail & FMCG, Hospitality, Education, and Manufacturing. Each desk is staffed by consultants who have worked in those industries, not just recruited for them.",
  },
  {
    q: "I'm a candidate — is your service free?",
    a: "Candidate registration, job matching, and overseas placement services are completely free for candidates. We are paid by employers. Premium services like CV writing, career coaching, and interview preparation are available at affordable flat fees.",
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
    minHeight: 660,
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
      "linear-gradient(105deg, rgba(10,6,0,0.95) 0%, rgba(10,6,0,0.82) 55%, rgba(10,6,0,0.45) 100%)",
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

  /* ── HERO RIGHT — IMAGE COLLAGE ── */
  heroImageCollage: {
    position: "relative",
    height: 400,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  heroImgRow1: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "0.75rem",
    flex: "0 0 55%",
  },
  heroImgRow2: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
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
    justifyContent: "space-around",
    gap: "1rem",
    flexWrap: "wrap",
  },
  trustItem: { display: "flex", alignItems: "center", gap: 8 },
  trustDot: { width: 6, height: 6, borderRadius: "50%", background: T.gold },
  trustText: {
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

  /* ── TWO TABS: EMPLOYERS & CANDIDATES ── */
  dualBg: {
    background: `linear-gradient(180deg, ${T.bg} 0%, #f0e8dc 100%)`,
    padding: "5rem 0",
  },
  dualWrap: { maxWidth: 1200, margin: "0 auto", padding: "0 2rem" },
  dualGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "start",
  },
  dualCol: {
    background: T.white,
    borderRadius: T.radius.xl,
    padding: "2rem 2rem 1.5rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 4px 24px rgba(160,110,30,0.08)",
  },
  dualColHeader: {
    marginBottom: "1.5rem",
    paddingBottom: "1.2rem",
    borderBottom: `1px solid ${T.goldBorder}`,
  },
  dualColBadge: {
    display: "inline-block",
    background: T.gold,
    color: T.white,
    fontSize: "0.62rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: 4,
    marginBottom: 8,
  },
  dualColTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: T.text,
    margin: 0,
  },
  dualServiceList: { display: "flex", flexDirection: "column", gap: "0.9rem" },
  dualServiceItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "0.8rem 0.9rem",
    borderRadius: T.radius.md,
    transition: "background 0.18s",
    cursor: "default",
  },
  dualServiceIcon: {
    width: 38,
    height: 38,
    borderRadius: T.radius.sm,
    background: T.goldLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    flexShrink: 0,
    border: `1px solid ${T.goldBorder}`,
  },
  dualServiceTitle: {
    fontSize: "0.87rem",
    fontWeight: 700,
    color: T.text,
    marginBottom: 2,
  },
  dualServiceDesc: { fontSize: "0.78rem", color: T.textMuted, lineHeight: 1.6 },

  /* ── INDUSTRIES ── */
  industriesBg: { background: T.dark, padding: "5rem 0" },
  industriesGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.2rem",
  },
  industryCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: T.radius.lg,
    padding: "1.4rem 1.3rem",
    border: "1px solid rgba(207,150,69,0.15)",
    transition: "border-color 0.22s, background 0.22s",
  },
  industryIcon: {
    fontSize: "1.5rem",
    marginBottom: "0.6rem",
    display: "block",
  },
  industryName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 4px",
  },
  industryRoles: {
    fontSize: "0.76rem",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.5,
  },

  /* ── OVERSEAS DESTINATIONS ── */
  destBg: {
    background: T.goldLight,
    padding: "5rem 0",
    borderTop: `1px solid ${T.goldBorder}`,
  },
  destGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.2rem",
  },
  destCard: {
    background: T.white,
    borderRadius: T.radius.lg,
    padding: "1.4rem 1.5rem",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 12px rgba(160,110,30,0.07)",
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  destFlag: { fontSize: "2rem", lineHeight: 1, flexShrink: 0 },
  destCountry: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: T.text,
    marginBottom: 4,
  },
  destDesc: { fontSize: "0.8rem", color: T.textMuted, lineHeight: 1.65 },

  /* ── PROCESS ── */
  processBg: { background: T.bg, padding: "5rem 0" },
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

  /* ── PLACEMENTS ── */
  placementGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.4rem",
  },
  placementCard: {
    background: T.white,
    borderRadius: T.radius.xl,
    overflow: "hidden",
    border: `1px solid ${T.goldBorder}`,
    boxShadow: "0 2px 14px rgba(160,110,30,0.08)",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  placementImgWrap: { height: 200, overflow: "hidden", position: "relative" },
  placementImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.45s ease",
  },
  placementOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,6,0,0.65) 0%, transparent 50%)",
  },
  placementTag: {
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
  placementBody: { padding: "1.3rem 1.5rem 1.5rem" },
  placementCompany: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: T.text,
    margin: "0 0 3px",
  },
  placementLocation: {
    fontSize: "0.78rem",
    color: T.textMuted,
    marginBottom: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  placementMetricRow: {
    display: "flex",
    gap: "1rem",
    paddingTop: "0.8rem",
    borderTop: `1px dashed ${T.goldBorder}`,
  },
  placementRoles: {
    fontSize: "0.78rem",
    color: T.textMid,
    fontWeight: 500,
    flex: 1,
  },
  placementCount: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: T.gold,
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
    position: "relative",
    overflow: "hidden",
  },
  tTypeBadge: {
    display: "inline-block",
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 3,
    marginBottom: "0.8rem",
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

  /* ── DUAL CTA ── */
  dualCtaBg: {
    background: `linear-gradient(135deg, ${T.darkMid} 0%, ${T.darkSoft} 100%)`,
    padding: "5rem 2rem",
    position: "relative",
    overflow: "hidden",
  },
  dualCtaGlow: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(207,150,69,0.09) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    pointerEvents: "none",
  },
  dualCtaInner: { position: "relative", maxWidth: 1200, margin: "0 auto" },
  dualCtaHeading: { textAlign: "center", marginBottom: "2.5rem" },
  dualCtaEyebrow: {
    fontSize: "0.68rem",
    fontWeight: 700,
    color: T.gold,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  dualCtaTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
    fontWeight: 700,
    color: T.white,
    margin: 0,
    lineHeight: 1.12,
  },
  dualCtaCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  dualCtaCard: {
    background: "rgba(255,255,255,0.06)",
    borderRadius: T.radius.xl,
    padding: "2.2rem 2rem",
    border: "1px solid rgba(207,150,69,0.2)",
    textAlign: "center",
  },
  dualCtaCardHL: {
    background: "rgba(207,150,69,0.14)",
    borderRadius: T.radius.xl,
    padding: "2.2rem 2rem",
    border: `1.5px solid ${T.gold}`,
    textAlign: "center",
  },
  dualCtaCardIcon: {
    fontSize: "2rem",
    marginBottom: "0.8rem",
    display: "block",
  },
  dualCtaCardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: T.white,
    margin: "0 0 0.5rem",
  },
  dualCtaCardDesc: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.7,
    marginBottom: "1.5rem",
  },
  dualCtaCardBtnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: T.gold,
    color: T.white,
    borderRadius: T.radius.sm,
    padding: "10px 22px",
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    border: "none",
    cursor: "pointer",
  },
  dualCtaCardBtnOutline: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "rgba(255,255,255,0.65)",
    borderRadius: T.radius.sm,
    padding: "10px 22px",
    fontSize: "0.82rem",
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
const IcoPin = ({ size = 12, color = T.textMuted }) => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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
function DualServiceItem({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.dualServiceItem,
        background: hov ? T.goldLight : "transparent",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.dualServiceIcon}>{s.icon}</div>
      <div>
        <div style={styles.dualServiceTitle}>{s.title}</div>
        <div style={styles.dualServiceDesc}>{s.desc}</div>
      </div>
    </div>
  );
}

function IndustryCard({ item }) {
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
      <span style={styles.industryIcon}>{item.icon}</span>
      <div style={styles.industryName}>{item.name}</div>
      <div style={styles.industryRoles}>{item.roles}</div>
    </div>
  );
}

function DestCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        ...styles.destCard,
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov
          ? "0 10px 28px rgba(160,110,30,0.15)"
          : "0 2px 12px rgba(160,110,30,0.07)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={styles.destFlag}>{item.flag}</div>
      <div>
        <div style={styles.destCountry}>{item.country}</div>
        <div style={styles.destDesc}>{item.desc}</div>
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

export default function JobConsultancy() {
  const navigate = useNavigate();
  return (
    <div style={styles.page}>
      {/* ══ SEO HELMET ══ */}
      <Helmet>
        <title>
          Professional Job Consultancy & Recruitment Services | Local & Overseas
          Placement
        </title>
        <meta
          name="description"
          content="Expert job consultancy connecting top talent with leading employers. Executive search, bulk recruitment, overseas manpower supply to UAE, UK, Canada, Australia & more. 5,000+ placements across 8 industries."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Job Consultancy Services" />

        <link
          rel="canonical"
          href="https://yourdomain.com/services/job-consultancy"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <style>{`
        @media (max-width: 1024px) {
          .industries-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr !important; gap: 2.5rem !important; padding: 4rem 1.5rem !important; }
          .hero-image-collage { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-sec { display: none !important; }
          .about-badge { left: 12px !important; }
          .dual-grid { grid-template-columns: 1fr !important; }
          .industries-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dest-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-grid, .placement-grid, .testimonial-grid, .pkg-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dual-cta-cards { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .industries-grid, .process-grid, .placement-grid, .testimonial-grid, .pkg-grid, .dest-grid { grid-template-columns: 1fr !important; }
          .section-wrap { padding: 3rem 1.2rem !important; }
          .trust-inner { gap: 0.8rem !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=80"
          alt="Diverse team of professional recruitment consultants collaborating in a bright modern office"
          style={styles.heroBgImg}
          decoding="async"
        />
        <div style={styles.heroBgOverlay} />
        <div style={styles.heroInner} className="hero-inner">
          {/* LEFT — Copy */}
          <div>
            <div style={styles.heroBadge}>
              <span style={styles.heroBadgeDot} />
              <span style={styles.heroBadgeText}>Job Consultancy</span>
            </div>
            <h1 style={styles.heroTitle}>
              The Right Talent.
              <br />
              The Right <span style={styles.heroAccent}>Opportunity.</span>
              <br />
              Every Time.
            </h1>
            <p style={styles.heroBody}>
              Connecting exceptional candidates with outstanding employers —
              locally and globally. Whether you're scaling your team or
              advancing your career, we make the right match happen.
            </p>
            <div style={styles.heroCTARow}>
              <button
                style={styles.heroBtnPrimary}
                onClick={() => navigate("/contact")}
              >
                Hire Talent <IcoArrow />
              </button>
              <button
                style={styles.heroBtnOutline}
                onClick={() => navigate("/career")}
              >
                Find a Job
              </button>
            </div>
          </div>

          {/* RIGHT — Image Collage */}
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
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80"
                  alt="Recruiter conducting a professional candidate interview in an office setting"
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
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80"
                  alt="Successful job placement handshake between employer and candidate"
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
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80"
                  alt="HR consultancy team planning recruitment strategy in a collaborative meeting"
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
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&q=80"
                  alt="New employee being onboarded and welcomed by HR team in a corporate office"
                  style={styles.heroCollageImg}
                  loading="eager"
                  decoding="async"
                />
                {/* Stats badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "rgba(10,6,0,0.78)",
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
                    5,000+
                  </div>
                  <div
                    style={{
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.08em",
                      marginTop: 2,
                    }}
                  >
                    PLACED
                  </div>
                </div>
              </div>
            </div>
            {/* Tag strip */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 4,
              }}
            >
              {[
                "500+ Employers",
                "15+ Countries",
                "8 Industries",
                "60-Day Guarantee",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(207,150,69,0.15)",
                    border: "1px solid rgba(207,150,69,0.3)",
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: 100,
                    letterSpacing: "0.06em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <div style={styles.aboutBg}>
        <div style={styles.aboutGrid} className="about-grid">
          <div style={styles.aboutImgCol}>
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80"
              alt="Senior recruitment consultant reviewing candidate profiles and employer requirements in a professional office"
              style={styles.aboutImgMain}
              loading="lazy"
              decoding="async"
            />
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80"
              alt="One-on-one career coaching and interview preparation session with a job seeker"
              style={styles.aboutImgSecondary}
              className="about-img-sec"
              loading="lazy"
              decoding="async"
            />
            <div style={styles.aboutFloatBadge} className="about-badge">
              <div>
                <div style={styles.aboutBadgeNum}>5K+</div>
                <div style={styles.aboutBadgeLabel}>
                  Candidates
                  <br />
                  Placed
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
              What Is <span style={styles.titleAccent}>Job Consultancy</span>
              <br />& How Do We Help?
            </h2>
            <p style={styles.aboutP}>
              Job consultancy is the professional service of connecting talent
              with opportunity — matching the right candidates to the right
              roles with precision, speed, and expertise. For employers, we
              eliminate the cost and friction of in-house hiring. For
              candidates, we open doors that would otherwise be difficult to
              find or access.
            </p>
            <p style={styles.aboutP}>
              We go beyond simple job boards and CV databases. Our consultants
              develop deep relationships with both sides of the hiring equation
              — understanding not just what skills are on a CV, but what drives
              a candidate's career decisions and what culture will make them
              thrive.
            </p>
            <div style={styles.aboutPullQuote}>
              "We don't fill vacancies — we build teams and transform careers.
              The right placement changes everything for both sides."
            </div>
            <div style={styles.aboutChecks}>
              {[
                "Dedicated sector consultants with industry-specific expertise",
                "Access to exclusive unadvertised roles and pre-vetted talent pools",
                "End-to-end overseas placement with visa and documentation support",
                "60-day replacement guarantee on all permanent placements",
                "Free service for candidates — career coaching, CV writing, interview prep",
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

      {/* ══ FOR EMPLOYERS & CANDIDATES ══ */}
      <div style={styles.dualBg}>
        <div style={styles.dualWrap}>
          <div style={{ ...styles.sectionHeader, marginBottom: "2.5rem" }}>
            <div style={styles.eyebrow}>
              <div style={styles.eyebrowLine} />
              Our Services
              <div style={styles.eyebrowLine} />
            </div>
            <h2 style={styles.sectionTitle}>
              Solutions for{" "}
              <span style={styles.titleAccent}>Employers & Candidates</span>
            </h2>
            <p style={styles.sectionSub}>
              Whether you're looking to hire or looking for a job, we have a
              tailored set of services built specifically for you.
            </p>
          </div>
          <div style={styles.dualGrid} className="dual-grid">
            <div style={styles.dualCol}>
              <div style={styles.dualColHeader}>
                <span style={styles.dualColBadge}>For Employers</span>
                <h3 style={styles.dualColTitle}>Hire the Best Talent</h3>
              </div>
              <div style={styles.dualServiceList}>
                {FOR_EMPLOYERS.map((s) => (
                  <DualServiceItem key={s.title} s={s} />
                ))}
              </div>
            </div>
            <div style={styles.dualCol}>
              <div style={styles.dualColHeader}>
                <span
                  style={{ ...styles.dualColBadge, background: T.goldDark }}
                >
                  For Candidates
                </span>
                <h3 style={styles.dualColTitle}>Advance Your Career</h3>
              </div>
              <div style={styles.dualServiceList}>
                {FOR_CANDIDATES.map((s) => (
                  <DualServiceItem key={s.title} s={s} />
                ))}
              </div>
            </div>
          </div>
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
            Sectors
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={{ ...styles.sectionTitle, color: T.white }}>
            8 Industry <span style={styles.titleAccent}>Specialist Desks</span>
          </h2>
          <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.4)" }}>
            Our consultants don't just recruit across industries — they come
            from them. Deep expertise in every sector we serve.
          </p>
        </div>
        <div style={styles.industriesGrid} className="industries-grid">
          {INDUSTRIES.map((item) => (
            <IndustryCard key={item.name} item={item} />
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
            Our 6-Step{" "}
            <span style={styles.titleAccent}>Recruitment Process</span>
          </h2>
          <p style={styles.sectionSub}>
            A structured, transparent approach to every placement — from initial
            needs assessment to onboarding support and beyond.
          </p>
        </div>
        <div style={styles.processGrid} className="process-grid">
          {PROCESS_EMPLOYER.map((step) => (
            <ProcessCard key={step.step} step={step} />
          ))}
        </div>
      </div>

      {/* ══ TESTIMONIALS ══ */}
      <div style={styles.sectionWrap} className="section-wrap">
        <div style={styles.sectionHeader}>
          <div style={styles.eyebrow}>
            <div style={styles.eyebrowLine} />
            Employer & Candidate Stories
            <div style={styles.eyebrowLine} />
          </div>
          <h2 style={styles.sectionTitle}>
            What They <span style={styles.titleAccent}>Say About Us</span>
          </h2>
        </div>
        <div style={styles.testimonialGrid} className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={styles.tCard}>
              <span
                style={{
                  ...styles.tTypeBadge,
                  background: t.type === "employer" ? T.gold : T.goldDark,
                  color: T.white,
                }}
              >
                {t.type === "employer" ? "Employer" : "Candidate"}
              </span>
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
                  alt={`${t.name} — ${t.role} testimonial`}
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
    </div>
  );
}
