import React, { useState } from 'react';
import logoImg from '../assets/logo.png';

export default function Navbar({ activePage, setActivePage }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeAll = () => {
    setIsNavOpen(false);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    closeAll();
  };

  const navItems = [
    { id: 'museum', label: 'My Museum' },
    { id: 'create', label: 'Create Memory' },
    { id: 'profile', label: 'My Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'about', label: 'About Us' }
  ];

  return (
    <>
      <nav className="navigation-bar">
        {/* Brand Logo on Left */}
        <div 
          className="nav-brand" 
          onClick={() => navigateTo('museum')}
          title="Memory Marbles Home"
        >
          <img src={logoImg} alt="Memory Marbles Logo" className="nav-brand-logo" />
          <span className="brand-name">Memory Marbles</span>
        </div>

        {/* Top-Right Navigation Pill Bar (Always visible on desktop) */}
        <div className="top-right-nav-links">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                className={`top-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => navigateTo(item.id)}
              >
                <span className="nav-btn-label">{item.label}</span>
                {isActive && <span className="active-pill-glow" />}
              </button>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle (Strictly mobile screens only) */}
        <button 
          id="hamburger-btn" 
          className="hamburger-btn mobile-only-toggle" 
          onClick={toggleNav}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`drawer-overlay ${isNavOpen ? 'active' : ''}`} 
        onClick={closeAll}
      />

      {/* Right-Side Slide-out Drawer for Mobile */}
      <div className={`drawer drawer-right ${isNavOpen ? 'active' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, paddingBottom: 0 }}>Navigation</h3>
          <button 
            onClick={closeAll}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1.4rem',
              cursor: 'pointer',
              opacity: 0.8
            }}
          >
            ✕
          </button>
        </div>

        <div className="drawer-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activePage === item.id ? 'active' : ''}
              onClick={() => navigateTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="drawer-footer" style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.6, fontSize: '0.85rem' }}>
          <p style={{ margin: 0 }}>Your data stays on your device</p>
        </div>
      </div>
    </>
  );
}
