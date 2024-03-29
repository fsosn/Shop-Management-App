import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (repeatPassword !== password) {
            setRepeatPasswordError('Passwords do not match.');
            return;
        } else {
            setRepeatPasswordError('');
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            const response = await fetch(
                process.env.REACT_APP_HOST +
                process.env.REACT_APP_API_AUTH +
                process.env.REACT_APP_REGISTER, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                    credentials: 'include',
                    mode: 'cors',
                });

            if (response.ok) {
                navigate('/');
            } else {
                const errorResponse = await response.json();
                if (response.status === 500) {
                    setRegistrationError('E-mail is already taken.');
                } else {
                    console.error('Error during registration:', errorResponse);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="row justify-content-center">
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-header text-center form-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${registrationError ? 'is-invalid' : ''}`}
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {registrationError && (
                                        <div className="invalid-feedback form-label-extras">
                                            {registrationError}
                                        </div>
                                    )}
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
                                <div className="mb-3">
                                    <label htmlFor="repeatPassword" className="form-label">
                                        Confirm password:
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${repeatPasswordError ? 'is-invalid' : ''}`}
                                        id="repeatPassword"
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                    />
                                    {repeatPasswordError && (
                                        <div className="invalid-feedback form-label-extras">
                                            {repeatPasswordError}
                                        </div>
                                    )}
                                </div>
                                <div className="text-center sign-button-container">
                                    <button type="submit"
                                            className="btn btn-block d-grid gap-2 col-6 mx-auto sign-button">
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center form-label-extras">
                                <p>Already have an account? <a className="text-decoration-none href-color"
                                                               href="/login">Sign In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
