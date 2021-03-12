import { NavLink } from 'react-router-dom';
const SocialSquads = ({ userSocialSquads }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return !loggedInUser ? (
        'Log in to view your squads!'
    ) : !userSocialSquads ? (
        'You have not joined any gaming squads'
    ) : (
        <ul className="squadPanelList">
            {userSocialSquads.map((socialSquads, idx) => (
                <li className="squadPanelItem" key={idx}>
                    <NavLink to={`/squads/${socialSquads.id}`}>
                        {socialSquads.squadName}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default SocialSquads;
