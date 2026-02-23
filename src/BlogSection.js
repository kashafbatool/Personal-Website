import React from 'react';
import ElectricBorder from './ElectricBorder';
import './BlogSection.css';

export default function BlogSection() {
    return (
      <section className="blog-section" id="blog">
      <div className="blog-section__background" aria-hidden>
        <div className="blog-section__glow" />
        <div className="blog-section__orbs">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className="blog-section__orb" />
          ))}
        </div>
        <div className="blog-section__grid" />
      </div>
        <div className="blog-section__inner">
        <h2 className="blog-section__main-title"><span className="sr-only">Blog</span></h2>
        <div className="blog-section__content">
          <p className="blog-section__subtitle">My Blog</p>

        <ElectricBorder className="blog-section__card" color="#7be0ff" borderRadius={28}>
          <div className="blog-section__card-inner">
            <p className="blog-section__description">
              Essays, build logs, and experiments collected in one place. It&apos;s candid, a little feral, and always
              written for builders with a poet heart.
            </p>
            <a className="blog-section__cta" href="https://substack.com/@kashafbatool" target="_blank" rel="noreferrer">
              Visit the Substack
              <span aria-hidden className="blog-section__cta-arrow">↗</span>
            </a>
          </div>
        </ElectricBorder>
      </div>
      </div>  
    </section>
    );
}