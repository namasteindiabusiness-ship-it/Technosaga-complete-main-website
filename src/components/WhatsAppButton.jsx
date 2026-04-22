import React, { useState } from "react";

const PHONE = "919155031859";
const DEFAULT_MSG = encodeURIComponent(
  "Hello Technosaga Infotech! I am interested in your services. Please get in touch with me."
);

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const waUrl = `https://wa.me/${PHONE}?text=${DEFAULT_MSG}`;

  return (
    <>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`wa-btn${hovered ? " wa-btn--hovered" : ""}`}
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="wa-btn__icon" aria-hidden="true">
          <path fill="#fff" d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.774L0 32l8.463-2.006A15.935 15.935 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.853l-.486-.289-5.023 1.19 1.214-4.888-.317-.502A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.161-2.719-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.266-.464.299-.862.1-.398-.199-1.681-.619-3.202-1.976-1.183-1.056-1.981-2.361-2.213-2.759-.232-.398-.025-.613.175-.812.18-.178.398-.464.597-.696.199-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.323-.778-.651-.673-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.325s1.428 3.856 1.627 4.122c.199.266 2.811 4.291 6.812 6.019.952.411 1.696.657 2.276.841.956.304 1.826.261 2.514.158.767-.114 2.354-.962 2.686-1.891.333-.929.333-1.726.232-1.891-.1-.166-.365-.266-.764-.464z"/>
        </svg>
        {hovered && <span className="wa-btn__label">Chat with us!</span>}
      </a>
      <style>{`
        .wa-btn {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          display: flex; align-items: center; gap: 8px;
          background: #25D366; color: #fff; border-radius: 50px;
          width: 56px; height: 56px; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          text-decoration: none;
          transition: width 0.25s ease, box-shadow 0.2s; overflow: hidden;
        }
        .wa-btn--hovered {
          width: 160px; border-radius: 28px;
          box-shadow: 0 6px 28px rgba(37,211,102,0.55);
        }
        .wa-btn__icon { width: 28px; height: 28px; flex-shrink: 0; }
        .wa-btn__label {
          font-size: 0.88rem; font-weight: 600; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        @media (max-width: 600px) {
          .wa-btn { bottom: 20px; right: 16px; width: 50px; height: 50px; }
          .wa-btn--hovered { width: 50px; border-radius: 50%; }
          .wa-btn__label { display: none; }
        }
      `}</style>
    </>
  );
}
