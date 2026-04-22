import React, { useState } from "react";
import { SERVICE_OPTS } from "../libs/static";
import API from "../libs/apiCall";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <section className="contact">
      <div className="contact__visual">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85&auto=format&fit=crop"
          alt="Modern office"
          className="contact__photo"
        />
        <div className="contact__photo-overlay" />
        <div className="contact__info-layer">
          <div
            className="eyebrow eyebrow--left"
            style={{ color: "var(--gold)" }}
          >
            Get In Touch
          </div>
          <h2 className="display-title display-title--white">
            Let's Work
            <br />
            <em>Together</em>
          </h2>
          <p className="contact__tagline">
            Tell us about your project — we'll respond within one business day.
          </p>
        </div>
      </div>
      <div className="contact__form-pane">
        <div className="contact__form-head">Send a Message</div>
        <p className="contact__form-sub">
          One of our consultants will be in touch shortly.
        </p>
        {isAlert && <p className={msgType}>{alertText}</p>}
        <form onSubmit={handleEnquiry}>
          <div className="f-group">
            <label className="f-label">Name</label>
            <input
              type="text"
              required
              className="f-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="f-group">
            <label className="f-label">Email Address</label>
            <input
              type="email"
              required
              className="f-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="f-group">
            <label className="f-label">Mobile Number</label>
            <input
              type="tel"
              required
              className="f-input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="f-group">
            <label className="f-label">Service</label>
            <select
              required
              className="f-input"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="f-group">
            <label className="f-label">Message</label>
            <textarea
              rows={4}
              className="f-input"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary btn-primary--full">
            {isLoading ? (
              <BiLoader size={24} className="animate-spin" />
            ) : (
              "Send Message →"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
