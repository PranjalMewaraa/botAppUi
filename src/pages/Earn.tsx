import { ReferralTaskType, TaskType } from "@/types/TaskType";
import { useMemo, useState } from "react";
import TaskDrawer from "@/components/TaskDrawer";
import ListItem from "@/components/ListItem";
import Price from "@/components/Price";
import DailyDrawer from "@/components/DailyDrawer";
import CheckIcon from "@/components/icons/CheckIcon";
import { useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { cn } from "@/lib/utils";
import { uesStore } from "@/store";
import LoadingPage from "@/components/LoadingPage";
import ReferralTaskDrawer from "@/components/ReferralTaskDrawer";
import RefferalAdditionalDrawer from "@/components/RefferalAdditionalDrawer";
import AdditionalTaskDrawer from "@/components/AdditionalTaskDrawer";
import { useNavBar } from "@/utils/useNavBar";

export default function Earn() {
  const { activeIndex, setActiveIndex } = useNavBar();
  console.log(activeIndex);
  const { totalDailyRewards } = uesStore();
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isAdditionalTaskDrawerOpen, setIsAdditionalTaskDrawerOpen] =
    useState(false);
  const [isDailyDrawerOpen, setIsDailyDrawerOpen] = useState(false);
  const [isReferralTaskDrawerOpen, setIsReferralTaskDrawerOpen] =
    useState(false);
  const [isRefferalAdditionalDrawer, setIsRefferalAdditionalDrawer] =
    useState(false);
  const [activeReferralTask, setActiveReferralTask] =
    useState<ReferralTaskType | null>(null);


  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => $http.$get<TaskType[]>("/clicker/tasks"),
  });

  const referralTasks = useQuery({
    queryKey: ["referral-tasks"],
    queryFn: () => $http.$get<ReferralTaskType[]>("/clicker/referral-tasks"),
  });

  const videoTasks = useMemo(
    () => data?.filter((task) => task.type === "video") || [],
    [data]
  );

  const otherTasks = useMemo(
    () => data?.filter((task) => task.type === "other") || [],
    [data]
  );

  if (isLoading) return <LoadingPage />;
  
 

  return (
    <div className='w-screen h-[90%] overflow-x-hidden overflow-y-scroll'>
    <div
      className="flex overflow-x-hidden overflow-y-scroll flex-col justify-end bg-cover flex-1 text-white"
    >
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 ">
        <img
          src="/images/coin.png"
          alt="coins"
          className="object-contain w-32 h-32 mx-auto"
        />
        <h1 className="mt-4 text-2xl font-bold text-center uppercase">
          EARN MORE COINS
        </h1>
        <p className="mt-2.5 font-medium text-center p-2">Invite friends</p>
        <ListItem
          title={"Friends"}
          image={"/images/friends.png"}
          onClick={() => {
           setActiveIndex(7)
          }}
        />
        {videoTasks && videoTasks.length > 0 && (
          <>
            <p className="mt-2.5 font-medium text-center">
              Goat Tapper YouTube
            </p>
            <div className="mt-4 space-y-2">
              {videoTasks.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.name}
                  subtitle={
                    <Price amount={`+${item.reward_coins.toLocaleString()}`} />
                  }
                  image={item.image || "/images/youtube.png"}
                  onClick={() => {
                    if (item.is_rewarded) {
                      setActiveTask(item);
                      setIsAdditionalTaskDrawerOpen(true);
                    } else {
                      setActiveTask(item);
                      setIsTaskDrawerOpen(true);
                    }
                  }}
                  action={
                    item.is_rewarded ? (
                      <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                    ) : undefined
                  }
                  // disabled={item.is_rewarded}
                />
              ))}
            </div>
          </>
        )}
        <p className="mt-8 font-medium text-center">Daily Tasks</p>
        <div className="mt-4 space-y-2">
          <ListItem
            title={"Daily reward"}
            subtitle={
              <Price
                amount={`+${Number(totalDailyRewards).toLocaleString()}`}
              />
            }
            image="/images/daily-task.png"
            onClick={() => setIsDailyDrawerOpen(true)}
          />
        </div>
        {otherTasks && otherTasks.length > 0 && (
          <>
            <p className="mt-8 font-medium text-center">All Tasks</p>
            <div className="mt-4 space-y-2">
              {otherTasks.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.name}
                  subtitle={
                    <Price amount={`+${item.reward_coins.toLocaleString()}`} />
                  }
                  image={item.image || "/images/bounty.png"}
                  action={
                    item.is_rewarded ? (
                      <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                    ) : undefined
                  }
                  onClick={() => {
                    // setActiveTask(item)
                    if (item?.is_rewarded) {
                      setActiveTask(item);
                      setIsAdditionalTaskDrawerOpen(true);
                    } else {
                      setActiveTask(item);
                      setIsTaskDrawerOpen(true);
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
        {referralTasks &&
          referralTasks.data &&
          referralTasks.data?.length > 0 && (
            <>
              <p className="mt-8 font-medium text-center">Referral Tasks</p>
              <div className="mt-4 space-y-2">
                {referralTasks.data.map((item) => (
                  <ListItem
                    key={item.id}
                    title={item.title}
                    subtitle={
                      <Price amount={`+${item.reward.toLocaleString()}`} />
                    }
                    image={"/images/bounty.png"}
                    className={cn(
                      "disabled:opacity-50 disabled:mix-blend-luminosity"
                    )}
                    disabled={!!item.is_completed}
                    action={
                      item.is_completed ? (
                        <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                      ) : undefined
                    }
                    onClick={() => {
                      setActiveReferralTask(item);
                      setIsReferralTaskDrawerOpen(true);
                    }}
                  />
                ))}
              </div>
            </>
          )}
      </div>
      <DailyDrawer
        open={isDailyDrawerOpen}
        onOpenChange={setIsDailyDrawerOpen}
      />
      <TaskDrawer
        task={activeTask}
        open={isTaskDrawerOpen}
        onOpenChange={setIsTaskDrawerOpen}
      />
      <AdditionalTaskDrawer
        task={activeTask}
        open={isAdditionalTaskDrawerOpen}
        onOpenChange={setIsAdditionalTaskDrawerOpen}
      />
      <TaskDrawer
        task={activeTask}
        open={isTaskDrawerOpen}
        onOpenChange={setIsTaskDrawerOpen}
      />
      <ReferralTaskDrawer
        task={activeReferralTask}
        open={isReferralTaskDrawerOpen}
        onOpenChange={setIsReferralTaskDrawerOpen}
      />
      <RefferalAdditionalDrawer
        task={activeReferralTask}
        open={isRefferalAdditionalDrawer}
        onOpenChange={setIsRefferalAdditionalDrawer}
      />
    </div>
    </div>
  );
}
