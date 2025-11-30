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
    year: "2005",
    text: "I entered the world in Islamabad, Pakistan where I grew up watching women carry entire families on their shoulders while being told they had no power. Even before I understood the world, I felt the weight and resilience of the women around me."
  },
  {
    year: "2010",
    text: "At five, I was mostly busy being dramatic, bossing around my cousins, and asking far too many “why” questions. This was the year I discovered that I liked being in charge of things, even if it was just deciding which game everyone had to play. Looking back, this was probably the earliest sign that I would grow up to challenge every rule handed to me."
  },
  {
    year: "2017",
    text: "Teenage me started noticing the double standards everywhere. Girls were encouraged to be quiet and agreeable, while boys were expected to lead. Meanwhile, I was out here organizing study groups, giving unsolicited life advice, and asking teachers why girls weren’t encouraged to take on leadership roles. It was my soft launch into women’s empowerment."
  },
  {
    year: "2020",
    text: "With the world on pause, I finally had time to reflect. I spent hours reading, writing, and thinking about what I wanted my life to stand for. It was the year I realized that I didn’t just want opportunities for myself - I wanted to help create them for other girls too."
  },
  {
    year: "2024",
    text: "I stepped into leadership roles, tried new things, and accidentally became the person people came to for “advice.” This also marked the year I left home and moved 6000 miles away to Bryn Mawr college on a fully funded scholarship."
  },
  {
    year: "2025",
    text: "I now lived in a world full of brilliant women, historic stone buildings, and the occasional existential crisis over problem sets. This was the year I really leaned into building things - projects, communities, confidence, all of it. I took on work that pushed me out of my comfort zone and started shaping my identity not just as a student, but as someone who creates, leads, and makes things happen."
  },
  {
    year: "Present",
    text: "Now I’m continuing that work at Bryn Mawr. I’m building projects that blend tech, community, and creativity, mentoring when I can, and learning from people who inspire me every day. I’m surrounded by women who redefine what strength and ambition look like, and it has made me more intentional about the impact I want to have. I’m still experimenting, still messing up, still learning, and still growing - but everything I do now feels aligned with the person I’m becoming and the work I care about most."
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
  const stopRefs = useRef([]);
  const basePath = process.env.PUBLIC_URL || '';

  // highlight each card as you scroll & move plane
useEffect(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          setActiveStop(idx);
        }
      });
    },
    { threshold: 0.6 }
  );

  stopRefs.current.forEach(el => el && observer.observe(el));
  return () => observer.disconnect();
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
      <div style={{ 
        height: '100vh', 
        overflowY: 'auto', 
        position: 'relative',
        zIndex: 2
      }}>
        

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


        {/* About Section */}
        <section
  id="about"
  style={{
    minHeight: "100vh",
    padding: "120px 20px",
    position: "relative",
    zIndex: 2
  }}
>
  <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
    <h2
      style={{
        textAlign: "center",
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        marginBottom: "60px",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        color: "#f5f5f5"
      }}
    >
      About Me
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: "40px",
        alignItems: "flex-start"
      }}
    >
      {/* LEFT — vertical timeline */}
      <div className="timeline-vert">
        <div className="timeline-track-vert" />
        <img
          src="/images/plane.png"  
          alt="Pink plane"
          className="timeline-plane-vert"
          style={{
            top:
              journey.length > 1
                ? `${(activeStop / (journey.length - 1)) * 100}%`
                : "0%"
          }}
        />
        <div className="timeline-stops-vert">
          {journey.map((stop, index) => (
            <button
              key={stop.year}
              className={`timeline-dot-vert ${
                index === activeStop ? "is-active" : ""
              }`}
              onClick={() => {
                setActiveStop(index);
                const el = stopRefs.current[index];
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              <span className="timeline-year">{stop.year}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — story cards */}
      <div
        style={{
          display: "grid",
          gap: "24px"
        }}
      >
        {journey.map((stop, index) => (
          <article
            key={stop.title}
            data-index={index}
            ref={el => (stopRefs.current[index] = el)}
            className={`story-card ${index === activeStop ? "is-active" : ""}`}
          >
            <h3>{stop.title}</h3>
            <p>{stop.text}</p>
          </article>
        ))}
      </div>
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
`}</style>
    </div>
  );
}


