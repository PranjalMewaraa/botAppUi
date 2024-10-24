
import pic from "../../assets/Images/pic.png"
import set from "../../assets/Images/set.png"
import useSkinConfig from "@/hooks/useSkinConfig";
import { ReactEventHandler, useEffect, useState } from "react";
import skinConfig from "@/config/skin-config";
import { Link } from "react-router-dom";

const Profile = () => {
  const { skinId, updateSkinId } = useSkinConfig();
   
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  console.log(loading)
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
    
    <div className='w-full h-screen font-[ageo] flex flex-col p-4 gap-2'>
    <div id="profile_header" className="w-full mt-2 h-24 flex justify-between items-center ">
         <ProfileBox/>
         <ProfitBox/>
    </div>
    <Link to={'/leaderboard'} className="w-full pt-4 text-xl font-[ageobold] text-center text-white">🏆 LeaderBoard</Link>
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
 
   
   
 </div>
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
    return(
        <div className="h-full flex gap-4 items-center">
            <div className="h-16 bg-[#283140] rounded-xl"> 
                <img src={pic} alt="" className=" aspect-square h-full p-1 rounded-full"/>      
            </div>
            <h1 className="text-white text-lg font-semibold">Pranjal (CEO)</h1>
        </div>
    )
}
const ProfitBox = ()=>{
    return(
        <Link to={'/settings'} className=" flex flex-col px-3 py-1  items-center rounded-full bg-[#283140] border-t border-r border-yellow-600">
            <img src={set} alt="setting" />
        </Link>
    )
}
export default Profile