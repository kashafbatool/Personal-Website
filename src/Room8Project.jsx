import React, { useEffect, useMemo, useState } from "react";

const THEME = {
  bg: "#0d0d0d",
  accent: "#8fbc8f",
  accent2: "#a8d5a2",
  warm: "#c8a882",
  text: "#fff",
  textDim: "#888",
};

const screenshots = [
  { src: "/images/room8-dashboard.png", label: "Dashboard" },
  { src: "/images/room8-calendar.png", label: "Calendar" },
  { src: "/images/room8-expenses.png", label: "Expenses" },
  { src: "/images/room8-shopping.png", label: "Shopping List" },
  { src: "/images/room8-fridge.png", label: "Fridge Board" },
];

export default function Room8Project() {
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
        size: 6,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color:
          i % 3 === 0
            ? THEME.accent
            : i % 3 === 1
            ? THEME.warm
            : THEME.accent2,
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
            background: "radial-gradient(circle at 50% 50%, #1a2e1a 0%, #0d0d0d 70%)",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#8fbc8f22 2px, transparent 2px), linear-gradient(90deg, #8fbc8f22 2px, transparent 2px)",
            backgroundSize: "100px 100px",
            opacity: 0.1,
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
              boxShadow: `0 0 15px ${p.color}`,
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
              fontSize: "16px",
              fontWeight: "300",
              letterSpacing: "8px",
              color: THEME.warm,
              marginBottom: "20px",
              textTransform: "uppercase",
              textShadow: `0 0 20px ${THEME.warm}`,
            }}
          >
            iOS App · Hackathon Project
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
            ROOM8
          </h1>

          <div
            style={{
              fontSize: "22px",
              color: THEME.textDim,
              marginTop: "20px",
              fontWeight: "300",
            }}
          >
            Roommate Management, Simplified
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
            { name: "Swift", icon: "🦅", color: THEME.warm },
            { name: "SwiftUI", icon: "📱", color: THEME.accent },
            { name: "MVVM", icon: "🏗️", color: THEME.accent2 },
            { name: "UserNotifications", icon: "🔔", color: THEME.warm },
            { name: "Google Calendar API", icon: "📅", color: "#4285f4" },
            { name: "iOS 15+", icon: "🍎", color: "#555" },
          ].map((tech, i) => (
            <div
              key={tech.name}
              style={{
                background: `linear-gradient(135deg, rgba(143, 188, 143, 0.08), rgba(200, 168, 130, 0.08))`,
                border: `1px solid rgba(143, 188, 143, 0.25)`,
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
                e.currentTarget.style.borderColor = "rgba(143, 188, 143, 0.25)";
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>{tech.icon}</div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: tech.color }}>
                {tech.name}
              </div>
            </div>
          ))}
        </div>

        {/* Screenshots Gallery + Feature List */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "100px",
            alignItems: "start",
          }}
        >
          {/* Left — Features */}
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
              Core Features
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: "800",
                marginBottom: "30px",
                lineHeight: "1.2",
              }}
            >
              Everything your
              <br />
              <span style={{ color: THEME.accent }}>house needs</span>
              <br />
              in one place
            </h2>
            <div
              style={{
                fontSize: "17px",
                color: THEME.textDim,
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              Built with a team of 3 at a hackathon — a full iOS roommate management app
              handling split expenses, chore scheduling, shared calendar, and a collaborative
              fridge board.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "💸", label: "Split bills with per-person breakdown" },
                { icon: "📅", label: "Shared calendar with Google Calendar sync" },
                { icon: "🧹", label: "Chore scheduling with priority levels" },
                { icon: "🛒", label: "Collaborative shopping list" },
                { icon: "📌", label: "Fridge board for sticky notes & photos" },
                { icon: "🔔", label: "Smart notifications based on task urgency" },
              ].map((f, i) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    background: "rgba(143, 188, 143, 0.05)",
                    border: "1px solid rgba(143, 188, 143, 0.18)",
                    borderRadius: "10px",
                    transform: scrollY > 800 ? "translateX(0)" : "translateX(-40px)",
                    opacity: scrollY > 800 ? 1 : 0,
                    transition: "all 0.5s ease",
                    transitionDelay: `${i * 0.08}s`,
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{f.icon}</span>
                  <span style={{ color: "#ddd", fontSize: "15px" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Screenshot viewer */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            {/* Phone mockup */}
            <div
              style={{
                width: "280px",
                height: "560px",
                background: "#1a1a1a",
                borderRadius: "36px",
                border: "7px solid #2a2a2a",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 40px ${THEME.accent}33`,
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "26px",
                  background: "#1a1a1a",
                  borderRadius: "0 0 16px 16px",
                  zIndex: 10,
                }}
              />
              <img
                src={`${basePath}${screenshots[activeScreen].src}`}
                alt={screenshots[activeScreen].label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>

            {/* Thumbnail strip */}
            <div style={{ display: "flex", gap: "10px" }}>
              {screenshots.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveScreen(i)}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: `2px solid ${i === activeScreen ? THEME.accent : "transparent"}`,
                    padding: 0,
                    cursor: "pointer",
                    opacity: i === activeScreen ? 1 : 0.5,
                    transition: "all 0.2s ease",
                    background: "none",
                  }}
                >
                  <img
                    src={`${basePath}${s.src}`}
                    alt={s.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>

            <div style={{ color: THEME.textDim, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
              {screenshots[activeScreen].label}
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div
          style={{
            background: `linear-gradient(135deg, rgba(143, 188, 143, 0.08), rgba(200, 168, 130, 0.08))`,
            border: `1px solid rgba(143, 188, 143, 0.25)`,
            borderRadius: "20px",
            padding: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            textAlign: "center",
            marginBottom: "100px",
          }}
        >
          {[
            { value: "24hrs", label: "Built In" },
            { value: "4", label: "Team Members" },
            { value: "5", label: "Core Screens" },
            { value: "iOS 15+", label: "Target Platform" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
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
