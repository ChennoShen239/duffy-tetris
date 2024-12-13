import { POINTS_PER_LINE } from '../constants/gameConstants';

export const calculateScore = (clearedLines: number, level: number): number => {
  return (POINTS_PER_LINE[clearedLines as keyof typeof POINTS_PER_LINE] || 0) * level;
};

export const shouldLevelUp = (currentLines: number, currentLevel: number): boolean => {
  return currentLines >= currentLevel * 10;
};