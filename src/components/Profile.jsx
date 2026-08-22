import React, { useState, useMemo } from 'react';
import { EMOTIONS } from '../data/emotions';
import { CONTENT } from '../data/content';

export default function Profile({ allMemories, userName }) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState('descending');

  // Memoized stats calculation
  const { dominantEmotion, sortedEmotionStats, lastMemoryTimeStr, totalCount, hybridCount, pureCount } = useMemo(() => {
    const total = allMemories.length;
    const lastMemory = allMemories[total - 1];
    const lastTime = lastMemory 
      ? new Date(lastMemory.date).toLocaleString() 
      : 'None';

    const counts = {};
    const statsMap = {};
    Object.keys(EMOTIONS).forEach((key) => {
      statsMap[key] = { count: 0, percent: 0, emotion: EMOTIONS[key], key };
    });

    let maxC = 0;
    let dominant = 'None';
    let hybridTotal = 0;

    allMemories.forEach((m) => {
      if (m.secondaryEmotion && EMOTIONS[m.secondaryEmotion]) {
        hybridTotal += 1;
        // Credit secondary emotion as well
        counts[m.secondaryEmotion] = (counts[m.secondaryEmotion] || 0) + 1;
        if (statsMap[m.secondaryEmotion]) {
          statsMap[m.secondaryEmotion].count += 1;
        }
      }

      counts[m.emotion] = (counts[m.emotion] || 0) + 1;
      if (statsMap[m.emotion]) {
        statsMap[m.emotion].count += 1;
      }
    });

    Object.entries(counts).forEach(([emotion, count]) => {
      if (count > maxC) {
        maxC = count;
        dominant = emotion;
      }
    });

    const totalImpressions = Object.values(statsMap).reduce((acc, curr) => acc + curr.count, 0);

    if (totalImpressions > 0) {
      Object.keys(statsMap).forEach((key) => {
        statsMap[key].percent = Math.round((statsMap[key].count / totalImpressions) * 100);
      });
    }

    const sortedStats = Object.values(statsMap).sort((a, b) => {
      return sortOrder === 'descending' ? b.count - a.count : a.count - b.count;
    });

    return {
      dominantEmotion: dominant,
      sortedEmotionStats: sortedStats,
      lastMemoryTimeStr: lastTime,
      totalCount: total,
      hybridCount: hybridTotal,
      pureCount: total - hybridTotal
    };
  }, [allMemories, sortOrder]);

  return (
    <div className="settings-layout">
      <div className="header-hero">
        <h1>{CONTENT.profile.heroTitle}</h1>
        <p>{CONTENT.profile.heroSubtitlePrefix}{userName}{CONTENT.profile.heroSubtitleSuffix}</p>
      </div>

      <div className="profile-dashboard-grid">
        {/* Left Column: Quick Stats & Activity */}
        <div className="profile-column">
          <div className="glass-panel settings-card">
            <div className="settings-info" style={{ marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0 }}>{CONTENT.profile.stats.title}</h3>
              <p style={{ margin: '4px 0 0 0' }}>{CONTENT.profile.stats.subtitle}</p>
            </div>
            
            <p style={{ marginBottom: '0.75rem' }}><strong>{CONTENT.profile.stats.totalLabel}</strong> <span>{totalCount} ({pureCount} Pure, {hybridCount} Hybrid)</span></p>
            <p style={{ margin: 0 }}><strong>{CONTENT.profile.stats.dominantLabel}</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{dominantEmotion}</span></p>
          </div>

          <div className="glass-panel settings-card">
            <div className="settings-info" style={{ marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0 }}>{CONTENT.profile.activity.title}</h3>
              <p style={{ margin: '4px 0 0 0' }}>{CONTENT.profile.activity.subtitle}</p>
            </div>
            
            <p style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 'bold' }}>
                {CONTENT.profile.activity.lastCreatedLabel}
              </span>
              <span style={{ fontSize: '1rem', wordBreak: 'break-all' }}>
                {lastMemoryTimeStr}
              </span>
            </p>
          </div>

          <div className="glass-panel settings-card" style={{ textAlign: 'center', opacity: 0.75 }}>
            <p style={{ margin: 0 }}>{CONTENT.profile.privacyDisclaimer}</p>
          </div>
        </div>

        {/* Right Column: Emotional Inventory */}
        <div className="profile-column">
          <div className="glass-panel settings-card">
            <div 
              className="settings-info"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: isInventoryOpen ? '1.5rem' : '0', borderBottom: isInventoryOpen ? '1px solid rgba(0,0,0,0.05)' : 'none', paddingBottom: isInventoryOpen ? '10px' : '0' }}
              onClick={() => setIsInventoryOpen(!isInventoryOpen)}
            >
              <div>
                <h3 style={{ margin: 0 }}>{CONTENT.profile.inventory.title}</h3>
                {isInventoryOpen && <p style={{ margin: '5px 0 0 0' }}>{CONTENT.profile.inventory.subtitle}</p>}
              </div>
              <span style={{ fontSize: '1.5rem' }}>{isInventoryOpen ? '▴' : '▾'}</span>
            </div>
            
            {isInventoryOpen && (
              <div style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
                  <span style={{ opacity: 0.8 }}>{CONTENT.profile.inventory.totalSpheres} <strong>{totalCount}</strong></span>
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
                    <option value="descending" style={{ color: '#000' }}>{CONTENT.profile.inventory.sortHighest}</option>
                    <option value="ascending" style={{ color: '#000' }}>{CONTENT.profile.inventory.sortLowest}</option>
                  </select>
                </div>

                {totalCount === 0 ? (
                  <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.6, fontSize: '0.9rem' }}>
                    {CONTENT.profile.inventory.empty}
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
        </div>
      </div>
    </div>
  );
}
