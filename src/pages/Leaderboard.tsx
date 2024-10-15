import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper/modules";
import SwapPrevIcon from "@/components/icons/SwapPrevIcon";
import SwapNextIcon from "@/components/icons/SwapNextIcon";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { compactNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { UserType } from "@/types/UserType";
import levelConfig from "@/config/level-config";
import { uesStore } from "@/store";
import { Loader2Icon } from "lucide-react";

export default function Leaderboard() {
  const { balance, level, ...user } = useUserStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const store = uesStore();
  const swiperRef = useRef<SwiperRef | null>(null);

  console.log(store.levels)
  const leaderboard = useQuery({
    queryKey: ["leaderboard", store.levels?.[activeIndex]?.id],
    queryFn: () => {
      const levelId = store.levels?.[activeIndex]?.id;
      console.log("Fetching leaderboard for level_id:", levelId);
      
      if (!levelId) {
        return Promise.reject(new Error("Level ID is undefined"));
      }
  
      const url = `/clicker/leaderboard`;
      console.log("Fetching leaderboard at URL:", `${$http.defaults.baseURL}${url}?level_id=${levelId}`);
  
      return $http.$get<UserType[]>(url, {
        params: { level_id: levelId },
      });
    },
    staleTime: Infinity,
    enabled: !!store.levels?.[activeIndex]?.id,
  });
  

  useEffect(() => {
    if (level?.level) {
      const index = store.levels?.findIndex((item) => item.level === level.level);
      if (index !== -1) {
        setActiveIndex(index);
        if (swiperRef.current) swiperRef.current.swiper.slideTo(index);
      }
    }
  }, []);
  console.log(leaderboard.data)
  return (
    <div id="main_div" className="w-screen h-screen bg-slate-950 overflow-hidden">
    <div className="flex flex-col justify-end bg-cover w-full h-full text-white" >
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
        <div className="">
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            modules={[EffectFade, Navigation]}
            effect={"fade"}
            className="rounded-xl"
            navigation={{
              enabled: true,
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {store.levels?.map((item, i) => (
              <SwiperSlide key={`slide-${i}`}>
                <div
                  className="py-4 bg-center bg-cover rounded-xl"
                  style={{
                    backgroundImage: `url('${levelConfig.bg[item.level]}')`,
                  }}
                >
                  <img
                    src={levelConfig.frogs[item.level]}
                    alt="level image"
                    className="object-contain mx-auto w-60 h-60"
                    style={{
                      filter: levelConfig.filter[item.level],
                    }}
                  />
                  <p className="mt-4 text-lg text-center text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-center text-white/70">
                    From {compactNumber(item.from_balance)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
            <button className="absolute z-[999] left-2.5 flex items-center justify-center text-white custom-swiper-button-prev top-1/2 -translate-y-1/2 disabled:opacity-30">
              <SwapPrevIcon />
            </button>
            <button className="absolute z-[999] right-2.5 flex items-center justify-center text-white custom-swiper-button-next top-1/2 -translate-y-1/2 disabled:opacity-30">
              <SwapNextIcon />
            </button>
          </Swiper>
        </div>
        {store.levels?.[activeIndex] &&
          store.levels?.[activeIndex]?.level === level?.level && (
            <div className="mt-2">
              <div className="flex items-center justify-between gap-2 text-white">
                <div className="flex items-center text-2xl font-bold">
                  <span>{level.name}</span>
                </div>
                <span className="font-medium">
                  {compactNumber(balance)}/{compactNumber(level!.to_balance)}
                </span>
              </div>
              <div className="bg-[#FFDAA3]/10 border overflow-hidden border-[#FFDAA3]/10 rounded-full mt-2 h-4 w-full">
                <div
                  className="bg-[linear-gradient(180deg,#FBEDE0_0%,#F7B87D_21%,#F3A155_52%,#E6824B_84%,#D36224_100%)] h-full"
                  style={{
                    width: `${(balance / level.to_balance) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        <div className=" flex-1 mt-6">
          <div className="absolute w-full h-48 divide-y divide-[#D9D9D9]/10 overflow-y-auto">
            {leaderboard.isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : leaderboard.data && leaderboard.data?.length > 0 ? (
              leaderboard.data.map((item, key) => (
                <div key={key} className="flex items-center py-2 gap-2.5 w-11/12 px-4 mb-1 bg-slate-800 rounded-md shadow-md">
                  <span className="w-6 text-left text-primary">{key + 1}</span>
                  <span className="text-gray-100 font-medium">
                    {item.first_name} {item.last_name}
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <img
                      src="/images/coin.png"
                      alt="coin"
                      className="object-contain w-5 h-5"
                    />
                    <span className="text-gray-200">{compactNumber(item.production_per_hour)}</span>
                  </div>
                </div>

              ))
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                No data
              </div>
            )}
          </div>
        </div>
        {store.levels &&
          store.levels[activeIndex]?.level === level?.level &&
          !leaderboard.data?.some((item) => item.id === user.id) && (
            <div className="mt-2 flex items-center py-2 gap-2.5 px-4 bg-[#FFAB5D1A] rounded-xl">
              <span className="w-6 text-right text-primary">+99</span>
              <span>You</span>
              <div className="flex items-center gap-2 ml-auto">
                <img
                  src="/images/coin.png"
                  alt="coin"
                  className="object-contain w-5 h-5"
                />
                <span>{balance}</span>
              </div>
            </div>
          )}
      </div>
    </div>
    </div>
  );
}
