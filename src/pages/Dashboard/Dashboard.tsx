import {Footer} from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import expiredWarning from "../../assets/icons/expired-worning.png";
import expired from "../../assets/icons/expired.png";
import outOfStock from "../../assets/icons/out-of-stock.png";
import outOfStockWarning from "../../assets/icons/out-of-stock-worning.png";
import inStock from "../../assets/icons/in-stock (2).png";
import brand from "../../assets/icons/brand-image (2).png";
import supplier from "../../assets/icons/supplier.png";
import customer from "../../assets/icons/customer-service.png";
import user from "../../assets/icons/profile.png";
import categories from "../../assets/icons/categories.png";
import {DashboardSummeryBox} from "../../component/DashboardSummeryBox/DashboardSummeryBox";
import userAPIController from "../../controller/UserAPIController";
import categoryAPIController from "../../controller/CategoryAPIController";
import brandAPIController from "../../controller/BrandAPIController";
import customerAPIController from "../../controller/CustomerAPIController";
import supplierAPIController from "../../controller/SupplierAPIController";
import itemAPIController from "../../controller/ItemAPIController";

export const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [brandCount, setBrandCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [supplierCount, setSupplierCount] = useState(0);
    const [itemsCountInStock, setItemsCountInStock] = useState(0);
    const [itemsCountOutOfStock, setItemsCountOutOfStock] = useState(0);
    const [itemsCountRunOutOfStock, setItemsCountRunOutOfStock] = useState(0);
    const [expiredItemCount, setExpiredItemCount] = useState(0);
    const [aboutToExpireItemCount, setAboutToExpireItemCount] = useState(0);

    useEffect(() => {
        fetchUserCount();
        fetchCategoryCount();
        fetchBrandCount();
        fetchSuppliersCount();
        fetchCustomersCount();
        fetchItemsCountInStock();
        fetchItemsCountOutOfStock();
        fetchItemsCountRunOutOfStock();
        fetchExpiredItemCount();
        fetchAboutToExpireItemCount();
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await userAPIController.getUserCount();
            if (response) {
                setUserCount(response.data);
            }
        } catch (error) {
        }
    };

    const fetchCategoryCount = async () => {
        try {
            const response = await categoryAPIController.getCategoryCount();
            if (response) {
                setCategoryCount(response.data);
            }
        } catch (error) {
        }
    };

    const fetchBrandCount = async () => {
        try {
            const response = await brandAPIController.getBrandCount();
            if (response) {
                setBrandCount(response.data);
            }
        } catch (error) {
        }
    };

    const fetchSuppliersCount = async () => {
        try {
            const response = await supplierAPIController.getSuppliersCount();
            if (response) {
                setSupplierCount(response.data);
            }
        } catch (error) {
        }
    };

    const fetchCustomersCount = async () => {
        try {
            const response = await customerAPIController.getCustomersCount();
            if (response) {
                setCustomerCount(response.data);
            }
        } catch (error) {
        }
    };

    const fetchItemsCountInStock = async () => {
        try {
            const response = await itemAPIController.getItemsCountInStock();
            if (response) {
                setItemsCountInStock(response.data);
            }
        } catch (error) {
        }
    };

    const fetchItemsCountOutOfStock = async () => {
        try {
            const response = await itemAPIController.getItemsCountOutOfStock();
            if (response) {
                setItemsCountOutOfStock(response.data);
            }
        } catch (error) {
        }
    };
    const fetchItemsCountRunOutOfStock = async () => {
        try {
            const response = await itemAPIController.getItemsCountRunOutOfStock();
            if (response) {
                setItemsCountRunOutOfStock(response.data);
            }
        } catch (error) {
        }
    };
    const fetchExpiredItemCount = async () => {
        try {
            const response = await itemAPIController.getExpiredItems();
            if (response) {
                setExpiredItemCount(response.data);
            }
        } catch (error) {
        }
    };
    const fetchAboutToExpireItemCount = async () => {
        try {
            const response = await itemAPIController.aboutToExpireItemCount();
            if (response) {
                setAboutToExpireItemCount(response.data);
            }
        } catch (error) {
        }
    };


    return (
        <section className='w-full h-max flex items-center flex-col'>
            <section className="relative flex flex-wrap w-[98%] items-center justify-center gap-4 mt-5">
                <DashboardSummeryBox
                    image={expiredWarning}
                    count={aboutToExpireItemCount}
                    bgColor={"bg-[#FFA600]"}
                    borderColor={"border-[#FFA600]"}
                    textColor={"text-[#FFA600]"}
                    label={"The medicine is about to expire"}
                />
                <DashboardSummeryBox
                    image={expired}
                    count={expiredItemCount}
                    bgColor={"bg-[#FB0004]"}
                    borderColor={"border-[#FB0004]"}
                    textColor={"text-[#FB0004]"}
                    label={"Expired medicines"}
                />
                <DashboardSummeryBox
                    image={outOfStockWarning}
                    count={itemsCountRunOutOfStock}
                    bgColor={"bg-[#FFA600]"}
                    borderColor={"border-[#FFA600]"}
                    textColor={"text-[#FFA600]"}
                    label={"The medicine is about to run out"}
                />
                <DashboardSummeryBox
                    image={outOfStock}
                    count={itemsCountOutOfStock}
                    bgColor={"bg-[#FB0004]"}
                    borderColor={"border-[#FB0004]"}
                    textColor={"text-[#FB0004]"}
                    label={"Medicine out of stock"}
                />
                <DashboardSummeryBox
                    image={inStock}
                    count={itemsCountInStock}
                    bgColor={"bg-[#2DE100]"}
                    borderColor={"border-[#2DE100]"}
                    textColor={"text-[#2DE100]"}
                    label={"Medicine in stock"}
                />
                <DashboardSummeryBox
                    image={customer}
                    count={customerCount}
                    bgColor={"bg-[#00609C]"}
                    borderColor={"border-[#00609C]"}
                    textColor={"text-[#00609C]"}
                    label={"Customers"}
                />
                <DashboardSummeryBox
                    image={supplier}
                    count={supplierCount} bgColor={"bg-[#00609C]"}
                    borderColor={"border-[#00609C]"}
                    textColor={"text-[#00609C]"}
                    label={"Suppliers"}
                />
                <DashboardSummeryBox
                    image={brand}
                    count={brandCount}
                    bgColor={"bg-[#00609C]"}
                    borderColor={"border-[#00609C]"}
                    textColor={"text-[#00609C]"}
                    label={"Brands"}
                />
                <DashboardSummeryBox
                    image={categories}
                    count={categoryCount}
                    bgColor={"bg-[#00609C]"}
                    borderColor={"border-[#00609C]"}
                    textColor={"text-[#00609C]"}
                    label={"Categories"}
                />
                <DashboardSummeryBox
                    image={user}
                    count={userCount}
                    bgColor={"bg-[#00609C]"}
                    borderColor={"border-[#00609C]"}
                    textColor={"text-[#00609C]"}
                    label={"Users"}
                />
            </section>
            <Footer/>
        </section>
    );
};
