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
import userAPIController from "../../controller/UserAPIController";
import stockAPIController from "../../controller/StockAPIController";

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

interface StockModalProps {
    stockData: {
        id: number;
        purchasedAmount: number;
        purchasedQty: number;
        purchasedDiscount: number;
        availableQty: number;
        expiryDate: string;
        description: string;
        item: {
            id: number;
            name: string;
            category: { name: string };
            brand: { name: string };
            unit: { unitName: string; unitSymbology: string };
        };
    };
    onUpdateStock: (updatedStock: {
        id: number;
        purchasedAmount: number;
        purchasedQty: number;
        purchasedDiscount: number;
        availableQty: number;
        expiryDate: string;
        description: string;
        item: {
            id: number;
            name: string;
            category: { name: string };
            brand: { name: string };
            unit: { unitName: string; unitSymbology: string };
        };
    }) => void;
    items: {
        id: number;
        name: string;
        category: { name: string };
        brand: { name: string };
        unit: { unitName: string; unitSymbology: string };
    }[];  // Array of available items for dropdown
}

export default function StockModal({stockData, onUpdateStock, items}: StockModalProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState<number | undefined>(stockData.item.id);
    const [stockDetails, setStockDetails] = useState(stockData);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setStockDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedItemId = parseInt(e.target.value);
        setSelectedItem(selectedItemId);
        setStockDetails(prevState => ({
            ...prevState,
            item: {...prevState.item, id: selectedItemId}
        }));
    };

    const handleStockSaveEvent = async () => {
        const updatedStockForRequest = {
            id: stockDetails.id,
            purchasedAmount: stockDetails.purchasedAmount,
            purchasedQty: stockDetails.purchasedQty,
            purchasedDiscount: stockDetails.purchasedDiscount,
            availableQty: stockDetails.availableQty,
            expiryDate: stockDetails.expiryDate,
            description: stockDetails.description,
            item: selectedItem
        };

        const isSuccess = await stockAPIController.saveStock(updatedStockForRequest);
        if (isSuccess) {
            const updatedStock = {
                ...stockDetails,
                item: items.find(item => item.id === selectedItem) || stockData.item
            };
            onUpdateStock(updatedStock);
            alert("Stock updated successfully!");
        } else {
            alert("Failed to update user.");
        }
        handleClose();
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
                                placeholder="0.00"
                                label="Purchased Qty"
                                type="number"
                                important="*"
                                value={stockDetails.purchasedQty}
                                onChange={handleStockChange}
                            />
                            <TextField
                                name="purchasedAmount"
                                placeholder="0.00"
                                label="Purchased Amount"
                                type="number"
                                important="*"
                                value={stockDetails.purchasedAmount}
                                onChange={handleStockChange}
                            />
                            <TextField
                                name="purchasedDiscount"
                                placeholder="0.00"
                                label="Purchased Discount"
                                type="number"
                                important="*"
                                value={stockDetails.purchasedDiscount}
                                onChange={handleStockChange}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <div className="grow mx-3 my-3 gap-1 flex flex-col justify-start">
                                <div className="flex flex-row">
                                    <label className="text-black flex justify-start">Item</label>
                                    <small className="text-red-600 text-[16px]">*</small>
                                </div>
                                <select
                                    value={selectedItem}
                                    name="item"
                                    onChange={handleItemChange}
                                    className="min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3"
                                >
                                    <option value="-1">Select an item</option>
                                    {items.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name+'-'+option.brand.name+'-'+option.category.name+'-'+option.unit.unitSymbology+'('+option.unit.unitName+')'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <TextField
                                name="expiryDate"
                                label="Expiry Date"
                                type="date"
                                important="*"
                                value={stockDetails.expiryDate}
                                onChange={handleStockChange}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center w-full">
                            <TextArea
                                name="description"
                                placeholder="Description"
                                label="Description"
                                value={stockDetails.description}
                                onChange={handleStockChange}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-end w-full">
                            <Button name="Save" color="bg-[#2FEB00]" onClick={handleStockSaveEvent}/>
                        </div>
                    </section>
                </Box>
            </Modal>
        </div>
    );
}
