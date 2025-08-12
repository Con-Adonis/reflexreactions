import React from 'react';
import Shape from './shape'; // Ensure this matches the filename, typically PascalCase
import { LevelData, ColorType, ShapeType } from '../global';

interface GameScreenProps {
  level: number;
  timer: number;
  flashMessage: string;
  levelData: LevelData | null;
  onShapeClick: (shape: ShapeType, color: ColorType) => void;
}

const colorTextClasses: Record<ColorType, string> = {
    red: 'text-red-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
};

const GameScreen: React.FC<GameScreenProps> = ({ level, timer, flashMessage, levelData, onShapeClick }) => {
  if (!levelData) return <div className="text-2xl">Loading...</div>;

  const timerColor = timer <= 5 ? 'text-red-500 scale-110' : '';
  const timerAnimation = timer <= 0 ? 'animate-explode' : '';

  return (
    <div className="w-full h-full relative">
      {/* HUD (z-20 makes it appear on top) */}
      <div className="absolute top-5 left-5 right-5 flex justify-between text-2xl font-bold z-20">
        <div className={`bg-black/30 p-3 rounded-lg relative transition-all duration-300 ${timerColor} ${timerAnimation}`}>
          Time: {timer}
          {flashMessage && (
            <span className="absolute top-0 left-1/2 text-green-400 animate-flash font-semibold">
              {flashMessage}
            </span>
          )}
        </div>
        <div className="bg-black/30 p-3 rounded-lg">Level: {level}</div>
      </div>

       {/* INSTRUCTIONS (FIXED: Added z-20 to ensure it's on top) */}
      <div className="pt-24 text-3xl font-bold relative z-20">
        Click the <span className={`${colorTextClasses[levelData.instruction.color]} font-black`}>{levelData.instruction.text}</span> {levelData.instruction.shape}
      </div>

      {/* GAME AREA (z-10 places it below the HUD/Instructions) */}
      <div className="absolute inset-0 w-full h-full z-10">
        {levelData.shapes.map((s) => (
          <Shape key={s.id} {...s} onClick={onShapeClick} level={level} />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
