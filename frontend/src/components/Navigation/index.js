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
        document.querySelector('.stickyDropDownMenu');
        e.target.classList.toggle('change');

        // Shows drop down menu when clicked
        document.querySelector('.stickyDropDownMenu').classList.toggle('show');
    };

    // Closes drop down menu when clicking anywhere else
    window.addEventListener('click', (e) => {
        if (!e.target?.classList.contains('barContainer')) {
            document
                .querySelector('.stickyDropDownMenu')
                ?.classList.remove('show');
            document.querySelector('.barContainer').classList.remove('change');
        }
    });

    return (
        <nav className="mainNavBar">
            <div className="menu">
                <div className="barContainer" onClick={addChange}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className="logoContainer">
                    <NavLink className="home" to="/">
                        Squadron
                    </NavLink>
                </div>
                <div className="stickyDropDownMenu">
                    <ul className="dropDownLinks">
                        <li>
                            <NavLink className="navBarLinks" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="navBarLinks" to="/games">
                                Games
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="navBarLinks" to="/about">
                                About Me
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="loginLogoutSignup">
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
