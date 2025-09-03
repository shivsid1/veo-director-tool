import { useState } from 'react';

const SceneDescription = ({ sceneDescription, onSceneChange, selectedInspiration }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onSceneChange(e.target.value);
  };

  // Dynamic placeholder based on whether inspiration is selected
  const getPlaceholder = () => {
    if (selectedInspiration) {
      return `Great start! Now add more details to make it even better...\n\nYou can expand on:\n• What's happening in the scene?\n• What's the mood or atmosphere?\n• Any specific actions or movements?\n• Additional characters or objects?\n• Time of day or weather?\n\nTip: The more specific details you add, the better your video will be!`;
    }
    
    return "Describe your scene...\n\nInclude: Main subject, setting, action, mood, and any specific details\n\nExamples:\n• A detective walking through a neon-lit alley at night\n• A vintage car driving down a desert highway at sunset\n• A person looking out a rain-streaked window in a coffee shop\n• A robot exploring an abandoned space station\n\nTip: Be specific about what you want to see - the more detail, the better the result!";
  };

  return (
    <div className="mb-32">
      {/* Section Header */}
      <div className="mb-8">
        <h3 
          className="text-2xl font-black text-gray-900 mb-3 tracking-tight"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          SCENE DESCRIPTION
        </h3>
        <p className="text-base text-gray-600 mb-3">
          Describe what you want to see in your video
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
          value={sceneDescription}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={getPlaceholder()}
          className={`
            w-full p-8 rounded-lg transition-all duration-300 resize-none focus:outline-none scene-description-textarea
            ${isFocused ? 'ring-2 ring-blue-200' : ''}
          `}
          style={{
            background: isFocused
              ? 'rgba(59, 130, 246, 0.05)'
              : 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(40px) saturate(200%)',
            border: isFocused
              ? '1px solid rgba(59, 130, 246, 0.3)'
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: isFocused
              ? '0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
              : '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
            color: '#1f2937',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '16px',
            lineHeight: '1.6',
            minHeight: '160px',
            overflow: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}

        />
        
      </div>
      
      {/* Character Count - Moved outside textarea */}
      <div className="text-right text-xs text-gray-400 mt-4 mb-8">
        {sceneDescription.length}/500
      </div>

    </div>
  );
};

export default SceneDescription;
