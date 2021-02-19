import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './loginform.css';
const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(
            sessionActions.loginUser({ credential, password })
        ).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    return (
        <>
            <div className="login-content">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-header">Sign In</h2>
                    {errors.length > 0 && (
                        <ul className="errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div className="loginInputField">
                        <label htmlFor="username" className="placeLabel">
                            Username or Email
                        </label>
                        <br></br>
                        <input
                            className="textfield"
                            id="username"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div className="loginInputField">
                        <label htmlFor="password">Password </label>
                        <br></br>
                        <input
                            className="textfield"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                    </div>
                    <button className="loginButton" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginFormPage;
