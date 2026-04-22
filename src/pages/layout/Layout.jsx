import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterNew from "../../components/FooterNew";
import NavbarNew from "../../components/NavbarNew";
import FloatingSocials from "../../components/FloatingSocials";
import ChatBotNew from "../../components/ChatBotNew";
import { QuotePopup } from "../website/ThankYouAndPopup";
import "../../style/index.css";

export default function Layout() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <NavbarNew onQuote={() => setModal(true)} />
      <Outlet />
      <FooterNew />
      <FloatingSocials />
      <ChatBotNew />
      <QuotePopup open={modal} onClose={() => setModal(false)} />

      {/* Mobile sticky Get Quote button */}
      <div className="mob-sticky-cta">
        <button className="mob-sticky-cta__btn" onClick={() => setModal(true)}>
          📋 Get a Free Quote
        </button>
      </div>

      <style>{`
        .mob-sticky-cta {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 850;
          padding: 10px 16px;
          background: rgba(11,15,26,0.95);
          border-top: 1px solid rgba(212,175,55,0.2);
          backdrop-filter: blur(10px);
        }
        .mob-sticky-cta__btn {
          width: 100%;
          background: linear-gradient(135deg, #D4AF37 0%, #b8962d 100%);
          color: #0B0F1A;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 13px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(212,175,55,0.35);
        }
        @media (max-width: 768px) {
          .mob-sticky-cta { display: block; }
        }
      `}</style>
    </>
  );
}
