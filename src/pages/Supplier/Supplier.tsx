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
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import SupplierModal from "../../modals/SupplierModal/SupplierModal";
import {
    emailRegex,
    nameRegex,
    sriLankaMobileNumberRegex,
    sriLankaNicRegex,
    websiteRegex
} from "../../validasion/validations";


interface Supplier {
    id: number;
    name: string;
    contact: string;
    website: string;
    nic: string;
    email: string;
    description: string;
}

export const Supplier = () => {

    const columns: GridColDef[] = [
        {
            field: 'name', headerName: 'Name', width: 200, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'contact', headerName: 'Contact', width: 200, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'website', headerName: 'Website', width: 200, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'nic', headerName: 'NIC', width: 200, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'email', headerName: 'Email', width: 200, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'description', headerName: 'Description', width: 300, renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textAlign: 'start',
                        }}
                    >
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => (
                <>
                    <SupplierModal rowData={params.row} onUpdateSupplier={handleUpdateSupplier}/>
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
    // State to manage form errors
    const [supplierErrors, setSupplierErrors] = useState({
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
        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!nameRegex.test(value.trim())) {
                    error = 'Name can contain only letters and spaces';
                }
                break;
            case 'contact':
                if (value.trim() === '') {
                    error = 'Contact number is required';
                } else if (!sriLankaMobileNumberRegex.test(value.trim())) {
                    error = 'Invalid Sri Lankan phone number';
                }
                break;
            case 'website':
                if (value.trim() !== '' && !websiteRegex.test(value.trim())) {
                    error = 'Invalid website URL';
                }
                break;
            case 'nic':
                if (value.trim() === '') {
                    error = 'NIC is required';
                } else if (!sriLankaNicRegex.test(value.trim())) {
                    error = 'Invalid NIC number';
                }
                break;
            case 'email':
                if (value.trim() === '') {
                    error = 'Email is required';
                } else if (!emailRegex.test(value.trim())) {
                    error = 'Invalid email address';
                }
                break;
            case 'description':
                if (value.trim().length > 500) {
                    error = 'Description cannot exceed 500 characters';
                }
                break;
            default:
                break;
        }

        // Update the supplierErrors state
        setSupplierErrors({
            ...supplierErrors,
            [name]: error,
        });
    };

    const handleUpdateSupplier = (updatedSupplier: {
        id: number;
        name: string;
        contact: string;
        website: string;
        nic: string;
        email: string;
        description: string;
    }) => {
        setSuppliers(prevSuppliers =>
            prevSuppliers.map(supplier =>
                supplier.id === updatedSupplier.id ? updatedSupplier : supplier
            )
        );
    };

    const handleSupplierSaveEvent = async () => {
        // Perform final validation before submission
        const validationErrors = {
            name: '',
            contact: '',
            website: '',
            nic: '',
            email: '',
            description: '',
        };
        let isValid = true;

        // Validate each field
        if (supplierData.name.trim().length < 2) {
            validationErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!nameRegex.test(supplierData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (supplierData.contact.trim() === '') {
            validationErrors.contact = 'Contact number is required';
            isValid = false;
        } else if (!sriLankaMobileNumberRegex.test(supplierData.contact.trim())) {
            validationErrors.contact = 'Invalid Sri Lankan phone number';
            isValid = false;
        }

        if (supplierData.website.trim() !== '' && !websiteRegex.test(supplierData.website.trim())) {
            validationErrors.website = 'Invalid website URL';
            isValid = false;
        }

        if (supplierData.nic.trim() === '') {
            validationErrors.nic = 'NIC is required';
            isValid = false;
        } else if (!sriLankaNicRegex.test(supplierData.nic.trim())) {
            validationErrors.nic = 'Invalid NIC number';
            isValid = false;
        }

        if (supplierData.email.trim() === '') {
            validationErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(supplierData.email.trim())) {
            validationErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (supplierData.description.trim().length > 500) { // Example constraint
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        // Update the supplierErrors state
        setSupplierErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const savedSupplier = await supplierAPIController.saveSupplier(supplierData);
        if (savedSupplier) {
            const formattedSupplier = {
                ...supplierData,
                id: savedSupplier.data.id,
            };

            setSuppliers([...suppliers, formattedSupplier]);
            setTotalElements(prevTotal => prevTotal + 1);

            // Clear the form fields after successful save
            setSupplierData({
                name: '',
                contact: '',
                website: '',
                nic: '',
                email: '',
                description: '',
            });

            // Clear supplierErrors
            setSupplierErrors({
                name: '',
                contact: '',
                website: '',
                nic: '',
                email: '',
                description: '',
            });
            alert("Supplier saved successfully!");
        } else {
            alert("Failed to save supplier.");
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
                        msg={supplierErrors.name}
                    />
                    <TextField
                        name="contact"
                        placeholder={'076 715 1321'}
                        label={'Contact'}
                        important={"*"}
                        value={supplierData.contact}
                        onChange={handleSupplerChange}
                        msg={supplierErrors.contact}
                    />
                    <TextField
                        name="website"
                        placeholder={'supplier.com'}
                        label={'Website'}
                        value={supplierData.website}
                        onChange={handleSupplerChange}
                        msg={supplierErrors.website}
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
                          msg={supplierErrors.nic}
                    />
                    <TextField
                        name="email"
                        placeholder={'supplier@gmail.com'}
                        label={'Email'}
                        important={"*"}
                        value={supplierData.email}
                        onChange={handleSupplerChange}
                          msg={supplierErrors.email}
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
                        msg={supplierErrors.description}
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
                            fetchAllSuppliers(newPagination.page, newPagination.pageSize).then(r => {
                            });
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
            <Footer/>
        </section>
    );
};
