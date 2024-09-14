import {TextField} from "../../component/TextField/TextFild";
import {TextArea} from "../../component/TextArea/TextArea";
import {Button} from "../../component/Button/Button";
import {FooterSpace} from "../FooterSpace/FooterSpace";
import React, {ChangeEvent, useEffect, useState} from "react";
import stockAPIController from "../../controller/StockAPIController";
import Paper from "@mui/material/Paper";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import itemAPIController from "../../controller/ItemAPIController";
import {Tooltip} from "@mui/material";


const columns: GridColDef[] = [
    {
        field: 'item',
        headerName: 'Item',
        width: 200,
        valueGetter: (params) => params.row.item?.name || 'N/A',renderCell: (params) => (
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
    {field: 'purchasedAmount', headerName: 'Purchased Amount',type:"number", width: 200,renderCell: (params) => (
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
    {field: 'purchasedQty', headerName: 'Purchased Qty',type:"number", width: 200,renderCell: (params) => (
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
    {field: 'availableQty', headerName: 'Available Qty',type:"number", width: 200,renderCell: (params) => (
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
    {field: 'purchasedDiscount', headerName: 'Purchased Discount',type:"number", width: 200,renderCell: (params) => (
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
        field: 'expiryDate',
        headerName: 'Expiry Date',
        width: 200,
        valueGetter: (params) => {
            const date = new Date(params.value);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adds leading zero if necessary
            const day = ('0' + date.getDate()).slice(-2); // Adds leading zero if necessary
            return `${year}-${month}-${day}`;
        },
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

interface Stock {
    id: number;
    purchasedAmount: number;
    purchasedQty: number;
    purchasedDiscount: number;
    availableQty: number;
    expiryDate: string;
    description: string;
    item: {
        id:number;
        name:string
    };
}

interface Item {
    id: number;
    name: string;
    categoryName: string;
    brandName: string;
    unitName: string;
    unitSymbology: string;
}

export const Stock = () => {
    const [stockData, setStockData] = useState({
        purchasedAmount: '',
        purchasedQty: '',
        purchasedDiscount: '',
        expiryDate: '',
        description: '',
        item: '',
    });
    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
    const [items, setItems] = useState<Item[]>([]);  // <--- Typed the items state
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
    const [totalElements, setTotalElements] = useState(0);

    const fetchAllSuppliers = async (page: number, pageSize: number) => {
        try {
            const response = await stockAPIController.getAllStocks(page, pageSize);
            if (response) {
                setStocks(response.data.content);
                setTotalElements(response.data.page.totalElements);
            }
        } catch (error) {
            console.error("Error fetching supplier data:", error);
        }
    };

    useEffect(() => {
        const loadItems = async () => {
            const response = await itemAPIController.getAllItems();
            const items = response.data.content.map((item: {
                id: number;
                name: string;
                category: { name: string };
                brand: { name: string };
                unit: { unitName: string; unitSymbology:string };
            }) => ({
                id: item.id,
                name: item.name,
                categoryName: item.category.name,
                brandName: item.brand.name,
                unitName: item.unit.unitName,
                unitSymbology: item.unit.unitSymbology,
            }));

            setItems(items); // Set fetched items to state
        };

        loadItems().then(r => {});
        fetchAllSuppliers(0, 5).then(r => {});
    }, []);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setStockData({
            ...stockData,
            [name]: value,
        });
    };

    const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const item = event.target.value;
        setSelectedItem(item);
        setStockData(prevData => ({
            ...prevData,
            item: item,
        }));
    };

    const handleStockSaveEvent = async () => {
        const isSuccess = await stockAPIController.saveStock(stockData);
        if (isSuccess) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Stock</h3>
            </section>
            {/* Form section */}
            <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="purchasedQty"
                        placeholder={'0.00'}
                        label={'Purchased Qty'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedQty}
                        onChange={handleStockChange}
                    />
                    <TextField
                        name="purchasedAmount"
                        placeholder={'0.00'}
                        label={'Purchased Amount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedAmount}
                        onChange={handleStockChange}
                    />
                    <TextField
                        name="purchasedDiscount"
                        placeholder={'0.00'}
                        label={'Purchased discount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedDiscount}
                        onChange={handleStockChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Item</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <select
                            value={selectedItem}
                            name={"item"}
                            onChange={handleItemChange}
                            className='min-w-[220px] border-[1px] border-[#9F9F9F] border-solid rounded-lg w-[100%] h-[46px] pl-3'
                        >
                            <option value="-1">Select an item</option>
                            {items.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name+'-'+option.brandName+'-'+option.categoryName+'-'+option.unitSymbology+'('+option.unitName+')'}
                                </option>
                            ))}
                        </select>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}></small>
                        </div>
                    </div>
                    <TextField
                        name="expiryDate"
                        label={'Expiry date'}
                        type={'date'}
                        important={"*"}
                        value={stockData.expiryDate}
                        onChange={handleStockChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={stockData.description}
                        onChange={handleStockChange}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-end w-full'>
                    <Button
                        name={'Save'}
                        color={'bg-[#2FEB00]'}
                        onClick={handleStockSaveEvent}
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
                        rows={stocks}
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
                            fetchAllSuppliers(newPagination.page, newPagination.pageSize).then(r =>  {});
                        }}
                    />
                </Paper>
            </section>
            <FooterSpace/>
        </section>
    );
};
