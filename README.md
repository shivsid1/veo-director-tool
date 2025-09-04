# Veo Director Tool

A professional video generation interface for Google's Veo 3 API. This tool provides an intuitive way to construct video prompts through modular parameter selection, making cinematic language accessible to creators of all skill levels.

## Overview

The Veo Director Tool breaks down video generation into discrete, selectable components:
- **Scene Description**: Natural language input for video content
- **Technical Parameters**: Equipment, movement, lighting, palette, and composition
- **Director Presets**: Pre-configured combinations based on renowned filmmakers

## Features

### Technical Parameter Categories
- **Equipment**: ARRI Pro, Vintage Film, iPhone, Security Cam, RED Cinema, Film Noir, Drone Cam, Webcam
- **Movement**: Static, Dolly, Handheld, Orbit, Push In, Pull Back, Tilt/Pan, Whip Pan
- **Lighting**: Natural, Dramatic, Soft, Neon, Golden Hour, Harsh Sun, Candlelight, Moonlight
- **Palette**: Cool Blues, Warm Pastels, Black & White, Saturated, Sepia Tone, Teal & Orange, Muted Earth, High Contrast
- **Composition**: Close-up, Medium, Wide, Aerial, Dutch Angle, Over Shoulder, Bird's Eye, Worm's Eye

### Director Presets
- **Nolan**: Epic scale with practical effects
- **Anderson**: Symmetrical, pastel aesthetic
- **Kubrick**: One-point perspective, precise framing
- **Lynch**: Surreal, neon-lit dreamscapes
- **Tarantino**: Dynamic, stylized violence
- **Scorsese**: Gritty urban realism
- **Spielberg**: Warm, family-friendly adventure
- **Villeneuve**: Atmospheric, contemplative sci-fi

## Architecture

### Frontend
- **React 18** with Vite build system
- **Tailwind CSS** for styling with custom glassmorphic design
- **Component-based architecture** with modular tile selection
- **Real-time state management** using React hooks

### Backend
- **Node.js/Express** server
- **Google Cloud Run** deployment
- **OAuth 2.0 authentication** with service account
- **Veo 3 API integration** for video generation

### Data Structure
Each tile selection maps to specific Veo 3 API parameters:

```javascript
{
  veoParams: {
    shot: {
      composition: 'cinematic',
      film_grain: 'subtle'
    },
    cinematography: {
      camera_quality: 'professional',
      sensor_type: 'large_format'
    }
  }
}
```

## Getting Started

### Prerequisites
- Node.js 16+
- Google Cloud account with Veo 3 API access
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/shivsid1/veo-director-tool.git
cd veo-director-tool

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Deployment

The application is deployed across two services:
- **Frontend**: Vercel (React build)
- **Backend**: Google Cloud Run (Node.js API)

## API Endpoints

- `POST /api/generate-video` - Initiate video generation
- `GET /api/operation-status/:operationName` - Check generation status
- `GET /api/download-video/:operationName` - Download completed video
- `GET /api/health` - Health check

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── CategorySection.jsx
│   ├── DirectorPresets.jsx
│   ├── InspirationSection.jsx
│   ├── SceneDescription.jsx
│   ├── Tile.jsx
│   └── VideoGenerator.jsx
├── data/               # Configuration data
│   ├── prompt-fragments.js
│   ├── tile-mappings.js
│   └── videoParameters.js
├── App.jsx            # Main application
└── main.jsx           # Entry point
```

### Adding New Parameters

To add new tiles or categories, modify `src/data/videoParameters.js`:

```javascript
export const NEW_CATEGORY_TILES = {
  NEW_OPTION: {
    id: 'new_option',
    label: 'New Option',
    icon: '🎯',
    description: 'Description of the new option',
    veoParams: {
      // Veo 3 API parameters
    }
  }
};
```

## Configuration

### Environment Variables
- `GOOGLE_SERVICE_ACCOUNT_KEY` - Google Cloud service account JSON
- `PORT` - Server port (default: 3001)

### Google Cloud Setup
1. Create a Google Cloud project
2. Enable the Veo 3 API
3. Create a service account with AI Platform User role
4. Generate and configure service account key

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built for Google's Veo 3 API
- Inspired by professional video production workflows
- Designed to make cinematic language accessible to all creators