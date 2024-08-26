import plus from "../../assets/icons/Plus.png";

export const TextFieldWithButton = ({label}: props) => {
    return (
        <>
            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                {/*<div className='w-[100%]'>*/}
                    <label className='text-black flex justify-start'>{label}</label>
                    <select defaultValue={10}
                            className='min-w-[220px] border-[1px] border-[#9F9F9F]  border-solid rounded-lg w-[100%] h-[46px] pl-3'>
                        <option value={0} disabled>Select an option</option>
                        <option value={10}>Documentation</option>
                        <option value={20}>Components</option>
                        <option value={30}>Features</option>
                    </select>
                {/*</div>*/}
                {/*<button className='rounded-md bg-green-500 w-[50px] h-[46px] flex items-center justify-center'>*/}
                {/*    <img src={plus}/>*/}
                {/*</button>*/}
            </div>
        </>
    );
};
type props = {
    label: string,
}


