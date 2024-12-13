import { useState, useEffect, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], type: 'I' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], type: 'J' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], type: 'L' },
  O: { shape: [[1, 1], [1, 1]], type: 'O' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], type: 'S' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], type: 'T' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], type: 'Z' },
};

const createEmptyBoard = () => 
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const getRandomTetromino = () => {
  const tetrominos = Object.values(TETROMINOS);
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return {
    shape: randTetromino.shape,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    type: randTetromino.type,
  };
};

export const useGameLogic = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(getRandomTetromino());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const isColliding = useCallback((piece: typeof currentPiece, board: number[][], position = { x: 0, y: 0 }) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.position.x + x + position.x;
          const newY = piece.position.y + y + position.y;
          
          if (
            newX < 0 || 
            newX >= BOARD_WIDTH || 
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const rotatePiece = useCallback((piece: typeof currentPiece) => {
    const rotated = {
      ...piece,
      shape: piece.shape[0].map((_, i) => 
        piece.shape.map(row => row[i]).reverse()
      ),
    };
    if (!isColliding(rotated, board)) {
      return rotated;
    }
    return piece;
  }, [board, isColliding]);

  const moveBlock = useCallback((direction: 'left' | 'right' | 'down') => {
    if (gameOver || isPaused) return;

    setCurrentPiece(prev => {
      const movement = {
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
        down: { x: 0, y: 1 },
      }[direction];

      const newPiece = {
        ...prev,
        position: {
          x: prev.position.x + movement.x,
          y: prev.position.y + movement.y,
        },
      };

      if (!isColliding(newPiece, board)) {
        return newPiece;
      }

      if (direction === 'down') {
        // 方块已经落地，更新游戏板
        const newBoard = [...board];
        prev.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value) {
              const pieceY = prev.position.y + y;
              const pieceX = prev.position.x + x;
              if (pieceY >= 0) {
                newBoard[pieceY][pieceX] = Object.keys(TETROMINOS).indexOf(prev.type as keyof typeof TETROMINOS) + 1;
              }
            }
          });
        });

        // 检查是否有完整的行
        let clearedLines = 0;
        for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
          if (newBoard[y].every(cell => cell !== 0)) {
            newBoard.splice(y, 1);
            newBoard.unshift(Array(BOARD_WIDTH).fill(0));
            clearedLines++;
            y++;
          }
        }

        if (clearedLines > 0) {
          const points = [40, 100, 300, 1200][clearedLines - 1] * level;
          setScore(prev => prev + points);
          setLines(prev => {
            const newLines = prev + clearedLines;
            setLevel(Math.floor(newLines / 10) + 1);
            return newLines;
          });
        }

        setBoard(newBoard);
        const newPiece = getRandomTetromino();
        if (isColliding(newPiece, newBoard)) {
          setGameOver(true);
        } else {
          setCurrentPiece(newPiece);
        }
      }

      return prev;
    });
  }, [board, gameOver, isPaused, isColliding, level]);

  const rotateBlock = useCallback(() => {
    if (gameOver || isPaused) return;
    setCurrentPiece(prev => rotatePiece(prev));
  }, [gameOver, isPaused, rotatePiece]);

  const togglePause = useCallback(() => {
    if (!gameOver) {
      setIsPaused(prev => !prev);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!isPaused && !gameOver) {
      const speed = Math.max(INITIAL_SPEED - (level - 1) * 100, 100);
      const gameLoop = setInterval(() => {
        moveBlock('down');
      }, speed);

      return () => {
        clearInterval(gameLoop);
      };
    }
  }, [isPaused, gameOver, level, moveBlock]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveBlock('left');
      else if (event.key === 'ArrowRight') moveBlock('right');
      else if (event.key === 'ArrowDown') moveBlock('down');
      else if (event.key === 'ArrowUp') rotateBlock();
      else if (event.key === ' ') togglePause();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [moveBlock, rotateBlock, togglePause]);

  return {
    board,
    currentPiece,
    score,
    level,
    lines,
    isPaused,
    gameOver,
    moveBlock,
    rotateBlock,
    togglePause,
  };
};