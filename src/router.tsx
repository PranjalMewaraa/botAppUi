import { createBrowserRouter } from "react-router-dom";

import Game from "./Game";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Game/>,
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

export default router;
