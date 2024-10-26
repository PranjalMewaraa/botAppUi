import Price from '@/components/Price';
import { useUserStore } from '@/store/user-store';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { $http } from '@/lib/http';
import { Link } from 'react-router-dom';
import { FaQuestion, FaTimes } from 'react-icons/fa';
import { useNavBar } from '@/utils/useNavBar';

interface ReelProps {
  symbol: string;
  reelRef: React.RefObject<HTMLDivElement>;
}

const Reel: React.FC<ReelProps> = ({ symbol, reelRef }) => {
  return (
    <div
      
      className="flex items-center justify-center w-28 h-36 border-2 border-gray-600 bg-gradient-to-b from-gray-400 to-gray-200 shadow-lg"
    >
      <h2 ref={reelRef} className="text-3xl">{symbol}</h2>
    </div>
  );
};

const SlotMachine: React.FC = () => {
  type SymbolType = '🍒' | '🍋' | '🍊' | '🍉' | '🍇' | '🍀';

  const WinProfit: { [key in SymbolType]?: number }[] = [
    { '🍒': 1 },
    { '🍋': 2 },
    { '🍊': 3 },
    { '🍉': 4 },
    { '🍇': 5 },
  ];
  const symbols = ['🍒','🍒','🍒','🍒','🍒','🍒', '🍋','🍋','🍋','🍋','🍋', '🍊','🍊','🍊','🍊', '🍉','🍉','🍉', '🍇','🍇', '🍀'];
  const betSymbol = ['🍒','🍋','🍊','🍉','🍇'];
  const [reels, setReels] = useState<string[]>(['?', '?', '?']); // Initial state with three reels
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Can You Hit the $-Jackpot-$');
  const [i_index,set_index]=useState(0);
  const [bet, setBet] = useState<string>(betSymbol[i_index]);
 
  const loserMessages = [
    'Not quite',
    'Stop gambling',
    'Hey, you lost!',
    'Ouch! I felt that',
    "Don't beat yourself up",
    'There goes the college fund',
    'I have a cat. You have a loss',
    "You're awesome at losing",
    'Coding is hard',
    "Don't hate the coder",
  ];
  
  const transaction = (amount:number,type:string,remarks:string)=>{
    try {
      $http.post('/clicker/transaction',{
        amount:amount,
        type:type,
        remark:remarks
      }).then((res)=>{
        console.log(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
 
  // Refs for the reels
  const reelRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const spinReels = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const newReels = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);

    reelRefs.forEach((reelRef, i) => {
      const tl = gsap.timeline({ onComplete: () => setIsSpinning(false) });

      tl.to(reelRef.current, {
        repeat: 4, // Repeat spin effect for a few rounds 
        y: '+=500',
        duration: 0.2,
        ease: 'power1.inOut',
        stagger:0.2,
        onRepeat: () => {
          // Change the symbol after each loop
          setReels((prevReels) => {
            const updatedReels = [...prevReels];
            updatedReels[i] = symbols[Math.floor(Math.random() * symbols.length)];
            return updatedReels;
          });
        },
      })
        .to(reelRef.current, {
          y: 0,
          stagger:0.1,
          duration: 0.5,
          ease: 'bounce.out',
        })
        .eventCallback('onComplete', () => {
          setReels((prevReels) => {
            const updatedReels = [...prevReels];
            updatedReels[i] = newReels[i];
            setIsSpinning(false);
            return updatedReels;
          });
        });
    });

    setTimeout(() => {
      // Check for win condition
      if (newReels.every((symbol) => symbol === '🍀')) {
        setMessage('Yohooo! You won the Jackpot');
      }else if (newReels.every((symbol) => symbol === newReels[0])) {
        setMessage('Yohooo! You won the Mini Jackpot');
      } else if (newReels.includes(bet as SymbolType)) {
        const occurrences = newReels.filter(symbol => symbol === bet as SymbolType).length;
        const profitMultiplier = WinProfit.find((item) => item[bet as SymbolType])?.[bet as SymbolType] || 0;
        const win =1000 * profitMultiplier*(occurrences/3);
        setMessage(`You won! ${Math.floor(win)}`);
        transaction(Math.floor(1000 * profitMultiplier*(occurrences/3)),"credit",`user Won ${Math.floor(win)} in slot game`);
        user.IncreaseBalance(Math.floor(win));
      } else {
        setMessage(`You Lost, ${loserMessages[Math.floor(Math.random() * loserMessages.length)]}`);
        transaction(Math.floor(1000),"debit",`user lost ${1000} in slot game`);
        user.descreaseBalance(Math.floor(Math.floor(1000)))
      }
      
    }, 2000); // Delay for spin completion
  };

  const AddBet = () => {
    set_index((i_index+1)%betSymbol.length);
    setBet(betSymbol[i_index]);
  };
  const { activeIndex, setActiveIndex } = useNavBar();
  console.log(activeIndex)
  const user = useUserStore();
  
  return (
    <div id="main_div" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className='w-full h-fit py-4 px-4 flex justify-between items-center'>
        <Link to={'/'} className="text-white"><FaTimes size={24} color="white" onClick={()=>setActiveIndex(1)}/></Link>
        <FaQuestion size={24} color='white'/>
      </div>
      <div className="flex flex-col items-center mt-10">
        <h1 className="w-full font-[ageobold] text-6xl text-center my-2 text-white">Slot Machine</h1>
        <div className="flex flex-col gap-2 pt-2 px-2">
          <h3 className="w-full font-[ageobold] text-yellow-400 text-center text-xl mb-2">{message}</h3>
          <div className="flex w-fit mx-auto border-4 border-yellow-500 h-fit overflow-hidden rounded-lg justify-center">
            {reels.map((symbol, index) => (
              <Reel key={index} symbol={symbol} reelRef={reelRefs[index]} />
            ))}
          </div>
          <div className="flex gap-4 justify-center items-center font-[ageo]">
            <div className="flex flex-col items-center gap-1 rounded-lg">
              <span className="text-white">Bet:</span>
              <div className="h-8 w-20 flex justify-center items-center bg-white border-yellow-300 border-2 rounded-md text-black">
                {bet}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg">
              <span className="text-white">Max Win:</span>
              <div className="h-8 w-28 flex justify-center items-center bg-white border-yellow-300 border-2 rounded-md text-black">
                {WinProfit.find((item) => item[bet as SymbolType])?.[bet as SymbolType] || 0}k
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-lg">
              <span className="text-white">Coins:</span>
              <div className="h-8 w-32 flex justify-center items-center bg-white border-yellow-300 border-2 rounded-md text-black">
                {Math.floor(user.balance)}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-2 flex flex-col gap-4">
          <div className="w-full flex justify-between gap-4">
            <button className="w-full mt-4 px-4 text-white rounded-lg bg-yellow-400 py-2" onClick={AddBet}>
              Add Bet
            </button>
          </div>
          <button
            onClick={spinReels}
            disabled={isSpinning}
            className={`px-4 w-full flex items-center justify-center gap-4 py-2 text-white rounded-lg ${
              isSpinning ? 'bg-yellow-400' : 'bg-yellow-500 hover:bg-yellow-700'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'Spin!'} <span> <Price amount={1000}/> </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
