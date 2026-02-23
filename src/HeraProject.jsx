import React, { useEffect, useMemo, useState } from "react";

const THEME = {
  bg: "#0a0a0f",
  accent: "#7c6af5",
  accent2: "#a89ff7",
  warm: "#c084fc",
  text: "#fff",
  textDim: "#888",
};

const screenshots = [
  { src: "/images/hera-full-cpu.png", label: "Full CPU Architecture" },
  { src: "/images/hera-control-unit.png", label: "Control Unit & Branching" },
  { src: "/images/hera-alsu.png", label: "ALSU — Arithmetic Logic & Shift Unit" },
];

export default function HeraProject() {
  const [scrollY, setScrollY] = useState(0);
  const [activeScreen, setActiveScreen] = useState(0);
  const basePath = process.env.PUBLIC_URL || "";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        size: 5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: i % 3 === 0 ? THEME.accent : i % 3 === 1 ? THEME.warm : THEME.accent2,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 10}s`,
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, #1a1040 0%, #0a0a0f 70%)",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#7c6af522 2px, transparent 2px), linear-gradient(90deg, #7c6af522 2px, transparent 2px)",
            backgroundSize: "80px 80px",
            opacity: 0.15,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              borderRadius: "50%",
              left: p.left,
              top: p.top,
              animation: `float ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
              opacity: 0.5,
              boxShadow: `0 0 12px ${p.color}`,
            }}
          />
        ))}

        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            transform: `translateY(${scrollY * -0.3}px)`,
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "300",
              letterSpacing: "8px",
              color: THEME.accent2,
              marginBottom: "20px",
              textTransform: "uppercase",
              textShadow: `0 0 20px ${THEME.accent}`,
            }}
          >
            Computing Systems · Logisim-Evolution
          </div>

          <h1
            style={{
              fontSize: "clamp(60px, 12vw, 140px)",
              fontWeight: "900",
              margin: 0,
              background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.warm}, ${THEME.accent2})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 3s ease infinite",
              letterSpacing: "-2px",
            }}
          >
            HERA
          </h1>

          <div
            style={{
              fontSize: "20px",
              color: THEME.textDim,
              marginTop: "16px",
              fontWeight: "300",
            }}
          >
            Haverford Educational RISC Architecture — Custom CPU in Logisim
          </div>

          <button
            onClick={handleBackHome}
            style={{
              marginTop: "50px",
              padding: "15px 40px",
              background: "transparent",
              border: `2px solid ${THEME.accent}`,
              color: THEME.accent,
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "2px",
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
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "100px 40px" }}>

        {/* Tech Stack */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "20px",
            marginBottom: "100px",
          }}
        >
          {[
            { name: "Logisim-Evolution", icon: "⚡", color: THEME.accent },
            { name: "Digital Logic", icon: "🔲", color: THEME.accent2 },
            { name: "ALU Design", icon: "➕", color: THEME.warm },
            { name: "Register Bank", icon: "🗃️", color: THEME.accent },
            { name: "Control Unit", icon: "🎛️", color: THEME.accent2 },
            { name: "RISC Architecture", icon: "🏗️", color: THEME.warm },
          ].map((tech, i) => (
            <div
              key={tech.name}
              style={{
                background: "linear-gradient(135deg, rgba(124, 106, 245, 0.08), rgba(192, 132, 252, 0.08))",
                border: "1px solid rgba(124, 106, 245, 0.25)",
                padding: "28px 20px",
                textAlign: "center",
                borderRadius: "12px",
                cursor: "pointer",
                transform: scrollY > 300 ? "translateY(0)" : "translateY(50px)",
                opacity: scrollY > 300 ? 1 : 0,
                transition: "all 0.3s ease",
                transitionDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.04)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${tech.color}33`;
                e.currentTarget.style.borderColor = tech.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(124, 106, 245, 0.25)";
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>{tech.icon}</div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: tech.color }}>
                {tech.name}
              </div>
            </div>
          ))}
        </div>

        {/* Demo Video + What I Built */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "100px",
            alignItems: "start",
          }}
        >
          {/* Left — What I built */}
          <div>
            <div
              style={{
                fontSize: "13px",
                color: THEME.accent,
                letterSpacing: "4px",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              What I Built
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: "800",
                marginBottom: "28px",
                lineHeight: "1.2",
              }}
            >
              A CPU from
              <br />
              <span style={{ color: THEME.accent }}>the ground up</span>
            </h2>
            <div
              style={{
                fontSize: "17px",
                color: THEME.textDim,
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              In Computing Systems, I worked on implementing and debugging HERA — the Haverford
              Architecture — entirely in Logisim-Evolution. My contributions focused on the
              arithmetic and logic circuits, the register bank, and diagnosing faults in the
              overall CPU simulation.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "➕", label: "Add/Sub circuits with carry propagation" },
                { icon: "🗃️", label: "16-register bank (R0–R15) with read/write logic" },
                { icon: "🔣", label: "ALSU: arithmetic, logic, and shift operations" },
                { icon: "🎛️", label: "Control unit with branch and flag logic" },
                { icon: "🐛", label: "Debugging & fixing the full CPU simulation" },
                { icon: "💾", label: "DataRAM integration with load/store instructions" },
              ].map((f, i) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    background: "rgba(124, 106, 245, 0.05)",
                    border: "1px solid rgba(124, 106, 245, 0.18)",
                    borderRadius: "10px",
                    transform: scrollY > 800 ? "translateX(0)" : "translateX(-40px)",
                    opacity: scrollY > 800 ? 1 : 0,
                    transition: "all 0.5s ease",
                    transitionDelay: `${i * 0.08}s`,
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{f.icon}</span>
                  <span style={{ color: "#ddd", fontSize: "15px" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Demo video */}
          <div>
            <div
              style={{
                fontSize: "13px",
                color: THEME.accent,
                letterSpacing: "4px",
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              Live Demo
            </div>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(124, 106, 245, 0.3)",
                boxShadow: `0 0 40px ${THEME.accent}22`,
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                controls
                style={{ width: "100%", display: "block", background: "#000" }}
              >
                <source src={`${basePath}/videos/hera-demo.mov`} type="video/mp4" />
                <source src={`${basePath}/videos/hera-demo.mov`} type="video/quicktime" />
              </video>
            </div>
            <div
              style={{
                marginTop: "12px",
                fontSize: "13px",
                color: THEME.textDim,
                textAlign: "center",
              }}
            >
              HERA 2.4 running in Logisim-Evolution
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div style={{ marginBottom: "100px" }}>
          <div
            style={{
              fontSize: "13px",
              color: THEME.accent,
              letterSpacing: "4px",
              marginBottom: "20px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Architecture Diagrams
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
            {screenshots.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveScreen(i)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: `1px solid ${i === activeScreen ? THEME.accent : "rgba(124,106,245,0.25)"}`,
                  background: i === activeScreen ? "rgba(124,106,245,0.15)" : "transparent",
                  color: i === activeScreen ? THEME.accent2 : THEME.textDim,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: i === activeScreen ? "600" : "400",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(124, 106, 245, 0.25)",
              boxShadow: `0 0 40px ${THEME.accent}15`,
            }}
          >
            <img
              src={`${basePath}${screenshots[activeScreen].src}`}
              alt={screenshots[activeScreen].label}
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>

        {/* Stats Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(124, 106, 245, 0.08), rgba(192, 132, 252, 0.08))",
            border: "1px solid rgba(124, 106, 245, 0.25)",
            borderRadius: "20px",
            padding: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            textAlign: "center",
          }}
        >
          {[
            { value: "16", label: "Registers" },
            { value: "RISC", label: "Architecture" },
            { value: "ALSU", label: "Custom ALU" },
            { value: "Logisim", label: "Platform" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: "900",
                  background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.warm})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: THEME.textDim,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
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
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
