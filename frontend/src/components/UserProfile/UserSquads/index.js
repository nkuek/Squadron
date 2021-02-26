import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const UserSquads = () => {
    const squads = JSON.parse(localStorage.getItem('squads'));
    const userState = useSelector((state) => state.session.user);

    const { username } = useParams();

    let profileName = userState.username === username ? 'You' : `${username}`;

    return (
        // {!squads ? <div className='noSquads'></div>}
        <>
            <div className="userSquadListWrapper">
                <ul className="userSquadListContainer">
                    {squads[0].Squads.map((squad, idx) => (
                        <li key={idx} className="squadCard">
                            <div className="squadCardsContainer">
                                <Link
                                    id={squad.squadName}
                                    to={`/games/${squad.squadName
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
