import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { EMOTIONS } from '../data/emotions';

export default function MyMuseum({ allMemories, setActivePage, marbleSettings }) {
  const [selectedEra, setSelectedEra] = useState('all'); // 'all', 'io1', 'io2'
  const [selectedEmotionFilter, setSelectedEmotionFilter] = useState('all'); // 'all', or emotion id
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
  const [activeModalMemory, setActiveModalMemory] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // If both interactive settings are explicitly disabled, don't run heavy mouse tracking
    if (marbleSettings?.magneticRepulsion === false && marbleSettings?.interactiveGlare === false) {
      // Clean up any existing transforms before returning
      if (containerRef.current) {
        const marbles = containerRef.current.querySelectorAll('.marble-container');
        marbles.forEach(marble => {
          marble.style.transform = `translate(0px, 0px) perspective(400px) rotateX(0deg) rotateY(0deg)`;
          const marble3d = marble.querySelector('.marble-3d');
          if (marble3d) {
            marble3d.style.setProperty('--glare-x', `0px`);
            marble3d.style.setProperty('--glare-y', `0px`);
          }
        });
      }
      return;
    }

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const marbles = containerRef.current.querySelectorAll('.marble-container');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      marbles.forEach(marble => {
        const rect = marble.getBoundingClientRect();
        // Calculate the center of the marble
        const marbleX = rect.left + rect.width / 2;
        const marbleY = rect.top + rect.height / 2;
        
        const deltaX = mouseX - marbleX;
        const deltaY = mouseY - marbleY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Repulsion radius and max force
        const maxDistance = 150; 
        
        const marble3d = marble.querySelector('.marble-3d');
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          
          // Apply magnetic repulsion if enabled
          let pushX = 0, pushY = 0;
          if (marbleSettings?.magneticRepulsion !== false) {
            pushX = -(deltaX / distance) * force * 40; 
            pushY = -(deltaY / distance) * force * 40;
          }
          
          // Apply 3D tilt if enabled
          let tiltX = 0, tiltY = 0;
          if (marbleSettings?.interactiveGlare !== false) {
            tiltX = (deltaY / maxDistance) * 30;
            tiltY = -(deltaX / maxDistance) * 30;
          }
          
          marble.style.transform = `translate(${pushX}px, ${pushY}px) perspective(400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          
          if (marble3d) {
            let glareX = 0, glareY = 0;
            if (marbleSettings?.interactiveGlare !== false) {
              glareX = (deltaX / maxDistance) * 15;
              glareY = (deltaY / maxDistance) * 15;
            }
            marble3d.style.setProperty('--glare-x', `${glareX}px`);
            marble3d.style.setProperty('--glare-y', `${glareY}px`);
          }
        } else {
          marble.style.transform = `translate(0px, 0px) perspective(400px) rotateX(0deg) rotateY(0deg)`;
          if (marble3d) {
            marble3d.style.setProperty('--glare-x', `0px`);
            marble3d.style.setProperty('--glare-y', `0px`);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [marbleSettings?.magneticRepulsion, marbleSettings?.interactiveGlare]);

  // Apply filters and sorting
  const filteredMemories = allMemories.filter((memory) => {
    const emotionData = EMOTIONS[memory.emotion];
    if (!emotionData) return false;

    const matchesEra = selectedEra === 'all' || emotionData.era === selectedEra;
    const matchesEmotion = selectedEmotionFilter === 'all' || memory.emotion === selectedEmotionFilter;

    return matchesEra && matchesEmotion;
  });

  // Stable seeded random for animations based on timestamp
  const getSeededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Sort
  const sortedMemories = [...filteredMemories].sort((a, b) => {
    return sortBy === 'newest' ? b.date - a.date : a.date - b.date;
  });

  // Grouping logic removed. We now display all sortedMemories directly.

  const handleOpenModal = (memory) => {
    setActiveModalMemory(memory);
  };

  const handleCloseModal = () => {
    setActiveModalMemory(null);
  };

  const activeModalEmotionData = activeModalMemory ? EMOTIONS[activeModalMemory.emotion] : null;

  return (
    <div className="museum-gallery museum-scrollbar" ref={containerRef}>
      <div className="stardust-bg" />

      <div className="header-hero">
        <h1>My Museum of Memories</h1>
        <p>Walk through the chambers of your mind and hold your past to the light.</p>
      </div>

      {/* Modern Filter Dashboard */}
      <div className="museum-filters">
        {/* Era Filter */}
        <div className="filter-group">
          <span className="filter-label">Era:</span>
          <div className="filter-tabs">
            <button
              type="button"
              className={`filter-tab ${selectedEra === 'all' ? 'active' : ''}`}
              onClick={() => { setSelectedEra('all'); setSelectedEmotionFilter('all'); }}
            >
              All Emotions
            </button>
            <button
              type="button"
              className={`filter-tab ${selectedEra === 'io1' ? 'active' : ''}`}
              onClick={() => { setSelectedEra('io1'); setSelectedEmotionFilter('all'); }}
            >
              Inside Out 1
            </button>
            <button
              type="button"
              className={`filter-tab ${selectedEra === 'io2' ? 'active' : ''}`}
              onClick={() => { setSelectedEra('io2'); setSelectedEmotionFilter('all'); }}
            >
              Inside Out 2
            </button>
          </div>
        </div>

        {/* Specific Emotion Filter */}
        <div className="filter-group">
          <span className="filter-label">Emotion:</span>
          <select
            className="filter-select"
            value={selectedEmotionFilter}
            onChange={(e) => setSelectedEmotionFilter(e.target.value)}
          >
            <option value="all">All Chambers</option>
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
          <span className="filter-label">Sort:</span>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Recent Memories</option>
            <option value="oldest">Older Memories</option>
          </select>
        </div>
      </div>

      {/* Shelves Layout */}
      {allMemories.length === 0 ? (
        <div className="empty-museum-message">
          <h3>Your Museum is Empty</h3>
          <p>You haven't preserved any memories yet. Let's create your first glowing sphere of light!</p>
          <button
            type="button"
            className="btn-premium"
            onClick={() => setActivePage('create')}
          >
            Craft a Marble
          </button>
        </div>
      ) : sortedMemories.length === 0 ? (
        <div className="empty-museum-message">
          <h3>No Marbles Match Filters</h3>
          <p>Try resetting your filters to explore your memory catalog.</p>
          <button
            type="button"
            className="btn-premium"
            onClick={() => { setSelectedEra('all'); setSelectedEmotionFilter('all'); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="museum-shelves-container">
          <div className="museum-shelf">
            <div className="shelf-title" style={{ color: '#f8fafc', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              All Preserved Memories ({sortedMemories.length})
            </div>

            <div className="shelf-marbles-row" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
              {sortedMemories.map((memory, index) => {
                const emotionData = EMOTIONS[memory.emotion];
                if (!emotionData) return null;

                // Generate random but stable animation values for each marble
                const seed = memory.date;
                const rand1 = getSeededRandom(seed);
                const rand2 = getSeededRandom(seed + 1);
                const rand3 = getSeededRandom(seed + 2);
                const rand4 = getSeededRandom(seed + 3);

                const isRandomDancing = marbleSettings?.randomDancing !== false;
                
                const floatDur = isRandomDancing ? (4 + (rand1 * 4)).toFixed(2) : "6.00"; // 4s to 8s or fixed 6s
                const floatDel = isRandomDancing ? (rand2 * -5).toFixed(2) : "0.00"; // Negative delay or 0s
                const pulseDur = isRandomDancing ? (2 + (rand3 * 3)).toFixed(2) : "3.00"; // 2s to 5s or fixed 3s
                const sparkleDel = isRandomDancing ? (rand4 * 8).toFixed(2) : "2.00"; // 0s to 8s or fixed 2s

                return (
                  <div
                    key={memory.date}
                    className="marble-container"
                    onClick={() => handleOpenModal(memory)}
                    style={{ margin: '15px 10px' }}
                  >
                    {marbleSettings?.showAuras !== false && (
                      <div className={`marble-auras aura-${emotionData.id}`}>
                        {[...Array(6)].map((_, i) => {
                          const pRand1 = getSeededRandom(seed + i * 10);
                          const pRand2 = getSeededRandom(seed + i * 20);
                          const pRand3 = getSeededRandom(seed + i * 30);
                          
                          const duration = (2 + pRand1 * 4).toFixed(2); // 2s to 6s
                          const delay = (pRand2 * -5).toFixed(2); // 0s to -5s
                          const distance = (30 + pRand3 * 20).toFixed(2); // 30px to 50px
                          
                          return (
                            <div 
                              key={i} 
                              className="aura-particle" 
                              style={{ 
                                '--p-idx': i, 
                                '--p-dur': `${duration}s`,
                                '--p-del': `${delay}s`,
                                '--p-dist': `${distance}px`
                              }} 
                            />
                          );
                        })}
                      </div>
                    )}
                    <div
                      className="marble-3d"
                      style={{
                        '--bg-grad': emotionData.gradient,
                        '--glow-color': emotionData.glowColor,
                        '--float-dur': `${floatDur}s`,
                        '--float-del': `${floatDel}s`,
                        '--pulse-dur': `${pulseDur}s`,
                        '--sparkle-del': `${sparkleDel}s`,
                      }}
                    >
                      <div className="marble-sparkle" />
                      <div className="marble-core" />
                    </div>
                    <span className="marble-label" style={{ color: emotionData.color, fontSize: '0.85rem' }}>
                      {new Date(memory.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="shelf-wood" />
          </div>
        </div>
      )}

      {/* High Fidelity Glassmorphic Modal Card via Portal to break out of containing blocks */}
      {createPortal(
        <div
          className={`modal-overlay ${activeModalMemory ? 'active' : ''}`}
          onClick={handleCloseModal}
          style={{
            '--glow-color': activeModalEmotionData ? activeModalEmotionData.glowColor : 'rgba(255,255,255,0.2)'
          }}
        >
          {activeModalMemory && activeModalEmotionData && (
            <div
              className="modal-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                '--label-color': activeModalEmotionData.accentColor
              }}
            >
              <button
                className="modal-close-btn"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <h2 className="modal-emotion-title">
                {activeModalEmotionData.label}
              </h2>
              <div className="modal-date">
                Preserved on {new Date(activeModalMemory.date).toLocaleString()}
              </div>
              <p className="modal-description">
                {activeModalMemory.description}
              </p>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
