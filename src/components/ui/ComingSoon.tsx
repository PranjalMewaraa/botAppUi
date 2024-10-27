import { useNavBar } from "@/utils/useNavBar";
const ComingSoon = () => {
  const { activeIndex, setActiveIndex } = useNavBar();
  console.log(activeIndex)
  return (
    <div id='main_div' className=' w-full h-screen flex flex-col justify-center text-white items-center gap-4'>
        <div className="text-2xl font-[ageobold]">Coming Soon</div>
        <div className="text-lg">Stay Tuned for more updates</div>
        <div onClick={()=>setActiveIndex(0)}>Back to Home</div>
    </div>
  )
}

export default ComingSoon