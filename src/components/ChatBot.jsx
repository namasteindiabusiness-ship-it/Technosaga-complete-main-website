import React, { useState, useEffect, useRef } from "react";
import API from "../libs/apiCall";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919155031859";

const SERVICES = [
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

const BOT_STEPS = [
  {
    id: "welcome",
    bot: "Namaste! 👋 Welcome to Technosaga Infotech!\n\nMain aapki kaise madad kar sakta hoon? How can I help you today?",
    options: [
      { label: "📋 Get a Free Quote", next: "ask_name" },
      { label: "💼 Our Services", next: "show_services" },
      { label: "📞 Contact Us", next: "show_contact" },
    ],
  },
  {
    id: "show_services",
    bot: "Hum yeh services provide karte hain:\n\n🌐 Web Design & Development\n📣 Digital Marketing\n🎧 BPO & Call Center\n📱 App Development\n🎨 Graphic Design\n🎬 Photo & Video Production\n💼 Job Consultancy\n🎪 Event Management\n📡 Live Streaming\n🏛️ Political Rallies & Events\n\nKisi service ke baare mein jaanna hai?",
    options: [
      { label: "📋 Get a Free Quote", next: "ask_name" },
      { label: "📞 Contact Us", next: "show_contact" },
    ],
  },
  {
    id: "show_contact",
    bot: "📍 M2/12, Near Yamuna Apartment, Boring Road, Patna - 800001\n\n📞 +91 9155031859\n✉️ technosagainfotech@mail.com\n🌐 www.technosagainfotech.in\n\n⏰ Mon-Sat: 9:00 AM - 6:00 PM",
    options: [
      { label: "💬 WhatsApp Us", next: "whatsapp" },
      { label: "📋 Get a Free Quote", next: "ask_name" },
    ],
  },
  {
    id: "ask_name",
    bot: "Bilkul! Main aapke liye ek free quote arrange karta hoon. 😊\n\nPehle aapka naam batayein?\nPlease tell me your name:",
    input: "name",
  },
  {
    id: "ask_phone",
    bot: "Shukriya {name}! 😊\n\nAapka phone number kya hai?\nYour phone number please:",
    input: "phone",
  },
  {
    id: "ask_email",
    bot: "Perfect! Aapka email address?\nYour email address:",
    input: "email",
  },
  {
    id: "ask_service",
    bot: "Aap kaunsi service mein interested hain?\nWhich service are you interested in?",
    service_select: true,
  },
  {
    id: "submit",
    bot: "Shukriya {name}! 🎉\n\nAapki details submit ho gayi hain. Hamari team jald hi aapse contact karegi!\n\nThank you! Our team will contact you soon on {phone}.",
    options: [
      { label: "💬 WhatsApp Pe Baat Karein", next: "whatsapp" },
      { label: "🏠 Back to Start", next: "welcome" },
    ],
  },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({ name: "", phone: "", email: "", service: "" });
  const [inputMode, setInputMode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      showStep("welcome");
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputMode && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [inputMode]);

  const replaceVars = (text) => {
    return text
      .replace("{name}", userData.name || "")
      .replace("{phone}", userData.phone || "");
  };

  const addMessage = (text, type, options = null, serviceSelect = false) => {
    setMessages((prev) => [
      ...prev,
      { text: replaceVars(text), type, options, serviceSelect, id: Date.now() },
    ]);
  };

  const showStep = (stepId) => {
    const step = BOT_STEPS.find((s) => s.id === stepId);
    if (!step) return;
    setCurrentStep(stepId);
    setInputMode(null);

    setTimeout(() => {
      addMessage(step.bot, "bot", step.options, step.service_select);
      if (step.input) setInputMode(step.input);
    }, 400);
  };

  const handleOption = (option) => {
    addMessage(option.label, "user");
    if (option.next === "whatsapp") {
      const msg = encodeURIComponent(`Hello Technosaga Infotech! I am interested in your services.`);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      return;
    }
    setTimeout(() => showStep(option.next), 500);
  };

  const handleInput = async () => {
    if (!inputValue.trim()) return;
    const value = inputValue.trim();
    addMessage(value, "user");
    setInputValue("");

    if (inputMode === "name") {
      setUserData((prev) => ({ ...prev, name: value }));
      setTimeout(() => showStep("ask_phone"), 500);
    } else if (inputMode === "phone") {
      if (!/^\d{10}$/.test(value)) {
        setTimeout(() => addMessage("Phone number 10 digits ka hona chahiye. Please dobara enter karein.\nPhone number must be 10 digits.", "bot"), 400);
        return;
      }
      setUserData((prev) => ({ ...prev, phone: value }));
      setTimeout(() => showStep("ask_email"), 500);
    } else if (inputMode === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setTimeout(() => addMessage("Valid email address enter karein.\nPlease enter a valid email.", "bot"), 400);
        return;
      }
      setUserData((prev) => ({ ...prev, email: value }));
      setTimeout(() => showStep("ask_service"), 500);
    }
  };

  const handleServiceSelect = async (service) => {
    const newUserData = { ...userData, service };
    setUserData(newUserData);
    addMessage(service, "user");
    setLoading(true);

    try {
      // Save to backend API
      await API.post("/enquiry/create", {
        type: "Chatbot Enquiry",
        name: newUserData.name,
        mobile: newUserData.phone,
        email: newUserData.email,
        service: service,
        message: `Chatbot se enquiry — Service: ${service}`,
      });

      // Send WhatsApp notification
      const waMsg = encodeURIComponent(
        `🔔 *New Chatbot Lead!*\n\n👤 Name: ${newUserData.name}\n📞 Phone: ${newUserData.phone}\n✉️ Email: ${newUserData.email}\n💼 Service: ${service}\n\n_Technosaga Infotech Website Chatbot_`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank");

      setSubmitted(true);
      toast.success("Enquiry submitted successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => showStep("submit"), 500);
    }
  };

  return (
    <>
      {/* CHAT BUBBLE BUTTON */}
      <button
        className={`chatbot-bubble${open ? " chatbot-bubble--active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Chat with us"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chatbot-bubble__icon">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="chatbot-bubble__icon">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1 13H7v-2h4v2zm4-4H7V9h8v2z"/>
          </svg>
        )}
        {!open && <span className="chatbot-bubble__dot" />}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__avatar">
              <img src="/static/logo.png" alt="Technosaga" />
            </div>
            <div className="chatbot-header__info">
              <div className="chatbot-header__name">Technosaga Infotech</div>
              <div className="chatbot-header__status">
                <span className="chatbot-header__dot" /> Online
              </div>
            </div>
            <button className="chatbot-header__close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-msg chatbot-msg--${msg.type}`}>
                {msg.type === "bot" && (
                  <div className="chatbot-msg__avatar">🤖</div>
                )}
                <div className="chatbot-msg__bubble">
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split("\n").length - 1 && <br />}</span>
                  ))}

                  {/* Options buttons */}
                  {msg.options && (
                    <div className="chatbot-options">
                      {msg.options.map((opt) => (
                        <button key={opt.label} className="chatbot-option-btn" onClick={() => handleOption(opt)}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Service select */}
                  {msg.serviceSelect && (
                    <div className="chatbot-services">
                      {SERVICES.map((s) => (
                        <button key={s} className="chatbot-service-btn" onClick={() => handleServiceSelect(s)} disabled={loading}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg__avatar">🤖</div>
                <div className="chatbot-msg__bubble chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {inputMode && (
            <div className="chatbot-input-row">
              <input
                ref={inputRef}
                type={inputMode === "phone" ? "tel" : inputMode === "email" ? "email" : "text"}
                className="chatbot-input"
                placeholder={
                  inputMode === "name" ? "Aapka naam / Your name..." :
                  inputMode === "phone" ? "10 digit phone number..." :
                  "Email address..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInput()}
              />
              <button className="chatbot-send-btn" onClick={handleInput}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        /* BUBBLE */
        .chatbot-bubble {
          position: fixed;
          bottom: 100px;
          right: 28px;
          z-index: 9998;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A1628 0%, #1a2f50 100%);
          border: 2px solid #CF9645;
          color: #CF9645;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(10,22,40,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .chatbot-bubble:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(10,22,40,0.5); }
        .chatbot-bubble--active { background: #CF9645; color: #0A1628; }
        .chatbot-bubble__icon { width: 26px; height: 26px; }
        .chatbot-bubble__dot {
          position: absolute;
          top: 4px; right: 4px;
          width: 12px; height: 12px;
          background: #25D366;
          border-radius: 50%;
          border: 2px solid white;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        /* WINDOW */
        .chatbot-window {
          position: fixed;
          bottom: 172px;
          right: 28px;
          z-index: 9997;
          width: 380px;
          max-height: 560px;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* HEADER */
        .chatbot-header {
          background: linear-gradient(135deg, #0A1628 0%, #1a2f50 100%);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chatbot-header__avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: white;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          border: 2px solid #CF9645;
          flex-shrink: 0;
        }
        .chatbot-header__avatar img { width: 36px; height: 36px; object-fit: contain; }
        .chatbot-header__info { flex: 1; }
        .chatbot-header__name { color: white; font-weight: 700; font-size: 0.95rem; font-family: 'DM Sans', sans-serif; }
        .chatbot-header__status { display: flex; align-items: center; gap: 5px; margin-top: 2px; }
        .chatbot-header__dot { width: 8px; height: 8px; background: #25D366; border-radius: 50%; display: inline-block; }
        .chatbot-header__status { color: rgba(255,255,255,0.7); font-size: 0.75rem; }
        .chatbot-header__close {
          background: rgba(255,255,255,0.15); border: none; color: white;
          width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
          font-size: 0.8rem; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .chatbot-header__close:hover { background: rgba(255,255,255,0.3); }

        /* MESSAGES */
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f8f6f2;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 300px;
          max-height: 400px;
        }
        .chatbot-messages::-webkit-scrollbar { width: 4px; }
        .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
        .chatbot-messages::-webkit-scrollbar-thumb { background: #CF9645; border-radius: 4px; }

        .chatbot-msg { display: flex; gap: 8px; align-items: flex-start; }
        .chatbot-msg--user { flex-direction: row-reverse; }
        .chatbot-msg__avatar { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }

        .chatbot-msg__bubble {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 0.875rem;
          line-height: 1.5;
          font-family: 'DM Sans', sans-serif;
        }
        .chatbot-msg--bot .chatbot-msg__bubble {
          background: white;
          color: #1a1208;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .chatbot-msg--user .chatbot-msg__bubble {
          background: linear-gradient(135deg, #0A1628, #1a2f50);
          color: white;
          border-bottom-right-radius: 4px;
        }

        /* OPTIONS */
        .chatbot-options {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 10px;
        }
        .chatbot-option-btn {
          background: #fdf6e9;
          border: 1.5px solid #CF9645;
          color: #0A1628;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .chatbot-option-btn:hover { background: #CF9645; color: white; }

        /* SERVICES */
        .chatbot-services {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
        }
        .chatbot-service-btn {
          background: white;
          border: 1.5px solid rgba(207,150,69,0.4);
          color: #0A1628;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .chatbot-service-btn:hover { background: #CF9645; color: white; border-color: #CF9645; }
        .chatbot-service-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* TYPING */
        .chatbot-typing {
          display: flex !important;
          gap: 5px;
          padding: 12px 16px !important;
          align-items: center;
        }
        .chatbot-typing span {
          width: 8px; height: 8px;
          background: #CF9645;
          border-radius: 50%;
          animation: typing 1.2s infinite;
        }
        .chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* INPUT */
        .chatbot-input-row {
          display: flex;
          gap: 8px;
          padding: 12px 14px;
          background: white;
          border-top: 1px solid rgba(207,150,69,0.2);
        }
        .chatbot-input {
          flex: 1;
          border: 1.5px solid rgba(207,150,69,0.4);
          border-radius: 24px;
          padding: 9px 16px;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          color: #1a1208;
          background: #fdf6e9;
          transition: border-color 0.2s;
        }
        .chatbot-input:focus { border-color: #CF9645; }
        .chatbot-send-btn {
          width: 38px; height: 38px;
          background: #CF9645;
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .chatbot-send-btn:hover { background: #0A1628; }

        /* MOBILE */
        @media (max-width: 600px) {
          .chatbot-window {
            width: calc(100vw - 24px);
            right: 12px;
            bottom: 160px;
            max-height: 70vh;
          }
          .chatbot-bubble { bottom: 90px; right: 16px; }
        }
      `}</style>
    </>
  );
}
