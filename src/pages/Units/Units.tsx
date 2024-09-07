import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useState} from "react";
import api from "./api";

export const Units = () => {
    const [unitData, setUnitData] = useState({
        unitName: '',
        unitSymbology: '',
        description: '',
    });
    type UnitDataKey = keyof typeof unitData;

    const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as UnitDataKey;

        setUnitData({
            ...unitData,
            [typedName]: value,
        });
    };

    const handleUnitSaveEvent = async () => {
        const isSuccess = await api.saveUnit(
            unitData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Units</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="unitName"
                        placeholder={'Kilogram'}
                        label={'Unit name'}
                        important={"*"}
                        value={unitData.unitName}
                        onChange={handleUnitChange}
                    />
                    <TextField
                        name="unitSymbology"
                        placeholder={'kg'}
                        label={'Unit symbology'}
                        important={"*"}
                        value={unitData.unitSymbology}
                        onChange={handleUnitChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={unitData.description}
                        onChange={handleUnitChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleUnitSaveEvent}
                    />
                </div>
            </section>
        </section>
    );
};
