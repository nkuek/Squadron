import { NavLink } from 'react-router-dom';

const GamingSquads = ({ userGamingSquads }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    return !loggedInUser ? (
        'Log in to view your squads!'
    ) : !userGamingSquads ? (
        'You have not joined any gaming squads'
    ) : (
        <ul className="squadPanelList">
            {userGamingSquads.map((gamingSquad, idx) => (
                <li key={idx} className="squadPanelItem">
                    <NavLink to={`/squads/${gamingSquad.id}`}>
                        {gamingSquad.squadName}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default GamingSquads;
