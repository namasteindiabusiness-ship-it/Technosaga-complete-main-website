// ── THANK YOU PAGE ─────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export function ThankYouPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) { navigate("/"); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, navigate]);

  const pct = ((5 - count) / 5) * 100;

  return (
    <>
      <Helmet>
        <title>Thank You | Technosaga Infotech</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="ty">
        <div className="ty__card">
          <div className="ty__circle">
            <svg className="ty__check-svg" viewBox="0 0 52 52">
              <circle className="ty__check-circle" cx="26" cy="26" r="25" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <path className="ty__check-path" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27 l8 8 16-16" />
            </svg>
          </div>
          <h1 className="ty__h1">Thank You! 🎉</h1>
          <p className="ty__sub">Your enquiry has been successfully submitted.</p>
          <p className="ty__body">Our team will review your request and get back to you within <strong>24 hours</strong>. We look forward to working with you!</p>

          <div className="ty__contact">
            <span>Need urgent help?</span>
            <a href="https://wa.me/919155031859" className="ty__wa">📱 WhatsApp Us Now</a>
          </div>

          <div className="ty__redirect">
            <div className="ty__redirect-text">Redirecting to homepage in <strong>{count}</strong> seconds...</div>
            <div className="ty__progress-bg">
              <div className="ty__progress-bar" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button className="ty__btn" onClick={() => navigate("/")}>Go Home Now →</button>
        </div>
      </div>

      <style>{`
        .ty {
          min-height: 100vh;
          background: #0B0F1A;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'Poppins', sans-serif;
        }
        .ty__card {
          background: #121826;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 24px;
          padding: 3.5rem 2.5rem;
          text-align: center;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 24px 80px rgba(0,0,0,0.4);
          animation: modalIn 0.5s ease;
        }
        .ty__circle {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(212,175,55,0.1);
          border: 2px solid rgba(212,175,55,0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .ty__check-svg { width: 52px; height: 52px; }
        .ty__check-circle { stroke-dasharray: 166; stroke-dashoffset: 166; animation: strokeIn 0.6s ease forwards 0.2s; }
        .ty__check-path { stroke-dasharray: 48; stroke-dashoffset: 48; animation: strokeIn 0.4s ease forwards 0.7s; }
        @keyframes strokeIn { to { stroke-dashoffset: 0; } }

        .ty__h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: 2rem; font-weight: 800; color: #fff;
          margin-bottom: 0.6rem;
        }
        .ty__sub { font-size: 1rem; color: #D4AF37; font-weight: 500; margin-bottom: 1rem; }
        .ty__body { font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin-bottom: 1.5rem; }
        .ty__body strong { color: rgba(255,255,255,0.8); }

        .ty__contact {
          display: flex; align-items: center; gap: 10px; justify-content: center;
          font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-bottom: 1.5rem;
        }
        .ty__wa {
          color: #25D366; text-decoration: none; font-weight: 600;
          transition: opacity 0.2s;
        }
        .ty__wa:hover { opacity: 0.8; }

        .ty__redirect { margin-bottom: 1.5rem; }
        .ty__redirect-text { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin-bottom: 0.7rem; }
        .ty__redirect-text strong { color: #D4AF37; }
        .ty__progress-bg {
          height: 4px; background: rgba(255,255,255,0.08);
          border-radius: 2px; overflow: hidden;
        }
        .ty__progress-bar {
          height: 100%; background: linear-gradient(90deg, #D4AF37, #b8962d);
          border-radius: 2px; transition: width 1s linear;
        }
        .ty__btn {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.9rem; padding: 12px 28px; border-radius: 8px; border: none;
          cursor: pointer; box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ty__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,175,55,0.45); }
      `}</style>
    </>
  );
}


// ── POPUP QUOTE FORM ────────────────────────────────────────────
import React from "react";
import { SERVICE_OPTS } from "../../libs/static";
import API from "../../libs/apiCall";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";

export function QuotePopup({ open, onClose }) {
  const [form, setForm] = React.useState({ name: "", mobile: "", email: "", city: "", service: "", message: "" });
  const [focused, setFocused] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("Enter a valid 10-digit mobile number."); return; }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) { toast.error("Enter a valid email address."); return; }
    setLoading(true);
    try {
      await API.post("/enquiry/create", { type: "Get a Quote", ...form, message: form.message });
      toast.success("Quote request sent! We'll contact you within 24 hours.");
      setDone(true);
      setTimeout(() => { setDone(false); onClose(); setForm({ name: "", mobile: "", email: "", city: "", service: "", message: "" }); }, 3000);
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  if (!open) return null;

  return (
    <div className="qp-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="qp-modal">
        {/* Header */}
        <div className="qp-head">
          <div>
            <div className="qp-title">Get a Free Quote</div>
            <div className="qp-subtitle">Fill in your details — we'll respond within 24 hours</div>
          </div>
          <button className="qp-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {done ? (
          <div className="qp-done">
            <div className="qp-done-icon">✅</div>
            <h3>Quote Request Sent!</h3>
            <p>Thank you! Our team will reach out to you shortly with a customised quote.</p>
          </div>
        ) : (
          <form className="qp-form" onSubmit={handleSubmit}>
            <div className="qp-row-2">
              <div className="qp-field">
                <label className="qp-label">Full Name *</label>
                <input className={`qp-input${focused === "name" ? " qp-focus" : ""}`} value={form.name} onChange={set("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your full name" required />
              </div>
              <div className="qp-field">
                <label className="qp-label">Mobile / WhatsApp *</label>
                <input className={`qp-input${focused === "mobile" ? " qp-focus" : ""}`} value={form.mobile} onChange={set("mobile")} onFocus={() => setFocused("mobile")} onBlur={() => setFocused(null)} placeholder="10-digit number" maxLength={10} required />
              </div>
            </div>
            <div className="qp-row-2">
              <div className="qp-field">
                <label className="qp-label">Email Address *</label>
                <input type="email" className={`qp-input${focused === "email" ? " qp-focus" : ""}`} value={form.email} onChange={set("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="you@company.com" required />
              </div>
              <div className="qp-field">
                <label className="qp-label">City</label>
                <input className={`qp-input${focused === "city" ? " qp-focus" : ""}`} value={form.city} onChange={set("city")} onFocus={() => setFocused("city")} onBlur={() => setFocused(null)} placeholder="Your city" />
              </div>
            </div>
            <div className="qp-field">
              <label className="qp-label">Choose Service</label>
              <div className="qp-sel-wrap">
                <select className={`qp-input${focused === "service" ? " qp-focus" : ""}`} value={form.service} onChange={set("service")} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                  <option value="">Select a service...</option>
                  {SERVICE_OPTS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <span className="qp-chev">▾</span>
              </div>
            </div>
            <div className="qp-field">
              <label className="qp-label">Project Description</label>
              <textarea className={`qp-input qp-textarea${focused === "msg" ? " qp-focus" : ""}`} value={form.message} onChange={set("message")} onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} placeholder="Briefly describe your project or requirements..." rows={3} />
            </div>
            <button type="submit" className="qp-submit" disabled={loading}>
              {loading && <BiLoader size={18} className="spin" />}
              {loading ? "Sending..." : "Submit Request →"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .qp-bg {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .qp-modal {
          background: #121826; border: 1px solid rgba(212,175,55,0.25);
          border-radius: 20px; width: 100%; max-width: 560px;
          max-height: 92vh; overflow-y: auto;
          box-shadow: 0 32px 100px rgba(0,0,0,0.6);
          animation: modalIn 0.3s ease;
        }
        .qp-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 1.6rem 1.8rem 1.2rem;
          border-bottom: 1px solid rgba(212,175,55,0.1);
          background: linear-gradient(135deg, rgba(212,175,55,0.06) 0%, transparent 100%);
        }
        .qp-title {
          font-family: 'Montserrat', sans-serif; font-size: 1.2rem; font-weight: 800;
          color: #fff; margin-bottom: 4px;
        }
        .qp-subtitle { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
        .qp-close {
          background: none; border: none; color: rgba(255,255,255,0.35);
          font-size: 1rem; cursor: pointer; padding: 4px; transition: color 0.2s;
        }
        .qp-close:hover { color: #D4AF37; }
        .qp-form { padding: 1.6rem 1.8rem; display: flex; flex-direction: column; gap: 1rem; }
        .qp-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .qp-field { display: flex; flex-direction: column; gap: 5px; }
        .qp-label {
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
        }
        .qp-input {
          width: 100%; padding: 0.72rem 1rem;
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #fff;
          font-family: 'Poppins', sans-serif; font-size: 0.88rem; outline: none;
          transition: border-color 0.2s, background 0.2s; appearance: none;
        }
        .qp-input::placeholder { color: rgba(255,255,255,0.22); }
        .qp-focus { border-color: rgba(212,175,55,0.5); background: rgba(212,175,55,0.04); }
        .qp-textarea { resize: vertical; line-height: 1.6; }
        .qp-sel-wrap { position: relative; }
        .qp-chev {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.3); pointer-events: none; font-size: 0.8rem;
        }
        .qp-submit {
          width: 100%; background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.95rem; padding: 13px; border-radius: 8px; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 18px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .qp-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(212,175,55,0.45); }
        .qp-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .qp-done { padding: 2.5rem; text-align: center; }
        .qp-done-icon { font-size: 3rem; margin-bottom: 1rem; }
        .qp-done h3 {
          font-family: 'Montserrat', sans-serif; font-size: 1.2rem; font-weight: 700;
          color: #fff; margin-bottom: 0.7rem;
        }
        .qp-done p { font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.7; }
        .spin { animation: spinSlow 0.8s linear infinite; }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: none; } }
        @media (max-width: 500px) {
          .qp-row-2 { grid-template-columns: 1fr; }
          .qp-form { padding: 1.2rem; }
          .qp-head { padding: 1.2rem; }
        }
      `}</style>
    </div>
  );
}
