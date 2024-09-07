import plus from "../../assets/icons/Plus.png";
import {useEffect, useState} from "react";

type OptionType = {
    id: number;
    name: string;
};
export const TextFieldWithButton = ({label, msg, important, name, value, fetchOptions, onChange}: props) => {
    const [options, setOptions] = useState<OptionType[]>([]); // Explicitly define the type

    useEffect(() => {
        const fetchAndSetOptions = async () => {
            if (fetchOptions) {
                const fetchedOptions = await fetchOptions();
                setOptions(fetchedOptions);
            }
        };

        fetchAndSetOptions();
    }, [fetchOptions]);
    return (
        <>
            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                <div className='flex flex-row'>
                    <label className='text-black flex justify-start'>{label}</label>
                    <small className={`text-red-600 text-[16px] ${important == null ? 'hidden' : 'block'}`}>*</small>
                </div>
                <select
                    value={value}
                    name={name}
                    defaultValue={10}
                    onChange={onChange}
                    className='min-w-[220px] border-[1px] border-[#9F9F9F]  border-solid rounded-lg w-[100%] h-[46px] pl-3'>
                    <option value="-1">Select a {name}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>{option.name}</option>
                    ))}
                </select>
                <div className={`h-[5px]`}>
                    <small
                        className={`text-start text-red-600 block`}>
                        {msg}
                    </small>
                </div>
            </div>
        </>
    );
};
type props = {
    label: string,
    msg?: string,
    important?: string,
    value?: string;
    name?: string;
    fetchOptions?: () => Promise<OptionType[]>, // Function to fetch the options
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

