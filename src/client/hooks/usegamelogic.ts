import { useState, useEffect, useCallback } from 'react';
import { GameState, LevelData, SHAPES, COLORS, ShapeType, ColorType } from '../global';

// --- FIXED HELPER FUNCTION ---
const getRandomItem = <T,>(arr: T[]): T => {
  if (arr.length === 0) {
    throw new Error('Cannot get a random item from an empty array.');
  }
  // Add a "!" at the end to assert that the value is not undefined.
  return arr[Math.floor(Math.random() * arr.length)]!;
};

// ... the rest of the file is the same ...

const generateLevel = (level: number): LevelData => {
  const correctColor = getRandomItem(COLORS);
  const correctShape = getRandomItem(SHAPES);

  let instructionColor = correctColor;
  if (level > 5) {
    const possibleColors = COLORS.filter(c => c !== correctColor);
    instructionColor = getRandomItem(possibleColors);
  }

  const correct = { color: correctColor, shape: correctShape };

  let numShapes = 1;
  if (level >= 3) numShapes = 3;
  if (level >= 5) numShapes = 5;
  if (level >= 7) numShapes = 8;
  if (level >= 12) numShapes = 12;

  const shapes = [{ ...correct, id: 'correct-0' }];
  while (shapes.length < numShapes) {
    const decoy = { color: getRandomItem(COLORS), shape: getRandomItem(SHAPES) };
    if (decoy.color !== correct.color || decoy.shape !== correct.shape) {
      shapes.push({ ...decoy, id: `decoy-${shapes.length}` });
    }
  }

  shapes.sort(() => Math.random() - 0.5);

  return { instruction: { text: correctColor, color: instructionColor, shape: correctShape }, correct, shapes };
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(15);
  const [currentLevelData, setCurrentLevelData] = useState<LevelData | null>(null);
  const [flashMessage, setFlashMessage] = useState('');

  const startGame = () => {
    setLevel(1);
    setTimer(10);
    setCurrentLevelData(generateLevel(1));
    setGameState('playing');
  };

  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setTimer(prev => Math.min(prev + 1, 10));
    setCurrentLevelData(generateLevel(newLevel));
    setFlashMessage('+1s');
    setTimeout(() => setFlashMessage(''), 1000);
  }, [level]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timer <= 0) { setGameState('gameOver'); return; }
    const intervalId = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(intervalId);
  }, [gameState, timer]);

  const handleShapeClick = (shape: ShapeType, color: ColorType) => {
    if (gameState !== 'playing' || !currentLevelData) return;
    if (shape === currentLevelData.correct.shape && color === currentLevelData.correct.color) {
      nextLevel();
    } else {
      setTimer(t => Math.max(t - 2, 0));
    }
  };

  return { gameState, level, timer, flashMessage, currentLevelData, startGame, handleShapeClick };
};
