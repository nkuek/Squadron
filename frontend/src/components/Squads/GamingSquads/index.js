import { useHistory, Link } from 'react-router-dom';
const GamingSquads = ({ gamingSquads }) => {
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
        </div>
    );
};

export default GamingSquads;
