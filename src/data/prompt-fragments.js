// Simplified prompt fragments for rapid Veo 3 testing
// Each tile maps to a concise, human-readable fragment

export const equipmentFragments = {
  'arri-pro': {
    label: 'ARRI Professional',
    promptFragment: 'shot on ARRI Alexa Mini LF, 50mm lens, f/1.4, cinema-grade clarity'
  },
  'vintage-film': {
    label: 'Vintage Film',
    promptFragment: 'shot on vintage 16mm film, 35mm lens, warm analog grain'
  },
  'iphone': {
    label: 'iPhone',
    promptFragment: 'captured on iPhone 15 Pro, wide lens, clean digital detail'
  },
  'security-cam': {
    label: 'Security Cam',
    promptFragment: 'CCTV surveillance look, wide-angle, low resolution, digital noise'
  }
};

export const movementFragments = {
  'static': { label: 'Static', promptFragment: 'locked-off static camera, zero movement' },
  'dolly': { label: 'Dolly', promptFragment: 'smooth dolly tracking shot' },
  'handheld': { label: 'Handheld', promptFragment: 'natural handheld motion with subtle shake' },
  'orbit': { label: 'Orbit', promptFragment: 'orbiting camera move around the subject' }
};

export const lightingFragments = {
  'natural': { label: 'Natural', promptFragment: 'soft natural daylight, gentle shadows' },
  'dramatic': { label: 'Dramatic', promptFragment: 'high contrast dramatic light, deep shadows' },
  'soft': { label: 'Soft', promptFragment: 'even soft studio lighting, minimal shadows' },
  'neon': { label: 'Neon', promptFragment: 'vibrant neon lighting with colored glow' }
};

export const paletteFragments = {
  'cool-blues': { label: 'Cool Blues', promptFragment: 'cool blue color palette, cinematic cool grade' },
  'warm-pastels': { label: 'Warm Pastels', promptFragment: 'warm pastel palette, gentle saturation' },
  'black-white': { label: 'Black & White', promptFragment: 'black and white monochrome, high contrast' },
  'saturated': { label: 'Saturated', promptFragment: 'bold saturated colors, vibrant look' }
};

export const compositionFragments = {
  'close-up': { label: 'Close-up', promptFragment: 'intimate close-up framing, shallow depth' },
  'medium': { label: 'Medium', promptFragment: 'balanced medium shot, standard framing' },
  'wide': { label: 'Wide', promptFragment: 'wide establishing shot with environment' },
  'aerial': { label: 'Aerial', promptFragment: 'aerial overhead perspective, bird’s-eye view' }
};

const FRAGMENTS_MAP = {
  equipment: equipmentFragments,
  movement: movementFragments,
  lighting: lightingFragments,
  palette: paletteFragments,
  composition: compositionFragments
};

export const buildPromptFromFragments = (selections) => {
  const parts = [];
  Object.entries(selections).forEach(([category, id]) => {
    const fragment = FRAGMENTS_MAP[category]?.[id]?.promptFragment;
    if (fragment) parts.push(fragment);
  });
  return parts.join(', ');
};

