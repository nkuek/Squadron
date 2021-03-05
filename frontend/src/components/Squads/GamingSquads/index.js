import { NavLink } from 'react-router-dom';

const GamingSquads = ({ gamingSquads }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return !loggedInUser ? (
        'Log in to view your squads!'
    ) : !gamingSquads ? (
        'You have not joined any gaming squads'
    ) : (
        <>
            {gamingSquads.map((gamingSquad) => {
                <NavLink to={`/squads/${gamingSquad.id}`}>
                    {gamingSquad.squadName}
                </NavLink>;
            })}
        </>
    );
};

export default GamingSquads;
