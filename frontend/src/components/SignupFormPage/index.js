import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './signupform.css';

const SignupFormPage = () => {
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
                            className="signup-input-field"
                            id="username"
                            type="text"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <label
                            htmlFor="username"
                            className="signup-input-label"
                        >
                            Username
                        </label>
                    </div>
                    <div className="signupInputField">
                        <input
                            className="signup-input-field"
                            id="email"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <label htmlFor="email" className="signup-input-label">
                            Email
                        </label>
                    </div>
                    <div className="signupInputField">
                        <input
                            className="signup-input-field"
                            id="username"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <label
                            htmlFor="password"
                            className="signup-input-label"
                        >
                            Password
                        </label>
                    </div>
                    <div className="signupInputField">
                        <input
                            className="signup-input-field"
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                        <label
                            htmlFor="confirm-password"
                            className="signup-input-label"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <button className="signupButton" type="submit">
                        Register
                    </button>
                </form>
                <a className="loginLink" href="/login">
                    Already have an account?
                </a>
            </div>
        </>
    );
};

export default SignupFormPage;
