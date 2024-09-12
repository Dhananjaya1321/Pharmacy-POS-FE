// import {Button} from "@mui/material";
import {Link} from "react-router-dom";

type props = {
    path: string;
    name: string;
    image: any;
    activeImage: string;
    isActive: boolean;
    onClick: () => void;
};

export const SideNavBarButton = ({path, name, image, activeImage, isActive, onClick}: props) => {
    return (
        <Link to={path} className={`flex justify-center rounded-lg items-center h-[80px] hover:shadow-lg
        ${isActive ? "bg-[#006CAF] text-white rounded-lg shadow-lg" : "bg-transparent text-black"}`} onClick={onClick}>
            <button
                className={`flex flex-col py-2 px-4 justify-center items-center gap-1 text-[12px]`}
            >
                <img
                    src={isActive ? activeImage : image}
                    className='w-[30px] h-[30px]'
                    alt={name}
                />
                {name}
            </button>
        </Link>
    );
};
