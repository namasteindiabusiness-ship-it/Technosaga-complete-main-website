import React from "react";

export default function Certificate() {
  return (
    <section className="cert2">
      <div className="cert2__inner">
        {/* Left image */}
        <div className="cert2__visual">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85&auto=format&fit=crop"
            alt="Technosaga Infotech Professional Team"
            className="cert2__img"
            loading="lazy"
          />
          <div className="cert2__img-overlay" />
          {/* Startup India emblem */}
          <div className="cert2__emblem">
            <div className="cert2__emblem-ring" />
            <div className="cert2__emblem-ring cert2__emblem-ring--2" />
            <div className="cert2__emblem-core">SI</div>
          </div>
          {/* Gold corner accents */}
          <div className="cert2__corner cert2__corner--tl" />
          <div className="cert2__corner cert2__corner--br" />
        </div>

        {/* Right content */}
        <div className="cert2__content">
          <div className="cert2__eyebrow">
            <span className="cert2__eyebrow-dot" />
            🏅 Certified Excellence
          </div>
          <h2 className="cert2__h2">
            Recognised by{" "}
            <span className="cert2__gold">Startup India</span>
            <br />for Digital Innovation
          </h2>
          <p className="cert2__body">
            We are a trusted name in Digital Marketing, Website Development and
            App Development — delivering cutting-edge solutions that help
            businesses thrive in the digital era.
          </p>
          <p className="cert2__body">
            Our certification underlines our commitment to innovation and
            empowering tomorrow's digital leaders with the tools they need to succeed.
          </p>
          <div className="cert2__chips">
            {[["🏆","Award Winning"],["🤝","Trusted Partner"],["✅","Quality Assured"]].map(([ic, lb]) => (
              <div key={lb} className="cert2__chip">
                <span>{ic}</span>{lb}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cert2 {
          background: #0f1521;
          padding: 6rem 0;
          overflow: hidden;
        }
        .cert2__inner {
          max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: center;
        }
        .cert2__visual { position: relative; border-radius: 16px; overflow: visible; }
        .cert2__img {
          width: 100%; height: 460px; object-fit: cover;
          border-radius: 16px; display: block;
          filter: brightness(0.85);
          transition: filter 0.4s;
        }
        .cert2__visual:hover .cert2__img { filter: brightness(1); }
        .cert2__img-overlay {
          position: absolute; inset: 0; border-radius: 16px;
          background: linear-gradient(135deg, rgba(11,15,26,0.3) 0%, transparent 60%);
          pointer-events: none;
        }
        .cert2__emblem {
          position: absolute; bottom: -20px; right: -20px;
          width: 90px; height: 90px;
          display: flex; align-items: center; justify-content: center;
        }
        .cert2__emblem-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(212,175,55,0.5);
          animation: spinSlow 8s linear infinite;
        }
        .cert2__emblem-ring--2 {
          inset: 8px; border-color: rgba(212,175,55,0.25);
          animation-direction: reverse; animation-duration: 5s;
        }
        .cert2__emblem-core {
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37, #b8962d);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Montserrat', sans-serif; font-weight: 900;
          font-size: 1rem; color: #0B0F1A;
          box-shadow: 0 6px 24px rgba(212,175,55,0.4);
        }
        .cert2__corner {
          position: absolute; width: 50px; height: 50px; pointer-events: none;
        }
        .cert2__corner--tl {
          top: -8px; left: -8px;
          border-top: 3px solid #D4AF37; border-left: 3px solid #D4AF37;
          border-radius: 4px 0 0 0;
        }
        .cert2__corner--br {
          bottom: -8px; right: -8px;
          border-bottom: 3px solid #D4AF37; border-right: 3px solid #D4AF37;
          border-radius: 0 0 4px 0;
        }
        .cert2__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #D4AF37;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px; padding: 5px 14px; margin-bottom: 1.2rem;
        }
        .cert2__eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D4AF37; animation: pulse 2s infinite; flex-shrink: 0;
        }
        .cert2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          font-weight: 800; color: #fff;
          line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 1.2rem;
        }
        .cert2__gold { color: #D4AF37; }
        .cert2__body {
          font-family: 'Poppins', sans-serif;
          font-size: 0.88rem; color: rgba(255,255,255,0.55);
          line-height: 1.75; margin-bottom: 0.8rem;
        }
        .cert2__chips {
          display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1.4rem;
        }
        .cert2__chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 16px; border-radius: 24px;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          font-family: 'Poppins', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: rgba(255,255,255,0.7);
        }
        @media (max-width: 900px) {
          .cert2__inner { grid-template-columns: 1fr; gap: 3rem; }
          .cert2__img { height: 320px; }
        }
        @keyframes spinSlow { to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}
