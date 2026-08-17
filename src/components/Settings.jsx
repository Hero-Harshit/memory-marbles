import React, { useState, useRef, useEffect } from 'react';
import { EMOTIONS } from '../data/emotions';

export default function Settings({ 
  allMemories, 
  setAllMemories, 
  userName, 
  setUserName, 
  triggerNotification,
  marbleSettings,
  setMarbleSettings
}) {
  const [tempName, setTempName] = useState(userName);
  const fileInputRef = useRef(null);

  // Sync temp name when userName changes externally
  useEffect(() => {
    setTempName(userName);
  }, [userName]);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!tempName.trim()) {
      triggerNotification('Username cannot be empty', '#ef5350');
      return;
    }
    const finalName = tempName.trim();
    setUserName(finalName);
    
    // Save to otherdata localStorage
    const otherData = JSON.parse(localStorage.getItem('otherdata') || '{}');
    otherData.userName = finalName;
    localStorage.setItem('otherdata', JSON.stringify(otherData));
    
    triggerNotification(`Hello, ${finalName}! Profile updated.`, '#66bb6a');
  };

  // Toggle Marble Setting
  const handleToggleSetting = (key) => {
    // Graceful fallback if marbleSettings is undefined
    const currentSettings = marbleSettings || {
      showAuras: true,
      magneticRepulsion: true,
      interactiveGlare: true,
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

  // Calculate stats
  const emotionStats = Object.keys(EMOTIONS).reduce((acc, key) => {
    acc[key] = { count: 0, percent: 0 };
    return acc;
  }, {});

  allMemories.forEach((memory) => {
    if (emotionStats[memory.emotion]) {
      emotionStats[memory.emotion].count += 1;
    }
  });

  const totalCount = allMemories.length;
  if (totalCount > 0) {
    Object.keys(emotionStats).forEach((key) => {
      emotionStats[key].percent = Math.round((emotionStats[key].count / totalCount) * 100);
    });
  }

  return (
    <div className="settings-layout">
      <div className="header-hero">
        <h1>Settings & Dashboard</h1>
        <p>Personalize your mind museum, inspect emotional statistics, and manage your data.</p>
      </div>

      {/* Profile settings */}
      <div className="glass-panel settings-card">
        <form onSubmit={handleSaveName} className="settings-row">
          <div className="settings-info">
            <h3>Mind Identification</h3>
            <p>Customize the owner name of this memory vault.</p>
          </div>
          <div className="settings-input-group">
            <input 
              type="text" 
              className="settings-text-input"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your name"
              maxLength={15}
            />
            <button type="submit" className="btn-premium" style={{ padding: '10px 20px', minWidth: 'auto' }}>
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Stats Dashboard */}
      <div className="glass-panel settings-card">
        <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
          <h3>Emotional Inventory</h3>
          <p>A statistical breakdown of the marbles currently preserved in your core memory shelves.</p>
        </div>
        
        {totalCount === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.6 }}>
            No memories preserved yet. Craft a marble to populate the dashboard!
          </p>
        ) : (
          <div className="stats-container">
            {Object.entries(EMOTIONS).map(([key, emotion]) => {
              const stat = emotionStats[key];
              return (
                <div key={key} className="stat-row">
                  <div className="stat-emotion-name" style={{ color: emotion.accentColor }}>
                    {emotion.name}
                  </div>
                  <div className="stat-progress-bg">
                    <div 
                      className="stat-progress-bar"
                      style={{
                        width: `${stat.percent}%`,
                        '--bg-grad': emotion.gradient,
                        '--glow-color': emotion.glowColor
                      }}
                    />
                  </div>
                  <div className="stat-count-badge" style={{ color: emotion.accentColor }}>
                    {stat.count} ({stat.percent}%)
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          <button 
            type="button" 
            className="btn-premium"
            onClick={() => handleToggleSetting('showAuras')}
            style={{ minWidth: '100px', background: marbleSettings?.showAuras ? 'linear-gradient(135deg, #d4fc79, #96e6a1)' : 'linear-gradient(135deg, #e0e0e0, #cfcfcf)', color: marbleSettings?.showAuras ? '#333' : '#666', transform: 'none' }}
          >
            {marbleSettings?.showAuras ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="settings-row" style={{ marginBottom: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
          <div className="settings-info">
            <h4 style={{ margin: 0, fontWeight: 600 }}>Magnetic Repulsion</h4>
            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Marbles gently float away from your cursor when you move near them.</p>
          </div>
          <button 
            type="button" 
            className="btn-premium"
            onClick={() => handleToggleSetting('magneticRepulsion')}
            style={{ minWidth: '100px', background: marbleSettings?.magneticRepulsion ? 'linear-gradient(135deg, #d4fc79, #96e6a1)' : 'linear-gradient(135deg, #e0e0e0, #cfcfcf)', color: marbleSettings?.magneticRepulsion ? '#333' : '#666', transform: 'none' }}
          >
            {marbleSettings?.magneticRepulsion ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="settings-row" style={{ marginBottom: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
          <div className="settings-info">
            <h4 style={{ margin: 0, fontWeight: 600 }}>Interactive 3D Glare</h4>
            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Marbles physically tilt in 3D space with dynamic glass reflections.</p>
          </div>
          <button 
            type="button" 
            className="btn-premium"
            onClick={() => handleToggleSetting('interactiveGlare')}
            style={{ minWidth: '100px', background: marbleSettings?.interactiveGlare ? 'linear-gradient(135deg, #d4fc79, #96e6a1)' : 'linear-gradient(135deg, #e0e0e0, #cfcfcf)', color: marbleSettings?.interactiveGlare ? '#333' : '#666', transform: 'none' }}
          >
            {marbleSettings?.interactiveGlare ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
          <div className="settings-info">
            <h4 style={{ margin: 0, fontWeight: 600 }}>Random Dancing</h4>
            <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Marbles bob and glow randomly. If disabled, they move in sync.</p>
          </div>
          <button 
            type="button" 
            className="btn-premium"
            onClick={() => handleToggleSetting('randomDancing')}
            style={{ minWidth: '100px', background: marbleSettings?.randomDancing ? 'linear-gradient(135deg, #d4fc79, #96e6a1)' : 'linear-gradient(135deg, #e0e0e0, #cfcfcf)', color: marbleSettings?.randomDancing ? '#333' : '#666', transform: 'none' }}
          >
            {marbleSettings?.randomDancing ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Data management settings */}
      <div className="glass-panel settings-card">
        <div className="settings-row" style={{ marginBottom: '1.5rem' }}>
          <div className="settings-info">
            <h3>Export Collections</h3>
            <p>Download all your precious memory marbles as a secure JSON document. Keep it safe as a backup.</p>
          </div>
          <button 
            type="button" 
            className="btn-premium"
            onClick={handleExport}
            style={{ background: 'linear-gradient(135deg, #e0e0e0, #cfcfcf)' }}
          >
            Export Backup
          </button>
        </div>

        <div className="settings-row" style={{ marginBottom: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
          <div className="settings-info">
            <h3>Import Collections</h3>
            <p>Restore memories from a previously exported JSON backup. (This will overwrite current local memories).</p>
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
            style={{ background: 'linear-gradient(135deg, #d4fc79, #96e6a1)' }}
          >
            Import Backup
          </button>
        </div>

        <div className="settings-row" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
          <div className="settings-info">
            <h3>Marble Reset</h3>
            <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>Deletes all memories from the museum. This action is irreversible.</p>
          </div>
          <button 
            type="button" 
            className="btn-premium"
            onClick={handleClearMuseum}
            style={{ background: 'linear-gradient(135deg, #ffcdd2, #e53935)', color: '#fff' }}
          >
            Marble Massacre
          </button>
        </div>
      </div>
    </div>
  );
}
