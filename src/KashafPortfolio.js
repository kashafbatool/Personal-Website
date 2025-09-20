import React, { useEffect, useRef, useState } from 'react';

export default function KashafPortfolio() {
  const canvasRef = useRef(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Mouse trail effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb'];
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

  // Animated background particles
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb', '#667eea'][Math.floor(Math.random() * 5)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let animationId;
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(0.3, '#764ba2');
      gradient.addColorStop(0.6, '#ff6b6b');
      gradient.addColorStop(1, '#4ecdc4');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(particle => {
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Slight size pulsing
        particle.size += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.1;
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  const projects = [
    {
      title: "LocalLink",
      tech: "React Native, TypeScript, Firebase, Figma",
      description: "Mobile app connecting rural artisans with customers through multilingual interface optimized for low-literacy users.",
      highlights: ["Multilingual UI with large icons", "Firebase authentication", "Low-bandwidth optimization"],
      color: "#ff6b6b",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center"
    },
    {
      title: "Fresh Start",
      tech: "React, JavaScript, Figma, UI/UX Research",
      description: "Chatbot web app centralizing campus resources for 5,000+ Tri-College students with special international student features.",
      highlights: ["User research with 5,000+ students", "NLP-based queries", "International student focus"],
      color: "#4ecdc4",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop&crop=center"
    },
    {
      title: "Alvi Auctioneers Redesign",
      tech: "Frontend Development, UX/UI Design",
      description: "Redesigned auction website improving mobile usability from 65% to 85% and increasing time-on-site from 1.3 to 2.1 minutes.",
      highlights: ["20% mobile usability improvement", "Navigation optimization", "User engagement boost"],
      color: "#45b7d1",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center"
    },
    {
      title: "World Bank Documentary",
      tech: "Video Production, Data Visualization, Research",
      description: "5-minute documentary on clean water initiative featuring resident interviews and data visualizations from 4 villages.",
      highlights: ["Published across 4+ outlets", "Field research in Punjab", "Evidence-based advocacy"],
      color: "#f093fb",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=300&fit=crop&crop=center"
    }
  ];

  const skills = {
    "Programming": ["Python", "JavaScript", "Java", "TypeScript"],
    "Frontend": ["React", "React Native", "HTML/CSS", "Figma"],
    "Backend": ["Node.js", "Firebase", "SQL", "Flask"],
    "Tools": ["Git", "NumPy", "Pandas", "Matplotlib"]
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
      overflow: 'hidden',
      position: 'relative'
    }}>
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
        {/* Navigation */}
        <nav style={{
          position: 'sticky',
          top: 20,
          right: 20,
          zIndex: 100,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          padding: '10px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <button onClick={() => scrollToSection('home')} className="nav-btn">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-btn">About</button>
          <button onClick={() => scrollToSection('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollToSection('gallery')} className="nav-btn">Gallery</button>
          <button onClick={() => scrollToSection('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollToSection('contact')} className="nav-btn">Contact</button>
        </nav>

        {/* Hero Section */}
        <section id="home" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <div>
            <div style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1rem', 
              opacity: 0.9,
              fontWeight: '300' 
            }}>
              est 2005
            </div>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              Kashaf Batool
            </h1>
            <div style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              marginBottom: '3rem',
              maxWidth: '800px',
              lineHeight: 1.6,
              fontWeight: '300'
            }}>
              Building software that speaks human 
            </div>
            
            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '40px',
              justifyContent: 'center',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff6b6b' }}>$10K</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Grant Earned</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ecdc4' }}>5,000+</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Users Impacted</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#45b7d1' }}>4</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Countries</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => scrollToSection('projects')} className="cta-primary">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="cta-secondary">
                Let's Connect
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{
          minHeight: '100vh',
          padding: '100px 20px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '4rem',
              fontWeight: '800',
              color: '#333'
            }}>
              About Me
            </h2>
            
            {/* Story Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <div className="story-card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
                <h3 style={{ marginBottom: '1rem', color: '#ff6b6b' }}>Rooted in Community</h3>
                <p>Raised in Pakistan, I learned early that true impact starts with understanding people’s needs. That lesson shapes how I approach every project I build.</p>
              </div>
              
              <div className="story-card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{ marginBottom: '1rem', color: '#4ecdc4' }}>`Crossing Borders</h3>
                <p>Leaving home to study Computer Science and Mathematics in the U.S. was more than an academic choice — it was a leap of faith. It taught me resilience, adaptability, and the courage to lead in new spaces.</p>
              </div>
              
              <div className="story-card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
                <h3 style={{ marginBottom: '1rem', color: '#45b7d1' }}>Innovation with Intention</h3>
                <p>Now I design technology that's culturally responsive, inclusive, and accessible—because the best tech serves everyone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{
          minHeight: '100vh',
          padding: '100px 20px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '4rem',
              fontWeight: '800'
            }}>
              Featured Projects
            </h2>
            
            {/* Project Navigation */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`project-nav ${currentProject === index ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {/* Project Display */}
            <div className="project-showcase">
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <img 
                    src={projects[currentProject].image} 
                    alt={projects[currentProject].title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      border: `4px solid ${projects[currentProject].color}`
                    }}
                  />
                </div>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <div style={{
                    borderLeft: `5px solid ${projects[currentProject].color}`,
                    paddingLeft: '2rem'
                  }}>
                    <h3 style={{
                      fontSize: '2rem',
                      marginBottom: '1rem',
                      color: projects[currentProject].color
                    }}>
                      {projects[currentProject].title}
                    </h3>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginBottom: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      {projects[currentProject].tech}
                    </div>
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      marginBottom: '2rem'
                    }}>
                      {projects[currentProject].description}
                    </p>
                    <div>
                      <h4 style={{ marginBottom: '1rem', color: '#333' }}>Key Achievements:</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {projects[currentProject].highlights.map((highlight, i) => (
                          <li key={i} style={{
                            padding: '0.5rem 0',
                            borderLeft: `3px solid ${projects[currentProject].color}`,
                            paddingLeft: '1rem',
                            marginBottom: '0.5rem'
                          }}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" style={{
          minHeight: '100vh',
          padding: '100px 20px',
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textAlign: 'center',
              marginBottom: '4rem',
              fontWeight: '800',
              color: '#333'
            }}>
              My Journey in Pictures
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Davis Projects for Peace */}
              <div className="gallery-card">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop&crop=center" 
                  alt="Davis Projects for Peace - STEM Carnival"
                  className="gallery-image"
                />
                <div className="gallery-content">
                  <h3>Davis Projects for Peace</h3>
                  <p>Leading STEM carnival for 250+ community members in Pakistan, making technology accessible through hands-on learning.</p>
                  <div className="gallery-tag">$10K Grant Project</div>
                </div>
              </div>

              {/* World Bank Documentary */}
              <div className="gallery-card">
                <img 
                  src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=400&h=250&fit=crop&crop=center" 
                  alt="World Bank Documentary Field Work"
                  className="gallery-image"
                />
                <div className="gallery-content">
                  <h3>World Bank Documentary</h3>
                  <p>Field research and interviews in Punjab villages for clean water initiative, documenting real stories of impact.</p>
                  <div className="gallery-tag">Research Fellow</div>
                </div>
              </div>

              {/* Bryn Mawr College */}
              <div className="gallery-card">
                <img 
                  src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&h=250&fit=crop&crop=center" 
                  alt="Bryn Mawr College Campus"
                  className="gallery-image"
                />
                <div className="gallery-content">
                  <h3>Bryn Mawr College</h3>
                  <p>From Pakistan's winding roads to Bryn Mawr's cobblestones - pursuing Computer Science and Mathematics with purpose.</p>
                  <div className="gallery-tag">Class of 2028</div>
                </div>
              </div>

              {/* Community Impact */}
              <div className="gallery-card">
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop&crop=center" 
                  alt="Community Outreach"
                  className="gallery-image"
                />
                <div className="gallery-content">
                  <h3>Community Outreach</h3>
                  <p>Working with educators and students to make STEM education more inclusive and accessible for underserved communities.</p>
                  <div className="gallery-tag">Educational Equity</div>
                </div>
              </div>

              {/* Tech for Good */}
              <div className="gallery-card">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&crop=center" 
                  alt="Collaborative Tech Work"
                  className="gallery-image"
                />
                <div className="gallery-content">
                  <h3>Tech for Good</h3>
                  <p>Building applications that bridge cultural gaps and empower marginalized communities through thoughtful technology.</p>
                  <div className="gallery-tag">Innovation</div>
                </div>
              </div>

              {/* International Impact */}
              <div className="gallery-card">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop&crop=center" 
                  alt="International Conference"
                  className="gallery-image"
                />
                <div className="gallery-content">
                  <h3>Global Collaboration</h3>
                  <p>Presenting climate solutions at international conferences and founding Teens4Peace to engage youth in resilience dialogue.</p>
                  <div className="gallery-tag">GEIST Foundation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" style={{
          minHeight: '100vh',
          padding: '100px 20px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
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
        .nav-btn {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          font-weight: bold;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .cta-primary {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transform: rotate(-1deg);
          transition: all 0.3s ease;
        }
        .cta-primary:hover {
          transform: rotate(1deg) scale(1.05);
        }

        .cta-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid #fff;
          padding: 15px 30px;
          border-radius: 25px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transform: rotate(1deg);
          transition: all 0.3s ease;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.3);
          transform: rotate(-1deg) scale(1.05);
        }

        .story-card {
          background: rgba(255,255,255,0.9);
          border-radius: 20px;
          padding: 2rem;
          color: #333;
          text-align: center;
          transform: rotate(1deg);
          transition: all 0.3s ease;
        }
        .story-card:nth-child(even) {
          transform: rotate(-1deg);
        }
        .story-card:hover {
          transform: rotate(0) scale(1.02);
        }

        .skills-container {
          background: rgba(255,255,255,0.1);
          border-radius: 25px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .skill-tag {
          background: #ff6b6b;
          color: #fff;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .project-nav {
          background: rgba(255,255,255,0.3);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          margin: 0 5px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .project-nav.active {
          background: #fff;
          color: #333;
        }

        .project-showcase {
          background: rgba(255,255,255,0.9);
          border-radius: 25px;
          padding: 3rem;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
        }

        .contact-info {
          background: rgba(255,255,255,0.1);
          border-radius: 25px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }
        .contact-info h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .contact-info p {
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
          transition: opacity 0.3s ease;
        }
        .contact-link:hover {
          opacity: 0.8;
        }

        .contact-form-container {
          background: rgba(255,255,255,0.9);
          border-radius: 25px;
          padding: 2rem;
          color: #333;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-input {
          width: 100%;
          padding: 15px;
          border: 3px solid #ddd;
          border-radius: 15px;
          font-size: 1rem;
          background: #fff;
          outline: none;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #ff6b6b;
        }

        .submit-btn {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transform: rotate(-1deg);
          transition: all 0.3s ease;
        }
        .gallery-card {
          background: rgba(255,255,255,0.95);
          border-radius: 20px;
          overflow: hidden;
          transform: rotate(1deg);
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .gallery-card:nth-child(even) {
          transform: rotate(-1deg);
        }
        .gallery-card:hover {
          transform: rotate(0) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .gallery-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .gallery-content {
          padding: 1.5rem;
          color: #333;
        }
        .gallery-content h3 {
          color: #ff6b6b;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        .gallery-content p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .gallery-tag {
          display: inline-block;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: #fff;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
