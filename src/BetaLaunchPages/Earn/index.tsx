import { useState } from 'react';
import logo from '../../assets/Images/coins.png';
import second from '../../assets/Images/ico.png';
import copy from '../../assets/Images/copy.png';
import BottomDrawer from '../../components/v1/Drawer';

const Earn: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  return (
    <div className='w-full px-2 py-4 flex items-center h-full'>
      <div id='earn' className='w-full h-4/5 flex flex-col text-white gap-2 pb-8'>
        <h1 className='w-full text-center font-[ageobold] pt-16 text-4xl'>Earn More Coins!</h1>
        <p className='w-full text-center'>Complete exciting tasks and earn coins</p>
        <div className='w-full flex flex-col gap-2 p-4 z-50'>
          <CardElem setOpen={setIsDrawerOpen} isOpen = {isDrawerOpen} name="Invite a Friend" />
          <CardElem setOpen={setIsDrawerOpen} isOpen = {isDrawerOpen} name="Subscribe GoatTapper YT" />
        </div>
        <p className='w-full text-center text-lg font-[ageo]'>Daily Tasks</p>
        <div className='w-full flex flex-col gap-2 p-4 pb-10'>
          <CardElem name="Daily Rewards" setOpen={setIsDrawerOpen} isOpen = {isDrawerOpen}/>
          <CardElem name="Daily Rewards" setOpen={setIsDrawerOpen} isOpen = {isDrawerOpen}/>
          <CardElem name="Daily Rewards" setOpen={setIsDrawerOpen} isOpen = {isDrawerOpen}/>
          <CardElem name="Daily Rewards" setOpen={setIsDrawerOpen} isOpen = {isDrawerOpen}/>
        </div>
        <BottomDrawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
          <h2 className="text-xl font-semibold w-full text-center font-[ageobold]">FRIENDS</h2>
          <p className='text-lg w-full text-center font-[ageo] py-1'>You and your friends will recieve bonuses.</p>
          <div className='w-full p-4 bg-slate-900 flex gap-2 rounded-lg'>
            <img src={logo} alt="" />
            <p>Invite a Friend <br /> Earn 5000 for you and your friend</p>
          </div>
          <div className='w-full p-4 bg-slate-900 flex gap-2 rounded-lg'>
            <img src={logo} alt="" />
            <p>Invite a Friend with Telegram Premium <br /> Earn 25000 for you and your friend</p>
          </div>
          <p className='text-lg w-full text-center font-[ageobold] py-1 mt-4'>List of your Friends (0)</p>
          <div className='w-full p-4 text-sm bg-slate-900 text-slate-600 border-dashed border-slate-600 border rounded-lg'>You did not anyone yet</div>
          <div className='w-full flex gap-2 my-4'>
            <button className='bg-gradient-to-b from-yellow-300 to-yellow-500 p-4 rounded-md font-[ageobold] text-lg'><img src={copy} alt="" /></button>
            <button className=' bg-gradient-to-b from-yellow-300 to-yellow-500 w-full p-4 rounded-md font-[ageobold] text-lg'>Send Invite</button>
          </div>
        </BottomDrawer>
      </div>
    </div>
  );
};

interface CardElemProps {
  setOpen(arg0: boolean): unknown;
  isOpen: boolean;
  name: string;
}

const CardElem: React.FC<CardElemProps> = (props) => {
  const OpenDrawer = () => {
    console.log('Card clicked:', props.name); // This should now log correctly
    props.setOpen(!props.isOpen); // Toggling the drawer open/close state
  };

  return (
    <div
      className="flex justify-between z-30 px-2 py-4 w-full items-center bg-[#283140] h-20 rounded-lg cursor-pointer" 
      onClick={OpenDrawer} // Add the correct handler here
      
    >
      <img src={logo} alt="Coin Icon" />
      <p className="font-medium font-[ageo] text-lg">{props.name}</p>
      <p className="flex flex-col items-center gap-1">
        <span>
          <img src={second} className="h-5" alt="Reward Icon" />
        </span>
        + 10
      </p>
    </div>
  );
};


export default Earn;
