import React, { useState, useEffect } from "react";

export default function InfraVisionProject() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh'
    }}>
      {/* Hero Section with Parallax */}
      <div style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Animated background layers */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, #0a4d68 0%, #000 70%)',
          transform: `scale(${1 + scrollY * 0.0003})`
        }} />
        
        {/* Glitch grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(#00ffff22 2px, transparent 2px),
            linear-gradient(90deg, #00ffff22 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.1,
          transform: `translateY(${scrollY * 0.5}px)`
        }} />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: i % 2 === 0 ? '#00ffff' : '#ff00ff',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.6,
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#00ffff' : '#ff00ff'}`
            }}
          />
        ))}

        {/* Main title */}
        <div style={{
          textAlign: 'center',
          zIndex: 10,
          transform: `translateY(${scrollY * -0.3}px)`
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: '300',
            letterSpacing: '8px',
            color: '#00ffff',
            marginBottom: '20px',
            textTransform: 'uppercase',
            textShadow: '0 0 20px #00ffff'
          }}>
            Project Showcase
          </div>
          
          <h1 style={{
            fontSize: 'clamp(60px, 12vw, 140px)',
            fontWeight: '900',
            margin: 0,
            background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ffff)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            textShadow: '0 0 80px rgba(0, 255, 255, 0.5)',
            letterSpacing: '-2px'
          }}>
            INFRAVISION
          </h1>

          <div style={{
            fontSize: '24px',
            color: '#888',
            marginTop: '20px',
            fontWeight: '300'
          }}>
            3D Infrastructure Analysis Platform
          </div>

          <button
            onClick={() => window.history.back()}
            style={{
              marginTop: '50px',
              padding: '15px 40px',
              background: 'transparent',
              border: '2px solid #00ffff',
              color: '#00ffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00ffff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.boxShadow = '0 0 30px #00ffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#00ffff';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ← Back Home
          </button>
          <a
            href="https://github.com/kashafbatool/infravision"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '16px',
              padding: '15px 40px',
              background: 'transparent',
              border: '2px solid #ff00ff',
              color: '#ff00ff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff00ff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.boxShadow = '0 0 30px #ff00ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ff00ff';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '2px',
            height: '40px',
            background: 'linear-gradient(to bottom, transparent, #00ffff)',
            margin: '0 auto'
          }} />
        </div>
      </div>

      {/* Content Sections */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '100px 40px'
      }}>
        {/* Tech Stack Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '100px'
        }}>
          {[
            { name: 'C++', icon: '⚡', color: '#00ffff' },
            { name: 'TypeScript', icon: '📘', color: '#3178c6' },
            { name: 'React', icon: '⚛️', color: '#61dafb' },
            { name: 'Node.js', icon: '🟢', color: '#68a063' },
            { name: 'Kubernetes', icon: '☸️', color: '#326ce5' },
            { name: 'Docker', icon: '🐳', color: '#2496ed' },
            { name: 'PostgreSQL', icon: '🐘', color: '#336791' }
          ].map((tech, i) => (
            <div
              key={tech.name}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                padding: '30px',
                textAlign: 'center',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                transform: scrollY > 300 ? 'translateY(0)' : 'translateY(50px)',
                opacity: scrollY > 300 ? 1 : 0,
                transitionDelay: `${i * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${tech.color}44`;
                e.currentTarget.style.borderColor = tech.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>{tech.icon}</div>
              <div style={{ fontSize: '18px', fontWeight: '600', color: tech.color }}>{tech.name}</div>
            </div>
          ))}
        </div>

        {/* Feature Showcase - Split Screen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          marginBottom: '100px'
        }}>
          {/* Left - Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#00ffff',
              letterSpacing: '4px',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              Core Features
            </div>
            
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '30px',
              lineHeight: '1.2'
            }}>
              Cloud-Based
              <br />
              <span style={{ color: '#00ffff' }}>Infrastructure</span>
              <br />
              Analysis
            </h2>

            <div style={{
              fontSize: '18px',
              color: '#aaa',
              lineHeight: '1.8',
              marginBottom: '30px'
            }}>
              Engineered a cloud-based platform for visualizing and analyzing 3D infrastructure models (bridges, roads, and pipelines), 
              allowing engineers to upload CAD-like geometry files for automated diagnostics and rendering.
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {[
                'Upload CAD files (STEP, IGES, STL)',
                'Real-time 3D model rendering',
                'Automated structural analysis',
                'AI-powered diagnostics',
                'Scalable cloud processing'
              ].map((feature, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '15px',
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: '8px',
                  transform: scrollY > 800 ? 'translateX(0)' : 'translateX(-50px)',
                  opacity: scrollY > 800 ? 1 : 0,
                  transition: 'all 0.5s ease',
                  transitionDelay: `${i * 0.1}s`
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00ffff',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #00ffff'
                  }} />
                  <span style={{ color: '#ddd' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <div style={{
            position: 'relative',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Large 3D visualization mockup */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0a1929 0%, #0d1b2a 100%)',
              borderRadius: '20px',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              padding: '40px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Grid background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />

              {/* Animated bridge structure */}
              <svg viewBox="0 0 400 300" style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                zIndex: 1
              }}>
                <defs>
                  <linearGradient id="bridgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="50%" stopColor="#ff00ff" />
                    <stop offset="100%" stopColor="#00ffff" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <g filter="url(#glow)">
                  {/* Main deck */}
                  <rect x="50" y="150" width="300" height="8" fill="url(#bridgeGlow)" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  </rect>
                  
                  {/* Cables */}
                  <line x1="120" y1="80" x2="120" y2="150" stroke="#00ffff" strokeWidth="2" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="200" y1="60" x2="200" y2="150" stroke="#00ffff" strokeWidth="3" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </line>
                  <line x1="280" y1="80" x2="280" y2="150" stroke="#00ffff" strokeWidth="2" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1s" />
                  </line>

                  {/* Towers */}
                  <rect x="196" y="60" width="8" height="90" fill="url(#bridgeGlow)" />
                  <rect x="116" y="80" width="8" height="70" fill="url(#bridgeGlow)" opacity="0.8" />
                  <rect x="276" y="80" width="8" height="70" fill="url(#bridgeGlow)" opacity="0.8" />

                  {/* Stress indicators */}
                  <circle cx="200" cy="70" r="12" fill="none" stroke="#ff00ff" strokeWidth="2">
                    <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="120" cy="90" r="8" fill="none" stroke="#ffff00" strokeWidth="2">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </circle>
                  <circle cx="280" cy="90" r="8" fill="none" stroke="#ffff00" strokeWidth="2">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="1s" />
                  </circle>
                </g>
              </svg>

              {/* HUD overlay */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #00ffff',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}>
                <div style={{ color: '#00ffff', marginBottom: '8px' }}>SYSTEM STATUS</div>
                <div style={{ color: '#0f0' }}>● Processing Active</div>
                <div style={{ color: '#fff', marginTop: '8px' }}>Load: 87%</div>
                <div style={{ color: '#fff' }}>Memory: 2.3GB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '20px',
          padding: '60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          textAlign: 'center'
        }}>
          {[
            { value: '500ms', label: 'Avg Processing' },
            { value: '10TB+', label: 'Data Processed' },
            { value: '99.9%', label: 'Uptime' },
            { value: '1000+', label: 'Concurrent Users' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
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