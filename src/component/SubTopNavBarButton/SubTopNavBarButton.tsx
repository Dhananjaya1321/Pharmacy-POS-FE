import {Link} from "react-router-dom";

export const SideNavBarButton = ({path,name,image}:props) => {
    return (
        <Link to={path} className='w-[90px] h-[80px] rounded-xl flex justify-center items-center
         border-[1px] border-solid border-black'>
            <button className='flex flex-col py-2 px-4 justify-center items-center gap-1 text-[14px]'>
                <img src={image} className='w-[35px] h-[35px]'/>
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

