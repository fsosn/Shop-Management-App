import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import '../styles.css';

const Login = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [cookies, setCookie] = useCookies(['jwtToken']);

    const handleLogin = async (e) => {
        e.preventDefault();

        const credentials = {
            email,
            password,
        };

        try {
            const response = await fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_AUTH +
                process.env.REACT_APP_AUTHENTICATE,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                setCookie('jwtToken', token, {path: '/', sameSite: 'strict'});
                localStorage.setItem('userEmail', credentials.email);
                console.log('Login successful for user: ' + credentials.email);
                onLogin(token);
                navigate('/products');
            } else {
                console.error('Error during login:', await response.text());
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header bg-info text-center text-white">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-center">
                                <button type="submit" className="btn btn-success btn-block sign-button ">
                                    Sign In
                                </button></div>
                            </form>
                            <div className="mt-3 text-center">
                                <p>Don't have an account? <a href="/register">Register</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
