import { useHistory, Link } from 'react-router-dom';
const ExploreSquads = ({ allSquads }) => {
    const history = useHistory();

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadClick = (e) => {
        history.push(`/squads/${e.target.id}`);
    };

    const { gamingSquads, tradingSquads, socialSquads } = allSquads;
    return (
        <div className="allSquadsListContainer">
            <div className="allSquadsListHeaderContainer">
                <div className="allSquadsListHeader">
                    <div className="categoryHeader">Gaming Squads</div>
                    <i className="fas fa-gamepad categoryIcon"></i>
                </div>
            </div>
            <div className="allSquadsListBodyContainer">
                {gamingSquads.map((squad, idx) => (
                    <div key={idx} className="allSquadsList">
                        <div
                            id={squad.id}
                            onClick={handleSquadClick}
                            className="squadListSquadLink"
                        >
                            <div className="squadListSquadName">
                                {squad.squadName}
                            </div>
                            <Link
                                to={`/users/${squad.captain.username}`}
                                onClick={handleCaptainClick}
                                id={squad.captain.username}
                                className="squadListSquadCaptain"
                            >
                                {squad.captain.username}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="allSquadsListContainer">
                <div className="allSquadsListHeaderContainer">
                    <div className="allSquadsListHeader">
                        <div className="categoryHeader">Social Squads</div>
                        <i className="fas fa-user categoryIcon"></i>
                    </div>
                </div>
                <div className="allSquadsListBodyContainer">
                    {socialSquads.map((squad, idx) => (
                        <div key={idx} className="allSquadsList">
                            <div
                                id={squad.id}
                                onClick={handleSquadClick}
                                className="squadListSquadLink"
                            >
                                <div className="squadListSquadName">
                                    {squad.squadName}
                                </div>
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
            <div className="allSquadsListContainer">
                <div className="allSquadsListHeaderContainer">
                    <div className="allSquadsListHeader">
                        <div className="categoryHeader">Trading Squads</div>
                        <i className="fas fa-store categoryIcon"></i>
                    </div>
                </div>
                <div className="allSquadsListBodyContainer">
                    {tradingSquads.map((squad, idx) => (
                        <div key={idx} className="allSquadsList">
                            <div
                                id={squad.id}
                                onClick={handleSquadClick}
                                className="squadListSquadLink"
                            >
                                <div className="squadListSquadName">
                                    {squad.squadName}
                                </div>
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
        </div>
    );
};

export default ExploreSquads;
