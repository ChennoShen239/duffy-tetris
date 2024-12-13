import React from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import GameStats from './components/GameStats';
import ColorLegend from './components/ColorLegend';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    board,
    currentPiece,
    score,
    level,
    lines,
    isPaused,
    gameOver,
    moveBlock,
    rotateBlock,
    togglePause
  } = useGameLogic();

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-serif italic text-gray-800 mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          ✧ Duffy & Friends Tetris ✧
        </h1>
        <div className="flex flex-col items-center">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <div className="flex flex-col items-center">
              <GameBoard board={board} currentPiece={currentPiece} gameOver={gameOver} />
              <GameStats score={score} level={level} lines={lines} />
              <GameControls
                onMove={moveBlock}
                onRotate={rotateBlock}
                onPause={togglePause}
                isPaused={isPaused}
              />
            </div>
            <ColorLegend />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;