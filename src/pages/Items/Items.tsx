import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import React, {ChangeEvent, useEffect, useState} from "react";
import itemAPIController from "../../controller/ItemAPIController";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import brandAPIController from "../../controller/BrandAPIController";
import unitAPIController from "../../controller/UnitAPIController";
import categoryAPIController from "../../controller/CategoryAPIController";
import {Tooltip} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ItemModal from "../../modals/ItemModal/ItemModal";

interface Item {
    id: number;
    name: string;
    description: string;
    reOrderLevel: number;
    category: {
        id: number;
        name: string
    };
    brand: {
        id: number;
        name: string
    };
    unit: {
        id: number;
        unitName: string;
        unitSymbology: string;
    };
}

interface Unit {
    id: number;
    unitName: string;
    unitSymbology: string;
}

interface Category {
    id: number;
    name: string
}

interface Brand {
    id: number;
    name: string
}

export const Items = () => {
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', width: 200},
        {
            field: 'unit',
            headerName: 'Unit',
            width: 200,
            valueGetter: (params) => params.row.unit?.unitSymbology + ' (' + params.row.unit?.unitName + ')' || 'N/A',
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
            field: 'reOrderLevel', headerName: 'Re-order Level', type: "number", width: 200, renderCell: (params) => (
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
            field: 'description', headerName: 'Description', width: 200, renderCell: (params) => (
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
            field: 'category',
            headerName: 'Category',
            width: 200,
            valueGetter: (params) => params.row.category?.name || 'N/A',
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
            field: 'brand',
            headerName: 'Brand',
            width: 200,
            valueGetter: (params) => params.row.brand?.name || 'N/A',
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
                    <ItemModal
                        itemData={params.row}
                        onUpdateItem={handleUpdateItem}
                        units={units}
                        categories={categories}
                        brands={brands}
                    />
                    <button
                        className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                        onClick={() => handleDelete(params.row.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </>
            ),
        },
    ];
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
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
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
            const units = response.data.content.map((unit: {
                id: number;
                unitName: string;
                unitSymbology: string;
            }) => ({
                id: unit.id,
                unitName: unit.unitName,
                unitSymbology: unit.unitSymbology,
            }));

            setUnit(units);
        };

        loadUnits().then(r => {
        });
        fetchBrands().then(r => {
        });
        fetchCategories().then(r => {
        });
        fetchAllItems(0, 5).then(r => {
        });
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

        const brands = response.data.content.map((brand: { id: number; name: string }) => ({
            id: brand.id,
            name: brand.name,
        }));

        setBrands(brands);
    };

    const fetchCategories = async () => {
        const response = await categoryAPIController.getAllCategories();
        const categories = response.data.content.map((category: {
            id: number;
            name: string
        }) => ({
            id: category.id,
            name: category.name,
        }));

        setCategories(categories);
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

    const handleUpdateItem = (updatedItems: {
        id: number;
        name: string;
        description: string;
        reOrderLevel: number;
        category: {
            id: number;
            name: string
        };
        brand: {
            id: number;
            name: string
        };
        unit: {
            id: number;
            unitName: string;
            unitSymbology: string;
        };
    }) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === updatedItems.id ? updatedItems : item
            )
        );
    };

    const handleItemSaveEvent = async () => {
        const isSuccess = await itemAPIController.saveItem(itemData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) return;

        try {
            const response = await itemAPIController.deleteItem(id);
            if (response.state === "OK") {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
                setTotalElements(prevTotal => prevTotal - 1);
                alert("Item deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete item.");
            } else {
                alert("Failed to delete item.");
            }
        } catch (e) {
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Items</h3>
            </section>
            {/*url display section*/}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
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
                        <div className="custom-select-wrapper">
                            <select
                                value={selectedUnit}
                                name={"unit"}
                                onChange={handleUnitChange}
                                className='custom-select min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                            >
                                <option value="-1">Select an unit</option>
                                {units.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.unitSymbology + ' (' + option.unitName + ')'}
                                    </option>
                                ))}
                            </select>
                            <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                        </div>
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
                    <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Brand</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <div className="custom-select-wrapper">
                            <select
                                value={selectedBrand}
                                name={"brand"}
                                onChange={handleBrandChange}
                                className='custom-select'
                            >
                                <option value="-1">Select an brand</option>
                                {brands.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                        </div>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}></small>
                        </div>
                    </div>
                    <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Category</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <div className="custom-select-wrapper">
                            <select
                                value={selectedCategory}
                                name="category"
                                onChange={handleCategoryChange}
                                className='custom-select'
                            >
                                <option value="-1">Select a category</option>
                                {categories.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                        </div>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}></small>
                        </div>
                    </div>
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
                            fetchAllItems(newPagination.page, newPagination.pageSize).then(r => {
                            });
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
        </section>
    );
};
