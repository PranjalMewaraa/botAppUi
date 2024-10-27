import { createBrowserRouter } from "react-router-dom";
import GameDesktop from "./GameDesktop";
import RockPaperScissors from "./Page/MiniGames/RockPaperScissor";
import MineGame from "./Page/MiniGames/MineGame";
import SlotMachineGamePage from "./Page/MiniGames/SlotMachineUpdated";


const router2 = createBrowserRouter([
  {
    path: "/",
    element: <GameDesktop/>,
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

export default router2;
