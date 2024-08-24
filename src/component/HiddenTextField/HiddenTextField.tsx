export const HiddenTextField = () => {
    return (
        <div className='opacity-0 grow mx-3 flex flex-col justify-start'>
            <label className='flex justify-start'>hidden</label>
            <input className='border-[2px] border-black border-solid rounded-md w-[100%] h-[40px] pl-2'
                   type={"text"}
            ></input>
        </div>
    );
};


