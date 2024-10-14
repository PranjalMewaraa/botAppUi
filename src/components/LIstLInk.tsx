import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  image?: string;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  action: string 
};

export default function LIstLInk({
 
  title,
  subtitle,

  action
 
}: Props) {
  return (
    <Link to={action}
      className={cn(
        "group flex items-center w-full gap-4 px-4 py-2 bg-white/10 rounded-xl justify-between h-[3.5rem]",

      
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
        <p>{title}</p>
        <p className="text-gray-500">{subtitle}</p>
       
      </div>
      <div>
      <img
          src="./images/angle-right-solid.svg"
          alt={title}
          className="object-contain w-5 h-5 mix-blend-screen "
        />
      </div>
     
    </Link>
  );
}

