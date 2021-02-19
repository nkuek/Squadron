import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

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
                    <h2 className="signup-header">Register</h2>
                    {errors.length > 0 && (
                        <ul className="errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div>
                        <label
                            htmlFor="username"
                            className="signup-input-label"
                        >
                            Username:
                        </label>
                        <input
                            className="signup-input-field"
                            id="username"
                            type="text"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="email" className="signup-input-label">
                            Email:
                        </label>
                        <input
                            className="signup-input-field"
                            id="email"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="signup-input-label"
                        >
                            Password:
                        </label>
                        {/* <div>
                            <pre>
                                Password must contain at least 1 lowercase
                                letter, uppercase letter, number, and special
                                character (i.e. "!@#$%^&*")
                            </pre>
                        </div> */}
                        <input
                            className="signup-input-field"
                            id="username"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="signup-input-label"
                        >
                            Confirm Password:
                        </label>
                        <input
                            className="signup-input-field"
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
};

export default SignupFormPage;
