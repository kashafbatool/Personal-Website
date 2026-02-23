import React, { useEffect, useMemo, useState } from "react";

const THEME = {
  bg: "#060a0a",
  accent: "#06b6d4",
  accent2: "#0ea5e9",
  soft: "#7dd3fc",
  text: "#fff",
  textDim: "#7a9aaa",
};

const YOUTUBE_EMBED = "https://www.youtube.com/embed/A4LJigTIXCk";

export default function WorldBankProject() {
  const [scrollY, setScrollY] = useState(0);
  const basePath = process.env.PUBLIC_URL || "";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        size: 3 + Math.random() * 4,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: i % 3 === 0 ? THEME.accent : i % 3 === 1 ? THEME.accent2 : THEME.soft,
        delay: `${Math.random() * 5}s`,
        duration: `${6 + Math.random() * 8}s`,
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
            background: "radial-gradient(ellipse at 50% 60%, #001f2e 0%, #060a0a 70%)",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#06b6d418 1px, transparent 1px), linear-gradient(90deg, #06b6d418 1px, transparent 1px)",
            backgroundSize: "100px 100px",
            opacity: 0.08,
            transform: `translateY(${scrollY * 0.4}px)`,
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
              opacity: 0.4,
              boxShadow: `0 0 10px ${p.color}`,
            }}
          />
        ))}

        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            transform: `translateY(${scrollY * -0.3}px)`,
            padding: "0 20px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "400",
              letterSpacing: "8px",
              color: THEME.accent,
              marginBottom: "20px",
              textTransform: "uppercase",
              textShadow: `0 0 20px ${THEME.accent}`,
            }}
          >
            World Bank · Punjab, Pakistan
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 90px)",
              fontWeight: "900",
              margin: 0,
              background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.soft}, ${THEME.accent2})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 4s ease infinite",
              letterSpacing: "-2px",
              lineHeight: 1.1,
            }}
          >
            CLEAN WATER
            <br />
            DOCUMENTARY
          </h1>

          <div
            style={{
              fontSize: "18px",
              color: THEME.textDim,
              marginTop: "20px",
              fontWeight: "300",
              maxWidth: "560px",
              margin: "20px auto 0",
              lineHeight: 1.6,
            }}
          >
            Field research across 4 villages — resident interviews, data visualizations, evidence-based advocacy
          </div>

          <button
            onClick={handleBackHome}
            style={{
              marginTop: "48px",
              padding: "14px 38px",
              background: "transparent",
              border: `2px solid ${THEME.accent}`,
              color: THEME.accent,
              fontSize: "15px",
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 40px" }}>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {[
            { value: "5 min", label: "Documentary" },
            { value: "4", label: "Villages Covered" },
            { value: "4+", label: "Outlets Published" },
            { value: "Punjab", label: "Field Location" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(6, 182, 212, 0.05)",
                border: "1px solid rgba(6, 182, 212, 0.18)",
                borderRadius: "16px",
                padding: "36px 20px",
                textAlign: "center",
                transform: scrollY > 200 ? "translateY(0)" : "translateY(30px)",
                opacity: scrollY > 200 ? 1 : 0,
                transition: "all 0.4s ease",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(24px, 3vw, 42px)",
                  fontWeight: "900",
                  background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "13px", color: THEME.textDim, textTransform: "uppercase", letterSpacing: "2px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* YouTube embed — big and centred */}
        <div style={{ marginBottom: "80px" }}>
          <div
            style={{
              fontSize: "13px",
              color: THEME.accent,
              letterSpacing: "4px",
              marginBottom: "24px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Watch the Documentary
          </div>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%", /* 16:9 */
              height: 0,
              borderRadius: "20px",
              overflow: "hidden",
              border: `1px solid rgba(6, 182, 212, 0.3)`,
              boxShadow: `0 0 60px rgba(6, 182, 212, 0.12), 0 40px 80px rgba(0,0,0,0.6)`,
            }}
          >
            <iframe
              src={YOUTUBE_EMBED}
              title="World Bank Clean Water Documentary"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>

        {/* About */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
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
              About the Project
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: "800",
                marginBottom: "24px",
                lineHeight: "1.2",
              }}
            >
              Stories behind
              <br />
              <span style={{ color: THEME.accent }}>the data</span>
            </h2>
            <p style={{ fontSize: "16px", color: THEME.textDim, lineHeight: "1.8" }}>
              A 5-minute documentary on a clean water initiative in rural Punjab, Pakistan.
              Combined resident interviews with data visualizations drawn from field research
              across 4 villages — translating community voices into evidence-based advocacy
              published across 4+ outlets.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "🎥", label: "Resident interviews in 4 villages" },
              { icon: "📊", label: "Data visualizations from field research" },
              { icon: "📰", label: "Published across 4+ outlets" },
              { icon: "💧", label: "Clean water access advocacy" },
              { icon: "🗺️", label: "Field research in Punjab, Pakistan" },
            ].map((f, i) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "14px 16px",
                  background: "rgba(6, 182, 212, 0.04)",
                  border: "1px solid rgba(6, 182, 212, 0.14)",
                  borderRadius: "10px",
                  transform: scrollY > 900 ? "translateX(0)" : "translateX(30px)",
                  opacity: scrollY > 900 ? 1 : 0,
                  transition: "all 0.5s ease",
                  transitionDelay: `${i * 0.07}s`,
                }}
              >
                <span style={{ fontSize: "20px" }}>{f.icon}</span>
                <span style={{ color: "#ddd", fontSize: "15px" }}>{f.label}</span>
              </div>
            ))}
          </div>
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
          50% { transform: translate(8px, -18px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
