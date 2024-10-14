import UserTap from "../components/UserTap";
import { useUserStore } from "../store/user-store";
import { Link } from "react-router-dom";
import UserGameDetails from "@/components/UserGameDetails";
// import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";
import {  useState } from "react";


export default function Home() {
  const user = useUserStore();
  const { maxLevel } = uesStore();
  const [loading, setLoading] = useState(true);

  const update = (val: boolean) => {
    console.log("vall", val);
    setLoading(val)
  };

  
  return (
    <div
      className="flex-1 px-5 pb-20 bg-center bg-cover"
      style={{
        // backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,
        // backgroundImage: 'url(./images/levels/bg.png)',
        // backgroundImage: 'rgba(url(./images/levels/bg.png),0.5)',
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(./images/levels/bg.png)",

        backgroundSize: "cover",
      }}
    >
      <div className={loading ? "d-none hidden" : ""}>
        <header className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 px-3 py-2 border-2 rounded-full bg-black/20 border-white/10">
            <img
              src="/images/avatar.png"
              alt="user-avatar"
              className="object-cover w-6 h-6 rounded-full"
            />
            <p className="text-[12px] font-medium uppercase">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
          <div>
            <Link
              to={"/setting"}
              className="relative flex items-center rounded-xl flex-col justify-center font-bold text-xs px-1.5 py-1.5 gap-1 select-none flex-1 text-white"
            >
              <img
                src="/images/gear.png"
                alt="settings"
                className="w-7 h-7 object-contain filter grayscale"
              />
            </Link>
          </div>
        </header>
        <UserGameDetails className="mt-2" />
        <UserTap
          updateLoading={(bool: boolean) => {
            update(bool);
          }}
        /> 

        <div className="flex  space-x-1.5 justify-center items-center select-none">
          <img
            src="/images/coins.png"
            alt="coins"
            className="object-contain w-20 h-20"
          />
          <span className="text-2xl font-bold text-gradient">
            {Math.floor(user.balance)?.toLocaleString()}
          </span>
        </div>

        <div className="">
          <Link
            to={"/leaderboard"}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center text-xs">
              <span>{user.level?.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs">Level</span>
              <span className="font-bold">
                {user.level?.level}/{maxLevel}
              </span>
            </div>
          </Link>
          <div className="bg-[#FFDAA3]/10 border overflow-hidden border-[#FFDAA3]/10 rounded-full mt-2 h-4 w-full">
            <div
              className="bg-[linear-gradient(180deg,#FBEDE0_0%,#F7B87D_21%,#F3A155_52%,#E6824B_84%,#D36224_100%)] h-full"
              style={{
                width: `${(user.balance! / user.level!.to_balance) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
