import logout from "../../assets/icons/power-off.png"
import support from "../../assets/icons/support (1).png"
import {Link} from "react-router-dom";

export const TopNavBar = () => {
    return (
        <nav className='bg-white w-screen h-[50px] top-0 left-0 right-[20px] fixed shadow z-40
        flex flex-row justify-end gap-1 items-center'>
            <Link to={'/customer-support'}>
                <button className='flex flex-row py-2 px-4 justify-center items-center gap-1 text-[14px]
            border-[2px] border-gray-500 rounded w-[40px] h-[40px] relative'>
                    <img src={support} className='w-[30px] h-[30px] absolute left-0 right-0 top-0 bottom-0 m-auto'/>
                </button>
            </Link>
            <Link to={'/'}>
                <button className='bg-red-600 flex flex-row py-2 px-4 justify-center items-center gap-1 text-[14px]
            mr-5 rounded w-[40px] h-[40px] relative'>
                    <img src={logout} className='w-[30px] h-[30px] absolute left-0 right-0 top-0 bottom-0 m-auto'/>
                </button>
            </Link>
        </nav>
    );
};
