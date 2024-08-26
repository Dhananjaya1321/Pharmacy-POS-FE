import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";

export const Units = () => {
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Units</h3>
            </section>
            {/*url display section*/}
            <section className='flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Unit name'} label={'Unit name'}/>
                    <TextField placeholder={'Unit symbology'} label={'Unit symbology'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea placeholder={'Description'} label={'Description'}/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button name={'Save'} color={'bg-[#2FEB00]'}/>
                </div>
            </section>
        </section>
    );
};
