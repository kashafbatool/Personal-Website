import React, { useEffect, useRef, useState } from 'react';

const PALETTE = {
  bg0: '#0b0b0d',
  bg1: '#101114',
  ink: '#f3f4f6',
  inkDim: '#9aa0a6',
  red: '#e11d2e',
  redSoft: '#ff385a',
  border: '#1c1d20'
};

const journey = [
  {
    text: "I was born and raised in Pakistan where I learned the values that continue to shape who I am today",
    img: "/images/story/slide1-house.png",
    img2: "/images/story/slide1-flag.png"
  },
  {
    text: "These values: Hardwork - Faith - Relentlessness became the foundation of everything I pursued",
    img: "/images/story/slide2-books.png",
    img2: "/images/story/slide2-exclamation.png"
  },
  {
    text: "They are the reason I earned a full ride scholarship to Bryn Mawr College, and at the age of 19 I left home in the chase of biggeer dreams",
    img: "/images/story/slide3-plane.png",
    img2: "/images/story/slide3-suitcase.png",
    img3: "/images/story/slide3-use-pakistan.png"
  },
  {
    text: "During my first semester, I took my first cs class and I have genuinely fallen in love with the subject",
    img: "/images/story/slide4-coffee.png",
    img2: "/images/story/slide4-laptop-light.png" 
  },
  {
    text: "Determined to learn as much as I could, I started learning different languages, frameworks and tools leading to different tech projects followed by open source contributions and start ups. You can learn more about this journey through scrolling through my work below",
    img: "/images/story/slide5-builder-cloud.png"
  }
];

const projects = [
  {
    title: "InfraVision",
    tech: "C++, TypeScript, React, Node.js, Kubernetes, Docker, PostgreSQL",
    description:
      "3D infrastructure visualization platform with CAD uploads, diagnostics, and scalable cloud processing.",
    highlights: [
      "Interactive 3D rendering (Three.js / React Three Fiber)",
      "Multi-service pipeline deployed on Kubernetes",
      "Upload-to-analysis workflow with accessible overlays",
    ],
    color: PALETTE.red,
    image: "/images/infravision-preview-hero.svg",
  },
  {
    title: "Local Link",
    tech: "React Native, TypeScript, Firebase, Figma",
    description: "Mobile app connecting rural artisans with customers through multilingual interface optimized for low-literacy users.",
    highlights: ["Multilingual UI with large icons", "Firebase authentication", "Low-bandwidth optimization"],
    color: PALETTE.red,
    video: "/videos/locallink.mp4"
  },
  {
    title: "Fresh Start",
    tech: "React, JavaScript, Figma, UI/UX Research",
    description: "Chatbot web app centralizing campus resources for 5,000+ Tri-College students with special international student features.",
    highlights: ["User research with 5,000+ students", "NLP-based queries", "International student focus"],
    color: PALETTE.red,
    video: "/videos/freshstart.mp4"
  },
  {
    title: "Alvi Auctioneers Redesign",
    tech: "Frontend Development, UX/UI Design",
    description: "Redesigned auction website improving mobile usability from 65% to 85% and increasing time-on-site from 1.3 to 2.1 minutes.",
    highlights: ["20% mobile usability improvement", "Navigation optimization", "User engagement boost"],
    color: PALETTE.red,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center"
  },
  {
    title: "World Bank Documentary",
    tech: "Video Production, Data Visualization, Research",
    description: "5-minute documentary on clean water initiative featuring resident interviews and data visualizations from 4 villages.",
    highlights: ["Published across 4+ outlets", "Field research in Punjab", "Evidence-based advocacy"],
    color: PALETTE.red,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=300&fit=crop&crop=center"
  }
];

const getProject = (title) => projects.find((p) => p.title === title);

const projectBuckets = [
  {
    id: "ai",
    label: "AI & Intelligent Systems",
    items: [
      { name: "Model-backed tools (coming soon)" }
    ]
  },
  {
    id: "fullstack",
    label: "Full-Stack Product Engineering",
    items: [
      { ...getProject("Local Link"), slug: "local-link" },
      { ...getProject("InfraVision"), slug: "infra-vision" },
      { ...getProject("Fresh Start"), slug: "fresh-start" },
    ]
  },
  {
    id: "systems",
    label: "Systems & Architecture",
    items: [
      { name: "Systems & architecture coursework (coming soon)" }
    ]
  },
  {
    id: "robotics",
    label: "Robotics & Embodied AI",
    items: [
      { name: "Developmental robotics projects (coming soon)" }
    ]
  },
  {
    id: "research",
    label: "Research & Fellowships",
    items: [
      { ...getProject("World Bank Documentary"), slug: "world-bank-documentary" },
      { name: "Davis Projects for Peace – STEM Carnival", slug: "davis-projects-for-peace" }
    ]
  }
];

export default function KashafPortfolio() {
  const canvasRef = useRef(null);

  const [openBucketId, setOpenBucketId] = useState("fullstack"); // default bucket
  const activeBucket = projectBuckets.find((b) => b.id === openBucketId);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [typedIntro, setTypedIntro] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [activeStop, setActiveStop] = useState(0);
  const scrollRef = useRef(null);   // your main scroll container
  const aboutRef = useRef(null);    // the about section
  const stopRefs = useRef([]);
  const basePath = process.env.PUBLIC_URL || '';

  // highlight each card as you scroll & move plane
/*
  useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          //setActiveStop(idx);
        }
      });
    },
    { threshold: 0.6 }
  );

  stopRefs.current.forEach(el => el && observer.observe(el));
  return () => observer.disconnect();
}, []);
*/
useEffect(() => {
  const handleScroll = () => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    const scrollStart = -rect.top;
    const scrollRange = rect.height - viewportHeight;
    const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));
    
    const pageIndex = Math.floor(progress * journey.length);
    const clampedIndex = Math.max(0, Math.min(journey.length - 1, pageIndex));
    
    setActiveStop(clampedIndex);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  // Mouse trail effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = [PALETTE.red, '#ffffff', '#9aa0a6'];
    const trail = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove = (e) => {
      trail.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      });
      if (trail.length > 15) trail.shift();
    };

    let raf;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.forEach((p, i) => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.life -= 0.03;
        p.size *= 0.97;
        if (p.life <= 0) trail.splice(i, 1);
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const fullText = "Kashaf Batool";
    let index = 0;

    const interval = setInterval(() => {
      setTypedIntro(fullText.slice(0, index + 1));
      index += 1;
      if (index === fullText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  


  useEffect(() => {
  const container = document.querySelector(".main-scroll");
  if (!container || !aboutRef.current) return;

  const onScroll = () => {
    const section = aboutRef.current;

    // About section position relative to the scroll container
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollTop = container.scrollTop;

    // progress = 0 at start of about, 1 at end of about
    const raw = (scrollTop - sectionTop) / (sectionHeight - container.clientHeight);
    const progress = Math.min(1, Math.max(0, raw));

    const idx = Math.round(progress * (journey.length - 1));
    setActiveStop(idx);
  };

  onScroll(); // run once
  container.addEventListener("scroll", onScroll, { passive: true });
  return () => container.removeEventListener("scroll", onScroll);
}, [journey.length]);


  const skills = {
    "Programming": ["Python", "JavaScript", "Java", "TypeScript"],
    "Frontend": ["React", "React Native", "HTML/CSS", "Figma"],
    "Backend": ["Node.js", "Firebase", "SQL", "Flask"],
    "Tools": ["Git", "NumPy", "Pandas", "Matplotlib"]
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = () => {
    setFormStatus('Sending... ✨');
    setTimeout(() => {
      setFormStatus('Message Sent! 🎉');
      setTimeout(() => {
        setFormStatus('');
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      color: '#fff',
      //overflow: 'hidden',
      position: 'relative',
      //background: PALETTE.bg0
    }}>
      {/* Background video */}
    <video
      className="bg-video"
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/videos/bg.mp4" type="video/mp4" />
    </video>
      {/* Mouse trail canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />
      
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="main-scroll"
        style={{ height: "100vh", overflowY: "auto", position: "relative", zIndex: 2 }}
      >


        {/* Hero Section */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            position: "relative",
            zIndex: 2
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              gap: "60px",
              maxWidth: "1400px",
              width: "100%"
            }}
          >
            {/* LEFT SIDE — TEXT */}
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  color: "#c4c4c4",
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  marginBottom: "1rem"
                }}
              >
                Hello, My Name Is
              </p>

              <h1
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: "800",
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.1
                }}
              >
                {typedIntro}
                <span className={`cursor ${isTypingDone ? "done" : ""}`}>|</span>
              </h1>

      {/* SMALL SUBTEXT */}
      <p
        style={{
          marginTop: "1.5rem",
          color: "#e0e0e0",
          fontSize: "1.3rem",
          fontWeight: 300
        }}
      >
        Building software that speaks human
      </p>

      {/* BUTTONS */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "20px" }}>
        <button className="cta-primary">Work With Me</button>
        <button className="cta-secondary">Contact Me</button>
      </div>
    </div>

    {/* RIGHT SIDE — IMAGE */}
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <img
        src="/images/hero-photo.JPG"
        alt="Kashaf Batool"
        style={{
          width: "85%",
          maxWidth: "420px",
          borderRadius: "20px",
          objectFit: "cover",
          boxShadow: "0 15px 40px rgba(0,0,0,0.35)"
        }}
      />
    </div>
  </div>
</section>


                {/* About Section - Book Page Flip */}
        <section
          ref={aboutRef}
          id="about"
          style={{
            minHeight: `${journey.length * 100}vh`, // enough scroll for each page
            position: "relative",
            zIndex: 2,
            background: "rgba(11,11,13,0.6)",
            backdropFilter: "blur(8px)",
            paddingTop: "100px",
            paddingBottom: "40vh",
          }}
        >


        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              textAlign: "center",
              marginBottom: "80px",
              fontWeight: "800",
              letterSpacing: "-0.02em",
            }}
          >
            My Story
          </h2>

          {/* Sticky Book Container */}
          <div
            style={{
              position: "sticky",
              top: "100px",
              maxWidth: "1100px",
              margin: "0 auto",
              perspective: "2500px",
              height: "650px",
              //marginBottom: "100vh",
            }}
          >
            {journey.map((stop, index) => {
              const isActive = index === activeStop;
              const isPast = index < activeStop;
              const isFuture = index > activeStop;

              return (
                <div
                  key={index}
                  data-index={index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "650px",
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isPast ? `rotateY(-160deg)` : `rotateY(0deg)`,
                    opacity: isFuture && index > activeStop + 2 ? 0 : 1,
                    zIndex: isPast ? 50 - index : isFuture ? 100 - index : 200,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Page Front */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0.98) 0%, rgba(245,245,245,0.98) 100%)",
                      borderRadius: "0 20px 20px 0",
                      boxShadow: isActive
                        ? "0 30px 80px rgba(225,29,46,0.25), 0 0 0 3px rgba(225,29,46,0.4)"
                        : "0 15px 50px rgba(0,0,0,0.2)",
                      borderLeft: "none",
                      display: "flex",
                      alignItems: "center",
                      padding: "60px 70px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.2fr",
                        gap: "70px",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {/* Left Side - Text */}
                      <div>
                        {/* Big Chapter Number */}
                        <div
                          style={{
                            fontSize: "7rem",
                            fontWeight: "900",
                            color: "rgba(225,29,46,0.08)",
                            lineHeight: "0.9",
                            fontFamily: "Georgia, serif",
                            marginBottom: "15px",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Chapter Badge */}
                        <div
                          style={{
                            display: "inline-block",
                            padding: "8px 24px",
                            background: PALETTE.red,
                            borderRadius: "30px",
                            marginBottom: "28px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.65rem",
                              color: "#fff",
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              fontWeight: "700",
                            }}
                          >
                            CHAPTER {index + 1}
                          </span>
                        </div>

                        {/* Story Text */}
                        {index === 1 ? (
                          <div style={{ color: "#1a1a1a" }}>
                            <p
                              style={{
                                fontSize: "1rem",
                                lineHeight: "1.9",
                                margin: "0 0 18px",
                                fontFamily: "Georgia, serif",
                              }}
                            >
                              These values:
                            </p>
                            <p
                              style={{
                                fontSize: "1.3rem",
                                fontWeight: "700",
                                color: PALETTE.red,
                                margin: "0 0 18px",
                                lineHeight: "1.5",
                                fontFamily: "Georgia, serif",
                              }}
                            >
                              Hardwork – Faith – Relentlessness
                            </p>
                            <p
                              style={{
                                fontSize: "1rem",
                                lineHeight: "1.9",
                                margin: 0,
                                fontFamily: "Georgia, serif",
                              }}
                            >
                              became the foundation of everything I pursued.
                            </p>
                          </div>
                        ) : (
                          <p
                            style={{
                              fontSize: "1rem",
                              lineHeight: "1.9",
                              color: "#1a1a1a",
                              margin: 0,
                              fontFamily: "Georgia, serif",
                            }}
                          >
                            {stop.text}
                          </p>
                        )}

                        {/* Page Number */}
                        <div
                          style={{
                            marginTop: "35px",
                            paddingTop: "18px",
                            borderTop: "2px solid rgba(225,29,46,0.15)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: PALETTE.red,
                              fontFamily: "Georgia, serif",
                              fontStyle: "italic",
                            }}
                          >
                            Page {index + 1} of {journey.length}
                          </span>
                        </div>
                      </div>

                      {/* Right Side - Images */}
                      <div
                        style={{
                          position: "relative",
                          minHeight: "450px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {stop.img && (
                          <img
                            src={stop.img}
                            alt=""
                            style={{
                              position: "relative",
                              maxWidth: "100%",
                              width: "360px",
                              height: "auto",
                              borderRadius: "12px",
                              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                              border: "10px solid #fff",
                              zIndex: 3,
                            }}
                          />
                        )}

                        {stop.img2 && (
                          <img
                            src={stop.img2}
                            alt=""
                            style={{
                              position: "absolute",
                              bottom: "-25px",
                              right: "-25px",
                              maxWidth: "200px",
                              width: "48%",
                              height: "auto",
                              borderRadius: "10px",
                              boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                              border: "8px solid #fff",
                              zIndex: 2,
                              transform: "rotate(8deg)",
                            }}
                          />
                        )}

                        {stop.img3 && (
                          <img
                            src={stop.img3}
                            alt=""
                            style={{
                              position: "absolute",
                              top: "-20px",
                              left: "-20px",
                              maxWidth: "150px",
                              width: "36%",
                              height: "auto",
                              borderRadius: "8px",
                              boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                              border: "6px solid #fff",
                              zIndex: 1,
                              transform: "rotate(-10deg)",
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Page Curl */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "90px",
                        height: "90px",
                        background:
                          "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%)",
                        borderBottomRightRadius: "20px",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Book Spine Shadow */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "25px",
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* Page Back (when flipped) */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "rgba(230,230,230,0.95)",
                      borderRadius: "20px 0 0 20px",
                      border: "1px solid rgba(200,200,200,0.4)",
                      borderRight: "none",
                      boxShadow: "inset 15px 0 20px rgba(0,0,0,0.08)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Scroll Hint */}
          {activeStop === 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "-80vh",
                position: "relative",
                zIndex: 300,
                animation: "bounce 2s infinite",
              }}
            >
              <p
                style={{
                  color: PALETTE.inkDim,
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Scroll to flip pages
              </p>
              <div style={{ fontSize: "2rem", marginTop: "10px" }}>↓</div>
            </div>
          )}

          {/* Scroll Progress Indicator */}
          <div
            style={{
              position: "fixed",
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
              background: "rgba(11,11,13,0.9)",
              padding: "12px 20px",
              borderRadius: "30px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              zIndex: 1000,
            }}
          >
            {journey.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: activeStop === idx ? "30px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    activeStop === idx ? PALETTE.red : "rgba(255,255,255,0.3)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        style={{
          minHeight: "80vh",
          padding: "120px 20px",
          background: "rgba(16,17,20,0.25)",
          backdropFilter: "saturate(120%) blur(6px)"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              textAlign: "center",
              marginBottom: "2.5rem",
              fontWeight: "800"
            }}
          >
            Projects
          </h2>

          {/* category row */}
          <div className="project-tabs-row">
            {projectBuckets.map((bucket) => (
              <button
                key={bucket.id}
                className={`project-tab-button ${
                  openBucketId === bucket.id ? "active" : ""
                }`}
                onClick={() =>
                  setOpenBucketId(openBucketId === bucket.id ? null : bucket.id)
                }
              >
                {bucket.label}
              </button>
            ))}
          </div>

          {/* active dropdown panel */}
          {activeBucket && (
            <div className="project-dropdown-panel">
              <div className="project-dropdown-header">
                <h3>{activeBucket.label}</h3>
              </div>

              <div className="project-dropdown-list">
                {activeBucket.items.map((item, i) => {
                  const title = item.title || item.name;
                  const tech = item.tech;
                  const slug = item.slug;
                  const href = slug ? `${basePath}/projects/${slug}` : "#";

                  return (
                    <a
                      key={title + i}
                      href={href}
                      className={`project-link-row ${
                        !slug ? "coming-soon" : ""
                      }`}
                    >
                      <div className="project-link-main">
                        <span className="project-link-title">{title}</span>
                        {tech && (
                          <span className="project-link-meta">{tech}</span>
                        )}
                      </div>
                      <span className="project-link-arrow">
                        {slug ? "↗" : "…"}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>


        {/* Technical Skills Section */}
        <section id="skills" style={{
          minHeight: '100vh',
          padding: '100px 20px',
          background: 'rgba(16,17,20,0.25)',
          backdropFilter: 'saturate(120%) blur(6px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '4rem',
              fontWeight: '800',
              color: '#333'
            }}>
              Technical Skills
            </h2>
            
            <div className="skills-container">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
              }}>
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} style={{
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '20px',
                    padding: '2rem',
                    textAlign: 'center',
                    transform: 'rotate(1deg)',
                    transition: 'all 0.3s ease'
                  }}>
                    <h4 style={{ marginBottom: '1.5rem', color: '#ff6b6b', fontSize: '1.3rem' }}>{category}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                      {skillList.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{
          minHeight: '100vh',
          padding: '100px 20px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '4rem',
              fontWeight: '800'
            }}>
              Let's Build Something Amazing
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem'
            }}>
              {/* Contact Info */}
              <div className="contact-info">
                <h3>Ready to make an impact?</h3>
                <p>Whether you're looking for someone who can code, design, research, or lead—I'm passionate about creating technology that serves real people.</p>
                
                <div className="contact-links">
                  <a href="mailto:kbatool@brynmawr.edu" className="contact-link">
                    <span>📧</span> kbatool@brynmawr.edu
                  </a>
                  <a href="tel:+16103481965" className="contact-link">
                    <span>📱</span> (610) 348-1965
                  </a>
                  <a href="https://linkedin.com/in/kashafbatool1" className="contact-link">
                    <span>💼</span> LinkedIn
                  </a>
                  <a href="https://github.com/kashafbatool" className="contact-link">
                    <span>💻</span> GitHub
                  </a>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="contact-form-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project!"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input"
                />
                <button onClick={handleSubmit} className="submit-btn">
                  {formStatus || 'Send Message ✨'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

     <style jsx>{`
        .main-scroll {
    scroll-snap-type: y proximity;
  }


 .about-section {
  background: radial-gradient(circle at 10% 20%, rgba(255, 56, 90, 0.08), transparent 40%),
    radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.06), transparent 35%),
    rgba(5, 6, 8, 0.6);
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.immersive-intro {
  max-width: 960px;
  margin: 0 auto 48px;
  text-align: center;
  padding: 0 24px;
}

.eyebrow {
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: ${PALETTE.inkDim};
  margin: 0 0 0.5rem;
}

.scrolly-title {
  margin: 0 0 0.75rem;
  font-size: clamp(2.2rem, 3vw, 2.8rem);
  letter-spacing: -0.04em;
}

.scrolly-copy {
  margin: 0 0 1.5rem;
  color: ${PALETTE.inkDim};
  line-height: 1.6;
}

.immersive-stack {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.story-immersive {
  position: relative;
  min-height: 100vh;
  border-radius: 28px;
  overflow: hidden;
  isolation: isolate;
  background-size: 115%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  padding: clamp(2rem, 4vw, 3rem);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 90px rgba(0,0,0,0.55);
  animation: slow-pan 16s ease-in-out infinite alternate;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, background-size 0.6s ease;
}

.story-immersive::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5,6,8,0.2) 0%, rgba(5,6,8,0.85) 60%, rgba(5,6,8,0.92) 100%);
  z-index: 1;
}

.story-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.story-bloom {
  position: absolute;
  inset: -30%;
  background: radial-gradient(circle at center, rgba(225,29,46,0.25), transparent 60%);
  animation: bloom 10s ease-in-out infinite;
}

.story-bloom.delay {
  animation-delay: 5s;
  background: radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 55%);
}

.story-frame {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}

.panel-label {
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: ${PALETTE.inkDim};
  margin: 0 0 0.4rem;
}

.story-headline {
  margin: 0 0 1rem;
  font-size: 1.7rem;
  line-height: 1.3;
  color: #fff;
}

.panel-body {
  color: ${PALETTE.inkDim};
  line-height: 1.7;
  margin: 0;
}
.about-story-text {
  font-family: "Playfair Display", "Times New Roman", serif !important;
}

.story-content {
  position: relative;
  z-index: 3;
  max-width: 720px;
  background: rgba(5,6,8,0.7);
  border: 1px solid rgba(255,255,255,0.08);
  padding: clamp(1.6rem, 3vw, 2.3rem);
  border-radius: 22px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
}

.floating-asset {
  position: absolute;
  right: clamp(1rem, 4vw, 2rem);
  top: 10%;
  z-index: 3;
  filter: drop-shadow(0 18px 45px rgba(0,0,0,0.45));
  animation: float 12s ease-in-out infinite;
}

.floating-asset img {
  max-width: min(360px, 40vw);
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.2);
}

.story-immersive.is-active {
  border-color: ${PALETTE.red};
  box-shadow: 0 34px 110px rgba(225,29,46,0.38);
  transform: translateY(-8px);
  background-size: 118%;
}

.story-immersive:not(.is-active) {
  filter: grayscale(0.1) brightness(0.9);
}

@keyframes slow-pan {
  from { background-position: 48% 48%; }
  to { background-position: 52% 56%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.02); }
}

@keyframes bloom {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.8; }
}

@media (max-width: 980px) {
  .story-immersive {
    min-height: 90vh;
  }

  .floating-asset {
    position: static;
    margin-bottom: 12px;
    text-align: center;
  }

  .story-content {
    background: rgba(5,6,8,0.82);
  }
}

@media (max-width: 720px) {
  .story-immersive {
    padding: 1.4rem;
    border-radius: 18px;
  }

  .story-content {
    padding: 1.25rem;
  }

  .floating-asset img {
    max-width: 240px;
  }
}

  .project-tabs-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .project-tab-button {
    background: rgba(15, 16, 22, 0.9);
    border-radius: 999px;
    border: 1px solid ${PALETTE.border};
    color: ${PALETTE.inkDim};
    font-size: 0.9rem;
    padding: 0.5rem 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .project-tab-button:hover {
    border-color: ${PALETTE.red};
    color: ${PALETTE.red};
  }

  .project-tab-button.active {
    background: ${PALETTE.red};
    border-color: ${PALETTE.red};
    color: #fff;
    box-shadow: 0 0 14px rgba(225, 29, 46, 0.6);
  }

  .project-dropdown-panel {
    max-width: 900px;
    margin: 0 auto;
    background: rgba(10, 11, 15, 0.96);
    border-radius: 24px;
    border: 1px solid ${PALETTE.border};
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.6);
    padding: 1.8rem 1.8rem 1.5rem;
  }

  .project-dropdown-header h3 {
    margin: 0 0 1.2rem;
    font-size: 1.4rem;
    color: #fff;
  }

  .project-dropdown-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .project-link-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 14px;
    text-decoration: none;
    background: rgba(15, 16, 22, 0.9);
    border: 1px solid rgba(148, 163, 184, 0.4);
    color: ${PALETTE.ink};
    transition: all 0.18s ease;
  }

  .project-link-row:hover:not(.coming-soon) {
    border-color: ${PALETTE.red};
    box-shadow: 0 0 14px rgba(225, 29, 46, 0.4);
    transform: translateY(-1px);
  }

  .project-link-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .project-link-title {
    font-size: 1rem;
    font-weight: 600;
  }

  .project-link-meta {
    font-size: 0.8rem;
    color: ${PALETTE.inkDim};
  }

  .project-link-arrow {
    font-size: 1rem;
    opacity: 0.8;
  }

  .project-link-row.coming-soon {
    opacity: 0.7;
    cursor: default;
  }

  @media (max-width: 700px) {
    .project-dropdown-panel {
      padding: 1.4rem 1.2rem;
    }
  }
    

  .project-copy {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .project-label {
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${PALETTE.inkDim};
  }

  .project-title {
    font-size: 2.2rem;
    margin: 0;
    color: ${PALETTE.red};
  }

  .project-tech {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${PALETTE.inkDim};
  }

  .project-description {
    font-size: 1rem;
    line-height: 1.7;
    color: ${PALETTE.ink};
  }

  .project-subheading {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: ${PALETTE.inkDim};
    margin-bottom: 0.4rem;
  }

  .project-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .project-list li {
    position: relative;
    padding-left: 1.3rem;
    margin-bottom: 0.4rem;
    color: ${PALETTE.ink};
  }

  .project-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 8px;
    height: 2px;
    border-radius: 999px;
    background: ${PALETTE.red};
  }

  .project-media {
    display: flex;
    justify-content: center;
    align-items: center;
  }

 

       
       .timeline-vert {
    position: relative;
    height: 100%;
    min-height: 360px;
    display: flex;
    justify-content: center;
  }

  .timeline-track-vert {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(-50%);
  }

  .timeline-plane-vert {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50px) rotate(90deg);
    width: 250px;
    transition: top 0.6s ease-out;
    pointer-events: none;
  }

  .timeline-stops-vert {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    width: 100%;
  }

  .timeline-dot-vert {
    position: relative;
    background: transparent;
    border: none;
    color: #a3a7b0;
    font-size: 0.9rem;
    cursor: pointer;
    padding-left: 32px;
    text-align: left;
  }

  .timeline-dot-vert::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 14px;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .timeline-dot-vert.is-active {
    color: #ffffff;
    font-weight: 600;
  }

  .timeline-dot-vert.is-active::before {
    background: #ff385a;
    transform: translate(-50%, -50%) scale(1.1);
  }

  .timeline-year {
    font-size: 0.9rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .story-card {
    background: rgba(16, 17, 20, 0.9);
    border-radius: 18px;
    padding: 1.8rem;
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.3);
    transition: transform 0.25s ease, box-shadow 0.25s ease,
      border-color 0.25s ease;
  }

  .story-card.is-active {
    border-color: #ff385a;
    box-shadow: 0 0 20px rgba(255, 56, 90, 0.3);
    transform: translateY(-3px);
  }

  @media (max-width: 800px) {
    .timeline-vert {
      display: none;   /* hide vertical timeline on small screens if you want */
    }
  }
      @keyframes float1 {
  0%, 100% { 
    transform: translate(0, 0) scale(1); 
  }
  50% { 
    transform: translate(-20px, -30px) scale(1.05); 
  }
}

@keyframes float2 {
  0%, 100% { 
    transform: translate(0, 0) scale(1) rotate(5deg); 
  }
  50% { 
    transform: translate(20px, 30px) scale(1.05) rotate(-5deg); 
  }
}
@keyframes float1 {
  0%, 100% { 
    transform: translate(0, 0) scale(1); 
  }
  50% { 
    transform: translate(-15px, -25px) scale(1.03); 
  }
}

@keyframes float2 {
  0%, 100% { 
    transform: translate(0, 0) scale(1) rotate(3deg); 
  }
  50% { 
    transform: translate(15px, 25px) scale(1.03) rotate(-3deg); 
  }
}
.timeline {
    position: relative;
    margin: 0 auto;
    max-width: 900px;
    padding: 10px 0 40px;
  }

  .timeline-track {
    position: relative;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 20px;
  }

  .timeline-plane {
    position: absolute;
    top: -26px;
    transform: translateX(-40px);
    width: 120px;
    transition: left 0.6s ease-out;
    pointer-events: none;
  }

  .timeline-stops {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 10px;
  }

  .timeline-dot {
    background: transparent;
    border: none;
    color: #a3a7b0;
    font-size: 0.9rem;
    cursor: pointer;
    position: relative;
    padding-top: 18px;
  }

  .timeline-dot::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-50%);
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .timeline-dot.is-active {
    color: #ffffff;
    font-weight: 600;
  }

  .timeline-dot.is-active::before {
    background: #ff385a;
    transform: translateX(-50%) scale(1.1);
  }

  .story-card {
    background: rgba(16, 17, 20, 0.85);
    border-radius: 18px;
    padding: 1.8rem;
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.3);
    transition: transform 0.25s ease, box-shadow 0.25s ease,
      border-color 0.25s ease;
  }

  .story-card h3 {
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
  }

  .story-card.is-active {
    border-color: #ff385a;
    box-shadow: 0 0 20px rgba(255, 56, 90, 0.3);
    transform: translateY(-3px);
  }

      .typewriter-line {
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${PALETTE.inkDim};
  margin-bottom: 0.75rem;
}

  .cursor {
  display: inline-block;
  margin-left: 4px;
  width: 10px;
  animation: blink 1s steps(2, start) infinite;
}

.cursor.done {
  animation: none;
  opacity: 1;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

  .bg-video {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  .nav-btn {
    background: transparent;
    border: 1px solid ${PALETTE.border};
    border-radius: 20px;
    padding: 0.4rem 1rem;
    color: ${PALETTE.ink};
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .nav-btn:hover {
    border-color: ${PALETTE.red};
    color: ${PALETTE.red};
    box-shadow: 0 0 6px rgba(225,29,46,0.5);
  }

  .cta-primary {
    background: ${PALETTE.red};
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .cta-primary:hover {
    background: #c1121f;
    transform: translateY(-2px);
  }

  .cta-secondary {
    background: transparent;
    border: 1px solid ${PALETTE.border};
    color: ${PALETTE.ink};
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .cta-secondary:hover {
    border-color: ${PALETTE.red};
    color: ${PALETTE.red};
  }

  .story-card, .project-showcase, .contact-info,
  .contact-form-container, .gallery-card {
    background: rgba(16,17,20,0.85);
    border: 1px solid ${PALETTE.border};
    border-radius: 18px;
    padding: 1.6rem;
    color: ${PALETTE.ink};
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .story-card:hover, .project-showcase:hover,
  .contact-info:hover, .contact-form-container:hover,
  .gallery-card:hover {
    transform: translateY(-3px);
    border-color: ${PALETTE.red};
    box-shadow: 0 0 12px rgba(225,29,46,0.25);
  }

  .skill-tag {
    background: rgba(225,29,46,0.15);
    border: 1px solid ${PALETTE.red};
    border-radius: 20px;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    color: ${PALETTE.red};
    transition: background 0.2s ease;
  }
  .skill-tag:hover {
    background: rgba(225,29,46,0.3);
  }

  .contact-form input, .contact-form textarea {
    background: rgba(16,17,20,0.8);
    border: 1px solid ${PALETTE.border};
    color: ${PALETTE.ink};
    padding: 0.6rem;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 0.8rem;
  }
  .contact-form input:focus, .contact-form textarea:focus {
    border-color: ${PALETTE.red};
    outline: none;
  }
      .about-story-text {
    font-family: "Times New Roman", Georgia, serif !important;
  }

  .about-story-text p {
    font-family: inherit !important;
  }

`}</style>
    </div>
  );
}


