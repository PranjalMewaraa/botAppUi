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
    <div id="main_div" className="w-screen h-fit overflow-hidden">
    <div className="flex flex-col justify-end bg-cover flex-1 text-white">
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
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
                style={{ backgroundImage: `url('${levelConfig.bg[item.level]}')` }}
              >
                <img
                  src={levelConfig.frogs[item.level]}
                  alt="level image"
                  className="object-contain mx-auto w-60 h-60"
                  style={{ filter: levelConfig.filter[item.level] }}
                />
                <p className="mt-4 text-lg text-center text-white">{item.name}</p>
                <p className="text-sm text-center text-white/70">From {compactNumber(item.from_balance)}</p>
              </div>
            </SwiperSlide>
          ))}
          <button className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 text-white custom-swiper-button-prev">
            <SwapPrevIcon />
          </button>
          <button className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 text-white custom-swiper-button-next">
            <SwapNextIcon />
          </button>
        </Swiper>
        
        {/* Remaining UI Elements for User Scores */}
        <div className="flex-1 mt-6">
          <div className="absolute w-full h-full divide-y divide-[#D9D9D9]/10 overflow-y-auto">
            {leaderboard.isLoading ? (
              <div className="flex items-center justify-center h-full text-white">
                <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
                <span className="ml-2">Loading...</span>
              </div>
            ) : leaderboard.data && leaderboard.data.length > 0 ? (
              leaderboard.data.map((item, key) => (
                <div key={key} className="flex items-center py-2 gap-2.5 px-4">
                  <span className="w-6 text-left text-primary">{key + 1}</span>
                  <span>
                    {item.first_name} {item.last_name}
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <img src="/images/coin.png" alt="coin" className="object-contain w-5 h-5" />
                    <span>{compactNumber(item.production_per_hour)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <span className="text-lg">No data available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
