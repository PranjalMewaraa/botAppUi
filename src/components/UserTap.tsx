import React, { useEffect, useRef } from "react";
import { useClicksStore } from "../store/clicks-store";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
// import { useDebounce } from "@uidotdev/usehooks";
// import { $http } from "@/lib/http";
// import levelConfig from "@/config/level-config";
import useSkinConfig from "../hooks/useSkinConfig";
import skinConfig from "@/config/skin-config";
// import { BoosterType, BoosterTypes, UserType } from "@/types/UserType";

interface UserTapProps extends React.HTMLProps<HTMLDivElement> {
    updateLoading: (bool: boolean) => void;
}


 const UserTap: React.FC<UserTapProps>=(props)=> {
const { updateLoading, ...Props } = props;
  const userAnimateRef = useRef<HTMLDivElement | null>(null);
  const userTapButtonRef = useRef<HTMLButtonElement | null>(null);
  // const [clicksCount, setClicksCount] = useState(0);
  // const debounceClicksCount = useDebounce(clicksCount, 1000);
  // const [timer, setTimer] = useState(new Date());
  const { skinId } = useSkinConfig();
  const clicksCountRef = useRef(0); // Use a ref to keep track of clicks
  
  useEffect(() => {
    // Initialize clicks count on component mount
    const current = localStorage.getItem("ClicksCount");
    clicksCountRef.current = current ? parseFloat(current) : 0;
  
    console.log("Initial count", clicksCountRef.current);
  }, []);
  // useEffect(() => {
  //   const executeEvery30sec = () => {
  //     console.log("Function executed every 30 sec", new Date());
  //     setTimer(new Date());
  //   };
    
  //   const intervalId = setInterval(executeEvery30sec, 30000);
  //   return () => clearInterval(intervalId);
  // }, []);
  // useEffect(() => {
  //   if (clicksCountRef.current === 0) return;

  //   $http
  //     .post<Record<string, any>>("/clicker/tap", {
  //       count: clicksCountRef.current,
  //       energy: user.available_energy,
  //       timestamp: Math.floor(Date.now() / 1000),
  //     })
  //     .then(async ({ data }) => {
  //       localStorage.setItem("ClicksCount", "0");
  //       clicksCountRef.current = 0;
  //       // const test = async () => {
  //       //   return await $http.$get<{
  //       //     user: UserType;
  //       //     boosters: Record<BoosterTypes, BoosterType>;
  //       //   } & Record<string, any>>("/clicker/sync");
  //       // };

  //       // // Use the test function
  //       // try {
  //       //   const syncData = await test();
  //       //   console.log("Sync data", syncData.user.balance);
  //       //   useUserStore.setState({
  //       //     balance: syncData.user.balance,
  //       //   });
       
  //       // } catch (error) {
  //       //   console.error("Failed to fetch sync data", error);
  //       // }

  //       if (data.leveled_up) {
  //         useUserStore.setState({
  //           level: data.level || user.level,
  //           earn_per_tap: data.earn_per_tap,
  //           max_energy: data.max_energy,
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       console.log("Failed to post data");
  //       localStorage.setItem("ClicksCount", String(clicksCountRef.current));
  //     });
  // }, [timer]);

  const { clicks, addClick, removeClick } = useClicksStore();
  const { UserTap, incraseEnergy, ...user } = useUserStore();
 
  const tabMe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!UserTap(1)) return;
    // setClicksCount((prev) => prev + 1);
    const current = localStorage.getItem("ClicksCount");
    localStorage.setItem(
      "ClicksCount",
      current ? String(parseFloat(current) + 1) : "1"
    );
    addClick({
      id: new Date().getTime(),
      value: user.earn_per_tap,
      style: {
        top: e.clientY,
        left: e.clientX + (Math.random() > 0.5 ? 5 : -5),
      },
    });
    animateButton();
  };

  const animateButton = () => {
    if (!userTapButtonRef.current) return;

    Telegram.WebApp.HapticFeedback.impactOccurred("medium");

    userTapButtonRef.current.classList.add("scale-90");
    setTimeout(() => {
      userTapButtonRef.current?.classList.remove("scale-90");
    }, 100);
  };

 

  useEffect(() => {
    useClicksStore.setState({ clicks: [] });

    const interval = setInterval(() => {
      incraseEnergy(3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div {...Props}>
      <div className="flex mt-4  h-[40vh]">
        <button
          ref={userTapButtonRef}
          className="flex items-center justify-center mx-auto transition-all outline-none select-none disabled:opacity-80 disabled:cursor-not-allowed bg-gradient-to-b from-green-500 to-green-900 p-[1vh] rounded-[50%]"
          disabled={user.available_energy < user.earn_per_tap}
          onPointerUp={tabMe}
          style={{
            border: "1.5vh solid transparent", // Make the base border transparent
            borderRadius: "50%", // Ensure the border is circular
            backgroundImage:
              "radial-gradient(circle, #65d18f, #306244,#0e1e14), linear-gradient(to bottom, #306244, #0e1e14)", // Two backgrounds: one for the border, one for the button
            backgroundOrigin: "border-box", // Ensure the background starts from the border
            backgroundClip: "content-box, border-box", // Clip the background inside the border
          }}
        >
          <img
            src={skinConfig.images[skinId || 1]}
            alt="level image"
            onLoad={() => props.updateLoading(false)}
            className={"object-contain max-w-full w-[35vh] h-[35vh] rounded-full p-8"}
          />
        </button>
      </div>

      <div ref={userAnimateRef} className="user-tap-animate ">
        {clicks.map((click) => (
          <div
            key={click.id}
            onAnimationEnd={() => removeClick(click.id)}
            style={click.style}
          >
            +{click.value}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between  ">
        <div className="flex items-center space-x-2 ">
          <img
            src="/images/coin.png"
            alt="coin"
            className="object-contain w-8 h-8"
          />
          <span className="text-xs font-bold">
            {user.available_energy} / {user.max_energy}
          </span>
        </div>
        <Link
          to={"/boost"}
          className="flex items-center space-x-2 text-sm font-bold"
        >
          <span className="text-xs font-bold">Boost</span>

          <img
            src="/images/boost.png"
            alt="boost"
            className="object-contain w-8 h-8"
          />
        </Link>
      </div>
    </div>
  );
}
export default  UserTap