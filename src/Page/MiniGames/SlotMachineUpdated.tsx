import React, { useState, useEffect, useRef } from "react";

// Spinner Component Props
type SpinnerProps = {
  timer: number;
  onFinish: (value: number) => void;
};

// Constant for icon height
const iconHeight = 188;

// Function to set the initial start position for the spinner
const setStartPosition = () => {
  return Math.floor(Math.random() * 9) * iconHeight * -1;
};

// Spinner Functional Component
const Spinner: React.FC<SpinnerProps> = ({ timer, onFinish }) => {
  const [position, setPosition] = useState(setStartPosition());
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const multiplier = useRef(Math.floor(Math.random() * 3) + 1);

  // Function to move the spinner background and calculate new position
  const moveBackground = () => {
    setPosition((prevPosition) => prevPosition - iconHeight * multiplier.current);
    setTimeRemaining((prevTime) => prevTime - 100);
  };

  // Calculate the symbol position after spinning stops
  const getSymbolFromPosition = () => {
    let currentPosition = position;
    const totalSymbols = 9;
    const maxPosition = iconHeight * (totalSymbols - 1) * -1;
    const moved = (timer / 100) * multiplier.current;

    for (let i = 0; i < moved; i++) {
      currentPosition -= iconHeight;
      if (currentPosition < maxPosition) currentPosition = 0;
    }

    // Trigger the callback with the final position value
    onFinish(currentPosition);
  };

  // Effect hook to handle the spinning animation and timing
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(interval);
        getSymbolFromPosition();
      } else {
        moveBackground();
      }
    }, 100);

    // Cleanup interval when component unmounts or when timer is done
    return () => clearInterval(interval);
  }, [timeRemaining]);

  return (
    <div
      style={{ backgroundPosition: `0px ${position}px` }}
      className="w-32 h-96 bg-white bg-repeat-y overflow-hidden transition-background duration-300 ease-in-out"
    />
  );
};

// SlotMachine Functional Component
const SlotMachine: React.FC = () => {
  const [winner, setWinner] = useState<boolean | null>(null);
  const matches = useRef<number[]>([]);

  // List of potential losing phrases
  const loserMessages = [
    "Not quite",
    "Stop gambling",
    "Hey, you lost!",
    "Ouch! I felt that",
    "Don't beat yourself up",
    "There goes the college fund",
    "I have a cat. You have a loss",
    "You're awesome at losing",
    "Coding is hard",
    "Don't hate the coder",
  ];

  // Callback function to handle when each spinner finishes
  const finishHandler = (value: number) => {
    matches.current.push(value);

    if (matches.current.length === 3) {
      const first = matches.current[0];
      const isWinner = matches.current.every((match) => match === first);
      setWinner(isWinner);
      matches.current = []; // Reset for the next round
    }
  };

  // Handle the "Play again" click event
  const handleClick = () => {
    setWinner(null);
    matches.current = [];
  };

  // Function to get a random losing message
  const getRandomLoserMessage = () => loserMessages[Math.floor(Math.random() * loserMessages.length)];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Conditionally play winning sound */}
      {winner && (
        <audio autoPlay className="hidden">
          <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
        </audio>
      )}

      {/* Display the current game status */}
      <h1 className="text-4xl font-semibold">
        {winner === null
          ? "Waiting…"
          : winner
          ? "🤑 Pure skill! 🤑"
          : getRandomLoserMessage()}
      </h1>

      {/* Spinner container */}
      <div className="relative flex items-center justify-center overflow-hidden h-[632px] py-8">
        {/* Each Spinner with different timer values */}
        <Spinner timer={1000} onFinish={finishHandler} />
        <Spinner timer={1400} onFinish={finishHandler}  />
        <Spinner timer={2200} onFinish={finishHandler} />

        {/* Overlay to create a shadow effect */}
        <div className="absolute inset-8 bg-gradient-to-b from-gray-900 to-transparent"></div>
      </div>

      {/* Button to restart the game */}
      {winner !== null && (
        <button
          aria-label="Play again"
          className="mt-4 w-12 h-12 bg-repeat bg-center bg-no-repeat animate-spin"
          style={{
            backgroundImage:
              "url(https://andyhoffman.codes/random-assets/img/slots/repeat.png)",
          }}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default SlotMachine;
