import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import API from "../../libs/apiCall";
import { BiLoader } from "react-icons/bi";
import { SERVICE_OPTS } from "../../libs/static";

const CONTACT_INFO = [
  { icon: "📍", label: "Office Address", value: "M2/12, Near Yamuna Apartment, Boring Road, Patna – 800001, Bihar, India" },
  { icon: "📞", label: "Phone / WhatsApp", value: "+91 9155031859", link: "tel:+919155031859" },
  { icon: "✉️", label: "Email Address", value: "technosagainfotech@mail.com", link: "mailto:technosagainfotech@mail.com" },
  { icon: "🌐", label: "Website", value: "www.technosagainfotech.in", link: "https://technosagainfotech.in" },
];

export default function ContactNew() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", city: "", service: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.mobile)) { toast.error("Please enter a valid 10-digit mobile number."); return; }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) { toast.error("Please enter a valid email address."); return; }
    setLoading(true);
    try {
      await API.post("/enquiry/create", { type: "Contact Page", ...form, message: form.message });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setDone(true);
      setForm({ name: "", mobile: "", email: "", city: "", service: "", message: "" });
      setTimeout(() => setDone(false), 6000);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (k) => `cp-input${focused === k ? " cp-input--focus" : ""}`;

  return (
    <>
      <Helmet>
        <title>Contact Us | Technosaga Infotech — Digital Marketing & Web Development Company in Patna</title>
        <meta name="description" content="Get in touch with Technosaga Infotech. We're Patna's leading digital marketing, web development and BPO company. Call, email or fill out our contact form." />
        <link rel="canonical" href="https://technosagainfotech.in/contact" />
      </Helmet>

      <div className="cp">
        {/* Page Banner */}
        <div className="cp__banner">
          <div className="cp__banner-overlay" />
          <div className="cp__banner-content">
            <div className="cp__eyebrow">Get In Touch</div>
            <h1 className="cp__banner-h1">Contact <span className="cp__gold">Us</span></h1>
            <p className="cp__banner-sub">Have a project in mind? We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
          </div>
        </div>

        {/* Google Map */}
        <div className="cp__map-wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.6557701295797!2d85.1137981!3d25.6163524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59722e5d3e1d%3A0x2bdb18fa75038eee!2sTechnosaga%20Infotech%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1775022485744!5m2!1sen!2sin"
            className="cp__map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Technosaga Infotech Location"
          />
          <div className="cp__map-fade-top" />
          <div className="cp__map-fade-bot" />
        </div>

        {/* Main grid */}
        <div className="cp__main">
          <div className="cp__inner">
            {/* Left — contact info */}
            <div className="cp__left">
              <div className="cp__left-head">
                <h2 className="cp__left-h2">We're Here to <span className="cp__gold">Help You</span></h2>
                <p className="cp__left-sub">Reach out through any channel below — our team is ready to assist you with any enquiry.</p>
              </div>

              <div className="cp__info-list">
                {CONTACT_INFO.map((c) => (
                  <div key={c.label} className="cp__info-item">
                    <div className="cp__info-icon">{c.icon}</div>
                    <div className="cp__info-text">
                      <span className="cp__info-label">{c.label}</span>
                      {c.link ? (
                        <a href={c.link} className="cp__info-value cp__info-link">{c.value}</a>
                      ) : (
                        <span className="cp__info-value">{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/919155031859" className="cp__wa-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp Now
              </a>

              <div className="cp__hours">
                <div className="cp__hours-title">Business Hours</div>
                <div className="cp__hours-row"><span>Monday – Saturday</span><span className="cp__gold">9:00 AM – 7:00 PM</span></div>
                <div className="cp__hours-row"><span>Sunday</span><span>By Appointment</span></div>
              </div>
            </div>

            {/* Right — form */}
            <div className="cp__right">
              <div className="cp__form-head">
                <h2 className="cp__form-h2">Send Us a <span className="cp__gold">Message</span></h2>
                <p className="cp__form-sub">Fill in the form below and we'll get back to you within 24 hours.</p>
              </div>

              {done && (
                <div className="cp__success">
                  ✅ Thank you! Your message has been sent successfully. We'll contact you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="cp__form">
                <div className="cp__row-2">
                  <div className="cp__field">
                    <label className="cp__label">Full Name *</label>
                    <input className={inputCls("name")} value={form.name} onChange={set("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your full name" required />
                  </div>
                  <div className="cp__field">
                    <label className="cp__label">Mobile / WhatsApp *</label>
                    <input className={inputCls("mobile")} value={form.mobile} onChange={set("mobile")} onFocus={() => setFocused("mobile")} onBlur={() => setFocused(null)} placeholder="10-digit mobile number" maxLength={10} required />
                  </div>
                </div>

                <div className="cp__row-2">
                  <div className="cp__field">
                    <label className="cp__label">Email Address *</label>
                    <input type="email" className={inputCls("email")} value={form.email} onChange={set("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="you@company.com" required />
                  </div>
                  <div className="cp__field">
                    <label className="cp__label">City</label>
                    <input className={inputCls("city")} value={form.city} onChange={set("city")} onFocus={() => setFocused("city")} onBlur={() => setFocused(null)} placeholder="Your city" />
                  </div>
                </div>

                <div className="cp__field">
                  <label className="cp__label">Choose Service</label>
                  <div className="cp__select-wrap">
                    <select className={inputCls("service")} value={form.service} onChange={set("service")} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                      <option value="">Select a service...</option>
                      {SERVICE_OPTS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <span className="cp__chevron">▾</span>
                  </div>
                </div>

                <div className="cp__field">
                  <label className="cp__label">Project Description *</label>
                  <textarea className={`${inputCls("message")} cp-textarea`} value={form.message} onChange={set("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Tell us about your project, goals, or any specific requirements..." required rows={5} />
                </div>

                <button type="submit" className="cp__submit" disabled={loading}>
                  {loading ? <BiLoader size={20} className="spin" /> : null}
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cp { background: #0B0F1A; min-height: 100vh; padding-top: 72px; font-family: 'Poppins', sans-serif; }
        .cp__gold { color: #D4AF37; }

        /* Banner */
        .cp__banner {
          position: relative;
          background: linear-gradient(135deg, #0B0F1A 0%, #121826 100%);
          padding: 5rem 1.5rem 4rem;
          text-align: center;
          overflow: hidden;
        }
        .cp__banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%);
        }
        .cp__banner-overlay { position: absolute; inset: 0; pointer-events: none; }
        .cp__banner-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .cp__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: #D4AF37; background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px; padding: 6px 16px; margin-bottom: 1rem;
        }
        .cp__banner-h1 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 1rem;
        }
        .cp__banner-sub { font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 520px; margin: 0 auto; }

        /* Map */
        .cp__map-wrap { position: relative; height: 380px; overflow: hidden; }
        .cp__map { width: 100%; height: 100%; border: 0; display: block; filter: saturate(0.7) brightness(0.8); }
        .cp__map-fade-top {
          position: absolute; top: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to bottom, #0B0F1A, transparent);
          pointer-events: none;
        }
        .cp__map-fade-bot {
          position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
          background: linear-gradient(to top, #0B0F1A, transparent);
          pointer-events: none;
        }

        /* Main */
        .cp__main { padding: 4rem 0 6rem; }
        .cp__inner {
          max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
          display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start;
        }

        /* Left */
        .cp__left-head { margin-bottom: 2rem; }
        .cp__left-h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 800;
          color: #fff; line-height: 1.2; margin-bottom: 0.8rem;
        }
        .cp__left-sub { font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.7; }

        .cp__info-list { display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 1.8rem; }
        .cp__info-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 1rem 1.2rem;
          background: #121826; border: 1px solid rgba(212,175,55,0.1); border-radius: 12px;
          transition: border-color 0.2s;
        }
        .cp__info-item:hover { border-color: rgba(212,175,55,0.3); }
        .cp__info-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          background: rgba(212,175,55,0.1); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .cp__info-label {
          display: block; font-size: 0.68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.35); margin-bottom: 3px;
        }
        .cp__info-value { font-size: 0.85rem; color: rgba(255,255,255,0.75); line-height: 1.5; }
        .cp__info-link { text-decoration: none; transition: color 0.2s; }
        .cp__info-link:hover { color: #D4AF37; }

        .cp__wa-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #25D366; color: #fff;
          font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 0.88rem;
          padding: 12px 22px; border-radius: 8px; text-decoration: none;
          transition: background 0.2s, transform 0.2s; margin-bottom: 1.5rem;
          box-shadow: 0 4px 16px rgba(37,211,102,0.25);
        }
        .cp__wa-btn:hover { background: #1ebe5a; transform: translateY(-2px); color: #fff; }

        .cp__hours {
          background: #121826; border: 1px solid rgba(212,175,55,0.1);
          border-radius: 12px; padding: 1.2rem 1.4rem;
        }
        .cp__hours-title {
          font-family: 'Montserrat', sans-serif; font-size: 0.8rem; font-weight: 700;
          color: #D4AF37; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.8rem;
        }
        .cp__hours-row {
          display: flex; justify-content: space-between;
          font-size: 0.82rem; color: rgba(255,255,255,0.5);
          padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cp__hours-row:last-child { border-bottom: none; }

        /* Right form */
        .cp__right {
          background: #121826; border: 1px solid rgba(212,175,55,0.12);
          border-radius: 20px; padding: 2.5rem;
        }
        .cp__form-head { margin-bottom: 1.8rem; }
        .cp__form-h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.4rem, 2vw, 1.8rem); font-weight: 800;
          color: #fff; margin-bottom: 0.5rem;
        }
        .cp__form-sub { font-size: 0.85rem; color: rgba(255,255,255,0.45); }

        .cp__success {
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3);
          border-radius: 10px; padding: 1rem 1.2rem;
          font-size: 0.88rem; color: #D4AF37; margin-bottom: 1.5rem; line-height: 1.5;
        }

        .cp__form { display: flex; flex-direction: column; gap: 1.1rem; }
        .cp__row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .cp__field { display: flex; flex-direction: column; gap: 6px; }
        .cp__label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); }

        .cp-input {
          width: 100%; padding: 0.78rem 1rem;
          background: rgba(255,255,255,0.04); border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #fff;
          font-family: 'Poppins', sans-serif; font-size: 0.88rem;
          outline: none; transition: border-color 0.2s, background 0.2s;
          appearance: none;
        }
        .cp-input::placeholder { color: rgba(255,255,255,0.25); }
        .cp-input--focus {
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.04);
        }
        .cp-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }

        .cp__select-wrap { position: relative; }
        .cp__chevron {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.35); pointer-events: none; font-size: 0.8rem;
        }

        .cp__submit {
          width: 100%;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.95rem; padding: 14px 28px; border-radius: 8px; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cp__submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(212,175,55,0.45); }
        .cp__submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spin { animation: spinSlow 0.8s linear infinite; }

        @media (max-width: 900px) {
          .cp__inner { grid-template-columns: 1fr; }
          .cp__map-wrap { height: 280px; }
        }
        @media (max-width: 560px) {
          .cp__row-2 { grid-template-columns: 1fr; }
          .cp__right { padding: 1.5rem; }
          .cp__map-wrap { height: 220px; }
        }
      `}</style>
    </>
  );
}
