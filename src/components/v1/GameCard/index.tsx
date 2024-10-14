import diamond from "../../../assets/Images/diamond.png"

const GameCard = () => {
  return (
    <div className="w-1/2 h-full p-1">
    <div className='w-full h-fit p-2 flex-col gap-1 bg-slate-800 text-white rounded-lg'>
        <img className='w-full max-h-36' src='https://media.wired.com/photos/62855b1bb6cfd378a30c474a/master/pass/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg'/>
        <div className='w-full text-center font-[ageobold] text-lg'>Game Name</div>
        <div className='w-full text-center font-[ageoReg] flex justify-center'><span><img className="h-6 w-6" src={diamond} alt="" /></span> +10</div>
    </div>
    </div>
  )
}

export default GameCard