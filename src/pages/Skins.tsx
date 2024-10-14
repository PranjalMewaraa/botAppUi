import levelConfig from "@/config/level-config";
import skinConfig from "@/config/skin-config";
import { useUserStore } from "@/store/user-store";
import useSkinConfig from "../hooks/useSkinConfig";
import { useEffect, useState } from "react";

export default function Skins() {
  const { skinId, updateSkinId } = useSkinConfig();

  console.log("skin", skinId);

  const user = useUserStore();

  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    // When all images are loaded, set loading to false
    if (loadedCount === Object.entries(skinConfig.images).length) {
      setLoading(false);
    }
  }, [loadedCount, Object.entries(skinConfig.images).length]);



  const handleImageLoad = () => {
    setLoadedCount(prevCount => prevCount + 1);
  };

  return (
    <div
      className="flex flex-col justify-end bg-cover flex-1"
      style={{
        backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,
      }}
    >
      {loading && <div className="h-[100vh] w-[100%] text-center flex items-center justify-center  bg-black ">loading</div>}
      
      <div className={loading?"d-none":"flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 bg-black opacity-95"}>
        <div className="flex justify-center items-center">
          <img
            src={skinConfig.images[skinId || 1]}
            alt="level image"
            className="object-contain max-w-full w-[35vh] h-[35vh] "
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-center uppercase py-5">Skins</h1>

        <div className="flex px-10">
          <div className=" grid grid-cols-2 gap-3  w-full">
            {Object.entries(skinConfig.images).map(([key, src]) => {
              const buttonClass = key == String(skinId) ? "border-4 border-white" : "";
              return (
                <button
                  key={key}
                  onClick={() => updateSkinId(Number(key))}
                  className={`grid-cols-2 bg-gray-700 p-5 rounded-2xl ${buttonClass}`}
                >
                  <img className="object-cover" src={src} alt="" onLoad={handleImageLoad} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
