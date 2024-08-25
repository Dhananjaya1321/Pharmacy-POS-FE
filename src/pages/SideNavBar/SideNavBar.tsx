import {SideNavBarButton} from "../../component/SideNavBarButton/SideNavBarButton";
import dashboard from "../../assets/icons/menu.png"
import order from "../../assets/icons/shopping-bag.png"
import stock from "../../assets/icons/in-stock.png"
import customer from "../../assets/icons/customer.png"
import supplier from "../../assets/icons/packages.png"
import shop from "../../assets/icons/shop.png"
export const SideNavBar = () => {
    return (
        <nav className='bg-white h-screen w-[10%] top-0 left-0 right-0 fixed shadow z-50 flex flex-col'>
            <SideNavBarButton path={''} name={'Dashboard'} image={dashboard}/>
            <SideNavBarButton path={'/order'} name={'Order'} image={order}/>
            <SideNavBarButton path={'/stock-and-items'} name={'Manage Stock and Items'} image={stock}/>
            <SideNavBarButton path={'/customer'} name={'Customer'} image={customer}/>
            <SideNavBarButton path={'/supplier'} name={'Supplier'} image={supplier}/>
            <SideNavBarButton path={'/shop-and-user'} name={'Manage Shop and Users'} image={shop}/>
        </nav>
    );
};
