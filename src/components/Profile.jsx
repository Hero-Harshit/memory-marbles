import React, { useState } from 'react';
import { EMOTIONS } from '../data/emotions';

export default function Profile({ allMemories, userName }) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState('descending');

  // Get Last Memory Timestamp
  const lastMemory = allMemories[allMemories.length - 1];
  const lastMemoryTimeStr = lastMemory 
    ? new Date(lastMemory.date).toLocaleString() 
    : 'None';

  // Get dominant emotion
  const emotionCounts = allMemories.reduce((acc, m) => {
    acc[m.emotion] = (acc[m.emotion] || 0) + 1;
    return acc;
  }, {});

  let dominantEmotion = 'None';
  let maxCount = 0;
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantEmotion = emotion;
    }
  });

  // Calculate emotion stats for the inventory
  const emotionStatsMap = Object.keys(EMOTIONS).reduce((acc, key) => {
    acc[key] = { count: 0, percent: 0, emotion: EMOTIONS[key], key };
    return acc;
  }, {});

  allMemories.forEach((memory) => {
    if (emotionStatsMap[memory.emotion]) {
      emotionStatsMap[memory.emotion].count += 1;
    }
  });

  const totalCount = allMemories.length;
  if (totalCount > 0) {
    Object.keys(emotionStatsMap).forEach((key) => {
      emotionStatsMap[key].percent = Math.round((emotionStatsMap[key].count / totalCount) * 100);
    });
  }

  const sortedEmotionStats = Object.values(emotionStatsMap).sort((a, b) => {
    if (sortOrder === 'descending') {
      return b.count - a.count;
    } else {
      return a.count - b.count;
    }
  });

  return (
    <div className="settings-layout">
      <div className="header-hero">
        <h1>My Profile</h1>
        <p>Explore your mind's vault, {userName}. Here is a summary of your core memories.</p>
      </div>

      <div className="glass-panel settings-card">
        <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
          <h3>Your Stats</h3>
          <p>A quick overview of your memory collection.</p>
        </div>
        
        <p><strong>Total Memories:</strong> <span>{allMemories.length}</span></p>
        <p><strong>Dominant Emotion:</strong> <span style={{ textTransform: 'capitalize' }}>{dominantEmotion}</span></p>
      </div>

      <div className="glass-panel settings-card">
        <div className="settings-info" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
          <h3>Activity Log</h3>
          <p>Keep track of your recent memory entries.</p>
        </div>
        
        <p style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 'bold' }}>
            Last Memory Created:
          </span>
          <span style={{ fontSize: '1rem', wordBreak: 'break-all' }}>
            {lastMemoryTimeStr}
          </span>
        </p>
      </div>

      <div className="glass-panel settings-card">
        <div 
          className="settings-info"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: isInventoryOpen ? '1.5rem' : '0', borderBottom: isInventoryOpen ? '1px solid rgba(0,0,0,0.05)' : 'none', paddingBottom: isInventoryOpen ? '10px' : '0' }}
          onClick={() => setIsInventoryOpen(!isInventoryOpen)}
        >
          <div>
            <h3 style={{ margin: 0 }}>Emotional Inventory</h3>
            {isInventoryOpen && <p style={{ margin: '5px 0 0 0' }}>A breakdown of emotions present in your memories.</p>}
          </div>
          <span style={{ fontSize: '1.5rem' }}>{isInventoryOpen ? '▴' : '▾'}</span>
        </div>
        
        {isInventoryOpen && (
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
              <span style={{ opacity: 0.8 }}>Total Balls: <strong>{totalCount}</strong></span>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                  color: 'inherit',
                  padding: '4px 8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <option value="descending" style={{ color: '#000' }}>Highest First</option>
                <option value="ascending" style={{ color: '#000' }}>Lowest First</option>
              </select>
            </div>

            {totalCount === 0 ? (
              <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.6, fontSize: '0.9rem' }}>
                No memories preserved yet.
              </p>
            ) : (
              <div className="stats-container" style={{ marginTop: '10px', gap: '15px' }}>
                {sortedEmotionStats.map((stat) => (
                  <div key={stat.key} className="stat-row" style={{ gap: '15px', marginBottom: '12px' }}>
                    <div className="stat-emotion-name" style={{ color: stat.emotion.accentColor, width: '100px', fontSize: '0.9rem' }}>
                      {stat.emotion.name}
                    </div>
                    <div className="stat-progress-bg" style={{ height: '14px' }}>
                      <div 
                        className="stat-progress-bar"
                        style={{
                          width: `${stat.percent}%`,
                          '--bg-grad': stat.emotion.gradient,
                          '--glow-color': stat.emotion.glowColor
                        }}
                      />
                    </div>
                    <div className="stat-count-badge" style={{ color: stat.emotion.accentColor, fontSize: '0.9rem', minWidth: '50px', textAlign: 'right' }}>
                      {stat.count} ({stat.percent}%)
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="glass-panel settings-card" style={{ textAlign: 'center', opacity: 0.7 }}>
        <p>Your memories are safe, private, and stored only in this browser. 🔮</p>
      </div>
    </div>
  );
}
