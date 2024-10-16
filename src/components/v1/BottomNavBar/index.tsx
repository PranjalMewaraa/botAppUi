import { FC } from "react";
import picaxe from '../../../assets/Images/pickaxe.png';
import mansion from "../../../assets/Images/mansion.png";
import joystick from "../../../assets/Images/joystick.png";
import diamond from "../../../assets/Images/diamond.png";
import dollar from "../../../assets/Images/ico.png";

// Define the prop types
interface BottomNavbarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const BottomNavbar: FC<BottomNavbarProps> = ({ activeIndex, setActiveIndex }) => {
  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="absolute bottom-0 pb-4 flex z-50 items-center justify-evenly w-full rounded-t-xl shadow-md p-2 border-r-2 border-b-2 border-l-2 border-t-1 border-yellow-500"
      style={{
        background: "linear-gradient(to right, #2D3748, #1A202C)",
      }}
    >
      <div className="relative w-full h-full flex justify-between">
        {["Home", "Games", "Airdrop", "Mine", "Earn"].map((label, index) => (
          <button
            key={label}
            className={`flex flex-col items-center justify-center w-12 h-12 bg-transparent rounded-lg transition-all duration-300 ease-in-out  ${
              activeIndex === index ? "text-yellow-500" : "text-slate-50"
            } ${label!=="Airdrop"?"hover:bg-slate-600":""}`}
            onClick={() => handleButtonClick(index)}
            onTouchStart={() => handleButtonClick(index)}
          >
            {label === "Home" && (
              <img src={mansion} className="w-8 h-8 p-1" alt="Home" />
            )}
            {label === "Games" && (
              <img src={joystick} className="w-8 h-8 p-1" alt="Games" />
            )}
            {label === "Airdrop" && (
              <img
                src={dollar}
                className="w-12 h-12 p-1 -translate-y-5 scale-150"
                alt="Airdrop"
              />
            )}
            {label === "Mine" && (
              <img src={picaxe} className="w-8 h-8 p-1" alt="Mine" />
            )}
            {label === "Earn" && (
              <img src={diamond} className="w-8 h-8 p-1" alt="Earn" />
            )}

            <span
              className={`${
                label === "Airdrop" ? "text-lg -translate-y-2" : "text-xs"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
