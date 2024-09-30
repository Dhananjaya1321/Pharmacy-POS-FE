import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useEffect, useState} from "react";
import categoryAPIController from "../../controller/CategoryAPIController";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import Paper from "@mui/material/Paper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CategoryModal from "../../modals/CategoryModal/CategoryModal";
import {nameRegex} from "../../validasion/validations";


interface Unit {
    id: number;
    name: string;
    description: string;
}

export const Categories = () => {
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Category Name', width: 300,renderCell: (params) => (
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
        {field: 'description', headerName: 'Description', width: 300,
            renderCell: (params) => (
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
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => (
                <>
                   <CategoryModal rowData={params.row} onUpdateCategory={handleUpdateCategory}/>
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

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
    });
    const [categoryErrors, setCategoryErrors] = useState({
        name: '',
        description: '',
    });
    const [categories, setCategories] = useState<Unit[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
    const [totalElements, setTotalElements] = useState(0);

    type CategoryDataKey = keyof typeof categoryData;

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as CategoryDataKey;

        setCategoryData({
            ...categoryData,
            [typedName]: value,
        });

        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'name':
                if (value.trim() === '') {
                    error = 'Name is required';
                } else if (value.trim().length <= 2) {
                    error = 'Name must be at least 2 characters';
                } else if (!nameRegex.test(value.trim())) {
                    error = 'Name can contain only letters and spaces';
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
        setCategoryErrors({
            ...categoryErrors,
            [name]: error,
        });
    };

    const handleUpdateCategory = (updatedCategory: { id: number; name: string; description: string }) => {
        setCategories(prevCategories =>
            prevCategories.map(category =>
                category.id === updatedCategory.id ? updatedCategory : category
            )
        );
    };

    const handleCategorySaveEvent = async () => {
        const validationErrors = {
            name: '',
            description: '',
        };

        let isValid = true;

        // Validate each field
        if (categoryData.name.trim() === '') {
            validationErrors.name = 'Name is required';
            isValid = false;
        } else if (categoryData.name.trim().length <= 2) {
            validationErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        } else if (!nameRegex.test(categoryData.name.trim())) {
            validationErrors.name = 'Name can contain only letters and spaces';
            isValid = false;
        }

        if (categoryData.description.trim().length > 500) {
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setCategoryErrors(validationErrors);


        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }

        const savedCategory = await categoryAPIController.saveCategory(categoryData);
        if (savedCategory) {
            const formattedCategory = {
                ...categoryData,
                id: savedCategory.data.id,
            };

            setCategories([...categories, formattedCategory]);
            setTotalElements(prevTotal => prevTotal + 1);

            setCategoryData({
                name: '',
                description: '',
            });

            setCategoryErrors({
                name: '',
                description: '',
            });
            alert("Category saved successfully!");
        } else {
            alert("Failed to save category.");
        }
    };

    const fetchAllUnits = async (page: number, pageSize: number) => {
        try {
            const response = await categoryAPIController.getAllCategories(page, pageSize);
            if (response) {
                setCategories(response.data.content);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (!confirmed) return;

        try {
            const response = await categoryAPIController.deleteCategory(id);
            if (response.state === "OK") {
                setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
                setTotalElements(prevTotal => prevTotal - 1);
                alert("Category deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete category.");
            } else {
                alert("Failed to delete category.");
            }
        } catch (e) {
        }
    };

    useEffect(() => {
        fetchAllUnits(0, 5).then(r => {});
    }, []);

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Categories</h3>
            </section>
            {/*url display section*/}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Category name'}
                        label={'Category name'}
                        important={"*"}
                        value={categoryData.name}
                        onChange={handleCategoryChange}
                        msg={categoryErrors.name}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={categoryData.description}
                        onChange={handleCategoryChange}
                        msg={categoryErrors.description}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleCategorySaveEvent}
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
                        rows={categories}
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
                            fetchAllUnits(newPagination.page, newPagination.pageSize).then(r => {
                            });
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
        </section>
    );
};
