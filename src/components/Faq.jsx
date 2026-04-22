import React, { useState } from "react";

const FAQS = [
  {
    q: "What services does your digital agency provide?",
    a: "We offer full-stack website development, digital marketing, SEO, branding and creative design — tailored for growth-driven businesses across India and globally.",
  },
  {
    q: "How long does a website project usually take?",
    a: "Timelines depend on scope — straightforward sites take around two weeks, while complex platforms with custom backends typically require four to six weeks.",
  },
  {
    q: "Do you offer SEO and digital marketing packages?",
    a: "Yes. We craft personalised campaigns spanning SEO, paid media and social that boost visibility and generate qualified leads.",
  },
  {
    q: "Can you redesign our existing website?",
    a: "Absolutely. We specialise in transforming outdated digital presences into high-performance, on-brand experiences that convert visitors into customers.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq">
      <div className="faq__layout">
        <div className="faq__left">
          <div className="eyebrow eyebrow--left">FAQ</div>
          <h2 className="display-title">
            Frequently
            <br />
            Asked
            <br />
            <em>Questions</em>
          </h2>
          <p className="faq__hint">
            Can't find what you're looking for? Reach out and we'll be happy to
            help.
          </p>
          <div className="faq__img-wrap">
            <img
              src="./static/faq-banner.png"
              alt="Support team"
              className="faq__img"
            />
            {/* <div className="faq__img-chip">4 answers</div> */}
          </div>
        </div>
        <div className="faq__accordion">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`faq-item${open === i ? " faq-item--open" : ""}`}
            >
              <button
                className="faq-item__q"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="faq-item__num">0{i + 1}</span>
                <span className="faq-item__text">{f.q}</span>
                <span className="faq-item__toggle">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <div
                className={`faq-item__a${open === i ? " faq-item__a--open" : ""}`}
              >
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
