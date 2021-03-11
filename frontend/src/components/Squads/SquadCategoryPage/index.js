import { Redirect, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const SquadCategoryPage = ({ props }) => {
    const { squadCategory, squads } = props;

    useEffect(() => {
        document.querySelector('.allSquadsPageWrapper').scrollTo(0, 0);
    }, []);

    const history = useHistory();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadClick = (e) => {
        history.push(`/squads/${e.target.id}`);
    };

    return !loggedInUser ? (
        <Redirect to="/login" />
    ) : (
        <div className="squadCategoryWrapper">
            <div className="squadCategoryContainer">
                <div className="squadCategoryHeaderContainer">
                    <div className="squadCategoryBackContainer">
                        <i
                            onClick={() => history.goBack()}
                            className="fas fa-arrow-left squadCategoryBack"
                        >
                            {' Back'}
                        </i>
                    </div>
                    <div className="squadCategoryHeader">
                        <div className="categoryHeader">{squadCategory}</div>
                        <i
                            className={
                                squadCategory === 'Gaming Squads'
                                    ? 'fas fa-gamepad categoryIcon'
                                    : squadCategory === 'Social Squads'
                                    ? 'fas fa-user categoryIcon'
                                    : squadCategory === 'Trading Squads'
                                    ? 'fas fa-store categoryIcon'
                                    : 'fas fa-crown categoryIcon'
                            }
                        ></i>
                    </div>
                </div>
                <div className="squadCategoryBodyContainer">
                    {squads.map((squad, idx) => (
                        <div key={idx} className="squadCategoryList">
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
                                        to={
                                            squad.captain
                                                ? `/users/${squad.captain.username}`
                                                : `/users/${loggedInUser.username}`
                                        }
                                        onClick={handleCaptainClick}
                                        id={
                                            squad.captain
                                                ? squad.captain.username
                                                : loggedInUser.username
                                        }
                                        className="squadListSquadCaptain"
                                    >
                                        {squad.captain
                                            ? squad.captain.username
                                            : loggedInUser.username}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SquadCategoryPage;
