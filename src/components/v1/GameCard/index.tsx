import diamond from "../../../assets/Images/dollar.png"
interface GameProps {
  name:string;
  fee: number;
}
const GameCard: React.FC<GameProps> = ({name,fee}) => {
  return (
    <div className="w-full h-full p-1">
    <div className='w-full h-fit p-2 flex-col gap-1 bg-slate-800 text-white rounded-lg'>
        <img className='w-full max-h-36' src='https://media.wired.com/photos/62855b1bb6cfd378a30c474a/master/pass/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg'/>
        <div className='w-full text-center font-[ageobold] text-base h-14'>{name}</div>
        <div className='w-full text-center font-[ageoReg] flex justify-center'><span><img className="h-6 w-6" src={diamond} alt="" /></span> {fee}</div>
    </div>
    </div>
  )
}

export default GameCard