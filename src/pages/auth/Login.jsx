import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import API from "../../libs/apiCall";
import createStore from "../../store/state";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setCredentials } = createStore((state) => state);

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) { toast.error("Please enter a valid email address."); return; }
    if (!password) { toast.error("Please enter your password."); return; }
    setLoading(true);
    try {
      const { data: res } = await API.post("/account/login", { email, password });
      if (res?.data) {
        const userInfo = { ...res?.data, token: res?.token };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setCredentials({ ...res?.data, token: res?.token });
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/dashboard/home"), 800);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user) return <Navigate to="/dashboard/home" />;

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="lg-page">
        <div className="lg-bg">
          <div className="lg-bg__orb lg-bg__orb--1" />
          <div className="lg-bg__orb lg-bg__orb--2" />
          <div className="lg-bg__grid" />
        </div>

        <div className="lg-card">
          <div className="lg-card__topline" />

          <Link to="/" className="lg-logo-wrap">
            <img src="/static/logo-new.png" alt="Technosaga Infotech" className="lg-logo" />
            <div className="lg-logo-text">
              <span className="lg-logo-name">Technosaga</span>
              <span className="lg-logo-sub">Infotech Pvt. Ltd.</span>
            </div>
          </Link>

          <div className="lg-head">
            <div className="lg-head__badge">🔐 Admin Portal</div>
            <h1 className="lg-head__h1">Welcome Back</h1>
            <p className="lg-head__sub">Sign in to access your admin dashboard</p>
          </div>

          <form className="lg-form" onSubmit={handleLogin}>
            <div className="lg-field">
              <label className="lg-label">Email Address</label>
              <div className="lg-input-wrap">
                <span className="lg-input-icon">✉️</span>
                <input className="lg-input" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@technosagainfotech.com"
                  required autoComplete="email" />
              </div>
            </div>

            <div className="lg-field">
              <label className="lg-label">Password</label>
              <div className="lg-input-wrap">
                <span className="lg-input-icon">🔒</span>
                <input className="lg-input" type={showPw ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" required autoComplete="current-password" />
                <button type="button" className="lg-pw-toggle"
                  onClick={() => setShowPw(!showPw)}>
                  {showPw ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button type="submit" className="lg-btn" disabled={loading}>
              {loading ? <><BiLoader size={18} className="lg-spin" /> Signing In...</> : "Sign In to Dashboard →"}
            </button>
          </form>

          <div className="lg-footer">
            <Link to="/" className="lg-back-link">← Back to Website</Link>
            <span className="lg-footer-sep">·</span>
            <span className="lg-footer-copy">Technosaga Infotech © 2026</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap');
        .lg-page { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0B0F1A; font-family:'Poppins',sans-serif; padding:1.5rem; position:relative; overflow:hidden; }
        .lg-bg { position:absolute; inset:0; pointer-events:none; }
        .lg-bg__orb { position:absolute; border-radius:50%; filter:blur(80px); }
        .lg-bg__orb--1 { width:500px; height:500px; background:#D4AF37; top:-150px; right:-100px; opacity:0.1; }
        .lg-bg__orb--2 { width:400px; height:400px; background:#D4AF37; bottom:-120px; left:-80px; opacity:0.06; }
        .lg-bg__grid { position:absolute; inset:0; background-image:linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px); background-size:40px 40px; }
        .lg-card { position:relative; z-index:1; background:#121826; border:1px solid rgba(212,175,55,0.18); border-radius:20px; padding:2.5rem 2.2rem 2rem; width:100%; max-width:420px; box-shadow:0 32px 80px rgba(0,0,0,0.5); animation:lgFadeIn 0.4s ease; }
        @keyframes lgFadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .lg-card__topline { position:absolute; top:0; left:2rem; right:2rem; height:3px; background:linear-gradient(90deg,transparent,#D4AF37,transparent); border-radius:0 0 4px 4px; }
        .lg-logo-wrap { display:flex; align-items:center; gap:10px; text-decoration:none; margin-bottom:1.8rem; justify-content:center; }
        .lg-logo { width:48px; height:48px; object-fit:contain; filter:drop-shadow(0 0 10px rgba(212,175,55,0.4)); }
        .lg-logo-text { display:flex; flex-direction:column; }
        .lg-logo-name { font-family:'Montserrat',sans-serif; font-weight:800; font-size:1rem; color:#D4AF37; }
        .lg-logo-sub { font-size:0.6rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.08em; }
        .lg-head { text-align:center; margin-bottom:1.8rem; }
        .lg-head__badge { display:inline-flex; align-items:center; gap:6px; font-size:0.72rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#D4AF37; background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.2); border-radius:20px; padding:4px 14px; margin-bottom:0.8rem; }
        .lg-head__h1 { font-family:'Montserrat',sans-serif; font-size:1.7rem; font-weight:800; color:#fff; margin-bottom:0.4rem; letter-spacing:-0.02em; }
        .lg-head__sub { font-size:0.82rem; color:rgba(255,255,255,0.4); }
        .lg-form { display:flex; flex-direction:column; gap:1.1rem; }
        .lg-field { display:flex; flex-direction:column; gap:6px; }
        .lg-label { font-size:0.72rem; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:rgba(255,255,255,0.4); }
        .lg-input-wrap { position:relative; display:flex; align-items:center; }
        .lg-input-icon { position:absolute; left:12px; font-size:0.9rem; pointer-events:none; }
        .lg-input { width:100%; padding:0.78rem 1rem 0.78rem 2.4rem; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.08); border-radius:10px; color:#fff; font-family:'Poppins',sans-serif; font-size:0.88rem; outline:none; transition:border-color 0.2s,background 0.2s; }
        .lg-input::placeholder { color:rgba(255,255,255,0.2); }
        .lg-input:focus { border-color:rgba(212,175,55,0.5); background:rgba(212,175,55,0.04); }
        .lg-pw-toggle { position:absolute; right:12px; background:none; border:none; cursor:pointer; font-size:0.9rem; padding:4px; opacity:0.5; transition:opacity 0.2s; }
        .lg-pw-toggle:hover { opacity:1; }
        .lg-btn { width:100%; background:linear-gradient(135deg,#D4AF37 0%,#b8962d 100%); color:#0B0F1A; font-family:'Montserrat',sans-serif; font-weight:700; font-size:0.95rem; padding:14px; border-radius:10px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-top:0.4rem; box-shadow:0 6px 24px rgba(212,175,55,0.3); transition:transform 0.2s,box-shadow 0.2s; }
        .lg-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(212,175,55,0.45); }
        .lg-btn:disabled { opacity:0.7; cursor:not-allowed; }
        .lg-spin { animation:lgSpin 0.8s linear infinite; }
        @keyframes lgSpin { to{transform:rotate(360deg)} }
        .lg-footer { display:flex; align-items:center; justify-content:center; gap:8px; margin-top:1.6rem; flex-wrap:wrap; }
        .lg-back-link { font-size:0.78rem; color:rgba(255,255,255,0.4); text-decoration:none; transition:color 0.2s; }
        .lg-back-link:hover { color:#D4AF37; }
        .lg-footer-sep { color:rgba(255,255,255,0.15); }
        .lg-footer-copy { font-size:0.75rem; color:rgba(255,255,255,0.2); }
      `}</style>
    </>
  );
}
