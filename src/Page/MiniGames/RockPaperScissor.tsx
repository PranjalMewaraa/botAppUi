import React, { useState, useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { FaHandRock, FaHandPaper, FaHandScissors, FaArrowLeft } from "react-icons/fa";
import dollar from "../../assets/Images/dollar.png";
import { useUserStore } from "@/store/user-store";
import { Link } from "react-router-dom";

import { useNavBar } from "@/utils/useNavBar";

// Enum for difficulty levels
enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

// Type definitions for components' props
interface StakeProps {
  name: Difficulty;
  Win: string;
  Loss: string;
  handleClick: (name: Difficulty) => void;
}

interface IconProps {
  color: string;
  children: ReactNode;
}

interface IconChoiceProps {
  color: string;
  pickChoice: () => void;
  isGameEnd: boolean;
  children: ReactNode;
}

interface WalletProps {
  balance: number;
}

// GSAP animation hook
const useGsapAnimation = (ref: React.RefObject<HTMLElement>, duration: number = 1) => {
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration });
  }, [ref, duration]);
};

const RockPaperScissors: React.FC = () => {

  const user = useUserStore();
  const [balance, setBalance] = useState<number>(user.balance); // Initial balance
  const [userWins, setUserWins] = useState<number>(0);
  const [opponentWins, setOpponentWins] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameMessage, setGameMessage] = useState<string>("");
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
  const choices = ["rock", "paper", "scissors"];
  const playRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [insuf, setInsufficient] = useState<boolean>(false);
  const [gameEnded, setGameEnd] = useState<boolean>(false);
  const { activeIndex, setActiveIndex } = useNavBar();
  console.log(activeIndex)
  
  useGsapAnimation(playRef);

  const calculateReward = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case Difficulty.Easy:
        return 150; 
      case Difficulty.Medium:
        return 300; 
      case Difficulty.Hard:
        return 1000; 
      default:
        return 0;
    }
  };

  const calculateLoss = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case Difficulty.Easy:
        return 200; 
      case Difficulty.Medium:
        return 500; 
      case Difficulty.Hard:
        return 1200; 
      default:
        return 0;
    }
  };

  const handlePlay = (choice: string) => {
    if (!difficulty) return; // Prevent playing without selecting difficulty
    const lossAmount = calculateLoss(difficulty);
    if (balance < lossAmount) {
      setGameMessage("Insufficient balance to play.");
      setInsufficient(true);
      return;
    }
    setBalance(user.balance)
    const oppChoice = getOpponentChoice(choice,difficulty);
    setUserChoice(choice);
    setOpponentChoice(oppChoice);
    const roundResult = determineWinner(choice, oppChoice);

    // Animate the game message
    gsap.fromTo(
      messageRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    if (roundResult === "user") {
      setUserWins(prev => prev + 1);
      setGameMessage(`You won! You picked ${choice}, opponent picked ${oppChoice}`);
    } else if (roundResult === "opponent") {
      setOpponentWins(prev => prev + 1);
      setGameMessage(`You lost! You picked ${choice}, opponent picked ${oppChoice}`);
    } else {
      setGameMessage(`It's a tie! Both picked ${choice}`);
    }

    // Check if someone won 3 rounds
    if (userWins === 2 || opponentWins === 2) {
      handleGameEnd();
    }
  };

  const handleGameEnd = () => {
    setGameEnd(true);
    let changeInBalance = 0;
    if (userWins > opponentWins) {
      changeInBalance = calculateReward(difficulty as Difficulty);
      setGameMessage(`Congrats! You won the game and earned ${changeInBalance}`);
      user.IncreaseBalance(changeInBalance);
      setBalance(user.balance)
    } else {
      changeInBalance = -calculateLoss(difficulty as Difficulty);
      setGameMessage(`You lost the game and lost ${-changeInBalance}`);
      user.descreaseBalance(-changeInBalance)
      setBalance(user.balance)
    }

    setTimeout(() => {
      resetGame();
      setGameEnd(false);
    }, 5000);
  };

  const resetGame = () => {
    setUserWins(0);
    setOpponentWins(0);
    setUserChoice(null);
    setOpponentChoice(null);
    setIsPlaying(false);
    setInsufficient(false);
    setGameMessage("");
    setBalance(user.balance)
  };
  useEffect(()=>{
    setBalance(user.balance)
  },[gameEnded])

  const getOpponentChoice = (userChoice: string, difficulty: string): string => {

  
    switch (difficulty) {
      case "Easy":
        return choices[Math.floor(Math.random() * choices.length)];
  
      case "Medium":
        if (Math.random() <= 0.35) {
          return getLosingChoice(userChoice);
        } else {
          return Math.random() <= 0.60 ? choices[Math.floor(Math.random() * choices.length)] : getWinningChoice(userChoice); 
        }
  
      case "Hard": 
        if ( Math.random() <= 0.25) {
          return getLosingChoice(userChoice); 
        } else {
          return  Math.random() <= 0.7 ? choices[Math.floor(Math.random() * choices.length)] : getWinningChoice(userChoice); 
        }
  
      default:
        return choices[Math.floor(Math.random() * choices.length)];
    }
  };
  
  
  const getLosingChoice = (userChoice: string): string => {
    switch (userChoice) {
      case "rock":
        return "scissors";
      case "paper":
        return "rock";
      case "scissors":
        return "paper";
      default:
        return choices[Math.floor(Math.random() * choices.length)];
    }
  };
  
  
  const getWinningChoice = (userChoice: string): string => {
    switch (userChoice) {
      case "rock":
        return "paper";
      case "paper":
        return "scissors";
      case "scissors":
        return "rock";
      default:
        return choices[Math.floor(Math.random() * choices.length)];
    }
  };

  const determineWinner = (userChoice: string, opponentChoice: string): string => {
    if (userChoice === opponentChoice) return "tie";
    if (
      (userChoice === "rock" && opponentChoice === "scissors") ||
      (userChoice === "scissors" && opponentChoice === "paper") ||
      (userChoice === "paper" && opponentChoice === "rock")
    ) {
      return "user";
    }
    return "opponent";
  };

  const getIcon = (choice: string|null): ReactNode => {
    switch (choice) {
      case "rock":
        return <FaHandRock size={48} color="white" />;
      case "paper":
        return <FaHandPaper size={48} color="white" />;
      case "scissors":
        return <FaHandScissors size={48} color="white" />;
      default:
        return null;
    }
  };

  const setDifficultyLevel = (name: Difficulty) => {
    setDifficulty(name);
    setIsPlaying(true);
  };

  const getIconColor = (choice: string): string => {
    switch (choice) {
      case "rock":
        return "#78DAE4";
      case "paper":
        return "#FEDE55";
      case "scissors":
        return "#F05580";
      default:
        return "#78DAE4";
    }
  };

  window.Telegram.WebApp.BackButton.show();
  return (
    <div
      id="main_div"
      className="w-full relative text-white flex p-8 flex-col items-center overflow-hidden"
      style={{
        background: "radial-gradient(50% 50% at 50% 50%, #1B3251 0%, #161E40 100%)",
        height: "calc(var(--vh, 1vh) * 100)"  
      }}
      
    >
      <div className="flex w-full items-center justify-between">
      <Link to={'/'}><FaArrowLeft size={24} onClick={()=>setActiveIndex(1)}/></Link>
        <Wallet balance={Math.floor(user.balance)} />
      </div>

      <div className="flex flex-col mt-10 text-center text-white text-4xl font-extrabold">
        <span>ROCK</span>
        <span>PAPER</span>
        <span>SCISSOR</span>
      </div>
      {!isPlaying ? (
        <>
          <p className="py-3 text-lg">Pick your Difficulty Stake</p>
          <div className="w-2/3 flex flex-col gap-4 my-4">
            {Object.values(Difficulty).map(level => (
              <Stake
                key={level}
                name={level}
                handleClick={setDifficultyLevel}
                Win={`${calculateReward(level)}`}
                Loss={`${calculateLoss(level)}`}
              />
            ))}
          </div>
          
        </>
      ) : (
        <>
          <p className="py-3 text-lg mt-10">Pick your Weapon</p>
          <div className="w-full px-4 flex flex-wrap justify-between mb-6">
            {choices.map((item) => (
              <IconChoice
                key={item}
                color={getIconColor(item)}
                pickChoice={() => handlePlay(item)}
                isGameEnd={gameEnded}
              >
                {getIcon(item)}
              </IconChoice>
            ))}
          </div>
          {insuf ? <Link to={'/'} className="py-1 px-4">Exit Game</Link> : null}
          <div className="w-full flex justify-between p-12 font-bold absolute bottom-0">
            <p className="text-lg text-white">
              You: <br />
              <span>{userWins}</span>
            </p>
            <p className="text-lg text-white">
              Goat: <br />
              <span>{opponentWins}</span>
            </p>
          </div>
        </>
      )}
      <div
        ref={playRef}
        className="mt-10 flex flex-col items-center justify-center text-center"
      >
        <p ref={messageRef} className="text-2xl text-yellow-500">{gameMessage}</p>
        {userChoice && (
          <div className="flex mt-5">
            <div className="flex flex-col items-center">
              <span>You</span>
              {getIcon(userChoice)}
            </div>
            <span className="mx-4">VS</span>
            <div className="flex flex-col items-center">
              <span>Opponent</span>
              {getIcon(opponentChoice)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Stake: React.FC<StakeProps> = ({ name, Win, Loss, handleClick }) => {
    const getIconDifficulty = (choice:string) => {
        switch (choice) {
          case "Easy":
            return (
              <FaHandRock size={40} color="white" className=" drop-shadow-xl" />
            );
          case "Medium":
            return (
              <FaHandPaper size={40} color="white" className=" drop-shadow-xl" />
            );
          case "Hard":
            return (
              <FaHandScissors size={40} color="white" className=" drop-shadow-xl" />
            );
          default:
            return null;
        }
      };
    
      const getIconColor = (choice:string) => {
        switch (choice) {
          case "Easy":
            return "#78DAE4";
          case "Medium":
            return "#FEDE55";
          case "Hard":
            return "#F05580";
          default:
            return "#78DAE4";
        }
      };
    
      return (
        <div
          className="flex my-2 justify-between items-center cursor-pointer"
          onClick={() => handleClick(name)}
        >
          <Icon color={getIconColor(name)}>{getIconDifficulty(name)}</Icon>
          <div className=" flex flex-col justify-evenly">
            <strong>{name}</strong>
            <p className="flex gap-2">
              Win:
              <span>
                <img src={dollar} className="w-6" alt="" />
              </span>
              {Win}{" "}
            </p>
            <p className="flex gap-2">
              Lose:
              <span>
                <img src={dollar} className="w-6" alt="" />
              </span>
              {Loss}
            </p>
          </div>
        </div>
      );
};

const Icon: React.FC<IconProps> = ({ color, children }) => (
  <div
    className={`flex justify-center items-center h-20 w-20 rounded-full cursor-pointer transition-transform transform hover:scale-110`}
    style={{ backgroundColor: color }}
  >
    {children}
  </div>
);

const IconChoice: React.FC<IconChoiceProps> = ({ color, pickChoice, isGameEnd, children }) => (
    <button
    className={`flex justify-center items-center h-20 w-20 rounded-full cursor-pointer transition-transform transform hover:scale-110`}
    style={{ backgroundColor: color }}
    onClick={pickChoice}
    disabled={isGameEnd}
  >
    {children}
  </button>
);

const Wallet: React.FC<WalletProps> = ({ balance }) => (
<div className="flex gap-2 items-center pr-2 border bg-slate-700 rounded-3xl">
      <span>
        <img className="w-10" src={dollar} alt="" />
      </span>
      {balance}
    </div>
);

export default RockPaperScissors;
