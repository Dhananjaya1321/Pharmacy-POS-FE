export const TextField = ({label, placeholder, type, disabled, msg, important, name, value, onChange}: props) => {
    return (
        <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
            <div className='flex flex-row'>
                <label className='text-black flex justify-start'>{label}</label>
                <small className={`text-red-600 text-[16px] ${important==null?'hidden':'block'}`}>*</small>
            </div>
            <input
                className='text-input'
                type={type == null ? "text" : type}
                placeholder={placeholder}
                disabled={disabled == null ? false : true}
                value={value} // Controlled by the parent component
                onChange={onChange} // Handles input change
                name={name}
            ></input>
            <div className={`h-[5px]`}>
                <small
                    className={`text-start text-red-600 block`}>
                    {msg}
                </small>
            </div>
        </div>
    );
};
type props = {
    label: string,
    placeholder?: string,
    type?: string,
    disabled?: string,
    msg?: string,
    important?: string,
    name?: string,
    value?: any; // Added value prop
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
}


