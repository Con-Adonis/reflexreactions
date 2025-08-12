import React from 'react';

interface GameOverProps {
  level: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverProps> = ({ level, onRestart }) => (
  <div className="flex flex-col items-center justify-center animate-fadeIn">
    <h1 className="text-8xl font-bold text-red-500" style={{ textShadow: '0 0 15px #e74c3c' }}>
      Game Over
    </h1>
    <h2 className="text-4xl mt-4">You reached level {level}</h2>
    <button
      className="mt-12 px-8 py-4 bg-blue-500 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-blue-400 hover:scale-110 transform transition-all duration-200"
      onClick={onRestart}
    >
      Try Again
    </button>
  </div>
);

export default GameOverScreen;
