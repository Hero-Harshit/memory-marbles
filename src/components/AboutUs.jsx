import React from 'react';
import logoImg from '../assets/logo.png';
import { CONTENT } from '../data/content';

export default function AboutUs() {
  return (
    <div className="about-sections">
      <div className="header-hero">
        <div className="header-hero-title-wrap">
          <h1>{CONTENT.aboutUs.heroTitle}</h1>
        </div>
        <p className="footer-quote" style={{ marginTop: '0', fontSize: '1.05rem' }}>
          {CONTENT.aboutUs.heroQuote}
        </p>
      </div>

      <div className="about-dashboard-grid">
        {/* Left Column: Origin, Philosophy & Privacy */}
        <div className="about-column">
          {/* Section: What is this */}
          <div className="glass-panel about-card">
            <h2>{CONTENT.aboutUs.sections.whatIsThis.title}</h2>
            <p>
              {CONTENT.aboutUs.sections.whatIsThis.p1}
            </p>
            <p>
              {CONTENT.aboutUs.sections.whatIsThis.p2}
            </p>
            <p>
              <strong>{CONTENT.global.brandName}</strong> {CONTENT.aboutUs.sections.whatIsThis.p3.replace(CONTENT.global.brandName + ' ', '')}
            </p>
            <p>
              {CONTENT.aboutUs.sections.whatIsThis.p4}
            </p>
          </div>

          {/* Section: Why I built this */}
          <div className="glass-panel about-card">
            <h2>{CONTENT.aboutUs.sections.whyIBuiltThis.title}</h2>
            <p>
              {CONTENT.aboutUs.sections.whyIBuiltThis.p1}
            </p>
            <p>
              I wanted to create something deeply personal. Something I would return to. Something that felt… <em>alive</em>.
            </p>
            <p>
              {CONTENT.aboutUs.sections.whyIBuiltThis.p3}
            </p>
          </div>

          {/* Section: Tech Details */}
          <div className="glass-panel about-card">
            <h2>{CONTENT.aboutUs.sections.techDetails.title}</h2>
            <p>
              <strong>Fully Client-Side:</strong> {CONTENT.aboutUs.sections.techDetails.p1.split(': ')[1]}
            </p>
            <p>
              <strong>Device Storage:</strong> {CONTENT.aboutUs.sections.techDetails.p2.split(': ')[1]}
            </p>
            <p>
              <strong>No Accounts:</strong> {CONTENT.aboutUs.sections.techDetails.p3.split(': ')[1]}
            </p>
          </div>
        </div>

        {/* Right Column: The Marbles & Connect */}
        <div className="about-column">
          {/* Section: The Marbles */}
          <div className="glass-panel about-card">
            <h2>{CONTENT.aboutUs.sections.theMarbles.title}</h2>
            <p>{CONTENT.aboutUs.sections.theMarbles.p1}</p>
            <ul className="about-list emotion-about-grid">
              {CONTENT.aboutUs.sections.theMarbles.list.map((item, i) => (
                <li key={i}>{item.emoji} <strong>{item.name}</strong> : {item.desc}</li>
              ))}
            </ul>
            <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.85 }}>
              {CONTENT.aboutUs.sections.theMarbles.footerQuote}
            </p>
          </div>

          {/* Section: Connect */}
          <div className="glass-panel about-card">
            <h2>{CONTENT.aboutUs.sections.connect.title}</h2>
            <p>{CONTENT.aboutUs.sections.connect.p1}</p>
            <div className="about-links">
              <a 
                href="https://github.com/Hero-Harshit/memory-marbles" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-link-btn github"
              >
                {CONTENT.aboutUs.sections.connect.githubBtn}
              </a>
              <a 
                href="https://www.linkedin.com/in/harshittoraskar/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-link-btn linkedin"
              >
                {CONTENT.aboutUs.sections.connect.linkedinBtn}
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="footer-quote">
        {CONTENT.aboutUs.footerQuote}
      </p>
    </div>
  );
}
