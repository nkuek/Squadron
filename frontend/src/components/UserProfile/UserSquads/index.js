import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const UserSquads = () => {
    const squads = JSON.parse(localStorage.getItem('squads'));
    const loggedInUser = useSelector((state) => state.session.user);
    const history = useHistory();

    console.log(squads[0]);
    const profileName =
        loggedInUser.username === squads[0].username
            ? 'You'
            : `${squads[0].username}`;

    const navigateToUserProfile = (e) => {
        e.preventDefault();
        history.push(`/users/${profileName}`);
    };

    return (
        // {!squads ? <div className='noSquads'></div>}
        <>
            <div className="userSquadListWrapper">
                <ul className="userSquadListContainer">
                    {squads[0].Squads.map((squad, idx) => (
                        <li key={idx} className="squadCard">
                            <div
                                style={{
                                    borderColor:
                                        profileName === 'You' && '#1b67ff',
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
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <div className="userSquadNameContainer">
                                            <p className="userSquadName">
                                                {squad.squadName}
                                            </p>
                                        </div>
                                        <div className="userSquadInformationContainer">
                                            <p className="userSquadPrimaryType">
                                                {squad.primaryType}
                                            </p>

                                            <p className="userSquadSecondaryType">
                                                {squad.secondaryType}
                                            </p>
                                            {!profileName === 'You' ? (
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
                                                        {profileName}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        // <div className="userSquadsContainer">
                        //     <a
                        //         key={idx}
                        //         className="userSquadsLinkContainer"
                        //         href={`/squads/${squad.squadName}`}
                        //     >
                        //         <p className="userSquadName">
                        //             {squad.squadName}
                        //         </p>
                        //         <p className="userSquadPrimaryType">
                        //             {squad.primaryType}
                        //         </p>
                        //         {squad.secondaryType !== 'None' ? (
                        //             <p className="userSquadSecondaryType">
                        //                 {squad.secondaryType}
                        //             </p>
                        //         ) : null}
                        //         <p className="userSquadCaptain">
                        //             {profileName}
                        //         </p>
                        //     </a>
                        // </div>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default UserSquads;
