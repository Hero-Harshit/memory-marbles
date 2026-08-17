import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage, allMemories, userName }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNavOpen) setIsNavOpen(false);
  };

  const closeAll = () => {
    setIsNavOpen(false);
    setIsProfileOpen(false);
  };

  const navigateTo = (page) => {
    setActivePage(page);
    closeAll();
  };

  // Get Last Memory Timestamp
  const lastMemory = allMemories[allMemories.length - 1];
  const lastMemoryTimeStr = lastMemory 
    ? new Date(lastMemory.date).toLocaleString() 
    : 'None';

  // Get dominant emotion
  const emotionCounts = allMemories.reduce((acc, m) => {
    acc[m.emotion] = (acc[m.emotion] || 0) + 1;
    return acc;
  }, {});

  let dominantEmotion = 'None';
  let maxCount = 0;
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantEmotion = emotion;
    }
  });

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

        <button 
          id="profile-btn" 
          className="profile-btn" 
          onClick={toggleProfile}
          aria-label="Toggle Profile Menu"
        >
          👤
        </button>
      </nav>

      {/* Drawer Overlay */}
      <div 
        className={`drawer-overlay ${(isNavOpen || isProfileOpen) ? 'active' : ''}`} 
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
            className={activePage === 'settings' ? 'active' : ''} 
            onClick={() => navigateTo('settings')}
          >
            Settings
          </button>
          <button 
            className={activePage === 'about' ? 'active' : ''} 
            onClick={() => navigateTo('about')}
          >
            About Us
          </button>
        </div>
        <div className="drawer-footer">
          <p>Made with ❤️, By Hero Harshit.</p>
        </div>
      </div>

      {/* Profile Drawer (Right Side) */}
      <div className={`drawer drawer-right ${isProfileOpen ? 'active' : ''}`}>
        <h3>Hello, {userName}!</h3>
        
        <div className="profile-stats-card">
          <h4>Your Stats</h4>
          <p>Total Memories: <span>{allMemories.length}</span></p>
          <p>Dominant Emotion: <span style={{ textTransform: 'capitalize' }}>{dominantEmotion}</span></p>
        </div>

        <div className="profile-stats-card">
          <h4>Activity Log</h4>
          <p style={{ flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 'normal', color: 'inherit' }}>
              Last Memory Created:
            </span>
            <span style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>
              {lastMemoryTimeStr}
            </span>
          </p>
        </div>

        <div className="drawer-footer" style={{ marginTop: 'auto' }}>
          <p>Your memories are safe, private, and stored only in this browser. 🔮</p>
        </div>
      </div>
    </>
  );
}
