import { useState, useEffect} from "react";
import goat2 from "../../../assets/Images/goat2.png";

interface OptionButtonsProps {
  src: string;
  style?: React.CSSProperties; 
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ src, style }) => {
  return (
    <div
      className="w-16 h-16 p-1 bg-slate-500 flex flex-col gap-1 rounded-lg"
      style={style}
    >
      <img className="w-full h-4/5" src={src} alt="Option" />
      <p className="text-white text-xs w-full text-center">Game</p>
    </div>
  );
};

const FABMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const options: string[] = [
    "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/a/e/3/ae30e38eaa08f28edd529d465aaa495d26a2048a.png",
    "https://motioneditz.com/wp-content/uploads/2021/10/1633490651944.webp",
    "https://wallpapercave.com/wp/wp6591886.jpg",
  ];

  // Cloud's Animation
  useEffect(() => {
   
  }, []);

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end">
      <div
        className={`flex flex-col space-y-2 mb-8 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {options.map((option, index) => (
          <OptionButtons
            key={index}
            src={option}
            style={{
              transition: "opacity 0.2s ease, transform 0.2s ease",
              transitionDelay: `${isOpen ? (2 - index) * 100 : index * 100}ms`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0px)" : "translateY(10px)",
            }}
          />
        ))}
      </div>

      <button
        className="w-16 h-16 rounded-lg text-white text-2xl flex items-center justify-center -translate-x-5 transition-transform transform bg-[url(https://cdn1.iconfinder.com/data/icons/e-commerce-set-4/256/New-512.png)]"
        onClick={toggleMenu}
      >
        <img src={goat2} alt="Goat Icon" />
      </button>
    </div>
  );
};

export default FABMenu;
