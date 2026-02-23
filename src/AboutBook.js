import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AboutBook({ journey, PALETTE, activeStop }) {
  const bookRef = useRef(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [bookFocused, setBookFocused] = useState(false);

  const playPageSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const bufferSize = Math.floor(ctx.sampleRate * 0.12);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.5);
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch (e) {}
  };

  const loadScriptOnce = (src, id) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-id="${id}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.dataset.id = id;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;

    let cancelled = false;
    let $book;

    const initTurn = () => {
      const $ = window.$;
      if (!$ || !$.fn || !$.fn.turn) return;

      $book = $(el);
      if ($book.data("isTurnInit")) return;

      $book.turn({
        width: 1100,
        height: 650,
        autoCenter: true,
        duration: 700,
        gradients: true,
        elevation: 50,
      });

      $book.data("isTurnInit", true);
      $book.on("turning", () => playPageSound());
      $book.on("turned", () => setHintVisible(false));

      const onResize = () => {
        const w = Math.min(1100, window.innerWidth - 40);
        const h = Math.round(w * (650 / 1100));
        $book.turn("size", w, h);
        $book.turn("center");
      };

      window.addEventListener("resize", onResize);
      onResize();

      return onResize;
    };

    const setup = async () => {
      try {
        if (!window.jQuery) {
          await loadScriptOnce("https://code.jquery.com/jquery-3.7.1.min.js", "jquery-cdn");
        }
        if (!window.$?.fn?.turn) {
          await loadScriptOnce("/vendor/turn.js", "turnjs-local");
        }
        if (cancelled) return;
        const resizeHandler = initTurn();
        return resizeHandler;
      } catch (err) {
        console.error("Failed to load flipbook scripts", err);
      }
    };

    let resizeHandler;
    setup().then((handler) => {
      resizeHandler = handler;
    });

    return () => {
      cancelled = true;
      const $ = window.$;
      const cleanupTarget = $book || ($ && el ? $(el) : null);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (cleanupTarget?.data("turn")) {
        try { cleanupTarget.turn("destroy"); } catch (e) {}
      }
      cleanupTarget?.removeData("isTurnInit");
    };
  }, []);

  useEffect(() => {
    const el = bookRef.current;
    const $ = window.$;
    if (!el || !$ || !$.fn || !$.fn.turn) return;
    const $book = $(el);
    if ($book.data("turn")) {
      $book.turn("page", activeStop + 2);
    }
  }, [activeStop]);

  const dustParticles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1.5 + Math.random() * 2.5,
        duration: `${10 + Math.random() * 15}s`,
        delay: `${Math.random() * 10}s`,
        opacity: 0.12 + Math.random() * 0.18,
      })),
    []
  );

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 2,
        padding: "120px 20px",
        background: bookFocused ? "rgba(6,6,8,0.78)" : "rgba(11,11,13,0.55)",
        backdropFilter: "blur(8px)",
        transition: "background 0.5s ease",
      }}
    >
      {/* Ambient dust particles */}
      <div className="about-dust-layer">
        {dustParticles.map((p, i) => (
          <div
            key={i}
            className="about-dust"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            textAlign: "center",
            marginBottom: "60px",
            fontWeight: 800,
          }}
        >
          My Story
        </h2>

        <div
          className={`about-flipbook-wrap${bookFocused ? " is-focused" : ""}`}
          onMouseEnter={() => setBookFocused(true)}
          onMouseLeave={() => setBookFocused(false)}
        >
          {/* Tight wrapper so corner hint sits on the book edge */}
          <div style={{ position: "relative", display: "inline-block" }}>
            {/* Corner flip hint */}
            <div className="book-corner-hint" aria-hidden="true">
              <div className="book-corner-curl" />
              <span className="book-corner-label">flip</span>
            </div>

          <div className="about-flipbook" ref={bookRef}>

            {/* Cover */}
            <div className="hard cover-front">
              <div className="cover-photo-wrap">
                <img src="/images/hero-photo.JPG" alt="Kashaf" className="cover-photo" />
              </div>
              <div className="cover-text-block">
                <div className="cover-eyebrow">The Story of</div>
                <h2 className="cover-name">Kashaf Batool</h2>
                <div className="cover-subtitle">A story of code, culture &amp; curiosity</div>
              </div>
              {hintVisible && (
                <div className="cover-hint">
                  <span>turn page</span>
                  <span className="hint-arrow">↙</span>
                </div>
              )}
            </div>

            {/* Pages */}
            {journey.map((stop, index) => {
              const isFlipped = index % 2 === 1;
              const layout = stop.layout || (isFlipped ? "flip" : "default");
              const textAlign = stop.textAlign || (layout === "flip" ? "right" : "left");
              const contentAlign = stop.contentAlign || "center";
              const imageLayout = stop.imageLayout || "stacked";
              const backgroundImage = "url('/images/story/page-texture.jpg')";

              return (
                <div className="page" key={stop.title || index}>
                  <div
                    className={`page-inner ${layout}`}
                    style={{
                      backgroundImage,
                      backgroundBlendMode: "normal",
                      backgroundColor: "rgba(255, 252, 235, 0.97)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      alignItems: contentAlign,
                    }}
                  >
                    <div
                      className={`page-text align-${textAlign}`}
                      style={{ color: stop.textColor || "#111" }}
                    >
                      <div
                        className="page-chapter"
                        style={{ color: stop.accent || PALETTE.red }}
                      >
                        {stop.title || stop.year}
                      </div>

                      {stop.lines?.length ? (
                        <div className="line-stack">
                          {stop.lines.map((line, i) => (
                            <div className="line" key={i}>{line}</div>
                          ))}
                        </div>
                      ) : (
                        <div className="line">{stop.text}</div>
                      )}

                      <div
                        className="page-number"
                        style={{
                          borderTopColor: `${stop.accent || PALETTE.red}25`,
                          color: stop.accent || PALETTE.red,
                        }}
                      >
                        Page {index + 1} of {journey.length}
                      </div>
                    </div>

                    <div
                      className={`page-images ${imageLayout}`}
                      style={{
                        justifyContent: stop.imageJustify || "center",
                        alignItems: stop.imageAlign || "flex-start",
                      }}
                    >
                      {stop.img && (
                        <img src={stop.img} alt="" className="img1" style={stop.imgStyle} />
                      )}
                      {stop.img2 && (
                        <img src={stop.img2} alt="" className="img2" style={stop.img2Style} />
                      )}
                      {stop.img3 && (
                        <img src={stop.img3} alt="" className="img3" style={stop.img3Style} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Back cover */}
            <div className="hard" />
          </div>
          </div> {/* end tight wrapper */}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

        /* ── Dust ── */
        .about-dust-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .about-dust {
          position: absolute;
          background: rgba(255, 222, 150, 0.7);
          border-radius: 50%;
          animation: dustDrift linear infinite;
        }
        @keyframes dustDrift {
          0%   { transform: translate(0, 0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translate(18px, -90px) scale(0.5); opacity: 0; }
        }

        /* ── Wrapper / spotlight ── */
        .about-flipbook-wrap {
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
          transition: filter 0.4s ease;
        }
        .about-flipbook-wrap.is-focused {
          filter: drop-shadow(0 0 55px rgba(255, 210, 110, 0.16));
        }

        /* ── Corner flip hint ── */
        .book-corner-hint {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          z-index: 10;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          animation: cornerBounce 2.4s ease-in-out infinite;
        }
        .book-corner-curl {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(
            225deg,
            rgba(255, 240, 200, 0.92) 0%,
            rgba(255, 252, 235, 0.6) 45%,
            transparent 65%
          );
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
          box-shadow: -3px -3px 8px rgba(0, 0, 0, 0.18);
          border-radius: 2px 0 0 0;
        }
        .book-corner-label {
          position: absolute;
          bottom: 42px;
          right: 6px;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(180, 140, 60, 0.85);
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          white-space: nowrap;
        }
        @keyframes cornerBounce {
          0%, 100% { transform: translate(0, 0); opacity: 0.85; }
          40%       { transform: translate(-4px, -4px); opacity: 1; }
          60%       { transform: translate(-2px, -2px); opacity: 1; }
        }

        .about-flipbook {
          width: 1100px;
          height: 650px;
        }

        /* ── Covers ── */
        .about-flipbook .hard {
          background: linear-gradient(135deg, #7a1010 0%, ${PALETTE.red} 55%, #c41e3a 100%) !important;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: none;
          position: relative;
          overflow: hidden;
        }
        .about-flipbook .hard::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.025) 0px,
            rgba(255,255,255,0.025) 1px,
            transparent 1px,
            transparent 9px
          );
          pointer-events: none;
        }
        .cover-front { gap: 14px; padding: 40px; }
        .cover-photo-wrap {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255,255,255,0.45);
          box-shadow: 0 8px 24px rgba(0,0,0,0.45);
          flex-shrink: 0;
        }
        .cover-photo { width: 100%; height: 100%; object-fit: cover; }
        .cover-text-block {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .cover-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          opacity: 0.65;
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
        }
        .cover-name {
          margin: 0;
          font-size: 2.1rem;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .cover-subtitle {
          font-size: 0.85rem;
          opacity: 0.72;
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          letter-spacing: 0.03em;
        }
        .cover-hint {
          position: absolute;
          bottom: 18px;
          right: 22px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.55;
          animation: hintPulse 2.2s ease-in-out infinite;
        }
        .hint-arrow {
          font-size: 1rem;
          animation: hintBounce 1.6s ease-in-out infinite;
        }
        @keyframes hintPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.85; }
        }
        @keyframes hintBounce {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-4px, 4px); }
        }

        /* ── Pages ── */
        .about-flipbook .page {
          background: #fffdf0;
          border: 1px solid rgba(0,0,0,0.08);
          position: relative;
        }
        .about-flipbook .page::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        .about-flipbook .page:nth-child(2)::before  { background: linear-gradient(135deg, #ffecd2, #fcb69f); }
        .about-flipbook .page:nth-child(3)::before  { background: linear-gradient(135deg, #e0c3fc, #8ec5fc); }
        .about-flipbook .page:nth-child(4)::before  { background: linear-gradient(135deg, #a1c4fd, #c2e9fb); }
        .about-flipbook .page:nth-child(5)::before  { background: linear-gradient(135deg, #fbc2eb, #a6c1ee); }
        .about-flipbook .page:nth-child(6)::before  { background: linear-gradient(135deg, #ffeaa7, #fdcb6e); }
        .about-flipbook .page:nth-child(7)::before  { background: linear-gradient(135deg, #d4fc79, #96e6a1); }
        .about-flipbook .page:nth-child(8)::before  { background: linear-gradient(135deg, #f8b195, #f67280); }
        .about-flipbook .page:nth-child(9)::before  { background: linear-gradient(135deg, #fa709a, #fee140); }
        .about-flipbook .page:nth-child(10)::before { background: linear-gradient(135deg, #30cfd0, #330867); }
        .about-flipbook .page:nth-child(11)::before { background: linear-gradient(135deg, #a8edea, #fed6e3); }

        /* Binding edge shadows */
        .about-flipbook .page:nth-child(odd)  { box-shadow: inset -10px 0 18px rgba(0,0,0,0.07); }
        .about-flipbook .page:nth-child(even) { box-shadow: inset  10px 0 18px rgba(0,0,0,0.07); }

        /* ── Page inner ── */
        .page-inner {
          height: 100%;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 32px;
          padding: 50px;
          box-sizing: border-box;
          align-items: center;
          border-radius: 22px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.14);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .page-inner.flip  { grid-template-columns: 0.95fr 1.05fr; }
        .page-inner.tall  { align-items: flex-start; }
        .page-inner.low   { align-items: flex-end; }
        .page-inner.flip .page-text   { order: 2; }
        .page-inner.flip .page-images { order: 1; }

        /* ── Typography ── */
        .page-text {
          color: #111;
          font-family: 'Playfair Display', Georgia, "Times New Roman", serif;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 520px;
        }
        .page-text.align-left   { text-align: left;   align-items: flex-start; }
        .page-text.align-right  { text-align: right;  align-items: flex-end; }
        .page-text.align-center { text-align: center; align-items: center; }

        .line-stack { display: flex; flex-direction: column; gap: 10px; }

        .page-chapter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 900;
          font-style: italic;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .line {
          font-size: 1.05rem;
          line-height: 1.75;
          word-spacing: 0.02em;
          font-family: 'Playfair Display', Georgia, serif;
        }
        .line + .line { margin-top: 4px; }
        .line.strong  { font-weight: 800; letter-spacing: 0.02em; }

        .page-number {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 2px solid rgba(225,29,46,0.15);
          font-size: 0.82rem;
          font-style: italic;
          font-family: 'Playfair Display', Georgia, serif;
        }

        /* ── Images ── */
        .page-images {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
          gap: 16px;
          padding: 6px;
        }
        .page-images.stacked  { flex-direction: column; align-items: center; }
        .page-images.split    { justify-content: space-between; }
        .page-images.floated  { align-items: flex-end; }

        .page-images img {
          max-width: 100%;
          height: auto;
          border-radius: 0;
          box-shadow: none;
          background: transparent;
          border: none;
        }

        .img1 {
          width: 290px;
          position: relative;
          z-index: 3;
          animation: imgFloat1 6s ease-in-out infinite;
        }
        .img2 {
          width: 200px;
          position: absolute;
          right: -22px;
          bottom: -10px;
          z-index: 2;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.16));
          animation: imgFloat2 8s ease-in-out infinite;
        }
        .img3 {
          width: 160px;
          position: absolute;
          left: -18px;
          top: -18px;
          z-index: 1;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.14));
          animation: imgFloat3 7s ease-in-out infinite;
        }

        @keyframes imgFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          33%  { transform: translateY(-10px) rotate(0.5deg); }
          66%  { transform: translateY(-5px) rotate(-1.5deg); }
        }
        @keyframes imgFloat2 {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50%  { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes imgFloat3 {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50%  { transform: translateY(-10px) rotate(-6deg); }
        }

        @media (max-width: 1150px) {
          .page-inner { grid-template-columns: 1fr; }
          .about-flipbook { width: min(1100px, calc(100vw - 40px)); height: auto; }
        }
        @media (max-width: 768px) {
          .img1 { width: min(220px, 60vw); }
          .img2 { width: min(150px, 40vw); }
          .img3 { width: min(120px, 35vw); }
          .page-inner { padding: 1rem; }
          .line { font-size: 0.85rem; }
          .cover-name { font-size: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
