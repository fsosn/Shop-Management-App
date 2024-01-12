import React, {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate, useSearchParams} from 'react-router-dom';

const HandleOAuthSuccess = ({onLogin}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['jwtToken']);

    useEffect(() => {
        let token = searchParams.get('token');
        let email = searchParams.get('email');

        if (!token || !email) {
            console.error("Invalid URL.");
            navigate("/login");
        }
        setCookie('jwtToken', token, {path: '/', sameSite: 'strict'});
        localStorage.setItem('userEmail', email);
        onLogin();

        navigate("/products");
    }, [navigate, onLogin, searchParams, setCookie]);

    return <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
    </div>;
};

export default HandleOAuthSuccess;
