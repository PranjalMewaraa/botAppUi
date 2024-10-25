import Spinner from '@/components/Spinner';
import React, { useState, useCallback, useRef } from 'react';

const SlotMachineGamePage: React.FC = () => {
  const [winner, setWinner] = useState<boolean | null>(null);
  const matches = useRef<number[]>([]); // Ref to avoid unnecessary re-renders

  const handleClick = useCallback(() => {
    setWinner(null);
    emptyArray();
    _child1.current?.forceUpdateHandler();
    _child2.current?.forceUpdateHandler();
    _child3.current?.forceUpdateHandler();
  }, []);

  const emptyArray = useCallback(() => {
    matches.current = [];
  }, []);

  const finishHandler = useCallback((value: number) => {
    matches.current.push(value);

    if (matches.current.length === 3) {
      const first = matches.current[0];
      const isWinner = matches.current.every(match => match === first);
      setWinner(isWinner);
    }
  }, []);

  const getLoser = useCallback(() => {
    const loserMessages = [
      'Not quite', 'Stop gambling', 'Hey, you lost!',
      'Ouch! I felt that', 'Don\'t beat yourself up', 'There goes the college fund',
      'I have a cat. You have a loss', 'You\'re awesome at losing', 'Coding is hard', 'Don\'t hate the coder'
    ];
    return loserMessages[Math.floor(Math.random() * loserMessages.length)];
  }, []);

  const _child1 = useRef<{ forceUpdateHandler: () => void } | null>(null);
  const _child2 = useRef<{ forceUpdateHandler: () => void } | null>(null);
  const _child3 = useRef<{ forceUpdateHandler: () => void } | null>(null);

  return (
    <div>
      {winner && <WinningSound />}
      <h1 style={{ color: 'white' }}>
        <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
      </h1>
      <div className="spinner-container">
        <Spinner onFinish={finishHandler} ref={_child1} timer="1000" />
        <Spinner onFinish={finishHandler} ref={_child2} timer="1400" />
        <Spinner onFinish={finishHandler} ref={_child3} timer="2200" />
        <div className="gradient-fade"></div>
      </div>
      {winner !== null && <RepeatButton onClick={handleClick} />}
    </div>
  );
};

const WinningSound: React.FC = () => (
  <audio autoPlay className="player" preload="false">
    <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
  </audio>
);

interface RepeatButtonProps {
  onClick: () => void;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({ onClick }) => (
  <button aria-label="Play again." id="repeatButton" onClick={onClick}></button>
);



export default SlotMachineGamePage;
