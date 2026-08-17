import React, { useState } from 'react';
import { EMOTIONS } from '../data/emotions';

export default function CreateMemory({ allMemories, setAllMemories, triggerNotification }) {
  const [activeTab, setActiveTab] = useState('io1'); // 'io1' or 'io2'
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Filter emotions based on tab
  const tabEmotions = Object.values(EMOTIONS).filter(
    (emotion) => emotion.era === activeTab
  );

  const handleEmotionSelect = (emotionId) => {
    setSelectedEmotion(emotionId);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmotion) {
      setErrorMsg('Please select an emotion for your memory marble.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('Please describe your memory before preserving it.');
      return;
    }

    const newMemory = {
      emotion: selectedEmotion,
      description: description.trim(),
      date: Date.now(),
    };

    const updatedMemories = [...allMemories, newMemory];
    setAllMemories(updatedMemories);
    localStorage.setItem('allmemories', JSON.stringify(updatedMemories));

    // Reset Form
    setSelectedEmotion(null);
    setDescription('');
    setErrorMsg('');

    // Trigger Success Banner
    triggerNotification(`Memory added to your museum!`, EMOTIONS[newMemory.emotion].color);
  };

  const selectedEmotionData = selectedEmotion ? EMOTIONS[selectedEmotion] : null;

  return (
    <div className="create-memory-section">
      <div className="header-hero" style={{ marginBottom: '2rem' }}>
        <h1>Create A Memory Marble</h1>
        <p>Your created memory will be displayed at your personal museum.</p>
      </div>

      <div className="create-memory-dashboard">
        {/* Left Panel: Emotion Selector */}
        <div className="emotion-selector-panel glass-panel">
          <h3 className="emotion-select-header">
            {selectedEmotionData 
              ? `Holding a ${selectedEmotionData.name} marble...` 
              : 'Select an emotion'
            }
          </h3>

          {/* Tabs for Inside Out 1 and 2 */}
          <div className="emotion-tabs-row">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'io1' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('io1');
                setSelectedEmotion(null);
                setErrorMsg('');
              }}
            >
              Inside Out 1
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'io2' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('io2');
                setSelectedEmotion(null);
                setErrorMsg('');
              }}
            >
              Inside Out 2
            </button>
          </div>

          {/* Emotions Buttons Grid */}
          <div className="emotions-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
            {tabEmotions.map((emotion) => {
              const isSelected = selectedEmotion === emotion.id;
              return (
                <button
                  key={emotion.id}
                  type="button"
                  className={`emotion-card ${isSelected ? 'selected' : ''}`}
                  style={{
                    '--glow-color': emotion.glowColor,
                    '--label-color': emotion.accentColor,
                  }}
                  onClick={() => handleEmotionSelect(emotion.id)}
                  aria-label={`Select ${emotion.name}`}
                >
                  <div className="emotion-img-wrapper">
                    <img src={emotion.image} alt={emotion.name} />
                  </div>
                  <span className="emotion-label">{emotion.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom explanation of selected emotion */}
          {selectedEmotionData && (
            <p 
              style={{ 
                textAlign: 'center', 
                fontSize: '0.9rem', 
                fontStyle: 'italic', 
                marginTop: '1.5rem',
                color: selectedEmotionData.accentColor,
                animation: 'fadeIn 0.4s ease'
              }}
            >
              {selectedEmotionData.description}
            </p>
          )}
        </div>

        {/* Right Panel: Memory Composer */}
        <form 
          className={`memory-composer-panel glass-panel ${selectedEmotion ? `active-emotion-${selectedEmotion}` : ''}`}
          style={{ 
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column'
          }}
          onSubmit={handleSubmit}
        >
          <h3 className="emotion-select-header" style={{ marginBottom: '1.5rem' }}>
            Preserve the moment
          </h3>

          <div className="textarea-wrapper" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <textarea
              className="description-textarea"
              placeholder={
                selectedEmotionData
                  ? `Write down your ${selectedEmotionData.name} memory...`
                  : "How does it feel today? Describe your memory..."
              }
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrorMsg('');
              }}
              style={{
                '--focus-color': selectedEmotionData ? selectedEmotionData.color : '#fcb69f',
                '--focus-glow': selectedEmotionData ? selectedEmotionData.glowColor : 'rgba(252, 182, 159, 0.3)',
                flexGrow: 1,
                minHeight: '250px',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}
            />
          </div>

          {/* Dynamic Error Container */}
          <div className={`error-container ${errorMsg ? 'show' : ''}`} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            {errorMsg}
          </div>

          {/* Submit Button */}
          <div className="submit-btn-row" style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <button
              type="submit"
              className={`submit-btn btn-premium ${selectedEmotion ? selectedEmotion : ''}`}
              style={{ width: '100%', maxWidth: '300px' }}
            >
              Preserve Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
