import { useHistory } from 'react-router-dom';
const TradingSquads = ({ tradingSquads }) => {
    const history = useHistory();

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadClick = (e) => {
        history.push(`/squads/${e.target.id}`);
    };
    return (
        <div className="allSquadsListContainer">
            <div className="allSquadsListHeaderContainer">
                <div className="allSquadsListHeader">
                    <div className="categoryHeader">Trading Squads</div>
                    <i className="fas fa-user categoryIcon"></i>
                </div>
            </div>
            <div className="allSquadsListBodyContainer">
                {tradingSquads.map((squad, idx) => (
                    <div key={idx} className="allSquadsList">
                        <div
                            id={squad.id}
                            onClick={handleSquadClick}
                            className="squadListSquadName"
                        >
                            {squad.squadName}
                            <div
                                onClick={handleCaptainClick}
                                id={squad.captain.username}
                                className="squadListSquadCaptain"
                            >
                                {squad.captain.username}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradingSquads;
