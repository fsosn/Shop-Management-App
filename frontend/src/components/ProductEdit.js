import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";

const ProductEdit = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
    const [cookies] = useCookies(['jwtToken']);
    const token = cookies.jwtToken;

    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
        stock: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (productId) {
            fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_PRODUCTS_BASEPATH +
                process.env.REACT_APP_GET +
                '/' + productId, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching product data: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setProduct(data))
                .catch(error => console.error('Error fetching product data:', error));
        }
    }, [productId, token]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'price' && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        setProduct((prevProduct) => ({...prevProduct, [name]: value}));
        setValidationErrors((prevErrors) => ({...prevErrors, [name]: ''}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!product.title.trim()) {
            errors.title = 'Title cannot be empty.';
        }

        if (!product.description.trim()) {
            errors.description = 'Description cannot be empty.';
        }

        const stock = parseInt(product.stock, 10);
        if (isNaN(stock) || stock < 0) {
            errors.stock = 'Stock must be a non-negative number';
        }

        if (product.price <= 0) {
            errors.price = 'Price cannot be 0 or negative.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        if (productId) {
            await fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_PRODUCTS_BASEPATH +
                process.env.REACT_APP_UPDATE +
                '?id=' + productId, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(product),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error updating product: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Product updated successfully:', data);
                    navigate('/products');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-header bg-info text-white text-center">
                            <h3>Edit Product</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="id" className="col-sm-3 col-form-label text-right font-weight-bold">
                                        ID
                                    </label>
                                    <div className="col-sm-9">
                                        <input type="text" value={product.id} readOnly className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title"
                                           className="col-sm-3 col-form-label text-right font-weight-bold">
                                        Title
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            name="title"
                                            value={product.title}
                                            onChange={handleChange}
                                            className={`form-control ${validationErrors.title && 'is-invalid'}`}
                                        />
                                        <div className="invalid-feedback">{validationErrors.title}</div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="description"
                                           className="col-sm-3 col-form-label text-right font-weight-bold">
                                        Description
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            name="description"
                                            value={product.description}
                                            onChange={handleChange}
                                            className={`form-control ${validationErrors.description && 'is-invalid'}`}
                                        />
                                        <div className="invalid-feedback">{validationErrors.description}</div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="price"
                                           className="col-sm-3 col-form-label text-right font-weight-bold">
                                        Price
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            className={`form-control ${validationErrors.price && 'is-invalid'}`}
                                        />
                                        <div className="invalid-feedback">{validationErrors.price}</div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="stock"
                                           className="col-sm-3 col-form-label text-right font-weight-bold">
                                        Stock
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="number"
                                            name="stock"
                                            value={product.stock}
                                            onChange={handleChange}
                                            className={`form-control ${validationErrors.stock && 'is-invalid'}`}
                                        />
                                        <div className="invalid-feedback">{validationErrors.stock}</div>
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center">
                                    <div className="col-sm-4 text-center">
                                        <button type="submit" className="btn btn-success btn-block button-width">
                                            Update
                                        </button>
                                    </div>
                                    <div className="col-sm-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/products')}
                                            className="btn btn-primary btn-block button-width"
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

export default ProductEdit;
