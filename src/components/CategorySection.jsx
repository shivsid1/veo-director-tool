import React from 'react';
import Tile from './Tile';

const CategorySection = ({ 
  title, 
  tiles, 
  selectedTile, 
  onTileSelect, 
  category 
}) => {
  return (
    <div className="mb-20 mt-16">
      {/* Category Header */}
      <div className="mb-10">
        <h3 
          className="text-2xl font-black text-gray-900 mb-3 tracking-tight"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {title.toUpperCase()}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      
      {/* Tiles Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.values(tiles).map((tile) => (
          <Tile
            key={tile.id}
            tile={tile}
            isSelected={selectedTile === tile.id}
            onSelect={onTileSelect}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
