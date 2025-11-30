import React, { useEffect, useMemo, useRef, useState } from "react";

const THEME = {
  bg: "#000",
  accent: "#7fb839",
  accent2: "#a3d85e",
  text: "#fff",
  textDim: "#888",
};

export default function LocalLinkProject() {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef(null);
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
            ? THEME.accent2
            : "#5a8c2e",
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 10}s`,
      })),
    []
  );

  const handleBackHome = () => {
    window.location.href = basePath || "/";
  };

  return (
    <div
      style={{
        background: THEME.bg,
        color: THEME.text,
        minHeight: "100vh",
      }}
    >
      {/* Hero Section with Parallax */}
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
        {/* Animated background layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, #2d5016 0%, #000 70%)",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />

        {/* Pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "\n            linear-gradient(#7fb83944 2px, transparent 2px),\n            linear-gradient(90deg, #7fb83944 2px, transparent 2px)\n          ",
            backgroundSize: "100px 100px",
            opacity: 0.1,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />

        {/* Floating particles */}
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
              opacity: 0.6,
              boxShadow: `0 0 15px ${p.color}`,
            }}
          />
        ))}

        {/* Main title */}
        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            transform: `translateY(${scrollY * -0.3}px)`
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "300",
              letterSpacing: "8px",
              color: THEME.accent,
              marginBottom: "20px",
              textTransform: "uppercase",
              textShadow: "0 0 20px #7fb839",
            }}
          >
            Mobile Application
          </div>

          <h1
            style={{
              fontSize: "clamp(60px, 12vw, 140px)",
              fontWeight: "900",
              margin: 0,
              background: "linear-gradient(45deg, #7fb839, #a3d85e, #7fb839)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 3s ease infinite",
              textShadow: "0 0 80px rgba(127, 184, 57, 0.5)",
              letterSpacing: "-2px",
            }}
          >
            LOCAL LINK
          </h1>

          <div
            style={{
              fontSize: "24px",
              color: THEME.textDim,
              marginTop: "20px",
              fontWeight: "300",
            }}
          >
            Connecting Rural Communities
          </div>

          <button
            onClick={handleBackHome}
            style={{
              marginTop: "50px",
              padding: "15px 40px",
              background: "transparent",
              border: "2px solid #7fb839",
              color: "#7fb839",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "2px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = THEME.accent;
              e.currentTarget.style.color = THEME.bg;
              e.currentTarget.style.boxShadow = "0 0 30px #7fb839";
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

        {/* Scroll indicator */}
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
              background: "linear-gradient(to bottom, transparent, #7fb839)",
              margin: "0 auto",
            }}
          />
        </div>
      </div>

      {/* Content Sections */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "100px 40px",
        }}
      >
        {/* Tech Stack Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "100px",
          }}
        >
          {[
            { name: "React Native", icon: "⚛️", color: THEME.accent },
            { name: "Expo", icon: "📱", color: THEME.accent2 },
            { name: "TypeScript", icon: "📘", color: "#3178c6" },
            { name: "Figma", icon: "🎨", color: "#f24e1e" },
            { name: "Firebase", icon: "🔥", color: "#ffca28" },
            { name: "AsyncStorage", icon: "💾", color: THEME.accent },
          ].map((tech, i) => (
            <div
              key={tech.name}
              style={{
                background:
                  "linear-gradient(135deg, rgba(127, 184, 57, 0.1), rgba(163, 216, 94, 0.1))",
                border: "1px solid rgba(127, 184, 57, 0.3)",
                padding: "30px",
                textAlign: "center",
                borderRadius: "10px",
                cursor: "pointer",
                transform: scrollY > 300 ? "translateY(0)" : "translateY(50px)",
                opacity: scrollY > 300 ? 1 : 0,
                transition: "all 0.3s ease",
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${tech.color}44`;
                e.currentTarget.style.borderColor = tech.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(127, 184, 57, 0.3)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>{tech.icon}</div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: tech.color,
                }}
              >
                {tech.name}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Showcase - Split Screen */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            marginBottom: "100px",
            alignItems: "center",
          }}
        >
          {/* Left - Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
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
                fontSize: "48px",
                fontWeight: "800",
                marginBottom: "30px",
                lineHeight: "1.2",
              }}
            >
              Empowering
              <br />
              <span style={{ color: THEME.accent }}>Rural Artisans</span>
              <br />
              & Farmers
            </h2>

            <div
              style={{
                fontSize: "18px",
                color: THEME.textDim,
                lineHeight: "1.8",
                marginBottom: "30px",
              }}
            >
              Built a mobile app with 500+ users on the waitlist using React Native, TypeScript, and JavaScript, to connect
              rural artisans and farmers with customers. Features a multilingual interface and local data storage via
              AsyncStorage.
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {[
                "Multilingual interface for accessibility",
                "Firebase authentication & real-time updates",
                "Intuitive UI optimized for low-literacy users",
                "Large icons with minimal text",
                "Region-specific layouts",
                "Offline-first with AsyncStorage",
              ].map((feature, i) => (
                <div
                  key={feature}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "15px",
                    background: "rgba(127, 184, 57, 0.05)",
                    border: "1px solid rgba(127, 184, 57, 0.2)",
                    borderRadius: "8px",
                    transform: scrollY > 800 ? "translateX(0)" : "translateX(-50px)",
                    opacity: scrollY > 800 ? 1 : 0,
                    transition: "all 0.5s ease",
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      background: THEME.accent,
                      borderRadius: "50%",
                      boxShadow: "0 0 10px #7fb839",
                    }}
                  />
                  <span style={{ color: "#ddd" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Video */}
          <div
            style={{
              position: "relative",
              height: "700px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Phone mockup container */}
            <div
              style={{
                width: "340px",
                height: "680px",
                background: "#1a1a1a",
                borderRadius: "40px",
                border: "8px solid #333",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  "0 30px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(127, 184, 57, 0.3)",
              }}
            >
              {/* Phone notch */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "150px",
                  height: "30px",
                  background: "#1a1a1a",
                  borderRadius: "0 0 20px 20px",
                  zIndex: 10,
                }}
              />

              {/* Video */}
              <video
                ref={videoRef}
                src={`${basePath}/videos/locallink.mp4`}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "90%",
                  height: "90%",
                  objectFit: "contain",
                  borderRadius: "28px",
                  display: "block",
                  margin: "24px auto 0",
                  background: "#000",
                }}
              />

              {/* Glow effect */}
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  background:
                    "radial-gradient(circle, rgba(127, 184, 57, 0.3), transparent 70%)",
                  filter: "blur(30px)",
                  zIndex: -1,
                }}
              />
            </div>

            {/* Floating info cards */}
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "-80px",
                background: "rgba(0, 0, 0, 0.9)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #7fb839",
                fontFamily: "monospace",
                fontSize: "13px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <div style={{ color: THEME.accent, marginBottom: "8px", fontWeight: "bold" }}>
                USERS
              </div>
              <div style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>500+</div>
              <div style={{ color: "#888", fontSize: "11px" }}>On Waitlist</div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "80px",
                right: "-10px",
                background: "rgba(0, 0, 0, 0.9)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #7fb839",
                fontFamily: "monospace",
                fontSize: "13px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                animation: "float 3s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            >
              <div style={{ color: THEME.accent, marginBottom: "8px", fontWeight: "bold" }}>
                REACH
              </div>
              <div style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>Rural</div>
              <div style={{ color: "#888", fontSize: "11px" }}>Communities</div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(127, 184, 57, 0.1), rgba(163, 216, 94, 0.05))",
            border: "1px solid rgba(127, 184, 57, 0.3)",
            borderRadius: "20px",
            padding: "60px",
            marginBottom: "100px",
          }}
        >
          <h3
            style={{
              fontSize: "36px",
              fontWeight: "800",
              marginBottom: "40px",
              textAlign: "center",
              color: THEME.accent,
            }}
          >
            Designed for Accessibility
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
            }}
          >
            {[
              { icon: "🌍", title: "Multilingual", desc: "Interface available in multiple regional languages" },
              { icon: "👁️", title: "Low Literacy", desc: "Large icons and minimal text for easy navigation" },
              { icon: "📴", title: "Offline First", desc: "AsyncStorage enables offline functionality" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  textAlign: "center",
                  padding: "30px",
                  background: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "15px",
                  border: "1px solid rgba(127, 184, 57, 0.2)",
                }}
              >
                <div style={{ fontSize: "64px", marginBottom: "20px" }}>{item.icon}</div>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "12px",
                    color: THEME.accent,
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: "15px", color: THEME.textDim, lineHeight: "1.6" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(127, 184, 57, 0.1), rgba(163, 216, 94, 0.1))",
            border: "1px solid rgba(127, 184, 57, 0.3)",
            borderRadius: "20px",
            padding: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            textAlign: "center",
          }}
        >
          {[
            { value: "500+", label: "Waitlist Users" },
            { value: "6", label: "Technologies" },
            { value: "100%", label: "Mobile Optimized" },
            { value: "3+", label: "Languages Supported" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "900",
                  background: "linear-gradient(45deg, #7fb839, #a3d85e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "14px",
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