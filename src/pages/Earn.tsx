import { ReferralTaskType, TaskType } from "@/types/TaskType";
import { useMemo, useState } from "react";
import TaskDrawer from "@/components/TaskDrawer";
import ListItem from "@/components/ListItem";
import Price from "@/components/Price";

import CheckIcon from "@/components/icons/CheckIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { $http } from "@/lib/http";
import { cn, compactNumber } from "@/lib/utils";
import { uesStore } from "@/store";
import LoadingPage from "@/components/LoadingPage";
import ReferralTaskDrawer from "@/components/ReferralTaskDrawer";
import BottomDrawer from "@/components/v1/Drawer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DailyTaskType } from "@/types/TaskType";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/user-store";
import { Loader2Icon } from "lucide-react";


export default function Earn() {
  const { totalDailyRewards } = uesStore();
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [isDailyDrawerOpen, setIsDailyDrawerOpen] = useState(false);
  const [isReferralTaskDrawerOpen, setIsReferralTaskDrawerOpen] =
    useState(false);
    
  const [activeReferralTask, setActiveReferralTask] =
    useState<ReferralTaskType | null>(null);
    const navigate = useNavigate();
    const dailyTasks = useQuery({
      queryKey: ["daily-tasks"],
      queryFn: () => $http.$get<DailyTaskType[]>("/clicker/daily-tasks"),
      staleTime: Infinity,
    });
  
    const claimTaskMutation = useMutation({
      mutationFn: () =>
        $http.post<{ message: string; balance: number }>(
          `/clicker/claim-daily-task`
        ),
      onSuccess: (response) => {
        toast.success(response.data.message);
        dailyTasks.refetch();
        useUserStore.setState({
          balance: response.data.balance,
        });
        navigate("/");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });  
  
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
    <div className="flex flex-col justify-end bg-cover flex-1 text-white">
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
        <img
          src="/images/coins.png"
          alt="coins"
          className="object-contain w-32 h-32 mx-auto"
        />
        <h1 className="mt-4 text-2xl font-bold text-center text-white uppercase">
          EARN MORE COINS
        </h1>
        {videoTasks.length > 0 && (
          <>
            <p className="mt-2.5 font-medium text-center">Goat Tapper YouTube</p>
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
                    setActiveTask(item);
                    setIsTaskDrawerOpen(true);
                  }}
                  action={
                    item.is_rewarded ? (
                      <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                    ) : undefined
                  }
                  disabled={item.is_rewarded}
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
        {otherTasks.length > 0 && (
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
                  className={cn(
                    "disabled:opacity-50 disabled:mix-blend-luminosity"
                  )}
                  disabled={item.is_rewarded}
                  action={
                    item.is_rewarded ? (
                      <CheckIcon className="w-6 h-6 text-[#27D46C]" />
                    ) : undefined
                  }
                  onClick={() => {
                    setActiveTask(item);
                    setIsTaskDrawerOpen(true);
                  }}
                />
              ))}
            </div>
          </>
        )}
        {referralTasks.data && referralTasks.data?.length > 0 && (
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
      <BottomDrawer
        isOpen={isDailyDrawerOpen}
        onClose={()=>setIsDailyDrawerOpen(!isDailyDrawerOpen)}
      >
         <div>
      <img src="/images/coins.png" alt="coins" className="mx-auto h-28" />
      <h2 className="mt-1 text-2xl font-bold text-center">Daily Reward</h2>
      <p className="mt-2.5 text-center font-medium">
        Acquire coins for logging into the game daily without skipping
      </p>
      <div className="grid grid-cols-4 gap-3 mt-10 overflow-y-auto max-h-64">
        {dailyTasks.data?.map((item, key) => (
          <div
            key={key}
            className={cn(
              "flex flex-col border-2 border-transparent items-center bg-white/10 rounded-xl opacity-90 py-2.5 px-4",
              item.completed && "opacity-100 border-[#27D46C] bg-[#27D46C]/20",
              item.available && !item.completed && "opacity-100 border-primary"
            )}
          >
            <p className="text-sm font-medium">{item.name}</p>
            <img
              src="/images/coin.png"
              alt="coin"
              className="object-contain w-5 h-5"
            />
            <p
              className={cn(
                "font-bold text-primary",
                item.completed && "text-[#27D46C]"
              )}
            >
              {compactNumber(item.reward_coins)}
            </p>
          </div>
        ))}
      </div>
      <Button
        className="w-full mt-6"
        disabled={
          !dailyTasks.data?.some((item) => item.available && !item.completed) ||
          claimTaskMutation.isPending ||
          dailyTasks.isLoading
        }
        onClick={() => claimTaskMutation.mutate()}
      >
        {claimTaskMutation.isPending && (
          <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
        )}
        Claim
      </Button>
      </div>
      </BottomDrawer>
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
    </div>
  );
}
