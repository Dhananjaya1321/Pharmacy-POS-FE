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

export const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [brandCount, setBrandCount] = useState(0);

    useEffect(() => {
        fetchUserCount();
        fetchCategoryCount();
        fetchBrandCount();
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await userAPIController.getUserCount();
            if (response) {
                setUserCount(response.data);
            }
        } catch (error) {
            console.error("Error fetching shop data:", error);
        }
    };

    const fetchCategoryCount = async () => {
        try {
            const response = await categoryAPIController.getCategoryCount();
            if (response) {
                setCategoryCount(response.data);
            }
        } catch (error) {
            console.error("Error fetching shop data:", error);
        }
    };

    const fetchBrandCount = async () => {
        try {
            const response = await brandAPIController.getBrandCount();
            if (response) {
                setBrandCount(response.data);
            }
        } catch (error) {
            console.error("Error fetching shop data:", error);
        }
    };



    return (
        <section className='w-full h-max flex items-center flex-col'>
            <section className="relative flex flex-wrap w-[98%] items-center justify-center gap-4 mt-5">
                <DashboardSummeryBox image={expiredWarning} count={50} bgColor={"bg-[#FFA600]"} borderColor={"border-[#FFA600]"} textColor={"text-[#FFA600]"} label={"The medicine is about to expire"}/>
                <DashboardSummeryBox image={expired} count={50} bgColor={"bg-[#FB0004]"} borderColor={"border-[#FB0004]"} textColor={"text-[#FB0004]"} label={"Expired medicines"}/>
                <DashboardSummeryBox image={outOfStockWarning} count={50} bgColor={"bg-[#FFA600]"} borderColor={"border-[#FFA600]"} textColor={"text-[#FFA600]"} label={"The medicine is about to run out"}/>
                <DashboardSummeryBox image={outOfStock} count={50} bgColor={"bg-[#FB0004]"} borderColor={"border-[#FB0004]"} textColor={"text-[#FB0004]"} label={"Medicine out of stock"}/>
                <DashboardSummeryBox image={inStock} count={50} bgColor={"bg-[#2DE100]"} borderColor={"border-[#2DE100]"} textColor={"text-[#2DE100]"} label={"Medicine in stock"}/>
                <DashboardSummeryBox image={customer} count={50} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Customers"}/>
                <DashboardSummeryBox image={supplier} count={50} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Suppliers"}/>
                <DashboardSummeryBox image={brand} count={brandCount} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Brands"}/>
                <DashboardSummeryBox image={categories} count={categoryCount} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Categories"}/>
                <DashboardSummeryBox image={user} count={userCount} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Users"}/>
            </section>
            <Footer/>
        </section>
    );
};
