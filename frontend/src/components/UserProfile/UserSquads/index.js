// User Squads Index
import { useSelector } from 'react-redux';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { useEffect } from 'react';

const UserSquads = () => {
    const { userProfileName } = useParams();
    const history = useHistory();

    let userProfile = useSelector((state) => state.userProfile);

    if (!userProfile) return <Redirect to="/pagenotfound" />;

    let { username, Squads: squads } = userProfile;

    if (userProfileName === username) username = 'You';

    return !username ? (
        <Redirect to={`/users/${userProfileName}`} />
    ) : (
        <>
            <div className="userSquadListWrapper">
                {squads.length === 0 ? (
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
                        {squads.map((squad, idx) => (
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
