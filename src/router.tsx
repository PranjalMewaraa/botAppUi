import { createBrowserRouter } from "react-router-dom";

import Game from "./Game";
import RockPaperScissors from "./Page/MiniGames/RockPaperScissor";
import MineGame from "./Page/MiniGames/MineGame";
import SlotMachineGamePage from "./Page/MiniGames/SlotMachineUpdated";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Game/>,
  },
  {
    path: "/game/rps",
    element:<RockPaperScissors/>
  }
  ,{
    path: "/game/mine",
    element:<MineGame/>
  },
  {
    path: "/game/slot",
    element:<SlotMachineGamePage/>
  },
  
  
]);

export default router;
