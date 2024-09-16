import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {Footer} from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import supplierAPIController from "../../controller/SupplierAPIController";
import Paper from "@mui/material/Paper";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
    

interface Supplier {
    id: number;
    name: string;
    contact: string;
    website: string;
    nic: string;
    email: string;
    description: string;
    actions: string;
}

export const Supplier = () => {

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', width: 200,renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign:'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),},
        {field: 'contact', headerName: 'Contact', width: 200,renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign:'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),},
        {field: 'website', headerName: 'Website', width: 200,renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign:'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),},
        {field: 'nic', headerName: 'NIC', width: 200,renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign:'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),},
        {field: 'email', headerName: 'Email', width: 200,renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign:'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),},
        {field: 'description', headerName: 'Description', width: 300,renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign:'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),},
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => (
                <>
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100"
                        onClick={() => handleDelete(params.row.id)}>
                        <FontAwesomeIcon icon={faPen}/>
                    </button>
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                        onClick={() => handleDelete(params.row.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </>
            ),
        },
    ];
    const [supplierData, setSupplierData] = useState({
        name: '',
        contact: '',
        website: '',
        nic: '',
        email: '',
        description: '',
    });
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
    const [totalElements, setTotalElements] = useState(0);


    type SupplerDataKey = keyof typeof supplierData;

    const handleSupplerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as SupplerDataKey;

        setSupplierData({
            ...supplierData,
            [typedName]: value,
        });
    };

    const handleSupplierSaveEvent = async () => {
        const isSuccess = await supplierAPIController.saveSupplier(
            supplierData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };
    const fetchAllSuppliers = async (page: number, pageSize: number) => {
        try {
            const response = await supplierAPIController.getAllSuppliers(page, pageSize);
            if (response) {
                setSuppliers(response.data.content);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this supplier?");
        if (!confirmed) return;

        try {
            const response = await supplierAPIController.deleteSupplier(id);
            if (response.state === "OK") {
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== id));
                setTotalElements(prevTotal => prevTotal - 1);
                alert("Supplier deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete supplier.");
            } else {
                alert("Failed to delete supplier.");
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        fetchAllSuppliers(0, 5);
    }, []);

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Suppliers</h3>
            </section>
            {/*url display section*/}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Isuru Dhananjaya'}
                        label={'Supplier name'}
                        important={"*"}
                        value={supplierData.name}
                        onChange={handleSupplerChange}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={supplierData.contact}
                        onChange={handleSupplerChange}
                    />
                    <TextField
                        name="website"
                        placeholder={'supplier.com'}
                        label={'Website'}
                        value={supplierData.website}
                        onChange={handleSupplerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="nic"
                        placeholder={'20021010025'}
                        label={'NIC'}
                        important={"*"}
                        value={supplierData.nic}
                        onChange={handleSupplerChange}
                    />
                    <TextField
                        name="email"
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                        value={supplierData.email}
                        onChange={handleSupplerChange}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description about supplier'}
                        label={'Description'}
                        value={supplierData.description}
                        onChange={handleSupplerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleSupplierSaveEvent}
                    />
                </div>
            </section>
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField placeholder={'Isuru Dhananjaya'} label={'User\'s name'}/>
                </div>
                <Paper sx={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={suppliers}
                        columns={columns}
                        pagination
                        pageSizeOptions={[5, 10]}
                        // checkboxSelection
                        sx={{
                            border: 0,
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: 'inherit' // Removes hover effect
                            },
                            '& .MuiDataGrid-cell:focus-within': {
                                outline: 'none', // Removes focus outline on edit mode
                            }
                        }}
                        disableRowSelectionOnClick
                        disableColumnMenu
                        getRowId={(row) => row.id}
                        paginationModel={paginationModel}
                        rowCount={totalElements} // Total number of rows
                        paginationMode="server" // Use server-side pagination
                        onPaginationModelChange={(newPagination) => {
                            setPaginationModel(newPagination);
                            fetchAllSuppliers(newPagination.page, newPagination.pageSize).then(r =>  {});
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
            <Footer/>
        </section>
    );
};
