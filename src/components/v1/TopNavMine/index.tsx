

interface TopNavProps {
  active: string;
  handleClick: (tab: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ active, handleClick }) => {
  return (
    <div className="h-16 w-full p-2 mt-4 flex bg-slate-800 rounded-xl gap-2">
      <div
        className={`h-full w-1/3 text-white font-semibold flex justify-center items-center cursor-pointer ${
          active === "Fun" ? "bg-slate-700 rounded-lg" : ""
        }`}
        onClick={() => handleClick("Fun")}
      >
        Fun
      </div>
      <div
        className={`h-full w-1/3 text-white font-semibold flex justify-center items-center cursor-pointer ${
          active === "NFT" ? "bg-slate-700 rounded-lg" : ""
        }`}
        onClick={() => handleClick("NFT")}
      >
        NFT
      </div>
      <div
        className={`h-full w-1/3 text-white font-semibold flex justify-center items-center cursor-pointer ${
          active === "Asset Tokenize" ? "bg-slate-700 rounded-lg" : ""
        }`}
        onClick={() => handleClick("Asset Tokenize")}
      >
        Asset Tokenize
      </div>
    </div>
  );
};

export default TopNav;
