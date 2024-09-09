import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import React, {ChangeEvent, useEffect, useState} from "react";
import itemAPIController from "../../controller/ItemAPIController";

interface Unit {
    id: number;
    unitName: string;
    unitSymbology: string;
}

export const Items = () => {
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        reOrderLevel: '',
        category: '',
        brand: '',
        unit: '',
    });

    const [selectedUnit, setSelectedUnit] = useState<string | undefined>(undefined);
    // Set the correct type for items
    const [units, setUnit] = useState<Unit[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadUnits = async () => {
            const response = await itemAPIController.getAllUnits();
            const units = response.data.map((unit: {
                id: number;
                unitName: string;
                unitSymbology:string;
            }) => ({
                id:unit.id,
                unitName: unit.unitName,
                unitSymbology: unit.unitSymbology,
            }));

            setUnit(units);
        };

        loadUnits();
    }, []);

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const unit = event.target.value;
        setSelectedUnit(unit);
        setItemData(prevData => ({
            ...prevData,
            unit: unit,
        }));
    };

    const fetchBrands = async () => {
        const response = await itemAPIController.getAllBrands();

        const brands = response.data.map((brand: { id: number; name: string }) => ({
            id: brand.id,
            name: brand.name,
        }));
        console.log(brands)
        return brands;
    };
    const fetchCategories = async () => {
        const response = await itemAPIController.getAllCategories();

        const categories = response.data.map((category: { id: number; name: string }) => ({
            id: category.id,
            name: category.name,
        }));
        console.log(categories)

        return categories;
    };

    const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setItemData(prevData => ({
            ...prevData,
            brand: brand,
        }));
    };
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setItemData(prevData => ({
            ...prevData,
            category: category,
        }));
    };

    const handleItemSaveEvent = async () => {
        const isSuccess = await itemAPIController.saveItem(itemData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Items</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Item name'}
                        label={'Item name'}
                        important={"*"}
                        value={itemData.name}
                        onChange={handleItemChange}
                    />
                    <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Unit</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <select
                            value={selectedUnit}
                            name={"unit"}
                            onChange={handleUnitChange}
                            className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                        >
                            <option value="-1">Select an unit</option>
                            {units.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.unitSymbology + ' (' + option.unitName + ')'}
                                </option>
                            ))}
                        </select>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}></small>
                        </div>
                    </div>
                    <TextField
                        name="reOrderLevel"

                        placeholder={'0.00'}
                        label={'Re-order level'}
                        important={"*"}
                        value={itemData.reOrderLevel}
                        onChange={handleItemChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextFieldWithButton
                        name="brand"
                        label={'Brand'}
                        important={"*"}
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        fetchOptions={fetchBrands}
                    />
                    <TextFieldWithButton
                        name="category"
                        label={'Category'}
                        important={"*"}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        fetchOptions={fetchCategories}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={itemData.description}
                        onChange={handleItemChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleItemSaveEvent}
                    />
                </div>
            </section>
            <FooterSpace/>
        </section>
    );
};
