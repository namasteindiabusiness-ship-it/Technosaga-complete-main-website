import React from "react";

export default function Certificate({ onQuote }) {
  return (
    <section className="cert">
      <div className="cert__visual">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85&auto=format&fit=crop"
          alt="Professional team"
          className="cert__photo"
        />
        <div className="cert__photo-grad" />
        <div className="cert__emblem">
          <div className="cert__emblem-ring" />
          <div className="cert__emblem-ring cert__emblem-ring--2" />
          <div className="cert__emblem-core">SI</div>
        </div>
      </div>
      <div className="cert__content">
        <span className="cert__tag">🏅 Certified Excellence</span>
        <h2 className="display-title">
          Recognised by <em>Startup India</em>
          for Digital Innovation
        </h2>
        <br />
        <p className="cert__body">
          We are a trusted name in Digital Marketing, Website Development and
          App Development — delivering cutting-edge solutions that help
          businesses thrive in the digital era.
        </p>
        <p className="cert__body">
          Our certification underlines our commitment to innovation and
          empowering tomorrow's digital leaders with the tools they need to
          succeed.
        </p>
        <div className="cert__chips">
          {[
            ["🏆", "Award Winning"],
            ["🤝", "Trusted Partner"],
            ["✅", "Quality Assured"],
          ].map(([ic, lb]) => (
            <div key={lb} className="cert__chip">
              <span>{ic}</span>
              {lb}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
