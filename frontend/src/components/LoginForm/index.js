import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import './loginform.css';
import { findUser } from '../../store/user';
const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(sessionActions.loginUser({ credential, password }));
            const user = await dispatch(findUser(credential));
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        } catch (err) {
            console.log(err);
        }
        history.goBack();
        return dispatch(
            sessionActions.loginUser({ credential, password })
        ).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    const demoUserLogin = async (e) => {
        e.preventDefault();
        const user = await dispatch(
            sessionActions.loginUser({
                credential: 'Demo-lition',
                password: 'password',
            })
        );
        const loggedInUser = await dispatch(findUser(user.username));
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        history.goBack();
    };

    return (
        <>
            <Helmet>
                <title>Login - Squadron</title>
                <meta name="description" content="login page"></meta>
            </Helmet>
            <div className="login-content">
                <form onSubmit={handleSubmit} className="login-form">
                    <span className="login-header">Sign In</span>
                    {errors.length > 0 && (
                        <ul className="errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div className="loginInputField">
                        <input
                            className="textfield"
                            id="username"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            autoComplete="username"
                            required
                        ></input>
                        <label htmlFor="username" className="placeLabel">
                            Username or Email
                        </label>
                    </div>
                    <div className="loginInputField">
                        <input
                            className="textfield"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                            required
                        ></input>
                        <label htmlFor="password" className="placeLabel">
                            Password
                        </label>
                    </div>
                    <div className="buttonContainer">
                        <button className="loginButton" type="submit">
                            Login
                        </button>
                        <button onClick={demoUserLogin} className="loginButton">
                            Demo User
                        </button>
                    </div>
                    <div className="registerLinkContainer">
                        <a className="registerLink" href="/register">
                            Don't have an account?
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
