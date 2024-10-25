import Price from '@/components/Price';
import React, { useState } from 'react';

interface ReelProps {
  symbol: string;
}

const Reel: React.FC<ReelProps> = ({ symbol }) => {
  return (
    <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-600 bg-gradient-to-b from-gray-300 to-gray-200 shadow-lg rounded-lg">
      <h2 className="text-3xl">{symbol}</h2>
    </div>
  );
};

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>(['?', '?', '?']); // Initial state with three reels
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍀'];

  const spinReels = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const newReels = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);

    setTimeout(() => {
      setReels(newReels);
      setIsSpinning(false);
      
      // Check for win condition
      if (newReels.every((symbol) => symbol === newReels[0])) {
        console.log("Win! All three reels are the same: ", newReels[0]);
      } else {
        console.log("Lost! Reels are: ", newReels);
      }
    }, 1000); // Delay for the spin effect
  };

  return (
    <div id='main_div' className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center mt-10">
        <div className="flex space-x-4">
          {reels.map((symbol, index) => (
            <Reel key={index} symbol={symbol} />
          ))}
        </div>
        <button
          onClick={spinReels}
          disabled={isSpinning}
          className={`mt-4 mx-4 w-full px-4 flex items-center gap-4 py-2 text-white rounded-lg ${isSpinning ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-700'}`}
        >
          {isSpinning ? 'Spinning...' : 'Spin!'} <span> <Price amount={1000}/> </span>
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
