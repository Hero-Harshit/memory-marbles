import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EMOTIONS, getHybridDetails } from '../data/emotions';
import logoImg from '../assets/logo.png';
import { CONTENT } from '../data/content';

export default function MyMuseum({ allMemories = [], setActivePage, marbleSettings }) {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all'); // 'all', 'pure', 'hybrid'
  const [selectedEra, setSelectedEra] = useState('all'); // 'all', 'io1', 'io2'
  const [selectedEmotionFilter, setSelectedEmotionFilter] = useState('all'); // 'all', or emotion id
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
  const [activeModalMemory, setActiveModalMemory] = useState(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // If interactive settings are explicitly disabled, don't run mouse tracking
    if (marbleSettings?.magneticRepulsion === false) {
      if (containerRef.current) {
        const marbles = containerRef.current.querySelectorAll('.marble-container');
        marbles.forEach((marble) => {
          marble.style.transform = '';
        });
      }
      return;
    }

    let isScheduled = false;

    const updateRepulsion = () => {
      isScheduled = false;
      if (!containerRef.current) return;

      const marbles = containerRef.current.querySelectorAll('.marble-container');
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const maxDistance = 150;

      for (let i = 0; i < marbles.length; i++) {
        const marble = marbles[i];
        const rect = marble.getBoundingClientRect();
        const marbleX = rect.left + rect.width / 2;
        const marbleY = rect.top + rect.height / 2;

        const deltaX = mouseX - marbleX;
        const deltaY = mouseY - marbleY;
        const distSq = deltaX * deltaX + deltaY * deltaY;

        if (distSq < maxDistance * maxDistance && distSq > 0) {
          const distance = Math.sqrt(distSq);
          const force = (maxDistance - distance) / maxDistance;
          const pushX = -(deltaX / distance) * force * 40;
          const pushY = -(deltaY / distance) * force * 40;

          marble.style.transform = `translate3d(${pushX.toFixed(1)}px, ${pushY.toFixed(1)}px, 0)`;
        } else if (marble.style.transform && marble.style.transform !== 'translate3d(0px, 0px, 0px)') {
          marble.style.transform = 'translate3d(0px, 0px, 0px)';
        }
      }
    };

    const handleMouseMove = (e) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;

      if (!isScheduled) {
        isScheduled = true;
        rafRef.current = requestAnimationFrame(updateRepulsion);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [marbleSettings?.magneticRepulsion]);

  // Apply filters and sorting with useMemo
  const sortedMemories = useMemo(() => {
    const filtered = allMemories.filter((memory) => {
      const primaryEmotion = EMOTIONS[memory.emotion];
      if (!primaryEmotion) return false;

      const isHybrid = Boolean(memory.secondaryEmotion && EMOTIONS[memory.secondaryEmotion]);

      // Type filter
      if (selectedTypeFilter === 'pure' && isHybrid) return false;
      if (selectedTypeFilter === 'hybrid' && !isHybrid) return false;

      // Era filter
      const matchesEra = selectedEra === 'all' || 
        primaryEmotion.era === selectedEra || 
        (isHybrid && EMOTIONS[memory.secondaryEmotion]?.era === selectedEra);

      // Emotion filter (matches either primary or secondary)
      const matchesEmotion = selectedEmotionFilter === 'all' || 
        memory.emotion === selectedEmotionFilter || 
        memory.secondaryEmotion === selectedEmotionFilter;

      return matchesEra && matchesEmotion;
    });

    return filtered.sort((a, b) => {
      return sortBy === 'newest' ? b.date - a.date : a.date - b.date;
    });
  }, [allMemories, selectedTypeFilter, selectedEra, selectedEmotionFilter, sortBy]);

  // Stable seeded random for animations based on timestamp
  const getSeededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const handleOpenModal = (memory) => {
    setActiveModalMemory(memory);
  };

  const handleCloseModal = () => {
    setActiveModalMemory(null);
  };

  const activeModalDetails = useMemo(() => {
    return activeModalMemory 
      ? getHybridDetails(activeModalMemory.emotion, activeModalMemory.secondaryEmotion) 
      : null;
  }, [activeModalMemory]);

  return (
    <div className="museum-gallery museum-scrollbar" ref={containerRef}>
      <div className="stardust-bg" />

      <div className="header-hero">
        <div className="header-hero-title-wrap">
          <h1>{CONTENT.myMuseum.heroTitle}</h1>
        </div>
        <p>{CONTENT.myMuseum.heroSubtitle}</p>
      </div>

      {/* Modern Filter Dashboard */}
      <div className="museum-filters">
        {/* Type Filter: All / Pure / Hybrid */}
        <div className="filter-group">
          <span className="filter-label">{CONTENT.myMuseum.filters.formLabel}</span>
          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${selectedTypeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTypeFilter('all')}
            >
              {CONTENT.myMuseum.filters.formOptions.all}
            </button>
            <button
              type="button"
              className={`filter-tab ${selectedTypeFilter === 'pure' ? 'active' : ''}`}
              onClick={() => setSelectedTypeFilter('pure')}
            >
              {CONTENT.myMuseum.filters.formOptions.pure}
            </button>
            <button
              type="button"
              className={`filter-tab ${selectedTypeFilter === 'hybrid' ? 'active' : ''}`}
              onClick={() => setSelectedTypeFilter('hybrid')}
            >
              {CONTENT.myMuseum.filters.formOptions.hybrid}
            </button>
          </div>
        </div>

        {/* Era Filter */}
        <div className="filter-group">
          <span className="filter-label">{CONTENT.myMuseum.filters.eraLabel}</span>
          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${selectedEra === 'all' ? 'active' : ''}`}
              onClick={() => { setSelectedEra('all'); setSelectedEmotionFilter('all'); }}
            >
              {CONTENT.myMuseum.filters.eraOptions.all}
            </button>
            <button
              type="button"
              className={`filter-tab ${selectedEra === 'io1' ? 'active' : ''}`}
              onClick={() => { setSelectedEra('io1'); setSelectedEmotionFilter('all'); }}
            >
              {CONTENT.myMuseum.filters.eraOptions.io1}
            </button>
            <button
              type="button"
              className={`filter-tab ${selectedEra === 'io2' ? 'active' : ''}`}
              onClick={() => { setSelectedEra('io2'); setSelectedEmotionFilter('all'); }}
            >
              {CONTENT.myMuseum.filters.eraOptions.io2}
            </button>
          </div>
        </div>

        {/* Specific Emotion Filter */}
        <div className="filter-group">
          <span className="filter-label">{CONTENT.myMuseum.filters.chamberLabel}</span>
          <select
            className="filter-select"
            value={selectedEmotionFilter}
            onChange={(e) => setSelectedEmotionFilter(e.target.value)}
          >
            <option value="all">{CONTENT.myMuseum.filters.chamberAll}</option>
            {Object.values(EMOTIONS)
              .filter((e) => selectedEra === 'all' || e.era === selectedEra)
              .map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </option>
              ))
            }
          </select>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <span className="filter-label">{CONTENT.myMuseum.filters.sortLabel}</span>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">{CONTENT.myMuseum.filters.sortOptions.newest}</option>
            <option value="oldest">{CONTENT.myMuseum.filters.sortOptions.oldest}</option>
          </select>
        </div>
      </div>

      {/* Shelves Layout */}
      {allMemories.length === 0 ? (
        <div className="empty-museum-message">
          <h3>{CONTENT.myMuseum.emptyMuseum.title}</h3>
          <p>{CONTENT.myMuseum.emptyMuseum.description}</p>
          <button
            type="button"
            className="btn-premium"
            onClick={() => setActivePage('create')}
          >
            {CONTENT.myMuseum.emptyMuseum.button}
          </button>
        </div>
      ) : sortedMemories.length === 0 ? (
        <div className="empty-museum-message">
          <h3>{CONTENT.myMuseum.emptyFilter.title}</h3>
          <p>{CONTENT.myMuseum.emptyFilter.description}</p>
          <button
            type="button"
            className="btn-premium"
            onClick={() => { setSelectedTypeFilter('all'); setSelectedEra('all'); setSelectedEmotionFilter('all'); }}
          >
            {CONTENT.myMuseum.emptyFilter.button}
          </button>
        </div>
      ) : (
        <div className="museum-shelves-container">
          <div className="museum-shelf">
            <div className="shelf-title" style={{ color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              {CONTENT.myMuseum.shelfTitlePrefix} ({sortedMemories.length})
            </div>

            {/* Marble Size & Density Calculations */}
            {(() => {
              const mSize = marbleSettings?.marbleSize !== undefined ? Number(marbleSettings.marbleSize) : 5;
              const marblePixelSize = Math.round(44 + (mSize * 6.4));
              const mDensity = marbleSettings?.marbleDensity !== undefined ? Number(marbleSettings.marbleDensity) : 5;
              const rowGap = Math.max(10, Math.round(52 - ((mDensity - 1) * 4.4))) + 'px';
              const marbleMarginH = Math.max(4, Math.round(18 - ((mDensity - 1) * 1.5))) + 'px';

              return (
                <div className="shelf-marbles-row" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: rowGap }}>
                  {sortedMemories.map((memory, index) => {
                    const hybridData = getHybridDetails(memory.emotion, memory.secondaryEmotion);

                    // Generate random but stable animation values for each marble
                    const seed = memory.date;
                    const rand1 = getSeededRandom(seed);
                    const rand2 = getSeededRandom(seed + 1);
                    const rand3 = getSeededRandom(seed + 2);
                    const rand4 = getSeededRandom(seed + 3);

                    const isRandomDancing = marbleSettings?.randomDancing !== false;
                    const hSpeed = marbleSettings?.hoverSpeed !== undefined ? Number(marbleSettings.hoverSpeed) : 5;
                    const hIntens = marbleSettings?.hoverIntensity !== undefined ? Number(marbleSettings.hoverIntensity) : 5;

                    const baseFloatDur = isRandomDancing ? (4 + (rand1 * 4)) : 6.0;
                    const speedMult = hSpeed / 5;
                    const floatDur = speedMult > 0 ? (baseFloatDur / speedMult).toFixed(2) : "1.00";
                    
                    const baseDel = isRandomDancing ? (rand2 * -5) : 0;
                    const floatDel = speedMult > 0 ? (baseDel / speedMult).toFixed(2) : "0.00";

                    const pulseDur = isRandomDancing ? (2 + (rand3 * 3)).toFixed(2) : "3.00";
                    const sparkleDel = isRandomDancing ? (rand4 * 8).toFixed(2) : "2.00";

                    const ampY = (hIntens / 5) * 8;
                    const ampRot = (hIntens / 5) * 4;
                    const hoverY = (hSpeed === 0 || hIntens === 0) ? "0px" : `-${ampY.toFixed(2)}px`;
                    const hoverRot = (hSpeed === 0 || hIntens === 0) ? "0deg" : `${ampRot.toFixed(2)}deg`;

                    return (
                      <div
                        key={`${memory.date}-${memory.emotion}-${memory.secondaryEmotion || 'pure'}-${index}`}
                        className="marble-container"
                        onClick={() => handleOpenModal(memory)}
                        style={{ margin: `15px ${marbleMarginH}` }}
                      >
                        {marbleSettings?.showAuras !== false && (
                          <div className={`marble-auras aura-${hybridData.primary.id}`}>
                            {[...Array(6)].map((_, i) => {
                              const pRand1 = getSeededRandom(seed + i * 10);
                              const pRand2 = getSeededRandom(seed + i * 20);
                              const pRand3 = getSeededRandom(seed + i * 30);
                              
                              const duration = (2 + pRand1 * 4).toFixed(2);
                              const delay = (pRand2 * -5).toFixed(2);
                              const distance = (30 + pRand3 * 20).toFixed(2);
                              
                              // If hybrid, alternate particle colors between primary and secondary
                              const particleColor = (hybridData.isHybrid && i % 2 === 1) 
                                ? hybridData.secondaryColor 
                                : hybridData.color;

                              return (
                                <div 
                                  key={i} 
                                  className="aura-particle" 
                                  style={{ 
                                    '--p-idx': i, 
                                    '--p-dur': `${duration}s`,
                                    '--p-del': `${delay}s`,
                                    '--p-dist': `${distance}px`,
                                    backgroundColor: particleColor,
                                    boxShadow: `0 0 10px ${particleColor}`
                                  }} 
                                />
                              );
                            })}
                          </div>
                        )}
                        <div
                          className={`marble-3d ${hybridData.isHybrid ? 'hybrid-swirl-orb' : ''}`}
                          style={{
                            width: `${marblePixelSize}px`,
                            height: `${marblePixelSize}px`,
                            '--bg-grad': hybridData.gradient,
                            '--glow-color': hybridData.glowColor,
                            '--float-dur': `${floatDur}s`,
                            '--float-del': `${floatDel}s`,
                            '--hover-y': hoverY,
                            '--hover-rot': hoverRot,
                            '--pulse-dur': `${pulseDur}s`,
                            '--sparkle-del': `${sparkleDel}s`,
                          }}
                        >
                          <div className="marble-sparkle" />
                          <div className="marble-core" />
                        </div>
                        <span 
                          className="marble-label" 
                          style={{ 
                            color: hybridData.accentColor, 
                            fontSize: `${Math.max(0.72, 0.72 + (mSize - 5) * 0.025).toFixed(2)}rem`,
                            maxWidth: `${Math.max(85, marblePixelSize + 25)}px`
                          }}
                        >
                          {hybridData.isHybrid ? `🌀 ${hybridData.title}` : new Date(memory.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            <div className="shelf-wood" />
          </div>
        </div>
      )}

      {/* High Fidelity Glassmorphic Modal Card via Portal */}
      {createPortal(
        <div
          className={`modal-overlay ${activeModalMemory ? 'active' : ''}`}
          onClick={handleCloseModal}
          style={{
            '--glow-color': activeModalDetails ? activeModalDetails.glowColor : 'rgba(255,255,255,0.2)'
          }}
        >
          {activeModalMemory && activeModalDetails && (
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                '--label-color': activeModalDetails.accentColor
              }}
            >
              <button
                className="modal-close-btn"
                onClick={handleCloseModal}
              >
                ✕
              </button>

              <div className="modal-header-badges" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <span 
                  className="preview-tag"
                  style={{ background: activeModalDetails.primary.color + '33', color: activeModalDetails.primary.accentColor, padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold' }}
                >
                  {activeModalDetails.primary.label}
                </span>
                {activeModalDetails.secondary && (
                  <>
                    <span style={{ opacity: 0.6 }}>+</span>
                    <span 
                      className="preview-tag"
                      style={{ background: activeModalDetails.secondary.color + '33', color: activeModalDetails.secondary.accentColor, padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold' }}
                    >
                      {activeModalDetails.secondary.label}
                    </span>
                  </>
                )}
              </div>

              <h2 className="modal-emotion-title" style={{ fontSize: '1.8rem' }}>
                {activeModalDetails.title}
                {activeModalDetails.subtitle && (
                  <span style={{ fontSize: '1rem', opacity: 0.7, fontWeight: 'normal', marginLeft: '10px' }}>
                    ({activeModalDetails.subtitle})
                  </span>
                )}
              </h2>

              <div className="modal-date" style={{ marginTop: '5px' }}>
                {CONTENT.myMuseum.modal.preservedOnPrefix}{new Date(activeModalMemory.date).toLocaleString()}
              </div>

              {activeModalMemory.title && (
                <h3 className="modal-memory-title" style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: '#fff', fontSize: '1.4rem' }}>
                  {activeModalMemory.title}
                </h3>
              )}
              <p className="modal-description" style={{ marginTop: '1rem', lineHeight: '1.7', fontSize: '1.1rem' }}>
                {activeModalMemory.description}
              </p>

              {activeModalDetails.isHybrid && (
                <div style={{ marginTop: '1.5rem', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8, fontStyle: 'italic' }}>
                    "{activeModalDetails.description}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
