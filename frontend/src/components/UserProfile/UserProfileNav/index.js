import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const UserProfileNav = ({ username }) => {
    return (
        <div className="profileNavBar">
            <NavLink to={`/users/${username}/squads`}>Squads</NavLink>
            <NavLink to={`/users/${username}/games`}>Games</NavLink>
            <NavLink to={`/users/${username}/about`}>About</NavLink>
        </div>
    );
};

export default UserProfileNav;
