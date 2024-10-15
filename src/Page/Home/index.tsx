import pic from "../../assets/Images/pic.png";
import ico from "../../assets/Images/ico.png";
import boost from "../../assets/Images/boost.png";
import PulseButton from "../../components/v1/TapperMultiTap";
import FABMenu from "../../components/v1/Fab";
import { useUserStore } from "@/store/user-store";
import { uesStore } from "@/store";
import set from "../../assets/Images/set.png"
import balance from "../../assets/Images/balance.png"
import decrypt from "@/utils/decrypt";
import { useEffect, useState } from "react";



interface HomeProps {    
    activeIndex:number;
    setActiveIndex: (index: number) => void;
}



const Home: React.FC<HomeProps> = ({activeIndex,setActiveIndex}) => {
  
  
  const ButtonClick=(index:number)=>{
       console.log('x',activeIndex)
        setActiveIndex(index);
  }  
  useEffect(()=>{
    const handleLocalStorageUpdate = () => {
     setTapCount(  Number(decrypt(localStorage.getItem("alkine-db-val-er") || "0")) || 0)
    };

    // Add the event listener
    window.addEventListener("localStorageUpdated", handleLocalStorageUpdate);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("localStorageUpdated", handleLocalStorageUpdate);
    };
  },[])
  const [tapCount,setTapCount] = useState<number>(
    Number(decrypt(localStorage.getItem("alkine-db-val-er") || "0")) || 0
  );
  const user = useUserStore();

  return (
    <div className="w-full h-screen font-[ageobold] flex flex-col p-4 gap-2">
      <div id="profile_header" className="w-full mt-2 h-24 flex justify-between items-center" onClick={()=>ButtonClick(5)}>
        <ProfileBox />
        <ProfitBox />
      </div>
      <ProgressIndicator />
      <PulseButton />
      <div className="text-white w-[95%] absolute bottom-44 flex gap-2 flex-col items-center justify-center text-xl font-bold">
        <div className="flex items-center gap-4">
          <span >
            <img src={balance} alt="" />
          </span>
          {Math.floor(tapCount)}
        </div>
        <div className="flex items-center space-x-2 text-sm">
          Earn Per Tap 🤑 +{user.earn_per_tap} {'   |   '}
          <span className="text-sm font-bold text-white">
          ⚡{user.available_energy} / {user.max_energy}
          </span>
      </div>
      </div>
      <div className="absolute bottom-24 w-full h-20 flex justify-left items-center">
      <div className="flex text-white items-center gap-2 text-xl" onClick={()=>ButtonClick(6)}>
        <span>
          <img src={boost} alt="boost" />
        </span>
        Boost
      </div>
      <FABMenu />
    </div>
    </div>
  );
};

// ProfileBox component expects a handleClick prop


const ProfileBox: React.FC = () => {

  const user = useUserStore();
  return (
    <div
      className="h-full flex gap-4 items-center"
    >
      <div className="h-16 bg-[#283140] rounded-xl">
        <img src={pic} alt="Profile Picture" className="aspect-square h-full p-1 rounded-full" />
      </div>
      <h1 className="text-white text-base font-semibold">{user?.first_name} {user?.last_name}</h1>
    </div>
  );
};

const ProfitBox: React.FC = () => {
 
  return (
    <div className=" flex flex-col px-3 py-1  items-center rounded-full bg-[#283140] border-t border-r border-yellow-600">
            <img src={set} alt="setting" />
    </div>
  );
};

const ProgressIndicator: React.FC = () => {
  
  const { maxLevel } = uesStore();
  const user = useUserStore();
  

  console.log((user.balance! / user.level!.to_balance) * 100)
  return (
    <div className=" bg-transparent w-full h-24 mt-2 flex flex-col gap-1">
      <div className="flex w-full justify-between text-white">
        <p>{user.level?.name}</p>
        <p className="flex gap-2 items-center">
          Profit per Hour{" "}
          <span>
            <img src={ico} alt="coin" className="h-6 w-6" />
          </span>{" "}
          +{user.production_per_hour}
        </p>
      </div>
      <div className="w-full h-4 bg-slate-700 p-[2px] rounded-full">
        <div className="h-full bg-yellow-500 rounded-full" style={{
            width: `${(user.balance / user.level!.to_balance) * 100}%`,
        }}></div>
      </div>
      <div className="flex w-full justify-between text-white text-sm">
      <p>Level {user.level?.level}/{maxLevel}</p>
        
        <p>Coins to Level Up - {user.level?.to_balance}</p>
      </div>
    </div>
  );
};



export default Home;
