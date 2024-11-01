import TelegramIcon from "../icons/TelegramIcon";
// import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import TikTokIcon from "../icons/TikTokIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";
import { useUserStore } from "@/store/user-store";
import encrypt from "@/utils/encrypt";
const socialLinks = [
  {
    title: "Telegram",
    url: "https://t.me/goattapper",
    icon: TelegramIcon,
  },
  {
    title: "Youtube",
    url: "https://www.youtube.com/@GoatTapper",
    icon: YoutubeIcon,
  },
  {
    title: "TikTok",
    url: "https://www.tiktok.com/@thegoattapper",
    icon: TikTokIcon,
  },
  
  {
    title: "InstagramIcon",
    url: "https://www.instagram.com/goattapper/",
    icon: InstagramIcon,
  },
  {
    title: "X",
    url: "https://x.com/TapperGoat",
    icon: TwitterIcon,
  },
];



export default function SplashScreen() {
  const user = useUserStore();
  localStorage.setItem("alkine-db-val-er",encrypt(user.balance)); 
  return (
    <div
      id="main_div2"
      className="relative flex flex-col items-center text-white justify-between pt-16 bg-cover bg-center w-full max-w-lg h-[--tg-viewport-height] mx-auto"
    > 
     
      <div className="flex flex-col items-center w-full absolute bottom-0">
        <div className="bottom-0 flex flex-col items-center w-full pb-6 bg-[url('/images/blur.png')] bg-cover bg-center">
          <h1 className="text-6xl font-medium text-center uppercase text-shadow">
          Goat Tapper
          </h1>
          <p className="mt-3 text-sm font-bold uppercase text-primary">
            Stay tuned for House Drop
          </p>
          <p className="mt-1 font-medium">More info in official channels</p>
          <div className="flex items-center gap-4 mt-6">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-12 h-12 border-2 rounded-full text-primary border-primary/10 bg-white/5"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
