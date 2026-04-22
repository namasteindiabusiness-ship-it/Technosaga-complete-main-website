import React from "react";

const C1 = ["Admission Partner","British Lingua","Heaven Tour","Edu Skill","Consumer Fair","Physics Rakesh","IOC Commerce","Kanhaiya","Kleve World","Manikant","Ride Car","Wedding Book","Tirupati","Vedanta","Zee Professional"];
const C2 = ["Zee Startup","Admission Guidance","Avagadro","Green Zone","Indra","Naft India","Sarika","Star Plus","TB Logo","Tarazu","Vastav","Vihu Infra","Bihar Healthy","Srirams"];

export default function Clients() {
  return (
    <section className="cl2">
      <div className="cl2__head">
        <div className="cl2__eyebrow"><span className="cl2__eyebrow-dot" />Trusted By</div>
        <h2 className="cl2__h2">Brands That <span className="cl2__gold">Trust Us</span></h2>
        <p className="cl2__sub">500+ happy clients across India and beyond.</p>
      </div>

      {[[...C1,...C1],[...C2,...C2]].map((row, ri) => (
        <div key={ri} className="cl2__row">
          <div className={`cl2__track cl2__track--${ri === 0 ? "fwd" : "rev"}`}>
            {row.map((c, i) => (
              <div key={c+i} className="cl2__tag">
                <span className="cl2__tag-dot">◆</span>
                {c}
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .cl2 {
          background: #0B0F1A;
          padding: 5rem 0 4rem;
          overflow: hidden;
        }
        .cl2__head {
          text-align: center;
          margin-bottom: 3rem;
          padding: 0 1.5rem;
        }
        .cl2__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #D4AF37;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 40px; padding: 5px 16px; margin-bottom: 1rem;
        }
        .cl2__eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D4AF37; animation: pulse 2s infinite;
        }
        .cl2__h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800; color: #fff;
          letter-spacing: -0.02em; margin-bottom: 0.6rem;
        }
        .cl2__gold { color: #D4AF37; }
        .cl2__sub {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem; color: rgba(255,255,255,0.4);
        }

        .cl2__row {
          overflow: hidden;
          position: relative;
          margin-bottom: 1rem;
        }
        .cl2__row::before, .cl2__row::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 120px;
          z-index: 2; pointer-events: none;
        }
        .cl2__row::before { left: 0; background: linear-gradient(to right, #0B0F1A, transparent); }
        .cl2__row::after  { right: 0; background: linear-gradient(to left,  #0B0F1A, transparent); }

        .cl2__track {
          display: flex; gap: 12px;
          width: max-content;
        }
        .cl2__track--fwd { animation: cl2Fwd 30s linear infinite; }
        .cl2__track--rev { animation: cl2Rev 35s linear infinite; }
        @keyframes cl2Fwd { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes cl2Rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }

        .cl2__track:hover { animation-play-state: paused; }

        .cl2__tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px;
          background: #121826;
          border: 1px solid rgba(212,175,55,0.12);
          border-radius: 40px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          color: rgba(255,255,255,0.6);
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: default;
        }
        .cl2__tag:hover {
          border-color: rgba(212,175,55,0.4);
          color: #D4AF37;
          background: rgba(212,175,55,0.06);
        }
        .cl2__tag-dot {
          font-size: 0.4rem; color: #D4AF37; flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
