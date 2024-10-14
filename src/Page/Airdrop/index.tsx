import air from '../../assets/Images/auir.png'

const Airdrop = () => {
  return (
    <div className='w-full h-full flex p-4 items-center text-white' >
        <div className='h-3/4 w-full bg-slate-900 rounded-3xl p-4 flex flex-col items-center gap-4'>
            <h1 className='w-full text-center font-[ageo] text-3xl font-semibold'>AIR<span className='text-yellow-600'>DROP</span></h1>
            <img src={air} alt="" className='w-1/4'/>
            <h1 className='w-full text-center font-[ageo] text-xl font-semibold'>Something is big is cooking up here</h1>
            <h1 className='font-[ageobold] text-5xl text-center p-8 my-10'>Coming Real Soon..</h1>
        </div>
    </div>
  )
}

export default Airdrop