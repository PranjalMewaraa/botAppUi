import { createBrowserRouter } from "react-router-dom";

import Game from "./Game";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Game/>,
  },
]);

export default router;
