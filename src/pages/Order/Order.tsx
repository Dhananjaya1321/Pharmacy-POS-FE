import {Footer} from "../Footer/Footer";
import React from "react";

export const Order = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Orders</h3>
            </section>
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>

            </section>
            <Footer/>
        </section>
    );
};
