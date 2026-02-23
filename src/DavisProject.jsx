import React, { useEffect, useMemo, useState } from "react";

const THEME = {
  bg: "#0a0805",
  accent: "#f59e0b",
  accent2: "#fb923c",
  soft: "#fde68a",
  text: "#fff",
  textDim: "#9a8a78",
};

export default function DavisProject() {
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
        size: 4 + Math.random() * 4,
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
            background: "radial-gradient(ellipse at 50% 60%, #2d1a00 0%, #0a0805 70%)",
            transform: `scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#f59e0b18 1px, transparent 1px), linear-gradient(90deg, #f59e0b18 1px, transparent 1px)",
            backgroundSize: "120px 120px",
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
              boxShadow: `0 0 12px ${p.color}`,
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
            Davis Projects for Peace · Rural Pakistan
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 9vw, 110px)",
              fontWeight: "900",
              margin: 0,
              background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.soft}, ${THEME.accent2})`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient 4s ease infinite",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            SCIVENTURE
          </h1>

          <div
            style={{
              fontSize: "20px",
              color: THEME.textDim,
              marginTop: "20px",
              fontWeight: "300",
              maxWidth: "600px",
              margin: "20px auto 0",
              lineHeight: 1.6,
            }}
          >
            STEM & digital literacy for 650+ students and educators in rural Pakistan
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
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "100px 40px" }}>

        {/* Stats Banner — up top for impact */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {[
            { value: "$16,500+", label: "Grants Secured" },
            { value: "650+", label: "Students & Educators" },
            { value: "10+", label: "Workstations Configured" },
            { value: "4", label: "Workshop Tracks" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(245, 158, 11, 0.06)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
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
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: "900",
                  background: `linear-gradient(45deg, ${THEME.accent}, ${THEME.accent2})`,
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

        {/* BIG video section */}
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
            On the Ground
          </div>
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: `1px solid rgba(245, 158, 11, 0.3)`,
              boxShadow: `0 0 60px rgba(245, 158, 11, 0.12), 0 40px 80px rgba(0,0,0,0.6)`,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              style={{ width: "100%", display: "block", background: "#000", maxHeight: "75vh", objectFit: "contain" }}
            >
              <source src={`${basePath}/videos/davis-demo.mp4`} type="video/mp4" />
              <source src={`${basePath}/videos/davis-demo.mov`} type="video/quicktime" />
            </video>
          </div>
        </div>

        {/* What we did + photo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            marginBottom: "80px",
            alignItems: "center",
          }}
        >
          {/* Left — content */}
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
              What We Built
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: "800",
                marginBottom: "28px",
                lineHeight: "1.2",
              }}
            >
              Technology for
              <br />
              <span style={{ color: THEME.accent }}>the community</span>
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: THEME.textDim,
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              Secured $16,500+ in competitive grants to bring STEM and digital literacy
              programs to rural Pakistan. Ran GPU-accelerated programming workshops,
              circuitry labs, sustainable tech sessions, and hybrid teacher-training
              events — reaching 650+ students and educators.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: "💻", label: "GPU-accelerated programming workshops" },
                { icon: "⚡", label: "Circuitry and hardware labs" },
                { icon: "🌱", label: "Sustainable technology sessions" },
                { icon: "👩‍🏫", label: "Hybrid teacher-training workshops" },
                { icon: "🛠️", label: "Set up 10+ workstations with VS Code & Python" },
                { icon: "🔧", label: "Troubleshot circuit components & dev environments" },
              ].map((f, i) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "14px 16px",
                    background: "rgba(245, 158, 11, 0.05)",
                    border: "1px solid rgba(245, 158, 11, 0.15)",
                    borderRadius: "10px",
                    transform: scrollY > 1000 ? "translateX(0)" : "translateX(-30px)",
                    opacity: scrollY > 1000 ? 1 : 0,
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

          {/* Right — photo */}
          <div>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid rgba(245, 158, 11, 0.25)`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.1)`,
              }}
            >
              <img
                src={`${basePath}/images/davis.JPG`}
                alt="SciVenture STEM Carnival students"
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div
              style={{
                marginTop: "14px",
                fontSize: "13px",
                color: THEME.textDim,
                textAlign: "center",
                letterSpacing: "1px",
              }}
            >
              Students at the SciVenture STEM Carnival
            </div>
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
