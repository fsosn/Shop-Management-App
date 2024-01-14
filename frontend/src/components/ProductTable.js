import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import '../styles.css'
import {useTranslation} from "react-i18next";

const ProductTable = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cookies] = useCookies(['jwtToken']);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {t} = useTranslation();
    const token = cookies.jwtToken;
    const pageSize = 1;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    process.env.REACT_APP_HOST +
                    process.env.REACT_APP_API_PRODUCTS_BASEPATH +
                    process.env.REACT_APP_GET+
                    '?page=' + `${currentPage}` +
                    '&size=' + `${pageSize}`
                    , {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data._embedded?.productList || []);
                    setTotalPages(data.page.totalPages)
                } else {
                    console.error('Error fetching products. Server response:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        void fetchProducts();
    }, [token, currentPage]);

    const handleEditClick = (productId) => {
        navigate(`/products/edit?id=${productId}`);
    };

    const handleDeleteClick = async (productId) => {
        try {
            const response = await fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_PRODUCTS_BASEPATH +
                process.env.REACT_APP_DELETE +
                '?id=' + productId, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
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

    return (
        <div className="dashboard">
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr className="bg-dark text-white">
                                            <th>ID</th>
                                            <th>{t('title')}</th>
                                            <th>{t('description')}</th>
                                            <th>{t('price')}</th>
                                            <th>{t('stock')}</th>
                                            <th>{t('action')}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.title}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}</td>
                                                <td>{product.stock}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger margin-right-16"
                                                        onClick={() => handleDeleteClick(product.id)}
                                                    >
                                                        <i
                                                            className="fa fa-trash-o margin-right-4"
                                                            aria-hidden="true"
                                                        ></i>{' '}
                                                        {t('delete')}
                                                    </button>
                                                    <button
                                                        className="btn btn-warning margin-right-16"
                                                        onClick={() => handleEditClick(product.id)}
                                                    >
                                                        <i
                                                            className="fa fa-pencil-square-o margin-right-4"
                                                            aria-hidden="true"
                                                        ></i>{' '}
                                                        {t('edit')}
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
                                    <i
                                        className="fa fa-plus-square margin-right-4"
                                        aria-hidden="true"
                                    ></i>{' '}
                                    {t('add')}
                                </button>
                                <nav aria-label="Pagination">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link href-color"
                                               onClick={() => setCurrentPage(currentPage - 1)}>&lsaquo;</a>
                                        </li>
                                        {[...Array(totalPages).keys()].map((page) => (
                                            <li key={page + 1}
                                                className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                                <a className="page-link href-color"
                                                   onClick={() => setCurrentPage(page + 1)}>{page + 1}</a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <a className="page-link href-color"
                                               onClick={() => setCurrentPage(currentPage+1)}>&rsaquo;</a>
                                        </li>
                                    </ul>
                                </nav>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
