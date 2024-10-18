import { createBrowserRouter } from "react-router-dom";

import Game from "./Game";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";
import GameDesktop from "./GameDesktop";


const router2 = createBrowserRouter([
  {
    path: "/",
    element: <Game/>,
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
]);

export default router2;
