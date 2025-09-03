import React from 'react';

const Tile = ({ 
  tile, 
  isSelected, 
  onSelect, 
  category 
}) => {
  return (
    <button
      onClick={() => onSelect(category, tile.id)}
      className={`
        card relative group p-6 rounded-lg transition-all duration-300 text-left focus-ring
        ${isSelected 
          ? 'bg-blue-50 shadow-lg ring-2 ring-blue-200 z-20' 
          : 'bg-white hover:shadow-md hover:z-10'
        }
        tile-hover hover:scale-[1.02] active:scale-[0.98] transform
      `}
      style={{
        background: isSelected 
          ? 'rgba(59, 130, 246, 0.1)' 
          : 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(40px) saturate(200%)',
        border: isSelected 
          ? '1px solid rgba(59, 130, 246, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isSelected
          ? '0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
          : '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
        color: '#1f2937'
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
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
        {/* Icon */}
        <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200">
          {tile.icon}
        </div>
        
        {/* Label */}
        <div className={`font-black text-base mb-2 ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
          {tile.label}
        </div>
        
        {/* Description */}
        <div className={`text-xs leading-loose ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
          {tile.description}
        </div>
      </div>

      {/* Blue accent line on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full opacity-60"></div>
    </button>
  );
};

export default Tile;
