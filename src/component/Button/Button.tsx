export const Button = ({name,color, onClick }:props) => {
    return (
        <button
            className={`${color} px-6 py-3 rounded-md text-white font-medium mx-3 mt-2`}
            onClick={onClick} // Add onClick handler
        >{name}</button>
    );
};

type props={
    name:string,
    color:string,
    onClick?: () => void; // Add the onClick prop as optional
}
