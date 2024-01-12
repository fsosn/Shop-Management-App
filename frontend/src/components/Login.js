import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import '../styles.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";


const Login = ({onLogin}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setCookie] = useCookies(['jwtToken']);


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
                onLogin();
                navigate('/products');
            } else {
                console.error('Error during login:', await response.text());
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="row justify-content-center">
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-header form-header text-center">
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
                                <div className="text-center sign-button-container">
                                    <button type="submit"
                                            className="btn btn-block d-grid gap-2 col-6 mx-auto sign-button">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center form-label-extras">
                                <p>Don't have an account? <a className="text-decoration-none link-register"
                                                             href="/register">Register</a></p>
                            </div>

                            <hr className="hr-text gradient" data-content="or"/>

                            <div className="d-flex justify-content-center padding-bottom-24">
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <a className="btn sign-button"
                                       href={process.env.REACT_APP_HOST + process.env.REACT_APP_OAUTH_GOOGLE}>
                                        <FontAwesomeIcon className="padding-right-8" icon={faGoogle}/> Sign in with
                                        Google
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
