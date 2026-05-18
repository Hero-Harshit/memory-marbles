import React, { useState } from 'react';
import { EMOTIONS } from '../data/emotions';

export default function MyMuseum({ allMemories, setActivePage }) {
  const [selectedEra, setSelectedEra] = useState('all'); // 'all', 'io1', 'io2'
  const [selectedEmotionFilter, setSelectedEmotionFilter] = useState('all'); // 'all', or emotion id
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest'
  const [activeModalMemory, setActiveModalMemory] = useState(null);

  // Apply filters and sorting
  const filteredMemories = allMemories.filter((memory) => {
    const emotionData = EMOTIONS[memory.emotion];
    if (!emotionData) return false;

    const matchesEra = selectedEra === 'all' || emotionData.era === selectedEra;
    const matchesEmotion = selectedEmotionFilter === 'all' || memory.emotion === selectedEmotionFilter;

    return matchesEra && matchesEmotion;
  });

  // Sort
  const sortedMemories = [...filteredMemories].sort((a, b) => {
    return sortBy === 'newest' ? b.date - a.date : a.date - b.date;
  });

  // Group memories by emotion to put them on emotional shelves (when viewing 'all' emotions)
  const groupMemoriesByEmotion = () => {
    const groups = {};
    
    // Initialize groups for current filter
    Object.keys(EMOTIONS).forEach((key) => {
      const emotionData = EMOTIONS[key];
      if (selectedEra === 'all' || emotionData.era === selectedEra) {
        if (selectedEmotionFilter === 'all' || key === selectedEmotionFilter) {
          groups[key] = [];
        }
      }
    });

    // Populate
    sortedMemories.forEach((memory) => {
      if (groups[memory.emotion]) {
        groups[memory.emotion].push(memory);
      }
    });

    // Remove empty groups if viewing all, to keep shelf clean
    if (selectedEmotionFilter === 'all') {
      Object.keys(groups).forEach((key) => {
        if (groups[key].length === 0) {
          delete groups[key];
        }
      });
    }

    return groups;
  };

  const groupedShelves = groupMemoriesByEmotion();

  const handleOpenModal = (memory) => {
    setActiveModalMemory(memory);
  };

  const handleCloseModal = () => {
    setActiveModalMemory(null);
  };

  const activeModalEmotionData = activeModalMemory ? EMOTIONS[activeModalMemory.emotion] : null;

  return (
    <div className="museum-gallery museum-scrollbar">
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
            🔮 Craft a Marble
          </button>
        </div>
      ) : Object.keys(groupedShelves).length === 0 ? (
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
          {Object.entries(groupedShelves).map(([emotionId, memories]) => {
            const emotionData = EMOTIONS[emotionId];
            if (!emotionData) return null;

            return (
              <div key={emotionId} className="museum-shelf">
                <div className="shelf-title" style={{ color: emotionData.color }}>
                  {emotionData.name} Chamber ({memories.length})
                </div>

                <div className="shelf-marbles-row">
                  {memories.map((memory, index) => {
                    return (
                      <div 
                        key={memory.date}
                        className="marble-container"
                        onClick={() => handleOpenModal(memory)}
                      >
                        <div 
                          className="marble-3d"
                          style={{
                            '--bg-grad': emotionData.gradient,
                            '--glow-color': emotionData.glowColor,
                            animationDelay: `${index * 0.3}s`
                          }}
                        >
                          <div className="marble-core" />
                        </div>
                        <span className="marble-label" style={{ color: emotionData.color }}>
                          {new Date(memory.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="shelf-wood" />
              </div>
            );
          })}
        </div>
      )}

      {/* High Fidelity Glassmorphic Modal Card */}
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
      </div>
    </div>
  );
}
