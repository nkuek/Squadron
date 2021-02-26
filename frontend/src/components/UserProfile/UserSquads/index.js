// User Squads Index
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { findUser } from '../../../store/user';

const UserSquads = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => {
        const user = await dispatch(findUser(userProfileName));
        localStorage.setItem('userProfile', JSON.stringify(user));
        history.push(`/users/${userProfileName}/squads`);
    }, [dispatch]);

    const { userProfileName } = useParams();
    if (!userProfile) return <Redirect to="/pageNotFound" />;

    let { Squads, username } = userProfile;

    if (userProfileName === username) username = 'You';

    // if (squads.length === 0) return <Redirect to="/pagenotfound" />;

    const navigateToUserProfile = (e) => {
        e.preventDefault();
        return;
    };

    return (
        <>
            <div className="userSquadListWrapper">
                {Squads.length === 0 ? (
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
                        {Squads.map((squad, idx) => (
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
