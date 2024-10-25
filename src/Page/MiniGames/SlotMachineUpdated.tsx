import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface SpinnerProps {
  timer: number;
  onFinish: (position: number) => void;
}

interface SpinnerHandle {
  forceUpdateHandler: () => void;
}

const Spinner = forwardRef<SpinnerHandle, SpinnerProps>(({ timer, onFinish }, ref) => {
  const iconHeight = 188;
  const [position, setPosition] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(timer);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const multiplier = useRef<number>(Math.floor(Math.random() * (4 - 1) + 1)).current;
  const speed = useRef<number>(iconHeight * multiplier).current;
  const start = useRef<number>(setStartPosition()).current;

  function setStartPosition(): number {
    return (Math.floor(Math.random() * 9) * iconHeight) * -1;
  }

  useImperativeHandle(ref, () => ({
    forceUpdateHandler() {
      reset();
    }
  }));

  const reset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const newStart = setStartPosition();
    setPosition(newStart);
    setTimeRemaining(timer);
  };

  const moveBackground = () => {
    setPosition((prevPosition) => prevPosition - speed);
    setTimeRemaining((prevTime) => prevTime - 100);
  };

  const getSymbolFromPosition = () => {
    const totalSymbols = 9;
    const maxPosition = iconHeight * (totalSymbols - 1) * -1;
    const moved = (timer / 100) * multiplier;
    let currentPosition = start;

    for (let i = 0; i < moved; i++) {
      currentPosition -= iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }

    onFinish(currentPosition);
  };

  const tick = () => {
    if (timeRemaining <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      getSymbolFromPosition();
    } else {
      moveBackground();
    }
  };

  useEffect(() => {
    reset();

    timerRef.current = setInterval(() => {
      tick();
    }, 100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeRemaining]);

  return (
    <div style={{ backgroundPosition: `0px ${position}px` }} className="icons" />
  );
});

interface RepeatButtonProps {
  onClick: () => void;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({ onClick }) => {
  return (
    <button aria-label="Play again." id="repeatButton" onClick={onClick}></button>
  );
};

const WinningSound: React.FC = () => {
  return (
    <audio autoPlay className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
};

const SlotMachineGamePage: React.FC = () => {
  const [winner, setWinner] = useState<boolean | null>(null);
  const matches = useRef<number[]>([]);

  const child1Ref = useRef<SpinnerHandle | null>(null);
  const child2Ref = useRef<SpinnerHandle | null>(null);
  const child3Ref = useRef<SpinnerHandle | null>(null);

  const loser = [
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

  const emptyArray = () => {
    matches.current = [];
  };

  const handleClick = () => {
    setWinner(null);
    emptyArray();
    child1Ref.current?.forceUpdateHandler();
    child2Ref.current?.forceUpdateHandler();
    child3Ref.current?.forceUpdateHandler();
  };

  const finishHandler = (value: number) => {
    matches.current.push(value);

    if (matches.current.length === 3) {
      const first = matches.current[0];
      const results = matches.current.every((match) => match === first);
      setWinner(results);
    }
  };

  const getLoser = () => {
    return loser[Math.floor(Math.random() * loser.length)];
  };

  return (
    <div>
      {winner && <WinningSound />}
      <h1 style={{ color: 'white' }}>
        <span>
          {winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}
        </span>
      </h1>

      <div className="spinner-container">
        <Spinner onFinish={finishHandler} ref={child1Ref} timer={1000} />
        <Spinner onFinish={finishHandler} ref={child2Ref} timer={1400} />
        <Spinner onFinish={finishHandler} ref={child3Ref} timer={2200} />
        <div className="gradient-fade"></div>
      </div>

      {winner !== null && <RepeatButton onClick={handleClick} />}
    </div>
  );
};

export default SlotMachineGamePage;
