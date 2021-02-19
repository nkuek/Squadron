import { NavLink, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './navigation.css';
const ProfileButton = ({ user }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const handleLogout = () => {
        dispatch(sessionActions.logoutUser());
        return <Redirect to="/" />;
    };

    return (
        <>
            <i
                onClick={() => setShowMenu(true)}
                className="profileButton far fa-user fa-lg"
            ></i>
            {showMenu && (
                <ul className="profileMenu">
                    <li>
                        <NavLink
                            className="profileLink"
                            to={`/users/${user.username}`}
                        >
                            {user.username}
                        </NavLink>
                    </li>
                    <li>
                        <button className="logoutButton" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ProfileButton;
