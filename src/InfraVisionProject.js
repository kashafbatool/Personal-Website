import React from "react";

const IconExternalLink = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

const IconGithub = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.29-1.71-1.29-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.39.97.11-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.2 11.2 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.12 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.68.42.36.8 1.08.8 2.18 0 1.58-.02 2.86-.02 3.26 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const IconLayers = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 2 7 4-7 4-7-4Z" />
    <path d="m19 12-7 4-7-4" />
    <path d="m19 18-7 4-7-4" />
  </svg>
);

export default function InfraVisionProject() {
  const slides = [
    {
      title: "3D Infrastructure Preview",
      caption: "CAD-like bridge model snapshot",
      src: "/images/infravision-preview-hero.svg",
    },
    {
      title: "Technology Stack",
      caption: "Modern stack bars",
      src: "/images/infravision-preview-tech.svg",
    },
    {
      title: "How It Works",
      caption: "Upload • Process • Analyze",
      src: "/images/infravision-preview-workflow.svg",
    },
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <div className="infra-page">
      <div className="infra-container">
        <div className="infra-grid">
          {/* LEFT – text */}
          <div className="infra-left">
            {/* Small label + icon */}
            <div className="infra-label-row">
              <div className="infra-label-icon">
                <IconLayers className="infra-label-icon-svg" />
              </div>
              <div className="infra-label-text">FEATURED PROJECT</div>
            </div>

            {/* Title */}
            <h1 className="infra-title">InfraVision</h1>

            {/* Tech line */}
            <p className="infra-tech">
              C++, TypeScript, React, Node.js, Kubernetes, Docker, PostgreSQL
            </p>

            {/* Bullets */}
            <ul className="infra-bullets">
              <li>
                Engineered a cloud-based platform to visualize and analyze 3D
                infrastructure models (bridges, roads, pipelines), allowing
                engineers to upload CAD-like geometry files for automated
                diagnostics and rendering.
              </li>
              <li>
                Containerized services with Docker and deployed a multi-service
                pipeline on Kubernetes, enabling scalable processing of large
                infrastructure files.
              </li>
            </ul>

            {/* CTA buttons */}
            <div className="infra-cta-row">
              <button className="infra-btn-primary">
                Live Demo
                <IconExternalLink className="infra-btn-icon" />
              </button>

              <button className="infra-btn-secondary">
                View Code
                <IconGithub className="infra-btn-icon" />
              </button>

              <button className="infra-btn-secondary">
                Case Study
                <IconExternalLink className="infra-btn-icon" />
              </button>
            </div>
          </div>

          {/* RIGHT – blank mockup card */}
          <div className="infra-right">
            {/* soft glow */}
            <div className="infra-glow" />

            {/* placeholder screen */}
            <div className="infra-screen-shell">
              <div className="infra-screen-gradient" />
              <div className="infra-screen-inner">
                <div className="infra-screen-grid" />
                <div className="infra-screen-reflection" />
                <div className="infra-screen-content">
                  <img
                    key={slides[activeSlide].src}
                    src={slides[activeSlide].src}
                    alt={slides[activeSlide].caption}
                    className="infra-screen-image"
                  />
                </div>
                <div className="infra-screen-meta">
                  <div>
                    <div className="infra-screen-meta-label">Preview</div>
                    <div className="infra-screen-meta-title">
                      {slides[activeSlide].title}
                    </div>
                    <div className="infra-screen-meta-caption">
                      {slides[activeSlide].caption}
                    </div>
                  </div>
                  <div className="infra-screen-dots" role="tablist">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        className={`infra-dot ${
                          activeSlide === index ? "infra-dot-active" : ""
                        }`}
                        aria-label={`Show slide ${index + 1}`}
                        onClick={() => setActiveSlide(index)}
                        role="tab"
                        aria-selected={activeSlide === index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="infra-floating-tags">
              <span>Three.js</span>
              <span>React Three Fiber</span>
              <span>Drei</span>
              <span>React a11y</span>
            </div>
            <div className="infra-sparkles">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      {/* Local styles for this page */}
      <style>{`
        .infra-page {
          position: relative;
          z-index: 3; /* sit above background FX canvases */
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.22), transparent 40%),
            radial-gradient(circle at 80% 0%, rgba(236, 72, 153, 0.14), transparent 32%),
            #05060a;
          color: #fff;
          overflow: hidden;
          perspective: 1200px;
        }

        .infra-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .infra-grid {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
          align-items: center;
          min-height: 70vh;
          position: relative;
        }

        .infra-left,
        .infra-right {
          width: 100%;
        }

        @media (min-width: 900px) {
          .infra-grid {
            flex-direction: row;
            align-items: stretch;
          }
          .infra-left,
          .infra-right {
            flex: 1;
          }
        }

        .infra-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          backdrop-filter: blur(4px);
          background: rgba(5, 6, 10, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
        }

        .infra-label-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .infra-label-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #22d3ee, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .infra-label-icon-svg {
          width: 28px;
          height: 28px;
          color: #fff;
        }

        .infra-label-text {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #22d3ee;
        }

        .infra-title {
          font-size: clamp(40px, 5vw, 60px);
          font-weight: 700;
          line-height: 1.1;
          margin: 0;
        }

        .infra-tech {
          margin: 0;
          margin-top: 0.5rem;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #9ca3af;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }

        .infra-bullets {
          margin: 1rem 0 0 0;
          padding-left: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 15px;
          line-height: 1.7;
          color: #e5e7eb;
        }

        .infra-bullets li {
          list-style: disc;
        }

        .infra-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .infra-btn-primary,
        .infra-btn-secondary {
          border-radius: 999px;
          padding: 0.75rem 1.6rem;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 0.2s ease, color 0.2s ease,
            border-color 0.2s ease, transform 0.15s ease;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .infra-btn-icon {
          width: 16px;
          height: 16px;
        }

        .infra-btn-primary {
          background: #fff;
          color: #000;
        }

        .infra-btn-primary:hover {
          background: #e5e7eb;
          transform: translateY(-1px);
        }

        .infra-btn-secondary {
          background: #020617;
          border-color: #1f2937;
          color: #e5e7eb;
        }

        .infra-btn-secondary:hover {
          border-color: #22d3ee;
          transform: translateY(-1px);
        }

        .infra-right {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          perspective: 1400px;
        }

        @media (min-width: 900px) {
          .infra-right {
            height: 520px;
          }
        }

        .infra-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 0% 0%,
            rgba(34, 211, 238, 0.2),
            transparent 55%
          );
          filter: blur(40px);
        }

        .infra-screen-shell {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 280px;
          border-radius: 32px;
          background: linear-gradient(135deg, #0b1223, #0f172a 40%, #020617);
          border: 1px solid rgba(148, 163, 184, 0.55);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.75),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -2px 12px rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotateY(-14deg) rotateX(6deg);
          transform-style: preserve-3d;
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .infra-screen-shell {
            height: 360px;
          }
        }

        .infra-screen-gradient {
          position: absolute;
          inset: -20% -20% auto -20%;
          height: 60%;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(59, 130, 246, 0.35),
            rgba(236, 72, 153, 0.25),
            transparent 60%
          );
          transform: translateZ(20px);
          filter: blur(10px);
          opacity: 0.9;
        }

        .infra-screen-inner {
          position: relative;
          width: 88%;
          height: 78%;
          border-radius: 24px;
          background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08), transparent 40%),
            rgba(9, 12, 22, 0.94);
          border: 1px solid rgba(55, 65, 81, 0.8);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            inset 0 -2px 12px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          transform: translateZ(40px);
        }

        .infra-screen-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.9;
          transform: translateZ(4px);
        }

        .infra-screen-reflection {
          position: absolute;
          inset: 8%;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent 55%);
          mix-blend-mode: screen;
          transform: translateZ(50px) rotateX(3deg);
          opacity: 0.7;
        }

        .infra-screen-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(60px);
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .infra-screen-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 40%),
            #0b1020;
        }

        .infra-screen-meta {
          position: absolute;
          inset: auto 10% 8% 10%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.7));
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 14px;
          backdrop-filter: blur(6px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          transform: translateZ(70px);
        }

        .infra-screen-meta-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #60a5fa;
        }

        .infra-screen-meta-title {
          font-weight: 700;
          color: #e5e7eb;
          margin-top: 2px;
        }

        .infra-screen-meta-caption {
          font-size: 12px;
          color: #9ca3af;
        }

        .infra-screen-dots {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .infra-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(148, 163, 184, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease;
        }

        .infra-dot-active {
          background: linear-gradient(135deg, #22d3ee, #2563eb);
          transform: scale(1.12);
        }

        .infra-floating-tags {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: repeat(2, minmax(120px, 1fr));
          gap: 0.6rem;
          width: min(460px, 90%);
          color: #e5e7eb;
          font-size: 12px;
        }

        .infra-floating-tags span {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 999px;
          padding: 0.55rem 0.9rem;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(4px);
          transform: translateZ(30px);
        }

        .infra-sparkles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .infra-sparkles span {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.7), transparent 70%);
          border-radius: 999px;
          opacity: 0.8;
          animation: float 10s ease-in-out infinite;
        }

        .infra-sparkles span:nth-child(2) {
          width: 6px;
          height: 6px;
          left: 20%;
          top: 30%;
          animation-delay: 2s;
        }

        .infra-sparkles span:nth-child(3) {
          width: 14px;
          height: 14px;
          left: 70%;
          top: 10%;
          animation-delay: 4s;
        }

        .infra-sparkles span:nth-child(4) {
          width: 8px;
          height: 8px;
          left: 60%;
          bottom: 20%;
          animation-delay: 6s;
        }

        .infra-sparkles span:nth-child(5) {
          width: 12px;
          height: 12px;
          left: 30%;
          bottom: 5%;
          animation-delay: 8s;
        }

        @keyframes float {
          0% {
            transform: translateZ(80px) translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateZ(120px) translateY(-14px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateZ(80px) translateY(0px) scale(1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}