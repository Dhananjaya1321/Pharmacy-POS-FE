export const Button = ({name,color}:props) => {
    return (
        <button className={`${color} px-6 py-3 rounded-md text-white font-medium mx-3 mt-2`}>{name}</button>
    );
};

type props={
    name:string,
    color:string
}
