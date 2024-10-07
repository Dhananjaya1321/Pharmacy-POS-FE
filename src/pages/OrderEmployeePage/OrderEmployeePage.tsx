import {Footer} from "../Footer/Footer";
import React, {useState} from "react";
import {TopNavBar} from "../TopNavBar/TopNavBar";
import {TextField} from "../../component/TextField/TextFild";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import NewCustomerModal from "../../modals/NewCustomerModal/NewCustomerModal";
import Autocomplete from "@mui/material/Autocomplete";

import customerAPIController from "../../controller/CustomerAPIController";
import orderAPIController from "../../controller/OrderAPIController";

// types.ts (Optional: You can also define this in the same file)
export interface Customer {
    id: string;
    name: string;
    contact: string;
    email: string;
    nic: string;
    address: string;
}


interface Item {
    id: number;
    name: string;
    category: {
        name: string
    };
    brand: {
        name: string
    };
    unit: {
        unitName: string;
        unitSymbology: string;
    };
    stock: {
        id: number;
        availableQty: number;
        sellingPricePerUnit: number;
        sellingDiscountPerUnit: number;
    };
}

export const OrderEmployeePage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    // Callback function to handle new customer data
    const handleNewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handleCustomerSearch = async (inputValue: string) => {
        if (inputValue.length < 3) return;
        const response = await orderAPIController.customerSearch(inputValue);
        setCustomers(response.data);
    };
    const handleItemSearch = async (inputValue: string) => {
        const response = await orderAPIController.itemSearch(inputValue);
        setItems(response.data);
    };

    return (
        <section className='bg-[#fbfbfb] h-max flex w-full flex-col justify-center'>
            <TopNavBar/>
            <main className="mt-[70px] w-full flex justify-center bg-[#fbfbfb]">
                <section
                    className='bg-[#fbfbfb] gap-5 w-[98%] flex flex-row flex-wrap items-center justify-center'>
                    <div className="bg-white p-5 w-[68%] h-max rounded-xl shadow-md">
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>

                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Customer</label>
                                    <small
                                        className={`text-red-600 text-[16px] block`}>*</small>
                                </div>
                                <Autocomplete
                                    options={customers}
                                    getOptionLabel={(option) => `${option.name} (${option.contact})`}
                                    value={selectedCustomer}
                                    onChange={(event, newValue) => setSelectedCustomer(newValue)}
                                    onInputChange={(event, value) => handleCustomerSearch(value)}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                            <input
                                                {...params.inputProps}
                                                className="text-input"
                                                type="text"
                                                placeholder="Search customer..."
                                                value={params.inputProps.value}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className='mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start h-[24px]'></label>
                                </div>
                                <NewCustomerModal onCustomerSaved={handleNewCustomer}/>
                            </div>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Item</label>
                                    <small
                                        className={`text-red-600 text-[16px] block`}>*</small>
                                </div>
                                <Autocomplete
                                    options={items}
                                    getOptionLabel={(option) => `${option.name} - ${option.brand.name} - price Rs.${option.stock.sellingPricePerUnit} - ${option.unit.unitName} (${option.unit.unitName})`}
                                    value={selectedItem}
                                    onChange={(event, newValue) => setSelectedItem(newValue)}
                                    onInputChange={(event, value) => handleItemSearch(value)}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                            <input
                                                {...params.inputProps}
                                                className="text-input"
                                                type="text"
                                                placeholder="Search item..."
                                                value={params.inputProps.value}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <TextField
                                name="qty"
                                placeholder={'0.00'}
                                label={'QTY'}
                                important={"*"}
                                type={'number'}
                                // value={itemData.name}
                                // onChange={handleItemChange}
                                // msg={itemErrors.name}
                            />
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start h-[16px]'></label>
                                </div>
                                <button className="h-[45px] rounded text-white px-4 bg-blue-950">Add To Cart</button>
                            </div>
                        </div>
                        <section
                            className='bg-white flex flex-row flex-wrap items-center justify-center mt-5 '>
                            <TableContainer
                                component={Paper}
                                style={{
                                    height: "300px", // Set the fixed height
                                    overflowY: "auto", // Enable scrolling when content exceeds height
                                }}
                            >
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>QTY</TableCell>
                                            <TableCell>Discount</TableCell>
                                            <TableCell>Sub Total</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/*{users.length > 0 ? (*/}
                                        {/*    users.map((row) => (*/}
                                        {/*        <TableRow key={row.id}*/}
                                        {/*                  sx={{'&:last-child td, &:last-child th': {border: 0}}}>*/}
                                        {/*            <TableCell component="th" scope="row">{row.name || '-'}</TableCell>*/}
                                        {/*            <TableCell>{row.username || '-'}</TableCell>*/}
                                        {/*            <TableCell>{row.nic || '-'}</TableCell>*/}
                                        {/*            <TableCell>{row.email || '-'}</TableCell>*/}
                                        {/*            <TableCell>{row.address || '-'}</TableCell>*/}
                                        {/*            <TableCell>{row.contact || '-'}</TableCell>*/}
                                        {/*            <TableCell>{row.role.name || '-'}</TableCell>*/}
                                        {/*            <TableCell sx={{display: 'flex', flexDirection: 'row'}}>*/}
                                        {/*                <button*/}
                                        {/*                    className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"*/}
                                        {/*                    onClick={() => handleDelete(row.id)}>*/}
                                        {/*                    <FontAwesomeIcon icon={faTrash}/>*/}
                                        {/*                </button>*/}
                                        {/*            </TableCell>*/}
                                        {/*        </TableRow>*/}
                                        {/*    ))*/}
                                        {/*) : (*/}
                                        <TableRow>
                                            <TableCell>No users found.</TableCell>
                                        </TableRow>
                                        {/*)}*/}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </section>
                    </div>
                    <div
                        className="justify-between bg-white w-[27%] h-[500px] rounded-xl shadow-md flex flex-col self-start">
                        <header className="flex flex-col justify-center p-4">
                            <h1 className="text-2xl">Pharmacy Name</h1>
                            <p className="text-[14px] text-gray-400">Pharmacy address</p>
                            <p className="text-[14px] text-gray-400">Pharmacy contact</p>

                            <p className="text-[14px] mt-4 text-gray-400">Pharmacy Name</p>
                            <p className="text-[14px] text-gray-400 mb-1">Customer Name</p>
                            <hr/>
                        </header>
                        <main></main>
                        <footer className="flex flex-col justify-center p-4">
                            <p className="text-[14px] text-gray-400">date</p>
                            <hr/>

                            <p className="text-[12px] mt-4 text-gray-400">Thank you for shopping with us. Please come
                                again </p>
                            <p className="text-[12px] text-gray-400 mb-1"><a className="text-blue-900"
                                                                             href="https://novalabsglobal.com">Power by
                                Nova Labs Global</a></p>

                        </footer>
                    </div>
                </section>
            </main>
            <Footer/>
        </section>
    );
};
