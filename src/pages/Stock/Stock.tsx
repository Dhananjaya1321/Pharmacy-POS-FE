import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import React, {ChangeEvent, useState} from "react";
import api from "./api";

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

    type StockDataKey = keyof typeof stockData;

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as StockDataKey;

        setStockData({
            ...stockData,
            [typedName]: value,
        });
    };

    const fetchItems = async () => {
        const response = await api.getAllItems();

        const items = response.data.map((item: { id: number; name: string }) => ({
            id: item.id,
            name: item.name,
        }));

        return items;
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
        const isSuccess = await api.saveStock(
            stockData);
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
            {/*url display section*/}
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
                    <TextFieldWithButton
                        name="item"
                        label={'Item'}
                        important={"*"}
                        value={selectedItem}
                        onChange={handleItemChange}
                        fetchOptions={fetchItems}  // Fetch options dynamically
                    />
                    <TextField
                        name="expiryDate"
                        label={'Expiry date'}
                        type={'date'}
                        important={"*"}
                        value={stockData.expiryDate}
                        onChange={handleStockChange}
                    />
                    <HiddenTextField/>
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
