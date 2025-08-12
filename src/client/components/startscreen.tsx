import React from 'react';

const StartScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden">
    <h1 className="text-7xl font-bold text-red-400 animate-sway z-10" style={{ textShadow: '0 0 15px #e94560' }}>
      ReflexReactor
    </h1>
    <button
      className="mt-8 px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-lg shadow-lg hover:bg-green-400 hover:scale-110 transform transition-all duration-200 z-10"
      onClick={onStart}
    >
      Start
    </button>
  </div>
);

export default StartScreen;
