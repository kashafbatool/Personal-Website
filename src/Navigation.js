import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PALETTE = {
  border: '#1c1d20',
  ink: '#f3f4f6',
  red: '#e11d2e'
};

export default function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 20,
      right: 20,
      zIndex: 100,
      backdropFilter: 'saturate(120%) blur(6px)',
      background: 'rgba(16,17,20,0.25)',
      border: `1px solid ${PALETTE.border}`,
      borderRadius: '25px',
      padding: '10px 20px',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'
    }}>
      {isHomePage ? (
        <>
          <button onClick={() => scrollToSection('home')} className="nav-btn">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-btn">About</button>
          <button onClick={() => scrollToSection('projects')} className="nav-btn">Projects</button>
          <button onClick={() => scrollToSection('gallery')} className="nav-btn">Gallery</button>
          <button onClick={() => scrollToSection('skills')} className="nav-btn">Skills</button>
          <button onClick={() => scrollToSection('contact')} className="nav-btn">Contact</button>
        </>
      ) : (
        <Link to="/" className="nav-btn">← Back to Home</Link>
      )}

      <style jsx>{`
        .nav-btn {
          background: transparent;
          border: 1px solid ${PALETTE.border};
          border-radius: 20px;
          padding: 0.4rem 1rem;
          color: ${PALETTE.ink};
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-block;
        }
        .nav-btn:hover {
          border-color: ${PALETTE.red};
          color: ${PALETTE.red};
          box-shadow: 0 0 6px rgba(225,29,46,0.5);
        }
      `}</style>
    </nav>
  );
}