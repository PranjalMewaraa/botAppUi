import { Link, useLocation } from "react-router-dom";


const links = [
  { name: "Explore", link: "/", image: '/images/mansion.png' },
  { name: "Mining", link: "/missions", image: '/images/pickaxe.png' },
  { name: "Airdrop", link: "/airdrop", image: '/images/ico.png' },
  { name: "Friends", link: "/friends", image: '/images/joystick.png' },
  { name: "Bounty", link: "/earn", image: '/images/diamond.png' },

];

export default function AppBar() {
  const { pathname } = useLocation();

  return (
    <div
      className="absolute bottom-0 flex z-50 items-center justify-evenly w-full rounded-t-xl shadow-md p-2 border-r-2 border-b-2 border-l-2 border-t-1 border-yellow-500"
      style={{
        background: "linear-gradient(to right, #2D3748, #1A202C)",
      }}
    >
      <div className="relative w-full h-full flex justify-between">
        {links.map((data, index) => (
          <Link
            to={data.link}
            key={index}
            className={`flex ${
              pathname === data.link && "text-yellow-500"
            } flex-col items-center justify-center w-10 h-10 bg-transparent rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-600 `}
          >
            {data.name === "Explore" && (
              <img src={links[0].image} className="w-6 h-6 p-1" alt="Home" />
            )}
            {data.name === "Friends" && (
              <img src={links[1].image} className="w-6 h-6 p-1" alt="Games" />
            )}
            {data.name === "Airdrop" && (
              <img
                src={links[2].image}
                className="w-10 h-10 p-1 -translate-y-5 scale-150"
                alt="Airdrop"
              />
            )}
            {data.name === "Mining" && (
              <img src={links[3].image} className="w-6 h-6 p-1" alt="Mine" />
            )}
            {data.name === "Bounty" && (
              <img src={links[4].image} className="w-6 h-6 p-1" alt="Earn" />
            )}

            <span
              className={`${
                data.name === "Airdrop" ? "text-lg -translate-y-2" : "text-xs"
              }`}
            >
              {data.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
