// User Squads Index
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react';

const UserSquads = () => {
    const { userProfileName } = useParams();
    const dispatch = useDispatch();

    let loggedInUser = useSelector((state) => state.session.user);
    let user = useSelector((state) => state.userProfile);

    let username = loggedInUser.username;

    if (userProfileName === loggedInUser.username) username = 'You';

    return !username ? (
        <Redirect to={`/users/${userProfileName}`} />
    ) : (
        <>
            <div className="userSquadListWrapper">
                {user.squads.length === 0 ? (
                    <div className="noSquadsContainer">
                        <div className="noSquadsHeader">
                            <h1 className="noSquads">
                                {username === 'You'
                                    ? `You have not joined any squads yet!`
                                    : `${username} has not joined any squads yet!`}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <ul className="userSquadListContainer">
                        {user.squads.map((squad, idx) => (
                            <li key={idx} className="squadCard">
                                <div
                                    style={{
                                        borderColor:
                                            username === 'You' && '#1b67ff',
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
                                                {!(username === 'You') && (
                                                    <div className="userSquadCaptainLink">
                                                        <p
                                                            style={{
                                                                cursor:
                                                                    !username ===
                                                                    'You'
                                                                        ? 'pointer'
                                                                        : 'none',
                                                            }}
                                                            className="userSquadCaptain"
                                                        >
                                                            {`Captain: ${username}`}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default UserSquads;
