import {Footer} from "../Footer/Footer";
import React, {useEffect, useState} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import stockAPIController from "../../controller/StockAPIController";
import shopAPIController from "../../controller/ShopAPIController";

// Define the Customer and Item interfaces
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

interface CartItem extends Item {
    qty: number;
    subtotal: number;
}


interface ShopData {
    pharmacyId: number;
    pharmacyName: string;
    address: string;
    contact: string;
}

export const OrderEmployeePage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // Initialize quantity with 1
    const [shopData, setShopData] = useState<ShopData | null>(null);
    const [currentDate, setCurrentDate] = useState<string>("");

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
        const itemsFromBackend: Item[] = response.data; // Ensure that the response contains an array of Item objects

        // Update the item list with the correct availableQty from local state
        const updatedItems = itemsFromBackend.map((item: Item) => {
            const {id: stockId} = item.stock;
            const availableQtyFromLocalState = itemStockMap[stockId] !== undefined ? itemStockMap[stockId] : item.stock.availableQty;

            return {
                ...item,
                stock: {
                    ...item.stock,
                    availableQty: availableQtyFromLocalState,
                }
            };
        });

        setItems(updatedItems);
    };


    const [itemStockMap, setItemStockMap] = useState<{ [key: string]: number }>({}); // Maps stock ID to available qty

    const handleAddToCart = () => {
        if (!selectedItem || quantity <= 0) return;

        const {sellingPricePerUnit, sellingDiscountPerUnit, availableQty, id: stockId} = selectedItem.stock;

        // Get availableQty from local state (if available), else fallback to the item's stock availableQty
        const currentAvailableQty = itemStockMap[stockId] !== undefined ? itemStockMap[stockId] : availableQty;

        // Check if requested quantity exceeds available stock
        if (quantity > currentAvailableQty) {
            alert(`Requested quantity exceeds available stock. Available: ${currentAvailableQty}`);
            return;
        }

        const subtotal = (sellingPricePerUnit - sellingPricePerUnit * (sellingDiscountPerUnit / 100)) * quantity;

        const existingCartItemIndex = cartItems.findIndex(
            (cartItem) => cartItem.id === selectedItem.id && cartItem.stock.id === stockId
        );

        if (existingCartItemIndex >= 0) {
            // Update the existing cart item (increment the quantity and subtotal)
            const updatedCartItems = [...cartItems];
            const existingCartItem = updatedCartItems[existingCartItemIndex];

            existingCartItem.qty += quantity;
            existingCartItem.subtotal += subtotal;

            setCartItems(updatedCartItems);
        } else {
            // Add a new item to the cart
            const newItem: CartItem = {
                ...selectedItem,
                qty: quantity,
                subtotal,
            };

            setCartItems([...cartItems, newItem]);
        }

        // Update availableQty in local state for that stock
        setItemStockMap((prevState) => ({
            ...prevState,
            [stockId]: currentAvailableQty - quantity,
        }));

        // Reset the selected item and quantity
        setQuantity(1);
        setSelectedItem(null);
    };

    const handleRemoveFromCart = (index: number) => {
        const removedItem = cartItems[index];
        const {id: stockId} = removedItem.stock;

        // Get the current availableQty in the local state
        const currentAvailableQty = itemStockMap[stockId] !== undefined ? itemStockMap[stockId] : removedItem.stock.availableQty;

        // Restore the availableQty in the local state by adding back the removed item's qty
        const updatedAvailableQty = currentAvailableQty + removedItem.qty;

        // Update local state with the restored availableQty
        setItemStockMap((prevState) => ({
            ...prevState,
            [stockId]: updatedAvailableQty,
        }));

        // Remove the item from the cart
        const updatedItemsAfterRemoval = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItemsAfterRemoval);
    };

    useEffect(() => {
        const fetchShopData = async () => {
            const response = await shopAPIController.getShopData();
            console.log('Fetched Shop Data:', response); // Debug log
            if (response) {
                setShopData({
                    pharmacyId: response.data.pharmacyId,
                    pharmacyName: response.data.pharmacyName,
                    address: response.data.address,
                    contact: response.data.contact
                });
            }
        };
        fetchShopData();

        const date = new Date();
        const formattedDate = date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    return (
        <section className='bg-[#fbfbfb] h-max flex w-full flex-col justify-center'>
            <TopNavBar/>
            <main className="mt-[70px] w-full flex justify-center bg-[#fbfbfb]">
                <section className='bg-[#fbfbfb] gap-5 w-[98%] flex flex-row flex-wrap items-center justify-center'>
                    <div className="bg-white p-5 w-[68%] h-max rounded-xl shadow-md">
                        <div className='flex flex-row flex-wrap items-center justify-center w-full'>
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start'>Customer</label>
                                    <small className={`text-red-600 text-[16px] block`}>*</small>
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
                                    <small className={`text-red-600 text-[16px] block`}>*</small>
                                </div>
                                <Autocomplete
                                    options={items}
                                    getOptionLabel={(option) => `${option.name} - ${option.brand.name} - price Rs.${option.stock.sellingPricePerUnit} - ${option.unit.unitName} (${option.unit.unitSymbology})`}
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
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                            <div className='grow mx-3 my-3 gap-1 flex flex-col justify-start'>
                                <div className='flex flex-row'>
                                    <label className='text-black flex justify-start h-[16px]'></label>
                                </div>
                                <button className="h-[45px] rounded text-white px-4 bg-blue-950"
                                        onClick={handleAddToCart}>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                        {/* Table to display cart items */}
                        <section className='bg-white flex flex-row flex-wrap items-center justify-center mt-5'>
                            <TableContainer component={Paper} style={{position:"relative",height: "300px", overflowY: "auto"}}>
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
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.stock.sellingPricePerUnit}</TableCell>
                                                    <TableCell>{item.qty}</TableCell>
                                                    <TableCell>{item.stock.sellingDiscountPerUnit}%</TableCell>
                                                    <TableCell>{item.subtotal.toFixed(2)}</TableCell>
                                                    <TableCell>
                                                        <button
                                                            className="rounded-xl w-[40px] h-[40px] text-red-600 hover:bg-red-100"
                                                            onClick={() => handleRemoveFromCart(index)}>
                                                            <FontAwesomeIcon icon={faTrash}/>
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow className=" w-full h-[240px] flex items-center justify-center">
                                                <TableCell colSpan={6}  style={{
                                                    height: "240px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }} className="absolute left-0 right-0 m-auto">
                                                    No items found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </section>
                    </div>
                    <div
                        className="justify-between bg-white w-[27%] h-[500px] rounded-xl shadow-md flex flex-col self-start">
                        <header className="flex flex-col justify-center p-4">
                            <h1 className="text-2xl">{shopData ? shopData.pharmacyName : "Loading..."}</h1>
                            <p className="text-[14px] text-gray-400">{shopData ? shopData.address : "Loading..."}</p>
                            <p className="text-[14px] text-gray-400">{shopData ? shopData.contact : "Loading..."}</p>
                            <p className="text-[14px] mt-4 text-gray-400">
                                {selectedCustomer ? `${selectedCustomer.name}` : "No customer selected"}
                            </p>
                            <hr/>
                        </header>
                        <main>

                        </main>
                        <footer className="flex flex-col justify-center p-4">
                            <p className="text-[14px] text-gray-400">{currentDate}</p>
                            <hr/>
                            <p className="text-[12px] mt-4 text-gray-400">Thank you for shopping with us. Please come
                                again</p>
                            <p className="text-[12px] text-gray-400 mb-1">
                                <a className="text-blue-900" href="https://novalabsglobal.com">Powered by Nova Labs
                                    Global</a>
                            </p>
                        </footer>
                    </div>

                </section>
            </main>
            <Footer/>
        </section>
    );
}
