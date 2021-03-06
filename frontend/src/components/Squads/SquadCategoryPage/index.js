import { useHistory } from 'react-router-dom';
const SquadCategoryPage = ({ props }) => {
    const { squadCategory, squads } = props;

    const history = useHistory();

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadClick = (e) => {
        history.push(`/squads/${e.target.id}`);
    };
    return (
        <div className="squadCategoryWrapper">
            <div className="squadCategoryContainer">
                <div className="squadCategoryHeaderContainer">
                    <div className="squadCategoryHeader">{squadCategory}</div>
                </div>
                <div className="squadCategoryBodyContainer">
                    {squads.map((squad, idx) => {
                        <div key={idx} className="allSquadsList">
                            <div
                                id={squad.id}
                                onClick={handleSquadClick}
                                className="squadListSquadLink"
                            >
                                <div className="squadCardImageContainer">
                                    <img
                                        className="squadCardImage"
                                        src={squad.squadImage}
                                    ></img>
                                </div>
                                <div className="squadDescriptionContainer">
                                    <div className="squadListSquadName">
                                        {squad.squadName}
                                    </div>
                                    <div
                                        to={`/users/${squad.captain.username}`}
                                        onClick={handleCaptainClick}
                                        id={squad.captain.username}
                                        className="squadListSquadCaptain"
                                    >
                                        {squad.captain.username}
                                    </div>
                                </div>
                            </div>
                        </div>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default SquadCategoryPage;
