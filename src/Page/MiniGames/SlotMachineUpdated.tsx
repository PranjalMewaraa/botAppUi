import Price from '@/components/Price';
import React, { useState } from 'react';

interface ReelProps {
  symbol: string;
}

const Reel: React.FC<ReelProps> = ({ symbol }) => {
  return (
    <div className="flex items-center justify-center w-28 h-36 border-2 border-gray-600 bg-gradient-to-b from-gray-400 to-gray-200 shadow-lg">
      <h2 className="text-3xl">{symbol}</h2>
    </div>
  );
};

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>(['?', '?', '?']); // Initial state with three reels
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [message,setMessage]=useState<string>("Can You Hit the $-Jackpot-$");
  const loser = [
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
  ];
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
        setMessage("Yohooo! You won the Jackpot")
      } else {
        console.log("Lost! Reels are: ", newReels);
        setMessage(loser[Math.floor(Math.random() * loser.length)])
      }
    }, 1000); // Delay for the spin effect
  };

  return (
    <div id='main_div' className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center mt-10">
        <h1 className='w-full font-[ageobold] text-6xl text-center my-2 text-white'>Slot Machine</h1>
        <h3 className='w-full font-[ageobold] text-yellow-400 text-center text-xl mb-2'>{message}</h3>
        <div className='flex flex-col gap-4 pt-2 px-2'>
          <div className="flex border-2 border-yellow-500 rounded-lg">
            {reels.map((symbol, index) => (
              <Reel key={index} symbol={symbol} />
            ))}
          </div>
          <div className='flex gap-4 justify-center items-center'>
            <div className='flex flex-col items-center gap-1 rounded'>
              <span className='text-white'>Bet:</span>
              <div className='h-8 w-20 flex justify-center items-center bg-white border-yellow-300 border text-black'>10</div>
            </div>
          </div>
        </div>
       
        <button
          onClick={spinReels}
          disabled={isSpinning}
          className={`mt-4 mx-4 w-full px-4 flex items-center justify-center gap-4 py-2 text-white rounded-lg ${isSpinning ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-700'}`}
        >
          {isSpinning ? 'Spinning...' : 'Spin!'} <span> <Price amount={1000}/> </span>
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
