import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useCookies} from "react-cookie";

const Logout = ({onLogout}) => {
    const [, , removeCookie] = useCookies(['jwtToken']);
    useEffect(() => {
        removeCookie('jwtToken');
        localStorage.removeItem('userEmail');
        onLogout();
    }, [onLogout, removeCookie]);

    return <Navigate to="/login"/>;
};

export default Logout;
