import { createBrowserRouter } from "react-router-dom";

import Game from "./Game";
import Leaderboard from "./pages/Leaderboard";


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
    element: <Leaderboard/>,
  },
  {
    path: "/wallet",
    element: <Leaderboard/>,
  },
]);

export default router;
