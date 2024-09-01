import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";

export const Supplier = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Suppliers</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'Supplier name'} important={"*"}/>
                    <TextField placeholder={'076 715 1321'} label={'Contact'} important={"*"}/>
                    <TextField placeholder={'supplier.com'} label={'Website'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'20021010025'} label={'NIC'} important={"*"}/>
                    <TextField placeholder={'supplier@gmail.com'} label={'Email'} important={"*"}/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea placeholder={'Description about supplier'} label={'Description'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
        </section>
    );
};
