// Simplified video parameters for working implementation
export const VIDEO_CATEGORIES = {
  EQUIPMENT: 'equipment',
  MOVEMENT: 'movement',
  LIGHTING: 'lighting',
  PALETTE: 'palette',
  COMPOSITION: 'composition'
};

export const EQUIPMENT_TILES = {
  ARRI_PRO: {
    id: 'arri_pro',
    label: 'ARRI Pro',
    icon: '🎬',
    description: 'Professional cinema camera with pristine image quality'
  },
  VINTAGE_FILM: {
    id: 'vintage_film',
    label: 'Vintage Film',
    icon: '📽️',
    description: 'Classic film camera aesthetic with grain and warmth'
  },
  IPHONE: {
    id: 'iphone',
    label: 'iPhone',
    icon: '📱',
    description: 'Modern mobile cinematography with digital clarity'
  },
  SECURITY_CAM: {
    id: 'security_cam',
    label: 'Security Cam',
    icon: '📹',
    description: 'Surveillance-style footage with low-res aesthetic'
  },
  RED_CINEMA: {
    id: 'red_cinema',
    label: 'RED Cinema',
    icon: '🔴',
    description: 'Professional digital cinema with high dynamic range'
  },
  FILM_NOIR: {
    id: 'film_noir',
    label: 'Film Noir',
    icon: '🌙',
    description: 'Classic black & white film stock with high contrast'
  },
  DRONE_CAM: {
    id: 'drone_cam',
    label: 'Drone Cam',
    icon: '🚁',
    description: 'Aerial cinematography aesthetic with wide perspectives'
  },
  WEBCAM: {
    id: 'webcam',
    label: 'Webcam',
    icon: '💻',
    description: 'Low-fi digital quality with intimate feel'
  }
};

export const MOVEMENT_TILES = {
  STATIC: {
    id: 'static',
    label: 'Static',
    icon: '🖼️',
    description: 'Fixed camera position, no movement'
  },
  DOLLY: {
    id: 'dolly',
    label: 'Dolly',
    icon: '🚂',
    description: 'Smooth tracking movement on rails'
  },
  HANDHELD: {
    id: 'handheld',
    label: 'Handheld',
    icon: '📱',
    description: 'Natural camera shake and movement'
  },
  ORBIT: {
    id: 'orbit',
    label: 'Orbit',
    icon: '🔄',
    description: 'Circular movement around subject'
  },
  PUSH_IN: {
    id: 'push_in',
    label: 'Push In',
    icon: '➡️',
    description: 'Slow zoom toward subject for emphasis'
  },
  PULL_BACK: {
    id: 'pull_back',
    label: 'Pull Back',
    icon: '⬅️',
    description: 'Reveal shot moving away to show context'
  },
  TILT_PAN: {
    id: 'tilt_pan',
    label: 'Tilt/Pan',
    icon: '↗️',
    description: 'Simple camera rotation for dynamic framing'
  },
  WHIP_PAN: {
    id: 'whip_pan',
    label: 'Whip Pan',
    icon: '💨',
    description: 'Fast horizontal movement for energy'
  }
};

export const LIGHTING_TILES = {
  NATURAL: {
    id: 'natural',
    label: 'Natural',
    icon: '☀️',
    description: 'Soft natural daylight with gentle shadows'
  },
  DRAMATIC: {
    id: 'dramatic',
    label: 'Dramatic',
    icon: '🎭',
    description: 'High contrast dramatic light with deep shadows'
  },
  SOFT: {
    id: 'soft',
    label: 'Soft',
    icon: '💡',
    description: 'Even soft studio lighting with minimal shadows'
  },
  NEON: {
    id: 'neon',
    label: 'Neon',
    icon: '🌈',
    description: 'Vibrant neon lighting with colored glow'
  },
  GOLDEN_HOUR: {
    id: 'golden_hour',
    label: 'Golden Hour',
    icon: '🌅',
    description: 'Warm sunset/sunrise light with magical quality'
  },
  HARSH_SUN: {
    id: 'harsh_sun',
    label: 'Harsh Sun',
    icon: '☀️',
    description: 'High contrast direct sunlight with strong shadows'
  },
  CANDLELIGHT: {
    id: 'candlelight',
    label: 'Candlelight',
    icon: '🕯️',
    description: 'Warm, flickering illumination with intimate feel'
  },
  MOONLIGHT: {
    id: 'moonlight',
    label: 'Moonlight',
    icon: '🌙',
    description: 'Cool, low-light aesthetic with blue tones'
  }
};

export const PALETTE_TILES = {
  COOL_BLUES: {
    id: 'cool_blues',
    label: 'Cool Blues',
    icon: '❄️',
    description: 'Cool blue color palette with cinematic grade'
  },
  WARM_PASTELS: {
    id: 'warm_pastels',
    label: 'Warm Pastels',
    icon: '🌅',
    description: 'Warm pastel palette with gentle saturation'
  },
  BLACK_WHITE: {
    id: 'black_white',
    label: 'Black & White',
    icon: '⚫',
    description: 'Black and white monochrome with high contrast'
  },
  SATURATED: {
    id: 'saturated',
    label: 'Saturated',
    icon: '🎨',
    description: 'Bold saturated colors with vibrant look'
  },
  SEPIA_TONE: {
    id: 'sepia_tone',
    label: 'Sepia Tone',
    icon: '🤎',
    description: 'Vintage brown monochrome with nostalgic feel'
  },
  TEAL_ORANGE: {
    id: 'teal_orange',
    label: 'Teal & Orange',
    icon: '🧡',
    description: 'Modern blockbuster grade with complementary colors'
  },
  MUTED_EARTH: {
    id: 'muted_earth',
    label: 'Muted Earth',
    icon: '🌍',
    description: 'Desaturated natural tones with organic feel'
  },
  HIGH_CONTRAST: {
    id: 'high_contrast',
    label: 'High Contrast',
    icon: '⚡',
    description: 'Punchy blacks and whites with bold definition'
  }
};

export const COMPOSITION_TILES = {
  CLOSE_UP: {
    id: 'close_up',
    label: 'Close-up',
    icon: '🔍',
    description: 'Intimate close-up framing with shallow depth'
  },
  MEDIUM: {
    id: 'medium',
    label: 'Medium',
    icon: '📐',
    description: 'Balanced medium shot with standard framing'
  },
  WIDE: {
    id: 'wide',
    label: 'Wide',
    icon: '🏞️',
    description: 'Wide establishing shot with environmental context'
  },
  AERIAL: {
    id: 'aerial',
    label: 'Aerial',
    icon: '🦅',
    description: 'Aerial overhead perspective with bird\'s-eye view'
  },
  DUTCH_ANGLE: {
    id: 'dutch_angle',
    label: 'Dutch Angle',
    icon: '↗️',
    description: 'Tilted frame for tension and unease'
  },
  OVER_SHOULDER: {
    id: 'over_shoulder',
    label: 'Over Shoulder',
    icon: '👥',
    description: 'Conversation perspective with depth'
  },
  BIRD_EYE: {
    id: 'bird_eye',
    label: 'Bird\'s Eye',
    icon: '🦅',
    description: 'Straight down overhead view for pattern'
  },
  WORM_EYE: {
    id: 'worm_eye',
    label: 'Worm\'s Eye',
    icon: '🐛',
    description: 'Looking up from ground level for power'
  }
};

export const ALL_TILES = {
  [VIDEO_CATEGORIES.EQUIPMENT]: EQUIPMENT_TILES,
  [VIDEO_CATEGORIES.MOVEMENT]: MOVEMENT_TILES,
  [VIDEO_CATEGORIES.LIGHTING]: LIGHTING_TILES,
  [VIDEO_CATEGORIES.PALETTE]: PALETTE_TILES,
  [VIDEO_CATEGORIES.COMPOSITION]: COMPOSITION_TILES
};

export const DIRECTOR_PRESETS = {
  NOLAN: {
    id: 'nolan',
    label: 'Nolan',
    icon: '🎬',
    description: 'Epic, practical effects, IMAX aesthetic',
    selections: {
      equipment: 'arri_pro',
      movement: 'dolly',
      lighting: 'dramatic',
      palette: 'black_white',
      composition: 'wide'
    }
  },
  ANDERSON: {
    id: 'anderson',
    label: 'Anderson',
    icon: '🎭',
    description: 'Symmetrical, colorful, whimsical storytelling',
    selections: {
      equipment: 'vintage_film',
      movement: 'static',
      lighting: 'soft',
      palette: 'warm_pastels',
      composition: 'medium'
    }
  },
  KUBRICK: {
    id: 'kubrick',
    label: 'Kubrick',
    icon: '🔮',
    description: 'One-point perspective, meticulous composition',
    selections: {
      equipment: 'arri_pro',
      movement: 'static',
      lighting: 'dramatic',
      palette: 'cool_blues',
      composition: 'wide'
    }
  },
  LYNCH: {
    id: 'lynch',
    label: 'Lynch',
    icon: '🌙',
    description: 'Surreal, dreamlike, atmospheric horror',
    selections: {
      equipment: 'vintage_film',
      movement: 'handheld',
      lighting: 'neon',
      palette: 'saturated',
      composition: 'close_up'
    }
  },
  TARANTINO: {
    id: 'tarantino',
    label: 'Tarantino',
    icon: '🚀',
    description: 'Violent, dialogue-heavy, non-linear storytelling',
    selections: {
      equipment: 'red_cinema',
      movement: 'whip_pan',
      lighting: 'harsh_sun',
      palette: 'high_contrast',
      composition: 'dutch_angle'
    }
  },
  SCORSESE: {
    id: 'scorsese',
    label: 'Scorsese',
    icon: '❤️',
    description: 'Gritty urban realism with complex characters',
    selections: {
      equipment: 'film_noir',
      movement: 'push_in',
      lighting: 'candlelight',
      palette: 'sepia_tone',
      composition: 'over_shoulder'
    }
  },
  SPIELBERG: {
    id: 'spielberg',
    label: 'Spielberg',
    icon: '☀️',
    description: 'Adventure, family-friendly, spectacular visuals',
    selections: {
      equipment: 'arri_pro',
      movement: 'orbit',
      lighting: 'golden_hour',
      palette: 'warm_pastels',
      composition: 'aerial'
    }
  },
  VILLENEUVE: {
    id: 'villeneuve',
    label: 'Villeneuve',
    icon: '👻',
    description: 'Atmospheric, slow-paced, contemplative',
    selections: {
      equipment: 'drone_cam',
      movement: 'static',
      lighting: 'moonlight',
      palette: 'muted_earth',
      composition: 'bird_eye'
    }
  }
};

// Helper function to generate Veo prompt (simplified for now)
export const generateVeoPrompt = (selections) => {
  // This will be enhanced when we integrate with real API
  return 'Generated prompt based on selections';
};

