import React, { useState } from 'react';

// Define the props for the Reel component
interface ReelProps {
  symbol: string;
}

// Reel component representing a single reel
const Reel: React.FC<ReelProps> = ({ symbol }) => {
  return (
    <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-600 bg-gray-200">
      <h2 className="text-3xl">{symbol}</h2>
    </div>
  );
};

// Main SlotMachine component
const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>(['?', '?', '?']);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  
  const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍀'];

  const spinReels = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const newReels = symbols.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    
    setTimeout(() => {
      setReels(newReels);
      setIsSpinning(false);
    }, 1000); // Delay for the spin effect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex flex-col items-center mt-10">
      <div className="flex space-x-4">
        {reels.map((symbol, index) => (
          <Reel key={index} symbol={symbol} />
        ))}
      </div>
      <button
        onClick={spinReels}
        disabled={isSpinning}
        className={`mt-4 px-4 py-2 text-white rounded-lg ${isSpinning ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
      >
        {isSpinning ? 'Spinning...' : 'Spin!'}
      </button>
    </div>
    </div>
  );
};

export default SlotMachine;
