export const CONTENT = {
  global: {
    brandName: 'Memory Marbles',
  },
  navbar: {
    navItems: {
      museum: 'My Museum',
      create: 'Create Memory',
      profile: 'My Profile',
      settings: 'Settings',
      about: 'About Us'
    },
    mobileTitle: 'Navigation',
    footerPrivacy: 'Your data stays on your device'
  },
  createMemory: {
    heroTitle: 'Create A Memory Marble',
    heroSubtitle: 'Preserve pure feelings or blend complex hybrid memories that swirl with light.',
    stepOneDefault: '1. Select Primary Emotion',
    stepOneSelectedPrefix: 'Primary Feeling: ',
    tabsIO1: 'Inside Out 1',
    tabsIO2: 'Inside Out 2',
    hybridToggleTitle: '🌀 Blend with a Second Emotion?',
    hybridToggleSubtitle: 'Create an Inside Out 2 style dual-tone swirling marble',
    secondaryTabsIO1: 'IO 1',
    secondaryTabsIO2: 'IO 2',
    inputTitlePlaceholder: 'Memory Title',
    textareaPlaceholderDefault: 'How does it feel today? Describe your memory...',
    textareaPlaceholderPrefix: 'Write down your ',
    textareaPlaceholderSuffix: ' memory...',
    submitBtnPure: 'Preserve Memory',
    submitBtnHybrid: 'Preserve Hybrid Memory',
    errors: {
      missingPrimary: 'Please select a primary emotion for your memory marble.',
      missingSecondary: 'Please pick a secondary emotion to blend, or turn off hybrid mode.',
      missingTitle: 'Please give your memory a title.',
      missingDescription: 'Please describe your memory before preserving it.'
    },
    notifications: {
      pureSuccess: 'Memory added to your museum!',
      hybridSuccessPrefix: 'Swirled a ',
      hybridSuccessSuffix: ' memory into your museum!'
    }
  },
  myMuseum: {
    heroTitle: 'My Museum of Memories',
    heroSubtitle: 'Walk through the chambers of your mind and hold your past to the light.',
    filters: {
      formLabel: 'Form:',
      eraLabel: 'Era:',
      chamberLabel: 'Chamber:',
      sortLabel: 'Sort:',
      formOptions: {
        all: 'All Types',
        pure: 'Pure Orbs',
        hybrid: '🌀 Hybrid Swirls'
      },
      eraOptions: {
        all: 'All Eras',
        io1: 'Inside Out 1',
        io2: 'Inside Out 2'
      },
      chamberAll: 'All Chambers',
      sortOptions: {
        newest: 'Recent Memories',
        oldest: 'Older Memories'
      }
    },
    emptyMuseum: {
      title: 'Your Museum is Empty',
      description: "You haven't preserved any memories yet. Let's create your first glowing sphere of light!",
      button: 'Craft a Marble'
    },
    emptyFilter: {
      title: 'No Marbles Match Filters',
      description: 'Try resetting your filters to explore your memory catalog.',
      button: 'Reset Filters'
    },
    shelfTitlePrefix: 'All Preserved Memories',
    modal: {
      preservedOnPrefix: 'Preserved on '
    }
  },
  profile: {
    heroTitle: 'My Profile',
    heroSubtitlePrefix: "Explore your mind's vault, ",
    heroSubtitleSuffix: ". Here is a summary of your core memories.",
    stats: {
      title: 'Your Stats',
      subtitle: 'A quick overview of your memory collection.',
      totalLabel: 'Total Memories:',
      dominantLabel: 'Dominant Emotion:'
    },
    activity: {
      title: 'Activity Log',
      subtitle: 'Keep track of your recent memory entries.',
      lastCreatedLabel: 'Last Memory Created:'
    },
    privacyDisclaimer: 'Your memories are safe, private, and your data stays on your device. 🔮',
    inventory: {
      title: 'Emotional Inventory',
      subtitle: 'A breakdown of emotions present in your memories.',
      totalSpheres: 'Total Spheres:',
      sortHighest: 'Highest First',
      sortLowest: 'Lowest First',
      empty: 'No memories preserved yet.'
    }
  },
  settings: {
    heroTitle: 'Settings & Dashboard',
    heroSubtitle: 'Personalize your mind museum, inspect emotional statistics, and manage your data.',
    identification: {
      title: 'Mind Identification',
      description: 'Customize the owner name of this memory vault.',
      placeholder: 'Enter your name'
    },
    customization: {
      title: 'Marble Customization',
      description: 'Toggle the magical effects and interactive features of your memory marbles.',
      auras: {
        title: 'Emotion Auras',
        description: 'Show floating magical dust orbiting around each marble.'
      },
      magnetic: {
        title: 'Magnetic Repulsion',
        description: 'Marbles gently float away from your cursor when you move near them.'
      },
      dancing: {
        title: 'Random Dancing',
        description: 'Marbles bob and glow randomly. If disabled, they move in sync.'
      },
      speed: {
        title: 'Hovering Speed',
        description: 'How fast the marbles move (0 to 10).'
      },
      intensity: {
        title: 'Hovering Intensity',
        description: 'How far the marbles move (0 to 10).'
      },
      size: {
        title: 'Marble Size (Radius)',
        description: 'Increase or decrease the spherical size of the marbles (1 to 10).'
      },
      density: {
        title: 'Marble Density (Proximity)',
        description: 'How close together the marbles sit on the shelf (1 = spaced out, 10 = packed tight).'
      }
    },
    demo: {
      title: '🔮 Demo Showcase Vault',
      description: 'Populate your museum with sample memories to inspect all marble combinations.',
      badge: '55 Total Combinations',
      text: 'Generates 10 pure emotion marbles and all 45 dual-emotion hybrid swirl combinations with tailored stories and emotional narratives.',
      buttonReplace: '✨ Load Complete Vault (55)',
      buttonAppend: '➕ Append to Existing'
    },
    dataManagement: {
      exportTitle: 'Export Collections',
      exportDescription: 'Download all your memory marbles as a secure JSON document.',
      exportButton: 'Export Backup',
      importTitle: 'Import Collections',
      importDescription: 'Restore memories from a previously exported JSON backup.',
      importButton: 'Import Backup',
      resetTitle: 'Marble Reset',
      resetDescription: 'Deletes all memories from the museum.',
      resetButton: 'Marble Massacre'
    },
    typography: {
      title: 'Typography & Font Style',
      description: 'Choose a charming theme for titles, notes, and headings across your memory museum.'
    },
    alerts: {
      importSuccess: 'Memories imported successfully!',
      importError: 'Failed to import: Invalid JSON file structure.',
      exportSuccess: 'Memories exported successfully!',
      exportEmpty: 'No memories to export.',
      clearWarning1: "⚠️ WARNING: This will permanently delete all your precious memories. This action CANNOT be undone!\n\nAre you absolutely sure you want to proceed?",
      clearWarning2: "🔥 FINAL CONFIRMATION:\nAre you 100% sure? All memory marbles will be shattered forever.",
      clearSuccess: 'Museum cleared. All marbles shattered.',
      settingUpdated: 'Setting updated!',
      themeUpdatedPrefix: 'Theme font set to ',
      themeUpdatedSuffix: '!'
    }
  },
  aboutUs: {
    heroTitle: 'Memory Marbles',
    heroQuote: '"Some memories glow yellow. Some burn red. Some settle into a quiet, aching blue. This is a place for all of them."',
    sections: {
      whatIsThis: {
        title: 'What is this?',
        p1: 'Do you remember the first time something simple — a movie, a moment, a realization — quietly rearranged something inside you?',
        p2: 'For me, it was understanding that emotions are not enemies to be controlled, but companions to be understood. Joy cannot exist without sadness, and anger is the fire that tells you something matters.',
        p3: 'Memory Marbles was born from that feeling.',
        p4: 'This is your space. A tiny, private corner of the internet where your memories exist without noise or judgment. No timelines. No followers. No likes. No performance. Just you, standing in a quiet museum of your own life watching the past glow softly in your hands.'
      },
      whyIBuiltThis: {
        title: 'Why I built this',
        p1: 'As a frontend developer learning my craft, I didn’t want to build something forgettable. Not another dry todo tracker or standard weather forecast dashboard.',
        p2: 'I wanted to create something deeply personal. Something I would return to. Something that felt… alive.',
        p3: 'No productivities. No optimizations. Just pure reflection. This project is growing, evolving, and mine. Maybe it will become a safe place for you too.'
      },
      techDetails: {
        title: 'Technical & Privacy Details',
        p1: 'Fully Client-Side: Built with React, JSX, and Vite. Your memories never touch any remote server, database, or analytics tracker.',
        p2: 'Device Storage: Your data stays on your device. Everything is stored securely in your local storage, 100% private, fully offline, and belongs completely to you.',
        p3: 'No Accounts: No logins, no passwords, no email trackers. Just open it and begin holding your history.'
      },
      theMarbles: {
        title: 'The Marbles',
        p1: 'Every memory you preserve becomes something tangible — a glowing, spherical marble of light.',
        list: [
          { emoji: '🟡', name: 'Joy', desc: 'warmth lingering after the moment passes' },
          { emoji: '🔵', name: 'Sadness', desc: 'quiet depth making everything meaningful' },
          { emoji: '🔴', name: 'Anger', desc: 'spark telling you something matters' },
          { emoji: '🟢', name: 'Disgust', desc: 'gut instinct protecting your boundaries' },
          { emoji: '🟣', name: 'Fear', desc: 'cautious voice walking beside courage' },
          { emoji: '🟠', name: 'Anxiety', desc: 'planner preparing for the unseen' },
          { emoji: '🌀', name: 'Envy', desc: 'wishing well showing what you hope to become' },
          { emoji: '🍷', name: 'Ennui', desc: 'cool rest when the world gets noisy' },
          { emoji: '🌸', name: 'Embarrass', desc: 'sweet vulnerability that makes you human' },
          { emoji: '🍂', name: 'Nostalgia', desc: 'warm reflection on the beauty of days gone by' }
        ],
        footerQuote: 'Click a marble, and it opens. Not just as database text, but as a bubble of feelings that you lived and survived.'
      },
      connect: {
        title: 'Connect with the Maker',
        p1: "Have questions, ideas, or just want to see more creative frontends? Let's connect!",
        githubBtn: '💻 View GitHub',
        linkedinBtn: '👤 Connect on LinkedIn'
      }
    },
    footerQuote: 'Made with curiosity, a little Pixar magic, and a quiet love for memories that refuse to fade. 🔮'
  }
};
