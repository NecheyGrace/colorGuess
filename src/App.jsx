import { useState, useEffect } from "react";

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  // Generate random RGB color
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Initialize or reset game
  const startNewGame = () => {
    const correctColor = generateRandomColor();
    const options = [correctColor];

    // Generate 5 more random colors
    while (options.length < 6) {
      const newColor = generateRandomColor();
      if (!options.includes(newColor)) {
        options.push(newColor);
      }
    }

    // Shuffle the options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    setTargetColor(correctColor);
    setColorOptions(shuffledOptions);
    setGameStatus("");
  };

  // Handle color selection
  const handleColorClick = (selectedColor) => {
    if (selectedColor === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("Correct! 🎉");
      setTimeout(startNewGame, 1500);
    } else {
      setGameStatus("Wrong! Try again 😢");
    }
  };

  // Initialize game on component mount
  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* Game Instructions */}
        <h1
          className="text-2xl font-bold text-center mb-6"
          data-testid="gameInstructions"
        >
          Guess the Color!
        </h1>

        {/* Target Color Box */}
        <div
          className="w-full h-48 rounded-lg mb-6"
          style={{ backgroundColor: targetColor }}
          data-testid="colorBox"
        />

        {/* Score Display */}
        <div className="text-center mb-4">
          <p className="text-xl font-semibold" data-testid="score">
            Score: {score}
          </p>
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          <p
            className={`text-lg ${
              gameStatus.includes("Correct") ? "text-green-600" : "text-red-600"
            }`}
            data-testid="gameStatus"
          >
            {gameStatus}
          </p>
        </div>

        {/* Color Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              className="w-full h-20 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
              data-testid="colorOption"
            />
          ))}
        </div>

        {/* New Game Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={startNewGame}
          data-testid="newGameButton"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default ColorGame;
