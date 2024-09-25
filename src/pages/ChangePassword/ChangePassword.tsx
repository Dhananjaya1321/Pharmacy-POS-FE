import React, {useState} from "react";
import image from "../../assets/character/3d-cartoon-style-character 1.png";
import background from "../../assets/background/Rectangle 6.png";
import {TextFieldForLoginPages} from "../../component/TextFieldForLoginPages/TextFieldForLoginPages";
import {Link, useLocation, useNavigate} from "react-router-dom";
import userAPIController from "../../controller/UserAPIController";

export const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {emailOrUsername} = location.state || {};
    // State for new password and confirm password
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handelNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(value)
        setNewPassword(value)
    }
    const handelConfirmNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(value)
        setConfirmPassword(value)
    }
    const handleSubmit = async () => {
        if (newPassword === '' || confirmPassword === '') {
            setError('Both fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            setNewPassword('');
            setConfirmPassword('');
            return;
        }

        const response = await userAPIController.updatePassword(newPassword, emailOrUsername);

        if (response) {
            navigate('/');
        } else {
            setError('Failed to change password. Try again.');
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
                    <h1 className='text-3xl poppins-semibold'>Change password</h1>
                    <p>Create a new password for your</p>
                </div>
                <div className='flex flex-col text-start'>
                    <TextFieldForLoginPages
                        name="newPassword"
                        placeholder={'New Password'}
                        important={"*"}
                        msg={error}
                        label={'New Password'}
                        type="password"
                        value={newPassword}
                        onChange={handelNewPassword}
                    />
                    <TextFieldForLoginPages
                        name="conformNewPassword"
                        placeholder={'Conform New Password'}
                        important={"*"}
                        msg={error}
                        label={'Conform New Password'}
                        type="password"
                        value={confirmPassword}
                        onChange={handelConfirmNewPassword}
                    />

                    <button
                        className={`mt-7 bg-[#006CAF] px-6 w-{100%} py-3 rounded-md text-white font-medium`}
                        onClick={handleSubmit}
                    >Save
                    </button>
                </div>
            </article>
        </section>
    );
};
