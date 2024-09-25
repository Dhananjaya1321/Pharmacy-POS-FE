import React, { useEffect, useState } from 'react';
import './App.css';
import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Order } from "./pages/Order/Order";
import { Customer } from "./pages/Customer/Customer";
import { Supplier } from "./pages/Supplier/Supplier";
import { ShopAndUser } from "./pages/ShopAndUser/ShopAndUser";
import { StockAndItems } from "./pages/StockAndItems/StockAndItems";
import { Items } from "./pages/Items/Items";
import { Stock } from "./pages/Stock/Stock";
import { Brands } from "./pages/Brands/Brands";
import { Units } from "./pages/Units/Units";
import { Categories } from "./pages/Categories/Categories";
import { CreateAccount } from "./pages/CreateAccount/CreateAccount";
import { Login } from "./pages/Login/Login";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { VerifyCode } from "./pages/VerifyCode/VerifyCode";
import { ChangePassword } from "./pages/ChangePassword/ChangePassword";
import loginAPIController from "./controller/LoginAPIController";
import {OrderEmployeePage} from "./pages/OrderEmployeePage/OrderEmployeePage";

function AppContent() {
    const [hasAccount, setHasAccount] = useState<boolean | null>(null);
    const navigate = useNavigate();

    // Fetch pharmacy account status before rendering the login page
    useEffect(() => {
        const checkPharmacyAccount = async () => {
            try {
                const response = await loginAPIController.checkHasAccount();
                setHasAccount(response.data);
            } catch (error) {
                setHasAccount(false);
            }
        };

        checkPharmacyAccount();
    }, []);

    // Perform navigation after rendering when account check is completed
    useEffect(() => {
        if (hasAccount === false) {
            navigate('/create-account'); // Redirect to the create account page if no account exists
        }
    }, [hasAccount, navigate]);

    // If the status is not yet fetched, show a loading spinner or similar UI
    if (hasAccount === null) {
        return <div>Loading...</div>;
    }

    // Render the routes if the pharmacy has an account
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/order-employee-page" element={<OrderEmployeePage />} />
            <Route path="/home" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="order" element={<Order />} />
                <Route path="stock-and-items" element={<StockAndItems />}>
                    <Route index element={<Items />} />
                    <Route path="items" element={<Items />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="units" element={<Units />} />
                    <Route path="categories" element={<Categories />} />
                </Route>
                <Route path="customer" element={<Customer />} />
                <Route path="supplier" element={<Supplier />} />
                <Route path="shop-and-user" element={<ShopAndUser />} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

export default App;
