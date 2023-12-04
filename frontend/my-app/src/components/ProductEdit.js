import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const ProductEdit = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');
    const token = localStorage.getItem('jwtToken');

    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
    });

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
        setProduct((prevProduct) => ({...prevProduct, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (productId) {
            fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_PRODUCTS_BASEPATH +
                process.env.REACT_APP_UPDATE +
                '?id=' + productId, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
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
                    console.error('Error updating product:', error);
                });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
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
                                            className="form-control"
                                        />
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
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="price"
                                           className="col-sm-3 col-form-label text-right font-weight-bold">
                                        Price
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row justify-content-center">
                                    <div className="col-sm-6 text-center">
                                        <button type="submit" className="btn btn-success btn-block">
                                            Update
                                        </button>
                                    </div>
                                    <div className="col-sm-6 text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/products')}
                                            className="btn btn-primary btn-block"
                                        >
                                            Go back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEdit;
