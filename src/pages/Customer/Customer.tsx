import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
// @ts-ignore
import api from "./api";
import React, {useState} from "react";

export const Customer = () => {
    const [customerData, setCustomerData] = useState({
        name: '',
        contact: '',
        email: '',
        nic: '',
        address: '',
    });
    type CustomerDataKey = keyof typeof customerData;

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as CustomerDataKey;

        setCustomerData({
            ...customerData,
            [typedName]: value,
        });
    };

    const handleCustomerSaveEvent = async () => {
        const isSuccess = await api.saveCustomer(customerData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };


    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Customer</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Isuru Dhananjaya'}
                        label={'Customer name'}
                        important={"*"}
                        value={customerData.name}
                        onChange={handleCustomerChange}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={customerData.contact}
                        onChange={handleCustomerChange}
                    />
                    <TextField
                        name="email"
                        placeholder={'isuru@gmail.com'}
                        label={'Email'}
                        value={customerData.email}
                        onChange={handleCustomerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="nic"
                        placeholder={'20021010025'}
                        label={'NIC'}
                        value={customerData.nic}
                        onChange={handleCustomerChange}
                    />
                    <HiddenTextField/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'No - 181, ABC Road, Galle'}
                        label={'Address'}
                        value={customerData.address}
                        onChange={handleCustomerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleCustomerSaveEvent}
                    />
                </div>
            </section>
        </section>
    );
};
