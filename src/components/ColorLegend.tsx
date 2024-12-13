import React from 'react';
import { DUFFY_THEME_COLORS } from '../constants/colors';

const colorDescriptions = [
  { type: 'I', character: 'Duffy', description: 'Warm Brown' },
  { type: 'J', character: 'ShellieMay', description: 'Sweet Pink' },
  { type: 'L', character: 'Gelatoni', description: 'Artist Turquoise' },
  { type: 'O', character: 'StellaLou', description: 'Dreamy Purple' },
  { type: 'S', character: 'CookieAnn', description: 'Golden Yellow' },
  { type: 'T', character: 'LinaBell', description: 'Vibrant Pink' },
  { type: 'Z', character: 'Special', description: 'Rose Pink' },
];

const ColorLegend: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-64">
      <h2 className="text-xl font-serif italic mb-4 text-center">Color Guide</h2>
      <div className="space-y-3">
        {colorDescriptions.map(({ type, character, description }) => (
          <div key={type} className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: DUFFY_THEME_COLORS[type as keyof typeof DUFFY_THEME_COLORS] }}
            />
            <div>
              <span className="font-medium">{character}</span>
              <span className="text-gray-500 text-sm"> - {description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorLegend; 