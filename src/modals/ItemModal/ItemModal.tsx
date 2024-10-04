import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useState, ChangeEvent} from "react";
import itemAPIController from "../../controller/ItemAPIController"; // Assuming you have an API controller for items

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

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Unit {
    id: number;
    unitName: string;
    unitSymbology: string;
}

interface ItemData {
    id: number;
    name: string;
    description: string;
    reOrderLevel: number;
    category: Category;
    brand: Brand;
    unit: Unit;
}

interface ItemModalProps {
    itemData: ItemData;
    onUpdateItem: (updatedItem: ItemData) => void;
    units: Unit[];
    categories: Category[];
    brands: Brand[];
}

export default function ItemModal({itemData, onUpdateItem, units, categories, brands}: ItemModalProps) {
    const [open, setOpen] = useState(false);
    const [itemDetails, setItemDetails] = useState<ItemData>(itemData);
    const [selectedUnit, setSelectedUnit] = useState<number>(itemData.unit.id);
    const [selectedBrand, setSelectedBrand] = useState<number>(itemData.brand.id);
    const [selectedCategory, setSelectedCategory] = useState<number>(itemData.category.id);

    const [itemErrors, setItemErrors] = useState({
        name: '',
        description: '',
        reOrderLevel: '',
        category: '',
        brand: '',
        unit: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleItemChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setItemDetails(prevState => ({
            ...prevState,
            [name]: name === 'reOrderLevel' ? Number(value) : value
        }));

        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim().length === 0) {
                    error = 'Name is required';
                }
                break;
            case 'reOrderLevel':
                const reorder = Number(value);
                if (isNaN(reorder)) {
                    error = 'Re-order level must be a number';
                } else if (reorder < 0) {
                    error = 'The reorder level cannot be less than zero';
                } else if (reorder >= 90) {
                    error = 'The reorder level cannot exceed 90%';
                }
                break;
            case 'brand':
                if (value === '-1' || value.trim() === '') {
                    error = 'Brand is required';
                }
                break;
            case 'unit':
                if (value === '-1' || value.trim() === '') {
                    error = 'Unit is required';
                }
                break;
            case 'category':
                if (value === '-1' || value.trim() === '') {
                    error = 'Category is required';
                }
                break;
            case 'description':
                if (value.trim().length > 500) {
                    error = 'Description cannot exceed 500 characters';
                }
                break;
            default:
                break;
        }

        setItemErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUnitId = parseInt(e.target.value);
        setSelectedUnit(selectedUnitId);
        const unit = units.find(unit => unit.id === selectedUnitId);
        setItemDetails(prevState => ({
            ...prevState,
            unit: unit || prevState.unit
        }));

        let error = '';
        if (isNaN(selectedUnitId) || selectedUnitId === -1) {
            error = 'Unit is required';
        }

        setItemErrors(prevErrors => ({
            ...prevErrors,
            unit: error,
        }));
    };

    const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedBrandId = parseInt(e.target.value);
        setSelectedBrand(selectedBrandId);
        const brand = brands.find(brand => brand.id === selectedBrandId);
        setItemDetails(prevState => ({
            ...prevState,
            brand: brand || prevState.brand
        }));

        let error = '';
        if (isNaN(selectedBrandId) || selectedBrandId === -1) {
            error = 'Brand is required';
        }

        setItemErrors(prevErrors => ({
            ...prevErrors,
            brand: error,
        }));
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = parseInt(e.target.value);
        setSelectedCategory(selectedCategoryId);
        const category = categories.find(category => category.id === selectedCategoryId);
        setItemDetails(prevState => ({
            ...prevState,
            category: category || prevState.category
        }));

        let error = '';
        if (isNaN(selectedCategoryId) || selectedCategoryId === -1) {
            error = 'Category is required';
        }

        setItemErrors(prevErrors => ({
            ...prevErrors,
            category: error,
        }));
    };

    const handleItemSaveEvent = async () => {
        const validationErrors = {
            name: '',
            description: '',
            reOrderLevel: '',
            category: '',
            brand: '',
            unit: '',
        };

        let isValid = true;

        // Validate each field
        if (itemDetails.name.trim().length === 0) {
            validationErrors.name = 'Name is required';
            isValid = false;
        }

        if (isNaN(itemDetails.reOrderLevel)) {
            validationErrors.reOrderLevel = 'Re-order level must be a number';
            isValid = false;
        } else if (itemDetails.reOrderLevel < 0) {
            validationErrors.reOrderLevel = 'The reorder level cannot be less than zero';
            isValid = false;
        } else if (itemDetails.reOrderLevel >= 90) {
            validationErrors.reOrderLevel = 'The reorder level cannot exceed 90%';
            isValid = false;
        }

        if (selectedBrand === undefined || selectedBrand === -1 || selectedBrand === null) {
            validationErrors.brand = 'Brand is required';
            isValid = false;
        }

        if (selectedCategory === undefined || selectedCategory === -1 || selectedCategory === null) {
            validationErrors.category = 'Category is required';
            isValid = false;
        }

        if (selectedUnit === undefined || selectedUnit === -1 || selectedUnit === null) {
            validationErrors.unit = 'Unit is required';
            isValid = false;
        }

        if (itemDetails.description.trim().length > 500) {
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setItemErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const updatedItemForRequest = {
            id: itemDetails.id,
            name: itemDetails.name,
            description: itemDetails.description,
            reOrderLevel: itemDetails.reOrderLevel,
            category: selectedCategory,
            brand: selectedBrand,
            unit: selectedUnit
        };

        try {
            const isSuccess = await itemAPIController.saveItem(updatedItemForRequest);
            if (isSuccess) {
                const updatedItem: ItemData = {
                    ...itemDetails,
                    unit: units.find(unit => unit.id === selectedUnit) || itemDetails.unit,
                    brand: brands.find(brand => brand.id === selectedBrand) || itemDetails.brand,
                    category: categories.find(category => category.id === selectedCategory) || itemDetails.category,
                };
                onUpdateItem(updatedItem);
                alert("Item updated successfully!");
                handleClose();
            } else {
                alert("Failed to update item.");
            }
        } catch (error) {
            console.error("Error updating item:", error);
            alert("An unexpected error occurred while updating the item.");
        }
    };

    return (
        <div>
            <button
                className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100"
                onClick={handleOpen}
                aria-label="Edit Item"
            >
                <FontAwesomeIcon icon={faPen}/>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button
                        className="absolute top-[15px] right-[15px] text-red-500 hover:text-gray-700 p-2 w-[40px] h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                        aria-label="Close Modal"
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg"/>
                    </button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Item
                    </Typography>
                    <section
                        className='bg-white flex flex-col items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                        <div className='flex flex-col w-full'>
                            <TextField
                                name="name"
                                placeholder="Item name"
                                label="Item name"
                                important="*"
                                value={itemDetails.name}
                                onChange={handleItemChange}
                                msg={itemErrors.name}
                            />
                            <div className='flex flex-row flex-wrap items-center justify-center mt-3'>
                                <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                    <div className='flex flex-row items-center'>
                                        <label className='text-black mr-1'>Unit</label>
                                        <small className='text-red-600 text-[16px]'>*</small>
                                    </div>
                                    <div className="custom-select-wrapper">
                                        <select
                                            value={selectedUnit}
                                            name="unit"
                                            onChange={handleUnitChange}
                                            className='text-input'
                                        >
                                            <option value="-1">Select a unit</option>
                                            {units.map((unit) => (
                                                <option key={unit.id} value={unit.id}>
                                                    {`${unit.unitSymbology} (${unit.unitName})`}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                                    </div>
                                    {itemErrors.unit && (
                                        <small className="text-red-600 block mt-1">{itemErrors.unit}</small>
                                    )}
                                </div>
                                <TextField
                                    name="reOrderLevel"
                                    placeholder="0.00"
                                    label="Re-order level"
                                    important="*"
                                    type="number"
                                    value={itemDetails.reOrderLevel}
                                    onChange={handleItemChange}
                                    msg={itemErrors.reOrderLevel}
                                />
                            </div>
                            <div className='flex flex-row flex-wrap items-center justify-center mt-3'>
                                <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                    <div className='flex flex-row items-center'>
                                        <label className='text-black mr-1'>Brand</label>
                                        <small className='text-red-600 text-[16px]'>*</small>
                                    </div>
                                    <div className="custom-select-wrapper">
                                        <select
                                            value={selectedBrand}
                                            name="brand"
                                            onChange={handleBrandChange}
                                            className='text-input'
                                        >
                                            <option value="-1">Select a brand</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                                    </div>
                                    {itemErrors.brand && (
                                        <small className="text-red-600 block mt-1">{itemErrors.brand}</small>
                                    )}
                                </div>
                                <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                    <div className='flex flex-row items-center'>
                                        <label className='text-black mr-1'>Category</label>
                                        <small className='text-red-600 text-[16px]'>*</small>
                                    </div>
                                    <div className="custom-select-wrapper">
                                        <select
                                            value={selectedCategory}
                                            name="category"
                                            onChange={handleCategoryChange}
                                            className='text-input'
                                        >
                                            <option value="-1">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                                    </div>
                                    {itemErrors.category && (
                                        <small className="text-red-600 block mt-1">{itemErrors.category}</small>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-row flex-wrap items-center justify-center mt-3'>
                                <TextArea
                                    name="description"
                                    placeholder="Description"
                                    label="Description"
                                    value={itemDetails.description}
                                    onChange={handleItemChange}
                                    msg={itemErrors.description}
                                />
                            </div>
                            <div className='flex flex-row flex-wrap items-center justify-end mt-5 w-full'>
                                <Button
                                    name="Update"
                                    color="bg-[#2FEB00]"
                                    onClick={handleItemSaveEvent}
                                />
                            </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
