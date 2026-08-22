import React from 'react';
import logoImg from '../assets/logo.png';

export default function AboutUs() {
  return (
    <div className="about-sections">
      <div className="header-hero">
        <div className="header-hero-title-wrap">
          <img src={logoImg} alt="Memory Marbles Logo" className="hero-heading-logo" />
          <h1>Memory Marbles</h1>
        </div>
        <p className="footer-quote" style={{ marginTop: '0', fontSize: '1.05rem' }}>
          "Some memories glow yellow. Some burn red. Some settle into a quiet, aching blue. This is a place for all of them."
        </p>
      </div>

      <div className="about-dashboard-grid">
        {/* Left Column: Origin, Philosophy & Privacy */}
        <div className="about-column">
          {/* Section: What is this */}
          <div className="glass-panel about-card">
            <h2>What is this?</h2>
            <p>
              Do you remember the first time something simple — a movie, a moment, a realization — quietly rearranged something inside you?
            </p>
            <p>
              For me, it was understanding that emotions are not enemies to be controlled, but companions to be understood. Joy cannot exist without sadness, and anger is the fire that tells you something matters.
            </p>
            <p>
              <strong>Memory Marbles</strong> was born from that feeling.
            </p>
            <p>
              This is your space. A tiny, private corner of the internet where your memories exist without noise or judgment. No timelines. No followers. No likes. No performance. Just you, standing in a quiet museum of your own life watching the past glow softly in your hands.
            </p>
          </div>

          {/* Section: Why I built this */}
          <div className="glass-panel about-card">
            <h2>Why I built this</h2>
            <p>
              As a frontend developer learning my craft, I didn’t want to build something forgettable. Not another dry todo tracker or standard weather forecast dashboard.
            </p>
            <p>
              I wanted to create something deeply personal. Something I would return to. Something that felt… <em>alive</em>.
            </p>
            <p>
              No productivities. No optimizations. Just pure reflection. This project is growing, evolving, and mine. Maybe it will become a safe place for you too.
            </p>
          </div>

          {/* Section: Tech Details */}
          <div className="glass-panel about-card">
            <h2>Technical & Privacy Details</h2>
            <p>
              <strong>Fully Client-Side:</strong> Built with React, JSX, and Vite. Your memories never touch any remote server, database, or analytics tracker.
            </p>
            <p>
              <strong>Device Storage:</strong> Your data stays on your device. Everything is stored securely in your local storage, 100% private, fully offline, and belongs completely to you.
            </p>
            <p>
              <strong>No Accounts:</strong> No logins, no passwords, no email trackers. Just open it and begin holding your history.
            </p>
          </div>
        </div>

        {/* Right Column: The Marbles & Connect */}
        <div className="about-column">
          {/* Section: The Marbles */}
          <div className="glass-panel about-card">
            <h2>The Marbles</h2>
            <p>Every memory you preserve becomes something tangible — a glowing, spherical marble of light.</p>
            <ul className="about-list emotion-about-grid">
              <li>🟡 <strong>Joy</strong> : warmth lingering after the moment passes</li>
              <li>🔵 <strong>Sadness</strong> : quiet depth making everything meaningful</li>
              <li>🔴 <strong>Anger</strong> : spark telling you something matters</li>
              <li>🟢 <strong>Disgust</strong> : gut instinct protecting your boundaries</li>
              <li>🟣 <strong>Fear</strong> : cautious voice walking beside courage</li>
              <li>🟠 <strong>Anxiety</strong> : planner preparing for the unseen</li>
              <li>🌀 <strong>Envy</strong> : wishing well showing what you hope to become</li>
              <li>🍷 <strong>Ennui</strong> : cool rest when the world gets noisy</li>
              <li>🌸 <strong>Embarrass</strong> : sweet vulnerability that makes you human</li>
              <li>🍂 <strong>Nostalgia</strong> : warm reflection on the beauty of days gone by</li>
            </ul>
            <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.85 }}>
              Click a marble, and it opens. Not just as database text, but as a bubble of feelings that you lived and survived.
            </p>
          </div>

          {/* Section: Connect */}
          <div className="glass-panel about-card">
            <h2>Connect with the Maker</h2>
            <p>Have questions, ideas, or just want to see more creative frontends? Let's connect!</p>
            <div className="about-links">
              <a 
                href="https://github.com/Hero-Harshit/memory-marbles" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-link-btn github"
              >
                💻 View GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/harshittoraskar/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="about-link-btn linkedin"
              >
                👤 Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="footer-quote">
        Made with curiosity, a little Pixar magic, and a quiet love for memories that refuse to fade. 🔮
      </p>
    </div>
  );
}
