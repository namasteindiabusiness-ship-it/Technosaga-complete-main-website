import React from "react";

export default function About({ onQuote }) {
  return (
    <section className="about">
      <div className="about__visual">
        <img
          src="./static/about-us.webp"
          alt="Technosaga team"
          className="about__photo"
        />
        {/* <div className="about__photo-grad" /> */}
        <div className="about__stat-float">
          <div className="about__stat-float-n">
            200<span>+</span>
          </div>
          <div className="about__stat-float-l">Happy Clients</div>
        </div>
        <div className="about__cert-badge">
          <span className="about__cert-icon">🏅</span>
          <span>
            Startup India
            <br />
            Certified
          </span>
        </div>
      </div>

      {/* Right: content */}
      <div className="about__content">
        <div className="eyebrow eyebrow--left">About Technosaga</div>
        <h2 className="display-title">
          India's Premier
          <br />
          <em>Digital Growth</em>
          <br />
          Agency
        </h2>
        <p className="about__lead">
          A dynamic team passionate about shaping the digital future through
          innovation, technology and creative strategy spanning development,
          branding and marketing.
        </p>
        <p className="about__body-text">
          We combine design thinking with technical precision, delivering
          experiences that resonate with your audience and drive real commercial
          outcomes. Since 2021, we've been building digital presences that truly
          matter for 500+ businesses.
        </p>

        <div className="about__pills">
          {[
            ["💻", "Smart Development"],
            ["🤖", "AI Integration"],
            ["🌐", "Global Vision"],
            ["👥", "Client-Centric"],
          ].map(([ic, lb]) => (
            <div key={lb} className="about__pill">
              <span>{ic}</span>
              {lb}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
