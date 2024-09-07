import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
// @ts-ignore
import BasicTable from "../../component/BasicTable/BasicTable";
import React, {ChangeEvent, useEffect, useState} from 'react';
// @ts-ignore
import api from "./api";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";

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
        name: '',
        contact: '',
        role: '',
        nic: '',
        email: '',
        password: '',
        username: '',
        address: '',
    });

    // State for managing the selected role
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

    type ShopDataKey = keyof typeof shopData;
    type UsersDataKey = keyof typeof userData;

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

    // Function to handle role changes
    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const role = event.target.value;
        setSelectedRole(role);
        setUserData(prevData => ({
            ...prevData,
            role: role,  // Update userData with the selected role
        }));
    };

    const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
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

        const isSuccess = await api.updateShopData(shopData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };
    const handleUserSave = async () => {
        console.log(userData.role)
        const isSuccess = await api.saveUser(userData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    interface Role {
        id: number;
        name: string;
    }

    const fetchUserRoles = async () => {
        const response = await api.getAllUserRoles();

        const roles = response.data.map((role: { id: number; name: string }) => ({
            id: role.id,
            name: role.name,
        }));

        return roles;
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
                        name="name"
                        placeholder={'Isuru Dhananjaya'}
                        label={'User\'s name'}
                        important={"*"}
                        value={userData.name}
                        onChange={handleUsersChange}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={userData.contact}
                        onChange={handleUsersChange}
                    />
                    <TextFieldWithButton
                        name="role"
                        label={'Role'}
                        important={"*"}
                        value={selectedRole}  // Add this line if you're managing the selected role value in state
                        onChange={handleRoleChange}  // Add this line for handling role changes
                        fetchOptions={fetchUserRoles}  // Fetch options dynamically
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name={'nic'}
                        placeholder={'20021010025'}
                        label={'NIC'}
                        important={"*"}
                        value={userData.nic}
                        onChange={handleUsersChange}
                    />
                    <TextField
                        name={'email'}
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                        value={userData.email}
                        onChange={handleUsersChange}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name={'password'}
                        placeholder={'20021010025'}
                        label={'Password'}
                        type={'password'}
                        important={"*"}
                        value={userData.password}
                        onChange={handleUsersChange}
                    />
                    <TextField
                        name={'username'}
                        placeholder={'user123'}
                        label={'Username'}
                        important={"*"}
                        value={userData.username}
                        onChange={handleUsersChange}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name={'address'}
                        placeholder={'No - 181, ABC Road, Galle'}
                        label={'Address'}
                        important={"*"}
                        value={userData.address}
                        onChange={handleUsersChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'} onClick={handleUserSave}/>
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
