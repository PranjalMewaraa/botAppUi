import React, { useState, useRef } from 'react';
import Spinner, { SpinnerRef } from '../../components/Spinner';
import RepeatButton from '../../components/RepeatButton';
import WinningSound from '../../components/WinninSound';

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

  let matches: number[] = [];

  const SlotMachine: React.FC = () => {
    const [winner, setWinner] = useState<boolean | null>(null);
    const child1 = useRef<SpinnerRef>(null);
    const child2 = useRef<SpinnerRef>(null);
    const child3 = useRef<SpinnerRef>(null);

    const handleClick = () => {
        setWinner(null);
        matches = [];
        child1.current?.forceUpdateHandler();
        child2.current?.forceUpdateHandler();
        child3.current?.forceUpdateHandler();
    };

    const finishHandler = (value: number) => {
        matches.push(value);
    
        if (matches.length === 3) {
          const first = matches[0];
          const results = matches.every((match) => match === first);
          setWinner(results);
        }
    };

    const getLoserMessage = () =>
        loserMessages[Math.floor(Math.random() * loserMessages.length)];

    return (
        <div id='#main_div' className='w-full h-full flex justify-center items-center flex-col'>
          {winner && <WinningSound />}
          <h1 style={{ color: 'white' }}>
            <span>
              {winner === null
                ? 'Waiting…'
                : winner
                ? '🤑 Pure skill! 🤑'
                : getLoserMessage()}
            </span>
          </h1>
    
          <div className="spinner-container">
            <Spinner onFinish={finishHandler} ref={child1} timer={1000} />
            <Spinner onFinish={finishHandler} ref={child2} timer={1400} />
            <Spinner onFinish={finishHandler} ref={child3} timer={2200} />
            <div className="gradient-fade"></div>
          </div>
          {winner !== null && <RepeatButton onClick={handleClick} />}
        </div>
      );
    
  }
  export default SlotMachine;