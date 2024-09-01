import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
// @ts-ignore
import BasicTable from "../../component/BasicTable/BasicTable";
import React, {useState} from 'react';
// @ts-ignore
import axios from "axios";

export const ShopAndUser = () => {
    // State to manage form data
    const [shopData, setShopData] = useState({
        pharmacyName: '',
        contact: '',
        website: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        pharmacyName: '',
        contact: '',
        website: '',
        address: '',
    });

    const [userData, setUserData] = useState({
        name: "Isuru Dhananjaya",
        contact: "076 715 1321",
        role: "Admin",
        nic: "20021010025",
        email: "supplier@gmail.com",
        password: "",
        username: "user123",
        address: "No - 181, ABC Road, Galle",
    });

    type ShopDataKey = keyof typeof shopData;


    // Handle input changes for shop form
    const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as ShopDataKey;

        setShopData({
            ...shopData,
            [typedName]: value,
        });


        // Validation logic
        let error = '';
        if (value.trim() === '') {
            error = `${name} is required`;
        } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            error = 'Invalid email format';
        } else if (name === 'contact' && !/^\d+$/.test(value)) {
            error = 'Contact number should only contain digits';
        }

        // Set error state
        setErrors({
            ...errors,
            [name]: error,
        });
    };


    // Handle form submission
    const handleSubmit = async () => {
        let hasErrors = false;
        const newErrors = {...errors};

        Object.keys(shopData).forEach(key => {
            const typedKey = key as ShopDataKey;
            if (shopData[typedKey].trim() === '') {
                newErrors[typedKey] = `${typedKey} is required`;
                hasErrors = true;
            }
        });

        setErrors(newErrors);

        if (hasErrors) {
            alert("Please correct the errors before submitting.");
            return;
        }

        try {
            // API call to save the data
            const response = await axios.post(
                "http://localhost:8080/api/v1/pharmacy/shop",
                shopData
            );
            if (response.status === 200) {
                alert("Data saved successfully!");
            }
        } catch (error) {
            console.error("There was an error saving the data!", error);
            alert("Failed to save data.");
        }
    };
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Shop</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="pharmacyName"
                        placeholder={'Pharmacy'}
                        label={'Pharmacy name'}
                        disabled={'true'}
                        value={shopData.pharmacyName}
                        onChange={handleShopChange}
                        msg={errors.pharmacyName}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={shopData.contact}
                        onChange={handleShopChange}
                        msg={errors.contact}
                    />
                    <TextField
                        name="website"
                        placeholder={'pharmacy.com'}
                        label={'Website'}
                        value={shopData.website}
                        onChange={handleShopChange}
                        msg={errors.website}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'No - 181, ABC Road, Galle'}
                        label={'Address'}
                        important={"*"}
                        value={shopData.address}
                        onChange={handleShopChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Update'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleSubmit}
                    />
                </div>
            </section>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Users </h3>
            </section>
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        placeholder={'Isuru Dhananjaya'}
                        label={'User\'s name'}
                        important={"*"}
                    />
                    <TextField
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                    />
                    <TextField
                        placeholder={'Admin'}
                        label={'Role'}
                        important={"*"}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        placeholder={'20021010025'}
                        label={'NIC'}
                        important={"*"}
                    />
                    <TextField
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        placeholder={'20021010025'}
                        label={'Password'}
                        type={'password'}
                        important={"*"}
                    />
                    <TextField
                        placeholder={'user123'}
                        label={'Username'}
                        important={"*"}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        placeholder={'No - 181, ABC Road, Galle'}
                        label={'Address'}
                        important={"*"}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'User\'s name'}/>
                    <TextField placeholder={'076 715 1321'} label={'Contact'}/>
                    <TextField placeholder={'Admin'} label={'Role'}/>
                </div>
                <BasicTable/>
            </section>
        </section>
    );
};
