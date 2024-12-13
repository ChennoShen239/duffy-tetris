import { BOARD_WIDTH } from '../constants/gameConstants';

export const isLineComplete = (row: (string | null)[]): boolean => {
  return row.every(cell => cell !== null);
};

export const findCompletedLines = (board: (string | null)[][]): number[] => {
  return board.reduce<number[]>((complete, row, index) => {
    if (isLineComplete(row)) {
      complete.push(index);
    }
    return complete;
  }, []);
};

export const removeLines = (board: (string | null)[][], linesToRemove: number[]): (string | null)[][] => {
  const newBoard = board.filter((_, index) => !linesToRemove.includes(index));
  const newRows = Array(linesToRemove.length)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(null));
  
  return [...newRows, ...newBoard];
};