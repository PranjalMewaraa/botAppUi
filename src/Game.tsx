import { useEffect, useState } from "react";
import BottomNavbar from "./components/v1/BottomNavBar"
import Home from "./Page/Home";
import Games from "./Page/Games";
import Mine from "./Page/Mine";
import Earn from "./pages/Earn";
import Profile from "./Page/Profile";
import Airdrop from "./pages/Airdrop";
import { useUserStore } from "./store/user-store";
import encrypt from "./utils/encrypt";



function Game() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    
    const updateVh = () => {
      
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    

    updateVh();
    
    window.addEventListener('resize', updateVh);

    return () => window.removeEventListener('resize', updateVh);
  }, []);

  useEffect(()=>{
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  },[activeIndex,setActiveIndex])

  return (
    <div id="main_div" className=" max-w-screen-sm overflow-hidden relative"
    style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className=" overflow-y-scroll" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {activeIndex === 0 && <Home activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>}
      {activeIndex === 1 && <Games/>}
      {activeIndex === 2 && <Airdrop/>}
      {activeIndex === 3 && <Mine/>}
      {activeIndex === 4 && <Earn/>}
      {activeIndex === 5 && <Profile/>}
      </div>
      <BottomNavbar activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
    </div>
  )
}

export default Game