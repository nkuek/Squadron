import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './navigation.css';
import ProfileButton from './ProfileButton.js';
// import ProfileButton from './ProfileButton';

const Navigation = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    // Enables hamburger menu bar transition
    const addChange = (e) => {
        document.querySelector('.sticky-drop-down-menu');
        e.target.classList.toggle('change');

        // Shows drop down menu when clicked
        document
            .querySelector('.sticky-drop-down-menu')
            .classList.toggle('show');
    };

    // Closes drop down menu when clicking anywhere else
    window.addEventListener('click', (e) => {
        if (!e.target.classList.contains('bar-container')) {
            document
                .querySelector('.sticky-drop-down-menu')
                .classList.remove('show');
            document.querySelector('.bar-container').classList.remove('change');
        }
    });

    return (
        <nav className="main-nav-bar">
            <div className="menu">
                <div className="bar-container" onClick={addChange}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className="logoContainer">
                    <NavLink className="home" to="/">
                        Squadron
                    </NavLink>
                </div>
                <div className="sticky-drop-down-menu">
                    <nav className="drop-down-nav">
                        <ul className="drop-down-links">
                            <li>
                                <NavLink className="navbarLinks" to="/about">
                                    About Me
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="login-logout-signup">
                {!sessionUser ? (
                    <>
                        <NavLink className="login" to="/login">
                            Login
                        </NavLink>
                        <NavLink className="signup" to="/register">
                            Sign Up
                        </NavLink>
                    </>
                ) : (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </nav>
    );
};

export default Navigation;
