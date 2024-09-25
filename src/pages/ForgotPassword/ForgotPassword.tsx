    import React, {useState} from "react";
    import image from "../../assets/character/3d-cartoon-style-character 1.png";
    import background from "../../assets/background/Rectangle 6.png";
    import {TextFieldForLoginPages} from "../../component/TextFieldForLoginPages/TextFieldForLoginPages";
    import {Link, useNavigate} from "react-router-dom";
    import userAPIController from "../../controller/UserAPIController";

    export const ForgotPassword = () => {
        // State to hold the input value for email or username
        const [emailOrUsername, setEmailOrUsername] = useState('');

        // State to hold error messages
        const [errors, setErrors] = useState('');

        const navigate = useNavigate();

        // Handle input changes
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailOrUsername(e.target.value);
            setErrors(''); // Reset error when user starts typing
        };

        // Handle Reset Password button click
        const handleResetPassword = async () => {
            // Simple validation
            if (emailOrUsername === '') {
                setErrors('Please enter your email');
                return;
            }

            try {
                // const response = await yourApiController.resetPassword(emailOrUsername);
                if (emailOrUsername!==''){
                    const otp = await userAPIController.checkEmailAndSendOTP(emailOrUsername);

                    if (otp && otp.error) {
                        if ("Incorrect email" === otp.error) {
                            setErrors('Incorrect email');
                        }
                    } else if (otp) {
                        navigate('/verify-code', { state: { emailOrUsername, otp } });
                    }
                }else {
                    setErrors("Please enter your email to forgot password");
                }
            } catch (error) {
                // Handle error (e.g., show an error message if the user is not found)
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
                        <h1 className='text-3xl poppins-semibold'>Forgot password</h1>
                        <p>Reset password in two quick steps</p>
                    </div>
                    <div className='flex flex-col text-start'>
                        <TextFieldForLoginPages
                            name="emailOrUsername"
                            placeholder={'Email'}
                            label={'Email'}
                            important={"*"}
                            value={emailOrUsername}
                            onChange={handleInputChange}
                            msg={errors} // Display error message under the field
                        />

                        <button
                            className={`mt-7 bg-[#006CAF] px-6 w-full py-3 rounded-md text-white font-medium`}
                            onClick={handleResetPassword} // Add click handler
                        >
                            Reset Password
                        </button>

                        <Link to={'/'}
                              className={`w-full`}>
                            <button
                                className={`mt-7 border-[1px] border-solid border-[#006CAF] px-6 w-full py-3 rounded-md text-[#006CAF] font-medium`}
                            >
                                Back to Login
                            </button>
                        </Link>
                    </div>
                </article>
            </section>
        );
    };
