import React from 'react';

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
}

const GameStats: React.FC<GameStatsProps> = ({ score, level, lines }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-600">Score</div>
          <div className="text-xl font-bold text-gray-800">{score}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Level</div>
          <div className="text-xl font-bold text-gray-800">{level}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Lines</div>
          <div className="text-xl font-bold text-gray-800">{lines}</div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;