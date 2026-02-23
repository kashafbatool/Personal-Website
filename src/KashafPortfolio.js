import React, { useEffect, useRef, useState } from 'react';
import AboutBook from "./AboutBook";
import BlogSection from './BlogSection';
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import Contact from './Contact'; // Adjust path if you put it in a subfolder like /components
import PillNav from './PillNav'; // Import the component


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
    title: "The Foundation",
    lines: [
      "Growing up in Islamabad, Pakistan, I watched my parents work tirelessly to provide for our family.",
      "My father would leave before sunrise. My mother managed a household with precision that would rival any engineer.",
      "Their dedication wasn't just about survival—it was about building something better. That lesson stuck with me.",
    ],
    img:  "/images/story/slide1-flag.png",
    accent: "#d97706",
    imageJustify: "space-evenly",
    layout: "default tall",
    textAlign: "left",
    contentAlign: "flex-start",
    imageLayout: "split",
  },
  {
    title: "The Dream",
    lines: [
      "At 16, I discovered something called a 'full-ride scholarship.'",
      "It felt impossible. A girl from Islamabad going to America?",
      "But my parents had shown me: impossible is just a challenge waiting to be solved. So I applied. And applied. And applied.",
    ],
    img: "/images/story/slide3-plane.png",
    accent: "#0ea5e9",
    imageJustify: "space-between",
    layout: "default",
    textAlign: "left",
    contentAlign: "center",
    imageLayout: "split",
  },
  {
    title: "The Leap",
    lines: [
      "At 19, I boarded a plane with one suitcase, a scholarship to Bryn Mawr College, and a promise to myself: Make this count.",
      "7,000 miles from home. Everything familiar left behind.",
      "The scariest part wasn't leaving—it was knowing I couldn't turn back.",
    ],
    img: "/images/story/slide3-usa-pakistan.png",
    accent: "#f97316",
    imageJustify: "flex-start",
    layout: "flip low",
    textAlign: "right",
    contentAlign: "flex-end",
    imageLayout: "floated",
    },
  {
     title: "The Discovery",
    lines: [
      "First semester. CS 101.",
      "The assignment: Print 'Hello World'. I stayed up until 3 AM debugging. Most people would've been frustrated.",
      "I was hooked. Making a computer do exactly what I wanted felt like learning a new language that could change the world.",
    ],
    img: "/images/story/slide5-builder-cloud.png",
    accent: "#0ea5e9",
    imageJustify: "center",
    layout: "default",
    textAlign: "center",
    contentAlign: "flex-start",
    imageLayout: "stacked",
    imageAlign: "center",
  },
  {
    title: "The Obsession",
    lines: [
      "My friends went to parties. I built things that broke—then fixed them—then broke them again at 2 AM.",
      "React. Python. Swift. GameMaker. Each language felt like a new dialect of the same obsession.",
      "Hackathons weren't events. They were home.",
    ],
    img: "/images/story/slide6-helloworld.png",
    accent: "#10b981",
    imageJustify: "space-evenly",
    layout: "flip tall",
    textAlign: "right",
    contentAlign: "center",
    imageLayout: "split",
    imageAlign: "flex-end",
  },
  {
    title: "The Purpose",
    lines: [
      "Building LocalLink—an app for rural artisans back home in Pakistan.",
      "Women who could barely read. Markets they couldn't reach. Potential locked away.",
      "That's when it clicked: Code isn't just about syntax. It's about solving real problems for real people.",
    ],
    img: "/images/story/slide7-locallink.png",
    accent: "#b45309",
    imageJustify: "space-around",
    layout: "default low",
    textAlign: "left",
    contentAlign: "flex-end",
    imageLayout: "floated",
  },
  {
    title: "The Bridge",
    lines: [
      "People ask me: 'Do you feel Pakistani or American?'",
      "I feel like both. I feel like neither. I'm a bridge between tradition and innovation—between Islamabad and Pennsylvania.",
      "And I'm building more bridges with every project.",
    ],
    img: "/images/story/slide9-connect.jpg",
    accent: "#be123c",
    imageJustify: "space-between",
    layout: "default",
    textAlign: "right",
    contentAlign: "center",
    imageLayout: "split",
  },
  {
    title: "The Mission",
    lines: [
      "I wake up in Pennsylvania, but I build for Islamabad. For rural artisans. For students without resources.",
      "For communities that technology forgot.",
      "My mission is simple: build things that matter, for people who matter.",
      "The journey continues—want to be part of it?",
    ],
    img: "/images/story/slide10-globe.jpg",
    accent: "#7c3aed",
    imageJustify: "center",
    layout: "flip",
    textAlign: "center",
    contentAlign: "center",
    imageLayout: "stacked",
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
    title: "Alvi Auctioneers Redesign",
    tech: "Frontend Development, UX/UI Design",
    description: "Redesigned auction website improving mobile usability from 65% to 85% and increasing time-on-site from 1.3 to 2.1 minutes.",
    highlights: ["20% mobile usability improvement", "Navigation optimization", "User engagement boost"],
    color: PALETTE.red,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center"
  },
  {
    title: "Room8",
    tech: "Swift, SwiftUI, MVVM, Google Calendar API, UserNotifications, iOS",
    description: "iOS roommate management app built at a hackathon — handles split expenses, chore scheduling, a shared calendar, and a collaborative fridge board for sticky notes and photos.",
    highlights: [
      "Built with a team of 3 at a hackathon",
      "Bill splitting with per-person breakdown",
      "MVVM architecture with priority-based smart notifications",
    ],
    color: PALETTE.red,
    image: "/images/room8-dashboard.png",
  },
  {
    title: "Haverford Educational RISC Architecture",
    tech: "Logisim-Evolution, Digital Logic, RISC Architecture",
    description: "Implemented and debugged HERA (Haverford Architecture) — a custom CPU built in Logisim-Evolution for Computing Systems. Worked on add/sub circuits, 16-register bank, and the ALSU.",
    highlights: [
      "Add/sub circuits with carry propagation",
      "16-register bank (R0–R15)",
      "ALSU: arithmetic, logic, and shift operations",
    ],
    color: PALETTE.red,
    image: "/images/hera-full-cpu.png",
  },
  {
    title: "Space Rocks",
    tech: "GameMaker Studio, GML",
    description: "Retro 2D arcade space shooter built from scratch in GameMaker Studio. Implements ship rotation, thrust physics, projectile firing, collision detection, and asteroid breakup mechanics.",
    highlights: [
      "Full game loop with collision detection",
      "Rotation & thrust physics from scratch",
      "Built in GML (GameMaker Language)",
    ],
    color: PALETTE.red,
    image: "/images/spacerocks-demo.gif",
  },
  {
    title: "World Bank Documentary",
    tech: "Video Production, Data Visualization, Research",
    description: "5-minute documentary on clean water initiative featuring resident interviews and data visualizations from 4 villages.",
    highlights: ["Published across 4+ outlets", "Field research in Punjab", "Evidence-based advocacy"],
    color: PALETTE.red,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=300&fit=crop&crop=center"
  },
  {
    title: "Davis Projects for Peace",
    tech: "STEM Education, Hardware Setup, Python, VS Code",
    description: "Secured $16,500+ in grants to deliver STEM and digital literacy programs for 650+ students and educators across rural Pakistan through SciVenture.",
    highlights: [
      "$16,500+ in competitive grants secured",
      "650+ students and educators reached",
      "10+ workstations configured with Python & VS Code",
    ],
    color: PALETTE.red,
    image: "/images/davis.JPG",
  }
];

const getProject = (title) => projects.find((p) => p.title === title);

const projectBuckets = [
  {
    id: "fullstack",
    label: "Full-Stack Product Engineering",
    items: [
      { ...getProject("Room8"), slug: "room8" },
      { ...getProject("Local Link"), slug: "local-link" },
      { ...getProject("InfraVision"), slug: "infra-vision" },
    ]
  },
  {
    id: "systems",
    label: "Systems & Architecture",
    items: [
      { ...getProject("Haverford Educational RISC Architecture"), slug: "hera" },
    ]
  },
  {
    id: "games",
    label: "Games",
    items: [
      { ...getProject("Space Rocks"), slug: "space-rocks" },
    ]
  },
  {
    id: "research",
    label: "Research & Fellowships",
    items: [
      { ...getProject("World Bank Documentary"), slug: "world-bank-documentary" },
      { ...getProject("Davis Projects for Peace"), slug: "davis-projects-for-peace" }
    ]
  }
];

export default function KashafPortfolio() {
  const canvasRef = useRef(null);

  const [openBucketId, setOpenBucketId] = useState("fullstack"); // default bucket
  const activeBucket = projectBuckets.find((b) => b.id === openBucketId);

  const [typedIntro, setTypedIntro] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [activeStop, setActiveStop] = useState(0);
  //const [pageProgress, setPageProgress] = useState(0);
  const scrollRef = useRef(null);   // your main scroll container
  const aboutRef = useRef(null);    // the about section
  //const stopRefs = useRef([]);
  const basePath = process.env.PUBLIC_URL || '';
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

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
  const scroller = scrollRef.current;
  const section = aboutRef.current;
  if (!scroller || !section) return;

  const update = () => {
    const viewportH = scroller.clientHeight;
    const scrollTop = scroller.scrollTop;

    const sectionTop = section.offsetTop;
    const sectionH = section.scrollHeight;

    // progress through the about section only
    const start = sectionTop - viewportH * 0.1;
    const end = sectionTop + sectionH - viewportH * 0.9;

    const t = (scrollTop - start) / (end - start);
    const clamped = Math.max(0, Math.min(1, t));

    const idx = Math.round(clamped * (journey.length - 1));
    setActiveStop(idx);
  };

  update();
  scroller.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    scroller.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}, []);

/*
  useEffect(() => {

    const container = scrollRef.current;
    const section = aboutRef.current;
    if (!container || !section) return;

    const computeActiveStop = () => {
      const { top } = section.getBoundingClientRect();
      const sectionTop = section.offsetTop;
      const sectionHeight = section.scrollHeight;
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;

      // Start the progression slightly before the section hits the viewport
      const start = sectionTop - viewportHeight * 0.15;
      const end = sectionTop + sectionHeight - viewportHeight * 0.5;
      const travel = end - start;

      const rawProgress = (scrollTop - start) / travel;
      const clamped = Math.min(1, Math.max(0, rawProgress));
       
      const turns = journey.length - 1;
      const scaledProgress = clamped * turns;

      setPageProgress(scaledProgress);
      setActiveStop(Math.min(turns, Math.max(0, Math.round(scaledProgress))));
    };

    computeActiveStop();
    container.addEventListener("scroll", computeActiveStop, { passive: true });
    window.addEventListener("resize", computeActiveStop);

    return () => {
      container.removeEventListener("scroll", computeActiveStop);
      window.removeEventListener("resize", computeActiveStop);
    };
  }, []);
  */

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const container = scrollRef.current;
    if (section && container) {
      container.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    }
  };

  const skills = {
    "Programming": ["Python", "JavaScript", "TypeScript", "Java", "Swift"],
    "Frontend": ["React", "React Native", "SwiftUI", "HTML/CSS", "Figma"],
    "Backend": ["Node.js", "Firebase", "PostgreSQL", "Flask", "SQL"],
    "DevOps & Tools": ["Git", "Docker", "Kubernetes", "NumPy", "Pandas"]
  };

  

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: '100vh',
      color: '#fff',
      overflow: 'hidden',
      position: 'relative',
      background: 'radial-gradient(ellipse at 20% 50%, #1a0a0a 0%, #0b0b0d 60%, #050507 100%)',
    }}>
      {/* Background video */}
    <video
      className="bg-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noplaybackrate"
      aria-hidden="true"
      tabIndex={-1}
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
        style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", position: "relative", zIndex: 2 }}
      >
        <PillNav
          items={navItems}
          logo="/images/hero-photo.JPG"
          logoAlt="KB"
          baseColor="#ffffff"
          pillColor="rgba(20, 20, 22, 0.6)"
          pillTextColor="#ffffff"
          hoveredPillTextColor="#000000"
        />


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
          <div className="hero-grid">
            {/* LEFT SIDE — TEXT */}
            <div className="hero-text">
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

      <p style={{
        marginTop: "0.6rem",
        color: PALETTE.redSoft,
        fontSize: "1rem",
        fontWeight: 500,
        letterSpacing: "0.06em",
      }}>
        Software Engineer · Full-Stack · CS & Math @ Bryn Mawr & Haverford 
      </p>

      {/* SMALL SUBTEXT */}
      <p
        style={{
          marginTop: "1rem",
          color: "#e0e0e0",
          fontSize: "1.3rem",
          fontWeight: 300
        }}
      >
        Building software that speaks human
      </p>

      {/* BUTTONS */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "20px" }}>
        <button className="cta-primary" onClick={() => scrollToSection('projects')}>Work With Me</button>
        <button className="cta-secondary" onClick={() => scrollToSection('contact')}>Contact Me</button>
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
        <AboutBook journey={journey} PALETTE={PALETTE} activeStop={activeStop} />



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

          <BlogSection />

        {/* Technical Skills Section */}
<section id="skills" style={{ minHeight: "200vh", padding: "100px 20px" }}>
  <h2 style={{ textAlign: "center", color: "white", marginBottom: "50px", fontSize: "3rem" }}>
    Tech Stack
  </h2>

  <ScrollStack stackPosition={150}> 
    {/* Just map your cards normally */}
    {Object.entries(skills).map(([category, skillList], idx) => (
      <ScrollStackItem key={category}>
        <div className="skills-card-inner">
          <div className="skills-card-header">
            <span className="skills-card-index">{String(idx + 1).padStart(2, "0")}</span>
            <h4 className="skills-card-title">{category}</h4>
          </div>
          <div className="skills-tag-wrap">
            {skillList.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </ScrollStackItem>
    ))}
  </ScrollStack>
</section>

        {/* Contact Section */}
        <Contact />

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

  /* Hero grid */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 60px;
    max-width: 1400px;
    width: 100%;
  }
  .hero-text {
    text-align: left;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
      padding: 40px 0;
    }
    .hero-text {
      text-align: center;
      order: 2;
    }
    .hero-grid > div:last-child {
      order: 1;
    }
    .hero-grid img {
      max-width: 240px !important;
    }
    .cta-primary, .cta-secondary {
      width: 100%;
      justify-content: center;
    }
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

`}</style>   {/* <--- This closes the style tag */}
    </div>         
  </div>
  );
}
