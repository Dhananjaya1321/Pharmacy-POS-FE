export const TextField = ({label, placeholder, type, disabled}: props) => {
    return (
        <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
            <label className='text-black flex justify-start'>{label}</label>
            <input className='border-[1px] border-[#9F9F9F]  border-solid rounded-lg w-[100%] h-[46px] pl-3'
                   type={type == null ? "text" : type}
                   placeholder={placeholder}
                   disabled={disabled == null ? false : true}
            ></input>
        </div>
    );
};
type props = {
    label: string,
    placeholder: string,
    type?: string,
    disabled?: string,
}


