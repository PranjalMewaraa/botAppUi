import { Link } from "react-router-dom"

const ComingSoon = () => {
  return (
    <div id='main_div' className=' w-full h-screen flex flex-col justify-center text-white items-center gap-4'>
        <div className="text-2xl font-[ageobold]">Coming Soon</div>
        <div className="text-lg">Stay Tuned for more updates</div>
        <Link to={'/'}>Back to Home</Link>
    </div>
  )
}

export default ComingSoon