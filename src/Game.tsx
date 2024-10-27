import { useEffect } from "react";
import BottomNavbar from "./components/v1/BottomNavBar"
import Home from "./Page/Home";
import Games from "./Page/Games";
import Mine from "./BetaLaunchPages/Mine";
import Earn from "./pages/Earn";
import Profile from "./Page/Profile";
import Airdrop from "./Page/Airdrop";
import Boost from "./pages/Boost";
import { $http } from "@/lib/http";
import { PopupMessageType } from "@/types/PopupMessageType";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PopupMessageDialog from "./components/PopupMessageDialog";
import { useNavBar } from "./utils/useNavBar";
import ComingSoon from "./components/ui/ComingSoon";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";


export default function Game() {
  const { activeIndex, setActiveIndex } = useNavBar();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const popupMessage = useQuery({
    queryKey: ["popup-message"],
    queryFn: () => $http.$get<PopupMessageType>("/popups"),
  });

  useEffect(() => {
    const updateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, [activeIndex, setActiveIndex]);

  useEffect(() => {
    if (pathname !== "/") {
      window.Telegram.WebApp.BackButton.show();
    } else {
      window.Telegram.WebApp.BackButton.hide();
    }
  }, [pathname]);

  useEffect(() => {
    window.Telegram.WebApp.BackButton.onClick(() => {
      navigate("/");
    });
  }, []);
  console.log(activeIndex)
  return (
    <div
      id="main_div"
      className="max-w-screen-sm w-screen overflow-hidden relative"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div
        className="content-wrapper overflow-y-scroll"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        {activeIndex === 0 && <Home/>}
        {activeIndex === 1 && <Games />}
        {activeIndex === 2 && <Airdrop />}
        {activeIndex === 3 && <Mine />}
        {activeIndex === 4 && <Earn />}
        {activeIndex === 5 && <Profile />}
        {activeIndex === 6 && <Boost />}
        {activeIndex===7 && <ComingSoon/>}
        {activeIndex===8 && <Settings/>}
        {activeIndex===9 && <Wallet/>}
      </div>
      <PopupMessageDialog message={popupMessage.data} />
      {/* Force navbar to remain visible */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomNavbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
    </div>
  );
}
