import React, { useState, useRef, useEffect } from 'react';
import { FONT_OPTIONS } from '../data/fonts';
import { generateDemoMemories } from '../data/demoData';
import { CONTENT } from '../data/content';

export default function Settings({ 
  allMemories, 
  setAllMemories, 
  userName, 
  setUserName, 
  triggerNotification,
  marbleSettings,
  setMarbleSettings,
  selectedFont,
  setSelectedFont
}) {
  const [tempName, setTempName] = useState(userName);
  const fileInputRef = useRef(null);

  // Sync temp name when userName changes externally
  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setTempName(newName);
    
    // Auto-save logic
    if (newName.trim() !== '') {
      const finalName = newName.trim();
      setUserName(finalName);
      
      const otherData = JSON.parse(localStorage.getItem('otherdata') || '{}');
      otherData.userName = finalName;
      localStorage.setItem('otherdata', JSON.stringify(otherData));
    }
  };

  // Load Demo Data
  const handleLoadDemoData = (mode = 'replace') => {
    const demoMemories = generateDemoMemories();
    let updated;
    if (mode === 'append') {
      updated = [...allMemories, ...demoMemories];
      triggerNotification(`Added 55 demo marbles to your collection!`, '#c084fc');
    } else {
      updated = demoMemories;
      triggerNotification(`Demo Vault Loaded! 55 unique marbles now on display.`, '#69f0ae');
    }
    setAllMemories(updated);
    localStorage.setItem('allmemories', JSON.stringify(updated));
  };

  // Toggle Marble Setting
  const handleToggleSetting = (key) => {
    // Graceful fallback if marbleSettings is undefined
    const currentSettings = marbleSettings || {
      showAuras: true,
      magneticRepulsion: true,
      randomDancing: true
    };
    
    const updated = {
      ...currentSettings,
      [key]: !currentSettings[key]
    };
    setMarbleSettings(updated);
    localStorage.setItem('marbleSettings', JSON.stringify(updated));
    triggerNotification(CONTENT.settings.alerts.settingUpdated, '#66bb6a');
  };

  const handleChangeSetting = (key, value) => {
    const currentSettings = marbleSettings || {};
    const updated = {
      ...currentSettings,
      [key]: value === '' ? '' : Number(value)
    };
    setMarbleSettings(updated);
    localStorage.setItem('marbleSettings', JSON.stringify(updated));
  };

  const handleNumberChange = (key, valStr) => {
    if (valStr === '') {
      handleChangeSetting(key, '');
      return;
    }
    let num = parseInt(valStr, 10);
    if (isNaN(num)) return;
    if (num > 10) num = 10;
    if (num < 0) num = 0;
    handleChangeSetting(key, num);
  };

  // Export JSON
  const handleExport = () => {
    if (allMemories.length === 0) {
      triggerNotification(CONTENT.settings.alerts.exportEmpty, '#ffa726');
      return;
    }

    const exportData = {
      memories: allMemories,
      otherData: { userName }
    };
    
    const file = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    
    const now = new Date();
    const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    link.download = `MyMemories_${dateStr}.json`;
    link.click();
    
    triggerNotification(CONTENT.settings.alerts.exportSuccess, '#66bb6a');
  };

  // Import JSON
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        const importedMemories = importedData.memories || [];
        const importedUserName = importedData.otherData?.userName || userName;

        if (!Array.isArray(importedMemories)) {
          throw new Error('Invalid format: memories should be an array');
        }

        // Merge or overwrite? Let's overwrite and preserve as standard
        setAllMemories(importedMemories);
        setUserName(importedUserName);

        localStorage.setItem('allmemories', JSON.stringify(importedMemories));
        const otherData = { userName: importedUserName };
        localStorage.setItem('otherdata', JSON.stringify(otherData));

        triggerNotification(CONTENT.settings.alerts.importSuccess, '#66bb6a');
      } catch (err) {
        triggerNotification(CONTENT.settings.alerts.importError, '#ef5350');
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be uploaded again if needed
    event.target.value = '';
  };

  const triggerImportClick = () => {
    fileInputRef.current.click();
  };

  // Clear Museum
  const handleClearMuseum = () => {
    const confirmed = window.confirm(
      CONTENT.settings.alerts.clearWarning1
    );
    
    if (confirmed) {
      const doubleConfirmed = window.confirm(
        CONTENT.settings.alerts.clearWarning2
      );
      
      if (doubleConfirmed) {
        setAllMemories([]);
        localStorage.setItem('allmemories', JSON.stringify([]));
        triggerNotification(CONTENT.settings.alerts.clearSuccess, '#ef5350');
      }
    }
  };


  return (
    <div className="settings-layout">
      <div className="header-hero">
        <h1>{CONTENT.settings.heroTitle}</h1>
        <p>{CONTENT.settings.heroSubtitle}</p>
      </div>

      <div className="settings-dashboard-grid">
        {/* Left Column: Personalization & Marble Effects */}
        <div className="settings-column">
          {/* Profile settings */}
          <div className="glass-panel settings-card">
            <div className="settings-row">
              <div className="settings-info">
                <h3>{CONTENT.settings.identification.title}</h3>
                <p>{CONTENT.settings.identification.description}</p>
              </div>
              <div className="settings-input-group">
                <input 
                  type="text" 
                  className="settings-text-input"
                  value={tempName}
                  onChange={handleNameChange}
                  placeholder={CONTENT.settings.identification.placeholder}
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* Marble Customization Settings */}
          <div className="glass-panel settings-card">
            <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <h3>{CONTENT.settings.customization.title}</h3>
              <p>{CONTENT.settings.customization.description}</p>
            </div>
            
            <div className="settings-row" style={{ marginBottom: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.auras.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.auras.description}</p>
              </div>
              <div 
                className={`toggle-switch ${marbleSettings?.showAuras ? 'on' : 'off'}`} 
                onClick={() => handleToggleSetting('showAuras')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className="settings-row" style={{ marginBottom: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.magnetic.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.magnetic.description}</p>
              </div>
              <div 
                className={`toggle-switch ${marbleSettings?.magneticRepulsion ? 'on' : 'off'}`} 
                onClick={() => handleToggleSetting('magneticRepulsion')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.dancing.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.dancing.description}</p>
              </div>
              <div 
                className={`toggle-switch ${marbleSettings?.randomDancing ? 'on' : 'off'}`} 
                onClick={() => handleToggleSetting('randomDancing')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.speed.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.speed.description}</p>
              </div>
              <input 
                type="number" 
                min="0" 
                max="10" 
                className="no-spinners"
                value={marbleSettings?.hoverSpeed !== undefined ? marbleSettings.hoverSpeed : 5} 
                onChange={(e) => handleNumberChange('hoverSpeed', e.target.value)}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '60px', outline: 'none', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'bold' }}
              />
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.intensity.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.intensity.description}</p>
              </div>
              <input 
                type="number" 
                min="0" 
                max="10" 
                className="no-spinners"
                value={marbleSettings?.hoverIntensity !== undefined ? marbleSettings.hoverIntensity : 5} 
                onChange={(e) => handleNumberChange('hoverIntensity', e.target.value)}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '60px', outline: 'none', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'bold' }}
              />
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.size.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.size.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="range"
                  min="1"
                  max="10"
                  value={marbleSettings?.marbleSize !== undefined ? marbleSettings.marbleSize : 5}
                  onChange={(e) => handleNumberChange('marbleSize', e.target.value)}
                  style={{ width: '100px', accentColor: '#c084fc', cursor: 'pointer' }}
                />
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  className="no-spinners"
                  value={marbleSettings?.marbleSize !== undefined ? marbleSettings.marbleSize : 5} 
                  onChange={(e) => handleNumberChange('marbleSize', e.target.value)}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '55px', outline: 'none', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'bold' }}
                />
              </div>
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>{CONTENT.settings.customization.density.title}</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{CONTENT.settings.customization.density.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="range"
                  min="1"
                  max="10"
                  value={marbleSettings?.marbleDensity !== undefined ? marbleSettings.marbleDensity : 5}
                  onChange={(e) => handleNumberChange('marbleDensity', e.target.value)}
                  style={{ width: '100px', accentColor: '#60a5fa', cursor: 'pointer' }}
                />
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  className="no-spinners"
                  value={marbleSettings?.marbleDensity !== undefined ? marbleSettings.marbleDensity : 5} 
                  onChange={(e) => handleNumberChange('marbleDensity', e.target.value)}
                  style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '55px', outline: 'none', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'bold' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Demo Vault & Data Management */}
        <div className="settings-column">
          {/* Demo Showcase Vault */}
          <div className="glass-panel settings-card">
            <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{CONTENT.settings.demo.title}</h3>
                  <p style={{ margin: '5px 0 0 0' }}>{CONTENT.settings.demo.description}</p>
                </div>
                <span 
                  className="preview-tag"
                  style={{ background: 'rgba(192, 132, 252, 0.25)', color: '#e9d5ff', border: '1px solid rgba(192, 132, 252, 0.35)', padding: '4px 12px', borderRadius: '15px' }}
                >
                  {CONTENT.settings.demo.badge}
                </span>
              </div>
            </div>

            <div className="settings-row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
              <p style={{ margin: 0, opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>
                {CONTENT.settings.demo.text}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-premium"
                  onClick={() => handleLoadDemoData('replace')}
                  style={{
                    background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.25) 0%, rgba(192, 132, 252, 0.25) 100%)',
                    borderColor: '#c084fc',
                    color: '#fff',
                    boxShadow: '0 4px 20px rgba(192, 132, 252, 0.25)',
                    flex: '1 1 auto'
                  }}
                >
                  {CONTENT.settings.demo.buttonReplace}
                </button>
                <button
                  type="button"
                  className="btn-premium"
                  onClick={() => handleLoadDemoData('append')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#e2e8f0',
                    flex: '1 1 auto'
                  }}
                >
                  {CONTENT.settings.demo.buttonAppend}
                </button>
              </div>
            </div>
          </div>

          {/* Data management settings */}
          <div className="glass-panel settings-card">
            <div className="settings-row" style={{ marginBottom: '1.5rem' }}>
              <div className="settings-info">
                <h3>{CONTENT.settings.dataManagement.exportTitle}</h3>
                <p>{CONTENT.settings.dataManagement.exportDescription}</p>
              </div>
              <button 
                type="button" 
                className="btn-premium"
                onClick={handleExport}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  color: '#fff', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {CONTENT.settings.dataManagement.exportButton}
              </button>
            </div>

            <div className="settings-row" style={{ marginBottom: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
              <div className="settings-info">
                <h3>{CONTENT.settings.dataManagement.importTitle}</h3>
                <p>{CONTENT.settings.dataManagement.importDescription}</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImport}
                accept=".json"
                style={{ display: 'none' }}
              />
              <button 
                type="button" 
                className="btn-premium"
                onClick={triggerImportClick}
                style={{ 
                  background: 'rgba(105, 240, 174, 0.2)', 
                  color: '#69f0ae', 
                  border: '1px solid rgba(105, 240, 174, 0.3)',
                  boxShadow: '0 4px 15px rgba(105, 240, 174, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {CONTENT.settings.dataManagement.importButton}
              </button>
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
              <div className="settings-info">
                <h3>{CONTENT.settings.dataManagement.resetTitle}</h3>
                <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>{CONTENT.settings.dataManagement.resetDescription}</p>
              </div>
              <button 
                type="button" 
                className="btn-premium"
                onClick={handleClearMuseum}
                style={{ 
                  background: 'rgba(255, 82, 82, 0.2)', 
                  color: '#ff5252', 
                  border: '1px solid rgba(255, 82, 82, 0.3)',
                  boxShadow: '0 4px 15px rgba(255, 82, 82, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {CONTENT.settings.dataManagement.resetButton}
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Row: Typography & Font Style */}
        <div className="settings-card full-width glass-panel" style={{ padding: '2rem' }}>
          <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
            <h3>{CONTENT.settings.typography.title}</h3>
            <p>{CONTENT.settings.typography.description}</p>
          </div>

          <div className="font-options-grid">
            {FONT_OPTIONS.map((font) => {
              const isSelected = (selectedFont || 'cute') === font.id;
              return (
                <div
                  key={font.id}
                  className={`font-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (setSelectedFont) {
                      setSelectedFont(font.id);
                      triggerNotification(`${CONTENT.settings.alerts.themeUpdatedPrefix}${font.name}${CONTENT.settings.alerts.themeUpdatedSuffix}`, '#c084fc');
                    }
                  }}
                >
                  <div className="font-card-header">
                    <span className="font-card-name">{font.name}</span>
                    <span className="font-card-badge">{font.badge}</span>
                  </div>
                  <div 
                    className="font-card-preview" 
                    style={{ fontFamily: font.headingFont }}
                  >
                    {font.preview}
                  </div>
                  <p 
                    className="font-card-sample"
                    style={{ fontFamily: font.bodyFont }}
                  >
                    "{font.sampleText}"
                  </p>
                  <div className="font-card-footer">
                    <span className="font-card-desc">{font.description}</span>
                    <div className="font-radio-indicator">
                      {isSelected && <span className="radio-dot" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
