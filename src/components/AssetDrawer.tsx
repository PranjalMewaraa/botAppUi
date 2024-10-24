// import { useState } from "react";

import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";

export default function MissionDrawer({
  ...props
}: DrawerProps) {
 
  return (
    <Drawer {...props}>
      <img
        src={"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"}
        alt={""}
        className="object-contain h-32 mx-auto"
      />
      <h2 className="mt-6 text-2xl font-medium text-center">{"Property Info"}</h2>
      <div className="w-full flex justify-between p-2">
       <div className="flex flex-col mx-auto mt-4 w-fit">
        <p className="text-xs text-center">Bonus per hour</p>
        <Price
          amount={"+" + "100"}
          className="justify-center mt-2 text-sm text-white"
        />
       </div>
       <div className="flex items-center justify-center mx-auto mt-6 space-x-1 text-white">
        <img
          src="/images/coin.png"
          alt="coin"
          className="object-contain w-8 h-8"
        />
        <span className="font-bold">
          {"1000"}
        </span>
      </div>
      </div>
     

     
      {/* <Button
        className="w-full mt-6"
        disabled={upgradeMution.isPending || insufficientBalance}
        onClick={() => upgradeMution.mutate()}
      >
        {upgradeMution.isPending && (
          <Loader2Icon className="w-6 h-6 mr-2 animate-spin" />
        )}
        {insufficientBalance ? "Insufficient Balance" : "Go ahead"}
      </Button> */}
      <button>Purchase Now</button>
    </Drawer>
  );
}
