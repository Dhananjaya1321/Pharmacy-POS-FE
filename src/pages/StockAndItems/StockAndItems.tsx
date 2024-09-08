import items from "../../assets/icons/new-product.png";
import stock from "../../assets/icons/in-stock.png";
import brands from "../../assets/icons/brand-image.png";
import units from "../../assets/icons/puzzle-piece.png";
import categories from "../../assets/icons/category.png";
import {Outlet} from "react-router-dom";
import {SideNavBarButton} from "../../component/SubTopNavBarButton/SubTopNavBarButton";
import {Footer} from "../Footer/Footer";

export const StockAndItems = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <nav className='flex gap-2 pt-4 pr-4'>
                <SideNavBarButton path={'items'} name={"Items"} image={items}/>
                <SideNavBarButton path={'stock'} name={"Stock"} image={stock}/>
                <SideNavBarButton path={'brands'} name={"Brands"} image={brands}/>
                <SideNavBarButton path={'units'} name={"Units"} image={units}/>
                <SideNavBarButton path={'categories'} name={"Categories"} image={categories}/>
            </nav>
            <section className='flex flex-row justify-center rounded-xl border-[1px] border-solid border-[#cecece] mt-2'>
                <Outlet/>
            </section>
            <Footer/>
        </section>
    );
};
