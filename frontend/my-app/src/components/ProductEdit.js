import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get('id');

    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        if (productId) {
            axios
                .get(`http://localhost:8080/api/products/get/${productId}`)
                .then((response) => setProduct(response.data))
                .catch((error) => console.error('Error fetching product data:', error));
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (productId) {
            axios
                .put(`http://localhost:8080/api/products/update?id=${productId}`, product)
                .then((response) => {
                    console.log('Product updated successfully:', response.data);
                    navigate('/products');
                })
                .catch((error) => {
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
                                        <input type="text" value={product.id} readOnly className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-sm-3 col-form-label text-right font-weight-bold">
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
                                    <label htmlFor="description" className="col-sm-3 col-form-label text-right font-weight-bold">
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
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right font-weight-bold">
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
