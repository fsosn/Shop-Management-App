import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header bg-info text-center text-white">
                            <h3>Shop management platform</h3>
                        </div>
                        <div className="card-body">
                            <button onClick={() => navigate('/products')} className="btn btn-primary btn-block">
                                Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
