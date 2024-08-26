import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import UnitModal from "../../component/UnitModal";

export const Stock = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Stock</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'0.00'} label={'Purchased Qty'} type={'number'}/>
                    <TextField placeholder={'0.00'} label={'Purchased Amount'} type={'number'}/>
                    <TextField placeholder={'0.00'} label={'Purchased discount'} type={'number'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextFieldWithButton label={'Item'}/>
                    <TextField placeholder={'077 752 0000'} label={'Expiry date'} type={'date'}/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea placeholder={'Address'} label={'Address'}/>
                    <TextArea placeholder={'Description'} label={'Description'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
        </section>
    );
};
