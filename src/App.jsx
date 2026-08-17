import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CreateMemory from './components/CreateMemory';
import MyMuseum from './components/MyMuseum';
import Settings from './components/Settings';
import AboutUs from './components/AboutUs';
import PixieDust from './components/PixieDust';
import './App.css';

export default function App() {
  // Page Routing State: 'create', 'museum', 'settings', 'about'
  const [activePage, setActivePage] = useState('create');
  
  // Memories State
  const [allMemories, setAllMemories] = useState([]);
  
  // Custom Username State
  const [userName, setUserName] = useState('User');

  // Custom Success Banner State
  const [notification, setNotification] = useState({
    active: false,
    text: '',
    bulletColor: '#fff'
  });

  // Load initial data from localStorage
  useEffect(() => {
    try {
      const storedMemories = localStorage.getItem('allmemories');
      if (storedMemories) {
        setAllMemories(JSON.parse(storedMemories));
      }

      const storedOtherData = localStorage.getItem('otherdata');
      if (storedOtherData) {
        const parsed = JSON.parse(storedOtherData);
        if (parsed.userName) {
          setUserName(parsed.userName);
        }
      }
    } catch (e) {
      console.error('Failed to load localStorage data:', e);
    }
  }, []);

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
        allMemories={allMemories}
        userName={userName}
      />

      {/* Dynamic Main Page Content */}
      <main className="page-content">
        {renderPage()}
      </main>
    </div>
  );
}
