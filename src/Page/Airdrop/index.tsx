
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";




const Airdrop = () => {
  const [openInfo,setOpenInfo]=useState(false);
  const [activeProperty,setActiveProperty]=useState<dataProperty>();
  return (
    <div id="noscroller" className='w-full h-[90%] flex pt-4 items-center text-center font-[ageo] text-white' >
      
      {openInfo? 
      <InformationPage setOpen={setOpenInfo} propertyData={activeProperty}/>
      :
      <div className="w-full flex items-center flex-col gap-1 rounded-t-2xl bg-slate-900 border-t-4 border-yellow-500 mt-16 h-full p-4">
        
          <img src="/images/goat3.png" alt="" className="h-28"/>
          <p className="font-[ageo]">Looking for an Airdrop? But we call it</p>
          <p className="text-yellow-500 text-lg">HOUSE-DROP</p>
          <h3 className="text-xl font-[ageobold]">Most Awaited House Drop Launch Coming Soon</h3>
        {/*<CountdownTimer targetDate="2024-12-31T18:29:00Z"/>*/}
          <ImageSlideShow setActiveProperty={setActiveProperty}/>
          <button className=" mt-2 px-12 py-2 bg-yellow-400 text-slate-800 rounded-md" onClick={()=>setOpenInfo(true)}>Explore More</button>
       </div>}
       
    </div>
  )
}


interface CountdownTimerProps {
  targetDate: string; // ISO string format date, e.g., "2024-12-31T23:59:59"
}

// Define the time left type
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  // Function to calculate time left
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft: TimeLeft;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // If countdown is over
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  // Set initial state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [targetDate]);

  return (
    <div>
      <p className="text-sm">
        <span className="text-yellow-500 text-3xl font-[counter]">{timeLeft.days}</span> Days - 
        <span className="text-yellow-500 text-3xl font-[counter]">{timeLeft.hours}</span> Hours - 
        <span className="text-yellow-500 text-3xl font-[counter]">{timeLeft.minutes}</span> Minutes - 
        <span className="text-yellow-500 text-3xl font-[counter]">{timeLeft.seconds}</span> Seconds
      </p>
    </div>
  );
};


interface ImageSlideShowProps{
  setActiveProperty:(data:dataProperty)=>void;
}

const ImageSlideShow:React.FC<ImageSlideShowProps> = ({setActiveProperty}) => {
  const [imageSrc, setImageSrc] = useState("/images/pic1.jpg");

  const images = [
    { 
      img:"/images/pic1.jpg",
      title:"Rockfield Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
    {
      img: "/images/pic4.jpg",
      title:"Gamma Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
    {
      img:   "/images/pic3.jpg",
      title:"Mangrove Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
    {
      img:   "/images/pic2.jpg",
      title:"Kingston Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
  
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setImageSrc(randomImage.img);
      setActiveProperty(randomImage);
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [images]);

  return (
    <div className="w-full flex justify-center items-center h-48 rounded-xl overflow-hidden mt-4">
      <img src={imageSrc} alt="Slideshow image" className="h-full border-2 rounded-lg border-yellow-500" />
    </div>
  );
};

interface InfoProps{
  setOpen:(open:boolean)=>void;
  propertyData:dataProperty|undefined;
}
type dataProperty={
  img: string;
  title: string;
  desc: string;
}

const InformationPage:React.FC<InfoProps> =({setOpen,propertyData})=>{
  const [openHowItWorks,setOpenHowItWorks]=useState(false);
  console.log(propertyData)
  const dataHIW=[
    {title:"Hold GTPR", Info:"Ensure you have at least $9 worth of GTPR tokens to qualify"},
    {title:"Earn Points", Info:"Play to accumulate, which act as your bidding power"},
    {title:"Place your bid", Info:"Use points to bid for tokenized shares in the property. you can update your bid as many as you can to improve your winning position"},
    {title:"Claim Ownership",Info:"Winning bidders pay a processing fee in GTPR to recieve thier NFTs"},
    {title:"Own or trade",Info:"Use sell or leverage your NFT as valuable asset."}
  ]
  const images = [
    { 
      img:"/images/pic1.jpg",
      title:"Rockfield Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
    {
      img: "/images/pic4.jpg",
      title:"Gamma Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
    {
      img:   "/images/pic3.jpg",
      title:"Mangrove Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
    {
      img:   "/images/pic2.jpg",
      title:"Kingston Mansion",
      desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
    },
  
  ];
  const[data,setData]=useState({ 
    img:"/images/pic1.jpg",
    title:"Rockfield Mansion",
    desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat error aliquam deleniti at quos perspiciatis numquam quidem eveniet modi ducimus, perferendis dignissimos sit tempora, ipsa, a mollitia iste impedit fuga?"
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setData(randomImage)
    }, 3000); 

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [images]);
  return(
    <>
    
    {openHowItWorks?

      <div id="noscroller" className="w-full flex items-center flex-col gap-2 rounded-t-2xl bg-slate-900 border-t-4 border-yellow-500 mt-16 h-full p-4">
        <span className="w-full"><FaArrowLeft size={24} onClick={()=>setOpen(false)}/></span>
        <h1 className="text-3xl font-[ageobold]">How it Works?</h1>
        <div id="noscroller" className="w-full h-[72vh] pb-12 overflow-y-scroll">
        {dataHIW.map((item,idx)=>{
          return(
            <div key={idx} className="mb-1 w-full min-h-24 bg-slate-800 rounded-lg p-2 flex gap-2">
              <div>
                <p className="text-xl text-left px-2 font-[ageobold]">{item.title}</p>
                <p className="text-sm text-justify px-2">{item.Info}</p>
              </div>
            </div>
          )
        })}
         <button onClick={()=>setOpen(false)} className="mt-2 px-6 py-2 bg-yellow-400 text-slate-800 rounded-md font-semibold">Back to Game</button>
        </div>
        
       
      </div>
      :
        <div className="w-full flex items-center flex-col gap-2 rounded-t-2xl bg-slate-900 border-t-4 border-yellow-500 mt-16 h-full p-4">
          <span className="w-full"><FaArrowLeft size={24} onClick={()=>setOpen(false)}/></span>
          <h1 className="text-3xl font-[ageobold]">{data?.title}</h1>
          <img src={data?.img} alt="" className="w-4/5 h-52 my-2" />
          <p className="text-justify w-4/5">{data?.desc}</p>
          <button className="mt-2 px-6 py-2 bg-yellow-400 text-slate-800 rounded-md font-semibold" onClick={()=>setOpenHowItWorks(true)}>How it Works?</button>
        </div>
      }
    
    </>
  )
}


export default Airdrop
