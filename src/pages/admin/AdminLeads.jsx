import React, { useState, useEffect } from "react";
import API from "../../libs/apiCall";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";

const STATUS_OPTIONS = ["New", "Connected", "Interested", "Not Interested", "Quote Sent", "Deal Closed"];
const STATUS_BADGE = {
  "New": "adm-badge--new",
  "Connected": "adm-badge--connected",
  "Interested": "adm-badge--interested",
  "Not Interested": "adm-badge--notint",
  "Quote Sent": "adm-badge--quoted",
  "Deal Closed": "adm-badge--closed",
};

function LeadDetailModal({ lead, onClose, onStatusChange }) {
  const [status, setStatus] = useState(lead.status || "New");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put(`/enquiry/status/${lead._id}`, { status });
      toast.success("Lead status updated!");
      onStatusChange(lead._id, status);
      onClose();
    } catch { toast.error("Failed to update status"); }
    finally { setSaving(false); }
  };

  return (
    <div className="adm-modal-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-modal">
        <div className="adm-modal-head">
          <h3>Lead Details</h3>
          <button className="adm-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="adm-modal-body">
          <div className="lead-detail-grid">
            {[
              { label: "Full Name", value: lead.name },
              { label: "Mobile", value: lead.mobile || lead.phone },
              { label: "Email", value: lead.email || "—" },
              { label: "City", value: lead.city || "—" },
              { label: "Service", value: lead.service },
              { label: "Source", value: lead.source || lead.type || "Website" },
              { label: "Date", value: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) : "—" },
            ].map((f) => (
              <div key={f.label} className="lead-detail-item">
                <span className="lead-detail-label">{f.label}</span>
                <span className="lead-detail-value">{f.value}</span>
              </div>
            ))}
          </div>

          {lead.message && (
            <div className="lead-msg-box">
              <div className="lead-detail-label">Project Description</div>
              <p className="lead-msg-text">{lead.message}</p>
            </div>
          )}

          <div className="adm-field" style={{ marginTop:"1.2rem" }}>
            <label className="adm-label">Update Status</label>
            <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="lead-detail-actions">
            <a
              href={`https://wa.me/91${lead.mobile || lead.phone}?text=${encodeURIComponent(`Hello ${lead.name}! This is Technosaga Infotech. We received your enquiry for ${lead.service}. Let's connect!`)}`}
              target="_blank" rel="noopener noreferrer"
              className="adm-btn" style={{ background:"#25D366", color:"#fff" }}
            >
              💬 WhatsApp
            </a>
            <a href={`tel:${lead.mobile || lead.phone}`} className="adm-btn adm-btn--ghost">📞 Call</a>
            <button className="adm-btn adm-btn--gold" onClick={handleSave} disabled={saving}>
              {saving ? <BiLoader size={14} className="spin" /> : null}
              {saving ? "Saving..." : "Save Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      const { data: res } = await API.get("/enquiry/list");
      setLeads(res?.data || []);
    } catch {
      // Demo fallback
      setLeads([
        { _id:"1", name:"Rahul Sharma", mobile:"9876543210", email:"rahul@email.com", city:"Patna", service:"Web Design & Development", status:"New", type:"Website", message:"Need a corporate website with admin panel.", createdAt: new Date(Date.now()-86400000) },
        { _id:"2", name:"Priya Singh", mobile:"8765432109", email:"priya@email.com", city:"Delhi", service:"Digital Marketing", status:"Interested", type:"Chatbot", message:"Looking for SEO and social media management.", createdAt: new Date(Date.now()-172800000) },
        { _id:"3", name:"Amit Kumar", mobile:"7654321098", email:"amit@email.com", city:"Ranchi", service:"BPO Services", status:"Deal Closed", type:"Website", message:"Need 10 telecallers for our call centre.", createdAt: new Date(Date.now()-259200000) },
        { _id:"4", name:"Sunita Devi", mobile:"6543210987", email:"sunita@email.com", city:"Muzaffarpur", service:"App Development", status:"Quote Sent", type:"Website", message:"E-commerce app for my grocery store.", createdAt: new Date(Date.now()-345600000) },
        { _id:"5", name:"Vikram Jha", mobile:"9988776655", email:"vikram@email.com", city:"Patna", service:"Graphic Design", status:"Connected", type:"Chatbot", message:"Logo and branding for my startup.", createdAt: new Date(Date.now()-432000000) },
        { _id:"6", name:"Meena Kumari", mobile:"9877665544", email:"meena@email.com", city:"Bhagalpur", service:"Event Management", status:"Not Interested", type:"Website", message:"Corporate event for 200 people.", createdAt: new Date(Date.now()-518400000) },
      ]);
    } finally { setLoading(false); }
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status: newStatus } : l));
  };

  const handleQuickStatus = async (id, status) => {
    try {
      await API.put(`/enquiry/status/${id}`, { status });
      handleStatusChange(id, status);
      toast.success("Status updated");
    } catch { toast.error("Failed to update"); }
  };

  const filtered = leads.filter((l) => {
    const matchFilter = filter === "All" || l.status === filter || (!l.status && filter === "New");
    const matchSearch = !search ||
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      (l.mobile || l.phone)?.includes(search) ||
      l.service?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = STATUS_OPTIONS.reduce((acc, s) => ({
    ...acc,
    [s]: leads.filter((l) => (l.status || "New") === s).length,
  }), {});

  return (
    <div>
      {selected && (
        <LeadDetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      <div className="adm-page-head">
        <div>
          <h1>Lead Management</h1>
          <p>{leads.length} total leads · {counts["New"] || 0} new</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="leads-tabs">
        {["All", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            className={`leads-tab${filter === s ? " leads-tab--active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s}
            <span className="leads-tab-count">
              {s === "All" ? leads.length : counts[s] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="adm-card" style={{ marginBottom:"1.2rem", padding:"1rem 1.2rem" }}>
        <input
          className="adm-input"
          placeholder="🔍 Search by name, mobile, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="adm-card" style={{ padding: 0, overflow:"hidden" }}>
        {loading ? (
          <div className="adm-empty"><div className="adm-spinner" style={{ margin:"2rem auto" }} /></div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty"><div className="adm-empty-icon">📭</div>No leads found</div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Service</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead._id || i}>
                    <td style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.75rem" }}>{i+1}</td>
                    <td>
                      <div style={{ fontWeight: 600, color:"#fff" }}>{lead.name}</div>
                      <div style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.35)" }}>{lead.email}</div>
                    </td>
                    <td>
                      <a href={`tel:${lead.mobile || lead.phone}`} style={{ color:"#D4AF37", textDecoration:"none" }}>
                        {lead.mobile || lead.phone}
                      </a>
                    </td>
                    <td style={{ maxWidth:"140px" }}>
                      <div style={{ fontSize:"0.8rem" }}>{lead.service}</div>
                    </td>
                    <td>
                      <span style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.4)" }}>
                        {lead.source || lead.type || "Website"}
                      </span>
                    </td>
                    <td style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.35)" }}>
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short" }) : "—"}
                    </td>
                    <td>
                      <select
                        className="adm-select"
                        style={{ width:"130px", fontSize:"0.75rem", padding:"4px 10px" }}
                        value={lead.status || "New"}
                        onChange={(e) => handleQuickStatus(lead._id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button className="adm-btn adm-btn--ghost" style={{ padding:"5px 10px", fontSize:"0.72rem" }} onClick={() => setSelected(lead)}>
                          👁 View
                        </button>
                        <a
                          href={`https://wa.me/91${lead.mobile || lead.phone}`}
                          target="_blank" rel="noopener noreferrer"
                          className="adm-btn"
                          style={{ background:"#25D366", color:"#fff", padding:"5px 10px", fontSize:"0.72rem" }}
                        >
                          💬
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .leads-tabs {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.2rem;
        }
        .leads-tab {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 8px; border: none;
          background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5);
          font-family: 'Poppins', sans-serif; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: background 0.18s, color 0.18s;
        }
        .leads-tab:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
        .leads-tab--active { background: rgba(212,175,55,0.15); color: #D4AF37; border: 1px solid rgba(212,175,55,0.25); }
        .leads-tab-count {
          background: rgba(255,255,255,0.08); padding: 1px 7px;
          border-radius: 10px; font-size: 0.7rem;
        }
        .leads-tab--active .leads-tab-count { background: rgba(212,175,55,0.2); }

        /* Modal */
        .adm-modal-bg {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .adm-modal {
          background: #121826; border: 1px solid rgba(212,175,55,0.2);
          border-radius: 18px; width: 100%; max-width: 560px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
          animation: modalIn 0.3s ease;
        }
        .adm-modal-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(212,175,55,0.1);
        }
        .adm-modal-head h3 {
          font-family: 'Montserrat', sans-serif; font-size: 1.05rem; font-weight: 700; color: #fff;
        }
        .adm-modal-close {
          background: none; border: none; color: rgba(255,255,255,0.3);
          font-size: 1rem; cursor: pointer; transition: color 0.2s;
        }
        .adm-modal-close:hover { color: #D4AF37; }
        .adm-modal-body { padding: 1.6rem; }

        .lead-detail-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1.2rem;
        }
        .lead-detail-item { display: flex; flex-direction: column; gap: 3px; }
        .lead-detail-label {
          font-size: 0.68rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.3);
        }
        .lead-detail-value { font-size: 0.88rem; color: rgba(255,255,255,0.8); font-weight: 500; }

        .lead-msg-box {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; padding: 1rem; margin-bottom: 1rem;
        }
        .lead-msg-text { font-size: 0.84rem; color: rgba(255,255,255,0.55); line-height: 1.65; margin-top: 6px; }

        .lead-detail-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 1.2rem; }
        .spin { animation: spinSlow 0.8s linear infinite; }
        @keyframes modalIn { from { opacity:0; transform: translateY(16px) scale(0.98); } to { opacity:1; transform: none; } }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
