import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { toast, Toaster } from "sonner";
import { BiLoader } from "react-icons/bi";
import { FaTrashAlt, FaPen, FaPlus } from "react-icons/fa";
import { tokenExpired } from "../../libs/library";
import API from "../../libs/apiCall";
import Loading from "../../components/Loading";

const SERVICE_CATEGORIES = [
  "Web Design & Development",
  "Digital Marketing",
  "BPO & Call Center Services",
  "App Development",
  "Graphic Design",
  "Photo & Video Production",
  "Job Consultancy",
  "Event Management",
  "Live Streaming",
  "Political Rallies & Events",
];

const EMPTY_FORM = {
  title: "",
  category: "",
  shortDescription: "",
  fullDescription: "",
  price: "",
  isActive: true,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const { data: res } = await API.get("/service/serviceList");
      setServices(res.data ? res.data.reverse() : []);
    } catch (error) {
      // If API doesn't exist yet, show empty state
      setServices([]);
      console.error(error?.response?.data?.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    setPageLoading(true);
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/service/serviceUpdate/${editId}`, form);
        toast.success("Service updated!");
      } else {
        await API.post("/service/serviceCreate", form);
        toast.success("Service added!");
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);
      fetchServices();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      tokenExpired(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      category: item.category || "",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      price: item.price || "",
      isActive: item.isActive ?? true,
    });
    setEditId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await API.delete(`/service/serviceDelete/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await API.put(`/service/serviceStatusUpdate/${id}`);
      fetchServices();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Status update failed");
    }
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  };

  if (pageLoading) return <Loading />;

  return (
    <>
      <Toaster richColors position="top-center" />

      {/* ── Page Header ── */}
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.pageTitle}>Services</h1>
          <p style={styles.pageSub}>Manage your service offerings</p>
        </div>
        {!showForm && (
          <button style={styles.btnGold} onClick={() => setShowForm(true)}>
            <FaPlus size={12} /> Add New Service
          </button>
        )}
      </div>

      {/* ── Add / Edit Form ── */}
      {showForm && (
        <div style={styles.card}>
          <div style={styles.cardTitle}>
            {editId ? "✏️ Edit Service" : "➕ Add New Service"}
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.row2}>
              <div style={styles.field}>
                <label style={styles.label}>Service Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. SEO Package Pro"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Category</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.row2}>
              <div style={styles.field}>
                <label style={styles.label}>Price / Starting Price</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. ₹5,000 / month"
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Status</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    id="svc-active"
                    style={{ width: 18, height: 18, cursor: "pointer" }}
                  />
                  <label htmlFor="svc-active" style={{ color: "#ccc", fontSize: "0.88rem", cursor: "pointer" }}>
                    Active (visible on website)
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Short Description *</label>
              <textarea
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Brief description shown in service cards (max 200 chars)"
                required
                rows={2}
                style={{ ...styles.input, resize: "vertical" }}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Full Description</label>
              <textarea
                name="fullDescription"
                value={form.fullDescription}
                onChange={handleChange}
                placeholder="Detailed description of the service..."
                rows={5}
                style={{ ...styles.input, resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button type="submit" style={styles.btnGold} disabled={loading}>
                {loading ? <BiLoader size={18} className="animate-spin" /> : editId ? "Update Service" : "Add Service"}
              </button>
              <button type="button" style={styles.btnGhost} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Services Table ── */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>All Services ({services.length})</div>
        {services.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔧</div>
            <div>No services added yet.</div>
            <div style={{ fontSize: "0.8rem", marginTop: 6, color: "rgba(255,255,255,0.2)" }}>
              Click "Add New Service" to get started.
            </div>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["#", "Title", "Category", "Price", "Short Description", "Status", "Action"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((item, i) => (
                  <tr key={item._id} style={styles.tr}>
                    <td style={styles.td}>{i + 1}</td>
                    <td style={{ ...styles.td, fontWeight: 600, color: "#fff", maxWidth: 160 }}>{item.title}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>{item.category}</span>
                    </td>
                    <td style={styles.td}>{item.price || "—"}</td>
                    <td style={{ ...styles.td, maxWidth: 220, fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
                      {item.shortDescription?.slice(0, 80)}{item.shortDescription?.length > 80 ? "..." : ""}
                    </td>
                    <td style={styles.td}>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item.isActive}
                          onChange={() => handleToggleStatus(item._id)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleEdit(item)}
                        >
                          <FaPen />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  pageHead: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    marginBottom: "1.8rem", flexWrap: "wrap", gap: "1rem",
  },
  pageTitle: {
    fontFamily: "'Montserrat', sans-serif", fontSize: "1.4rem",
    fontWeight: 800, color: "#fff", margin: 0,
  },
  pageSub: { fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginTop: 3 },
  card: {
    background: "#121826", border: "1px solid rgba(212,175,55,0.1)",
    borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem",
  },
  cardTitle: {
    fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", fontWeight: 700,
    color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em",
    marginBottom: "1.2rem",
  },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0" },
  field: { marginBottom: "1.1rem" },
  label: {
    display: "block", fontSize: "0.7rem", fontWeight: 600,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)", marginBottom: 6,
  },
  input: {
    width: "100%", padding: "0.72rem 1rem",
    background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 8, color: "#fff", fontFamily: "'Poppins', sans-serif", fontSize: "0.88rem",
    outline: "none", boxSizing: "border-box",
  },
  btnGold: {
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "10px 20px", borderRadius: 8, border: "none",
    fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.82rem",
    cursor: "pointer", background: "linear-gradient(135deg, #D4AF37 0%, #b8962d 100%)",
    color: "#0B0F1A", boxShadow: "0 3px 12px rgba(212,175,55,0.25)", whiteSpace: "nowrap",
  },
  btnGhost: {
    display: "inline-flex", alignItems: "center", gap: 7,
    padding: "10px 20px", borderRadius: 8,
    fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.82rem",
    cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.6)",
    border: "1.5px solid rgba(255,255,255,0.12)",
  },
  table: { width: "100%", borderCollapse: "collapse", fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem" },
  th: {
    textAlign: "left", padding: "10px 14px", fontSize: "0.7rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)",
    borderBottom: "1px solid rgba(212,175,55,0.1)",
  },
  td: { padding: "12px 14px", color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.04)", verticalAlign: "middle" },
  tr: {},
  badge: {
    display: "inline-flex", padding: "3px 10px", borderRadius: 20,
    fontSize: "0.7rem", fontWeight: 600,
    background: "rgba(212,175,55,0.12)", color: "#D4AF37",
  },
  empty: {
    textAlign: "center", padding: "3rem 1rem",
    color: "rgba(255,255,255,0.25)", fontSize: "0.88rem",
  },
};
