import { useGameLogic } from './hooks/usegamelogic';
// --- FIXED: Imports without .tsx extension ---
import StartScreen from './components/startscreen';
import GameScreen from './components/gamescreen';
import GameOverScreen from './components/gameoverscreen';

function App() {
  const {
    gameState,
    level,
    timer,
    flashMessage,
    currentLevelData,
    startGame,
    handleShapeClick
  } = useGameLogic();

  const renderGameState = () => {
    switch (gameState) {
      case 'playing':
        return (
          <GameScreen
            level={level}
            timer={timer}
            flashMessage={flashMessage}
            levelData={currentLevelData}
            onShapeClick={handleShapeClick}
          />
        );
      case 'gameOver':
        return <GameOverScreen level={level} onRestart={startGame} />;
      case 'start':
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
      <div className="w-screen h-screen">
          {renderGameState()}
      </div>
  );
}

export default App;
