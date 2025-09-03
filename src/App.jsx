import { useState, useEffect } from 'react';
import './App.css';
import CategorySection from './components/CategorySection';
import DirectorPresets from './components/DirectorPresets';
import VideoGenerator from './components/VideoGenerator';
import InspirationSection from './components/InspirationSection';
import SceneDescription from './components/SceneDescription';
import {
  VIDEO_CATEGORIES,
  ALL_TILES,
  DIRECTOR_PRESETS,
  generateVeoPrompt
} from './data/videoParameters';

function App() {
  const [selections, setSelections] = useState({
    [VIDEO_CATEGORIES.EQUIPMENT]: '',
    [VIDEO_CATEGORIES.MOVEMENT]: '',
    [VIDEO_CATEGORIES.LIGHTING]: '',
    [VIDEO_CATEGORIES.PALETTE]: '',
    [VIDEO_CATEGORIES.COMPOSITION]: ''
  });

  const [selectedInspiration, setSelectedInspiration] = useState(null);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [sceneDescription, setSceneDescription] = useState('');
  const [veoPrompt, setVeoPrompt] = useState(null);

  // Update Veo prompt whenever selections change
  useEffect(() => {
    const hasAllSelections = Object.values(selections).every(selection => selection !== '');
    if (hasAllSelections) {
      const prompt = generateVeoPrompt(selections);
      setVeoPrompt(prompt);
    } else {
      setVeoPrompt(null);
    }
  }, [selections]);

  const handleTileSelect = (category, tileId) => {
    // Clear director selection first
    setSelectedDirector(null);
    
    // Then update the tile selection
    setSelections(prev => {
      const currentSelection = prev[category];
      const newSelection = currentSelection === tileId ? '' : tileId;
      return {
        ...prev,
        [category]: newSelection
      };
    });
  };

  const handlePresetSelect = (presetSelections, directorId) => {
    setSelections(presetSelections);
    setSelectedDirector(directorId);
    setSelectedInspiration(null); // Clear inspiration when preset is selected
  };

  const handleInspirationSelect = (inspiration) => {
    setSelectedInspiration(inspiration);
    if (inspiration && inspiration.prompt) {
      // Auto-populate if scene description is empty OR if switching between inspirations
      const hasCustomText = sceneDescription && sceneDescription.trim() !== '';
      const isSwitchingInspiration = selectedInspiration && hasCustomText;
      
      if (!hasCustomText || isSwitchingInspiration) {
        setSceneDescription(inspiration.prompt);
      }
    }
  };

  const resetSelections = () => {
    setSelections({
      [VIDEO_CATEGORIES.EQUIPMENT]: '',
      [VIDEO_CATEGORIES.MOVEMENT]: '',
      [VIDEO_CATEGORIES.LIGHTING]: '',
      [VIDEO_CATEGORIES.PALETTE]: '',
      [VIDEO_CATEGORIES.COMPOSITION]: ''
    });
    setSelectedInspiration(null);
    setSelectedDirector(null);
    setSceneDescription('');
    setVeoPrompt(null);
  };

  const handleVideoComplete = (video) => {
    console.log('🎬 Video generation complete:', video);
    // You can add additional logic here like saving to a gallery, etc.
  };

  return (
    <div 
      className="min-h-screen text-gray-900"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f8fafc 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <header 
        className="border-b text-gray-900 py-6"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(40px) saturate(200%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        }}
      >
        <div className="container mx-auto px-6">
          <h1 
            className="text-4xl lg:text-6xl font-black tracking-tight"
            style={{
              color: '#1f2937',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '0.1em'
            }}
          >
            VEO DIRECTOR
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-16 text-black">
        {/* Subtle Educational Note */}
        <div className="text-left mb-8">
          <p className="text-xs text-gray-400 max-w-2xl">
            <span className="inline-block mr-1" style={{fontSize: '8px', verticalAlign: 'super'}}>ⓘ</span> This tool helps you understand how to build effective video prompts by breaking down the components: 
            scene content, cinematic style, and technical parameters. Experiment with different combinations to see how each element affects your generated video.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tile Selection */}
          <div className="lg:col-span-2">
            <div className="p-10">
              {/* Inspiration Section */}
              <InspirationSection
                onInspirationSelect={handleInspirationSelect}
                selectedInspiration={selectedInspiration}
                sceneDescription={sceneDescription}
              />

              {/* Scene Description */}
              <SceneDescription
                sceneDescription={sceneDescription}
                selectedInspiration={selectedInspiration}
                onSceneChange={(value) => {
                  setSceneDescription(value);
                  // Clear inspiration selection when user types their own text
                  if (value && value.trim() !== '' && selectedInspiration) {
                    setSelectedInspiration(null);
                  }
                }}
              />

              {/* Director Presets */}
              <div className="flex justify-between items-center mb-8">
                <div></div>
                <button
                  onClick={resetSelections}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
              <DirectorPresets
                presets={DIRECTOR_PRESETS}
                selectedDirector={selectedDirector}
                onPresetSelect={handlePresetSelect}
              />

              {/* Technical Variable Tiles */}
              <div className="mt-32">
                <CategorySection
                  title="Equipment"
                  tiles={ALL_TILES[VIDEO_CATEGORIES.EQUIPMENT]}
                  selectedTile={selections[VIDEO_CATEGORIES.EQUIPMENT]}
                  onTileSelect={handleTileSelect}
                  category={VIDEO_CATEGORIES.EQUIPMENT}
                />
              </div>

              <CategorySection
                title="Movement"
                tiles={ALL_TILES[VIDEO_CATEGORIES.MOVEMENT]}
                selectedTile={selections[VIDEO_CATEGORIES.MOVEMENT]}
                onTileSelect={handleTileSelect}
                category={VIDEO_CATEGORIES.MOVEMENT}
              />

              <CategorySection
                title="Lighting"
                tiles={ALL_TILES[VIDEO_CATEGORIES.LIGHTING]}
                selectedTile={selections[VIDEO_CATEGORIES.LIGHTING]}
                onTileSelect={handleTileSelect}
                category={VIDEO_CATEGORIES.LIGHTING}
              />

              <CategorySection
                title="Palette"
                tiles={ALL_TILES[VIDEO_CATEGORIES.PALETTE]}
                selectedTile={selections[VIDEO_CATEGORIES.PALETTE]}
                onTileSelect={handleTileSelect}
                category={VIDEO_CATEGORIES.PALETTE}
              />

              <CategorySection
                title="Composition"
                tiles={ALL_TILES[VIDEO_CATEGORIES.COMPOSITION]}
                selectedTile={selections[VIDEO_CATEGORIES.COMPOSITION]}
                onTileSelect={handleTileSelect}
                category={VIDEO_CATEGORIES.COMPOSITION}
              />
            </div>
          </div>

          {/* Right Column - Video Generator */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <VideoGenerator 
                selections={selections}
                selectedInspiration={selectedInspiration}
                sceneDescription={sceneDescription}
                onGenerationComplete={handleVideoComplete}
                onReset={resetSelections}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Attribution */}
      <div className="fixed bottom-4 left-4 z-10">
        <p className="text-xs text-gray-400">
          Powered by Google's Veo 3 API
        </p>
      </div>
    </div>
  );
}

export default App;
