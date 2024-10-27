import { cn } from "@/lib/utils";
import { useNavBar } from "@/utils/useNavBar";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  image?: string;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  action: number
};

export default function LIstLInk({
 
  title,
  subtitle,

  action
 
}: Props) {
  const { activeIndex, setActiveIndex } = useNavBar();
  console.log(activeIndex)
  return (
    <div
    onClick={()=>setActiveIndex(action)}
      className={cn(
        "group flex items-center w-full gap-4 px-4 py-2 text-white bg-white/10 rounded-xl justify-between h-[3.5rem]",

      
      )}
     
     
    >
      {/* {image && (
        <img
          src={image}
          alt={title}
          className="object-contain w-9 h-9 mix-blend-screen"
        />
      )} */}
      <div className="text-sm font-medium text-left">
        <p className="text-white">{title}</p>
        <p className="text-gray-500">{subtitle}</p>
       
      </div>
      <div>
      <img
          src="./images/angle-right-solid.svg"
          alt={title}
          className="object-contain w-5 h-5 mix-blend-screen "
        />
      </div>
     
    </div>
  );
}

