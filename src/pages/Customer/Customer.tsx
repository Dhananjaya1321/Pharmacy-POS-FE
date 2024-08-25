import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button";

export const Customer = () => {
    return (
        <section className='h-max flex w-[90%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Customer</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'Customer name'}/>
                    <TextField placeholder={'076 715 1321'} label={'Contact'}/>
                    <TextField placeholder={'isuru@gmail.com'} label={'Email'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'20021010025'} label={'NIC'}/>
                    <HiddenTextField/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea placeholder={'No - 181, ABC Road, Galle'} label={'Address'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
        </section>
    );
};
