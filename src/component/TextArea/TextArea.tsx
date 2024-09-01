export const TextArea = ({label, placeholder, msg, important, name, value, onChange}: props) => {
    return (
        <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
            <div className='flex flex-row'>
                <label className='text-black flex justify-start'>{label}</label>
                <small className={`text-red-600 text-[16px] ${important == null ? 'hidden' : 'block'}`}>*</small>
            </div>
            <textarea className='border-[1px] border-[#9F9F9F]  border-solid rounded-lg w-[100%] h-[150px] pl-3 pt-3'
                      placeholder={placeholder}
                      value={value} // Controlled by the parent component
                      onChange={onChange} // Handles input change
                      name={name}
            ></textarea>
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
    placeholder: string,
    msg?: string,
    important?: string,
    name?: string,
    value?: string; // Added value prop
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Added onChange prop
}


