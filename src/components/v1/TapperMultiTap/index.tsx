import { useRef, useState } from "react";
import { gsap } from "gsap";
import dollar from "../../../assets/Images/dollar.png";
import goat from "../../../assets/Images/goat.png";
import balance from "../../../assets/Images/balance.png";
import encrypt from "../../../utils/encrypt";
import decrypt from "../../../utils/decrypt";

const PulseButton: React.FC = () => {
  const pulseRefs = useRef<HTMLDivElement[]>([]);
  const pulseRingRefs = useRef<HTMLDivElement[]>([]);
  const plusOneRefs = useRef<HTMLDivElement[]>([]);
  const dollarRef = useRef<HTMLImageElement | null>(null);
  const dollarRef2 = useRef<HTMLImageElement | null>(null);

  const [tapCount, setTapCount] = useState<number>(
    Number(decrypt(localStorage.getItem("alkine-db-val-er") || "0")) || 0
  );
  const maxTaps = 20000000;

  // Debounce state to prevent multiple tap registrations in a short time
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceTime = 200; // Time in ms

  const setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    // Debounce check: Skip handling if already processing a recent touch
    if (isDebouncing) return;

    setIsDebouncing(true);
    setTimeout(() => setIsDebouncing(false), debounceTime);

    // Delay to ensure all fingers are registered
    setTimeout(() => {
      const fingerCount = event.touches.length;
      if (fingerCount > 0 && fingerCount <= 5) {
        // Add score based on finger count
        setTapCount((prevCount) => Math.min(prevCount + fingerCount, maxTaps));
        setLocalStorageItem("alkine-db-val-er", encrypt((tapCount + fingerCount)));
        handlePulseAnimations(fingerCount);
      }
    }, 50); // small delay to ensure all fingers are detected
  };

  const handlePulseAnimations = (fingerCount: number) => {
    const newPulse = document.createElement("div");
    newPulse.className =
      "absolute w-64 h-64 bg-yellow-400 -translate-y-32 rounded-full pointer-events-none";
    document.getElementById("pulseContainer")?.appendChild(newPulse);
    pulseRefs.current.push(newPulse);

    gsap.fromTo(
      newPulse,
      { scale: 0, opacity: 1 },
      {
        scale: 1.5,
        opacity: 0.1,
        duration: 0.6,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(newPulse, { scale: 0, opacity: 1 });
          newPulse.remove();
          pulseRefs.current.shift();
        },
      }
    );

    const newPulseRing = document.createElement("div");
    newPulseRing.className =
      "absolute w-96 h-96 border-4 border-blue-300 -translate-y-32 rounded-full pointer-events-none";
    document.getElementById("pulseContainer")?.appendChild(newPulseRing);
    pulseRingRefs.current.push(newPulseRing);

    gsap.fromTo(
      newPulseRing,
      { scale: 0, opacity: 1 },
      {
        scale: 1.5,
        opacity: 0.1,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(newPulseRing, { scale: 0, opacity: 1 });
          newPulseRing.remove();
          pulseRingRefs.current.shift();
        },
      }
    );

    const newPlusOne = document.createElement("div");
    newPlusOne.className = "absolute text-2xl font-bold pointer-events-none";
    newPlusOne.textContent = `❤️+${fingerCount}`;
    document.getElementById("pulseContainer")?.appendChild(newPlusOne);
    plusOneRefs.current.push(newPlusOne);

    const colors = ["#FFFF"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const pulseContainer = document.getElementById("pulseContainer");
    const pulseContainerRect = pulseContainer?.getBoundingClientRect();
    if (pulseContainerRect) {
      const centerX = (Math.random()-0.1) * pulseContainerRect.width ;
      newPlusOne.style.left = `${centerX}px`;
      newPlusOne.style.top = `100px`;
      newPlusOne.style.transform = "translate(-50%, -50%)";
      newPlusOne.style.zIndex = "20";
      newPlusOne.style.color = randomColor;

      const randomX = (Math.random() - 0.1) * 100;

      gsap.fromTo(
        newPlusOne,
        { y: 0, x: 0, scale: 1, opacity: 0, rotate: 0 },
        {
          y: -60,
          x: randomX,
          scale: 1.4,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(newPlusOne, {
              y: -100,
              x: randomX + (Math.random() - 0.5) * 50,
              scale: 0.8,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                newPlusOne.remove();
                plusOneRefs.current.shift();
              },
            });
          },
        }
      );
    }

    gsap.fromTo(
      dollarRef2.current,
      { rotation: 0, scale: 1 },
      {
        rotation: 10,
        scale: 1.3,
        duration: 0.1,
        ease: "power1.out",
        yoyo: true,
        repeat: 3,
      }
    );
    gsap.fromTo(
      dollarRef.current,
      { rotation: 0, scale: 1 },
      {
        rotation: 0,
        scale: 1.2,
        duration: 0.1,
        ease: "power1.out",
        yoyo: true,
        repeat: 3,
      }
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full">
      <div
        id="pulseContainer"
        className="absolute w-full h-full inset-0 flex items-center justify-center"
        onTouchStart={handleTouchStart}  // Add touch event listener here
      >
        <div className="relative w-full h-full">
          <div
            className="absolute w-[168px] h-[168px] rounded-full border-4 border-transparent"
            style={{
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -70%)",
              boxShadow: "0 4px 30px rgba(255, 215, 1, 0.6)",
            }}
          >
            <img
              ref={dollarRef2}
              src={dollar}
              alt="Dollar Icon"
              className="absolute z-20 inset-0 w-full h-full object-cover rounded-full "
              style={{
                opacity: 1,
              }}
            />
            <img
              ref={dollarRef}
              src={goat}
              alt="Goat Icon"
              className="absolute z-30 inset-0 w-[160px] h-[190px] -translate-y-20 object-cover rounded-full"
              style={{
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-white absolute bottom-56 flex gap-4 items-center text-xl font-bold">
        <span>
          <img src={balance} alt="" />
        </span>
        {Math.floor(tapCount)}
      </div>
    </div>
  );
};

export default PulseButton;
