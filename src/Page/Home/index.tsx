import pic from "../../assets/Images/pic.png";
import ico from "../../assets/Images/ico.png";
import boost from "../../assets/Images/boost.png";
import PulseButton from "../../components/v1/TapperMultiTap";
import FABMenu from "../../components/v1/Fab";
import { useUserStore } from "@/store/user-store";
import { uesStore } from "@/store";



interface HomeProps {    
    activeIndex:number;
    setActiveIndex: (index: number) => void;
}



const Home: React.FC<HomeProps> = ({activeIndex,setActiveIndex}) => {
  
  
  const ButtonClick=(index:number)=>{
       console.log(activeIndex)
        setActiveIndex(index);
  }  

  return (
    <div className="w-full h-screen font-[ageo] flex flex-col p-4 gap-2">
      <div id="profile_header" className="w-full mt-2 h-24 flex justify-between items-center" onClick={()=>ButtonClick(5)}>
        <ProfileBox />
        <ProfitBox />
      </div>
      <ProgressIndicator />
      <PulseButton />
      <BottomSection />
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
  const user = useUserStore();
  return (
    <div className="flex flex-col px-3 py-1 items-center rounded-full bg-[#283140]">
      <p className="text-white text-sm">Profit / hour</p>
      <p className="flex text-white items-center text-base gap-2">
        <span>
          <img src={ico} className="w-8 h-8" alt="goat_coin" />
        </span>
        + {user.production_per_hour}
      </p>
    </div>
  );
};

const ProgressIndicator: React.FC = () => {
  const { maxLevel } = uesStore();
  const user = useUserStore();
  console.log((user.balance! / user.level!.to_balance) * 100)
  return (
    <div className="w-full h-24 mt-2 flex flex-col gap-1">
      <div className="flex w-full justify-between text-white">
        <p>{user.level?.name}</p>
        <p>Level {user.level?.level}/{maxLevel}</p>
      </div>
      <div className="w-full h-4 bg-slate-700 p-[2px] rounded-full">
        <div className="h-full bg-yellow-500 rounded-full" style={{
            width: `${(user.balance / user.level!.to_balance) * 100}%`,
        }}></div>
      </div>
      <div className="flex w-full justify-between text-white text-sm">
        <p className="flex gap-2 items-center">
          Profit per Hour{" "}
          <span>
            <img src={ico} alt="coin" className="h-6 w-6" />
          </span>{" "}
          +{user.production_per_hour}
        </p>
        <p>Coins to Level Up - {user.level?.to_balance}</p>
      </div>
    </div>
  );
};

const BottomSection: React.FC = () => {
  return (
    <div className="absolute bottom-24 w-full h-20 flex justify-left items-center">
      <div className="flex text-white items-center gap-2 text-xl">
        <span>
          <img src={boost} alt="boost" />
        </span>
        Boost
      </div>
      <FABMenu />
    </div>
  );
};

export default Home;