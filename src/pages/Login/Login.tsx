import React, {useState} from "react";
import image from "../../assets/character/3d-cartoon-style-character 1.png";
import background from "../../assets/background/Rectangle 6.png";
import {TextFieldForLoginPages} from "../../component/TextFieldForLoginPages/TextFieldForLoginPages";
import {Link, useNavigate} from "react-router-dom";
import userAPIController from "../../controller/UserAPIController"; // Assuming you import the API controller here

export const Login = () => {
    // State to hold the input values
    const [loginData, setLoginData] = useState({
        emailOrUsername: '',
        password: '',
    });

    // State to hold error messages
    const [errors, setErrors] = useState({
        emailOrUsername: "",
        password: ""
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });

        // Clear errors when typing
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    // Handle login form submission
    const handleLogin = async () => {
        if (loginData.emailOrUsername !== '' && loginData.password !== '') {
            const response = await userAPIController.checkLogin(
                loginData.emailOrUsername,
                loginData.password
            );

            if (response && response.error) {
                // Show the error message on the UI
                if ("Incorrect password" === response.error) {
                    setErrors({
                        emailOrUsername: '',
                        password: 'Incorrect password',
                    });
                } else if ("Incorrect email or username" === response.error) {
                    setErrors({
                        emailOrUsername: 'Incorrect email or username',
                        password: '',
                    });
                }
            } else if (response) {
                // Successful login, redirect to appropriate page
                if (response.data.role.name === 'Admin') {
                    navigate('/home');
                } else if (response.data.role.name === 'Employee') {
                    navigate('/order-employee-page');
                }
            }
        } else {
            if (loginData.emailOrUsername === '') {
                setErrors({
                    emailOrUsername: 'Please enter your email or username to login',
                    password: '',
                });
            } else if (loginData.password === '') {
                setErrors({
                    emailOrUsername: '',
                    password: 'Please enter your password to login',
                });
            }
        }
    };

    return (
        <section className='flex flex-row w-full h-[600px] bg-red-600'>
            <aside className='self-start relative items-center justify-center flex w-[60%] h-[650px] bg-[#F8F8F8]'>
                <img src={background} className='absolute bottom-0 left-0 right-0 w-full'/>
                <img src={image} className='h-[450px] z-10'/>
            </aside>
            <article className='flex flex-col justify-center w-[40%] h-[600px] bg-white px-8'>
                <div className='flex flex-col text-start mb-5'>
                    <h1 className='text-3xl poppins-semibold'>Welcome to Smart Pharmacy!</h1>
                    <p>Please sign in to your account to start your adventure.</p>
                </div>
                <div className='flex flex-col text-start'>
                    <TextFieldForLoginPages
                        name="emailOrUsername"
                        placeholder={'Email or Username'}
                        label={'Email or Username'}
                        important={"*"}
                        value={loginData.emailOrUsername}
                        onChange={handleInputChange}
                        msg={errors.emailOrUsername}
                    />
                    <TextFieldForLoginPages
                        name="password"
                        placeholder={'Password'}
                        label={'Password'}
                        type={'password'}
                        important={"*"}
                        value={loginData.password}
                        onChange={handleInputChange}
                        msg={errors.password}
                    />
                    <Link className='flex justify-end mt-4 text-blue-900' to={'/forgot-password'}>
                        <p>Forgot password?</p>
                    </Link>
                    <button
                        className={`mt-7 bg-[#006CAF] px-6 w-full py-3 rounded-md text-white font-medium`}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </article>
        </section>
    );
};
