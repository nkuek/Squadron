import { NavLink, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { findUserSquads } from '../../store/squads';
import './navigation.css';
const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

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
        history.push('/');
    };

    const getUserSquads = async (e) => {
        e.preventDefault();
        const squads = await dispatch(findUserSquads(user.username));
        localStorage.setItem('squads', JSON.stringify(squads.user));
        history.push(`/users/${user.username}/squads`);
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
                            onClick={getUserSquads}
                            className="navBarLinks"
                            to={`/users/${user.username}/squads`}
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
