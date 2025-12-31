import React, { useEffect, useRef } from "react";

export default function AboutBook({ journey, PALETTE, activeStop }) {

  const bookRef = useRef(null);

  const loadScriptOnce = (src, id) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-id="${id}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = false; // keep order (jQuery before turn.js)
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

    // Prevent double-init during React refresh
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
      const onResize = () => {
        // Optional: keep size responsive-ish
        const w = Math.min(1100, window.innerWidth - 40);
        const h = Math.min(650, window.innerHeight - 220);
        $book.turn("size", w, h);
        $book.turn("center");
        
        window.addEventListener("resize", onResize);
        onResize();
      };

      return onResize;
    };

    const setup = async () => {
      try {
        if (!window.jQuery) {
          await loadScriptOnce(
            "https://code.jquery.com/jquery-3.7.1.min.js",
            "jquery-cdn"
          );
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
        try {
          cleanupTarget.turn("destroy");
        } catch (e) {}
      }
      cleanupTarget?.removeData("isTurnInit");
    };
  }, []);

  useEffect(() => {
    const el = bookRef.current;
    const $ = window.$;
    if (!el || !$ || !$.fn || !$.fn.turn) return;

    const $book = $(el);

    // Only if turn is initialized
    if ($book.data("turn")) {
      // +2 because page 1 is the cover
      $book.turn("page", activeStop + 2);
    }
  }, [activeStop]);



  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 2,
        padding: "120px 20px",
        background: "rgba(11,11,13,0.55)",
        backdropFilter: "blur(8px)",
      }}
    >
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

        {/* flipbook wrapper (scoped styles) */}
        <div className="about-flipbook-wrap">
          <div className="about-flipbook" ref={bookRef}>
            {/* Cover */}
            <div className="hard">
              <h3 style={{ margin: 0 }}>A life, told in moments</h3>
              <small>Turn the pages</small>
            </div>

            {/* Pages */}
            {journey.map((stop, index) => (
              <div className="page" key={stop.year}>
                <div className="page-inner">
                  <div className="page-text">
                    <div className="page-year">{stop.year}</div>

                    {/* special 2nd slide formatting */}
                    {index === 1 ? (
                      <>
                        <div className="line">These values:</div>
                        <div className="line strong" style={{ color: PALETTE.red }}>
                          Hardwork – Faith – Relentlessness
                        </div>
                        <div className="line">
                          became the foundation of everything I pursued.
                        </div>
                      </>
                    ) : (
                      <div className="line">{stop.text}</div>
                    )}

                    <div className="page-number">
                      Page {index + 1} of {journey.length}
                    </div>
                  </div>

                  <div className="page-images">
                    {stop.img && <img src={stop.img} alt="" className="img1" />}
                    {stop.img2 && <img src={stop.img2} alt="" className="img2" />}
                    {stop.img3 && <img src={stop.img3} alt="" className="img3" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Back cover */}
            <div className="hard" />
          </div>
        </div>
      </div>

      {/* ONLY styles for about flipbook */}
      <style>{`
        .about-flipbook-wrap{
          display:flex;
          justify-content:center;
        }
        .about-flipbook{
          width:1100px;
          height:650px;
        }

        /* scoped "turn.js demo" styles rewritten for your section only */
        .about-flipbook .hard{
          background:${PALETTE.red} !important;
          color:#fff;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          border:none;
        }

        .about-flipbook .page{
          background:#fff;
          border:1px solid rgba(0,0,0,0.08);
          position: relative;
        }

        .about-flipbook .page::before{
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.08;
        pointer-events: none;
        z-index: 0;
        }

        .about-flipbook .page:nth-child(2)::before{ background: linear-gradient(135deg, #ffecd2, #fcb69f); }
        .about-flipbook .page:nth-child(3)::before{ background: linear-gradient(135deg, #e0c3fc, #8ec5fc); }
        .about-flipbook .page:nth-child(4)::before{ background: linear-gradient(135deg, #a1c4fd, #c2e9fb); }
        .about-flipbook .page:nth-child(5)::before{ background: linear-gradient(135deg, #fbc2eb, #a6c1ee); }
        .about-flipbook .page:nth-child(6)::before{ background: linear-gradient(135deg, #ffeaa7, #fdcb6e); }
        .about-flipbook .page:nth-child(7)::before{ background: linear-gradient(135deg, #d4fc79, #96e6a1); }
        .about-flipbook .page:nth-child(8)::before{ background: linear-gradient(135deg, #f8b195, #f67280); }
        .about-flipbook .page:nth-child(9)::before{ background: linear-gradient(135deg, #fa709a, #fee140); }
        .about-flipbook .page:nth-child(10)::before{ background: linear-gradient(135deg, #30cfd0, #330867); }
        .about-flipbook .page:nth-child(11)::before{ background: linear-gradient(135deg, #a8edea, #fed6e3); }

        .page-inner{
          height:100%;
          display:grid;
          grid-template-columns: 1fr 1.2fr;
          gap:40px;
          padding:50px;
          box-sizing:border-box;
          align-items:flex-start;
          position: relative;
          z-index: 1;
        }

        .page-text{
          color:#111;
          font-family: Georgia, "Times New Roman", serif;
        }

        .page-year{
          letter-spacing:0.18em;
          text-transform:uppercase;
          font-size:0.85rem;
          color: rgba(0,0,0,0.55);
          margin-bottom:14px;
          font-weight:700;
        }

        .line{
          font-size:1.05rem;
          line-height:1.85;
          white-space: pre-line;
          margin-bottom: 0.5rem;
        }

        .strong{
          font-weight:800;
          font-size:1.25rem;
          margin: 10px 0;
        }

        .page-number{
          margin-top:22px;
          padding-top:12px;
          border-top:2px solid rgba(225,29,46,0.15);
          font-size:0.85rem;
          color:${PALETTE.red};
          font-style:italic;
        }

        .page-images{
          position:relative;
          display:flex;
          align-items:flex-start;
          justify-content:center;
          height:100%;
        }

        .page-images img{
          max-width: 100%;
          height:auto;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.22);
          background: transparent;
          border: none;
        }

        .img1{ width:360px; position:relative; z-index:3; }
        .img2{ width:200px; position:absolute; right:-18px; bottom:-18px; transform:rotate(8deg); z-index:2; border-width:8px; }
        .img3{ width:150px; position:absolute; left:-18px; top:-18px; transform:rotate(-10deg); z-index:1; border-width:6px; }

        @media (max-width: 1150px){
          .page-inner{ grid-template-columns: 1fr; }
          .about-flipbook{ width: min(1100px, calc(100vw - 40px)); }
        }
      `}</style>
    </section>
  );
}
