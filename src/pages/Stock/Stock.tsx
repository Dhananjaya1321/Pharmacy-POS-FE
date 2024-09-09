import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import React, {ChangeEvent, useEffect, useState} from "react";
import stockAPIController from "../../controller/StockAPIController";

// Define the type for item objects
interface Item {
    id: number;
    name: string;
    categoryName: string;
    brandName: string;
    unitName: string;
    unitSymbology: string;
}

export const Stock = () => {
    const [stockData, setStockData] = useState({
        purchasedAmount: '',
        purchasedQty: '',
        purchasedDiscount: '',
        expiryDate: '',
        description: '',
        item: '',
    });

    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
    // Set the correct type for items
    const [items, setItems] = useState<Item[]>([]);  // <--- Typed the items state

    // Fetch items on component mount
    useEffect(() => {
        const loadItems = async () => {
            const response = await stockAPIController.getAllItems();
            const items = response.data.map((item: {
                id: number;
                name: string;
                category: { name: string };
                brand: { name: string };
                unit: { unitName: string; unitSymbology:string };
            }) => ({
                id: item.id,
                name: item.name,
                categoryName: item.category.name,
                brandName: item.brand.name,
                unitName: item.unit.unitName,
                unitSymbology: item.unit.unitSymbology,
            }));

            setItems(items); // Set fetched items to state
        };

        loadItems();
    }, []);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setStockData({
            ...stockData,
            [name]: value,
        });
    };

    const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const item = event.target.value;
        setSelectedItem(item);
        setStockData(prevData => ({
            ...prevData,
            item: item,
        }));
    };

    const handleStockSaveEvent = async () => {
        const isSuccess = await stockAPIController.saveStock(stockData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Stock</h3>
            </section>
            {/* Form section */}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="purchasedQty"
                        placeholder={'0.00'}
                        label={'Purchased Qty'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedQty}
                        onChange={handleStockChange}
                    />
                    <TextField
                        name="purchasedAmount"
                        placeholder={'0.00'}
                        label={'Purchased Amount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedAmount}
                        onChange={handleStockChange}
                    />
                    <TextField
                        name="purchasedDiscount"
                        placeholder={'0.00'}
                        label={'Purchased discount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedDiscount}
                        onChange={handleStockChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Item</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <select
                            value={selectedItem}
                            name={"item"}
                            onChange={handleItemChange}
                            className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                        >
                            <option value="-1">Select an item</option>
                            {items.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name+'-'+option.brandName+'-'+option.categoryName+'-'+option.unitSymbology+'('+option.unitName+')'}
                                </option>
                            ))}
                        </select>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}></small>
                        </div>
                    </div>
                    <TextField
                        name="expiryDate"
                        label={'Expiry date'}
                        type={'date'}
                        important={"*"}
                        value={stockData.expiryDate}
                        onChange={handleStockChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={stockData.description}
                        onChange={handleStockChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleStockSaveEvent}
                    />
                </div>
            </section>
            <FooterSpace/>
        </section>
    );
};
