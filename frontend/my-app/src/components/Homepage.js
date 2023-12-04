import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header bg-info text-center text-white">
                            <h3>Shop management platform</h3>
                        </div>
                        <div className="card-body">
                            <Link to="/products" className="btn btn-primary btn-block">
                                Products
                            </Link>
                            <br/>
                            <Link to="/logout" className="btn btn-danger btn-block">
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
