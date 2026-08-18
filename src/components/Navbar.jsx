import React, { useState } from 'react';

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

  return (
    <>
      <nav className="navigation-bar">
        <button 
          id="hamburger-btn" 
          className="hamburger-btn" 
          onClick={toggleNav}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>
      </nav>

      {/* Drawer Overlay */}
      <div 
        className={`drawer-overlay ${isNavOpen ? 'active' : ''}`} 
        onClick={closeAll}
      />

      {/* Navigation Drawer (Left Side) */}
      <div className={`drawer drawer-left ${isNavOpen ? 'active' : ''}`}>
        <h3>Navigation Menu</h3>
        <div className="drawer-nav-links">
          <button 
            className={activePage === 'create' ? 'active' : ''} 
            onClick={() => navigateTo('create')}
          >
            Create Memory
          </button>
          <button 
            className={activePage === 'museum' ? 'active' : ''} 
            onClick={() => navigateTo('museum')}
          >
            My Museum
          </button>
          <button 
            className={activePage === 'profile' ? 'active' : ''} 
            onClick={() => navigateTo('profile')}
          >
            My Profile
          </button>
          <button 
            className={activePage === 'about' ? 'active' : ''} 
            onClick={() => navigateTo('about')}
          >
            About Us
          </button>
        </div>
        <div className="drawer-footer" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            className={activePage === 'settings' ? 'active' : ''} 
            onClick={() => navigateTo('settings')}
          >
            Settings
          </button>
          <p>Made with ❤️, By Hero Harshit.</p>
        </div>
      </div>
    </>
  );
}
