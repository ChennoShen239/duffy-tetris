import { TETROMINOS, TetrominoType } from '../constants/tetrominos';

export const createEmptyBoard = (height: number, width: number) => 
  Array(height).fill(null).map(() => Array(width).fill(null));

export const randomTetromino = (): TetrominoType => {
  const tetrominos = 'IJLOSTZ';
  return tetrominos[Math.floor(Math.random() * tetrominos.length)] as TetrominoType;
};

export const rotateMatrix = (matrix: number[][]) => {
  const N = matrix.length;
  const rotated = matrix.map((row, i) => 
    row.map((_, j) => matrix[N - 1 - j][i])
  );
  return rotated;
};

export const isValidMove = (
  board: (string | null)[][],
  shape: number[][],
  pos: { x: number; y: number }
) => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = pos.x + x;
        const newY = pos.y + y;
        
        if (
          newX < 0 || 
          newX >= board[0].length ||
          newY >= board.length ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};