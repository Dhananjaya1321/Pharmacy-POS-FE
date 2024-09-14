import items from "../../assets/icons/new-product.png";
import stock from "../../assets/icons/in-stock.png";
import brands from "../../assets/icons/brand-image.png";
import units from "../../assets/icons/puzzle-piece.png";
import categories from "../../assets/icons/category.png";
import {Outlet, useLocation} from "react-router-dom";
import {SideNavBarButton} from "../../component/SubTopNavBarButton/SubTopNavBarButton";
import {Footer} from "../Footer/Footer";
import {useEffect, useState} from "react";

export const StockAndItems = () => {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState<string>("items"); // Default active button to "items"

    // Use useEffect to update the active button based on the current path
    useEffect(() => {
        const currentPath = location.pathname.split("/").pop(); // Get the last part of the path
        setActiveButton(currentPath || "items"); // Default to "items" if no path is present
    }, [location]);

    // Function to apply specific styles when the "items" button is active
    const getSectionClass = () => {
        return activeButton === "items"
            ? "rounded-tl-none"
            : "rounded";
    };

    return (
        <section className="h-max flex w-[95%] flex-col justify-center">
            <nav className="flex gap-2 pt-4 pr-4">
                <SideNavBarButton
                    path="items"
                    name="Items"
                    image={items}
                    isActive={activeButton === "items"}
                    onClick={() => setActiveButton("items")}
                />
                <SideNavBarButton
                    path="stock"
                    name="Stock"
                    image={stock}
                    isActive={activeButton === "stock"}
                    onClick={() => setActiveButton("stock")}
                />
                <SideNavBarButton
                    path="brands"
                    name="Brands"
                    image={brands}
                    isActive={activeButton === "brands"}
                    onClick={() => setActiveButton("brands")}
                />
                <SideNavBarButton
                    path="units"
                    name="Units"
                    image={units}
                    isActive={activeButton === "units"}
                    onClick={() => setActiveButton("units")}
                />
                <SideNavBarButton
                    path="categories"
                    name="Categories"
                    image={categories}
                    isActive={activeButton === "categories"}
                    onClick={() => setActiveButton("categories")}
                />
            </nav>

            <section className={`flex flex-row justify-center border-[1px] border-solid 
            border-[#005285] mt-2 rounded ${getSectionClass()}`}>
                <Outlet />
            </section>

            <Footer />
        </section>
    );
};
