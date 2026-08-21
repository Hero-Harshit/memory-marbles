import React, { useState, useRef, useEffect } from 'react';
import { FONT_OPTIONS } from '../data/fonts';
import { generateDemoMemories } from '../data/demoData';

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
    triggerNotification(`Setting updated!`, '#66bb6a');
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
      triggerNotification('No memories to export.', '#ffa726');
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
    
    triggerNotification('Memories exported successfully!', '#66bb6a');
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

        triggerNotification('Memories imported successfully!', '#66bb6a');
      } catch (err) {
        triggerNotification('Failed to import: Invalid JSON file structure.', '#ef5350');
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
      "⚠️ WARNING: This will permanently delete all your precious memories. This action CANNOT be undone!\n\nAre you absolutely sure you want to proceed?"
    );
    
    if (confirmed) {
      const doubleConfirmed = window.confirm(
        "🔥 FINAL CONFIRMATION:\nAre you 100% sure? All memory marbles will be shattered forever."
      );
      
      if (doubleConfirmed) {
        setAllMemories([]);
        localStorage.setItem('allmemories', JSON.stringify([]));
        triggerNotification('Museum cleared. All marbles shattered.', '#ef5350');
      }
    }
  };


  return (
    <div className="settings-layout">
      <div className="header-hero">
        <h1>Settings & Dashboard</h1>
        <p>Personalize your mind museum, inspect emotional statistics, and manage your data.</p>
      </div>

      <div className="settings-dashboard-grid">
        {/* Left Column: Personalization & Marble Effects */}
        <div className="settings-column">
          {/* Profile settings */}
          <div className="glass-panel settings-card">
            <div className="settings-row">
              <div className="settings-info">
                <h3>Mind Identification</h3>
                <p>Customize the owner name of this memory vault.</p>
              </div>
              <div className="settings-input-group">
                <input 
                  type="text" 
                  className="settings-text-input"
                  value={tempName}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* Marble Customization Settings */}
          <div className="glass-panel settings-card">
            <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <h3>Marble Customization</h3>
              <p>Toggle the magical effects and interactive features of your memory marbles.</p>
            </div>
            
            <div className="settings-row" style={{ marginBottom: '1rem' }}>
              <div className="settings-info">
                <h4 style={{ margin: 0, fontWeight: 600 }}>Emotion Auras</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Show floating magical dust orbiting around each marble.</p>
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
                <h4 style={{ margin: 0, fontWeight: 600 }}>Magnetic Repulsion</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Marbles gently float away from your cursor when you move near them.</p>
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
                <h4 style={{ margin: 0, fontWeight: 600 }}>Random Dancing</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Marbles bob and glow randomly. If disabled, they move in sync.</p>
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
                <h4 style={{ margin: 0, fontWeight: 600 }}>Hovering Speed</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>How fast the marbles move (0 to 10).</p>
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
                <h4 style={{ margin: 0, fontWeight: 600 }}>Hovering Intensity</h4>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>How far the marbles move (0 to 10).</p>
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
          </div>
        </div>

        {/* Right Column: Demo Vault & Data Management */}
        <div className="settings-column">
          {/* Demo Showcase Vault */}
          <div className="glass-panel settings-card">
            <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>🔮 Demo Showcase Vault</h3>
                  <p style={{ margin: '5px 0 0 0' }}>Populate your museum with sample memories to inspect all marble combinations.</p>
                </div>
                <span 
                  className="preview-tag"
                  style={{ background: 'rgba(192, 132, 252, 0.25)', color: '#e9d5ff', border: '1px solid rgba(192, 132, 252, 0.35)', padding: '4px 12px', borderRadius: '15px' }}
                >
                  55 Total Combinations
                </span>
              </div>
            </div>

            <div className="settings-row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
              <p style={{ margin: 0, opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.5' }}>
                Generates <strong>10 pure emotion marbles</strong> and all <strong>45 dual-emotion hybrid swirl combinations</strong> with tailored stories and emotional narratives.
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
                  ✨ Load Complete Vault (55)
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
                  ➕ Append to Existing
                </button>
              </div>
            </div>
          </div>

          {/* Data management settings */}
          <div className="glass-panel settings-card">
            <div className="settings-row" style={{ marginBottom: '1.5rem' }}>
              <div className="settings-info">
                <h3>Export Collections</h3>
                <p>Download all your memory marbles as a secure JSON document.</p>
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
                Export Backup
              </button>
            </div>

            <div className="settings-row" style={{ marginBottom: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
              <div className="settings-info">
                <h3>Import Collections</h3>
                <p>Restore memories from a previously exported JSON backup.</p>
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
                Import Backup
              </button>
            </div>

            <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
              <div className="settings-info">
                <h3>Marble Reset</h3>
                <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>Deletes all memories from the museum.</p>
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
                Marble Massacre
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Row: Typography & Font Style */}
        <div className="settings-card full-width glass-panel" style={{ padding: '2rem' }}>
          <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
            <h3>Typography & Font Style</h3>
            <p>Choose a charming theme for titles, notes, and headings across your memory museum.</p>
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
                      triggerNotification(`Theme font set to ${font.name}!`, '#c084fc');
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
