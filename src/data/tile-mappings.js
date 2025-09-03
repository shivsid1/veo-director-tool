// Tile Mappings for Veo 3 API
// Maps user tile selections to detailed technical video parameters

export const equipmentTiles = {
  'arri-pro': {
    label: 'ARRI Professional',
    description: 'Cinema-grade camera with pristine image quality',
    composition: 'ARRI Alexa Mini LF, 50mm lens, f/1.4',
    film_grain: 'minimal digital noise, cinema-grade clarity',
    veoParams: {
      shot: {
        camera_type: 'professional_cinema',
        sensor_format: 'large_format',
        resolution: '4K_RAW',
        dynamic_range: '16_stops',
        color_space: 'ARRI_Wide_Gamut_4'
      },
      cinematography: {
        camera_quality: 'cinema_grade',
        lens_type: 'prime_cinema',
        aperture: 'f1.4',
        focus_style: 'cinematic_shallow'
      }
    }
  },
  'vintage-film': {
    label: 'Vintage Film',
    description: '16mm analog aesthetic with natural grain',
    composition: 'vintage 16mm film camera, 35mm lens',
    film_grain: 'natural film grain texture, warm analog feel',
    veoParams: {
      shot: {
        camera_type: 'analog_film',
        film_stock: '16mm_kodak_2383',
        grain_structure: 'natural_organic',
        color_timing: 'warm_analog',
        resolution: '2K_scan'
      },
      cinematography: {
        camera_quality: 'vintage_film',
        lens_type: 'vintage_prime',
        aperture: 'f2.8',
        focus_style: 'soft_vintage'
      }
    }
  },
  'iphone': {
    label: 'iPhone',
    description: 'Modern mobile cinematography',
    composition: 'iPhone 15 Pro, 48mm equivalent, f/1.78',
    film_grain: 'clean digital, mobile-optimized',
    veoParams: {
      shot: {
        camera_type: 'mobile_device',
        sensor_format: 'small_format',
        resolution: '4K_ProRes',
        dynamic_range: '10_stops',
        color_space: 'P3_Wide'
      },
      cinematography: {
        camera_quality: 'mobile_pro',
        lens_type: 'mobile_wide',
        aperture: 'f1.78',
        focus_style: 'mobile_auto'
      }
    }
  },
  'security-cam': {
    label: 'Security Cam',
    description: 'Surveillance-style footage aesthetic',
    composition: 'CCTV camera, wide-angle lens, low resolution',
    film_grain: 'digital noise, compression artifacts',
    veoParams: {
      shot: {
        camera_type: 'surveillance',
        sensor_format: 'small_format',
        resolution: '720p',
        dynamic_range: '8_stops',
        color_space: 'BT.709'
      },
      cinematography: {
        camera_quality: 'surveillance_grade',
        lens_type: 'wide_surveillance',
        aperture: 'f2.0',
        focus_style: 'fixed_focus'
      }
    }
  }
};

export const movementTiles = {
  'static': {
    label: 'Static',
    description: 'Fixed camera position, no movement',
    composition: 'locked-off tripod shot, stable framing',
    camera_motion: 'stationary, rock-solid stability',
    veoParams: {
      shot: {
        camera_motion: 'static',
        movement_type: 'none',
        stability: 'locked_off',
        motion_blur: 'minimal',
        tripod_type: 'professional_cinema'
      },
      cinematography: {
        movement_style: 'stationary',
        framing_stability: 'perfect',
        handheld_shake: 'none'
      }
    }
  },
  'dolly': {
    label: 'Dolly',
    description: 'Smooth tracking movement on rails',
    composition: 'dolly track movement, smooth horizontal motion',
    camera_motion: 'controlled tracking shot, cinematic movement',
    veoParams: {
      shot: {
        camera_motion: 'dolly',
        movement_type: 'tracking',
        movement_speed: 'slow_cinematic',
        stability: 'smooth_rails',
        motion_blur: 'natural_movement',
        dolly_type: 'professional_track'
      },
      cinematography: {
        movement_style: 'smooth_tracking',
        framing_stability: 'maintained',
        handheld_shake: 'none'
      }
    }
  },
  'handheld': {
    label: 'Handheld',
    description: 'Natural camera shake and movement',
    composition: 'handheld camera, organic movement',
    camera_motion: 'human-like motion, subtle shake',
    veoParams: {
      shot: {
        camera_motion: 'handheld',
        movement_type: 'organic',
        movement_speed: 'variable_human',
        stability: 'natural_shake',
        motion_blur: 'handheld_blur',
        stabilization: 'minimal'
      },
      cinematography: {
        movement_style: 'organic_handheld',
        framing_stability: 'natural_variation',
        handheld_shake: 'subtle_realistic'
      }
    }
  },
  'orbit': {
    label: 'Orbit',
    description: 'Circular movement around subject',
    composition: 'circular camera movement, orbiting motion',
    camera_motion: 'smooth circular tracking, 360° movement',
    veoParams: {
      shot: {
        camera_motion: 'orbit',
        movement_type: 'circular',
        movement_speed: 'medium_smooth',
        stability: 'controlled_circular',
        motion_blur: 'orbital_blur',
        orbit_radius: 'medium_distance'
      },
      cinematography: {
        movement_style: 'smooth_orbital',
        framing_stability: 'maintained_center',
        handheld_shake: 'none'
      }
    }
  }
};

export const lightingTiles = {
  'natural': {
    label: 'Natural',
    description: 'Soft, diffused natural lighting',
    composition: 'natural daylight, soft shadows',
    lighting_style: 'organic, sunlit atmosphere',
    veoParams: {
      cinematography: {
        lighting: 'natural',
        light_source: 'sunlight',
        light_quality: 'soft_diffused',
        shadows: 'natural_organic',
        contrast: 'medium_natural',
        color_temperature: '5600K_daylight'
      },
      atmosphere: {
        lighting_mood: 'natural_organic',
        shadow_detail: 'preserved',
        highlight_rolloff: 'natural'
      }
    }
  },
  'dramatic': {
    label: 'Dramatic',
    description: 'High contrast with deep shadows',
    composition: 'dramatic lighting, high contrast',
    lighting_style: 'cinematic, moody atmosphere',
    veoParams: {
      cinematography: {
        lighting: 'dramatic',
        light_source: 'artificial_dramatic',
        light_quality: 'hard_directional',
        shadows: 'deep_black',
        contrast: 'high_cinematic',
        color_temperature: '3200K_tungsten'
      },
      atmosphere: {
        lighting_mood: 'dramatic_moody',
        shadow_detail: 'crushed_blacks',
        highlight_rolloff: 'hard_clipped'
      }
    }
  },
  'soft': {
    label: 'Soft',
    description: 'Even, flattering studio lighting',
    composition: 'soft studio lighting, minimal shadows',
    lighting_style: 'commercial, even illumination',
    veoParams: {
      cinematography: {
        lighting: 'soft',
        light_source: 'studio_soft',
        light_quality: 'diffused_even',
        shadows: 'minimal_soft',
        contrast: 'low_flattering',
        color_temperature: '4500K_balanced'
      },
      atmosphere: {
        lighting_mood: 'clean_professional',
        shadow_detail: 'soft_lifted',
        highlight_rolloff: 'smooth_gradual'
      }
    }
  },
  'neon': {
    label: 'Neon',
    description: 'Vibrant colored lighting effects',
    composition: 'neon lights, colored atmosphere',
    lighting_style: 'cyberpunk, vibrant colors',
    veoParams: {
      cinematography: {
        lighting: 'neon',
        light_source: 'colored_neon',
        light_quality: 'colored_directional',
        shadows: 'colored_shadows',
        contrast: 'high_vibrant',
        color_temperature: 'variable_neon'
      },
      atmosphere: {
        lighting_mood: 'cyberpunk_vibrant',
        shadow_detail: 'colored_enhanced',
        highlight_rolloff: 'neon_glow'
      }
    }
  }
};

export const paletteTiles = {
  'cool-blues': {
    label: 'Cool Blues',
    description: 'Cool blue and cyan color palette',
    composition: 'blue-tinted color grading',
    color_style: 'cool, desaturated blues',
    veoParams: {
      color_palette: {
        primary_colors: 'cool_blues',
        color_temperature: 'cool_blue',
        saturation: 'medium_desaturated',
        contrast: 'moderate_enhanced',
        color_balance: 'blue_shifted'
      },
      grading: {
        shadows: 'blue_tinted',
        midtones: 'cool_neutral',
        highlights: 'blue_white',
        color_look: 'cinematic_cool'
      }
    }
  },
  'warm-pastels': {
    label: 'Warm Pastels',
    description: 'Soft, warm pastel tones',
    composition: 'warm, soft color palette',
    color_style: 'gentle, muted warmth',
    veoParams: {
      color_palette: {
        primary_colors: 'warm_pastels',
        color_temperature: 'warm_golden',
        saturation: 'low_pastel',
        contrast: 'low_gentle',
        color_balance: 'warm_shifted'
      },
      grading: {
        shadows: 'warm_soft',
        midtones: 'golden_neutral',
        highlights: 'warm_white',
        color_look: 'gentle_pastel'
      }
    }
  },
  'black-white': {
    label: 'Black & White',
    description: 'Classic black and white monochrome',
    composition: 'monochrome, high contrast',
    color_style: 'timeless, dramatic monochrome',
    veoParams: {
      color_palette: {
        primary_colors: 'monochrome',
        color_temperature: 'neutral_bw',
        saturation: 'none_monochrome',
        contrast: 'high_dramatic',
        color_balance: 'neutral_bw'
      },
      grading: {
        shadows: 'deep_black',
        midtones: 'neutral_gray',
        highlights: 'bright_white',
        color_look: 'classic_monochrome'
      }
    }
  },
  'saturated': {
    label: 'Saturated',
    description: 'Vibrant, high-saturation colors',
    composition: 'high-saturation, vibrant colors',
    color_style: 'bold, colorful, energetic',
    veoParams: {
      color_palette: {
        primary_colors: 'vibrant_saturated',
        color_temperature: 'neutral_vibrant',
        saturation: 'high_bold',
        contrast: 'high_energetic',
        color_balance: 'neutral_enhanced'
      },
      grading: {
        shadows: 'colorful_enhanced',
        midtones: 'vibrant_rich',
        highlights: 'bright_colored',
        color_look: 'bold_vibrant'
      }
    }
  }
};

export const compositionTiles = {
  'close-up': {
    label: 'Close-up',
    description: 'Intimate close-up framing',
    composition: 'tight framing, intimate detail',
    framing_style: 'close, personal perspective',
    veoParams: {
      shot: {
        composition: 'close_up',
        framing: 'tight_intimate',
        subject_size: 'large_dominant',
        background: 'minimal_blurred',
        depth_of_field: 'shallow_focus'
      },
      cinematography: {
        shot_type: 'close_up',
        lens_focal_length: '85mm_portrait',
        framing_style: 'intimate_detail',
        subject_emphasis: 'maximum'
      }
    }
  },
  'medium': {
    label: 'Medium',
    description: 'Standard medium shot framing',
    composition: 'balanced framing, standard perspective',
    framing_style: 'classic, balanced composition',
    veoParams: {
      shot: {
        composition: 'medium',
        framing: 'standard_balanced',
        subject_size: 'medium_proportional',
        background: 'visible_context',
        depth_of_field: 'moderate_focus'
      },
      cinematography: {
        shot_type: 'medium_shot',
        lens_focal_length: '50mm_standard',
        framing_style: 'classic_balanced',
        subject_emphasis: 'balanced'
      }
    }
  },
  'wide': {
    label: 'Wide',
    description: 'Wide establishing shot',
    composition: 'wide framing, environmental context',
    framing_style: 'expansive, contextual perspective',
    veoParams: {
      shot: {
        composition: 'wide',
        framing: 'loose_environmental',
        subject_size: 'small_contextual',
        background: 'prominent_environment',
        depth_of_field: 'deep_focus'
      },
      cinematography: {
        shot_type: 'wide_shot',
        lens_focal_length: '24mm_wide',
        framing_style: 'expansive_contextual',
        subject_emphasis: 'environmental'
      }
    }
  },
  'aerial': {
    label: 'Aerial',
    description: 'Bird\'s eye view perspective',
    composition: 'overhead perspective, elevated view',
    framing_style: 'high angle, omniscient view',
    veoParams: {
      shot: {
        composition: 'aerial',
        framing: 'overhead_elevated',
        subject_size: 'small_overhead',
        background: 'ground_plane',
        depth_of_field: 'deep_focus'
      },
      cinematography: {
        shot_type: 'aerial_shot',
        lens_focal_length: '16mm_ultra_wide',
        framing_style: 'overhead_omniscient',
        subject_emphasis: 'spatial_relationship'
      }
    }
  }
};

// Export all tile categories for easy access
export const allTileCategories = {
  equipment: equipmentTiles,
  movement: movementTiles,
  lighting: lightingTiles,
  palette: paletteTiles,
  composition: compositionTiles
};

// Helper function to get tile by category and ID
export const getTileByCategoryAndId = (category, tileId) => {
  const categoryMap = {
    equipment: equipmentTiles,
    movement: movementTiles,
    lighting: lightingTiles,
    palette: paletteTiles,
    composition: compositionTiles
  };
  
  return categoryMap[category]?.[tileId];
};

// Helper function to generate Veo 3 API JSON from tile selections
export const generateVeoPromptFromTiles = (selections) => {
  const basePrompt = {
    prompt: "Cinematic video sequence",
    duration: "8s",
    shot: {},
    cinematography: {},
    color_palette: {},
    atmosphere: {}
  };

  // Merge all selected tile parameters
  Object.entries(selections).forEach(([category, tileId]) => {
    const tile = getTileByCategoryAndId(category, tileId);
    if (tile && tile.veoParams) {
      // Deep merge the parameters
      Object.entries(tile.veoParams).forEach(([section, params]) => {
        if (!basePrompt[section]) basePrompt[section] = {};
        basePrompt[section] = { ...basePrompt[section], ...params };
      });
    }
  });

  return basePrompt;
};

