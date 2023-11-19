import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ProductList from './components/ProductList';
import ProductAdd from './components/ProductAdd';
import ProductEdit from './components/ProductEdit';
import Homepage from './components/Homepage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/products/add" element={<ProductAdd/>}/>
                <Route path="/products/edit" element={<ProductEdit/>}/>
                <Route path="/" element={<Homepage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
