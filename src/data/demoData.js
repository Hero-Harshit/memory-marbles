import { EMOTIONS, HYBRID_COMBINATIONS, getHybridDetails } from './emotions';

const SAMPLE_STORIES = [
  "Walking along the rain-soaked pavement as streetlights reflected like liquid gold.",
  "That unforgettable road trip where we got lost for hours with the windows rolled down singing at the top of our lungs.",
  "Staying awake until 4 AM talking about our biggest fears and wildest dreams under a blanket fort.",
  "The quiet relief of finishing a monumental project that took months of sweat and doubt.",
  "Sitting by the seaside watching waves crash relentlessly against old coastal rocks.",
  "A sudden burst of laughter in a quiet library that we tried so desperately to suppress.",
  "Looking at old family polaroids from holidays long before I understood how fast time flies.",
  "The intense rush of adrenaline just seconds before stepping onto the stage in front of hundreds.",
  "Realizing someone I admired had made the exact same mistake when they were starting out.",
  "Sipping hot coffee in a cozy café while watching autumn leaves swirl in the chilly wind.",
  "The bitter silence after a heated argument, followed by a warm, forgiving hug.",
  "Staring at the starry night sky from a mountain ridge feeling tiny yet deeply connected.",
  "A handwritten letter tucked inside an old book that brought an instant smile to my face.",
  "The nervous tremble in my hands while dialing a phone number that would change everything.",
  "Dancing foolishly in the kitchen while dinner simmered on the stove.",
  "Waking up early to catch the first golden rays of dawn piercing through morning mist.",
  "An unexpected compliment from a stranger that carried me through a difficult week.",
  "The feeling of sinking into bed after a long, exhausting journey back home.",
  "Overthinking a conversation from three days ago and wondering if I said the wrong thing.",
  "Holding a warm cup of cocoa while listening to thunderstorms drum against the windowpane."
];

export function generateDemoMemories() {
  const emotionKeys = Object.keys(EMOTIONS);
  const demoMemories = [];
  const now = Date.now();
  let timeOffset = 0;

  // 1. Generate 10 Pure Memories
  emotionKeys.forEach((emotionId, index) => {
    const emotion = EMOTIONS[emotionId];
    const story = SAMPLE_STORIES[index % SAMPLE_STORIES.length];
    
    demoMemories.push({
      emotion: emotionId,
      secondaryEmotion: null,
      title: `Pure ${emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)}: ${getPureTitle(emotionId)}`,
      description: story,
      date: now - (timeOffset * 86400000 + (index * 3600000 * 4))
    });
    timeOffset += 1.5;
  });

  // 2. Generate 45 Unique Hybrid Combinations
  let comboIndex = 0;
  for (let i = 0; i < emotionKeys.length; i++) {
    for (let j = i + 1; j < emotionKeys.length; j++) {
      const e1 = emotionKeys[i];
      const e2 = emotionKeys[j];
      const hybridMeta = getHybridDetails(e1, e2);
      const story = SAMPLE_STORIES[(comboIndex + 5) % SAMPLE_STORIES.length];

      demoMemories.push({
        emotion: e1,
        secondaryEmotion: e2,
        title: `${hybridMeta.title}`,
        description: `${story} — ${hybridMeta.description}`,
        date: now - (timeOffset * 86400000 + (comboIndex * 1800000 * 2))
      });

      timeOffset += 1.2;
      comboIndex++;
    }
  }

  return demoMemories;
}

function getPureTitle(emotionId) {
  const titles = {
    joy: "Sunlight & Golden Laughter",
    sadness: "Rainy Window Reflections",
    anger: "The Spark of Conviction",
    fear: "Leap Into the Unknown",
    disgust: "Gut Instinct & Guardrails",
    anxiety: "Midnight Mental Rehearsal",
    envy: "Dreaming of the Horizon",
    ennui: "Lazy Sunday Afternoon",
    embarrass: "Sweet Blushing Memory",
    nostalgia: "Polaroids in the Attic"
  };
  return titles[emotionId] || "Moment in Time";
}
