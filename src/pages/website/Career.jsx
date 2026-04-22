// import React, { useState, useEffect } from "react";
// import API from "../../libs/apiCall";
// import Loading from "../../components/Loading";
// import { ApplyVacancyModal } from "../../components/Model";
// import { Toaster } from "sonner";
// import { Helmet } from "react-helmet-async";

// export default function Career() {
//   const [vacancyData, setVacancyData] = useState([]);
//   const [pageLoading, setPageLoading] = useState(false);

//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applyId, setApplyId] = useState(null);
//   const [isApplyOpen, setIsApplyOpen] = useState(false);

//   const getVacancy = async () => {
//     try {
//       const { data: res } = await API.get("/vacancy/vacancyActiveList");
//       setVacancyData(res.data.reverse());
//     } catch (error) {
//       console.error(error?.response?.data?.message);
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   const handleToggle = (jobId) => {
//     if (selectedJob === jobId) {
//       setSelectedJob(null);
//     } else {
//       setSelectedJob(jobId);
//     }
//   };

//   const handleApply = (job) => {
//     setApplyId(job);
//     setIsApplyOpen(true);
//   };

//   useEffect(() => {
//     setPageLoading(true);
//     getVacancy();
//   }, []);

//   if (pageLoading) return <Loading />;
//   return (
//     <>
//       <Helmet>
//         <title>Career | Technosaga Infotech</title>
//         <link rel="canonical" href="https://technosagainfotech.in/career" />
//       </Helmet>
//       {isApplyOpen && (
//         <ApplyVacancyModal applyId={applyId} setIsApplyOpen={setIsApplyOpen} />
//       )}
//       <Toaster richColors position="top-center" />
//       <div className="contact-section">
//         <h1>Shape Your Career</h1>
//         <div className="branches-content">
//           <h3>Current Openings</h3>
//           <div className="career-container">
//             {vacancyData.length === 0 ? (
//               <div className="containers">
//                 <img src="static/no-jobs.svg" alt="No Jobs" />
//                 <h4>No current openings that suit you?</h4>
//                 <p>
//                   Stay ahead! Create a job alert and get notified as soon as we
//                   post relevant roles.
//                 </p>
//               </div>
//             ) : (
//               vacancyData.map((job, index) => (
//                 <div className="career-box" key={index}>
//                   <div className="career-info">
//                     <h3>{job.positionName}</h3>
//                     <p className="career-date">{job.date}</p>
//                     <p>
//                       <strong>No. of Position:</strong> {job.numberOfPositions}
//                     </p>
//                     <p>
//                       <strong>Experience:</strong> {job.experience} years
//                     </p>
//                     <p>
//                       <strong>Location:</strong> {job.location}
//                     </p>
//                     <button
//                       className="view-btn"
//                       onClick={() => handleToggle(job?._id)}
//                     >
//                       {selectedJob === job?._id
//                         ? "Hide Details"
//                         : "Show Details"}
//                     </button>
//                     {selectedJob === job?._id && (
//                       <>
//                         <p>
//                           <strong>About Position</strong>
//                         </p>
//                         <p>{job.aboutPosition}</p>
//                       </>
//                     )}
//                   </div>
//                   <div className="career-buttons">
//                     <button
//                       className="apply-btn"
//                       onClick={() => handleApply(job)}
//                     >
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//             {}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import API from "../../libs/apiCall";
import Loading from "../../components/Loading";
import { ApplyVacancyModal } from "../../components/Model";
import { Toaster } from "sonner";
import { Helmet } from "react-helmet-async";

/* ─── icons ─────────────────────────────────────────────────────────── */
const IconClock = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 4.5v3.5l2.5 1.5" strokeLinecap="round" />
  </svg>
);
const IconUsers = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M11 13c0-2.21-1.343-4-3-4S5 10.79 5 13" strokeLinecap="round" />
    <circle cx="8" cy="6" r="2.5" />
    <path d="M14 13c0-1.657-1-3-2.5-3" strokeLinecap="round" />
    <circle cx="13" cy="5.5" r="2" />
  </svg>
);
const IconPin = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>
);
const IconChevron = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    style={{
      transition: "transform 0.3s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
);
const IconBriefcase = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
  >
    <rect x="2" y="8" width="20" height="13" rx="2" />
    <path d="M16 8V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <path d="M12 12v4M10 14h4" strokeLinecap="round" />
  </svg>
);

/* ─── inline styles ──────────────────────────────────────────────────── */
const S = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f9f4ec",
    minHeight: "100vh",
    color: "#1a1208",
  },
  hero: {
    background: "#1a1208",
    padding: "64px 48px 56px",
    position: "relative",
    overflow: "hidden",
    marginTop: 90,
  },
  heroRing1: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.12)",
    pointerEvents: "none",
  },
  heroRing2: {
    position: "absolute",
    bottom: -100,
    left: 24,
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.07)",
    pointerEvents: "none",
  },
  heroRing3: {
    position: "absolute",
    top: "50%",
    right: 120,
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "1px solid rgba(207,150,69,0.08)",
    pointerEvents: "none",
  },
  eyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 10,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "#CF9645",
    marginBottom: 16,
    fontWeight: 500,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 58,
    fontWeight: 600,
    color: "#f9f4ec",
    lineHeight: 1.08,
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 14,
    color: "rgba(249,244,236,0.45)",
    maxWidth: 360,
    lineHeight: 1.8,
  },
  content: { padding: "44px 48px 72px" },
  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 32,
    paddingBottom: 18,
    borderBottom: "1px solid rgba(26,18,8,0.1)",
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 30,
    fontWeight: 600,
    color: "#1a1208",
  },
  countBadge: {
    fontSize: 11,
    fontWeight: 500,
    background: "#CF9645",
    color: "#1a1208",
    padding: "3px 11px",
    borderRadius: 20,
  },
  jobList: { display: "flex", flexDirection: "column", gap: 14 },
  card: (active) => ({
    background: "#fff",
    border: `1px solid ${active ? "#CF9645" : "rgba(26,18,8,0.09)"}`,
    borderRadius: 14,
    overflow: "hidden",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: active ? "0 4px 24px rgba(207,150,69,0.1)" : "none",
  }),
  cardMain: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "start",
    gap: 20,
    padding: "24px 28px",
  },
  jobTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 23,
    fontWeight: 600,
    color: "#1a1208",
    marginBottom: 6,
  },
  jobDate: {
    fontSize: 10,
    color: "#aaa",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  metaRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  pill: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    color: "#555",
    background: "#f0e8d8",
    padding: "5px 12px",
    borderRadius: 20,
    border: "1px solid rgba(26,18,8,0.07)",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
    paddingTop: 2,
  },
  btnApply: {
    background: "#CF9645",
    color: "#1a1208",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    padding: "9px 22px",
    borderRadius: 7,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
    whiteSpace: "nowrap",
  },
  btnDetails: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    color: "#555",
    border: "1px solid rgba(26,18,8,0.14)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    padding: "7px 14px",
    borderRadius: 7,
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    whiteSpace: "nowrap",
  },
  detailPanel: {
    padding: "0 28px 26px",
    borderTop: "1px solid rgba(26,18,8,0.07)",
    animation: "fadeSlide 0.25s ease",
  },
  detailInner: { paddingTop: 20 },
  detailLabel: {
    fontSize: 10,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#CF9645",
    marginBottom: 10,
    fontWeight: 500,
  },
  detailText: { fontSize: 14, color: "#4a3c28", lineHeight: 1.8 },
  /* empty */
  emptyWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "80px 32px",
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "#f0e8d8",
    border: "1px solid rgba(26,18,8,0.09)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(26,18,8,0.25)",
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    fontWeight: 600,
    color: "#1a1208",
    marginBottom: 10,
  },
  emptyText: { fontSize: 14, color: "#999", maxWidth: 300, lineHeight: 1.75 },
  /* error */
  errorBox: {
    background: "#fff5f5",
    border: "1px solid rgba(220,53,69,0.2)",
    borderRadius: 10,
    padding: "20px 24px",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  errorText: { fontSize: 14, color: "#c0392b" },
  btnRetry: {
    background: "transparent",
    color: "#c0392b",
    border: "1px solid rgba(192,57,43,0.35)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    padding: "6px 16px",
    borderRadius: 6,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  /* skeleton */
  skeletonCard: {
    background: "#fff",
    border: "1px solid rgba(26,18,8,0.07)",
    borderRadius: 14,
    padding: "24px 28px",
  },
  skeletonLine: (w, h = 14, mb = 10) => ({
    height: h,
    width: w,
    background: "linear-gradient(90deg,#f0e8d8 25%,#e8dcc8 50%,#f0e8d8 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    borderRadius: 6,
    marginBottom: mb,
  }),
};

/* ─── skeleton loader ────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={S.skeletonCard}>
      <div style={S.skeletonLine("45%", 22, 8)} />
      <div style={S.skeletonLine("22%", 10, 18)} />
      <div style={{ display: "flex", gap: 8 }}>
        <div style={S.skeletonLine("18%", 28, 0)} />
        <div style={S.skeletonLine("18%", 28, 0)} />
        <div style={S.skeletonLine("18%", 28, 0)} />
      </div>
    </div>
  );
}

/* ─── job card ───────────────────────────────────────────────────────── */
function JobCard({ job, isOpen, onToggle, onApply }) {
  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div style={S.card(isOpen)}>
      <div style={S.cardMain}>
        <div>
          <h2 style={S.jobTitle}>{job.positionName}</h2>
          <p style={S.jobDate}>{fmt(job.date)}</p>
          <div style={S.metaRow}>
            <span style={S.pill}>
              <IconClock /> {job.experience} yrs exp
            </span>
            <span style={S.pill}>
              <IconUsers /> {job.numberOfPositions} position
              {job.numberOfPositions !== 1 ? "s" : ""}
            </span>
            <span style={S.pill}>
              <IconPin /> {job.location}
            </span>
          </div>
        </div>
        <div style={S.actions}>
          <button
            style={S.btnApply}
            onClick={() => onApply(job)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e8b96a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#CF9645")}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Apply Now
          </button>
          <button
            style={S.btnDetails}
            onClick={() => onToggle(job._id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#CF9645";
              e.currentTarget.style.background = "rgba(207,150,69,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(26,18,8,0.14)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {isOpen ? "Hide details" : "View details"}
            <IconChevron open={isOpen} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div style={S.detailPanel}>
          <div style={S.detailInner}>
            <p style={S.detailLabel}>About this role</p>
            <p style={S.detailText}>{job.aboutPosition}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────── */
export default function Career() {
  const [vacancyData, setVacancyData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyId, setApplyId] = useState(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const getVacancy = async () => {
    setPageLoading(true);
    setError(null);
    try {
      const { data: res } = await API.get("/vacancy/vacancyActiveList");
      setVacancyData(res.data.reverse());
    } catch (err) {
      console.error(err?.response?.data?.message);
      setError(
        "Could not load job listings. Please check your connection and try again.",
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleToggle = (jobId) =>
    setSelectedJob((prev) => (prev === jobId ? null : jobId));

  const handleApply = (job) => {
    setApplyId(job);
    setIsApplyOpen(true);
  };

  useEffect(() => {
    getVacancy();
  }, []);

  return (
    <>
      <Helmet>
        <title>Career | Technosaga Infotech</title>
        <link rel="canonical" href="https://technosagainfotech.in/career" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .career-card-item {
            animation: fadeUp 0.35s ease both;
          }
        `}</style>
      </Helmet>

      {isApplyOpen && (
        <ApplyVacancyModal applyId={applyId} setIsApplyOpen={setIsApplyOpen} />
      )}

      <div style={S.page}>
        {/* ── hero ── */}
        <div style={S.hero}>
          <div style={S.heroRing1} />
          <div style={S.heroRing2} />
          <div style={S.heroRing3} />
          <p style={S.eyebrow}>Technosaga Infotech</p>
          <h1 style={S.heroTitle}>
            Shape Your
            <br />
            Career
          </h1>
          <p style={S.heroSub}>
            Join a team that builds technology that matters. Explore open roles
            and find your place with us.
          </p>
        </div>

        {/* ── content ── */}
        <div style={S.content}>
          <div style={S.sectionHead}>
            <span style={S.sectionTitle}>Current Openings</span>
            {!pageLoading && !error && (
              <span style={S.countBadge}>
                {vacancyData.length}{" "}
                {vacancyData.length === 1 ? "role" : "roles"}
              </span>
            )}
          </div>

          {/* error */}
          {error && (
            <div style={S.errorBox}>
              <p style={S.errorText}>{error}</p>
              <button style={S.btnRetry} onClick={getVacancy}>
                Retry
              </button>
            </div>
          )}

          {/* loading skeletons */}
          {pageLoading && (
            <div style={S.jobList}>
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* empty state */}
          {!pageLoading && !error && vacancyData.length === 0 && (
            <div style={S.emptyWrap}>
              <div style={S.emptyIcon}>
                <IconBriefcase />
              </div>
              <h3 style={S.emptyTitle}>No openings right now</h3>
              <p style={S.emptyText}>
                No current openings that suit you? Check back soon — new roles
                are posted regularly.
              </p>
            </div>
          )}

          {/* job cards */}
          {!pageLoading && !error && vacancyData.length > 0 && (
            <div style={S.jobList}>
              {vacancyData.map((job, i) => (
                <div
                  key={job._id}
                  className="career-card-item"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <JobCard
                    job={job}
                    isOpen={selectedJob === job._id}
                    onToggle={handleToggle}
                    onApply={handleApply}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
