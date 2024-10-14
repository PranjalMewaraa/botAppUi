import React, { useEffect, useRef } from "react";
import { useClicksStore } from "../store/clicks-store";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import useSkinConfig from "../hooks/useSkinConfig";
import skinConfig from "@/config/skin-config";

interface UserTapProps extends React.HTMLProps<HTMLDivElement> {
  updateLoading: (bool: boolean) => void;
}

const UserTap: React.FC<UserTapProps> = (props) => {
  const { updateLoading, ...Props } = props;
  const userTapButtonRef = useRef<HTMLButtonElement | null>(null);
  const pulseRefs = useRef<HTMLDivElement[]>([]); // Pulse effect refs
  const plusOneRefs = useRef<HTMLDivElement[]>([]); // Plus one effect refs
  const { skinId } = useSkinConfig();
  const clicksCountRef = useRef(0);

  const { clicks, addClick, removeClick } = useClicksStore();
  const { UserTap, incraseEnergy, ...user } = useUserStore();

  useEffect(() => {
    const current = localStorage.getItem("ClicksCount");
    clicksCountRef.current = current ? parseFloat(current) : 0;
    console.log("Initial count", clicksCountRef.current);
  }, []);

  useEffect(() => {
    useClicksStore.setState({ clicks: [] });
    const interval = setInterval(() => {
      incraseEnergy(3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabMe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!UserTap()) return;
    const current = localStorage.getItem("ClicksCount");
    localStorage.setItem(
      "ClicksCount",
      current ? String(parseFloat(current) + 1) : "1"
    );
    addClick({
      id: new Date().getTime(),
      value: user.earn_per_tap,
      style: {
        top: e.clientY,
        left: e.clientX + (Math.random() > 0.5 ? 5 : -5),
      },
    });
    handlePulseAnimations(e.clientX, e.clientY, user.earn_per_tap);
  };

  const handlePulseAnimations = (x: number, y: number, earnPerTap: number) => {
    // Pulse effect
    const newPulse = document.createElement("div");
    newPulse.className =
      "absolute w-64 h-64 bg-yellow-500 -translate-y-32 rounded-full pointer-events-none";
    document.body.appendChild(newPulse);
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
          newPulse.remove();
          pulseRefs.current.shift();
        },
      }
    );

    // Plus one effect
    const newPlusOne = document.createElement("div");
    newPlusOne.className = "absolute text-2xl font-bold pointer-events-none";
    newPlusOne.textContent = `+${earnPerTap}`;
    document.body.appendChild(newPlusOne);
    plusOneRefs.current.push(newPlusOne);

    const randomX = (Math.random() - 0.5) * 100; // Random X offset
    newPlusOne.style.left = `${x + randomX}px`;
    newPlusOne.style.top = `${y}px`;
    newPlusOne.style.transform = "translate(-50%, -50%)";
    newPlusOne.style.zIndex = "20";

    gsap.fromTo(
      newPlusOne,
      { y: 0, scale: 1, opacity: 0 },
      {
        y: -60,
        scale: 1.4,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(newPlusOne, {
            y: -100,
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

    // Button scaling animation
    gsap.to(userTapButtonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power1.out",
    });

    Telegram.WebApp.HapticFeedback.impactOccurred("medium");
  };

  return (
    <div {...Props}>
      <div className="flex mt-4 h-[40vh]">
        <button
          ref={userTapButtonRef}
          className="flex items-center justify-center mx-auto transition-all outline-none select-none disabled:opacity-80 disabled:cursor-not-allowed bg-gradient-to-b from-green-500 to-green-900 p-[1vh] rounded-[50%]"
          disabled={user.available_energy < user.earn_per_tap}
          onPointerUp={tabMe}
          style={{
            border: "1.5vh solid transparent",
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle, #65d18f, #306244,#0e1e14), linear-gradient(to bottom, #306244, #0e1e14)",
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
          }}
        >
          <img
            src={skinConfig.images[skinId || 1]}
            alt="level image"
            onLoad={() => props.updateLoading(false)}
            className="object-contain max-w-full w-[35vh] h-[35vh] rounded-full p-8"
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="/images/coin.png"
            alt="coin"
            className="object-contain w-8 h-8"
          />
          <span className="text-xs font-bold">
            {user.available_energy} / {user.max_energy}
          </span>
        </div>
        <Link
          to={"/boost"}
          className="flex items-center space-x-2 text-sm font-bold"
        >
          <span className="text-xs font-bold">Boost</span>
          <img
            src="/images/boost.png"
            alt="boost"
            className="object-contain w-8 h-8"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserTap;
