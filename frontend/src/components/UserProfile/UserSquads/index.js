// User Squads Index
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findUser } from '../../../store/user';

const UserSquads = () => {
    let { username } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let userProfile = useSelector((state) => state.userProfile);
    const squads = Object.keys(userProfile).length > 0 && [
        ...userProfile.captain,
        ...userProfile.squadmates,
    ];

    let userProfileName = username;
    if (username === loggedInUser.username) userProfileName = 'You';

    return (
        <>
            <div className="userSquadListWrapper">
                {squads.length === 0 ? (
                    <div className="noSquadsContainer">
                        <div className="noSquadsHeader">
                            <h1 className="noSquads">
                                {userProfileName === 'You'
                                    ? `You have not joined any squads yet!`
                                    : `${userProfileName} has not joined any squads yet!`}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <>
                        <ul className="userSquadListContainer">
                            {squads &&
                                squads.map((squad, idx) => (
                                    <li key={idx} className="squadCard">
                                        <div
                                            style={{
                                                borderColor:
                                                    squad.captain.username ===
                                                        username && '#1b67ff',
                                            }}
                                            className="squadCardsContainer"
                                        >
                                            <Link
                                                to={`/squads/${squad.squadName
                                                    .split(' ')
                                                    .join('')}`}
                                            >
                                                <div
                                                    className="squadInformationContainer"
                                                    style={{
                                                        pointerEvents: 'none',
                                                    }}
                                                >
                                                    <div className="userSquadNameContainer">
                                                        <p className="userSquadName">
                                                            {squad.squadName}
                                                        </p>
                                                    </div>
                                                    <div className="userSquadInformationContainer">
                                                        <p className="userSquadPrimaryType">
                                                            {`Primary type: ${squad.primaryType}`}
                                                        </p>
                                                        {squad.secondaryType && (
                                                            <p className="userSquadSecondaryType">
                                                                {`Secondary type: ${squad.secondaryType}`}
                                                            </p>
                                                        )}
                                                        <div className="userSquadCaptainLink">
                                                            <p className="userSquadCaptain">
                                                                {`Captain: ${squad.captain.username}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

export default UserSquads;
