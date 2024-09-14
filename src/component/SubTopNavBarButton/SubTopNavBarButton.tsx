import {Link} from "react-router-dom";

type props = {
    path: string;
    name: string;
    image: any;
    isActive: boolean;
    onClick: () => void;
};

export const SideNavBarButton = ({ path, name, image, isActive, onClick }: props) => {
    return (
        <Link to={path} className="relative w-[90px] h-[80px] rounded flex justify-center items-center border-[1px]
         border-solid border-[#005285]" onClick={onClick}>
            <button className="hover:bg-[#006caf36] h-[-webkit-fill-available] w-full z-10 flex flex-col py-2 px-4 justify-center items-center gap-1
             text-[12px]">
                <img src={image} className="w-[35px] h-[35px]" />
                {name}
            </button>
            {/* Conditionally render this div only when the button is active */}
            {isActive && (
                <div className="absolute w-[90px] h-[20px] bottom-[-10px] border-x-[1px] border-x-solid border-x-[#005285] bg-[#fbfbfb]"></div>
            )}
        </Link>
    );
};
