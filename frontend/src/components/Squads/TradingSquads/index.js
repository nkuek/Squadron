import { useHistory, NavLink } from 'react-router-dom';
const TradingSquads = ({ tradingSquads }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return !loggedInUser ? (
        'Log in to view your squads!'
    ) : !tradingSquads ? (
        'You have not joined any gaming squads'
    ) : (
        <>
            {tradingSquads.map((tradingSquads) => {
                <NavLink to={`/squads/${tradingSquads.id}`}>
                    {tradingSquads.squadName}
                </NavLink>;
            })}
        </>
    );
};

export default TradingSquads;
