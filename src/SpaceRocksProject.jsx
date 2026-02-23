import React, { useEffect, useMemo, useState } from "react";

const THEME = {
  bg: "#05050f",
  accent: "#00f0ff",
  accent2: "#ff6b35",
  star: "#ffffff",
  text: "#fff",
  textDim: "#888",
};

export default function SpaceRocksProject() {
  const [scrollY, setScrollY] = useState(0);
  const basePath = process.env.PUBLIC_URL || "";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 4}s`,
      })),
    []
  );

  const handleBackHome = () => {
    window.location.href = basePath || "/";
  };

  return (
    <div style={{ background: THEME.bg, color: THEME.text, minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Space background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 30%, #0d0d2b 0%, #05050f 70%)",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />

        {/* Stars */}
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: THEME.star,
              borderRadius: "50%",
              left: s.left,
              top: s.top,
              opacity: s.opacity,
              animation: `twinkle ${s.duration} ease-in-out infinite`,
              animationDelay: s.delay,
            }}
          />
        ))}

        {/* Scan line overlay for retro feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            transform: `translateY(${scrollY * -0.3}px)`,
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "400",
              letterSpacing: "10px",
              color: THEME.accent,
              marginBottom: "20px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              textShadow: `0 0 20px ${THEME.accent}`,
            }}
          >
            GameMaker Studio · GML
          </div>

          <h1
            style={{
              fontSize: "clamp(52px, 10vw, 120px)",
              fontWeight: "900",
              margin: 0,
              background: `linear-gradient(45deg, ${THEME.accent}, #ffffff, ${THEME.accent2})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 4s ease infinite",
              letterSpacing: "4px",
              fontFamily: "monospace",
            }}
          >
            SPACE ROCKS
          </h1>

          <div
            style={{
              fontSize: "18px",
              color: THEME.textDim,
              marginTop: "16px",
              fontWeight: "300",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            Destroy asteroids. Don't die.
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "40px" }}>
            <button
              onClick={handleBackHome}
              style={{
                padding: "14px 36px",
                background: "transparent",
                border: `2px solid ${THEME.accent}`,
                color: THEME.accent,
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "monospace",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = THEME.accent;
                e.currentTarget.style.color = THEME.bg;
                e.currentTarget.style.boxShadow = `0 0 30px ${THEME.accent}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = THEME.accent;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              ← Back Home
            </button>
            <a
              href="https://github.com/kashafbatool/spacerocks"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "14px 36px",
                background: "transparent",
                border: `2px solid ${THEME.accent2}`,
                color: THEME.accent2,
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "monospace",
                transition: "all 0.3s ease",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = THEME.accent2;
                e.currentTarget.style.color = THEME.bg;
                e.currentTarget.style.boxShadow = `0 0 30px ${THEME.accent2}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = THEME.accent2;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
          }}
        >
          <div
            style={{
              width: "2px",
              height: "40px",
              background: `linear-gradient(to bottom, transparent, ${THEME.accent})`,
              margin: "0 auto",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 40px" }}>

        {/* Demo GIF + Controls */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "100px",
            alignItems: "center",
          }}
        >
          {/* Left — GIF */}
          <div>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: `1px solid ${THEME.accent}44`,
                boxShadow: `0 0 40px ${THEME.accent}22, 0 0 80px ${THEME.accent}11`,
              }}
            >
              <img
                src={`${basePath}/images/spacerocks-demo.gif`}
                alt="SpaceRocks gameplay demo"
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div
              style={{
                marginTop: "12px",
                textAlign: "center",
                fontSize: "12px",
                color: THEME.textDim,
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
            >
              GAMEPLAY DEMO
            </div>
          </div>

          {/* Right — About + Controls */}
          <div>
            <div
              style={{
                fontSize: "13px",
                color: THEME.accent,
                letterSpacing: "4px",
                marginBottom: "20px",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              About
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: "800",
                marginBottom: "24px",
                lineHeight: "1.2",
              }}
            >
              Retro arcade,
              <br />
              <span style={{ color: THEME.accent }}>built from scratch</span>
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: THEME.textDim,
                lineHeight: "1.8",
                marginBottom: "40px",
              }}
            >
              A classic 2D space shooter built in GameMaker Studio using GML. Implements
              ship movement, rotation physics, projectile spawning, collision detection,
              and asteroid breakup mechanics — all from the ground up.
            </p>

            <div
              style={{
                fontSize: "13px",
                color: THEME.accent2,
                letterSpacing: "4px",
                marginBottom: "16px",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              Controls
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { key: "← →", action: "Rotate ship" },
                { key: "↑", action: "Thrust forward" },
                { key: "SPACE", action: "Fire" },
                { key: "CLICK", action: "Also fires" },
              ].map((c) => (
                <div
                  key={c.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 16px",
                    background: "rgba(0, 240, 255, 0.04)",
                    border: "1px solid rgba(0, 240, 255, 0.15)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(0,240,255,0.1)",
                      border: "1px solid rgba(0,240,255,0.3)",
                      color: THEME.accent,
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: "700",
                      minWidth: "60px",
                      textAlign: "center",
                    }}
                  >
                    {c.key}
                  </span>
                  <span style={{ color: "#ccc", fontSize: "14px" }}>{c.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech concepts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "100px",
          }}
        >
          {[
            { name: "GameMaker Studio", icon: "🎮", color: THEME.accent },
            { name: "GML", icon: "💻", color: THEME.accent2 },
            { name: "Collision Detection", icon: "💥", color: THEME.accent },
            { name: "Physics / Motion", icon: "🚀", color: THEME.accent2 },
            { name: "Sprite Animation", icon: "✨", color: THEME.accent },
            { name: "Game Loop Logic", icon: "🔄", color: THEME.accent2 },
          ].map((tech, i) => (
            <div
              key={tech.name}
              style={{
                background: "rgba(0, 240, 255, 0.04)",
                border: "1px solid rgba(0, 240, 255, 0.15)",
                padding: "24px 16px",
                textAlign: "center",
                borderRadius: "10px",
                cursor: "pointer",
                transform: scrollY > 600 ? "translateY(0)" : "translateY(30px)",
                opacity: scrollY > 600 ? 1 : 0,
                transition: "all 0.3s ease",
                transitionDelay: `${i * 0.07}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 16px 32px ${tech.color}22`;
                e.currentTarget.style.borderColor = tech.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.15)";
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>{tech.icon}</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: tech.color, fontFamily: "monospace" }}>
                {tech.name}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            background: "rgba(0, 240, 255, 0.04)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "16px",
            padding: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            textAlign: "center",
          }}
        >
          {[
            { value: "GML", label: "Language" },
            { value: "2D", label: "Engine Type" },
            { value: "100%", label: "From Scratch" },
            { value: "↑ SPACE", label: "Controls" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "clamp(24px, 3vw, 42px)",
                  fontWeight: "900",
                  background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px",
                  fontFamily: "monospace",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: THEME.textDim,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontFamily: "monospace",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
