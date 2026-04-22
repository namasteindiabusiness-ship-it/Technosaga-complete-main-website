import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  {
    id: 1,
    name: "Facebook",
    link: "https://www.facebook.com/technosagainfotech/",
    icon: <FaFacebook />,
  },
  {
    id: 2,
    name: "Instagram",
    link: "https://www.instagram.com/technosagainfotech",
    icon: <FaInstagram />,
  },
  {
    id: 3,
    name: "LinkedIn",
    link: "#",
    icon: <FaLinkedin />,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-logo">
              <img
                src="/static/logo.png"
                alt="Technosaga Inftech"
                className="main-logo"
              />
            </div>
            <p className="footer__desc">
              Technosaga Infotech specialises in comprehensive digital
              marketing, web development and IT services tailored to enhance
              your online presence and drive real business growth.
            </p>
            <div className="footer__socials">
              {socialLinks.map((s, i) => (
                <Link
                  key={i}
                  to={s.link}
                  className="footer__soc"
                  target="_blank"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__col-head">Company</div>
            <Link to="/about" className="footer__lnk">
              About Us
            </Link>
            <Link to="/teams" className="footer__lnk">
              Our Team
            </Link>
            <Link to="/gallery" className="footer__lnk">
              Gallery
            </Link>
            <Link to="/career" className="footer__lnk">
              Careers
            </Link>
            <Link to="/blogs" className="footer__lnk">
              Blog
            </Link>
          </div>
          <div>
            <div className="footer__col-head">Services</div>
            <Link to="/services/web-design-development" className="footer__lnk">
              Web Design & Development
            </Link>
            <Link to="/services/digital-marketing" className="footer__lnk">
              Digital Marketing
            </Link>
            <Link to="/services/bpo-services" className="footer__lnk">
              BPO & Call Center Services
            </Link>
            <Link to="/services/app-development" className="footer__lnk">
              App Development
            </Link>
            <Link to="/services/graphic-design" className="footer__lnk">
              Graphic Design
            </Link>
          </div>
          <div>
            <div className="footer__col-head">Contact</div>
            {[
              {
                ic: <FaLocationDot />,
                t: "M2/12, near yamuna apartment, boring road patna- 800001",
              },
              { ic: <FaPhoneAlt />, t: "+91 9155031859" },
              { ic: <FaEnvelope />, t: "technosagainfotech@mail.com" },
              { ic: <TfiWorld />, t: "www.technosagainfotech.in" },
            ].map((c, i) => (
              <div key={i} className="footer__info">
                <span className="footer__info-ic">{c.ic}</span>
                <span>{c.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            © 2026 All rights reserved — <strong>Technosaga Infotech</strong>
          </span>
          <span>
            Web Design & Managed by <Link>Technosaga</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
