import { useEffect, useState } from "react";

function useSkinConfig() {
  const [skinId, setSkinId] = useState<number>(() => {
    // Initialize from local storage if available, otherwise default to 1
    const storedSkinId = localStorage.getItem("skinId");
    return storedSkinId ? parseInt(storedSkinId, 10) : 1;
  });

  // Update local storage whenever skinId changes
  useEffect(() => {
    localStorage.setItem("skinId", skinId.toString());
  }, [skinId]);

  // Function to update skinId
  const updateSkinId = (newSkinId: number) => {
    console.log("newSkinId",newSkinId)
    setSkinId(newSkinId);
  };

  // Function to fetch the current skinId
  const getSkinId = () => {
    return skinId;
  };

  return { skinId, updateSkinId, getSkinId };
}

export default useSkinConfig;
