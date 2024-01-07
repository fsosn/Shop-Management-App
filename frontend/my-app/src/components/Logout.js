import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useCookies} from "react-cookie";

const Logout = ({onLogout}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
    useEffect(() => {
        removeCookie('jwtToken');
        localStorage.removeItem('userEmail');
        onLogout();
        console.log('Logout successful')
    }, [onLogout]);

    return <Navigate to="/login"/>;
};

export default Logout;
