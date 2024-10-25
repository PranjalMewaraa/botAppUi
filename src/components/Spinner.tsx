import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';

interface SpinnerProps {
  onFinish: (position: number) => void; // Callback to execute on finish
  timer: number; // Duration of the spin
}

// Define the type for the ref that will be forwarded
interface SpinnerRef {
  forceUpdateHandler: () => void; // Method to reset the spinner
}

// Spinner component using forwardRef
const Spinner = forwardRef<SpinnerRef, SpinnerProps>((props, ref) => {
  const innerRef = useRef<HTMLDivElement>(null); // Local ref for the DOM element
  const [position, setPosition] = useState<number>(0); // State for spinner position
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // Time remaining for the spin
  let timerId: NodeJS.Timeout | null = null; // Timer reference

  // Expose the forceUpdateHandler method through the ref
  useImperativeHandle(ref, () => ({
    forceUpdateHandler: reset, // Reference the reset function
  }));

  // Reset logic for the spinner
  const reset = () => {
    if (timerId) {
      clearInterval(timerId); // Clear any existing timer
    }

    // Reset position and time remaining
    setPosition(0); // Reset position to the initial value
    setTimeRemaining(props.timer); // Reset time remaining to the original timer value

    // Start a new timer
    timerId = setInterval(() => {
      if (timeRemaining > 0) {
        setPosition((prev) => prev - (Spinner.length * (Math.random() * 4))); // Update the position
        setTimeRemaining((prev) => prev - 100); // Decrease the time remaining
      } else {
        clearInterval(timerId!); // Clear the timer when finished
        props.onFinish(position); // Call the finish handler
      }
    }, 100);
  };

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId); // Clear timer on unmount
      }
    };
  }, []);

  return (
    <div ref={innerRef} style={{ backgroundPosition: `0px ${position}px` }} className={`spinner`}>
      {/* Spinner content or icons go here */}
    </div>
  );
});

export default Spinner;
