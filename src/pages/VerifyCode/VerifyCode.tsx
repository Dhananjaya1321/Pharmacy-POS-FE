import React, {useState} from "react";
import image from "../../assets/character/3d-cartoon-style-character 1.png";
import background from "../../assets/background/Rectangle 6.png";
import {TextFieldForLoginPages} from "../../component/TextFieldForLoginPages/TextFieldForLoginPages";
import {Link, useLocation, useNavigate} from "react-router-dom";
import userAPIController from "../../controller/UserAPIController";

export const VerifyCode = () => {
        const [enteredCode, setEnteredCode] = useState('');
        const [errors, setErrors] = useState('');
        const location = useLocation();
        const navigate = useNavigate();

        // Retrieve the email or username and OTP from the previous page
        const {emailOrUsername, otp: responseOTP} = location.state || {};
        const [otp, setOtp] = useState(responseOTP); // Manage OTP locally after resend

        // Handle input change
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEnteredCode(e.target.value);
        };

        // Handle form submission (verify code)
        const handleResendOTP = async () => {
            try {
                const response = await userAPIController.checkEmailAndSendOTP(emailOrUsername);
                if (response) {
                    setOtp(response); // Update OTP after resending
                    setErrors(''); // Clear any errors
                } else {
                    setErrors('Failed to resend OTP. Please try again.');
                }
            } catch (error) {
                setErrors('An error occurred while resending OTP.');
            }
        }
        const handleVerifyCode = async () => {
            if (enteredCode === '') {
                setErrors('Please enter the verification code');
                return;
            }

            if (enteredCode !== otp.data) {
                setErrors('Invalid verification code');
                return;
            }

            try {
                // Successful verification, navigate to reset password page
                navigate('/change-password', {state: {emailOrUsername}});
            } catch (error) {
                setErrors('An error occurred. Please try again.');
            }
        };

        return (
            <section className='flex flex-row  w-full h-[600px] bg-red-600'>
                <aside className='self-start relative items-center justify-center flex w-[60%] h-[650px] bg-[#F8F8F8]'>
                    <img src={background} className='absolute bottom-0 left-0 right-0 w-full'/>
                    <img src={image} className='h-[450px] z-10'/>
                </aside>
                <article className='flex flex-col justify-center w-[40%] h-[600px] bg-white px-8'>
                    <div className='flex flex-col text-start mb-5'>
                        <h1 className='text-3xl poppins-semibold'>We sent a code to your email</h1>
                        <p>Enter the 6-digit verification code sent to</p>
                    </div>
                    <div className='flex flex-col text-start'>
                        <TextFieldForLoginPages
                            name="otpCode"
                            placeholder={'OTP Code'}
                            label={'OTP Code'}
                            important={"*"}
                            value={enteredCode}
                            onChange={handleInputChange}
                            msg={errors}
                        />
                        <button
                            className='mt-4 flex justify-start  text-blue-900'
                            onClick={handleResendOTP}
                        >
                            <p>Re-send code</p>
                        </button>

                        <button
                            className={`mt-7 bg-[#006CAF] px-6 w-{100%} py-3 rounded-md text-white font-medium`}
                            onClick={handleVerifyCode}
                        >Submit
                        </button>
                        <Link to={'/forgot-password'}
                              className={`w-full`}>
                            <button
                                className={`mt-7 border-[1px] border-solid border-[#006CAF] px-6 w-full py-3 rounded-md text-[#006CAF] font-medium`}
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </article>
            </section>
        );
    }
;
