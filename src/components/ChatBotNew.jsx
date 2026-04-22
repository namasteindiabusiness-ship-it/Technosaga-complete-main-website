import React, { useState, useEffect, useRef, useCallback } from "react";
import API from "../libs/apiCall";
import { toast } from "sonner";

const WA_NUMBER = "919155031859";
const COMPANY = "Technosaga Infotech";

const SERVICES = [
  { label: "🌐 Web Design & Development", value: "Web Design & Development" },
  { label: "📣 Digital Marketing", value: "Digital Marketing" },
  { label: "🎧 BPO & Call Centre Services", value: "BPO & Call Centre Services" },
  { label: "📱 App Development", value: "App Development" },
  { label: "🎨 Graphic Design", value: "Graphic Design" },
  { label: "🎬 Photo & Video Production", value: "Photo & Video Production" },
  { label: "💼 Job Consultancy", value: "Job Consultancy" },
  { label: "🎪 Event Management", value: "Event Management" },
  { label: "📡 Live Streaming", value: "Live Streaming" },
  { label: "🏛️ Political Rallies & Events", value: "Political Rallies & Events" },
];

// ── Message builder helpers ────────────────────────────────────
const botMsg = (text, extras = {}) => ({
  id: Date.now() + Math.random(),
  type: "bot",
  text,
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  ...extras,
});

const userMsg = (text) => ({
  id: Date.now() + Math.random(),
  type: "user",
  text,
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
});

// ── FLOW STEPS ─────────────────────────────────────────────────
const FLOW = {
  welcome: {
    text: `👋 Hello! Welcome to **${COMPANY}**!\n\nI'm your virtual assistant. How can I help you today?`,
    options: [
      { label: "📋 Get a Free Quote", next: "ask_name" },
      { label: "🔧 Our Services", next: "show_services" },
      { label: "📞 Contact Info", next: "show_contact" },
      { label: "💬 Talk to Team", next: "whatsapp_direct" },
    ],
  },
  show_services: {
    text: `We offer the following premium services:\n\n🌐 Web Design & Development\n📣 Digital Marketing\n🎧 BPO & Call Centre Services\n📱 App Development\n🎨 Graphic Design\n🎬 Photo & Video Production\n💼 Job Consultancy\n🎪 Event Management\n📡 Live Streaming\n🏛️ Political Rallies & Events\n\nWould you like a free quote for any of these?`,
    options: [
      { label: "📋 Get a Free Quote", next: "ask_name" },
      { label: "🏠 Main Menu", next: "welcome" },
    ],
  },
  show_contact: {
    text: `📍 **Office:** M2/12, Near Yamuna Apartment, Boring Road, Patna – 800001\n\n📞 **Phone:** +91 9155031859\n✉️ **Email:** technosagainfotech@mail.com\n🌐 **Web:** www.technosagainfotech.in\n\n⏰ **Hours:** Mon–Sat, 9AM – 7PM IST`,
    options: [
      { label: "💬 WhatsApp Us Now", next: "whatsapp_direct" },
      { label: "📋 Get a Free Quote", next: "ask_name" },
      { label: "🏠 Main Menu", next: "welcome" },
    ],
  },
  ask_name: {
    text: "Great! I'll help you get a free quote. 😊\n\nFirst, may I know your **full name**?",
    input: "name",
  },
  ask_phone: {
    text: "Thank you, **{name}**! 👍\n\nPlease share your **mobile / WhatsApp number** (10 digits):",
    input: "phone",
  },
  ask_requirement: {
    text: "Perfect! Which **service** are you interested in?\n\nPlease select one:",
    service_select: true,
  },
  submitted: {
    text: `🎉 **Thank you, {name}!**\n\nYour enquiry has been submitted successfully!\n\n✅ Our team will contact you on **{phone}** within 24 hours.\n\nFor urgent queries, you can also reach us directly on WhatsApp.`,
    options: [
      { label: "💬 WhatsApp Us Now", next: "whatsapp_lead" },
      { label: "🏠 Back to Main Menu", next: "welcome" },
    ],
  },
};

// ── MAIN CHATBOT COMPONENT ─────────────────────────────────────
export default function ChatBotNew() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState("welcome");
  const [inputVal, setInputVal] = useState("");
  const [inputMode, setInputMode] = useState(null); // 'name' | 'phone' | null
  const [userData, setUserData] = useState({ name: "", phone: "", service: "" });
  const [typing, setTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showNotif, setShowNotif] = useState(false);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-open with notification after 6s
  useEffect(() => {
    const t1 = setTimeout(() => setShowNotif(true), 6000);
    return () => clearTimeout(t1);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when inputMode set
  useEffect(() => {
    if (inputMode) setTimeout(() => inputRef.current?.focus(), 150);
  }, [inputMode]);

  // Init messages on open
  useEffect(() => {
    if (open && messages.length === 0) {
      pushStep("welcome");
    }
    if (open) { setUnread(0); setShowNotif(false); }
  }, [open]);

  const replaceVars = useCallback((text) =>
    text.replace(/\*\*(.*?)\*\*/g, "$1")
        .replace("{name}", userData.name)
        .replace("{phone}", userData.phone),
  [userData]);

  const pushBotMsg = useCallback((text, extras = {}) => {
    setMessages((prev) => [...prev, botMsg(replaceVars(text), extras)]);
    if (!open) setUnread((u) => u + 1);
  }, [replaceVars, open]);

  const pushStep = useCallback((stepId, overrideData = null) => {
    const data = overrideData || userData;
    const flow = FLOW[stepId];
    if (!flow) return;
    setStep(stepId);
    setInputMode(null);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const text = flow.text
        .replace("{name}", data.name || "")
        .replace("{phone}", data.phone || "");

      setMessages((prev) => [
        ...prev,
        botMsg(text, {
          options: flow.options || null,
          serviceSelect: flow.service_select || false,
        }),
      ]);

      if (flow.input) setInputMode(flow.input);
    }, 800);
  }, [userData]);

  // Handle option button click
  const handleOption = useCallback((opt) => {
    setMessages((prev) => [...prev, userMsg(opt.label)]);

    if (opt.next === "whatsapp_direct") {
      const msg = encodeURIComponent(`Hello ${COMPANY}! I'd like to know more about your services.`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
      return;
    }
    if (opt.next === "whatsapp_lead") {
      const msg = encodeURIComponent(
        `Hello ${COMPANY}!\n\nI just submitted an enquiry via your website chatbot:\n\n👤 Name: ${userData.name}\n📞 Phone: ${userData.phone}\n💼 Service: ${userData.service}\n\nPlease get in touch with me. Thank you!`
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
      return;
    }
    setTimeout(() => pushStep(opt.next), 400);
  }, [userData, pushStep]);

  // Handle text input submit
  const handleInputSubmit = useCallback(() => {
    const val = inputVal.trim();
    if (!val) return;

    setMessages((prev) => [...prev, userMsg(val)]);
    setInputVal("");
    setInputMode(null);

    if (inputMode === "name") {
      const newData = { ...userData, name: val };
      setUserData(newData);
      setTimeout(() => pushStep("ask_phone", newData), 400);
    } else if (inputMode === "phone") {
      if (!/^\d{10}$/.test(val)) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages((prev) => [...prev, botMsg("⚠️ Please enter a valid 10-digit mobile number:")]);
          setInputMode("phone");
        }, 600);
        return;
      }
      const newData = { ...userData, phone: val };
      setUserData(newData);
      setTimeout(() => pushStep("ask_requirement", newData), 400);
    }
  }, [inputVal, inputMode, userData, pushStep]);

  // Handle service selection
  const handleServiceSelect = useCallback(async (service) => {
    const newData = { ...userData, service: service.value };
    setUserData(newData);
    setMessages((prev) => [...prev, userMsg(service.label)]);
    setTyping(true);

    try {
      // Save lead to backend
      await API.post("/enquiry/create", {
        type: "Chatbot Lead",
        name: newData.name,
        mobile: newData.phone,
        email: "",
        service: service.value,
        message: `Chatbot enquiry — Service: ${service.value}`,
        source: "chatbot",
      });

      // Auto-send WhatsApp notification to admin
      const adminMsg = encodeURIComponent(
        `🔔 *New Chatbot Lead — ${COMPANY}*\n\n` +
        `👤 *Name:* ${newData.name}\n` +
        `📞 *Phone:* ${newData.phone}\n` +
        `💼 *Service:* ${service.value}\n` +
        `🕐 *Time:* ${new Date().toLocaleString("en-IN")}\n\n` +
        `_Auto-generated from website chatbot_`
      );
      // Silent WhatsApp ping (opens in bg tab — admin gets it)
      const waWindow = window.open(`https://wa.me/${WA_NUMBER}?text=${adminMsg}`, "_blank");
      if (waWindow) setTimeout(() => waWindow.close(), 3000);

      setSubmitted(true);
    } catch (err) {
      console.error("Chatbot lead save error:", err);
    } finally {
      setTyping(false);
      setTimeout(() => pushStep("submitted", newData), 200);
    }
  }, [userData, pushStep]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  const formatText = (text) =>
    text.split("\n").map((line, i, arr) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: bold }} />
          {i < arr.length - 1 && <br />}
        </span>
      );
    });

  return (
    <>
      {/* ── FLOATING NOTIFICATION ── */}
      {showNotif && !open && (
        <div className="cb-notif" onClick={() => { setOpen(true); setShowNotif(false); }}>
          <div className="cb-notif__avatar">
            <img src="/static/logo-new.png" alt={COMPANY} />
          </div>
          <div className="cb-notif__text">
            <strong>Hi there! 👋</strong>
            <span>Need help? Chat with us now!</span>
          </div>
          <button className="cb-notif__x" onClick={(e) => { e.stopPropagation(); setShowNotif(false); }}>✕</button>
        </div>
      )}

      {/* ── BUBBLE BUTTON ── */}
      <button
        className={`cb-bubble${open ? " cb-bubble--open" : ""}`}
        onClick={() => { setOpen(!open); setMinimised(false); }}
        aria-label="Chat with Technosaga"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1 13H7v-2h4v2zm4-4H7V9h8v2z"/>
          </svg>
        )}
        {!open && unread > 0 && <span className="cb-badge">{unread}</span>}
        {!open && <span className="cb-pulse" />}
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div className={`cb-window${minimised ? " cb-window--min" : ""}`}>
          {/* Header */}
          <div className="cb-header">
            <div className="cb-header__left">
              <div className="cb-header__av">
                <img src="/static/logo-new.png" alt={COMPANY} />
                <span className="cb-header__online" />
              </div>
              <div className="cb-header__info">
                <div className="cb-header__name">{COMPANY}</div>
                <div className="cb-header__status">
                  <span className="cb-header__dot" /> Online — typically replies instantly
                </div>
              </div>
            </div>
            <div className="cb-header__actions">
              <button className="cb-header__btn" onClick={() => setMinimised(!minimised)} aria-label="Minimise">
                {minimised ? "▲" : "▼"}
              </button>
              <button className="cb-header__btn" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div className="cb-messages">
                {/* Timestamp banner */}
                <div className="cb-day-label">Today</div>

                {messages.map((msg) => (
                  <div key={msg.id} className={`cb-msg cb-msg--${msg.type}`}>
                    {msg.type === "bot" && (
                      <div className="cb-msg__av">
                        <img src="/static/logo-new.png" alt="Bot" />
                      </div>
                    )}
                    <div className="cb-msg__wrap">
                      <div className="cb-msg__bubble">
                        <div className="cb-msg__text">{formatText(msg.text)}</div>

                        {/* Quick-reply options */}
                        {msg.options && (
                          <div className="cb-opts">
                            {msg.options.map((opt) => (
                              <button key={opt.label} className="cb-opt-btn" onClick={() => handleOption(opt)}>
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Service chips */}
                        {msg.serviceSelect && !submitted && (
                          <div className="cb-services">
                            {SERVICES.map((s) => (
                              <button key={s.value} className="cb-svc-btn" onClick={() => handleServiceSelect(s)}>
                                {s.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="cb-msg__time">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="cb-msg cb-msg--bot">
                    <div className="cb-msg__av">
                      <img src="/static/logo-new.png" alt="Bot" />
                    </div>
                    <div className="cb-msg__wrap">
                      <div className="cb-msg__bubble cb-typing">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Input row */}
              {inputMode && (
                <div className="cb-input-row">
                  <input
                    ref={inputRef}
                    className="cb-input"
                    type={inputMode === "phone" ? "tel" : "text"}
                    placeholder={
                      inputMode === "name" ? "Enter your full name..." :
                      "Enter your 10-digit mobile number..."
                    }
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={inputMode === "phone" ? 10 : 60}
                  />
                  <button className="cb-send" onClick={handleInputSubmit} aria-label="Send">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Footer */}
              <div className="cb-footer">
                <span>Powered by</span>
                <strong> {COMPANY}</strong>
                <span> · </span>
                <a href="https://wa.me/919155031859" target="_blank" rel="noopener noreferrer" className="cb-footer__wa">
                  💬 WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        /* ── NOTIFICATION ─────────────────── */
        .cb-notif {
          position: fixed;
          bottom: 110px;
          right: 90px;
          z-index: 9996;
          background: #121826;
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 260px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          cursor: pointer;
          animation: slideLeft 0.4s ease;
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .cb-notif__avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: #D4AF37; overflow: hidden; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .cb-notif__avatar img { width: 34px; height: 34px; object-fit: contain; }
        .cb-notif__text { display: flex; flex-direction: column; gap: 2px; }
        .cb-notif__text strong { font-size: 0.82rem; color: #fff; font-family: 'Montserrat', sans-serif; }
        .cb-notif__text span { font-size: 0.75rem; color: rgba(255,255,255,0.5); font-family: 'Poppins', sans-serif; }
        .cb-notif__x {
          background: none; border: none; color: rgba(255,255,255,0.3);
          font-size: 0.75rem; cursor: pointer; padding: 2px;
          margin-left: auto; flex-shrink: 0;
          transition: color 0.2s;
        }
        .cb-notif__x:hover { color: #D4AF37; }

        /* ── BUBBLE ───────────────────────── */
        .cb-bubble {
          position: fixed;
          bottom: 32px; right: 32px;
          z-index: 9998;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          border: none;
          color: #0B0F1A;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 28px rgba(212,175,55,0.5);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cb-bubble:hover { transform: scale(1.08); box-shadow: 0 10px 36px rgba(212,175,55,0.65); }
        .cb-bubble--open { background: #0B0F1A; color: #D4AF37; border: 2px solid #D4AF37; }

        .cb-badge {
          position: absolute; top: -4px; right: -4px;
          width: 20px; height: 20px;
          background: #E74C3C; color: #fff;
          border-radius: 50%; font-size: 0.65rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #0B0F1A;
        }
        .cb-pulse {
          position: absolute; top: -2px; right: -2px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: rgba(212,175,55,0.5);
          animation: cbPulse 2s infinite;
        }
        @keyframes cbPulse {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }

        /* ── WINDOW ───────────────────────── */
        .cb-window {
          position: fixed;
          bottom: 108px; right: 32px;
          z-index: 9997;
          width: 390px;
          border-radius: 20px;
          background: #0B0F1A;
          border: 1px solid rgba(212,175,55,0.2);
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: cbSlideUp 0.32s cubic-bezier(0.22,1,0.36,1);
          max-height: 600px;
        }
        @keyframes cbSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cb-window--min { max-height: auto; }

        /* ── HEADER ───────────────────────── */
        .cb-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px;
          background: linear-gradient(135deg, #121826 0%, #0f1a2e 100%);
          border-bottom: 1px solid rgba(212,175,55,0.12);
          flex-shrink: 0;
        }
        .cb-header__left { display: flex; align-items: center; gap: 10px; }
        .cb-header__av {
          position: relative;
          width: 44px; height: 44px;
          border-radius: 50%; border: 2px solid #D4AF37;
          background: #fff; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cb-header__av img { width: 38px; height: 38px; object-fit: contain; }
        .cb-header__online {
          position: absolute; bottom: 1px; right: 1px;
          width: 11px; height: 11px;
          background: #25D366; border-radius: 50%;
          border: 2px solid #121826;
        }
        .cb-header__name {
          font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 0.9rem; color: #fff;
        }
        .cb-header__status {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.68rem; color: rgba(255,255,255,0.45);
          font-family: 'Poppins', sans-serif; margin-top: 2px;
        }
        .cb-header__dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #25D366; display: inline-block;
        }
        .cb-header__actions { display: flex; gap: 6px; }
        .cb-header__btn {
          background: rgba(255,255,255,0.08); border: none;
          color: rgba(255,255,255,0.5); width: 28px; height: 28px;
          border-radius: 8px; cursor: pointer; font-size: 0.75rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .cb-header__btn:hover { background: rgba(212,175,55,0.15); color: #D4AF37; }

        /* ── MESSAGES ─────────────────────── */
        .cb-messages {
          flex: 1; overflow-y: auto;
          padding: 16px 14px;
          background: #0B0F1A;
          display: flex; flex-direction: column;
          gap: 12px;
          min-height: 280px;
          max-height: 420px;
        }
        .cb-messages::-webkit-scrollbar { width: 3px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 3px; }

        .cb-day-label {
          text-align: center; font-size: 0.68rem;
          color: rgba(255,255,255,0.25); font-family: 'Poppins', sans-serif;
          letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px;
        }

        .cb-msg { display: flex; gap: 8px; align-items: flex-start; }
        .cb-msg--user { flex-direction: row-reverse; }

        .cb-msg__av {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(212,175,55,0.15); border: 1.5px solid rgba(212,175,55,0.3);
          overflow: hidden; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .cb-msg__av img { width: 28px; height: 28px; object-fit: contain; }

        .cb-msg__wrap { display: flex; flex-direction: column; gap: 3px; max-width: 82%; }
        .cb-msg--user .cb-msg__wrap { align-items: flex-end; }

        .cb-msg__bubble {
          padding: 10px 13px;
          border-radius: 16px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.84rem;
          line-height: 1.55;
        }
        .cb-msg--bot .cb-msg__bubble {
          background: #121826;
          border: 1px solid rgba(212,175,55,0.1);
          border-bottom-left-radius: 4px;
          color: rgba(255,255,255,0.82);
        }
        .cb-msg--user .cb-msg__bubble {
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          border-bottom-right-radius: 4px;
          font-weight: 500;
        }
        .cb-msg__text strong { font-weight: 700; }

        .cb-msg__time {
          font-size: 0.62rem; color: rgba(255,255,255,0.2);
          font-family: 'Poppins', sans-serif; padding: 0 4px;
        }
        .cb-msg--user .cb-msg__time { text-align: right; }

        /* ── OPTIONS ──────────────────────── */
        .cb-opts { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
        .cb-opt-btn {
          background: rgba(212,175,55,0.08);
          border: 1.5px solid rgba(212,175,55,0.3);
          color: #D4AF37;
          padding: 8px 13px; border-radius: 20px;
          font-family: 'Poppins', sans-serif; font-size: 0.8rem; font-weight: 500;
          cursor: pointer; text-align: left;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .cb-opt-btn:hover {
          background: #D4AF37; color: #0B0F1A; border-color: #D4AF37;
        }

        /* ── SERVICES ─────────────────────── */
        .cb-services { display: flex; flex-direction: column; gap: 5px; margin-top: 10px; }
        .cb-svc-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          padding: 8px 12px; border-radius: 10px;
          font-family: 'Poppins', sans-serif; font-size: 0.8rem;
          cursor: pointer; text-align: left;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .cb-svc-btn:hover { background: rgba(212,175,55,0.12); border-color: rgba(212,175,55,0.35); color: #D4AF37; }

        /* ── TYPING ───────────────────────── */
        .cb-typing {
          display: flex !important;
          gap: 5px; padding: 12px 16px !important;
          align-items: center;
        }
        .cb-typing span {
          width: 8px; height: 8px;
          background: rgba(212,175,55,0.6);
          border-radius: 50%;
          animation: cbTyping 1.2s infinite;
        }
        .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
        .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cbTyping {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* ── INPUT ROW ────────────────────── */
        .cb-input-row {
          display: flex; gap: 8px;
          padding: 10px 12px;
          background: #121826;
          border-top: 1px solid rgba(212,175,55,0.1);
          flex-shrink: 0;
        }
        .cb-input {
          flex: 1; border: 1.5px solid rgba(212,175,55,0.2);
          border-radius: 24px; padding: 9px 16px;
          font-size: 0.84rem; font-family: 'Poppins', sans-serif;
          outline: none; color: #fff;
          background: rgba(255,255,255,0.04);
          transition: border-color 0.2s;
        }
        .cb-input::placeholder { color: rgba(255,255,255,0.25); }
        .cb-input:focus { border-color: rgba(212,175,55,0.5); }

        .cb-send {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          border: none; border-radius: 50%;
          color: #0B0F1A; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .cb-send:hover { transform: scale(1.08); box-shadow: 0 4px 16px rgba(212,175,55,0.4); }

        /* ── FOOTER ───────────────────────── */
        .cb-footer {
          padding: 8px 14px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid rgba(255,255,255,0.04);
          font-size: 0.68rem; color: rgba(255,255,255,0.2);
          font-family: 'Poppins', sans-serif;
          text-align: center; flex-shrink: 0;
        }
        .cb-footer strong { color: rgba(255,255,255,0.35); }
        .cb-footer__wa { color: #25D366; text-decoration: none; }

        /* ── RESPONSIVE ───────────────────── */
        @media (max-width: 600px) {
          .cb-window { width: calc(100vw - 20px); right: 10px; bottom: 100px; }
          .cb-bubble { bottom: 24px; right: 20px; width: 54px; height: 54px; }
          .cb-notif { right: 10px; bottom: 100px; max-width: calc(100vw - 80px); }
        }
      `}</style>
    </>
  );
}
