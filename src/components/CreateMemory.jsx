import React, { useState } from 'react';
import { EMOTIONS, getHybridDetails } from '../data/emotions';
import logoImg from '../assets/logo.png';
import { CONTENT } from '../data/content';

export default function CreateMemory({ allMemories, setAllMemories, triggerNotification }) {
  const [activeTab, setActiveTab] = useState('io1'); // 'io1' or 'io2'
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [isHybrid, setIsHybrid] = useState(false);
  const [secondaryTab, setSecondaryTab] = useState('io1');
  const [secondaryEmotion, setSecondaryEmotion] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Filter emotions based on tabs
  const tabEmotions = Object.values(EMOTIONS).filter(
    (emotion) => emotion.era === activeTab
  );

  const secondaryTabEmotions = Object.values(EMOTIONS).filter(
    (emotion) => emotion.era === secondaryTab
  );

  const handleEmotionSelect = (emotionId) => {
    setSelectedEmotion(emotionId);
    if (secondaryEmotion === emotionId) {
      setSecondaryEmotion(null);
    }
    setErrorMsg('');
  };

  const handleSecondarySelect = (emotionId) => {
    if (emotionId === selectedEmotion) return; // Prevent picking exact same
    if (secondaryEmotion === emotionId) {
      setSecondaryEmotion(null); // Toggle off
    } else {
      setSecondaryEmotion(emotionId);
    }
    setErrorMsg('');
  };

  const hybridMeta = getHybridDetails(selectedEmotion || 'joy', isHybrid ? secondaryEmotion : null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmotion) {
      setErrorMsg(CONTENT.createMemory.errors.missingPrimary);
      return;
    }

    if (isHybrid && !secondaryEmotion) {
      setErrorMsg(CONTENT.createMemory.errors.missingSecondary);
      return;
    }

    if (!title.trim()) {
      setErrorMsg(CONTENT.createMemory.errors.missingTitle);
      return;
    }

    if (!description.trim()) {
      setErrorMsg(CONTENT.createMemory.errors.missingDescription);
      return;
    }

    const newMemory = {
      emotion: selectedEmotion,
      secondaryEmotion: isHybrid && secondaryEmotion ? secondaryEmotion : null,
      title: title.trim(),
      description: description.trim(),
      date: Date.now(),
    };

    const updatedMemories = [...allMemories, newMemory];
    setAllMemories(updatedMemories);
    localStorage.setItem('allmemories', JSON.stringify(updatedMemories));

    // Reset Form
    setSelectedEmotion(null);
    setSecondaryEmotion(null);
    setIsHybrid(false);
    setTitle('');
    setDescription('');
    setErrorMsg('');

    // Trigger Success Banner
    const notifMsg = newMemory.secondaryEmotion 
      ? `${CONTENT.createMemory.notifications.hybridSuccessPrefix}${hybridMeta.title}${CONTENT.createMemory.notifications.hybridSuccessSuffix}`
      : CONTENT.createMemory.notifications.pureSuccess;
    triggerNotification(notifMsg, EMOTIONS[newMemory.emotion].color);
  };

  const selectedEmotionData = selectedEmotion ? EMOTIONS[selectedEmotion] : null;
  const secondaryEmotionData = (isHybrid && secondaryEmotion) ? EMOTIONS[secondaryEmotion] : null;

  return (
    <div className="create-memory-section">
      <div className="header-hero" style={{ marginBottom: '2rem' }}>
        <div className="header-hero-title-wrap">
          <h1>{CONTENT.createMemory.heroTitle}</h1>
        </div>
        <p>{CONTENT.createMemory.heroSubtitle}</p>
      </div>

      <div className="create-memory-dashboard">
        {/* Left Panel: Emotion Selector & Hybrid Mixer */}
        <div className="emotion-selector-panel glass-panel">
          <div className="emotion-select-header-box">
            <h3 className="emotion-select-header">
              {selectedEmotionData 
                ? `${CONTENT.createMemory.stepOneSelectedPrefix}${selectedEmotionData.name}` 
                : CONTENT.createMemory.stepOneDefault
              }
            </h3>
          </div>

          {/* Primary Tabs */}
          <div className="emotion-tabs-row">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'io1' ? 'active' : ''}`}
              onClick={() => setActiveTab('io1')}
            >
              {CONTENT.createMemory.tabsIO1}
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'io2' ? 'active' : ''}`}
              onClick={() => setActiveTab('io2')}
            >
              {CONTENT.createMemory.tabsIO2}
            </button>
          </div>

          {/* Primary Emotions Grid */}
          <div className="emotions-grid">
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

          {/* Hybrid Mode Toggle Switch */}
          <div className="hybrid-toggle-banner" style={{ marginTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsHybrid(!isHybrid)}>
              <div>
                <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                  {CONTENT.createMemory.hybridToggleTitle}
                </h4>
                <p style={{ margin: '3px 0 0 0', opacity: 0.7, fontSize: '0.8rem' }}>
                  {CONTENT.createMemory.hybridToggleSubtitle}
                </p>
              </div>
              <div className={`toggle-switch ${isHybrid ? 'on' : 'off'}`}>
                <div className="toggle-knob"></div>
              </div>
            </div>

            {/* Secondary Emotion Selector (when Hybrid is on) */}
            {isHybrid && (
              <div className="secondary-emotion-picker" style={{ marginTop: '1.25rem', animation: 'fadeIn 0.3s ease' }}>
                <div className="emotion-tabs-row" style={{ marginBottom: '10px' }}>
                  <button
                    type="button"
                    className={`tab-btn ${secondaryTab === 'io1' ? 'active' : ''}`}
                    onClick={() => setSecondaryTab('io1')}
                    style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                  >
                    {CONTENT.createMemory.secondaryTabsIO1}
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${secondaryTab === 'io2' ? 'active' : ''}`}
                    onClick={() => setSecondaryTab('io2')}
                    style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                  >
                    {CONTENT.createMemory.secondaryTabsIO2}
                  </button>
                </div>

                <div className="emotions-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(65px, 1fr))', gap: '8px' }}>
                  {secondaryTabEmotions.map((emotion) => {
                    const isSelected = secondaryEmotion === emotion.id;
                    const isPrimary = selectedEmotion === emotion.id;
                    return (
                      <button
                        key={emotion.id}
                        type="button"
                        disabled={isPrimary}
                        className={`emotion-card mini ${isSelected ? 'selected' : ''} ${isPrimary ? 'disabled' : ''}`}
                        style={{
                          '--glow-color': emotion.glowColor,
                          '--label-color': emotion.accentColor,
                          opacity: isPrimary ? 0.3 : 1
                        }}
                        onClick={() => handleSecondarySelect(emotion.id)}
                        title={isPrimary ? 'Already chosen as primary' : `Blend with ${emotion.name}`}
                      >
                        <div className="emotion-img-wrapper" style={{ width: '36px', height: '36px' }}>
                          <img src={emotion.image} alt={emotion.name} />
                        </div>
                        <span className="emotion-label" style={{ fontSize: '0.7rem' }}>{emotion.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Memory Composer with Live Swirl Preview */}
        <form 
          className={`memory-composer-panel glass-panel ${selectedEmotion ? `active-emotion-${selectedEmotion}` : ''}`}
          style={{ 
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
          onSubmit={handleSubmit}
        >
          {/* Real-time Interactive Marble Preview Box */}
          <div className="live-marble-preview-card">
            <div className="preview-marble-stage">
              <div 
                className={`marble-3d live-preview-orb ${hybridMeta.isHybrid ? 'hybrid-swirl-orb' : ''}`}
                style={{
                  '--bg-grad': hybridMeta.gradient,
                  '--glow-color': hybridMeta.isHybrid ? 'rgba(255, 255, 255, 0.4)' : hybridMeta.glowColor,
                  '--primary-color': hybridMeta.color,
                  '--secondary-color': hybridMeta.secondaryColor || hybridMeta.color
                }}
              >
                <div className="marble-sparkle" />
                <div className="marble-core" />
              </div>
            </div>

            <div className="preview-marble-details">
              <div className="preview-badge-row">
                <span className="preview-tag primary" style={{ background: hybridMeta.primary.color + '33', color: hybridMeta.primary.accentColor }}>
                  {hybridMeta.primary.label}
                </span>
                {hybridMeta.secondary && (
                  <>
                    <span className="preview-plus">+</span>
                    <span className="preview-tag secondary" style={{ background: hybridMeta.secondary.color + '33', color: hybridMeta.secondary.accentColor }}>
                      {hybridMeta.secondary.label}
                    </span>
                  </>
                )}
              </div>

              <h3 className="preview-hybrid-title">
                {hybridMeta.title}
                {hybridMeta.subtitle && <span className="preview-subtitle"> • {hybridMeta.subtitle}</span>}
              </h3>
              <p className="preview-hybrid-desc">{hybridMeta.description}</p>
            </div>
          </div>

          <div className="textarea-wrapper" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              className="memory-title-input"
              placeholder={CONTENT.createMemory.inputTitlePlaceholder}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrorMsg('');
              }}
              style={{
                '--focus-color': hybridMeta.primary.color,
                '--focus-glow': hybridMeta.primary.glowColor
              }}
            />
            <textarea
              className="description-textarea"
              placeholder={
                selectedEmotionData
                  ? `${CONTENT.createMemory.textareaPlaceholderPrefix}${hybridMeta.title}${CONTENT.createMemory.textareaPlaceholderSuffix}`
                  : CONTENT.createMemory.textareaPlaceholderDefault
              }
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrorMsg('');
              }}
              style={{
                '--focus-color': hybridMeta.primary.color,
                '--focus-glow': hybridMeta.primary.glowColor,
                flexGrow: 1,
                minHeight: '160px',
                fontSize: '1.05rem',
                lineHeight: '1.6'
              }}
            />
          </div>

          {/* Dynamic Error Container */}
          <div className={`error-container ${errorMsg ? 'show' : ''}`} style={{ textAlign: 'center' }}>
            {errorMsg}
          </div>

          {/* Submit Button */}
          <div className="submit-btn-row" style={{ marginTop: 'auto' }}>
            <button
              type="submit"
              className="submit-btn btn-premium"
              style={{ 
                width: '100%', 
                maxWidth: '320px',
                borderColor: hybridMeta.primary.color,
                boxShadow: `0 8px 25px ${hybridMeta.primary.glowColor}`
              }}
            >
              {hybridMeta.isHybrid ? CONTENT.createMemory.submitBtnHybrid : CONTENT.createMemory.submitBtnPure}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

