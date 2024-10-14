
import pic from "../../assets/Images/pic.png"
import set from "../../assets/Images/set.png"
import goat from "../../assets/Images/goat.png"

const Profile = () => {
  return (
    <div className='w-full h-screen font-[ageo] flex flex-col p-4 gap-2'>
    <div id="profile_header" className="w-full mt-2 h-24 flex justify-between items-center ">
         <ProfileBox/>
         <ProfitBox/>
    </div>
    <div className="w-full pt-4 text-center text-white">LeaderBoard</div>
    <div className="w-full h-64 mt-6 px-8 flex justify-center items-center">
        <div className=" aspect-square h-full bg-slate-800 rounded-2xl">
        <img src={goat} alt="" />
        </div>
    </div>
    <div className="w-[90%] h-28 pl-8 overflow-x-scroll">
        <div className="w-fit flex h-full items-center gap-2">
          <CharCard/>
          <CharCard/>
          <CharCard/>
          <CharCard/>
        </div>
    </div>
 
   
   
 </div>
  )
}


const CharCard = ()=>{
    return(
        <div className="w-24 h-3/4 bg-slate-800 flex items-center justify-center rounded-2xl">
        <img src={goat} alt="" className="h-4/5"/>
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
        <div className=" flex flex-col px-3 py-1  items-center rounded-full bg-[#283140] border-t border-r border-yellow-600">
            <img src={set} alt="setting" />
        </div>
    )
}
export default Profile