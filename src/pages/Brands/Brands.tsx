import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useState} from "react";
import api from "./api";

export const Brands = () => {
    const [brandData, setBrandData] = useState({
        name: '',
        contact: '',
        website: '',
        address: '',
        description: '',
    });
    type BrandDataKey = keyof typeof brandData;

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as BrandDataKey;

        setBrandData({
            ...brandData,
            [typedName]: value,
        });
    };

    const handleBrandSaveEvent = async () => {
        const isSuccess = await api.saveUnit(
            brandData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Brands</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Brand name'}
                        label={'Brand name'} important={"*"}
                        value={brandData.name}
                        onChange={handleBrandChange}
                    />
                    <TextField
                        name="contact"
                        placeholder={'077 752 0000'}
                        label={'Contact'} important={"*"}
                        value={brandData.contact}
                        onChange={handleBrandChange}
                    />
                    <TextField
                        name="website"
                        placeholder={'brand.com'}
                        label={'Website'}
                        value={brandData.website}
                        onChange={handleBrandChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'Address'}
                        label={'Address'}
                        value={brandData.address}
                        onChange={handleBrandChange}
                    />
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={brandData.description}
                        onChange={handleBrandChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleBrandSaveEvent}
                    />
                </div>
            </section>
        </section>
    );
};
