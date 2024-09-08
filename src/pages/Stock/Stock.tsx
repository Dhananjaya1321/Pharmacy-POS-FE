import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {FooterSpace} from "../FooterSpace/FooterSpace";

export const Stock = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Stock</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        placeholder={'0.00'}
                        label={'Purchased Qty'}
                        type={'number'}
                        important={"*"}
                    />
                    <TextField
                        placeholder={'0.00'}
                        label={'Purchased Amount'}
                        type={'number'}
                        important={"*"}
                    />
                    <TextField
                        placeholder={'0.00'}
                        label={'Purchased discount'}
                        type={'number'}
                        important={"*"}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextFieldWithButton label={'Item'} important={"*"}/>
                    <TextField label={'Expiry date'} type={'date'} important={"*"}/>
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
