import React from 'react';
import { DUFFY_THEME_COLORS } from '../constants/colors';

interface GameBoardProps {
  board: number[][];
  currentPiece: {
    shape: number[][];
    position: { x: number; y: number };
    type: string;
  } | null;
  gameOver: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, currentPiece, gameOver }) => {
  const getCellColor = (value: number, row: number, col: number): string => {
    if (currentPiece && 
        row >= currentPiece.position.y && 
        row < currentPiece.position.y + currentPiece.shape.length &&
        col >= currentPiece.position.x && 
        col < currentPiece.position.x + currentPiece.shape[0].length &&
        currentPiece.shape[row - currentPiece.position.y][col - currentPiece.position.x]) {
      return DUFFY_THEME_COLORS[currentPiece.type as keyof typeof DUFFY_THEME_COLORS];
    }
    return value ? DUFFY_THEME_COLORS[['I', 'J', 'L', 'O', 'S', 'T', 'Z'][value - 1] as keyof typeof DUFFY_THEME_COLORS] : DUFFY_THEME_COLORS.background;
  };

  return (
    <div className="relative">
      <div 
        className="grid gap-px bg-gray-200 p-1 rounded-lg"
        style={{ 
          gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square"
              style={{
                backgroundColor: getCellColor(cell, rowIndex, colIndex),
                width: '30px',
                transition: 'background-color 0.1s',
              }}
            />
          ))
        ))}
      </div>
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Game Over</div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;