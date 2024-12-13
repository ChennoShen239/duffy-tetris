import React from 'react';

interface GameControlsProps {
  onMove: (direction: 'left' | 'right' | 'down') => void;
  onRotate: () => void;
  onPause: () => void;
  isPaused: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onMove,
  onRotate,
  onPause,
  isPaused,
}) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onMove('left')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => onMove('down')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          ↓
        </button>
        <button
          onClick={() => onMove('right')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          →
        </button>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onRotate}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          Rotate
        </button>
        <button
          onClick={onPause}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default GameControls;