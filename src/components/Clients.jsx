import React from "react";

const C1 = [
  "Admission Partner",
  "British Lingua",
  "Heaven Tour",
  "Edu Skill",
  "Consumer Fair",
  "Physics Rakesh",
  "IOC Commerce",
  "Kanhaiya",
  "Kleve World",
  "Manikant",
  "Ride Car",
  "Wedding Book",
  "Tirupati",
  "Vedanta",
  "Zee Professional",
];
const C2 = [
  "Zee Startup",
  "Admission Guidance",
  "Avagadro",
  "Green Zone",
  "Indra",
  "Naft India",
  "Sarika",
  "Star Plus",
  "TB Logo",
  "Tarazu",
  "Vastav",
  "Vihu Infra",
  "Bihar Healthy",
  "Srirams",
];

export default function Clients() {
  return (
    <section className="clients">
      <div className="clients__head">
        <div className="eyebrow">Trusted By</div>
        <h2 className="display-title display-title--center">
          Brands That <em>Trust Us</em>
        </h2>
        <p className="clients__sub">
          500+ happy clients across India and beyond.
        </p>
      </div>
      {[
        [...C1, ...C1],
        [...C2, ...C2],
      ].map((row, ri) => (
        <div key={ri} className="clients__row">
          <div
            className={`clients__track clients__track--${ri === 0 ? "a" : "b"}`}
          >
            {row.map((c, i) => (
              <div key={c + i} className="client-tag">
                {c}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
