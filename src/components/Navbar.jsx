import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { CONTENT } from '../data/content';

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
    { id: 'museum', label: CONTENT.navbar.navItems.museum },
    { id: 'create', label: CONTENT.navbar.navItems.create },
    { id: 'profile', label: CONTENT.navbar.navItems.profile },
    { id: 'settings', label: CONTENT.navbar.navItems.settings },
    { id: 'about', label: CONTENT.navbar.navItems.about }
  ];

  return (
    <>
      <nav className="navigation-bar">
        {/* Brand Logo on Left */}
        <div 
          className="nav-brand" 
          onClick={() => navigateTo('museum')}
          title={`${CONTENT.global.brandName} Home`}
        >
          <img src={logoImg} alt={`${CONTENT.global.brandName} Logo`} className="nav-brand-logo" />
          <span className="brand-name">{CONTENT.global.brandName}</span>
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
          <h3 style={{ margin: 0, paddingBottom: 0 }}>{CONTENT.navbar.mobileTitle}</h3>
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
          <p style={{ margin: 0 }}>{CONTENT.navbar.footerPrivacy}</p>
        </div>
      </div>
    </>
  );
}
