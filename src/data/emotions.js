import joyImg from '../assets/Joy.png';
import sadnessImg from '../assets/Sadness.png';
import angerImg from '../assets/Anger.png';
import fearImg from '../assets/Fear.png';
import disgustImg from '../assets/Disgust.png';
import anxietyImg from '../assets/Anxiety.png';
import envyImg from '../assets/Envy.png';
import ennuiImg from '../assets/Ennui.png';
import embarrassImg from '../assets/Embarrass.png';
import nostalgiaImg from '../assets/Nostalgia.png';

export const EMOTIONS = {
  // Inside Out 1
  joy: {
    id: 'joy',
    name: 'joy',
    label: 'Joy 🟡',
    era: 'io1',
    image: joyImg,
    description: 'For the days that felt like sunlight through glass warmth that lingers long after the moment passes.',
    color: '#fbc02d',
    glowColor: 'rgba(251, 192, 45, 0.65)',
    accentColor: '#ffd54f',
    gradient: 'radial-gradient(circle at 35% 35%, #fff9c4 0%, #fbc02d 50%, #f57f17 100%)',
    textColor: '#827717'
  },
  sadness: {
    id: 'sadness',
    name: 'sadness',
    label: 'Sadness 🔵',
    era: 'io1',
    image: sadnessImg,
    description: 'For the quiet moments that made you more human the depth that makes everything else meaningful.',
    color: '#29b6f6',
    glowColor: 'rgba(41, 182, 246, 0.65)',
    accentColor: '#4fc3f7',
    gradient: 'radial-gradient(circle at 35% 35%, #e1f5fe 0%, #29b6f6 50%, #0d47a1 100%)',
    textColor: '#01579b'
  },
  anger: {
    id: 'anger',
    name: 'anger',
    label: 'Anger 🔴',
    era: 'io1',
    image: angerImg,
    description: 'For the fire that told you something mattered the spark that protects your boundaries.',
    color: '#ef5350',
    glowColor: 'rgba(239, 83, 80, 0.65)',
    accentColor: '#e57373',
    gradient: 'radial-gradient(circle at 35% 35%, #ffebee 0%, #ef5350 50%, #b71c1c 100%)',
    textColor: '#b71c1c'
  },
  fear: {
    id: 'fear',
    name: 'fear',
    label: 'Fear 🟣',
    era: 'io1',
    image: fearImg,
    description: 'For every leap you took anyway the quiet, protective voice that still walks beside courage.',
    color: '#ab47bc',
    glowColor: 'rgba(171, 71, 188, 0.65)',
    accentColor: '#ba68c8',
    gradient: 'radial-gradient(circle at 35% 35%, #f3e5f5 0%, #ab47bc 50%, #4a148c 100%)',
    textColor: '#4a148c'
  },
  disgust: {
    id: 'disgust',
    name: 'disgust',
    label: 'Disgust 🟢',
    era: 'io1',
    image: disgustImg,
    description: 'For the times your gut knew before your head did the instinct that protects your physical and social self.',
    color: '#66bb6a',
    glowColor: 'rgba(102, 187, 106, 0.65)',
    accentColor: '#81c784',
    gradient: 'radial-gradient(circle at 35% 35%, #e8f5e9 0%, #66bb6a 50%, #1b5e20 100%)',
    textColor: '#1b5e20'
  },

  // Inside Out 2
  anxiety: {
    id: 'anxiety',
    name: 'anxiety',
    label: 'Anxiety 🟠',
    era: 'io2',
    image: anxietyImg,
    description: 'For the overthinking, the plans, and the care looking ahead to protect you from what you cannot see.',
    color: '#ffa726',
    glowColor: 'rgba(255, 167, 38, 0.65)',
    accentColor: '#ffb74d',
    gradient: 'radial-gradient(circle at 35% 35%, #fff3e0 0%, #ffa726 50%, #e65100 100%)',
    textColor: '#e65100'
  },
  envy: {
    id: 'envy',
    name: 'envy',
    label: 'Envy 🌀',
    era: 'io2',
    image: envyImg,
    description: 'For the longing and the wishing showing you what you care about and what you hope to become.',
    color: '#26a69a',
    glowColor: 'rgba(38, 166, 154, 0.65)',
    accentColor: '#4db6ac',
    gradient: 'radial-gradient(circle at 35% 35%, #e0f2f1 0%, #26a69a 50%, #004d40 100%)',
    textColor: '#004d40'
  },
  ennui: {
    id: 'ennui',
    name: 'ennui',
    label: 'Ennui 🍷',
    era: 'io2',
    image: ennuiImg,
    description: 'For the sighing, the boredom, and the cool detachment letting you rest when the world feels like too much.',
    color: '#5c6bc0',
    glowColor: 'rgba(92, 107, 192, 0.65)',
    accentColor: '#7986cb',
    gradient: 'radial-gradient(circle at 35% 35%, #e8eaf6 0%, #5c6bc0 50%, #1a237e 100%)',
    textColor: '#1a237e'
  },
  embarrass: {
    id: 'embarrass',
    name: 'embarrass',
    label: 'Embarrass 🌸',
    era: 'io2',
    image: embarrassImg,
    description: 'For the blushing and the hiding the vulnerability that makes you human and draws you closer to others.',
    color: '#ec407a',
    glowColor: 'rgba(236, 64, 122, 0.65)',
    accentColor: '#f06292',
    gradient: 'radial-gradient(circle at 35% 35%, #fce4ec 0%, #ec407a 50%, #880e4f 100%)',
    textColor: '#880e4f'
  },
  nostalgia: {
    id: 'nostalgia',
    name: 'nostalgia',
    label: 'Nostalgia 🍂',
    era: 'io2',
    image: nostalgiaImg,
    description: 'For the looking back with a warm smile the sweet, aching love for the beauty of days gone by.',
    color: '#8d6e63',
    glowColor: 'rgba(141, 110, 99, 0.65)',
    accentColor: '#a1887f',
    gradient: 'radial-gradient(circle at 35% 35%, #efebe9 0%, #8d6e63 50%, #3e2723 100%)',
    textColor: '#3e2723'
  }
};

export const HYBRID_COMBINATIONS = {
  'joy-sadness': {
    title: 'Bittersweet',
    subtitle: 'The Riley Classic',
    description: 'When joy and sorrow share the exact same light — crying because it was beautiful and gone.'
  },
  'joy-nostalgia': {
    title: 'Golden Hour',
    subtitle: 'Warm Remembrance',
    description: 'A glowing memory of a sunlit day that warms your chest whenever you look back.'
  },
  'anger-anxiety': {
    title: 'Turbulent Storm',
    subtitle: 'Overwhelmed Heat',
    description: 'When urgent frustration clashes with frantic overthinking and nervous tension.'
  },
  'sadness-nostalgia': {
    title: 'Aching Melancholy',
    subtitle: 'Sweet Yesterday',
    description: 'A gentle, longing ache for a time, a place, or someone you dearly loved.'
  },
  'fear-anxiety': {
    title: 'The Spiral',
    subtitle: 'Anticipatory Dread',
    description: 'Hyper-vigilant thoughts bracing for the unseen to keep you safe.'
  },
  'joy-embarrass': {
    title: 'Endearing Blushing',
    subtitle: 'Playful Vulnerability',
    description: 'Laughing at your own clumsiness and feeling warm affection from those around you.'
  },
  'joy-fear': {
    title: 'Exhilarating Leap',
    subtitle: 'Triumphant Courage',
    description: 'The electrifying rush of doing something terrifying and realizing you survived.'
  },
  'envy-joy': {
    title: 'Aspirational Hope',
    subtitle: 'Inspired Longing',
    description: 'Seeing greatness in others and feeling a bright spark to reach higher.'
  },
  'anger-disgust': {
    title: 'Fierce Boundary',
    subtitle: 'Righteous Outrage',
    description: 'A deep gut refusal and burning determination to stand up for yourself.'
  },
  'sadness-ennui': {
    title: 'Quiet Solitude',
    subtitle: 'Numb Reflection',
    description: 'A tranquil, heavy stillness where the world quiets down and demands nothing from you.'
  },
  'joy-anger': {
    title: 'Passionate Drive',
    subtitle: 'Victorious Fire',
    description: 'The ecstatic thrill of fighting hard for something you love and winning.'
  },
  'joy-anxiety': {
    title: 'Jittery Excitement',
    subtitle: 'Nervous Flutter',
    description: 'Butterflies in your stomach before a big adventure or a long-awaited reunion.'
  },
  'joy-disgust': {
    title: 'Silly Rebellion',
    subtitle: 'Playful Distaste',
    description: 'Giggling over terrible food, funny cringe moments, or weird inside jokes.'
  },
  'joy-ennui': {
    title: 'Lazy Bliss',
    subtitle: 'Cozy Rest',
    description: 'Doing absolutely nothing on a warm afternoon and feeling completely content.'
  },
  'sadness-anger': {
    title: 'Heartbroken Fury',
    subtitle: 'Ache & Fire',
    description: 'The intense hurt that turns into fire when something unfair happens.'
  },
  'sadness-fear': {
    title: 'Fragile Solace',
    subtitle: 'Tender Tremble',
    description: 'Feeling small and vulnerable in a vast world, searching for a gentle shelter.'
  },
  'sadness-embarrass': {
    title: 'Tender Shame',
    subtitle: 'Soft Humility',
    description: 'The stinging desire to hide away after a painful, raw mistake.'
  },
  'anxiety-embarrass': {
    title: 'Self-Conscious Flutter',
    subtitle: 'Social Shyness',
    description: 'Over-analyzing every single word you said in the room after leaving.'
  },
  'fear-nostalgia': {
    title: 'Haunting Echo',
    subtitle: 'Old Shadows',
    description: 'Looking back on moments that once terrified you with awe and perspective.'
  },
  'envy-anxiety': {
    title: 'Restless Striving',
    subtitle: 'Comparison Spiral',
    description: 'Worrying you will fall behind while wishing for what others have.'
  },
  'ennui-nostalgia': {
    title: 'Faded Tape',
    subtitle: 'Dull Yearning',
    description: 'Remembering old routines that once felt ordinary and now feel distant.'
  }
};

/**
 * Returns comprehensive visual and narrative metadata for a pure or hybrid memory
 */
export function getHybridDetails(primaryId, secondaryId) {
  const primary = EMOTIONS[primaryId] || EMOTIONS.joy;
  
  if (!secondaryId || secondaryId === primaryId || !EMOTIONS[secondaryId]) {
    return {
      isHybrid: false,
      primary,
      secondary: null,
      title: primary.name.charAt(0).toUpperCase() + primary.name.slice(1),
      subtitle: 'Pure Memory',
      description: primary.description,
      gradient: primary.gradient,
      color: primary.color,
      accentColor: primary.accentColor,
      glowColor: primary.glowColor,
      secondaryColor: null,
      badge: primary.label
    };
  }

  const secondary = EMOTIONS[secondaryId];
  const pairKey1 = `${primaryId}-${secondaryId}`;
  const pairKey2 = `${secondaryId}-${primaryId}`;
  const hybridMeta = HYBRID_COMBINATIONS[pairKey1] || HYBRID_COMBINATIONS[pairKey2];

  const title = hybridMeta ? hybridMeta.title : `${primary.name.charAt(0).toUpperCase() + primary.name.slice(1)} & ${secondary.name.charAt(0).toUpperCase() + secondary.name.slice(1)}`;
  const subtitle = hybridMeta ? hybridMeta.subtitle : 'Dual-Emotion Swirl';
  const description = hybridMeta ? hybridMeta.description : `A complex swirl where ${primary.name} and ${secondary.name} interlace into one memory marble.`;

  // Dynamic animated swirling liquid dual-tone gradient
  const gradient = `conic-gradient(from 140deg at 50% 50%, ${primary.color} 0deg, ${secondary.color} 130deg, ${primary.color} 260deg, ${secondary.color} 360deg)`;
  const glowColor = `rgba(255, 255, 255, 0.4)`;

  return {
    isHybrid: true,
    primary,
    secondary,
    title,
    subtitle,
    description,
    gradient,
    color: primary.color,
    accentColor: primary.accentColor,
    glowColor,
    secondaryColor: secondary.color,
    badge: `${primary.label} + ${secondary.label}`
  };
}

