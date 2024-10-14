import React, { useRef, useState } from 'react';
import TopNav from '../../components/v1/TopNavMine';
import ico from "../../assets/Images/ico.png";
import decrypt from '../../utils/decrypt';
import gsap from 'gsap';
import tokenty from "../../assets/Images/TokenTycoon.png";
import cc from "../../assets/Images/CoinCollector.png";
import bc from "../../assets/Images/Blockchainer.png";
import cm from "../../assets/Images/CryptoMiner.png";

// Define the type for the ProfitBox component
const ProfitBox: React.FC = () => {
  return (
    <div className="min-w-56 flex px-3 py-2 items-center justify-between gap-2 rounded-full bg-[#283140]">
      <p className="text-white text-base">Profit per hour</p>
      <p className="flex text-white items-center text-base gap-2">
        <span>
          <img src={ico} className="w-8 h-8" alt="goat_coin" />
        </span>
        +10
      </p>
    </div>
  );
};

// Define the type for MineCard props
interface MineCardProps {
  name: string;
  img: string;
}

const MineCard: React.FC<MineCardProps> = ({ name, img }) => {
  return (
    <div className="w-1/2 max-w-60 h-full p-1">
      <div id='recbg' className='w-full h-fit p-2 flex-col gap-2 bg-slate-800 text-white rounded-lg'>
        <div className='text-lg w-full text-center font-bold'>{name}</div>
        <div className='w-full font-[ageobold] items-center py-2 text-lg flex gap-2'>
          <img src={img} alt={name} />
          <div className='flex flex-col gap-1 text-xs'>Profit / Hour <span className='text-sm'>+10</span></div>
        </div>
        <div className='flex justify-between items-center py-1 border-t border-dashed border-white'>
          <div>LVL1</div>
          <div className='flex gap-1 items-center'>
            <span>
              <img src={ico} className="w-6 h-6" alt="goat_coin" />
            </span>
            100
          </div>
        </div>
      </div>
    </div>
  );
};

const Mine: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(decrypt(localStorage.getItem("alkine-db-val-er")));
  const [activeSection, setActiveSection] = useState<string>("Fun");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleSectionClick = (section: string) => {
    setBalance(balance)
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        x: "-100%", // Swipe out to the left
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setActiveSection(section); // Update the active section
          gsap.fromTo(
            contentRef.current,
            { x: "100%", opacity: 0 }, // Start position for the new section
            {
              x: "0%", // Slide in from the right
              opacity: 1,
              duration: 0.5,
            }
          );
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 text-white">
      <TopNav active={activeSection} handleClick={handleSectionClick} />
      <h1 className="w-full text-white text-4xl font-[ageobold] text-center p-10 flex justify-center items-center gap-2">
        <span><img src={ico} alt="goat_coin" /></span>
        {balance?.toFixed(1)}
      </h1>
      
      <div className='w-1/2'>
        <ProfitBox />
      </div>
      <div ref={contentRef} className="h-20 w-full transition-all duration-300">
        {activeSection === "Fun" && (
          <div className="w-full h-dvh p-2 py-4 mt-4 overflow-y-scroll">
            <p className='text-white text-xl px-2 font-[ageobold] py-2'>Mission</p>
            <div className='flex flex-wrap'>
              <MineCard name={"Token Tycoon"} img={tokenty} />
              <MineCard name={"Coin Collector"} img={cc} />
              <MineCard name={"BlockChainer"} img={bc} />
              <MineCard name={"Crypto Miner"} img={cm} />
            </div>
          </div>
        )}
        {activeSection === "NFT" && <div>Coming Soon</div>}
        {activeSection === "Asset Tokenize" && (
          <div>Asset Tokenize section content goes here.</div>
        )}
      </div>
    </div>
  );
};

export default Mine;
