import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./index.css";
import Providers from "./providers.tsx";
import { NavBarProvider } from "./utils/useNavBar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <NavBarProvider>
      <App />
    </NavBarProvider>
  </Providers>
);
