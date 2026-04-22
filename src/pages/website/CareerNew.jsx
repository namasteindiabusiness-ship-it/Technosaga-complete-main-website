import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import API from "../../libs/apiCall";
import { BiLoader } from "react-icons/bi";

const JOBS = [
  { id: 1, title: "Software Developer", type: "Full-Time", location: "Patna, Bihar", exp: "1–3 Years", desc: "We are looking for a skilled Software Developer to design, develop, and maintain high-quality web and mobile applications. You'll work closely with our design and product teams.", skills: ["React / Node.js", "REST APIs", "MySQL / MongoDB", "Git & Version Control"] },
  { id: 2, title: "Digital Marketer", type: "Full-Time", location: "Patna, Bihar", exp: "1–2 Years", desc: "Drive our clients' digital growth through SEO, social media, content strategy, and paid advertising. Strong analytical skills and creativity are essential.", skills: ["SEO & SEM", "Meta & Google Ads", "Content Strategy", "Analytics & Reporting"] },
  { id: 3, title: "Data Entry Operator", type: "Full-Time", location: "Patna, Bihar", exp: "0–1 Year", desc: "Accurately enter and manage data across various platforms and tools. Attention to detail, speed, and accuracy are key requirements for this role.", skills: ["MS Excel / Word", "Fast Typing Speed", "Data Accuracy", "Basic Computer Skills"] },
  { id: 4, title: "Telecaller", type: "Full-Time", location: "Patna, Bihar", exp: "0–1 Year", desc: "Make outbound calls to potential customers, explain our services, and generate qualified leads. Strong communication skills in Hindi and English required.", skills: ["Communication Skills", "Lead Generation", "CRM Tools", "Hindi & English Fluency"] },
  { id: 5, title: "Field Executive", type: "Full-Time", location: "Patna, Bihar", exp: "1–2 Years", desc: "Meet potential clients, present our services, and close deals on the field. A two-wheeler and valid driving licence are required.", skills: ["Client Handling", "Sales Skills", "Field Visits", "Two-Wheeler Required"] },
  { id: 6, title: "Sales Executive", type: "Full-Time", location: "Patna, Bihar", exp: "1–3 Years", desc: "Drive revenue growth by identifying opportunities, pitching our services, and building long-term client relationships across multiple industries.", skills: ["B2B/B2C Sales", "Negotiation", "Target Achievement", "Relationship Building"] },
  { id: 7, title: "Product Sales Executive (Freelancer)", type: "Freelance", location: "Remote / Pan India", exp: "Any", desc: "Earn attractive commissions by selling our IT products and services on a freelance basis. Flexible working hours — ideal for students and part-time professionals.", skills: ["Sales Mindset", "Self-Motivated", "Communication", "Flexible Hours"] },
];

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: "", mobile: "", whatsapp: "", email: "", resume: null });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("Enter a valid 10-digit mobile number."); return; }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) { toast.error("Enter a valid email address."); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("mobile", form.mobile);
      fd.append("whatsapp", form.whatsapp);
      fd.append("email", form.email);
      fd.append("job_role", job.title);
      if (form.resume) fd.append("resume", form.resume);
      await API.post("/career/apply", fd);
      toast.success("Application submitted successfully! We'll contact you soon.");
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crm-modal-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="crm-modal">
        <div className="crm-modal-head">
          <div>
            <div className="crm-modal-role">{job.title}</div>
            <div className="crm-modal-tag">{job.type} · {job.location}</div>
          </div>
          <button className="crm-modal-close" onClick={onClose}>✕</button>
        </div>

        {done ? (
          <div className="crm-modal-done">
            <div className="crm-done-icon">✅</div>
            <h3>Application Submitted!</h3>
            <p>Thank you for applying. Our HR team will review your application and contact you within 2–3 business days.</p>
            <button className="crm-done-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="crm-modal-form" onSubmit={handleSubmit}>
            <div className="crm-row-2">
              <div className="crm-field">
                <label className="crm-label">Full Name *</label>
                <input className="crm-input" value={form.name} onChange={set("name")} placeholder="Your full name" required />
              </div>
              <div className="crm-field">
                <label className="crm-label">Mobile Number *</label>
                <input className="crm-input" value={form.mobile} onChange={set("mobile")} placeholder="10-digit number" maxLength={10} required />
              </div>
            </div>
            <div className="crm-row-2">
              <div className="crm-field">
                <label className="crm-label">WhatsApp Number</label>
                <input className="crm-input" value={form.whatsapp} onChange={set("whatsapp")} placeholder="WhatsApp number" maxLength={10} />
              </div>
              <div className="crm-field">
                <label className="crm-label">Email Address *</label>
                <input type="email" className="crm-input" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
              </div>
            </div>
            <div className="crm-field">
              <label className="crm-label">Upload Resume (PDF/DOC)</label>
              <input type="file" className="crm-input crm-file" accept=".pdf,.doc,.docx" onChange={(e) => setForm((p) => ({ ...p, resume: e.target.files[0] }))} />
            </div>
            <button type="submit" className="crm-submit" disabled={loading}>
              {loading && <BiLoader size={18} className="spin" />}
              {loading ? "Submitting..." : "Submit Application →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function CareerNew() {
  const [expanded, setExpanded] = useState(null);
  const [applying, setApplying] = useState(null);

  return (
    <>
      <Helmet>
        <title>Careers at Technosaga Infotech | Join Our Team in Patna</title>
        <meta name="description" content="Join Technosaga Infotech — Patna's leading digital marketing and IT company. Explore exciting career opportunities in software development, digital marketing, sales, BPO, and more." />
        <link rel="canonical" href="https://technosagainfotech.in/career" />
      </Helmet>

      {applying && <ApplyModal job={applying} onClose={() => setApplying(null)} />}

      <div className="crp" style={{ paddingTop: 72 }}>
        {/* Banner */}
        <div className="crp__banner">
          <div className="crp__banner-bg" />
          <div className="crp__banner-content">
            <div className="crp__eyebrow">Join Our Team</div>
            <h1 className="crp__h1">Build Your <span className="crp__gold">Career</span> With Us</h1>
            <p className="crp__sub">We're always looking for talented, passionate individuals to join our growing team. Explore opportunities below and take the next step in your career.</p>
            <div className="crp__perks">
              {["🚀 Fast Growth", "💰 Competitive Pay", "🎓 Learning Culture", "🤝 Great Team"].map((p) => (
                <span key={p} className="crp__perk">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Job listings */}
        <div className="crp__main">
          <div className="crp__inner">
            <div className="crp__section-head">
              <h2 className="crp__section-h2">Current <span className="crp__gold">Openings</span></h2>
              <p className="crp__section-sub">{JOBS.length} positions available · Patna, Bihar & Remote</p>
            </div>

            <div className="crp__jobs">
              {JOBS.map((job) => (
                <div key={job.id} className={`crp__job${expanded === job.id ? " crp__job--open" : ""}`}>
                  <div className="crp__job-header" onClick={() => setExpanded(expanded === job.id ? null : job.id)}>
                    <div className="crp__job-left">
                      <h3 className="crp__job-title">{job.title}</h3>
                      <div className="crp__job-meta">
                        <span className="crp__job-tag crp__job-tag--type">{job.type}</span>
                        <span className="crp__job-tag">📍 {job.location}</span>
                        <span className="crp__job-tag">⏱️ {job.exp}</span>
                      </div>
                    </div>
                    <div className="crp__job-right">
                      <button className="crp__apply-quick" onClick={(e) => { e.stopPropagation(); setApplying(job); }}>Apply Now</button>
                      <span className="crp__toggle">{expanded === job.id ? "▴" : "▾"}</span>
                    </div>
                  </div>

                  <div className="crp__job-body">
                    <p className="crp__job-desc">{job.desc}</p>
                    <div className="crp__skills">
                      <div className="crp__skills-label">Key Skills Required:</div>
                      <div className="crp__skills-list">
                        {job.skills.map((s) => (
                          <span key={s} className="crp__skill">{s}</span>
                        ))}
                      </div>
                    </div>
                    <button className="crp__apply-full" onClick={() => setApplying(job)}>
                      Apply for This Position →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* General apply card */}
            <div className="crp__general">
              <div className="crp__general-icon">💼</div>
              <h3 className="crp__general-h3">Don't See a Suitable Role?</h3>
              <p className="crp__general-p">Send us your CV anyway — we're always open to meeting talented individuals who share our passion for technology and growth.</p>
              <a href="mailto:technosagainfotech@mail.com?subject=General Application — Technosaga Infotech" className="crp__general-btn">
                Send Your CV →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .crp { background: #0B0F1A; font-family: 'Poppins', sans-serif; }
        .crp__gold { color: #D4AF37; }

        /* Banner */
        .crp__banner { position: relative; padding: 5rem 1.5rem 4rem; text-align: center; overflow: hidden; }
        .crp__banner-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0B0F1A 0%, #121826 100%);
        }
        .crp__banner-bg::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%);
        }
        .crp__banner-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .crp__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: #D4AF37; background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px; padding: 6px 16px; margin-bottom: 1.2rem;
        }
        .crp__h1 {
          font-family: 'Montserrat', sans-serif; font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .crp__sub { font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 1.5rem; }
        .crp__perks { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
        .crp__perk {
          font-size: 0.8rem; color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 5px 14px;
        }

        /* Main */
        .crp__main { padding: 4rem 0 6rem; }
        .crp__inner { max-width: 900px; margin: 0 auto; padding: 0 1.5rem; }
        .crp__section-head { text-align: center; margin-bottom: 2.5rem; }
        .crp__section-h2 {
          font-family: 'Montserrat', sans-serif; font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800; color: #fff; margin-bottom: 0.5rem;
        }
        .crp__section-sub { font-size: 0.88rem; color: rgba(255,255,255,0.4); }

        /* Job card */
        .crp__jobs { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .crp__job {
          background: #121826; border: 1px solid rgba(212,175,55,0.1);
          border-radius: 14px; overflow: hidden;
          transition: border-color 0.25s;
        }
        .crp__job--open { border-color: rgba(212,175,55,0.35); }

        .crp__job-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.4rem 1.6rem; cursor: pointer; gap: 1rem;
          transition: background 0.2s;
        }
        .crp__job-header:hover { background: rgba(212,175,55,0.03); }
        .crp__job-left { flex: 1; min-width: 0; }
        .crp__job-title {
          font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 700;
          color: #fff; margin-bottom: 0.5rem;
        }
        .crp__job-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .crp__job-tag {
          font-size: 0.72rem; padding: 3px 10px; border-radius: 20px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
        }
        .crp__job-tag--type {
          background: rgba(212,175,55,0.1); border-color: rgba(212,175,55,0.25); color: #D4AF37;
        }
        .crp__job-right { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
        .crp__apply-quick {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.78rem; padding: 8px 16px; border-radius: 7px; border: none;
          cursor: pointer; white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .crp__apply-quick:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(212,175,55,0.35); }
        .crp__toggle { color: rgba(255,255,255,0.35); font-size: 0.75rem; }

        .crp__job-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s;
          padding: 0 1.6rem;
          border-top: 0px solid rgba(212,175,55,0.1);
        }
        .crp__job--open .crp__job-body {
          max-height: 500px;
          padding: 1.4rem 1.6rem;
          border-top-width: 1px;
        }
        .crp__job-desc { font-size: 0.88rem; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 1.2rem; }
        .crp__skills-label {
          font-size: 0.72rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.35); margin-bottom: 0.6rem;
        }
        .crp__skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.4rem; }
        .crp__skill {
          font-size: 0.78rem; padding: 4px 12px;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 20px; color: #D4AF37;
        }
        .crp__apply-full {
          background: transparent; border: 1.5px solid rgba(212,175,55,0.4);
          color: #D4AF37; font-family: 'Montserrat', sans-serif; font-weight: 600;
          font-size: 0.85rem; padding: 10px 20px; border-radius: 8px; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .crp__apply-full:hover { background: rgba(212,175,55,0.1); border-color: #D4AF37; }

        /* General card */
        .crp__general {
          background: linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 100%);
          border: 1px solid rgba(212,175,55,0.2); border-radius: 16px;
          padding: 2.5rem; text-align: center;
        }
        .crp__general-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .crp__general-h3 {
          font-family: 'Montserrat', sans-serif; font-size: 1.2rem; font-weight: 700;
          color: #fff; margin-bottom: 0.7rem;
        }
        .crp__general-p { font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 1.5rem; }
        .crp__general-btn {
          display: inline-flex; align-items: center;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.9rem; padding: 12px 28px; border-radius: 8px; text-decoration: none;
          box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .crp__general-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.45); color: #0B0F1A; }

        /* Modal */
        .crm-modal-bg {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .crm-modal {
          background: #121826; border: 1px solid rgba(212,175,55,0.2);
          border-radius: 20px; width: 100%; max-width: 560px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
          animation: modalIn 0.3s ease;
        }
        .crm-modal-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 1.5rem 1.8rem; border-bottom: 1px solid rgba(212,175,55,0.1);
        }
        .crm-modal-role {
          font-family: 'Montserrat', sans-serif; font-size: 1.1rem; font-weight: 700;
          color: #fff; margin-bottom: 4px;
        }
        .crm-modal-tag { font-size: 0.78rem; color: #D4AF37; }
        .crm-modal-close {
          background: none; border: none; color: rgba(255,255,255,0.35);
          font-size: 1rem; cursor: pointer; padding: 4px;
          transition: color 0.18s;
        }
        .crm-modal-close:hover { color: #D4AF37; }
        .crm-modal-form { padding: 1.8rem; display: flex; flex-direction: column; gap: 1rem; }
        .crm-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .crm-field { display: flex; flex-direction: column; gap: 6px; }
        .crm-label {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .crm-input {
          width: 100%; padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #fff;
          font-family: 'Poppins', sans-serif; font-size: 0.88rem; outline: none;
          transition: border-color 0.2s;
        }
        .crm-input:focus { border-color: rgba(212,175,55,0.5); }
        .crm-input::placeholder { color: rgba(255,255,255,0.25); }
        .crm-file { padding: 0.6rem 1rem; cursor: pointer; }
        .crm-submit {
          width: 100%; background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.9rem; padding: 13px; border-radius: 8px; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          transition: transform 0.2s;
        }
        .crm-submit:hover:not(:disabled) { transform: translateY(-2px); }
        .crm-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .crm-modal-done { padding: 2.5rem; text-align: center; }
        .crm-done-icon { font-size: 3rem; margin-bottom: 1rem; }
        .crm-modal-done h3 {
          font-family: 'Montserrat', sans-serif; font-size: 1.3rem; font-weight: 700;
          color: #fff; margin-bottom: 0.8rem;
        }
        .crm-modal-done p { font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 1.5rem; }
        .crm-done-btn {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.9rem; padding: 11px 28px; border-radius: 8px; border: none; cursor: pointer;
        }
        .spin { animation: spinSlow 0.8s linear infinite; }
        @media (max-width: 560px) {
          .crm-row-2 { grid-template-columns: 1fr; }
          .crp__job-right .crp__apply-quick { display: none; }
        }
      `}</style>
    </>
  );
}
