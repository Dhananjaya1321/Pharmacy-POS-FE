import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {Footer} from "../Footer/Footer";
import {FooterSpace} from "../FooterSpace/FooterSpace";

export const Items = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Items</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Item name'} label={'Item name'} important={"*"}/>
                    <TextFieldWithButton label={'Unit'} important={"*"}/>
                    <TextField placeholder={'0.00'} label={'Re-order level'} important={"*"}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextFieldWithButton label={'Brand'} important={"*"}/>
                    <TextFieldWithButton label={'Category'} important={"*"}/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea placeholder={'Description'} label={'Description'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
            <FooterSpace/>
        </section>
    );
};
