import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dollar from "../../../assets/Images/dollar.png";
import t from "../../../assets/Images/tappercoin.png";

import encrypt from "../../../utils/encrypt";

import { useUserStore } from "@/store/user-store";
import { useClicksStore } from "@/store/clicks-store";
import skinConfig from "@/config/skin-config";
import useSkinConfig from "@/hooks/useSkinConfig";
import decrypt from "@/utils/decrypt";


const PulseButton: React.FC = () => {
  const { skinId } = useSkinConfig();
  const pulseRefs = useRef<HTMLDivElement[]>([]);
  const pulseRingRefs = useRef<HTMLDivElement[]>([]);
  const plusOneRefs = useRef<HTMLDivElement[]>([]);
  const dollarRef = useRef<HTMLImageElement | null>(null);
  const dollarRef2 = useRef<HTMLImageElement | null>(null);
  // const { clicks, addClick, removeClick } = useClicksStore();
  const user  = useUserStore();
  const clicksCountRef = useRef(0); 
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    // Initialize clicks count on component mount
    const current = localStorage.getItem("ClicksCount");
    clicksCountRef.current = current ? parseFloat(current) : 0;
  
    console.log("Initial count", clicksCountRef.current);
  }, []);

  const [tapCount, setTapCount] = useState<number>(
    Number(decrypt(localStorage.getItem("alkine-db-val-er"))|| "0") || 0
  );
  const maxTaps = 20000000;

  // Debounce state to prevent multiple tap registrations in a short time
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceTime = 25; // Time in ms
  const [onMobile,setIsMobile]=useState(false);
  const setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };
  const timeoutRef = useRef<number | null>(null)
  const handleTouchStart = (event: React.TouchEvent) => {
    if (isDebouncing || isTouching) return;
    setIsMobile(true);
    setTimeout(() => setIsMobile(false), 15000); // Prevent multiple taps
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
     timeoutRef.current = window.setTimeout(() => {
      const fingerCount = event.touches.length;
      setTimeout(() => setIsDebouncing(false), debounceTime);
      setIsTouching(true); // Track that a touch event is happening
      setTimeout(() => setIsTouching(false), debounceTime); // Reset touch tracking after debounce
     
      if(!user.UserTap(fingerCount)) return;
      if (fingerCount > 0 && fingerCount <= 5) {
          // Add score based on finger count
       const current = localStorage.getItem("ClicksCount");
      localStorage.setItem(
          "ClicksCount",
          current ? String(parseFloat(current) + fingerCount) : "1"
      );
      setTapCount((prevCount) => Math.min(prevCount + fingerCount*user.earn_per_tap, maxTaps));
      setLocalStorageItem("alkine-db-val-er", encrypt((tapCount + fingerCount*user.earn_per_tap)));
      handlePulseAnimations(fingerCount);
      Telegram.WebApp.HapticFeedback.impactOccurred("medium");
      }
 
    }, 25); // small delay to ensure all fingers are detected
  };
  const handleMouseClick = () => {
    // Debounce check: Skip handling if already processing a recent click
    if (isTouching || isDebouncing || onMobile) return;
   
      setIsDebouncing(true);
      setTimeout(() => setIsDebouncing(false), debounceTime);
      if(!user.UserClick()) return;
      handlePulseAnimations(1);
      const clickCount = 1 * user.earn_per_tap; // Default for single left-click
      console.log("mouse",clickCount)
      const current = localStorage.getItem("ClicksCount");
      localStorage.setItem(
        "ClicksCount",
        current ? String(parseFloat(current) + clickCount) : "1"
      );
      Telegram.WebApp.HapticFeedback.impactOccurred("light"); 
    
 
  };
  

  useEffect(() => {
    useClicksStore.setState({ clicks: [] });

    const interval = setInterval(() => {
      user.incraseEnergy(3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
 
  const handlePulseAnimations = (fingerCount: number) => {
    const newPulse = document.createElement("div");
    newPulse.className =
      "absolute w-64 h-64 bg-yellow-400 -translate-y-28 rounded-full pointer-events-none";
    document.getElementById("pulseContainer")?.appendChild(newPulse);
    pulseRefs.current.push(newPulse);
    console.log(fingerCount)
    gsap.fromTo(
      newPulse,
      { scale: 0, opacity: 1 },
      {
        scale: 1.3,
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
      "absolute w-96 h-96 border-4 border-blue-300 -translate-y-28 rounded-full pointer-events-none";
    document.getElementById("pulseContainer")?.appendChild(newPulseRing);
    pulseRingRefs.current.push(newPulseRing);

    gsap.fromTo(
      newPulseRing,
      { scale: 0, opacity: 1 },
      {
        scale: 1,
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
    newPlusOne.className = "absolute flex gap-1 items-center text-xl font-bold pointer-events-none";
    
    // Create the image element
    const img = document.createElement("img");
    img.src = dollar; // Replace with the path to your image
    img.alt = "Heart Image"; // Alt text for accessibility
    
    // Optionally set the image dimensions
    img.style.width = "20px";
    img.style.height = "20px";
    
    // Clear the existing content (optional if needed)
    newPlusOne.textContent = ""; // Clear any text content
    
    // Append the image and the finger count text to the div
    newPlusOne.appendChild(img);
    newPlusOne.appendChild(document.createTextNode(`+${fingerCount * user.earn_per_tap}`));
    
    // Append the newPlusOne element to the pulseContainer
    document.getElementById("pulseContainer")?.appendChild(newPlusOne);
    plusOneRefs.current.push(newPlusOne);

    const colors = ["#FFFF"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const pulseContainer = document.getElementById("pulseContainer");
    const pulseContainerRect = pulseContainer?.getBoundingClientRect();
    if (pulseContainerRect) {
      const centerX = (Math.random()-0.1) * pulseContainerRect.width;

      // const randomNumerator = Math.random() < 0.5 ? (1/8) : (4/5); // Randomly chooses between 1 and 3
      // const centerX = (pulseContainerRect.width * randomNumerator);

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
          scale: 1.25,
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
        rotation: 0,
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
    <div className="relative flex flex-col items-center justify-center h-screen w-full  ">
      <button
        id="pulseContainer"
        disabled={user.available_energy < user.earn_per_tap}
            onTouchStart={handleTouchStart}
            onClick={handleMouseClick}
        className="absolute w-full h-full inset-0 flex items-center justify-center"

      >
        <div className="relative w-full h-full">
          <button
            className="absolute w-[208px] h-[208px] rounded-full border-4 border-transparent"
            
            style={{
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -65%)",
              boxShadow: "0 4px 30px rgba(255, 215, 1, 0.6)",
            }}
          >
            <img
              ref={dollarRef2}
              src={t}
              alt="Dollar Icon"
              className="absolute z-20 inset-0 w-full h-full object-cover rounded-full "
              style={{
                opacity: 1,
              }}
            />
            <img
              ref={dollarRef}
              src={skinConfig.images[skinId || 1]}
              alt="Goat Icon"
              className="absolute z-30 inset-0 w-[160px] h-[190px] -translate-y-20 object-cover rounded-full"
              style={{
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </button>
        </div>
      </button>
    
    </div>
  );
};

export default PulseButton;
