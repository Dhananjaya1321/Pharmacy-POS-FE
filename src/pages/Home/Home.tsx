import {TopNavBar} from "../TopNavBar/TopNavBar";
import {SideNavBar} from "../SideNavBar/SideNavBar";
import {Outlet} from "react-router-dom";

export const Home = () => {
    return (
        <main className='h-screen relative'>
            <TopNavBar/>
            <SideNavBar/>
            <main className='w-[90%] h-max flex justify-center absolute right-0 top-[60px] m-auto'>
                <Outlet/>
            </main>
        </main>
    );
};
