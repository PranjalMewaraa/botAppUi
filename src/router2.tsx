import { createBrowserRouter } from "react-router-dom";

import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";
import GameDesktop from "./GameDesktop";
import RockPaperScissors from "./Page/MiniGames/RockPaperScissor";
import MineGame from "./Page/MiniGames/MineGame";
import ComingSoon from "./components/ui/ComingSoon";


const router2 = createBrowserRouter([
  {
    path: "/",
    element: <GameDesktop/>,
  },
  {
    path: "/desktop",
    element: <GameDesktop/>,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
  {
    path: "/wallet",
    element: <Wallet/>,
  },
  {
    path: "/game/rps",
    element:<RockPaperScissors/>
  },
  {
    path: "/game/mine",
    element:<MineGame/>
  },
  {
    path: "/soon",
    element:<ComingSoon/>
  },
  
]);

export default router2;
