import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { findUserSquads } from '../../../store/squads';

const UserSquads = () => {
    const squads = JSON.parse(localStorage.getItem('squads'));
    const loggedInUser = useSelector((state) => state.session.user);

    const { username } = useParams();

    console.log(squads);

    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(async () => {
        const squads = await dispatch(findUserSquads(username));
        localStorage.setItem('squads', JSON.stringify(squads.user));
        history.push(`/users/${username}/squads`);
    }, [dispatch]);

    if (squads.length === 0) return <Redirect to="/pagenotfound" />;
    else {
        const profileName =
            squads && loggedInUser.username === squads[0].username
                ? 'Your'
                : `${squads[0].username}`;

        const navigateToUserProfile = (e) => {
            e.preventDefault();
            return;
        };

        return (
            <>
                <div className="userSquadListWrapper">
                    {squads[0].Squads.length === 0 ? (
                        <div
                            className="noSquadsContainer"
                            style={{
                                display: 'inline-block',
                                margin: '50px',
                                height: 'fit-content',
                            }}
                        >
                            <h1
                                style={{
                                    color: 'white',
                                    margin: '0',
                                }}
                                className="noSquads"
                            >
                                {username} has not joined any squads yet!
                            </h1>
                        </div>
                    ) : (
                        <ul className="userSquadListContainer">
                            {squads[0].Squads.map((squad, idx) => (
                                <li key={idx} className="squadCard">
                                    <div
                                        style={{
                                            borderColor:
                                                profileName === 'You' &&
                                                '#1b67ff',
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
                                                    {!(
                                                        profileName === 'You'
                                                    ) && (
                                                        <div className="userSquadCaptainLink">
                                                            <p
                                                                style={{
                                                                    cursor:
                                                                        !profileName ===
                                                                        'You'
                                                                            ? 'pointer'
                                                                            : 'none',
                                                                }}
                                                                className="userSquadCaptain"
                                                            >
                                                                {`Captain: ${profileName}`}
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
    }
};

export default UserSquads;
