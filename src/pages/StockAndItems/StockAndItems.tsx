import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button";
import {Link, Outlet} from "react-router-dom";

export const StockAndItems = () => {
    return (
        <section className='h-max flex w-[90%] flex-col justify-center'>
            <nav className='flex gap-4 p-4'>
                <Link to="items"><button className='nav-button'>Items</button></Link>
                <Link to="stock"><button className='nav-button'>Stock</button></Link>
                <Link to="brands"><button className='nav-button'>Brands</button></Link>
                <Link to="units"><button className='nav-button'>Units</button></Link>
                <Link to="categories"><button className='nav-button'>Categories</button></Link>
            </nav>
            <section>
                <Outlet/>
            </section>

        </section>
    );
};
