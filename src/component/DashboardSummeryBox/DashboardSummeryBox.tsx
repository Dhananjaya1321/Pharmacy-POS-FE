import React from "react";


type props = {
    image?: any,
    count?: number,
    label?: string,
    bgColor?: string,
    borderColor?: string,
    textColor?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DashboardSummeryBox = ({image, count, label,bgColor,borderColor,textColor, onChange}: props) => {
    return (
        <div className={`bg-white shadow-md relative flex flex-col items-center justify-between w-[225px] h-[180px]
                rounded-lg border-y-[1px] border-x-[1px] border-solid ${borderColor}`}>
            <div className="h-full relative flex items-center justify-center gap-1 flex-col">
                <img src={image} width={35}/>
                <h1 className={`text-4xl mt-1 ${textColor}`}>{count}</h1>
                <p className="px-6 text-center text-[12px]">{label}</p>
            </div>
            <button
                className={`${bgColor} text-white rounded-b-md w-full h-[25px] bottom-0`}
            >
                <small>View Report &gt;&gt;</small>
            </button>
        </div>
    );
};
