import React from "react";
import image from "../../assets/character/3d-cartoon-style-character 1.png";
import background from "../../assets/background/Rectangle 6.png";
import {TextFieldForLoginPages} from "../../component/TextFieldForLoginPages/TextFieldForLoginPages";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <section className='flex flex-row  w-full h-[600px] bg-red-600'>
            <aside className='self-start relative items-center justify-center flex w-[60%] h-[650px] bg-[#F8F8F8]'>
                <img src={background} className='absolute bottom-0 left-0 right-0 w-full'/>
                <img src={image} className='h-[450px] z-10'/>
            </aside>
            <article className='flex flex-col justify-center w-[40%] h-[600px] bg-white px-8'>
                <div className='flex flex-col text-start mb-5'>
                    <h1 className='text-3xl poppins-semibold'>Welcome to Smart Pharmacy!</h1>
                    <p>please sign-in to your account and start adventure</p>
                </div>
                <div className='flex flex-col text-start'>
                    <TextFieldForLoginPages label={'Email or Username'}/>
                    <TextFieldForLoginPages label={'Password'} type={'password'}/>
                    <Link className='flex justify-end mt-4 text-blue-900' to={'/forgot-password'}>
                        <p>Forgot password?</p>
                    </Link>
                    <button
                        className={`mt-7 bg-[#006CAF] px-6 w-{100%} py-3 rounded-md text-white font-medium`}
                    >Login</button>
                </div>
            </article>
        </section>
    );
};
