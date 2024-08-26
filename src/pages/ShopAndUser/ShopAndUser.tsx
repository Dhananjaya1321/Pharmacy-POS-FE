import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";

export const ShopAndUser = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Shop</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Pharmacy'} label={'Pharmacy name'} disabled={'true'}/>
                    <TextField placeholder={'076 715 1321'} label={'Contact'}/>
                    <TextField placeholder={'pharmacy.com'} label={'Website'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea placeholder={'No - 181, ABC Road, Galle'} label={'Address'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Update'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Users </h3>
            </section>
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'User\'s name'}/>
                    <TextField placeholder={'076 715 1321'} label={'Contact'}/>
                    <TextField placeholder={'Admin'} label={'Role'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'20021010025'} label={'NIC'}/>
                    <TextField placeholder={'supplier@gmail.com'} label={'Email'}/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'20021010025'} label={'Password'} type={'password'}/>
                    <TextField placeholder={'user123'} label={'Username'}/>
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
