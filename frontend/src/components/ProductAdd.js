import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";

const ProductAdd = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
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
        if ((name === 'price' || name === 'stock') && !/^\d*\.?\d*$/.test(value)) {
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
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-header form-header text-center">
                            <h3>{t('addProduct')}</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="form-font">
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col col-form-label text-end form-font">
                                        {t('title')}
                                    </label>
                                    <div className="col">
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
                                <div className="row mb-3">
                                    <label htmlFor="description" className="col col-form-label text-end form-font">
                                        {t('description')}
                                    </label>
                                    <div className="col">
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
                                <div className="row mb-3">
                                    <label htmlFor="price" className="col col-form-label text-end form-font">
                                        {t('price')}
                                    </label>
                                    <div className="col">
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
                                <div className="row mb-4">
                                    <label htmlFor="stock" className="col col-form-label text-end form-font">
                                        {t('stock')}
                                    </label>
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="stock"
                                            id="stock"
                                            value={product.stock}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col text-end">
                                        <button type="submit" className="btn btn-block btn-success button-width">
                                            {t('save')}
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/products')}
                                            className="btn btn-block btn-primary button-width"
                                        >
                                            {t('goBack')}
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
