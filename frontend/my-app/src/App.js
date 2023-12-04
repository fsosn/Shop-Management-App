import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import ProductList from './components/ProductList';
import ProductAdd from './components/ProductAdd';
import ProductEdit from './components/ProductEdit';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Logout from "./components/Logout";

const PrivateRoute = ({element, isAuthenticated}) => {
    return isAuthenticated ? element : <Navigate to="/login"/>;
};

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const handleLogin = (token) => {
        setAuthenticated(true);
        localStorage.setItem('jwtToken', token);
    };

    const handleLogout = () => {
        setAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/register" element={<Register onRegister={handleLogin}/>}/>
                <Route
                    path="/products"
                    element={<PrivateRoute element={<ProductList/>} isAuthenticated={isAuthenticated}/>}
                />
                <Route
                    path="/products/add"
                    element={<PrivateRoute element={<ProductAdd/>} isAuthenticated={isAuthenticated}/>}
                />
                <Route
                    path="/products/edit"
                    element={<PrivateRoute element={<ProductEdit/>} isAuthenticated={isAuthenticated}/>}
                />
                <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
                <Route
                    path="/"
                    element={<PrivateRoute element={<Homepage/>} isAuthenticated={isAuthenticated}/>}
                />
            </Routes>
        </Router>
    );
};

export default App;
