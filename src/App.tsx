import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useRef, useState } from "react";
import SplashScreen from "./components/partials/SplashScreen";
import FirstTimeScreen from "./components/partials/FirstTimeScreen";
import { $http, setBearerToken } from "./lib/http";
import { BoosterType, BoosterTypes, UserType } from "./types/UserType";
import { useUserStore } from "./store/user-store";
import { uesStore } from "./store";
import PlayOnYourMobile from "./pages/PlayOnYourMobile";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import useTelegramInitData from "./hooks/useTelegramInitData";

const webApp = window.Telegram.WebApp;
const isDisktop = import.meta.env.DEV
  ? false
  : Telegram.WebApp.platform === "tdesktop";

function App() {
  const userStore = useUserStore();
  const { levels, levelUp } = uesStore();
  const { user, start_param } = useTelegramInitData();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const balance = useDebounce(userStore.balance, 500);

  useEffect(() => {
    webApp.setHeaderColor("#000");
    webApp.setBackgroundColor("#000");
    webApp.expand();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      useUserStore.setState((state) => {
        state.balance += state.production_per_hour / 3600;
        return state;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userStore.production_per_hour]);

  useEffect(() => {
    if (!balance || !userStore.level?.level) return;
    const userLevel = userStore.level.level;
    const newLevels = levels.filter(
      (level) => balance >= level.from_balance && level.level > userLevel
    );
    const maxLevel = newLevels.reduce(
      (prev, current) => (prev.level > current.level ? prev : current),
      newLevels[0]
    );
    if (
      userStore.level?.level &&
      maxLevel?.level &&
      maxLevel.level > userStore.level.level
    ) {
      useUserStore.setState((state) => {
        state.level = maxLevel;
        state.max_energy += newLevels.length * levelUp.max_energy;
        state.earn_per_tap += newLevels.length * levelUp.earn_per_tap;
        return state;
      });
      toast.success(`You have leveled up to level ${maxLevel.level}`);
    }
  }, [balance, levels]);
  const [timer, setTimer] = useState(new Date());

  const clicksCountRef = useRef(0); // Use a ref to keep track of clicks

  useEffect(() => {
    // Initialize clicks count on component mount
    const current = localStorage.getItem("ClicksCount");
    clicksCountRef.current = current ? parseFloat(current) : 0;

    console.log("Initial count", clicksCountRef.current);
  }, []);
  useEffect(() => {
    const executeEvery30sec = () => {
      console.log("Function executed every 30 sec", new Date());
      setTimer(new Date());
    };

    const intervalId = setInterval(executeEvery30sec, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const sync = async (user: any) => {
    $http
      .post<Record<string, any>>("/clicker/tap", {
        count: clicksCountRef.current,
        energy: user.available_energy,
        timestamp: Math.floor(Date.now() / 1000),
      })
      .then(async ({ data }) => {
        localStorage.setItem("ClicksCount", "0");
        clicksCountRef.current = 0;
        const test = async () => {
          return await $http.$get<
            {
              user: UserType;
              boosters: Record<BoosterTypes, BoosterType>;
            } & Record<string, any>
          >("/clicker/sync");
        };

        // Use the test function
        try {
          const syncData = await test();
          console.log("Sync data", syncData.user.balance);
          useUserStore.setState({
            balance: syncData.user.balance,
          });
        } catch (error) {
          console.error("Failed to fetch sync data", error);
        }

        if (data.leveled_up) {
          useUserStore.setState({
            level: data.level || user.level,
            earn_per_tap: data.earn_per_tap,
            max_energy: data.max_energy,
          });
        }
      })
      .catch(() => {
        console.log("Failed to post data");
        localStorage.setItem("ClicksCount", String(clicksCountRef.current));
      });
  };

  useEffect(() => {
    if (!user) return () => {};

    const signIn = async () => {
      if (localStorage.getItem("token") === null) {
        const { data } = await $http.post<{
          token: string;
          first_login: boolean;
        }>("/auth/telegram-user", {
          telegram_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          username: user.username,
          referred_by: start_param?.replace("ref", ""),
        });
        setBearerToken(data.token);
        setIsFirstLoad(data.first_login);
      }

      const data = await $http.$get<
        {
          user: UserType;
          boosters: Record<BoosterTypes, BoosterType>;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } & Record<string, any>
      >("/clicker/sync");
      const current = localStorage.getItem("ClicksCount");

      if (Number(current) == 0 || current == null) {
        console.log("zzzzzzzzzzzzzzzzzzzzzzz");

        setShowSplashScreen(false);
        useUserStore.setState({
          ...data.user,
        });
      } else {
        data.user &&
          sync(data.user).then(() => {
            console.log("aaaaaaa", data.user);

            useUserStore.setState({
              ...data.user,
              balance: Number(data.user.balance) + Number(current)*data?.user.earn_per_tap,
            });
            setShowSplashScreen(false);
          });
      }
      // useUserStore.setState({
      //   ...data.user,
      // });

      uesStore.setState({
        totalDailyRewards: data.total_daily_rewards,
        boosters: data.boosters,
        dailyResetEnergy: data.daily_booster,
        maxLevel: data.max_level,
        levels: data.levels,
        levelUp: data.level_up,
        referral: data.referral,
        missionTypes: data.mission_types,
        totalReferals: data.total_referals,
      });
    };

    signIn().then(() => {
      const current = localStorage.getItem("ClicksCount");
      if (Number(current) == 0 || current == null) {
        setShowSplashScreen(false);
      }
    });
  }, [user]);

  useEffect(() => {
    // Initialize clicks count on component mount
    const current = localStorage.getItem("ClicksCount");
    clicksCountRef.current = current ? parseFloat(current) : 0;

    console.log("Initial count", clicksCountRef.current);
  }, []);
  useEffect(() => {
    const executeEvery30sec = () => {
      console.log("Function executed every 30 sec", new Date());
      setTimer(new Date());
    };

    const intervalId = setInterval(executeEvery30sec, 3000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (clicksCountRef.current === 0) return;

    const sync = async (user: any) => {
      $http
        .post<Record<string, any>>("/clicker/tap", {
          count: clicksCountRef.current,
          energy: user.available_energy,
          timestamp: Math.floor(Date.now() / 1000),
        })
        .then(async ({ data }) => {
          localStorage.setItem("ClicksCount", "0");
          clicksCountRef.current = 0;
          const test = async () => {
            return await $http.$get<
              {
                user: UserType;
                boosters: Record<BoosterTypes, BoosterType>;
              } & Record<string, any>
            >("/clicker/sync");
          };

          // Use the test function
          try {
            const syncData = await test();
            console.log("Sync data", syncData.user.balance);
            useUserStore.setState({
              balance: syncData.user.balance,
            });
          } catch (error) {
            console.error("Failed to fetch sync data", error);
          }

          if (data.leveled_up) {
            useUserStore.setState({
              level: data.level || user.level,
              earn_per_tap: data.earn_per_tap,
              max_energy: data.max_energy,
            });
          }
        })
        .catch(() => {
          console.log("Failed to post data");
          localStorage.setItem("ClicksCount", String(clicksCountRef.current));
        });
    };
    user && sync(user).then(() => setShowSplashScreen(false));
  }, [timer]);

  if (!user || isDisktop) return <PlayOnYourMobile />;

  if (showSplashScreen) return <SplashScreen />;

  if (isFirstLoad)
    return <FirstTimeScreen startGame={() => setIsFirstLoad(false)} />;

  return <RouterProvider router={router} />;
}

export default App;
