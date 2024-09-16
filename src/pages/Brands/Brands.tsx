import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useEffect, useState} from "react";
import brandAPIController from "../../controller/BrandAPIController";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {Tooltip} from "@mui/material";
import BasicModal from "../../component/Modal/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


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
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-green-600 hover:bg-green-100"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <FontAwesomeIcon icon={faPen}/>
                    </button>
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
    };

    const handleBrandSaveEvent = async () => {
        const isSuccess = await brandAPIController.saveUnit(
            brandData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
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

    const handleUpdate = async () => {
        console.log("update")
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
                    />
                    <TextField
                        name="contact"
                        placeholder={'077 752 0000'}
                        label={'Contact'}
                        important={"*"}
                        value={brandData.contact}
                        onChange={handleBrandChange}
                    />
                    <TextField
                        name="website"
                        placeholder={'brand.com'}
                        label={'Website'}
                        value={brandData.website}
                        onChange={handleBrandChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="address"
                        placeholder={'Address'}
                        label={'Address'}
                        value={brandData.address}
                        onChange={handleBrandChange}
                    />
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={brandData.description}
                        onChange={handleBrandChange}
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
