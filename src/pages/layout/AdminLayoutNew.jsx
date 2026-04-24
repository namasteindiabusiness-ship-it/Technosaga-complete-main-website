import React, { useState, useEffect } from "react";
import { Navigate, Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import createStore from "../../store/state";
import { setAuthToken } from "../../libs/apiCall";
import API from "../../libs/apiCall";
import { toast } from "sonner";

const NAV_ITEMS = [
  { path: "/dashboard/home", label: "Dashboard", icon: "📊" },
  { path: "/dashboard/leads", label: "Leads", icon: "🎯" },
  { path: "/dashboard/services", label: "Services", icon: "🔧" },
  { path: "/dashboard/blog-list", label: "Blog", icon: "📝" },
  { path: "/dashboard/banner-list", label: "Banners", icon: "🖼️" },
  { path: "/dashboard/gallery-list", label: "Media", icon: "🎨" },
  { path: "/dashboard/vacancy-list", label: "Careers", icon: "💼" },
  { path: "/dashboard/member-list", label: "Team", icon: "👥" },
  { path: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayoutNew() {
  const [sideOpen, setSideOpen] = useState(true);
  const [mobileSide, setMobileSide] = useState(false);
  const { user, singOut } = createStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  setAuthToken(user?.token || "");

  useEffect(() => { setMobileSide(false); }, [location.pathname]);

  const handleLogout = () => {
    singOut();
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/webs/login");
  };

  if (!user) return <Navigate to="/webs/login" replace />;

  return (
    <div className="adm">
      {/* Mobile overlay */}
      {mobileSide && (
        <div className="adm__mob-overlay" onClick={() => setMobileSide(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`adm__side${sideOpen ? "" : " adm__side--collapsed"}${mobileSide ? " adm__side--mob-open" : ""}`}>
        {/* Logo */}
        <div className="adm__side-logo">
          <img src="/static/logo-new.png" alt="Technosaga" className="adm__logo-img" />
          {sideOpen && (
            <div className="adm__logo-text">
              <span className="adm__logo-main">Technosaga</span>
              <span className="adm__logo-sub">Admin Panel</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="adm__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `adm__nav-item${isActive ? " adm__nav-item--active" : ""}`}
              title={!sideOpen ? item.label : ""}
            >
              <span className="adm__nav-icon">{item.icon}</span>
              {sideOpen && <span className="adm__nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="adm__side-foot">
          {sideOpen && (
            <div className="adm__user-info">
              <div className="adm__user-av">{user?.name?.[0]?.toUpperCase() || "A"}</div>
              <div>
                <div className="adm__user-name">{user?.name || "Admin"}</div>
                <div className="adm__user-role">Administrator</div>
              </div>
            </div>
          )}
          <button className="adm__logout-btn" onClick={handleLogout} title="Logout">
            <span>🚪</span>
            {sideOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className={`adm__main${sideOpen ? "" : " adm__main--wide"}`}>
        {/* Top header */}
        <header className="adm__header">
          <div className="adm__header-left">
            <button className="adm__toggle" onClick={() => { setSideOpen(!sideOpen); setMobileSide(!mobileSide); }} aria-label="Toggle sidebar">
              <span /><span /><span />
            </button>
            <div className="adm__page-title">
              {NAV_ITEMS.find(n => location.pathname.startsWith(n.path))?.label || "Dashboard"}
            </div>
          </div>
          <div className="adm__header-right">
            <a href="/" target="_blank" className="adm__view-site">🌐 View Site</a>
            <div className="adm__header-user">
              <div className="adm__header-av">{user?.name?.[0]?.toUpperCase() || "A"}</div>
              <span className="adm__header-name">{user?.name || "Admin"}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="adm__content">
          <Outlet />
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .adm {
          display: flex; min-height: 100vh;
          background: #0B0F1A;
          font-family: 'Poppins', sans-serif;
        }

        /* ── SIDEBAR ── */
        .adm__side {
          width: 240px; flex-shrink: 0;
          background: #0f1521;
          border-right: 1px solid rgba(212,175,55,0.12);
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0;
          z-index: 500;
          transition: width 0.28s ease;
          overflow: hidden;
        }
        .adm__side--collapsed { width: 68px; }

        /* Mobile: hidden off-screen */
        @media (max-width: 1024px) {
          .adm__side { transform: translateX(-100%); transition: transform 0.3s ease, width 0.28s ease; }
          .adm__side--mob-open { transform: translateX(0); width: 240px !important; }
          .adm__mob-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.6);
            z-index: 499; backdrop-filter: blur(3px);
          }
        }

        .adm__side-logo {
          display: flex; align-items: center; gap: 10px;
          padding: 18px 16px;
          border-bottom: 1px solid rgba(212,175,55,0.1);
          min-height: 68px; flex-shrink: 0;
        }
        .adm__logo-img {
          width: 38px; height: 38px; object-fit: contain; flex-shrink: 0;
          filter: drop-shadow(0 0 6px rgba(212,175,55,0.4));
        }
        .adm__logo-text { display: flex; flex-direction: column; overflow: hidden; }
        .adm__logo-main {
          font-family: 'Montserrat', sans-serif; font-size: 0.92rem; font-weight: 800;
          color: #D4AF37; white-space: nowrap; letter-spacing: 0.02em;
        }
        .adm__logo-sub {
          font-size: 0.62rem; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap;
        }

        .adm__nav {
          flex: 1; padding: 12px 8px; display: flex;
          flex-direction: column; gap: 3px; overflow-y: auto;
        }
        .adm__nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; border-radius: 10px;
          color: rgba(255,255,255,0.55);
          text-decoration: none; font-size: 0.85rem; font-weight: 500;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap; overflow: hidden;
        }
        .adm__nav-item:hover { background: rgba(212,175,55,0.08); color: rgba(255,255,255,0.85); }
        .adm__nav-item--active {
          background: rgba(212,175,55,0.12); color: #D4AF37;
          border-left: 2.5px solid #D4AF37; padding-left: 9.5px;
        }
        .adm__nav-icon { font-size: 1.1rem; flex-shrink: 0; width: 22px; text-align: center; }
        .adm__nav-label { flex: 1; }

        .adm__side-foot {
          padding: 12px 8px;
          border-top: 1px solid rgba(212,175,55,0.08);
          display: flex; flex-direction: column; gap: 8px;
        }
        .adm__user-info {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px;
          background: rgba(212,175,55,0.06);
          border-radius: 10px; overflow: hidden;
        }
        .adm__user-av {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37, #b8962d);
          color: #0B0F1A; font-weight: 800; font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-family: 'Montserrat', sans-serif;
        }
        .adm__user-name {
          font-size: 0.82rem; font-weight: 600; color: #fff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .adm__user-role { font-size: 0.68rem; color: rgba(255,255,255,0.3); }
        .adm__logout-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 10px;
          background: rgba(231,76,60,0.08); border: 1px solid rgba(231,76,60,0.15);
          color: rgba(231,76,60,0.7); font-size: 0.82rem; font-weight: 500;
          cursor: pointer; width: 100%; transition: background 0.18s, color 0.18s;
          font-family: 'Poppins', sans-serif;
        }
        .adm__logout-btn:hover { background: rgba(231,76,60,0.15); color: #E74C3C; }

        /* ── MAIN ── */
        .adm__main {
          flex: 1; margin-left: 240px;
          display: flex; flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.28s ease;
        }
        .adm__main--wide { margin-left: 68px; }
        @media (max-width: 1024px) {
          .adm__main { margin-left: 0 !important; }
        }

        /* ── HEADER ── */
        .adm__header {
          position: sticky; top: 0; z-index: 400;
          height: 64px;
          background: rgba(11,15,26,0.95);
          border-bottom: 1px solid rgba(212,175,55,0.1);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem; flex-shrink: 0;
        }
        .adm__header-left { display: flex; align-items: center; gap: 14px; }
        .adm__toggle {
          display: flex; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 5px;
        }
        .adm__toggle span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.6); border-radius: 2px;
          transition: background 0.2s;
        }
        .adm__toggle:hover span { background: #D4AF37; }
        .adm__page-title {
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 1rem; color: #fff;
        }
        .adm__header-right { display: flex; align-items: center; gap: 1rem; }
        .adm__view-site {
          font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.45);
          text-decoration: none; padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
          transition: color 0.18s, border-color 0.18s;
          font-family: 'Poppins', sans-serif;
        }
        .adm__view-site:hover { color: #D4AF37; border-color: rgba(212,175,55,0.3); }
        .adm__header-user { display: flex; align-items: center; gap: 8px; }
        .adm__header-av {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37, #b8962d);
          color: #0B0F1A; font-weight: 800; font-size: 0.8rem;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Montserrat', sans-serif;
        }
        .adm__header-name { font-size: 0.82rem; color: rgba(255,255,255,0.6); }

        /* ── CONTENT ── */
        .adm__content { flex: 1; padding: 2rem 1.5rem; }

        /* ── SHARED ADMIN COMPONENTS ── */
        .adm-page-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.8rem; flex-wrap: wrap; gap: 1rem;
        }
        .adm-page-head h1 {
          font-family: 'Montserrat', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff;
        }
        .adm-page-head p { font-size: 0.82rem; color: rgba(255,255,255,0.4); margin-top: 3px; }

        .adm-card {
          background: #121826; border: 1px solid rgba(212,175,55,0.1);
          border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem;
        }
        .adm-card-title {
          font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 700;
          color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }

        .adm-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 18px; border-radius: 8px; border: none;
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.82rem; cursor: pointer; text-decoration: none;
          transition: transform 0.18s, box-shadow 0.18s;
          white-space: nowrap;
        }
        .adm-btn--gold {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; box-shadow: 0 3px 12px rgba(212,175,55,0.25);
        }
        .adm-btn--gold:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(212,175,55,0.4); }
        .adm-btn--ghost {
          background: transparent; color: rgba(255,255,255,0.6);
          border: 1.5px solid rgba(255,255,255,0.12);
        }
        .adm-btn--ghost:hover { border-color: rgba(212,175,55,0.4); color: #D4AF37; }
        .adm-btn--danger {
          background: rgba(231,76,60,0.1); color: #E74C3C;
          border: 1.5px solid rgba(231,76,60,0.2);
        }
        .adm-btn--danger:hover { background: rgba(231,76,60,0.18); }

        .adm-table-wrap { overflow-x: auto; }
        .adm-table {
          width: 100%; border-collapse: collapse;
          font-family: 'Poppins', sans-serif; font-size: 0.82rem;
        }
        .adm-table th {
          text-align: left; padding: 10px 14px;
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.35);
          border-bottom: 1px solid rgba(212,175,55,0.1);
        }
        .adm-table td {
          padding: 12px 14px; color: rgba(255,255,255,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .adm-table tr:hover td { background: rgba(212,175,55,0.03); }
        .adm-table tr:last-child td { border-bottom: none; }

        .adm-badge {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 20px;
          font-size: 0.7rem; font-weight: 600; white-space: nowrap;
        }
        .adm-badge--new { background: rgba(52,152,219,0.15); color: #3498DB; }
        .adm-badge--connected { background: rgba(46,204,113,0.12); color: #2ECC71; }
        .adm-badge--interested { background: rgba(212,175,55,0.12); color: #D4AF37; }
        .adm-badge--notint { background: rgba(231,76,60,0.12); color: #E74C3C; }
        .adm-badge--quoted { background: rgba(155,89,182,0.12); color: #9B59B6; }
        .adm-badge--closed { background: rgba(26,188,156,0.15); color: #1ABC9C; }

        .adm-input {
          width: 100%; padding: 0.72rem 1rem;
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #fff; font-family: 'Poppins', sans-serif; font-size: 0.88rem;
          outline: none; transition: border-color 0.2s;
        }
        .adm-input:focus { border-color: rgba(212,175,55,0.5); }
        .adm-input::placeholder { color: rgba(255,255,255,0.22); }
        .adm-label {
          display: block; font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); margin-bottom: 6px;
        }
        .adm-field { margin-bottom: 1.1rem; }
        .adm-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 600px) { .adm-row-2 { grid-template-columns: 1fr; } }

        .adm-empty {
          text-align: center; padding: 3rem 1rem;
          color: rgba(255,255,255,0.25); font-size: 0.88rem;
        }
        .adm-empty-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }

        .adm-stat-cards {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem;
          margin-bottom: 1.8rem;
        }
        @media (max-width: 900px) { .adm-stat-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .adm-stat-cards { grid-template-columns: 1fr; } }

        .adm-stat-card {
          background: #121826; border: 1px solid rgba(212,175,55,0.1);
          border-radius: 14px; padding: 1.3rem 1.4rem;
          display: flex; align-items: center; gap: 14px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .adm-stat-card:hover { border-color: rgba(212,175,55,0.3); transform: translateY(-2px); }
        .adm-stat-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; flex-shrink: 0;
        }
        .adm-stat-n {
          font-family: 'Montserrat', sans-serif; font-size: 1.8rem; font-weight: 800; color: #D4AF37;
          line-height: 1;
        }
        .adm-stat-l {
          font-size: 0.76rem; color: rgba(255,255,255,0.4); margin-top: 3px;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .adm-select {
          width: 100%; padding: 6px 12px;
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #fff; font-family: 'Poppins', sans-serif;
          font-size: 0.82rem; outline: none; cursor: pointer; appearance: none;
          transition: border-color 0.2s;
        }
        .adm-select:focus { border-color: rgba(212,175,55,0.5); }
        .adm-select option { background: #121826; }
      `}</style>
    </div>
  );
}
