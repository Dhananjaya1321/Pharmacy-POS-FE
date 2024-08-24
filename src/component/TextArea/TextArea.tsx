export const TextArea = ({label,placeholder}:props) => {
    return (
        <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
            <label className='text-black flex justify-start'>{label}</label>
            <textarea className='border-[1px] border-[#9F9F9F]  border-solid rounded-xl w-[100%] h-[150px] pl-3 pt-3'
                   placeholder={placeholder}
            ></textarea>
        </div>
    );
};
type props={
    label:string,
    placeholder:string,
}


