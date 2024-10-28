// import { useState } from "react";

import Drawer, { DrawerProps } from "./ui/drawer";
import Price from "./Price";
import { useState } from "react";
import { compactNumber } from "@/lib/utils";

type data = {
    name:string,
    img:string,
    price:number,
}

export default function MissionDrawer3({
    data,
  ...props
}: DrawerProps & {
    data: data | null | undefined;
  }) {
 
  const [units,setUnits]=useState<number>(1);
  const price = data?.price;
  
  return (
    <Drawer {...props}>
      <img
        src={data?.img}
        alt={""}
        className="object-contain h-32 mx-auto"
      />
      <h2 className="mt-6 text-2xl font-medium text-center">{data?.name}</h2>
      <div className="p-2 w-full h-fit flex justify-center gap-4 text-white font-[ageobold]">
          <p>Select Quantity: </p>
          <QuantityAdjust quantity={units} setQuantity={setUnits}/>
      </div>
      <div className="w-full flex justify-between p-2">
       <div className="flex gap-4 items-center mx-auto mt-6 w-fit">
        <p className="text-xs text-center">Bonus / hour</p>
        <Price
          amount={"+" + "100"}
          className="justify-center text-sm text-white"
        />
       </div>
       <div className="flex items-center justify-center mx-auto mt-6 space-x-1 text-white">
        
        <span className="font-bold w-24 text-end">
          {`$ ${compactNumber( price*units)}`}
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
      <button className="w-full py-2 bg-yellow-500">Purchase Now</button>
    </Drawer>
  );
}
interface QuantityAdjustProps {
  quantity: number;
  setQuantity:(num:number)=>void;
}
const QuantityAdjust: React.FC<QuantityAdjustProps> = ({quantity,setQuantity})=>{

  const handleAdd = ()=>{
    if(quantity>99) return;
    setQuantity(quantity+1);
  }
  
  const handleMinus = ()=>{
    if(quantity<=1) return;
    setQuantity(quantity-1);
  }
  return (
    <div className="flex gap-4">
      <button className="w-6 h-6 flex justify-center items-center rounded-md bg-yellow-500" onClick={handleMinus}>-</button>
      <div className="w-6 h-6 flex justify-center items-center">{quantity}</div>
      <button className="w-6 h-6 rounded-md bg-yellow-500 flex justify-center items-center" onClick={handleAdd}>+</button>
    </div>
  )
}