import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/styles.css'

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/get/all', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data._embedded.productList);
                } else {
                    console.error('Error fetching products. Server response:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        void fetchProducts();
    }, []);

    const handleEditClick = (productId) => {
        navigate(`/products/edit?id=${productId}`);
    };

    const handleDeleteClick = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/delete?id=${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                console.log(`Product with ID ${productId} deleted successfully.`);
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
            } else {
                console.error('Error deleting product. Server response:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddClick = () => {
        navigate('/products/add');
    };

    const handleHomepageClick = () => {
        navigate('/');
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header bg-info text-center text-white">
                    <h3>Products</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr className="bg-dark text-white">
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger margin-right-16"
                                            onClick={() => handleDeleteClick(product.id)}
                                        >
                                            <i className="fa fa-trash-o margin-right-4" aria-hidden="true"></i> Delete
                                        </button>
                                        <button
                                            className="btn btn-warning margin-right-16"
                                            onClick={() => handleEditClick(product.id)}
                                        >
                                            <i className="fa fa-pencil-square-o margin-right-4" aria-hidden="true"></i> Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        className="btn btn-success margin-right-16"
                        onClick={handleAddClick}
                    >
                        <i className="fa fa-plus-square margin-right-4" aria-hidden="true"></i> Add
                    </button>
                    <button
                        className="btn btn-primary margin-right-16"
                        onClick={handleHomepageClick}
                    >
                        Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
