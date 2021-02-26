import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const UserProfileNav = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <div className="profileNavBar">
            <NavLink to={`/users/${user.username}/squads`}>Squads</NavLink>
            <NavLink to={`/users/${user.username}/games`}>Games</NavLink>
            <NavLink to={`/users/${user.username}/about`}>About</NavLink>
        </div>
    );
};

export default UserProfileNav;
