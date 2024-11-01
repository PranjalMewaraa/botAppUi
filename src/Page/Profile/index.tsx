
import pic from "../../assets/Images/pic.png"
import set from "../../assets/Images/set.png"
import useSkinConfig from "@/hooks/useSkinConfig";
import { ReactEventHandler, useEffect, useState } from "react";
import skinConfig from "@/config/skin-config";
import { useUserStore } from "@/store/user-store";
import { useNavBar } from "@/utils/useNavBar";
import Leaderboard from "@/pages/Leaderboard";
import { FaGrav } from "react-icons/fa";

const Profile = () => {
  const { skinId, updateSkinId } = useSkinConfig();
  const [showLeaderBoard,setShowLeaderboard]=useState<boolean>(false); 
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  console.log(loading)
  console.log(showLeaderBoard);
  useEffect(() => {
    // When all images are loaded, set loading to false
    if (loadedCount === Object.entries(skinConfig.images).length) {
      setLoading(false);
    }
  }, [loadedCount, Object.entries(skinConfig.images).length]);  
  const handleImageLoad = () => {
    setLoadedCount(prevCount => prevCount + 1);
  };
  return (
    <>
    {showLeaderBoard?<Leaderboard toggleShow={setShowLeaderboard}/>:
    <div className='w-full h-screen font-[ageo] flex flex-col p-4 gap-2'>
      <div id="profile_header" className="w-full mt-2 h-24 flex justify-between items-center ">
          <ProfileBox/>
          <ProfitBox/>
      </div>
      <div className="flex gap-2">
        <div onClick={()=>{setShowLeaderboard(true)}} className="w-1/2 p-4 bg-slate-800 text-xl font-[ageobold] text-center border border-yellow-500 rounded-md text-white">🏆 LeaderBoard</div>
        <div className="w-1/2 p-4 bg-slate-800 text-xl flex gap-1 font-[ageobold] text-center border border-yellow-500 rounded-md text-white"> <FaGrav color="white" size={24}/> Friends</div>
      </div>
      <div className="w-full h-64 mt-6 px-8 flex justify-center items-center">
          <div className=" aspect-square h-full bg-slate-800 rounded-2xl">
          <img src={skinConfig.images[skinId || 1]} alt="" />
          </div>
      </div>
      <div className="w-[90%] h-fit pl-8 overflow-x-scroll">
          <div className="w-fit flex h-full items-center gap-2">
          {Object.entries(skinConfig.images).map(([key, src]) => {
                const buttonClass = key == String(skinId) ? "border-2 rounded-2xl border-white" : "";
                return (
                  <button
                    key={key}
                    onClick={() => updateSkinId(Number(key))}
                    className={` ${buttonClass}`}
                  >
                    <CharCard onLoad={handleImageLoad} src={src}/>
                  </button>
                );
              })}
          </div>
      </div>
   </div>}
    
   </>
  )
}


const CharCard = (props: { src: string | undefined; onLoad: ReactEventHandler<HTMLImageElement> | undefined; })=>{
    return(
        <div className="w-24 h-3/4 bg-slate-800 flex items-center justify-center rounded-2xl">
          <img src={props.src} alt="" className="h-4/5" onLoad={props.onLoad}/>
        </div>
    )
}




const ProfileBox = ()=>{
    const user = useUserStore();

    return(
        <div className="h-full flex gap-4 items-center">
            <div className="h-16 bg-[#283140] rounded-xl"> 
                <img src={pic} alt="" className=" aspect-square h-full p-1 rounded-full"/>      
            </div>
            <h1 className="text-white text-lg font-semibold">{user?.first_name} {user?.last_name}</h1>
        </div>
    )
}
const ProfitBox = ()=>{
  const { activeIndex, setActiveIndex } = useNavBar();
  console.log(activeIndex)
    return(
        <div onClick={()=>setActiveIndex(8)} className=" flex flex-col px-3 py-1  items-center rounded-full bg-[#283140] border-t border-r border-yellow-600">
            <img src={set} alt="setting" />
        </div>
    )
}
export default Profile