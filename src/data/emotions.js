import joyImg from '../assets/Joy.png';
import sadnessImg from '../assets/Sadness.png';
import angerImg from '../assets/Anger.png';
import fearImg from '../assets/Fear.png';
import disgustImg from '../assets/Disgust.png';
import anxietyImg from '../assets/Anxiety.png';
import envyImg from '../assets/Envy.png';
import ennuiImg from '../assets/Ennui.png';
import embarrassmentImg from '../assets/Embarrassment.png';
import nostalgiaImg from '../assets/Nostalgia.png';

export const EMOTIONS = {
  // Inside Out 1
  joy: {
    id: 'joy',
    name: 'joy',
    label: 'Joy 🟡',
    era: 'io1',
    image: joyImg,
    description: 'For the days that felt like sunlight through glass — warmth that lingers long after the moment passes.',
    color: '#fbc02d',
    glowColor: 'rgba(251, 192, 45, 0.65)',
    accentColor: '#f57f17',
    gradient: 'radial-gradient(circle at 35% 35%, #fff9c4 0%, #fbc02d 50%, #f57f17 100%)',
    textColor: '#827717'
  },
  sadness: {
    id: 'sadness',
    name: 'sadness',
    label: 'Sadness 🔵',
    era: 'io1',
    image: sadnessImg,
    description: 'For the quiet moments that made you more human — the depth that makes everything else meaningful.',
    color: '#29b6f6',
    glowColor: 'rgba(41, 182, 246, 0.65)',
    accentColor: '#0d47a1',
    gradient: 'radial-gradient(circle at 35% 35%, #e1f5fe 0%, #29b6f6 50%, #0d47a1 100%)',
    textColor: '#01579b'
  },
  anger: {
    id: 'anger',
    name: 'anger',
    label: 'Anger 🔴',
    era: 'io1',
    image: angerImg,
    description: 'For the fire that told you something mattered — the spark that protects your boundaries.',
    color: '#ef5350',
    glowColor: 'rgba(239, 83, 80, 0.65)',
    accentColor: '#b71c1c',
    gradient: 'radial-gradient(circle at 35% 35%, #ffebee 0%, #ef5350 50%, #b71c1c 100%)',
    textColor: '#b71c1c'
  },
  fear: {
    id: 'fear',
    name: 'fear',
    label: 'Fear 🟣',
    era: 'io1',
    image: fearImg,
    description: 'For every leap you took anyway — the quiet, protective voice that still walks beside courage.',
    color: '#ab47bc',
    glowColor: 'rgba(171, 71, 188, 0.65)',
    accentColor: '#4a148c',
    gradient: 'radial-gradient(circle at 35% 35%, #f3e5f5 0%, #ab47bc 50%, #4a148c 100%)',
    textColor: '#4a148c'
  },
  disgust: {
    id: 'disgust',
    name: 'disgust',
    label: 'Disgust 🟢',
    era: 'io1',
    image: disgustImg,
    description: 'For the times your gut knew before your head did — the instinct that protects your physical and social self.',
    color: '#66bb6a',
    glowColor: 'rgba(102, 187, 106, 0.65)',
    accentColor: '#1b5e20',
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
    description: 'For the overthinking, the plans, and the care — looking ahead to protect you from what you cannot see.',
    color: '#ffa726',
    glowColor: 'rgba(255, 167, 38, 0.65)',
    accentColor: '#e65100',
    gradient: 'radial-gradient(circle at 35% 35%, #fff3e0 0%, #ffa726 50%, #e65100 100%)',
    textColor: '#e65100'
  },
  envy: {
    id: 'envy',
    name: 'envy',
    label: 'Envy 🌀',
    era: 'io2',
    image: envyImg,
    description: 'For the longing and the wishing — showing you what you care about and what you hope to become.',
    color: '#26a69a',
    glowColor: 'rgba(38, 166, 154, 0.65)',
    accentColor: '#004d40',
    gradient: 'radial-gradient(circle at 35% 35%, #e0f2f1 0%, #26a69a 50%, #004d40 100%)',
    textColor: '#004d40'
  },
  ennui: {
    id: 'ennui',
    name: 'ennui',
    label: 'Ennui 🍷',
    era: 'io2',
    image: ennuiImg,
    description: 'For the sighing, the boredom, and the cool detachment — letting you rest when the world feels like too much.',
    color: '#5c6bc0',
    glowColor: 'rgba(92, 107, 192, 0.65)',
    accentColor: '#1a237e',
    gradient: 'radial-gradient(circle at 35% 35%, #e8eaf6 0%, #5c6bc0 50%, #1a237e 100%)',
    textColor: '#1a237e'
  },
  embarrassment: {
    id: 'embarrassment',
    name: 'embarrassment',
    label: 'Embarrassment 🌸',
    era: 'io2',
    image: embarrassmentImg,
    description: 'For the blushing and the hiding — the vulnerability that makes you human and draws you closer to others.',
    color: '#ec407a',
    glowColor: 'rgba(236, 64, 122, 0.65)',
    accentColor: '#880e4f',
    gradient: 'radial-gradient(circle at 35% 35%, #fce4ec 0%, #ec407a 50%, #880e4f 100%)',
    textColor: '#880e4f'
  },
  nostalgia: {
    id: 'nostalgia',
    name: 'nostalgia',
    label: 'Nostalgia 🍂',
    era: 'io2',
    image: nostalgiaImg,
    description: 'For the looking back with a warm smile — the sweet, aching love for the beauty of days gone by.',
    color: '#8d6e63',
    glowColor: 'rgba(141, 110, 99, 0.65)',
    accentColor: '#3e2723',
    gradient: 'radial-gradient(circle at 35% 35%, #efebe9 0%, #8d6e63 50%, #3e2723 100%)',
    textColor: '#3e2723'
  }
};
