import {TextField} from "../../component/TextField/TextFild";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {TextFieldWithButton} from "../../component/TextFieldWithButton/TextFieldWithButton";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import React, {ChangeEvent, useEffect, useState} from "react";
import itemAPIController from "../../controller/ItemAPIController";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import brandAPIController from "../../controller/BrandAPIController";
import unitAPIController from "../../controller/UnitAPIController";
import categoryAPIController from "../../controller/CategoryAPIController";


const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 200},
    {
        field: 'unit',
        headerName: 'Unit',
        width: 200,
        valueGetter: (params) => params.row.unit?.unitSymbology+' ('+params.row.unit?.unitName+')' || 'N/A'
    },
    {field: 'reOrderLevel', headerName: 'Re-order Level',type:"number", width: 200},
    {field: 'description', headerName: 'Description', width: 200,},
    {
        field: 'category',
        headerName: 'Category',
        width: 200,
        valueGetter: (params) => params.row.category?.name || 'N/A'
    },
    {
        field: 'brand',
        headerName: 'Brand',
        width: 200,
        valueGetter: (params) => params.row.brand?.name || 'N/A'
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


interface Item {
    id: number;
    name: string;
    description: string;
    reOrderLevel: number;
    category: { name:string };
    brand: { name:string };
    unit: {
        unitName: string;
        unitSymbology: string;
    };
    actions: string;
}

interface Unit {
    id: number;
    unitName: string;
    unitSymbology: string;
}

export const Items = () => {
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        reOrderLevel: '',
        category: '',
        brand: '',
        unit: '',
    });

    const [selectedUnit, setSelectedUnit] = useState<string | undefined>(undefined);
    // Set the correct type for items
    const [units, setUnit] = useState<Unit[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const [items, setItems] = useState<Item[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
    const [totalElements, setTotalElements] = useState(0);

    const fetchAllItems = async (page: number, pageSize: number) => {
        try {
            const response = await itemAPIController.getAllItems(page, pageSize);
            if (response) {
                setItems(response.data.content || []);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    useEffect(() => {
        const loadUnits = async () => {
            const response = await unitAPIController.getAllUnits();
            const units = response.data.map((unit: {
                id: number;
                unitName: string;
                unitSymbology:string;
            }) => ({
                id:unit.id,
                unitName: unit.unitName,
                unitSymbology: unit.unitSymbology,
            }));

            setUnit(units);
        };

        loadUnits().then(r => {});
        fetchAllItems(0, 5).then(r => {});
    }, []);

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setItemData({
            ...itemData,
            [name]: value,
        });
    };

    const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const unit = event.target.value;
        setSelectedUnit(unit);
        setItemData(prevData => ({
            ...prevData,
            unit: unit,
        }));
    };

    const fetchBrands = async () => {
        const response = await brandAPIController.getAllBrands();

        const brands = response.data.map((brand: { id: number; name: string }) => ({
            id: brand.id,
            name: brand.name,
        }));
        console.log(brands)
        return brands;
    };

    const fetchCategories = async () => {
        const response = await categoryAPIController.getAllCategories();

        const categories = response.data.map((category: { id: number; name: string }) => ({
            id: category.id,
            name: category.name,
        }));
        console.log(categories)

        return categories;
    };

    const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setItemData(prevData => ({
            ...prevData,
            brand: brand,
        }));
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setItemData(prevData => ({
            ...prevData,
            category: category,
        }));
    };

    const handleItemSaveEvent = async () => {
        const isSuccess = await itemAPIController.saveItem(itemData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#bebebe] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Items</h3>
            </section>
            {/*url display section*/}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="name"
                        placeholder={'Item name'}
                        label={'Item name'}
                        important={"*"}
                        value={itemData.name}
                        onChange={handleItemChange}
                    />
                    <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Unit</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <select
                            value={selectedUnit}
                            name={"unit"}
                            onChange={handleUnitChange}
                            className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                        >
                            <option value="-1">Select an unit</option>
                            {units.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.unitSymbology + ' (' + option.unitName + ')'}
                                </option>
                            ))}
                        </select>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}></small>
                        </div>
                    </div>
                    <TextField
                        name="reOrderLevel"

                        placeholder={'0.00'}
                        label={'Re-order level'}
                        important={"*"}
                        value={itemData.reOrderLevel}
                        onChange={handleItemChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextFieldWithButton
                        name="brand"
                        label={'Brand'}
                        important={"*"}
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        fetchOptions={fetchBrands}
                    />
                    <TextFieldWithButton
                        name="category"
                        label={'Category'}
                        important={"*"}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        fetchOptions={fetchCategories}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={itemData.description}
                        onChange={handleItemChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleItemSaveEvent}
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
                        rows={items}
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
                            fetchAllItems(newPagination.page, newPagination.pageSize).then(r =>  {});
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
        </section>
    );
};
