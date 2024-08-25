import React from 'react';
import './App.css';
import {Home} from "./pages/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {Order} from "./pages/Order/Order";
import {Customer} from "./pages/Customer/Customer";
import {Supplier} from "./pages/Supplier/Supplier";
import {ShopAndUser} from "./pages/ShopAndUser/ShopAndUser";
import {StockAndItems} from "./pages/StockAndItems/StockAndItems";
import {Items} from "./pages/Items/Items";
import {Stock} from "./pages/Stock/Stock";
import {Brands} from "./pages/Brands/Brands";
import {Units} from "./pages/Units/Units";
import {Categories} from "./pages/Categories/Categories";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route  path="order" element={<Order/>}/>
                        <Route path="stock-and-items" element={<StockAndItems />}>
                            <Route path="items" element={<Items />} />
                            <Route path="stock" element={<Stock />} />
                            <Route path="brands" element={<Brands />} />
                            <Route path="units" element={<Units />} />
                            <Route path="categories" element={<Categories />} />
                        </Route>
                        <Route  path="customer" element={<Customer/>}/>
                        <Route  path="supplier" element={<Supplier/>}/>
                        <Route  path="shop-and-user" element={<ShopAndUser/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
