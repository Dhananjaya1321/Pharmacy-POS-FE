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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import StockModal from "../../modals/StockModal/StockModal";
import {HiddenTextField} from "../../component/HiddenTextField/HiddenTextField";

interface Stock {
    id: number;
    purchasedAmount: number;
    purchasedQty: number;
    purchasedDiscount: number;
    availableQty: number;
    purchasePricePerUnit: number;
    sellingPricePerUnit: number;
    sellingDiscountPerUnit: number;
    totalAmount: number;
    expiryDate: string;
    description: string;
    item: {
        id: number;
        name: string;
        category: { name: string };
        brand: { name: string };
        unit: { unitName: string; unitSymbology: string };
    };
}

interface Item {
    id: number;
    name: string;
    category: { name: string };
    brand: { name: string };
    unit: { unitName: string; unitSymbology: string };
}

export const Stock = () => {
    const columns: GridColDef[] = [
        {
            field: 'item',
            headerName: 'Item',
            width: 200,
            valueGetter: (params) => params.row.item?.name || 'N/A', renderCell: (params) => (
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
            field: 'purchasedAmount',
            headerName: 'Purchased Amount',
            type: "number",
            width: 200,
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
            field: 'purchasedQty', headerName: 'Purchased Qty', type: "number", width: 200, renderCell: (params) => (
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
            field: 'purchasePricePerUnit',
            headerName: 'Purchased Price Per Unit',
            type: "number",
            width: 200,
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
            field: 'availableQty', headerName: 'Available Qty', type: "number", width: 200, renderCell: (params) => (
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
            field: 'purchasedDiscount',
            headerName: 'Purchased Discount',
            type: "number",
            width: 200,
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
            field: 'totalAmount',
            headerName: 'Total Amount',
            type: "number",
            width: 200,
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
            field: 'sellingPricePerUnit',
            headerName: 'Selling Price Per Unit',
            type: "number",
            width: 200,
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
            field: 'sellingDiscountPerUnit',
            headerName: 'Selling Discount Per Unit',
            type: "number",
            width: 200,
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
                    <StockModal stockData={params.row} onUpdateStock={handleUpdateStock} items={items}/>
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

    const [stockData, setStockData] = useState({
        purchasedAmount: '',
        purchasedQty: '',
        purchasedDiscount: '',
        availableQty: '',
        purchasePricePerUnit: '',
        sellingPricePerUnit: '',
        sellingDiscountPerUnit: '',
        totalAmount: '',
        expiryDate: '',
        description: '',
        item: '',
    });
    const [stockErrors, setStockErrors] = useState({
        purchasedAmount: '',
        purchasedQty: '',
        purchasedDiscount: '',
        availableQty: '',
        purchasePricePerUnit: '',
        sellingPricePerUnit: '',
        sellingDiscountPerUnit: '',
        totalAmount: '',
        expiryDate: '',
        description: '',
        item: '',
    });
    const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
    const [items, setItems] = useState<Item[]>([]);  // <--- Typed the items state
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({page: 0, pageSize: 5});
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
                unit: { unitName: string; unitSymbology: string };
            }) => ({
                id: item.id,
                name: item.name,
                category: {name: item.category.name},
                brand: {name: item.brand.name},
                unit: {unitName: item.unit.unitName, unitSymbology: item.unit.unitSymbology}
            }));

            setItems(items); // Set fetched items to state
        };

        loadItems().then(r => {
        });
        fetchAllSuppliers(0, 5).then(r => {
        });
    }, []);

    useEffect(() => {
        const purchasedQty = parseFloat(stockData.purchasedQty) || 0;
        const purchasePricePerUnit = parseFloat(stockData.purchasePricePerUnit) || 0;
        const purchasedDiscount = parseFloat(stockData.purchasedDiscount) || 0;

        // Calculate totalAmount based on the formula
        const calculatedTotal = (purchasedQty * purchasePricePerUnit) - ((purchasedQty * purchasePricePerUnit) * (purchasedDiscount / 100));
        const calculatedAmount = purchasedQty * purchasePricePerUnit;

        // Update totalAmount in state
        setStockData(prevData => ({
            ...prevData,
            purchasedAmount: calculatedAmount.toFixed(2), // Formats to 2 decimal places
            totalAmount: calculatedTotal.toFixed(2), // Formats to 2 decimal places
        }));
    }, [
        stockData.purchasedQty,
        stockData.purchasePricePerUnit,
        stockData.purchasedDiscount
    ]);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setStockData({
            ...stockData,
            [name]: value,
        });
        // Initialize error message
        let error = '';

        // Validation logic based on field name
        switch (name) {
            case 'purchasedQty':
                if (Number(value) <= 0) {
                    error = 'Purchased Qty cannot be 0 or less than 0';
                }
                break;
            case 'purchasePricePerUnit':
                if (Number(value) <= 0) {
                    error = 'The purchase price cannot be 0 or less than 0 per unit';
                }
                break;
            case 'purchasedDiscount':
                if (Number(value) < 0) {
                    error = 'The purchase discount cannot be less than 0';
                } else if (Number(value) >= 100) {
                    error = 'The purchase discount cannot be greater than 100';
                }
                break;
            case 'sellingPricePerUnit':
                if (Number(stockData.purchasePricePerUnit) > Number(value)) {
                    error = 'The selling price cannot be lower than the purchase price per unit';
                }
                break;
            case 'sellingDiscountPerUnit':
                if (Number(stockData.purchasePricePerUnit) < Number(stockData.purchasePricePerUnit) - (Number(stockData.purchasePricePerUnit) * (Number(value) / 100))) {
                    error = 'After processing the sales discount cannot be less than the price per unit';
                }
                break;
            case 'item':
                if (value === '-1' || value.trim() === '') {
                    error = 'Item is required';
                }
                break;
            case 'expiryDate':
                const today = new Date().setHours(0, 0, 0, 0); // Current date with time set to 00:00
                const selectedDate = new Date(value).setHours(0, 0, 0, 0); // Expiry date with time set to 00:00

                if (!value) {
                    error = 'Expiry date is required';
                } else if (selectedDate < today) {
                    error = 'Expiry date cannot be in the past';
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

        setStockErrors({
            ...stockErrors,
            [name]: error,
        });
    };

    const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const item = event.target.value;
        setSelectedItem(item);
        setStockData(prevData => ({
            ...prevData,
            item: item,
        }));

        let error = '';
        if (item === '-1' || item.trim() === '') {
            error = 'Item is required';
        }

        setStockErrors(prevErrors => ({
            ...prevErrors,
            item: error,
        }));
    };

    const handleUpdateStock = (updatedStock: {
        id: number;
        purchasedAmount: number;
        purchasedQty: number;
        purchasedDiscount: number;
        availableQty: number;
        purchasePricePerUnit: number;
        sellingPricePerUnit: number;
        sellingDiscountPerUnit: number;
        totalAmount: number;
        expiryDate: string;
        description: string;
        item: {
            id: number;
            name: string;
            category: { name: string };
            brand: { name: string };
            unit: { unitName: string; unitSymbology: string };
        };
    }) => {
        setStocks(prevStocks =>
            prevStocks.map(stock =>
                stock.id === updatedStock.id ? updatedStock : stock
            )
        );
    };

    const handleStockSaveEvent = async () => {
        const validationErrors = {
            purchasedAmount: '',
            purchasedQty: '',
            purchasedDiscount: '',
            availableQty: '',
            purchasePricePerUnit: '',
            sellingPricePerUnit: '',
            sellingDiscountPerUnit: '',
            totalAmount: '',
            expiryDate: '',
            description: '',
            item: '',
        };

        let isValid = true;

        // Validate each field
        if (Number(stockData.purchasedQty) <= 0) {
            validationErrors.purchasedQty = 'Purchased Qty cannot be 0 or less than 0';
            isValid = false;
        }

        if (Number(stockData.purchasePricePerUnit) <= 0) {
            validationErrors.purchasePricePerUnit = 'The purchase price cannot be 0 or less than 0 per unit';
            isValid = false;
        }

        if (Number(stockData.purchasedDiscount) <= 0) {
            validationErrors.purchasedDiscount = 'The purchase discount cannot be less than 0';
            isValid = false;
        } else if (Number(stockData.purchasedDiscount) <= 0) {
            validationErrors.purchasedDiscount = 'The purchase discount cannot be greater than 100';
            isValid = false;
        }

        if (Number(stockData.purchasePricePerUnit) > Number(stockData.sellingPricePerUnit)) {
            validationErrors.sellingPricePerUnit = 'The selling price cannot be lower than the purchase price per unit';
            isValid = false;
        }

        if (Number(stockData.purchasePricePerUnit) < Number(stockData.purchasePricePerUnit) - (Number(stockData.purchasePricePerUnit) * (Number(stockData.sellingDiscountPerUnit) / 100))) {
            validationErrors.sellingDiscountPerUnit = 'After processing the sales discount cannot be less than the price per unit';
            isValid = false;
        }

        if (stockData.item === '-1' || stockData.item.trim() === '') {
            validationErrors.item = 'Item is required';
            isValid = false;
        }


        const today = new Date().setHours(0, 0, 0, 0); // Current date with time set to 00:00
        const selectedDate = new Date(stockData.expiryDate).setHours(0, 0, 0, 0); // Expiry date with time set to 00:00

        if (!stockData.expiryDate) {
            validationErrors.expiryDate = 'Expiry date is required';
            isValid = false;
        } else if (selectedDate < today) {
            validationErrors.expiryDate = 'Expiry date cannot be in the past';
            isValid = false;
        }

        if (stockData.description.trim().length > 500) {
            validationErrors.description = 'Description cannot exceed 500 characters';
            isValid = false;
        }

        setStockErrors(validationErrors);

        if (!isValid) {
            alert("Please fix the errors in the form before submitting.");
            return;
        }
        const savedStock = await stockAPIController.saveStock(stockData);
        if (savedStock) {
            // @ts-ignore
            const item = items.find(item => item.id === parseInt(selectedItem)) ||
                {
                    id: 0,
                    name: '',
                    category: {name: ''},
                    brand: {name: ''},
                    unit: {unitName: '', unitSymbology: ''},
                };

            const formattedStock: Stock = {
                id: savedStock.data.id,
                purchasedAmount: Number(stockData.purchasedAmount),
                purchasedQty: Number(stockData.purchasedQty),
                purchasedDiscount: Number(stockData.purchasedDiscount),
                availableQty: Number(stockData.availableQty),
                purchasePricePerUnit: Number(stockData.purchasePricePerUnit),
                sellingPricePerUnit: Number(stockData.sellingPricePerUnit),
                sellingDiscountPerUnit: Number(stockData.sellingDiscountPerUnit),
                totalAmount: Number(stockData.totalAmount),
                expiryDate: stockData.expiryDate,
                description: stockData.description,
                item: item,
            };


            setStocks([...stocks, formattedStock]);
            setTotalElements(prevTotal => prevTotal + 1);

            setStockData({
                purchasedAmount: '',
                purchasedQty: '',
                purchasedDiscount: '',
                availableQty: '',
                purchasePricePerUnit: '',
                sellingPricePerUnit: '',
                sellingDiscountPerUnit: '',
                totalAmount: '',
                expiryDate: '',
                description: '',
                item: '',
            });

            setStockErrors({
                purchasedAmount: '',
                purchasedQty: '',
                purchasedDiscount: '',
                availableQty: '',
                purchasePricePerUnit: '',
                sellingPricePerUnit: '',
                sellingDiscountPerUnit: '',
                totalAmount: '',
                expiryDate: '',
                description: '',
                item: '',
            });
            alert("Stock saved successfully!");
        } else {
            alert("Failed to save stock.");
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this stock?");
        if (!confirmed) return;

        try {
            const response = await stockAPIController.deleteStock(id);
            if (response.state === "OK") {
                setStocks(prevStocks => prevStocks.filter(stock => stock.id !== id));
                setTotalElements(prevTotal => prevTotal - 1);
                alert("Stock deleted successfully!");
            } else if (response && response.state === "BAD_REQUEST") {
                alert(response.message || "Failed to delete stock.");
            } else {
                alert("Failed to delete stock.");
            }
        } catch (e) {
        }
    };

    return (
        <section className='h-max flex w-[95%] flex-col justify-center'>
            <section className='text-[#005285] flex flex-row justify-start mt-5'>
                <h3>Manage Stock and Items &gt; Stock</h3>
            </section>
            {/* Form section */}
            <section
                className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 p-5 rounded-xl shadow-md'>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="purchasedQty"
                        placeholder={'0.00'}
                        label={'Purchased Qty'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedQty}
                        onChange={handleStockChange}
                        msg={stockErrors.purchasedQty}
                    />
                    <TextField
                        name="purchasePricePerUnit"
                        placeholder={'0.00'}
                        label={'Purchased Price Per Unit'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasePricePerUnit}
                        onChange={handleStockChange}
                        msg={stockErrors.purchasePricePerUnit}
                    />
                    <TextField
                        name="purchasedAmount"
                        placeholder={'0.00'}
                        label={'Purchased Amount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedAmount}
                        onChange={handleStockChange}
                        msg={stockErrors.purchasedAmount}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="purchasedDiscount"
                        placeholder={'0.00'}
                        label={'Purchased discount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.purchasedDiscount}
                        onChange={handleStockChange}
                        msg={stockErrors.purchasedDiscount}
                    />
                    <TextField
                        name="totalAmount"
                        placeholder={'0.00'}
                        label={'Total Amount'}
                        type={'number'}
                        important={"*"}
                        value={stockData.totalAmount}
                        onChange={handleStockChange}
                        msg={stockErrors.totalAmount}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextField
                        name="sellingPricePerUnit"
                        placeholder={'0.00'}
                        label={'Selling Price Per Unit'}
                        type={'number'}
                        important={"*"}
                        value={stockData.sellingPricePerUnit}
                        onChange={handleStockChange}
                        msg={stockErrors.sellingPricePerUnit}
                    />
                    <TextField
                        name="sellingDiscountPerUnit"
                        placeholder={'0.00'}
                        label={'Selling Discount Per Unit'}
                        type={'number'}
                        important={"*"}
                        value={stockData.sellingDiscountPerUnit}
                        onChange={handleStockChange}
                        msg={stockErrors.sellingDiscountPerUnit}
                    />
                    <HiddenTextField/>
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <div className='flex-grow-[2.3] mx-3 my-3 gap-1 flex flex-col justify-start'>
                        <div className='flex flex-row'>
                            <label className='text-black flex justify-start'>Item</label>
                            <small className={`text-red-600 text-[16px]`}>*</small>
                        </div>
                        <div className="custom-select-wrapper">
                            <select
                                value={selectedItem}
                                name={"item"}
                                onChange={handleItemChange}
                                className='custom-select'
                            >
                                <option value="-1">Select an item</option>
                                {items.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name + '-' + option.brand.name + '-' + option.category.name + '-' + option.unit.unitSymbology + '(' + option.unit.unitName + ')'}
                                    </option>
                                ))}
                            </select>
                            <span className="custom-arrow"></span> {/* Custom dropdown arrow */}
                        </div>
                        <div className={`h-[5px]`}>
                            <small className={`text-start text-red-600 block`}>{stockErrors.item}</small>
                        </div>
                    </div>
                    <TextField
                        name="expiryDate"
                        label={'Expiry date'}
                        type={'date'}
                        important={"*"}
                        value={stockData.expiryDate}
                        onChange={handleStockChange}
                        msg={stockErrors.expiryDate}
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                    <TextArea
                        name="description"
                        placeholder={'Description'}
                        label={'Description'}
                        value={stockData.description}
                        onChange={handleStockChange}
                        msg={stockErrors.description}
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
        </section>
    );
};
