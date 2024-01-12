import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';

import ProductAdd from './components/ProductAdd';
import ProductEdit from './components/ProductEdit';
import Login from './components/Login';
import Register from './components/Register';
import Logout from "./components/Logout";
import {useCookies} from "react-cookie";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardSettings from "./pages/DashboardSettings";
import {ThemeProvider} from "./context/ThemeProvider";
import DashboardOrders from "./pages/DashboardOrders";
import HandleOauthSuccess from "./components/HandleOauthSuccess";

const PrivateRoute = ({element, isAuthenticated}) => {
    return isAuthenticated ? element : <Navigate to="/login"/>;
};

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [cookies] = useCookies(['jwtToken']);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = cookies['jwtToken'];

        if (storedToken) {
            setAuthenticated(true);
        }

        setLoading(false);
    }, [cookies]);

    if (isLoading) {
        return <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        setAuthenticated(false);
    };

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route
                        path="/orders"
                        element={<PrivateRoute element={<DashboardOrders/>} isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/products"
                        element={<PrivateRoute element={<DashboardProducts/>} isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/products/add"
                        element={<PrivateRoute element={<ProductAdd/>} isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/products/edit"
                        element={<PrivateRoute element={<ProductEdit/>} isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/settings"
                        element={<PrivateRoute element={<DashboardSettings/>} isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/products"/>
                            ) : (
                                <Navigate to="/login"/>
                            )
                        }
                    />
                    <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
                    <Route path="/oauth-successful-login" element={<HandleOauthSuccess onLogin={handleLogin}/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
