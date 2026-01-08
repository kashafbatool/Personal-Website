import React, { useState } from 'react';
import './PillNav.css';

export default function PillNav({
  items,
  logo,
  logoAlt,
  baseColor = '#ffffff',
  pillColor = 'rgba(20, 20, 22, 0.6)',
  pillTextColor = '#ffffff',
  hoveredPillTextColor = '#000000'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const styleVars = {
    '--pill-nav-base': baseColor,
    '--pill-nav-bg': pillColor,
    '--pill-nav-text': pillTextColor,
    '--pill-nav-text-hover': hoveredPillTextColor,
  };

  const handleItemClick = (event, href) => {
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="pill-nav" style={styleVars} aria-label="Primary">
      <button
        type="button"
        className="pill-nav__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        {logo ? (
          <img
            src={logo}
            alt={logoAlt || 'Logo'}
            className="pill-nav__logo-image"
          />
        ) : (
          <span className="pill-nav__toggle-icon" aria-hidden="true">
            ☰
          </span>
        )}
      </button>
      <div className={`pill-nav__panel ${isOpen ? 'is-open' : ''}`}>
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="pill-nav__item"
            onClick={(event) => handleItemClick(event, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}