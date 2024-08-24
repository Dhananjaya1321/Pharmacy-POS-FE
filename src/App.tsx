import React from 'react';
import './App.css';
import {Home} from "./pages/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {Order} from "./pages/Order/Order";
import {Customer} from "./pages/Customer/Customer";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route  path="order" element={<Order/>}/>
                        <Route  path="customer" element={<Customer/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
