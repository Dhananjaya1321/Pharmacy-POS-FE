import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
// @ts-ignore
import customerAPIController from "../../controller/CustomerAPIController";
import React, {useEffect, useState} from "react";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {Footer} from "../Footer/Footer";
import Paper from "@mui/material/Paper";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import supplierAPIController from "../../controller/SupplierAPIController";
import {CardMedia, Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import itemAPIController from "../../controller/ItemAPIController";
import UnitModal from "../../modals/UnitModal/UnitModal";
import CustomerModal from "../../modals/CustomerModal/CustomerModal";

interface Customer {
    id: number;
    name: string;
    contact: string;
    email: string;
    nic: string;
    address: string;
}

export const Customer = () => {
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
        {field: 'address', headerName: 'Address', width: 400,renderCell: (params) => (
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
                    <CustomerModal rowData={params.row} onUpdateCustomer={handleUpdateCustomer}/>
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                        onClick={() => handleDelete(params.row.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </>
            ),
        },
    ];
    const [customerData, setCustomerData] = useState({
        name: '',
        contact: '',
        email: '',
        nic: '',
        address: '',
    });
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
    const [totalElements, setTotalElements] = useState(0);

    type CustomerDataKey = keyof typeof customerData;

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as CustomerDataKey;

        setCustomerData({
            ...customerData,
            [typedName]: value,
        });
    };

    const handleUpdateCustomer = (updatedCustomer: { id: number; name: string; contact: string; email: string; nic: string; address: string;}) => {
        setCustomers(prevCustomers =>
            prevCustomers.map(customer =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
    };

    const handleCustomerSaveEvent = async () => {
        const isSuccess = await customerAPIController.saveCustomer(customerData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    const fetchAllSuppliers = async (page: number, pageSize: number) => {
        try {
            const response = await customerAPIController.getAllCustomers(page, pageSize);
            if (response) {
                setCustomers(response.data.content);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (!confirmed) return;

        try {
            const response = await customerAPIController.deleteCustomer(id);
            if (response.state === "OK") {
                setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
                setTotalElements(prevTotal => prevTotal - 1);
                alert("Customer deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete customer.");
            } else {
                alert("Failed to delete customer.");
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
                <h3>Customer</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Isuru Dhananjaya'}
                        label={'Customer name'}
                        important={"*"}
                        value={customerData.name}
                        onChange={handleCustomerChange}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={customerData.contact}
                        onChange={handleCustomerChange}
                    />
                    <TextField
                        name="email"
                        placeholder={'isuru@gmail.com'}
                        label={'Email'}
                        value={customerData.email}
                        onChange={handleCustomerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="nic"
                        placeholder={'20021010025'}
                        label={'NIC'}
                        value={customerData.nic}
                        onChange={handleCustomerChange}
                    />
                    <HiddenTextField/>
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'No - 181, ABC Road, Galle'}
                        label={'Address'}
                        value={customerData.address}
                        onChange={handleCustomerChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleCustomerSaveEvent}
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
                        rows={customers}
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
