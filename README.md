# Veo Director Tool 🎬

A professional video generation interface that makes cinematic language accessible through modular tile selection. Built for Google's Veo 3 API, this tool allows users to build 8-second videos by combining technical variables like equipment, movement, lighting, palette, and composition.

## ✨ Features

### 🎯 **Technical Variable Tiles**
- **Equipment**: ARRI Pro, Vintage Film, iPhone, Security Cam
- **Movement**: Static, Dolly, Handheld, Orbit
- **Lighting**: Natural, Dramatic, Soft, Neon
- **Palette**: Cool Blues, Warm Pastels, B&W, Saturated
- **Composition**: Close-up, Medium, Wide, Aerial

### 🎭 **Director Preset Shortcuts**
- **Nolan**: Epic scale with practical effects (ARRI + Dolly + Dramatic + Cool Blues + Wide)
- **Anderson**: Symmetrical, pastel aesthetic (Vintage + Static + Soft + Warm Pastels + Medium)
- **Kubrick**: One-point perspective, precise framing (ARRI + Static + Dramatic + B&W + Wide)
- **Lynch**: Surreal, neon-lit dreamscapes (Vintage + Handheld + Neon + Saturated + Close-up)

### 🎨 **Professional Interface**
- Dark theme inspired by video production software
- Custom color palette: video-black (#0a0a0a), video-gray (#1a1a1a), video-accent (#ff6b35), video-gold (#f7931e)
- Responsive grid layout with hover effects and animations
- Real-time JSON generation for Veo 3 API

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd veo-director-tool

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Data Structure
The tool uses a comprehensive data structure that maps each tile selection to specific Veo 3 API parameters:

```javascript
// Example: ARRI Pro Camera selection
ARRI_PRO: {
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

### Component Structure
- **App.jsx**: Main application with state management
- **Tile.jsx**: Individual selectable parameter tiles
- **CategorySection.jsx**: Organized groups of related tiles
- **DirectorPresets.jsx**: Quick preset combinations
- **JsonOutput.jsx**: Generated Veo 3 parameters display

### State Management
- React hooks for local state
- Radio button behavior (one selection per category)
- Real-time JSON generation when all categories are selected

## 🎬 How It Works

1. **Select Tiles**: Choose one option from each technical category
2. **Generate Parameters**: The tool automatically combines selections into structured JSON
3. **Copy & Use**: Copy the generated JSON for use with Google's Veo 3 API
4. **Director Presets**: Use preset buttons for quick, proven combinations

## 🎨 Customization

### Adding New Tiles
To add new options, edit `src/data/videoParameters.js`:

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

### Modifying Colors
Update `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'video-black': '#your-color',
  'video-accent': '#your-accent',
  // ... other colors
}
```

## 🔧 Technical Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom video production theme
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly tile selection
- Optimized for both desktop and mobile video production workflows

## 🚀 Future Enhancements

- [ ] Integration with actual Veo 3 API
- [ ] Video preview generation
- [ ] Custom prompt input fields
- [ ] Export/import of tile combinations
- [ ] Advanced cinematography parameters
- [ ] User accounts and saved presets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by professional video production software like Blackmagic DaVinci Resolve
- Built for Google's Veo 3 API
- Designed to make cinematic language accessible to creators of all skill levels

---

**Built with ❤️ for the video production community**
