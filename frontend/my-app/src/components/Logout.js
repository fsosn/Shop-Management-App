import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

const Logout = ({onLogout}) => {
    useEffect(() => {
        onLogout();
        localStorage.removeItem('jwtToken');
    }, [onLogout]);
    console.log('Logout successful')

    return <Navigate to="/login"/>;
};

export default Logout;
