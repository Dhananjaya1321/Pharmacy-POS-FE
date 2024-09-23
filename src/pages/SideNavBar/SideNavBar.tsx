import {SideNavBarButton} from "../../component/SideNavBarButton/SideNavBarButton";
import dashboard from "../../assets/icons/menu.png"
import activeDashboard from "../../assets/icons/menu (1).png"
import order from "../../assets/icons/shopping-bag.png"
import activeOrder from "../../assets/icons/shopping-bag (1).png"
import stock from "../../assets/icons/in-stock.png"
import activeStock from "../../assets/icons/in-stock (1).png"
import customer from "../../assets/icons/customer.png"
import activeCustomer from "../../assets/icons/customer (1).png"
import supplier from "../../assets/icons/packages.png"
import activeSupplier from "../../assets/icons/packages (1).png"
import shop from "../../assets/icons/shop.png"
import activeShop from "../../assets/icons/shop (1).png"
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const SideNavBar = () => {
    const location = useLocation(); // Current location
    const [activeButton, setActiveButton] = useState<string>("");

    // Sync active button with location.pathname
    useEffect(() => {
        // Map the location.pathname to the button name
        switch (location.pathname) {
            case "/home/order":
                setActiveButton("Order");
                break;
            case "/home/stock-and-items":
                setActiveButton("Manage Stock and Items");
                break;
            case "/home/stock-and-items/items":
                setActiveButton("Manage Stock and Items");
                break;
            case "/home/stock-and-items/stock":
                setActiveButton("Manage Stock and Items");
                break;
            case "/home/stock-and-items/brands":
                setActiveButton("Manage Stock and Items");
                break;
            case "/home/stock-and-items/units":
                setActiveButton("Manage Stock and Items");
                break;
            case "/home/stock-and-items/categories":
                setActiveButton("Manage Stock and Items");
                break;
            case "/home/customer":
                setActiveButton("Customer");
                break;
            case "/home/supplier":
                setActiveButton("Supplier");
                break;
            case "/home/shop-and-user":
                setActiveButton("Manage Shop and Users");
                break;
            default:
                setActiveButton("Dashboard");
                break;
        }
    }, [location.pathname]); // Re-run when location changes

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName); // Update active button state when clicked
    };

    return (
        <nav className='bg-white h-screen w-[10%] p-2 top-0 left-0 right-0 fixed shadow z-50 flex flex-col'>
            <SideNavBarButton
                path={'/home'}
                name={'Dashboard'}
                image={dashboard}
                activeImage={activeDashboard}
                isActive={activeButton === 'Dashboard'}
                onClick={() => handleButtonClick('Dashboard')}
            />
            <SideNavBarButton
                path={'/home/order'}
                name={'Order'}
                image={order}
                activeImage={activeOrder}
                isActive={activeButton === 'Order'}
                onClick={() => handleButtonClick('Order')}
            />
            <SideNavBarButton
                path={'/home/stock-and-items'}
                name={'Manage Stock and Items'}
                image={stock}
                activeImage={activeStock}
                isActive={activeButton === 'Manage Stock and Items'}
                onClick={() => handleButtonClick('Manage Stock and Items')}
            />
            <SideNavBarButton
                path={'/home/customer'}
                name={'Customer'}
                image={customer}
                activeImage={activeCustomer}
                isActive={activeButton === 'Customer'}
                onClick={() => handleButtonClick('Customer')}
            />
            <SideNavBarButton
                path={'/home/supplier'}
                name={'Supplier'}
                image={supplier}
                activeImage={activeSupplier}
                isActive={activeButton === 'Supplier'}
                onClick={() => handleButtonClick('Supplier')}
            />
            <SideNavBarButton
                path={'/home/shop-and-user'}
                name={'Manage Shop and Users'}
                image={shop}
                activeImage={activeShop}
                isActive={activeButton === 'Manage Shop and Users'}
                onClick={() => handleButtonClick('Manage Shop and Users')}
            />
        </nav>
    );
};
