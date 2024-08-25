// import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export const SideNavBarButton = ({path,name,image}:props) => {
    return (
        <Link to={path} className='flex justify-center items-center'>
            <button className='flex flex-col py-2 px-4 justify-center items-center gap-1 text-[14px]'>
                <img src={image} className='w-[30px] h-[30px]'/>
                {name}
            </button>
        </Link>
    );
};

type props={
    path:string,
    name:string,
    image:any
}

