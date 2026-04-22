import { useState } from "react";
import { SERVICE_OPTS } from "../../libs/static";
import { toast } from "sonner";
import API from "../../libs/apiCall";
import { BiLoader } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

const StyleSheet = { create: (s) => s };

const TOKEN = {
  gold: "#CF9645",
  goldDark: "#b8762a",
  goldLight: "#fdf6e9",
  goldBorder: "rgba(207,150,69,0.22)",
  pageBg: "#f8f4ef",
  text: "#1a1208",
  textMid: "#5a4020",
  textMuted: "#9e8c6e",
  textFaint: "#a08060",
  white: "#ffffff",
  radius: { sm: 6, md: 10, lg: 14, xl: 20 },
};

const styles = StyleSheet.create({
  page: { background: TOKEN.pageBg, marginTop: 120 },

  mapBanner: {
    position: "relative",
    width: "100%",
    height: 400,
    overflow: "hidden",
  },
  mapIframe: {
    border: 0,
    display: "block",
    width: "100%",
    height: "100%",
    filter: "saturate(0.9) brightness(1.02)",
  },
  mapGradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    background:
      "linear-gradient(to bottom, rgba(10,6,0,0.55) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  mapGradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    background: `linear-gradient(to bottom, transparent 0%, ${TOKEN.pageBg} 100%)`,
    pointerEvents: "none",
  },

  contentWrapper: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "3rem 1.5rem 3rem",
  },

  mainCard: {
    background: TOKEN.white,
    borderRadius: TOKEN.radius.xl,
    boxShadow: "0 4px 36px rgba(160,110,30,0.1)",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1.45fr",
  },

  leftPanel: {
    background: "linear-gradient(160deg, #CF9645 0%, #b8762a 100%)",
    padding: "3.2rem 2.6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  leftDecorCircle: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    border: "1.5px solid rgba(255,255,255,0.12)",
    bottom: -60,
    right: -80,
    pointerEvents: "none",
  },
  leftDecorDot: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    top: "2.5rem",
    right: "2rem",
    pointerEvents: "none",
  },
  leftBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.18)",
    borderRadius: 100,
    padding: "5px 14px 5px 8px",
    marginBottom: "2rem",
  },
  leftBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: TOKEN.white,
    display: "inline-block",
  },
  leftBadgeText: {
    fontSize: "0.71rem",
    color: TOKEN.white,
    letterSpacing: "0.1em",
    fontWeight: 600,
  },
  leftHeading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.3rem",
    fontWeight: 700,
    color: TOKEN.white,
    lineHeight: 1.15,
    margin: "0 0 1rem",
  },
  leftBody: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.75,
    margin: "0 0 2.2rem",
  },
  leftInfoRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "1rem",
  },
  leftInfoIcon: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  leftInfoChip: {
    fontSize: "0.66rem",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.1em",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  leftInfoValue: {
    fontSize: "0.87rem",
    color: TOKEN.white,
    fontWeight: 500,
    marginTop: 1,
  },
  leftWABtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: TOKEN.radius.md,
    padding: "8px 15px",
    marginTop: 6,
    textDecoration: "none",
  },
  leftWAText: { fontSize: "0.81rem", color: TOKEN.white, fontWeight: 600 },

  rightPanel: { padding: "3.2rem 2.8rem" },
  formHeading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.7rem",
    fontWeight: 700,
    color: TOKEN.text,
    margin: "0 0 0.3rem",
  },
  formSubtitle: {
    fontSize: "0.84rem",
    color: TOKEN.textMuted,
    margin: "0 0 2.2rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.95rem 1.1rem",
  },
  formFieldFull: { gridColumn: "1 / -1" },
  formLabel: {
    display: "block",
    fontSize: "0.71rem",
    fontWeight: 600,
    color: "#7a6540",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  selectWrap: { position: "relative" },
  selectChevron: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  submitBtnArea: { gridColumn: "1 / -1", marginTop: 4 },
  submitBtn: {
    width: "100%",
    padding: "0.88rem 1.5rem",
    background: TOKEN.gold,
    color: TOKEN.white,
    border: "none",
    borderRadius: TOKEN.radius.md,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: "0.9rem",
    letterSpacing: "0.06em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  successBanner: {
    background: TOKEN.goldLight,
    border: `1.5px solid ${TOKEN.goldBorder}`,
    borderRadius: TOKEN.radius.md,
    padding: "0.95rem 1.3rem",
    color: "#8a5e10",
    fontSize: "0.88rem",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
});

/* ── SVG Icons ── */
const IcoPhone = ({ size = 18, color = TOKEN.gold }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.27 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.15a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IcoMail = ({ size = 18, color = TOKEN.gold }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IcoPin = ({ size = 18, color = TOKEN.gold }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IcoWA = ({ size = 18, fill = TOKEN.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.532 5.848L.057 23.617a.75.75 0 0 0 .92.92l5.769-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.51-5.233-1.4l-.374-.22-3.882.993.993-3.882-.22-.374A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);
const IcoChevron = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke={TOKEN.gold}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Responsive CSS injected once ── */
const RESPONSIVE_CSS = `
  .contact-main-card {
    display: grid;
    grid-template-columns: 1fr 1.45fr;
  }
  .contact-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.95rem 1.1rem;
  }
  .contact-left-panel {
    padding: 3.2rem 2.6rem;
  }
  .contact-right-panel {
    padding: 3.2rem 2.8rem;
  }
  .contact-map-banner {
    height: 400px;
  }
  .contact-content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem 3rem;
  }
  .contact-left-heading {
    font-size: 2.3rem;
  }

  /* Tablet: 768px – 1023px */
  @media (max-width: 1023px) {
    .contact-main-card {
      grid-template-columns: 1fr !important;
    }
    .contact-left-panel {
      padding: 2.4rem 2rem !important;
    }
    .contact-right-panel {
      padding: 2.4rem 2rem !important;
    }
    .contact-left-heading {
      font-size: 1.9rem !important;
    }
    .contact-map-banner {
      height: 300px !important;
    }
  }

  /* Mobile: up to 640px */
  @media (max-width: 640px) {
    .contact-content-wrapper {
      padding: 1.5rem 1rem 2rem !important;
    }
    .contact-main-card {
      border-radius: 14px !important;
    }
    .contact-left-panel {
      padding: 2rem 1.4rem !important;
    }
    .contact-right-panel {
      padding: 2rem 1.4rem !important;
    }
    .contact-left-heading {
      font-size: 1.6rem !important;
    }
    .contact-form-grid {
      grid-template-columns: 1fr !important;
    }
    .contact-form-field-full {
      grid-column: 1 / -1 !important;
    }
    .contact-submit-area {
      grid-column: 1 / -1 !important;
    }
    .contact-map-banner {
      height: 220px !important;
    }
    .contact-page {
      margin-top: 70px !important;
    }
  }

  /* Very small: up to 400px */
  @media (max-width: 400px) {
    .contact-left-heading {
      font-size: 1.4rem !important;
    }
    .contact-left-panel {
      padding: 1.6rem 1.1rem !important;
    }
    .contact-right-panel {
      padding: 1.6rem 1.1rem !important;
    }
  }
`;

export default function ContactPage() {
  const [focused, setFocused] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const [isLaoding, setIsLoading] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [alertText, setAlertText] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setMobile("");
    setService("");
    setMsg("");
  };

  const alertMsg = (msg, type) => {
    setAlertText(msg);
    setMsgType(type);
    setIsAlert(true);
    const timer = setTimeout(() => {
      setAlertText("");
      setMsgType("");
      setIsAlert(false);
    }, 2500);
    return () => clearTimeout(timer);
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(mobile)) {
        alertMsg(
          "Mobile number must be exactly 10 digits and contain only numbers.",
        );
        setMsgType("warn-msg");
        return;
      }

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        alertMsg("Enter valid email Id.");
        setMsgType("warn-msg");
        return;
      }

      await API.post("/enquiry/create", {
        type: "Request a Quote",
        name,
        mobile,
        email,
        service,
        message: msg,
      });
      toast.success("Enquiry submitted");
      clearInput();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "0.72rem 1rem",
    background: focused === name ? "#fffdf7" : TOKEN.white,
    border: `1.5px solid ${focused === name ? TOKEN.gold : TOKEN.goldBorder}`,
    borderRadius: TOKEN.radius.sm,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: TOKEN.text,
    outline: "none",
    transition: "border-color 0.18s, background 0.18s",
  });

  return (
    <>
      <Helmet>
        <title>Contact Us | Technosaga Infotech</title>
        <link rel="canonical" href="https://technosagainfotech.in/contact" />
      </Helmet>
      <div className="contact-page" style={styles.page}>
        <style>{RESPONSIVE_CSS}</style>

        {/* MAP BANNER */}
        <div className="contact-map-banner" style={styles.mapBanner}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.6557701295797!2d85.1137981!3d25.6163524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59722e5d3e1d%3A0x2bdb18fa75038eee!2sTechnosaga%20Infotech%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1775022485744!5m2!1sen!2sin"
            style={styles.mapIframe}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={styles.mapGradientTop} />
          <div style={styles.mapGradientBottom} />
        </div>

        {/* CONTENT */}
        <div className="contact-content-wrapper" style={styles.contentWrapper}>
          <div className="contact-main-card" style={styles.mainCard}>
            {/* Left panel */}
            <div className="contact-left-panel" style={styles.leftPanel}>
              <div style={styles.leftDecorCircle} />
              <div style={styles.leftDecorDot} />
              <div>
                <div style={styles.leftBadge}>
                  <span style={styles.leftBadgeDot} />
                  <span style={styles.leftBadgeText}>GET IN TOUCH</span>
                </div>
                <h2 className="contact-left-heading" style={styles.leftHeading}>
                  We'd Love to
                  <br />
                  Hear From You
                </h2>
                <p style={styles.leftBody}>
                  Have a project in mind or just want to say hello? Fill in the
                  form and we'll get back to you within 24 hours.
                </p>

                {[
                  {
                    label: "Mobile",
                    value: "+91 9155031859",
                    icon: <IcoPhone size={14} color={TOKEN.gold} />,
                  },
                  {
                    label: "Email",
                    value: "technosagainfotech@gmail.com",
                    icon: <IcoMail size={14} color={TOKEN.gold} />,
                  },
                  {
                    label: "Address",
                    value:
                      "M2/12, near yamuna apartment, boring road patna- 800001",
                    icon: <IcoPin size={14} color={TOKEN.gold} />,
                  },
                ].map((item) => (
                  <div key={item.label} style={styles.leftInfoRow}>
                    <div style={styles.leftInfoIcon}>{item.icon}</div>
                    <div>
                      <div style={styles.leftInfoChip}>{item.label}</div>
                      <div style={styles.leftInfoValue}>{item.value}</div>
                    </div>
                  </div>
                ))}

                <a
                  href="https://wa.me/9155031859"
                  target="_blank"
                  rel="noreferrer"
                  style={styles.leftWABtn}
                >
                  <IcoWA size={15} fill={TOKEN.white} />
                  <span style={styles.leftWAText}>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="contact-right-panel" style={styles.rightPanel}>
              <h3 style={styles.formHeading}>Send a Message</h3>
              <p style={styles.formSubtitle}>
                All fields marked * are required.
              </p>
              {isAlert && <p className={msgType}>{alertText}</p>}
              <form onSubmit={handleEnquiry}>
                <div className="contact-form-grid" style={styles.formGrid}>
                  <div>
                    <label style={styles.formLabel}>Name *</label>
                    <input
                      name="firstName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("firstName")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("firstName")}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div>
                    <label style={styles.formLabel}>Mobile</label>
                    <input
                      name="lastName"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      onFocus={() => setFocused("lastName")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("lastName")}
                      placeholder="Mobile number"
                    />
                  </div>
                  <div
                    className="contact-form-field-full"
                    style={styles.formFieldFull}
                  >
                    <label style={styles.formLabel}>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email")}
                      placeholder="jane@company.com"
                      required
                    />
                  </div>
                  <div
                    className="contact-form-field-full"
                    style={styles.formFieldFull}
                  >
                    <label style={styles.formLabel}>Subject</label>
                    <div style={styles.selectWrap}>
                      <select
                        name="subject"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle("subject"),
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select a topic...</option>
                        {SERVICE_OPTS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <span style={styles.selectChevron}>
                        <IcoChevron />
                      </span>
                    </div>
                  </div>
                  <div
                    className="contact-form-field-full"
                    style={styles.formFieldFull}
                  >
                    <label style={styles.formLabel}>Message *</label>
                    <textarea
                      name="message"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: 115,
                        lineHeight: 1.7,
                      }}
                      placeholder="Tell us about your project or inquiry..."
                      required
                    />
                  </div>
                  <div
                    className="contact-submit-area"
                    style={styles.submitBtnArea}
                  >
                    <button
                      type="submit"
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                      style={{
                        ...styles.submitBtn,
                        background: btnHover ? TOKEN.goldDark : TOKEN.gold,
                        transform: btnHover ? "translateY(-1px)" : "none",
                        transition: "background 0.18s, transform 0.12s",
                      }}
                    >
                      {isLaoding ? (
                        <BiLoader size={24} className="animate-spin" />
                      ) : (
                        "Send Message <IcoArrow />"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
