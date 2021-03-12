import { NavLink } from 'react-router-dom';
const TradingSquads = ({ userTradingSquads }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return !loggedInUser ? (
        'Log in to view your squads!'
    ) : !userTradingSquads ? (
        'You have not joined any gaming squads'
    ) : (
        <ul className="squadPanelList">
            {userTradingSquads.map((tradingSquad, idx) => (
                <li key={idx} className="squadPanelItem">
                    <NavLink to={`/squads/${tradingSquad.id}`}>
                        {tradingSquad.squadName}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default TradingSquads;
