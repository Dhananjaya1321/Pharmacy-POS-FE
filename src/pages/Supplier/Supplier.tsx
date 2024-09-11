import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {Footer} from "../Footer/Footer";
import React, {useState} from "react";
import supplierAPIController from "../../controller/SupplierAPIController";

export const Supplier = () => {
    const [supplierData, setSupplierData] = useState({
        name: '',
        contact: '',
        website: '',
        nic: '',
        email: '',
        description: '',
    });
    type SupplerDataKey = keyof typeof supplierData;

    const handleSupplerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as SupplerDataKey;

        setSupplierData({
            ...supplierData,
            [typedName]: value,
        });
    };

    const handleSupplierSaveEvent = async () => {
        const isSuccess = await supplierAPIController.saveSupplier(
            supplierData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Suppliers</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Isuru Dhananjaya'}
                        label={'Supplier name'}
                        important={"*"}
                        value={supplierData.name}
                        onChange={handleSupplerChange}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={supplierData.contact}
                        onChange={handleSupplerChange}
                    />
                    <TextField
                        name="website"
                        placeholder={'supplier.com'}
                        label={'Website'}
                        value={supplierData.website}
                        onChange={handleSupplerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="nic"
                        placeholder={'20021010025'}
                        label={'NIC'}
                        important={"*"}
                        value={supplierData.nic}
                        onChange={handleSupplerChange}
                    />
                    <TextField
                        name="email"
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                        value={supplierData.email}
                        onChange={handleSupplerChange}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description about supplier'}
                        label={'Description'}
                        value={supplierData.description}
                        onChange={handleSupplerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleSupplierSaveEvent}
                    />
                </div>
            </section>
            <FooterSpace/>
            <Footer/>
        </section>
    );
};
