import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "../../component/TextField/TextFild";
import { TextArea } from "../../component/TextArea/TextArea";
import { Button } from "../../component/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, ChangeEvent } from "react";
import itemAPIController from "../../controller/ItemAPIController"; // Assuming you have an API controller for items
import { TextFieldWithButton } from "../../component/TextFieldWithButton/TextFieldWithButton";
import { HiddenTextField } from "../../component/HiddenTextField/HiddenTextField";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #006CAF',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

interface ItemModalProps {
    itemData: {
        id: number;
        name: string;
        description: string;
        reOrderLevel: number;
        category: {
            id: number;
            name: string
        };
        brand: {
            id: number;
            name: string
        };
        unit: {
            id: number;
            unitName: string;
            unitSymbology: string;
        };
    };
    onUpdateItem: (updatedItem: {
        id: number;
        name: string;
        description: string;
        reOrderLevel: number;
        category: {
            id: number;
            name: string
        };
        brand: {
            id: number;
            name: string
        };
        unit: {
            id: number;
            unitName: string;
            unitSymbology: string;
        };
    }) => void;
    units: { id: number; unitName: string; unitSymbology: string }[];
    categories: { id: number; name: string }[];
    brands: { id: number; name: string }[];
}

export default function ItemModal({ itemData, onUpdateItem, units, categories, brands }: ItemModalProps) {
    const [open, setOpen] = useState(false);
    const [itemDetails, setItemDetails] = useState(itemData);
    const [selectedUnit, setSelectedUnit] = useState<number | undefined>(itemData.unit.id);
    const [selectedBrand, setSelectedBrand] = useState<number | undefined>(itemData.brand.id);
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(itemData.category.id);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleItemChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItemDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUnitId = parseInt(e.target.value);
        setSelectedUnit(selectedUnitId);
        setItemDetails(prevState => ({
            ...prevState,
            unit: units.find(unit => unit.id === selectedUnitId) || prevState.unit
        }));
    };

    const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedBrandId = parseInt(e.target.value);
        setSelectedBrand(selectedBrandId);
        setItemDetails(prevState => ({
            ...prevState,
            brand: brands.find(brand => brand.id === selectedBrandId) || prevState.brand
        }));
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = parseInt(e.target.value);
        setSelectedCategory(selectedCategoryId);
        setItemDetails(prevState => ({
            ...prevState,
            category: categories.find(category => category.id === selectedCategoryId) || prevState.category
        }));
    };

    const handleItemSaveEvent = async () => {
        const updatedItemForRequest = {
            id: itemDetails.id,
            name: itemDetails.name,
            description: itemDetails.description,
            reOrderLevel: itemDetails.reOrderLevel,
            category: selectedCategory,
            brand: selectedBrand,
            unit: selectedUnit
        };
        const isSuccess = await itemAPIController.saveItem(updatedItemForRequest);
        if (isSuccess) {
            const updatedItem = {
                ...itemDetails,
                unit: units.find(unit => unit.id === selectedUnit) || itemDetails.unit,
                brand: brands.find(brand => brand.id === selectedBrand) || itemDetails.brand,
                category: categories.find(category => category.id === selectedCategory) || itemDetails.category,
            };
            onUpdateItem(updatedItem);
            alert("Item updated successfully!");
        } else {
            alert("Failed to update item.");
        }
        handleClose();
    };

    return (
        <div>
            <button className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100" onClick={handleOpen}>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <button
                        className="absolute top-[15px] right-[15px] text-red-500 hover:text-gray-700 p-2 w-[40px] h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Item
                    </Typography>
                    <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="name"
                                placeholder="Item name"
                                label="Item name"
                                important="*"
                                value={itemDetails.name}
                                onChange={handleItemChange}
                            />
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Unit</label>
                                    <small className='text-red-600 text-[16px]'>*</small>
                                </div>
                                <select
                                    value={selectedUnit}
                                    name="unit"
                                    onChange={handleUnitChange}
                                    className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                                >
                                    <option value="-1">Select a unit</option>
                                    {units.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.unitSymbology + ' (' + unit.unitName + ')'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <TextField
                                name="reOrderLevel"
                                placeholder="0.00"
                                label="Re-order level"
                                important="*"
                                type="number"
                                value={itemDetails.reOrderLevel}
                                onChange={handleItemChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Brand</label>
                                    <small className={`text-red-600 text-[16px]`}>*</small>
                                </div>
                                <select
                                    value={selectedBrand}
                                    name={"brand"}
                                    onChange={handleBrandChange}
                                    className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                                >
                                    <option value="-1">Select an brand</option>
                                    {brands.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <div className={`h-[5px]`}>
                                    <small className={`text-start text-red-600 block`}></small>
                                </div>
                            </div>
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Category</label>
                                    <small className={`text-red-600 text-[16px]`}>*</small>
                                </div>
                                <select
                                    value={selectedCategory}
                                    name={"category"}
                                    onChange={handleCategoryChange}
                                    className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                                >
                                    <option value="-1">Select an category</option>
                                    {categories.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <div className={`h-[5px]`}>
                                    <small className={`text-start text-red-600 block`}></small>
                                </div>
                            </div>
                            <HiddenTextField/>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextArea
                                name="description"
                                placeholder="Description"
                                label="Description"
                                value={itemDetails.description}
                                onChange={handleItemChange}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                            <Button
                                name="Update"
                                color="bg-[#2FEB00]"
                                onClick={handleItemSaveEvent}
                            />
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
