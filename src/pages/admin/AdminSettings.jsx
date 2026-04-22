import React, { useState, useEffect } from "react";
import API from "../../libs/apiCall";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";

const DEFAULT = {
  phone: "+91 9155031859",
  email: "technosagainfotech@mail.com",
  address: "M2/12, Near Yamuna Apartment, Boring Road, Patna – 800001",
  facebook: "https://www.facebook.com/technosagainfotech/",
  instagram: "https://www.instagram.com/technosagainfotech",
  linkedin: "https://linkedin.com",
  whatsapp: "919155031859",
  website: "https://technosagainfotech.in",
};

export default function AdminSettings() {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: res } = await API.get("/settings");
      if (res?.data) setForm({ ...DEFAULT, ...res.data });
    } catch { /* use defaults */ }
    finally { setLoading(false); }
  };

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const setPw = (k) => (e) => setPwForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.post("/settings/update", form);
      toast.success("Settings saved successfully!");
    } catch { toast.error("Failed to save settings."); }
    finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { toast.error("New passwords do not match!"); return; }
    if (pwForm.newPw.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setPwSaving(true);
    try {
      await API.post("/admin/change-password", { currentPassword: pwForm.current, newPassword: pwForm.newPw });
      toast.success("Password changed successfully!");
      setPwForm({ current: "", newPw: "", confirm: "" });
    } catch { toast.error("Failed to change password. Check your current password."); }
    finally { setPwSaving(false); }
  };

  const TABS = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "social", label: "Social Links", icon: "🔗" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div>
      <div className="adm-page-head">
        <div>
          <h1>Website Settings</h1>
          <p>Manage your website contact info, social links, and account security.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`settings-tab${activeTab === t.id ? " settings-tab--active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="adm-empty"><div className="adm-spinner" style={{ margin:"3rem auto" }} /></div>
      ) : (
        <>
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="adm-card">
              <div className="adm-card-title">Contact Information</div>
              <div className="adm-row-2">
                <div className="adm-field">
                  <label className="adm-label">Phone Number</label>
                  <input className="adm-input" value={form.phone} onChange={set("phone")} placeholder="+91 XXXXXXXXXX" />
                </div>
                <div className="adm-field">
                  <label className="adm-label">WhatsApp Number</label>
                  <input className="adm-input" value={form.whatsapp} onChange={set("whatsapp")} placeholder="919XXXXXXXXX" />
                </div>
              </div>
              <div className="adm-field">
                <label className="adm-label">Email Address</label>
                <input type="email" className="adm-input" value={form.email} onChange={set("email")} placeholder="info@example.com" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Office Address</label>
                <textarea className="adm-input" value={form.address} onChange={set("address")} rows={3} style={{ resize:"vertical" }} placeholder="Full office address..." />
              </div>
              <div className="adm-field">
                <label className="adm-label">Website URL</label>
                <input className="adm-input" value={form.website} onChange={set("website")} placeholder="https://yourwebsite.com" />
              </div>
              <button className="adm-btn adm-btn--gold" onClick={handleSave} disabled={saving}>
                {saving && <BiLoader size={16} className="spin" />}
                {saving ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>
          )}

          {/* Social Links */}
          {activeTab === "social" && (
            <div className="adm-card">
              <div className="adm-card-title">Social Media Links</div>
              {[
                { key:"facebook", label:"Facebook URL", placeholder:"https://facebook.com/yourpage", icon:"📘" },
                { key:"instagram", label:"Instagram URL", placeholder:"https://instagram.com/yourprofile", icon:"📸" },
                { key:"linkedin", label:"LinkedIn URL", placeholder:"https://linkedin.com/company/yourcompany", icon:"💼" },
              ].map((s) => (
                <div key={s.key} className="adm-field">
                  <label className="adm-label">{s.icon} {s.label}</label>
                  <input className="adm-input" value={form[s.key]} onChange={set(s.key)} placeholder={s.placeholder} />
                </div>
              ))}
              <div className="settings-preview">
                <div className="settings-preview-title">Preview — Footer Social Links</div>
                <div className="settings-socials-preview">
                  {["📘 Facebook", "📸 Instagram", "💼 LinkedIn", "💬 WhatsApp"].map((s) => (
                    <span key={s} className="settings-soc-chip">{s}</span>
                  ))}
                </div>
              </div>
              <button className="adm-btn adm-btn--gold" onClick={handleSave} disabled={saving}>
                {saving && <BiLoader size={16} className="spin" />}
                {saving ? "Saving..." : "💾 Save Social Links"}
              </button>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="adm-card">
              <div className="adm-card-title">Change Password</div>
              <form onSubmit={handlePasswordChange}>
                <div className="adm-field">
                  <label className="adm-label">Current Password</label>
                  <input type="password" className="adm-input" value={pwForm.current} onChange={setPw("current")} placeholder="Enter current password" required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">New Password</label>
                  <input type="password" className="adm-input" value={pwForm.newPw} onChange={setPw("newPw")} placeholder="Minimum 6 characters" required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Confirm New Password</label>
                  <input type="password" className="adm-input" value={pwForm.confirm} onChange={setPw("confirm")} placeholder="Re-enter new password" required />
                </div>
                <button type="submit" className="adm-btn adm-btn--gold" disabled={pwSaving}>
                  {pwSaving && <BiLoader size={16} className="spin" />}
                  {pwSaving ? "Changing..." : "🔒 Change Password"}
                </button>
              </form>

              <div className="settings-security-tip">
                <div className="settings-tip-icon">💡</div>
                <div>
                  <strong>Security Tips:</strong>
                  <ul>
                    <li>Use a strong password with letters, numbers and symbols</li>
                    <li>Never share your password with anyone</li>
                    <li>Change your password regularly</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .settings-tabs {
          display: flex; gap: 8px; margin-bottom: 1.5rem; flex-wrap: wrap;
        }
        .settings-tab {
          padding: 9px 18px; border-radius: 10px; border: none;
          background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5);
          font-family: 'Poppins', sans-serif; font-size: 0.82rem; font-weight: 500;
          cursor: pointer; transition: background 0.18s, color 0.18s;
        }
        .settings-tab:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
        .settings-tab--active {
          background: rgba(212,175,55,0.12); color: #D4AF37;
          border: 1px solid rgba(212,175,55,0.25);
        }
        .settings-preview {
          background: rgba(212,175,55,0.04); border: 1px solid rgba(212,175,55,0.1);
          border-radius: 10px; padding: 1rem; margin: 1rem 0;
        }
        .settings-preview-title {
          font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-bottom: 0.8rem;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .settings-socials-preview { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .settings-soc-chip {
          font-size: 0.78rem; padding: 5px 14px;
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 20px; color: #D4AF37;
        }
        .settings-security-tip {
          display: flex; gap: 12px; align-items: flex-start;
          background: rgba(52,152,219,0.06); border: 1px solid rgba(52,152,219,0.15);
          border-radius: 10px; padding: 1rem; margin-top: 1.5rem;
        }
        .settings-tip-icon { font-size: 1.4rem; flex-shrink: 0; }
        .settings-security-tip strong { font-size: 0.85rem; color: rgba(255,255,255,0.7); display: block; margin-bottom: 0.5rem; }
        .settings-security-tip ul { padding-left: 1rem; }
        .settings-security-tip li { font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-bottom: 3px; }
        .spin { animation: spinSlow 0.8s linear infinite; }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
