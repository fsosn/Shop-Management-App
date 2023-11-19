import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                console.log('Product added successfully');
                // Redirect to the product list page after successful submission
                navigate('/products');
            } else {
                console.error('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header bg-info text-center text-white">
                            <h3>Add Product</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="title" className="col-sm-3 col-form-label text-right">
                                        <b>Title</b>
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
                                <div className="form-group row">
                                    <label htmlFor="description" className="col-sm-3 col-form-label text-right">
                                        <b>Description</b>
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
                                <div className="form-group row">
                                    <label htmlFor="price" className="col-sm-3 col-form-label text-right">
                                        <b>Price</b>
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
                                <div className="form-group row justify-content-center">
                                    <div className="col-sm-6 text-center">
                                        <button type="submit" className="btn btn-success btn-block">
                                            Save
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;
