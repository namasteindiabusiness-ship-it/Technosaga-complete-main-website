import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const CSS = `
  .topbar {
    background: #1a1208;
    border-bottom: 1px solid rgba(207,150,69,0.2);
    overflow: hidden;
    height: 36px;
    display: flex;
    align-items: center;
  }

  .topbar__static {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0;
  }
  .topbar__item {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    color: rgba(255,255,255,0.72);
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    white-space: nowrap;
    padding: 0 1.6rem;
    letter-spacing: 0.01em;
  }
  .topbar__item strong {
    color: #CF9645;
    font-weight: 600;
  }
  .topbar__item svg {
    color: #CF9645;
    font-size: 0.72rem;
    flex-shrink: 0;
  }
  .topbar__divider {
    width: 1px;
    height: 14px;
    background: rgba(207,150,69,0.25);
    flex-shrink: 0;
  }

  .topbar__marquee-wrap {
    display: none;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .topbar__marquee-wrap::before,
  .topbar__marquee-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    z-index: 2;
    pointer-events: none;
  }
  .topbar__marquee-wrap::before {
    left: 0;
    background: linear-gradient(to right, #1a1208 0%, transparent 100%);
  }
  .topbar__marquee-wrap::after {
    right: 0;
    background: linear-gradient(to left, #1a1208 0%, transparent 100%);
  }
  .topbar__marquee-track {
    display: flex;
    width: max-content;
    animation: topbar-scroll 22s linear infinite;
  }
  .topbar__marquee-track:hover {
    animation-play-state: paused;
  }
  .topbar__marquee-set {
    display: flex;
    align-items: center;
  }
  .topbar__dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #CF9645;
    opacity: 0.5;
    flex-shrink: 0;
    margin: 0 1rem;
  }

  @keyframes topbar-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @media (max-width: 768px) {
    .topbar__static       { display: none; }
    .topbar__marquee-wrap { display: block; }
  }
`;

const ITEMS = [
  {
    icon: <FaPhoneAlt />,
    content: (
      <>
        <strong>+91 9155031859</strong>
      </>
    ),
  },
  {
    icon: <FaEnvelope />,
    content: (
      <>
        <strong>technosagainfotech@mail.com</strong>
      </>
    ),
  },
  { icon: <IoMdTime />, content: <>Daily: 9:00am – 06:00pm, Sunday Closed</> },
];

function MarqueeSet() {
  return (
    <div className="topbar__marquee-set">
      {ITEMS.map((item, i) => (
        <React.Fragment key={i}>
          <span className="topbar__item">
            {item.icon}
            {item.content}
          </span>
          <span className="topbar__dot" />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Topbar() {
  return (
    <>
      <style>{CSS}</style>
      <div className="topbar">
        {/* Desktop: static row */}
        <div className="topbar__static">
          {ITEMS.map((item, i) => (
            <React.Fragment key={i}>
              <span className="topbar__item">
                {item.icon}
                {item.content}
              </span>
              {i < ITEMS.length - 1 && <span className="topbar__divider" />}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: marquee ticker */}
        <div className="topbar__marquee-wrap">
          <div className="topbar__marquee-track">
            <MarqueeSet />
            <MarqueeSet />
          </div>
        </div>
      </div>
    </>
  );
}
