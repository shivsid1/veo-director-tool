import React from 'react';
import { FaFilm, FaTheaterMasks, FaEye, FaMoon, FaRocket, FaHeart, FaGhost, FaSun } from 'react-icons/fa';

// Director colors and icons
const getDirectorColor = (directorId) => {
  const colors = {
    nolan: '#93c5fd',      // Pastel blue
    anderson: '#fca5a5',   // Pastel red
    kubrick: '#86efac',    // Pastel green
    lynch: '#c4b5fd',      // Pastel purple
    tarantino: '#fde68a',  // Pastel yellow
    scorsese: '#f87171',   // Pastel orange
    spielberg: '#a7f3d0',  // Pastel mint
    villeneuve: '#e0e7ff'  // Pastel indigo
  };
  return colors[directorId] || '#d1d5db';
};

const getDirectorIcon = (directorId) => {
  const icons = {
    nolan: <FaFilm className="w-5 h-5" />,
    anderson: <FaTheaterMasks className="w-5 h-5" />,
    kubrick: <FaEye className="w-5 h-5" />,
    lynch: <FaMoon className="w-5 h-5" />,
    tarantino: <FaRocket className="w-5 h-5" />,
    scorsese: <FaHeart className="w-5 h-5" />,
    spielberg: <FaSun className="w-5 h-5" />,
    villeneuve: <FaGhost className="w-5 h-5" />
  };
  return icons[directorId] || <FaFilm className="w-5 h-5" />;
};

const DirectorPresets = ({ presets, selectedDirector, onPresetSelect }) => {
  const getPresetDetails = (preset) => {
    const details = {
      nolan: {
        style: 'Epic • Practical Effects • IMAX',
        signature: 'Large-scale practical effects with IMAX cinematography'
      },
      anderson: {
        style: 'Symmetrical • Colorful • Whimsical',
        signature: 'Perfect symmetry with vibrant color palettes'
      },
      kubrick: {
        style: 'One-Point • Meticulous • Cold',
        signature: 'Precise one-point perspective with clinical precision'
      },
      lynch: {
        style: 'Surreal • Dark • Mysterious',
        signature: 'Dreamlike sequences with dark, mysterious undertones'
      },
      tarantino: {
        style: 'Violent • Dialogue • Non-Linear',
        signature: 'Sharp dialogue with stylized violence and time manipulation'
      },
      scorsese: {
        style: 'Gritty • Urban • Character-Driven',
        signature: 'Raw urban realism with complex character studies'
      },
      spielberg: {
        style: 'Adventure • Family • Spectacle',
        signature: 'Epic adventures with emotional depth and wonder'
      },
      villeneuve: {
        style: 'Atmospheric • Slow • Contemplative',
        signature: 'Meditative pacing with stunning visual landscapes'
      }
    };
    return details[preset.id] || details.nolan;
  };

  return (
    <div className="mb-16 mt-16">
      {/* Section Header */}
      <div className="mb-12">
        <h3 
          className="text-2xl font-black text-gray-900 mb-3 tracking-tight"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          🎬 DIRECTOR STYLES
        </h3>
        <p className="text-base text-gray-600 mb-3">
          Choose a complete cinematic vision that auto-selects equipment, movement, lighting, palette, and composition below
        </p>
        <p className="text-sm text-gray-500 mb-3">
          Each director style is a pre-configured combination of technical parameters that you can see and modify in the sections below
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      
      {/* Director Cards - 2x4 Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(presets).map((preset) => {
          const details = getPresetDetails(preset);
          return (
            <button
              key={preset.id}
              onClick={() => onPresetSelect(preset.selections, preset.id)}
              className={`
                card relative p-4 rounded-lg transition-all duration-300 text-left focus-ring w-full
                ${selectedDirector === preset.id 
                  ? 'bg-blue-50 shadow-lg ring-2 ring-blue-200 z-20' 
                  : 'bg-white hover:shadow-md hover:z-10'
                }
                tile-hover hover:scale-[1.02] active:scale-[0.98] transform
              `}
              style={{
                background: selectedDirector === preset.id 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(40px) saturate(200%)',
                border: selectedDirector === preset.id 
                  ? '1px solid rgba(59, 130, 246, 0.3)' 
                  : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: selectedDirector === preset.id
                  ? '0 12px 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
                  : '0 12px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
                color: '#1f2937'
              }}
            >
              {/* Color Bar */}
              <div 
                className="h-3 w-full rounded-t-lg mb-3 relative"
                style={{ backgroundColor: getDirectorColor(preset.id) }}
              >
                {/* Icon in top-right corner */}
                <div className="absolute top-1 right-2 text-white opacity-80">
                  {getDirectorIcon(preset.id)}
                </div>
              </div>
              
              {/* Director Name */}
              <div className="mb-3">
                <h4 className="font-bold text-base text-gray-900">
                  {preset.label}
                </h4>
              </div>

              {/* Style Description */}
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  {details.style}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {details.signature}
                </p>
              </div>

              {/* SELECTED Tag */}
              {selectedDirector === preset.id && (
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
            </button>
          );
        })}
      </div>

      {/* Expanded white space */}
      <div className="mt-12 h-40 bg-white"></div>
    </div>
  );
};

export default DirectorPresets;