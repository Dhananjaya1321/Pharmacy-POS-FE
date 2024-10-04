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
import stockAPIController from "../../controller/StockAPIController";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";

const style = {
    position: 'absolute' as const,
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

interface Item {
    id: number;
    name: string;
    category: { name: string };
    brand: { name: string };
    unit: { unitName: string; unitSymbology: string };
}

interface StockData {
    id: number;
    purchasedAmount: number;
    purchasedQty: number;
    purchasedDiscount: number;
    availableQty: number;
    purchasePricePerUnit: number;
    sellingPricePerUnit: number;
    sellingDiscountPerUnit: number;
    totalAmount: number;
    expiryDate: string;
    description: string;
    item: Item;
}

interface StockModalProps {
    stockData: StockData;
    onUpdateStock: (updatedStock: StockData) => void;
    items: Item[];  // Array of available items for dropdown
}

export default function StockModal({stockData, onUpdateStock, items}: StockModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number>(stockData.item.id);
    const [stockDetails, setStockDetails] = useState<StockData>({
        ...stockData,
        item: stockData.item // Initialize with the existing item
    });
    const [stockErrors, setStockErrors] = useState<Partial<Record<keyof StockData, string>>>({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setStockDetails(prevState => ({
            ...prevState,
            [name]: name === 'expiryDate' ? value : (name === 'description' ? value : Number(value))
        }));

        // Validate the input
        validateField(name as keyof StockData, value);
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItemId = parseInt(e.target.value, 10);
        setSelectedItemId(selectedItemId);

        let error = '';
        if (isNaN(selectedItemId) || selectedItemId === -1) {
            error = 'Item is required';
        }

        setStockErrors(prevErrors => ({
            ...prevErrors,
            item: error,
        }));
    };

    const validateField = (fieldName: keyof StockData, value: string) => {
        let error = '';

        switch (fieldName) {
            case 'purchasedQty':
                if (Number(value) <= 0) {
                    error = 'Purchased Qty cannot be 0 or less than 0';
                }
                break;
            case 'purchasePricePerUnit':
                if (Number(value) <= 0) {
                    error = 'The purchase price cannot be 0 or less than 0 per unit';
                }
                break;
            case 'purchasedDiscount':
                const discount = Number(value);
                if (discount < 0) {
                    error = 'The purchase discount cannot be less than 0';
                } else if (discount > 100) {
                    error = 'The purchase discount cannot be greater than 100';
                }
                break;
            case 'sellingPricePerUnit':
                if (Number(value) <= 0) {
                    error = 'The selling price must be greater than 0';
                } else if (Number(value) < stockDetails.purchasePricePerUnit) {
                    error = 'The selling price cannot be lower than the purchase price per unit';
                }
                break;
            case 'sellingDiscountPerUnit':
                const sellingDiscount = Number(value);
                const adjustedPrice = stockDetails.purchasePricePerUnit - (stockDetails.purchasePricePerUnit * (sellingDiscount / 100));
                if (adjustedPrice < stockDetails.purchasePricePerUnit) {
                    error = 'After applying the sales discount, the price per unit cannot be less than the purchase price';
                }
                break;
            case 'expiryDate':
                const today = new Date().setHours(0, 0, 0, 0);
                const selectedDate = new Date(value).setHours(0, 0, 0, 0);

                if (!value) {
                    error = 'Expiry date is required';
                } else if (selectedDate < today) {
                    error = 'Expiry date cannot be in the past';
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

        setStockErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };


    const handleStockSaveEvent = async () => {
        const validationErrors = {
            purchasedAmount: '',
            purchasedQty: '',
            purchasedDiscount: '',
            availableQty: '',
            purchasePricePerUnit: '',
            sellingPricePerUnit: '',
            sellingDiscountPerUnit: '',
            totalAmount: '',
            expiryDate: '',
            description: '',
            item: '',
        };

        let isValid = true;

        // Validate purchasedQty
        if (stockDetails.purchasedQty <= 0) {
            validationErrors.purchasedQty = 'Purchased Qty cannot be 0 or less than 0';
            isValid = false;
        }

        // Validate purchasePricePerUnit
        if (stockDetails.purchasePricePerUnit <= 0) {
            validationErrors.purchasePricePerUnit = 'The purchase price cannot be 0 or less than 0 per unit';
            isValid = false;
        }

        // Validate purchasedDiscount
        if (stockDetails.purchasedDiscount < 0) {
            validationErrors.purchasedDiscount = 'The purchase discount cannot be less than 0';
            isValid = false;
        } else if (stockDetails.purchasedDiscount > 100) {
            validationErrors.purchasedDiscount = 'The purchase discount cannot be greater than 100';
            isValid = false;
        }

        // Validate sellingPricePerUnit
        if (stockDetails.sellingPricePerUnit <= 0) {
            validationErrors.sellingPricePerUnit = 'The selling price must be greater than 0';
            isValid = false;
        } else if (stockDetails.sellingPricePerUnit < stockDetails.purchasePricePerUnit) {
            validationErrors.sellingPricePerUnit = 'The selling price cannot be lower than the purchase price per unit';
            isValid = false;
        }

        // Validate sellingDiscountPerUnit
        const adjustedPrice = stockDetails.purchasePricePerUnit - (stockDetails.purchasePricePerUnit * (stockDetails.sellingDiscountPerUnit / 100));
        if (adjustedPrice < stockDetails.purchasePricePerUnit) {
            validationErrors.sellingDiscountPerUnit = 'After applying the sales discount, the price per unit cannot be less than the purchase price';
            isValid = false;
        }

        // Validate item
        if (isNaN(selectedItemId) || selectedItemId === -1) {
            validationErrors.item = 'Item is required';
            isValid = false;
        }

        // Validate expiryDate
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(stockDetails.expiryDate).setHours(0, 0, 0, 0);

        if (!stockDetails.expiryDate) {
            validationErrors.expiryDate = 'Expiry date is required';
            isValid = false;
        } else if (selectedDate < today) {
            validationErrors.expiryDate = 'Expiry date cannot be in the past';
            isValid = false;
        }

        // Validate description
        if (stockDetails.description.trim().length > 500) {
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        // Find the selected item object from items array
        const selectedItem = items.find(item => item.id === selectedItemId);
        if (!selectedItem) {
            validationErrors.item = 'Item is required';
            isValid = false;
        }

        setStockErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }


        if (selectedItem) {
            const updatedStock: StockData = {
                ...stockDetails,
                item: selectedItem,
            };

            try {
                const formattedStockUpdate = {
                    id: stockDetails.id,
                    purchasedAmount: stockDetails.purchasedAmount,
                    purchasedQty: stockDetails.purchasedQty,
                    purchasedDiscount: stockDetails.purchasedDiscount,
                    availableQty: stockDetails.availableQty,
                    purchasePricePerUnit: stockDetails.purchasePricePerUnit,
                    sellingPricePerUnit: stockDetails.sellingPricePerUnit,
                    sellingDiscountPerUnit: stockDetails.sellingDiscountPerUnit,
                    totalAmount: stockDetails.totalAmount,
                    expiryDate: stockDetails.expiryDate,
                    description: stockDetails.description,
                    item: selectedItemId
                }
                const isSuccess = await stockAPIController.saveStock(formattedStockUpdate);
                if (isSuccess) {
                    onUpdateStock(updatedStock);
                    alert("Stock updated successfully!");
                    handleClose();
                } else {
                    alert("Failed to update stock.");
                }
            } catch (error) {
                console.error("Error updating stock:", error);
                alert("An error occurred while updating the stock.");
            }
        }
    };


    return (
        <div>
            <button className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100" onClick={handleOpen}>
                <FontAwesomeIcon icon={faPen}/>
            </button>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <button
                        className="absolute top-[15px] right-[15px] text-red-500 hover:text-gray-700 p-2 w-[40px] h-[40px] bg-white shadow-lg rounded-lg flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg"/>
                    </button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Stock
                    </Typography>
                    <section
                        className="bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md">
                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <TextField
                                name="purchasedQty"
                                placeholder={'0.00'}
                                label={'Purchased Qty'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.purchasedQty}
                                onChange={handleStockChange}
                                msg={stockErrors.purchasedQty}
                            />
                            <TextField
                                name="purchasePricePerUnit"
                                placeholder={'0.00'}
                                label={'Purchased Price Per Unit'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.purchasePricePerUnit}
                                onChange={handleStockChange}
                                msg={stockErrors.purchasePricePerUnit}
                            />
                            <TextField
                                name="purchasedAmount"
                                placeholder={'0.00'}
                                label={'Purchased Amount'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.purchasedAmount}
                                onChange={handleStockChange}
                                msg={stockErrors.purchasedAmount}
                            />
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="purchasedDiscount"
                                placeholder={'0.00'}
                                label={'Purchased discount'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.purchasedDiscount}
                                onChange={handleStockChange}
                                msg={stockErrors.purchasedDiscount}
                            />
                            <TextField
                                name="totalAmount"
                                placeholder={'0.00'}
                                label={'Total Amount'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.totalAmount}
                                onChange={handleStockChange}
                                msg={stockErrors.totalAmount}
                            />
                            <HiddenTextField/>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="sellingPricePerUnit"
                                placeholder={'0.00'}
                                label={'Selling Price Per Unit'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.sellingPricePerUnit}
                                onChange={handleStockChange}
                                msg={stockErrors.sellingPricePerUnit}
                            />
                            <TextField
                                name="sellingDiscountPerUnit"
                                placeholder={'0.00'}
                                label={'Selling Discount Per Unit'}
                                type={'number'}
                                important={"*"}
                                value={stockDetails.sellingDiscountPerUnit}
                                onChange={handleStockChange}
                                msg={stockErrors.sellingDiscountPerUnit}
                            />
                            <HiddenTextField/>
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <div className="flex-grow-[3.8] mx-3 my-3 gap-1 flex flex-col justify-start">
                                <div className="flex flex-row">
                                    <label className="text-black flex justify-start">Item</label>
                                    <small className="text-red-600 text-[16px]">*</small>
                                </div>
                                <div className="custom-select-wrapper">
                                    <select
                                        value={selectedItemId}
                                        name="item"
                                        onChange={handleItemChange}
                                        className='text-input'
                                    >
                                        <option value="-1">Select an item</option>
                                        {items.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name + '-' + option.brand.name + '-' + option.category.name + '-' + option.unit.unitSymbology + '(' + option.unit.unitName + ')'}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="custom-arrow"></span> {/* Custom dropdown arrow */}
                                </div>
                                <div className={`h-[5px]`}>
                                    <small className={`text-start text-red-600 block`}>{stockErrors.item}</small>
                                </div>
                            </div>
                            <TextField
                                name="expiryDate"
                                label="Expiry Date"
                                type="date"
                                important="*"
                                value={stockDetails.expiryDate}
                                onChange={handleStockChange}
                                msg={stockErrors.expiryDate}
                            />
                        </div>

                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <TextArea
                                name="description"
                                placeholder="Description"
                                label="Description"
                                value={stockDetails.description}
                                onChange={handleStockChange}
                                msg={stockErrors.description}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-end w-full">
                            <Button name="Update" color="bg-[#2FEB00]" onClick={handleStockSaveEvent}/>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
