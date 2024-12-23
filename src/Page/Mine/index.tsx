import React, { useEffect, useState } from "react";
import Price from "@/components/Price";
import { $http } from "@/lib/http";
import { cn, compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import { useUserStore } from "@/store/user-store";
import { Mission } from "@/types/MissionType";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import UserGameDetails from "@/components/UserGameDetails";
import MissionDrawer from "@/components/MissionDrawer";
import TopNav from "@/components/v1/TopNavMine";
import MissionDrawer3 from "@/components/NFTDrawer";
import MissionDrawer2 from "@/components/AssetDrawer";

// Define types for props
interface LockInfoProps {
  mission: Mission;
  userLevel: number;
}

// LockInfo Component for displaying locked mission information
const LockInfo: React.FC<LockInfoProps> = ({ mission, userLevel }) => (
  <div className="flex items-center gap-2 text-[10px]">
    <img src="/images/lock.png" alt="lock" className="object-contain w-5 h-5" />
    <span>
      {mission.required_user_level && mission.required_user_level > userLevel
        ? `Mission required lvl ${mission.required_user_level}`
        : `Mission required friends ${mission.required_friends_invitation} invited`}
    </span>
  </div>
);

interface MineCardProps {
  mission: Mission;
  setSelectedMission: (mission: Mission) => void;
  setOpenDrawer: (open: boolean) => void;
  userLevel: any ;
  totalReferals: number;
}
interface MineCardAssetProps {
  name:string;
  image:string;
  data:data,
  setAssetTokenizeDrawer: (open: boolean) => void,
  setSelectedNFT:(obj:data)=>void;
}
interface NFTAssetProps {
  name:string;
  image:string;
  data:data,
  setAssetTokenizeDrawer: (open: boolean) => void,
  setSelectedNFT:(obj:data)=>void;
}

const MineCard: React.FC<MineCardProps> = ({ mission, setSelectedMission, setOpenDrawer, userLevel, totalReferals }) => {
  const isLocked =
    (mission?.required_user_level && mission.required_user_level > userLevel) ||
    (mission.required_friends_invitation && mission.required_friends_invitation > totalReferals);

  const handleClick = () => {
    if (!mission.next_level || isLocked) return;
    setSelectedMission(mission);
    setOpenDrawer(true);
  };

  return (
    <div
      className={cn("w-1/2 max-w-60 h-full p-1", { "opacity-40 cursor-not-allowed": isLocked })}
      onClick={handleClick}
    >
      <div className="w-full h-fit p-2 flex-col gap-2 bg-slate-800 text-white rounded-lg">
        <div className="text-lg w-full text-center font-bold">{mission.name}</div>
        <div className="w-full items-center py-2 text-lg flex gap-2">
          <img src={mission.image} alt={mission.name} className="w-1/3"/>
          <div className="flex flex-col gap-1 text-xs">
            Bonus per Hour
            <span className="text-sm">
              <Price amount={mission.production_per_hour || `+${mission.next_level?.production_per_hour || 0}`} />
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center py-1 border-t border-dashed border-white">
          <div>LVL {mission.next_level?.level}</div>
          <div className="flex gap-1 items-center">
            {isLocked ? (
              <LockInfo mission={mission} userLevel={userLevel} />
            ) : (
              mission.next_level?.cost && (
                <Price amount={compactNumber(mission.next_level?.cost)} className="text-[10px]" />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type data = {
  name:string,
  img:string,
  price:string,
}


export default function Missions() {
  const user = useUserStore();
  const { missionTypes, totalReferals } = uesStore();
  const [activeType, setActiveType] = useState(missionTypes?.[0]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [selectNFT,setSelectedNFT]=useState<data>();
  const [openAssetTokenizeDrawer,setAssetTokenizeDrawer]=useState<boolean>(false)
  const [AssetSelected,setSelectedAsset]=useState<data>();
  const NFTdata=[{name:"Monkey NFT", img:"https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg",price:'150'},{name:"Ape NFT", img:"https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg",price:'175'}]

  const Assetdata=[
    {name:"RockFilde Mansion", img:"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",price:"50"},
    {name:"Marco Mansion", img:"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",price:"50"}
  ]


  const [openNFTDrawer,setNFTDrawer]=useState<boolean>(false)
   console.log(openDrawer)
   console.log(selectedMission)
  const missions = useQuery({
    queryKey: ["/clicker/missions", activeType?.id],
    queryFn: () =>
      $http.$get<Mission[]>(`/clicker/missions`, {
        params: { type: activeType?.id },
      }),
    staleTime: 1000 * 60,
    enabled: !!activeType?.id,
  });
  const [section,setSection]=useState('Fun');
  const handleSectionChange = (section: string) => {
    setSection(section);
  }
  
  useEffect(()=>{
    window.dispatchEvent(new Event("UpdateBalance"));
  },[activeType])  

  return (
    <div className="h-[90%] flex flex-col justify-end bg-cover flex-1 text-white" >
      <div className="flex flex-col flex-1 w-full h-full px-6 pb-24 mt-12">
       <TopNav active={section} handleClick={handleSectionChange}/> 
        <UserGameDetails className="mt-4"/>
        <div className="flex items-center justify-center mt-10 space-x-1 text-white">
          <img src="/images/coin.png" alt="coins" className="object-contain w-14 h-14" />
          <span className="text-3xl text-white font-bold">{Math.floor(user.balance)?.toLocaleString()}</span>
        </div>
        {section==="Fun" && <div className="mt-10">
          <div className="flex gap-4">
            {missionTypes.map((type, key) => (
              <button
                key={key}
                className={cn("text-xs font-bold uppercase", {
                  "opacity-40": activeType.id !== type.id,
                })}
                onClick={() => setActiveType(type)}
              >
                {type.name}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap">
              {missions.isLoading ? (
                <div className="flex items-center justify-center h-full col-span-2 mt-6">
                  <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : (
                missions.data &&
                missions.data.map((mission, key) => (
                  <MineCard
                    key={key}
                    mission={mission}
                    setSelectedMission={setSelectedMission}
                    setOpenDrawer={setOpenDrawer}
                    userLevel={user.level?.level}
                    totalReferals={totalReferals}
                  />
                ))
              )}
            </div>
          </div>
        </div> }
        {section==="NFT" && <div className="mt-10">
          <div className="flex gap-4">
            {missionTypes.map((type, key) => (
              <button
                key={key}
                className={cn("text-xs font-bold uppercase", {
                  "opacity-40": activeType.id !== type.id,
                })}
                onClick={() => setActiveType(type)}
              >
                {type.name}
              </button>
            ))}
          </div>
          <div className="mt-6">
            {/* <div className="flex flex-wrap">
              {missions.isLoading ? (
                <div className="flex items-center justify-center h-full col-span-2 mt-6">
                  <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : (
                missions.data &&
                missions.data.map((item) => (
                  <EmptyMineCard key={item.id}/>
                ))
              )}
            </div> */}
           <div className="grid grid-cols-2 gap-4 min-h-64">
              {NFTdata.map((data)=>{
                return <NFTCard name={data.name} image={data.img} setAssetTokenizeDrawer={setNFTDrawer} data={data} setSelectedNFT={setSelectedNFT}/>
              })}
              
           </div>
          </div>
        </div> }
        {section==="Asset Tokenize" && <div className="mt-10">
          <div className="flex gap-4">
            {missionTypes.map((type, key) => (
              <button
                key={key}
                className={cn("text-xs font-bold uppercase", {
                  "opacity-40": activeType.id !== type.id,
                })}
                onClick={() => setActiveType(type)}
              >
                {type.name}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap">
              {missions.isLoading ? (
                <div className="flex items-center justify-center h-full col-span-2 mt-6">
                  <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : (
                Assetdata.map((data)=>{
                  return <AssetTokenizeCard name={data.name} image={data.img} setAssetTokenizeDrawer={setAssetTokenizeDrawer} data={data} setSelectedNFT={setSelectedAsset}/>
                })
              )}
            </div>
          </div>
        </div> }
        
      </div>
      <MissionDrawer open={openDrawer} onOpenChange={setOpenDrawer} mission={selectedMission} />
      <MissionDrawer2 open={openAssetTokenizeDrawer} onOpenChange={setAssetTokenizeDrawer} data={AssetSelected}/>
      <MissionDrawer3 open={openNFTDrawer} onOpenChange={setNFTDrawer} data={selectNFT}/>
    </div>
  );
}



const AssetTokenizeCard:React.FC<MineCardAssetProps> = ({name,image,setAssetTokenizeDrawer,setSelectedNFT,data}) => {

  const handleClick = () => {
    setSelectedNFT(data);
    setAssetTokenizeDrawer(true);
   
  };

  return (
    <div
      className={cn("w-1/2 max-w-60 h-full p-1", { "opacity-40 cursor-not-allowed": "" })}
      onClick={handleClick}
    >
     <div className="w-full h-full flex flex-col gap-2  bg-slate-800 text-white rounded-lg p-2">
        <img src={image} className="w-full rounded-lg h-2/3 p-1" alt="" />
        <p className="w-full text-center">
          {name}
        </p>
     </div>
    </div>
  );
};

const NFTCard:React.FC<NFTAssetProps> = ({name,image,setAssetTokenizeDrawer,setSelectedNFT,data}) => {

  const handleClick = () => {
    setSelectedNFT(data);
    setAssetTokenizeDrawer(true);
  };

  return (
    <div
      className={cn("w-full h-full max-h-48 p-1", { "opacity-40 cursor-not-allowed": "" })}
      onClick={handleClick}
    >
     <div className="w-full h-full flex flex-col gap-2  bg-slate-800 text-white rounded-lg p-2">
        <img src={image} className="w-full rounded-lg h-2/3 p-1" alt="" />
        <p className="w-full text-center">
          {name}
        </p>
     </div>
    </div>
  );
};