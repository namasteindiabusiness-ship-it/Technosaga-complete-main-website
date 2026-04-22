import React, { useState } from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    num: "01",
    title: "Web Design & Development",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&auto=format&fit=crop",
    desc: "Bespoke, responsive websites engineered for performance, SEO and long-term business growth.",
    link: "/services/web-design-development",
  },
  {
    num: "02",
    title: "App Development",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop",
    desc: "Native and cross-platform applications that deliver seamless user experiences.",
    link: "/services/app-development",
  },
  {
    num: "03",
    title: "Digital Marketing",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop",
    desc: "Full-funnel strategies combining social, content and paid media to amplify reach.",
    link: "/services/digital-marketing",
  },
  {
    num: "04",
    title: "Graphic Design",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop",
    desc: "Brand identities and visual systems that communicate your story with clarity.",
    link: "/services/graphic-design",
  },
  {
    num: "05",
    title: "BPO & Call Center",
    img: "./static/bpo-&-call-center.jpg",
    desc: "Professional BPO & Call Center services to streamline your business operations and enhance customer satisfaction.",
    link: "/services/bpo-services",
  },
  {
    num: "06",
    title: "Photo & Video Production",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80&auto=format&fit=crop",
    desc: "High-quality production for brand films, social content and advertising.",
    link: "/services/photo-video-production",
  },
  {
    num: "07",
    title: "Event Management",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "We offer end-to-end Event Management, handling planning, vendors, and execution to deliver seamless, memorable events.",
    link: "/services/event-management",
  },
  {
    num: "08",
    title: "Live Streaming",
    img: "https://images.unsplash.com/photo-1675977586492-fec42f8d00af?q=80&w=1029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "We offer professional Live Streaming services, ensuring seamless, high-quality broadcasts for your events.",
    link: "/services/live-streaming",
  },
  {
    num: "09",
    title: "Political Rallies & Events",
    img: "https://images.unsplash.com/photo-1655553447720-e59c93076d9a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "We provide end-to-end management for Political Rallies & Events, ensuring smooth coordination, crowd handling, and impactful execution.",
    link: "/services/political-rallies-events",
  },
];

export default function Services({ onQuote }) {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="services" id="services">
      <div className="services__head">
        <div className="services__head-left">
          <div className="eyebrow eyebrow--left">What We Do</div>
          <h2 className="display-title">
            Premium <em>Solutions</em>
            <br />
            We Deliver
          </h2>
        </div>
        <div className="services__head-right">
          <p className="services__lead">
            Exceptional digital services tailored to elevate your business and
            drive sustainable, measurable growth across every channel.
          </p>
        </div>
      </div>

      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`svc-card${hovered === i ? " svc-card--hovered" : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="svc-card__img-wrap">
              <img src={s.img} alt={s.title} className="svc-card__img" />
              <div className="svc-card__img-overlay" />
            </div>
            <div className="svc-card__body">
              <div className="svc-card__title">{s.title}</div>
              <p className="svc-card__desc">{s.desc}</p>
              <div className="svc-card__icon-row">
                <span className="svc-card__emoji"></span>
                <Link to={s.link} className="svc-card__arrow">
                  ↗
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
