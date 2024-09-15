import {Footer} from "../Footer/Footer";
import React from "react";
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

export const Dashboard = () => {
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
                <DashboardSummeryBox image={brand} count={50} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Brands"}/>
                <DashboardSummeryBox image={categories} count={50} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Categories"}/>
                <DashboardSummeryBox image={user} count={50} bgColor={"bg-[#00609C]"} borderColor={"border-[#00609C]"} textColor={"text-[#00609C]"} label={"Users"}/>
            </section>
            <Footer/>
        </section>
    );
};
