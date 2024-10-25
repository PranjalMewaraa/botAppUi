import React, { useState, useEffect, useRef } from 'react';

type SpinnerProps = {
  onFinish: (position: number) => void;
  timer: number;
};

export type SpinnerRef = {
  forceUpdateHandler: () => void;
};

const Spinner = React.forwardRef<SpinnerRef, SpinnerProps>(
  ({ onFinish, timer }, ref) => {
    const [position, setPosition] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(timer);
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const iconHeight = 188;
    


    useEffect(() => {
      reset();
    }, []);

    useEffect(() => {
      if (timeRemaining <= 0) {
        getSymbolFromPosition();
      } else {
        const timerId = setInterval(() => {
          moveBackground();
        }, 100);
        return () => clearInterval(timerId);
      }
    }, [timeRemaining]);

    const setStartPosition = () => {
      return Math.floor(Math.random() * 9) * iconHeight * -1;
    };
    const start = useRef(setStartPosition());

    const moveBackground = () => {
      setPosition((prevPosition) => prevPosition - iconHeight * multiplier);
      setTimeRemaining((prevTime) => prevTime - 100);
    };

    const getSymbolFromPosition = () => {
      const totalSymbols = 9;
      const maxPosition = iconHeight * (totalSymbols - 1) * -1;
      let currentPosition = start.current;
      const moved = (timer / 100) * multiplier;

      for (let i = 0; i < moved; i++) {
        currentPosition -= iconHeight;

        if (currentPosition < maxPosition) {
          currentPosition = 0;
        }
      }

      onFinish(currentPosition);
    };

    const reset = () => {
      setPosition(start.current);
      setTimeRemaining(timer);
    };

    React.useImperativeHandle(ref, () => ({
      forceUpdateHandler() {
        reset();
      },
    }));

    return (
      <div
        style={{ backgroundPosition: `0px ${position}px` }}
        className="icons"
      />
    );
  }
);

export default Spinner;
