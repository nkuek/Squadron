import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as sessionActions from '../../store/session';
import './signupform.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(
            sessionActions.signUpUser({
                username,
                email,
                password,
                confirmPassword,
            })
        ).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Sign Up - Squadron</title>
                <meta name="description" content="sign up form"></meta>
            </Helmet>
            <div className="signup-content">
                <form onSubmit={handleSubmit} className="signup-form">
                    <span className="signup-header">Register</span>
                    {errors.length > 0 && (
                        <ul className="errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div className="signupInputField">
                        <input
                            id="username"
                            type="text"
                            value={username}
                            required
                            autoComplete="new-username"
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="signupInputField">
                        <input
                            id="email"
                            type="text"
                            value={email}
                            required
                            autoComplete="new-email"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="signupInputField">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            required
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="signupInputField">
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            required
                            autoComplete="new-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                    </div>
                    <div className="buttonContainer">
                        <button className="signupButton" type="submit">
                            Register
                        </button>
                    </div>
                    <div className="loginLinkContainer">
                        <a className="loginLink" href="/login">
                            Already have an account?
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignupForm;
