import React, { useState } from 'react';

const InspirationSection = ({ onInspirationSelect, selectedInspiration, sceneDescription }) => {

  const quickInspirations = [
    {
      id: 'detective_noir',
      label: 'Detective Noir',
      icon: '🕵️',
      description: 'A detective walking through a neon-lit alley at night',
      prompt: 'A detective walking through a neon-lit alley at night'
    },
    {
      id: 'desert_highway',
      label: 'Desert Highway',
      icon: '🏜️',
      description: 'A vintage car driving down a desert highway at sunset',
      prompt: 'A vintage car driving down a desert highway at sunset'
    },
    {
      id: 'coffee_shop',
      label: 'Coffee Shop',
      icon: '☕',
      description: 'A person looking out a rain-streaked window in a coffee shop',
      prompt: 'A person looking out a rain-streaked window in a coffee shop'
    },
    {
      id: 'space_station',
      label: 'Space Station',
      icon: '🚀',
      description: 'A robot exploring an abandoned space station',
      prompt: 'A robot exploring an abandoned space station'
    },
    {
      id: 'forest_path',
      label: 'Forest Path',
      icon: '🌲',
      description: 'Someone walking through a misty forest path at dawn',
      prompt: 'Someone walking through a misty forest path at dawn'
    },
    {
      id: 'city_rooftop',
      label: 'City Rooftop',
      icon: '🏙️',
      description: 'A person standing on a city rooftop at night',
      prompt: 'A person standing on a city rooftop at night'
    }
  ];

  const handleQuickInspirationSelect = (inspiration) => {
    // Allow selection if no custom text OR if switching between inspirations
    const hasCustomText = sceneDescription && sceneDescription.trim() !== '';
    const isSwitchingInspiration = selectedInspiration && hasCustomText;
    
    if (!hasCustomText || isSwitchingInspiration) {
      onInspirationSelect(inspiration);
    }
  };

  const clearSelection = () => {
    onInspirationSelect(null);
  };

  return (
    <div className="mb-20">
      {/* Header */}
      <div className="text-left mb-8">
        <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">
          Need Inspiration?
        </h2>
        <p className="text-sm text-gray-600">
          Click a scene below to get started, or describe your own scene below
        </p>
      </div>

      {/* Quick Inspiration Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {quickInspirations.map((inspiration) => {
          const hasCustomText = sceneDescription && sceneDescription.trim() !== '';
          const isSwitchingInspiration = selectedInspiration && hasCustomText;
          const isDisabled = hasCustomText && !isSwitchingInspiration;
          
          return (
            <button
              key={inspiration.id}
              onClick={() => handleQuickInspirationSelect(inspiration)}
              disabled={isDisabled}
              className={`
                card relative p-3 rounded-lg transition-all duration-300 text-left focus-ring
                ${selectedInspiration?.id === inspiration.id
                  ? 'bg-blue-50 shadow-lg ring-2 ring-blue-200 z-20'
                  : isDisabled
                    ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                    : 'bg-white hover:shadow-md hover:z-10'
                }
                ${isDisabled ? '' : 'tile-hover hover:scale-[1.02] active:scale-[0.98] transform'}
              `}
            style={{
              background: selectedInspiration?.id === inspiration.id
                ? 'rgba(59, 130, 246, 0.1)'
                : isDisabled
                  ? 'rgba(243, 244, 246, 0.5)'
                  : 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(40px) saturate(200%)',
              border: selectedInspiration?.id === inspiration.id
                ? '1px solid rgba(59, 130, 246, 0.3)'
                : isDisabled
                  ? '1px solid rgba(209, 213, 219, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: selectedInspiration?.id === inspiration.id
                ? '0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
                : isDisabled
                  ? '0 4px 12px rgba(0, 0, 0, 0.05)'
                  : '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
              color: isDisabled ? '#9ca3af' : '#1f2937'
            }}
          >
            {selectedInspiration?.id === inspiration.id && (
              <div
                className="absolute z-50 text-white text-xs font-semibold px-2 py-1 rounded-md"
                style={{
                  backgroundColor: '#3b82f6',
                  top: '-4px',
                  right: '4px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '0.025em'
                }}
              >
                SELECTED
              </div>
            )}
            <div className="relative z-10">
              <div className="text-lg mb-1">
                {inspiration.icon}
              </div>
              <div className={`font-black text-sm mb-1 ${selectedInspiration?.id === inspiration.id ? 'text-blue-700' : isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
                {inspiration.label}
              </div>
              <div className={`text-xs leading-relaxed ${selectedInspiration?.id === inspiration.id ? 'text-blue-600' : isDisabled ? 'text-gray-300' : 'text-gray-400'}`}>
                {inspiration.description}
              </div>
            </div>
            {!isDisabled && (
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full opacity-60"></div>
            )}
          </button>
          );
        })}
      </div>

      {/* Selected Inspiration Summary */}
      {selectedInspiration && (
        <div 
          className="card p-4 bg-blue-50 rounded-lg mb-6"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            backdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-3">{selectedInspiration.icon}</span>
                <h4 className="font-bold text-base text-gray-900">
                  {selectedInspiration.label}
                </h4>
              </div>
              <p className="text-sm text-gray-700">
                This will be used as your scene description below
              </p>
            </div>
            <button
              onClick={clearSelection}
              className="ml-4 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 rounded transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspirationSection;