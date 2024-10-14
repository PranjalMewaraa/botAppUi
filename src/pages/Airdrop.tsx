

import levelConfig from "@/config/level-config";
import { useUserStore } from "@/store/user-store";

export default function Airdrop() {

 

  const user = useUserStore();


  // useEffect(() => {
  //   if (tonAddress) {
  //     $http.post("/clicker/set-ton-wallet", { ton_wallet: tonAddress });
  //   }
  // }, [tonAddress]);

  return (
    <div className="flex flex-col justify-end bg-cover flex-1" style={{backgroundImage: `url(${levelConfig.bg[user?.level?.level || 1]})`,}}>
      <div className="flex flex-col flex-1 w-full h-full px-6 py-8 pb-24 mt-12 modal-body">
        <img
          src="/images/airdrop.png"
          alt="toncoin"
          className="object-contain w-32 h-32 mx-auto"
        />
        <h1 className="mt-4 text-2xl font-bold text-center uppercase">
          Airdrop
        </h1>
        <p className="text-center p-10">Thank you for playing, stay tuned for new Updates</p>
        

      
      </div>
    
    </div>
  );
}


