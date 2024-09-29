import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useEffect, useState} from "react";
import brandAPIController from "../../controller/BrandAPIController";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import UnitModal from "../../modals/UnitModal/UnitModal";
import BrandModal from "../../modals/BrandModal/BrandModal";
import {
    emailRegex,
    nameRegex,
    sriLankaMobileNumberRegex,
    sriLankaNicRegex,
    websiteRegex
} from "../../validasion/validations";


interface Brand {
    id: number;
    name: string;
    contact: string;
    website: string;
    address: string;
    description: string;
}

export const Brands = () => {
    const columns: GridColDef[] = [
        {
            field: 'name', headerName: 'Brand Name', width: 200, renderCell: (params) => (
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
            field: 'address', headerName: 'Address', width: 300, renderCell: (params) => (
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
            field: 'description', headerName: 'Description', width: 300,
            renderCell: (params) => (
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
                    <BrandModal rowData={params.row} onUpdateBrand={handleUpdateBrand}/>
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </>
            ),
        },
    ];

    const [brandData, setBrandData] = useState({
        name: '',
        contact: '',
        website: '',
        address: '',
        description: '',
    });
    const [brandErrors, setBrandErrors] = useState({
        name: '',
        contact: '',
        website: '',
        address: '',
        description: '',
    });
    const [brands, setBrands] = useState<Brand[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
    const [totalElements, setTotalElements] = useState(0);

    type BrandDataKey = keyof typeof brandData;

    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as BrandDataKey;

        setBrandData({
            ...brandData,
            [typedName]: value,
        });

        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim().length <= 1) {
                    error = 'Name must be at least 1 characters';
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
                if (value && !websiteRegex.test(value)) {
                    error = 'Invalid website URL';
                }
                break;
            case 'address':
                if (value.trim().length > 500) {
                    error = 'Address cannot exceed 500 characters';
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

        // Update the errors state
        setBrandErrors({
            ...brandErrors,
            [name]: error,
        });
    };

    const handleUpdateBrand = (updatedBrand: {
        id: number;
        name: string;
        contact: string;
        website: string;
        address: string;
        description: string;
    }) => {
        setBrands(prevBrands =>
            prevBrands.map(brand =>
                brand.id === updatedBrand.id ? updatedBrand : brand
            )
        );
    };

    const handleBrandSaveEvent = async () => {
        const validationErrors = {
            name: '',
            contact: '',
            website: '',
            address: '',
            description: '',
        };

        let isValid = true;

        // Validate each field
        if (brandData.name.trim().length <= 1) {
            validationErrors.name = 'Name must be at least 1 characters';
            isValid = false;
        } else if (!nameRegex.test(brandData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (brandData.contact.trim() === '') {
            validationErrors.contact = 'Contact number is required';
            isValid = false;
        } else if (!sriLankaMobileNumberRegex.test(brandData.contact.trim())) {
            validationErrors.contact = 'Invalid Sri Lankan phone number';
            isValid = false;
        }

        if (brandData.website && !websiteRegex.test(brandData.website)) {
            validationErrors.address = 'Invalid website URL';
            isValid = false;
        }

        if (brandData.address.trim().length > 500) { // Example constraint
            validationErrors.address = 'Address cannot exceed 500 characters';
            isValid = false;
        }

        if (brandData.description.trim().length > 500) { // Example constraint
            validationErrors.address = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setBrandErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }
        const savedBrand = await brandAPIController.saveBrand(brandData);
        if (savedBrand) {
            const formattedBrand = {
                ...brandData,
                id: savedBrand.data.id,
            };

            setBrands([...brands, formattedBrand]);
            setTotalElements(prevTotal => prevTotal + 1);

            setBrandData({
                name: '',
                contact: '',
                website: '',
                address: '',
                description: '',
            });

            setBrandErrors({
                name: '',
                contact: '',
                website: '',
                address: '',
                description: '',
            });
            alert("Brand saved successfully!");
        } else {
            alert("Failed to save brand.");
        }
    };

    const fetchAllBrands = async (page: number, pageSize: number) => {
        try {
            const response = await brandAPIController.getAllBrands(page, pageSize);
            if (response) {
                setBrands(response.data.content);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };


    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this brand?");
        if (!confirmed) return;

        try {
            const response = await brandAPIController.deleteBrand(id);
            if (response.state === "OK") {
                // Remove the deleted brand from the table without hitting the backend again
                setBrands(prevBrands => prevBrands.filter(brand => brand.id !== id));
                setTotalElements(prevTotal => prevTotal - 1); // Adjust total elements count
                alert("Brand deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                // Show the error message from the backend if available
                alert(response.message || "Failed to delete brand.");
            } else {
                // Handle the case where response is null or doesn't match expected format
                alert("Failed to delete brand.");
            }
        } catch (e) {

        }
    };


    useEffect(() => {
        fetchAllBrands(0, 5).then(r => {
        });
    }, []);

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Brands</h3>
            </section>
            {/*url display section*/}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Brand name'}
                        label={'Brand name'}
                        important={"*"}
                        value={brandData.name}
                        onChange={handleBrandChange}
                         msg={brandErrors.name}
                    />
                    <TextField
                        name="contact"
                        placeholder={'077 752 0000'}
                        label={'Contact'}
                        important={"*"}
                        value={brandData.contact}
                        onChange={handleBrandChange}
                         msg={brandErrors.contact}
                    />
                    <TextField
                        name="website"
                        placeholder={'brand.com'}
                        label={'Website'}
                        value={brandData.website}
                        onChange={handleBrandChange}
                         msg={brandErrors.website}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'Address'}
                        label={'Address'}
                        value={brandData.address}
                        onChange={handleBrandChange}
                         msg={brandErrors.address}
                    />
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={brandData.description}
                        onChange={handleBrandChange}
                         msg={brandErrors.description}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleBrandSaveEvent}
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
                        rows={brands}
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
                            fetchAllBrands(newPagination.page, newPagination.pageSize).then(r => {
                            });
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
        </section>
    );
};
