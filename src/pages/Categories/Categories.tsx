import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useState} from "react";
import api from "./api";
import {FooterSpace} from "../FooterSpace/FooterSpace";

export const Categories = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
    });
    type CategoryDataKey = keyof typeof categoryData;

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as CategoryDataKey;

        setCategoryData({
            ...categoryData,
            [typedName]: value,
        });
    };

    const handleCategorySaveEvent = async () => {
        const isSuccess = await api.saveCategory(categoryData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Categories</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Category name'}
                        label={'Category name'}
                        important={"*"}
                        value={categoryData.name}
                        onChange={handleCategoryChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={categoryData.description}
                        onChange={handleCategoryChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleCategorySaveEvent}
                    />
                </div>
            </section>
            <FooterSpace/>
        </section>
    );
};
