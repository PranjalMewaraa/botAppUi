import MissionDrawer from "@/components/MissionDrawer";
import Price from "@/components/Price";
import UserGameDetails from "@/components/UserGameDetails";
import { $http } from "@/lib/http";
import { cn, compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import { useUserStore } from "@/store/user-store";
import { Mission } from "@/types/MissionType";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import levelConfig from "@/config/level-config";

// Define the type for the MissionCard props
interface MissionCardProps {
  mission: Mission;
  userLevel: number;
  totalReferrals: number;
  onClick: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, userLevel, totalReferrals, onClick }) => {
  const isDisabled = (mission.required_user_level && mission.required_user_level > userLevel) ||
                     (mission.required_friends_invitation && mission.required_friends_invitation > totalReferrals);

  return (
    <div
      className={cn(
        "flex flex-col py-3 px-4 bg-[#D9D9D9]/10 rounded-lg cursor-pointer",
        {
          "opacity-40 cursor-not-allowed": isDisabled,
        }
      )}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className="flex items-start">
        <img src={mission.image} alt={mission.name} className="object-contain w-16 h-16" />
        <div className="flex flex-col ml-3">
          <p className="text-base font-bold">{mission.name}</p>
          <p className="mt-1 text-sm font-medium">Bonus per hour</p>
          <Price
            amount={
              mission.production_per_hour || `+${mission.next_level?.production_per_hour || 0}`
            }
            className="mt-2 text-sm"
          />
        </div>
      </div>
      {mission.next_level && (
        <div className="pt-3 mt-3 border-t border-dashed border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">LVL {mission.next_level?.level}</p>
            {mission.required_user_level && mission.required_user_level > userLevel ? (
              <div className="flex items-center gap-2 text-sm">
                <img src="/images/lock.png" alt="lock" className="w-5 h-5" />
                <span>Mission required lvl {mission.required_user_level}</span>
              </div>
            ) : mission.required_friends_invitation && mission.required_friends_invitation > totalReferrals ? (
              <div className="flex items-center gap-2 text-sm">
                <img src="/images/lock.png" alt="lock" className="w-5 h-5" />
                <span>Mission required friends {mission.required_friends_invitation} invited</span>
              </div>
            ) : (
              mission.next_level?.cost && (
                <Price amount={compactNumber(mission.next_level?.cost)} className="text-sm" />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Missions() {
  const user = useUserStore();
  const { missionTypes, totalReferals } = uesStore();
  const [activeType, setActiveType] = useState(missionTypes?.[0]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const missions = useQuery({
    queryKey: ["/clicker/missions", activeType?.id],
    queryFn: () =>
      $http.$get<Mission[]>(`/clicker/missions`, {
        params: { type: activeType?.id },
      }),
    staleTime: 1000 * 60,
    enabled: !!activeType?.id,
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 text-white bg-cover" 
         style={{ backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})` }}>
      <UserGameDetails className="mb-6" />
      <div className="flex items-center justify-center mb-10 space-x-2 text-gradient">
        <img src="/images/coins.png" alt="coins" className="object-contain w-14 h-14" />
        <span className="text-4xl font-bold">
          {Math.floor(user.balance)?.toLocaleString()}
        </span>
      </div>
      <div className="w-full mb-6">
        <div className="flex justify-around">
          {missionTypes.map((type, index) => (
            <button
              key={index}
              className={cn("text-xs font-bold uppercase", {
                "opacity-40": activeType.id !== type.id,
              })}
              onClick={() => setActiveType(type)}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {missions.isLoading ? (
          <div className="flex items-center justify-center col-span-2 mt-6">
            <Loader2Icon className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          missions.data?.map((mission, index) => (
            <MissionCard
              key={index}
              mission={mission}
              userLevel={user.level!.level}
              totalReferrals={totalReferals}
              onClick={() => {
                if (
                  !mission.next_level ||
                  (mission.required_user_level && mission.required_user_level > user.level!.level) ||
                  (mission.required_friends_invitation && mission.required_friends_invitation > totalReferals)
                ) return;

                setSelectedMission(mission);
                setOpenDrawer(true);
              }}
            />
          ))
        )}
      </div>
      <MissionDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        mission={selectedMission}
      />
    </div>
  );
}
