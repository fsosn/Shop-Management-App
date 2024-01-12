import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";

const ProductAdd = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        stock: ''
    });
    const [cookies] = useCookies(['jwtToken']);
    const token = cookies.jwtToken;

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'price' && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        setProduct((prevProduct) => ({...prevProduct, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.title.trim()) {
            console.error('Title cannot be empty.');
            return;
        }
        if (!product.description.trim()) {
            console.error('Description cannot be empty.');
            return;
        }

        const stock = parseInt(product.stock, 10);
        if (isNaN(stock) || stock < 0) {
            console.error('Stock must be a non-negative number');
            return;
        }

        if (product.price <= 0) {
            console.error('Price cannot be 0 or negative.');
            return;
        }

        try {
            const response = await fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_PRODUCTS_BASEPATH +
                process.env.REACT_APP_CREATE, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(product),
                });

            if (response.ok) {
                console.log('Product added successfully');
                navigate('/products');
            } else {
                console.error('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header text-center form-header">
                            <h3>Add Product</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row padding-bottom-12">
                                    <label htmlFor="title" className="col-sm-3 col-form-label text-right form-font">
                                        Title
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={product.title}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row padding-bottom-12">
                                    <label htmlFor="description"
                                           className="col-sm-3 col-form-label text-right form-font">
                                        Description
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            value={product.description}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row padding-bottom-12">
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right form-font">
                                        Price
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row padding-bottom-12">
                                    <label htmlFor="stock" className="col-sm-3 col-form-label text-right form-font">
                                        Stock
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="number"
                                            name="stock"
                                            id="stock"
                                            value={product.stock}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center">
                                    <div className="col-sm-4 text-center">
                                        <button type="submit"
                                                className="btn btn-block btn-success d-grid gap-2 col-12 mx-auto">
                                            Save
                                        </button>
                                    </div>
                                    <div className="col-sm-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/products')}
                                            className="btn btn-block btn-primary d-grid gap-2 col-12 mx-auto"
                                        >
                                            Go back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;
