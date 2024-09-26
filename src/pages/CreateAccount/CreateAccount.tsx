import React from "react";
import image from "../../assets/character/3d-cartoon-style-character 1.png";
import background from "../../assets/background/Rectangle 6.png";
import {TextFieldForLoginPages} from "../../component/TextFieldForLoginPages/TextFieldForLoginPages";

export const CreateAccount = () => {
    return (
        <section className='flex flex-row  w-full h-[600px] bg-red-600'>
            <aside className='self-start relative items-center justify-center flex w-[60%] h-[650px] bg-[#F8F8F8]'>
                <img src={background} className='absolute bottom-0 left-0 right-0 w-full'/>
                <img src={image} className='h-[450px] z-10'/>
            </aside>
            <article className='flex flex-col justify-center w-[40%] h-[600px] bg-white px-8'>
                <div className='flex mt-10 flex-col text-start mb-5'>
                    <h1 className='text-3xl poppins-semibold'>Welcome to Smart Pharmacy!</h1>
                    <p>Please create an account for your pharmacy first</p>
                </div>
                <div className='flex flex-col text-start'>
                    <TextFieldForLoginPages label={'Pharmacy Name'}/>
                    <TextFieldForLoginPages label={'Address'}/>
                    <TextFieldForLoginPages label={'Contact'}/>
                    <TextFieldForLoginPages label={'Website'}/>
                    <button
                        className={`mt-7 bg-[#006CAF] px-6 w-{100%} py-3 rounded-md text-white font-medium`}
                    >Create Account</button>
                </div>
            </article>
        </section>
    );
};
