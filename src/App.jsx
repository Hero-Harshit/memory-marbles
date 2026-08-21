import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CreateMemory from './components/CreateMemory';
import MyMuseum from './components/MyMuseum';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import PixieDust from './components/PixieDust';
import Profile from './components/Profile';
import { FONT_OPTIONS } from './data/fonts';
import './App.css';

export default function App() {
  // Page Routing State: 'create', 'museum', 'settings', 'about'
  const [activePage, setActivePage] = useState('create');
  
  // Memories State
  const [allMemories, setAllMemories] = useState([]);
  
  // Custom Username State
  const [userName, setUserName] = useState('User');

  // Custom Font Style State
  const [selectedFont, setSelectedFont] = useState('cute');

  // Custom Success Banner State
  const [notification, setNotification] = useState({
    active: false,
    text: '',
    bulletColor: '#fff'
  });

  // Marble Customization State
  const [marbleSettings, setMarbleSettings] = useState({
    showAuras: true,
    magneticRepulsion: true,
    randomDancing: true,
    hoverSpeed: 5,
    hoverIntensity: 5
  });

  // Load initial data from localStorage
  useEffect(() => {
    try {
      const storedMemories = localStorage.getItem('allmemories');
      if (storedMemories) {
        const parsed = JSON.parse(storedMemories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllMemories(parsed);
        } else if (!storedMemories) {
          // Empty initial visit
          setAllMemories([]);
        }
      } else {
        // Initial sample starter memories on first visit
        const starterMemories = [
          {
            emotion: 'joy',
            secondaryEmotion: null,
            title: 'Sunlit Afternoon',
            description: 'Laughing so hard with friends on a warm summer evening that my chest hurt from smiling.',
            date: Date.now() - 86400000 * 4
          },
          {
            emotion: 'joy',
            secondaryEmotion: 'sadness',
            title: 'Graduation Day',
            description: 'Standing in the crowd, happy for the future yet aching to say goodbye to four incredible years.',
            date: Date.now() - 86400000 * 2
          },
          {
            emotion: 'nostalgia',
            secondaryEmotion: 'joy',
            title: 'Old Photo Album',
            description: 'Finding an old polaroid from a childhood road trip and feeling an instant rush of warmth.',
            date: Date.now() - 86400000 * 1
          }
        ];
        setAllMemories(starterMemories);
        localStorage.setItem('allmemories', JSON.stringify(starterMemories));
      }

      const storedOtherData = localStorage.getItem('otherdata');
      if (storedOtherData) {
        const parsed = JSON.parse(storedOtherData);
        if (parsed.userName) {
          setUserName(parsed.userName);
        }
      }

      const storedMarbleSettings = localStorage.getItem('marbleSettings');
      if (storedMarbleSettings) {
        setMarbleSettings(JSON.parse(storedMarbleSettings));
      }

      const storedFont = localStorage.getItem('selectedFont');
      if (storedFont && FONT_OPTIONS.some((f) => f.id === storedFont)) {
        setSelectedFont(storedFont);
      }
    } catch (e) {
      console.error('Failed to load localStorage data:', e);
    }
  }, []);

  // Dynamically apply selected font to root CSS variables
  useEffect(() => {
    const fontObj = FONT_OPTIONS.find((f) => f.id === selectedFont) || FONT_OPTIONS[0];
    document.documentElement.style.setProperty('--font-heading', fontObj.headingFont);
    document.documentElement.style.setProperty('--font-body', fontObj.bodyFont);
    try {
      localStorage.setItem('selectedFont', selectedFont);
    } catch (e) {
      console.error('Failed to persist font choice:', e);
    }
  }, [selectedFont]);

  // Display Custom Glass Notification
  const triggerNotification = (text, bulletColor = '#fff') => {
    setNotification({
      active: true,
      text,
      bulletColor
    });

    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        active: false
      }));
    }, 2800);
  };

  // Render current page dynamically
  const renderPage = () => {
    switch (activePage) {
      case 'create':
        return (
          <CreateMemory 
            allMemories={allMemories} 
            setAllMemories={setAllMemories}
            triggerNotification={triggerNotification}
          />
        );
      case 'museum':
        return (
          <MyMuseum 
            allMemories={allMemories}
            setActivePage={setActivePage}
            marbleSettings={marbleSettings}
          />
        );
      case 'settings':
        return (
          <Settings 
            allMemories={allMemories} 
            setAllMemories={setAllMemories}
            userName={userName}
            setUserName={setUserName}
            triggerNotification={triggerNotification}
            marbleSettings={marbleSettings}
            setMarbleSettings={setMarbleSettings}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
          />
        );
      case 'profile':
        return (
          <Profile 
            allMemories={allMemories}
            userName={userName}
          />
        );
      case 'about':
        return <AboutUs />;
      default:
        return (
          <CreateMemory 
            allMemories={allMemories} 
            setAllMemories={setAllMemories}
            triggerNotification={triggerNotification}
          />
        );
    }
  };

  return (
    <div className="app-container museum-theme">
      <PixieDust />
      {/* Top Banner Notification */}
      <div className={`glass-panel notification-banner ${notification.active ? 'active' : ''}`}>
        <span 
          className="notification-bullet" 
          style={{ 
            backgroundColor: notification.bulletColor,
            color: notification.bulletColor
          }} 
        />
        <span>{notification.text}</span>
      </div>

      {/* Header and Drawer Navigations */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />

      {/* Dynamic Main Page Content */}
      <main className="page-content">
        {renderPage()}
      </main>
    </div>
  );
}
