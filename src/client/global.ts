// --- TYPES ---
export type ShapeType = 'square' | 'circle' | 'triangle';
export type ColorType = 'red' | 'green' | 'blue';
export type GameState = 'start' | 'playing' | 'gameOver';

export interface ShapeConfig {
  id: string;
  color: ColorType;
  shape: ShapeType;
}

export interface LevelData {
  instruction: {
    text: ColorType;
    color: ColorType;
    shape: ShapeType;
  };
  correct: {
    color: ColorType;
    shape: ShapeType;
  };
  shapes: ShapeConfig[];
}

// --- CONSTANTS ---
export const SHAPES: ShapeType[] = ['square', 'circle', 'triangle'];
export const COLORS: ColorType[] = ['red', 'green', 'blue'];
