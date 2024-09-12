import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import React, {useEffect, useState} from "react";
import categoryAPIController from "../../controller/CategoryAPIController";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import unitAPIController from "../../controller/UnitAPIController";
import Paper from "@mui/material/Paper";

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
                <Button
                    name={'Save'}
                    color={'bg-[#2FEB00]'}
                    onClick={handleUpdate}
                />
                <Button
                    name={'Save'}
                    color={'bg-[#2FEB00]'}
                    onClick={handleDelete}
                />
            </>
        ),
    },
];

const handleUpdate = async () => {
    console.log("update")
};
const handleDelete = async () => {
    console.log("delete")
};

interface Unit {
    id: number;
    name: string;
    description: string;
}

export const Categories = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
    });
    const [categories, setCategories] = useState<Unit[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
    const [totalElements, setTotalElements] = useState(0);

    type CategoryDataKey = keyof typeof categoryData;

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const typedName = name as CategoryDataKey;

        setCategoryData({
            ...categoryData,
            [typedName]: value,
        });
    };

    const handleCategorySaveEvent = async () => {
        const isSuccess = await categoryAPIController.saveCategory(categoryData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
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

    useEffect(() => {
        fetchAllUnits(0, 5).then(r => {});
    }, []);
    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
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
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={categoryData.description}
                        onChange={handleCategoryChange}
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
                        sx={{border: 0}}
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
