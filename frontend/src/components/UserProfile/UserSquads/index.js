import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const UserSquads = () => {
    const squads = JSON.parse(localStorage.getItem('squads'));
    const userState = useSelector((state) => state.session.user);

    const { username } = useParams();

    let profileName = userState.username === username ? 'You' : `${username}`;

    return (
        // {!squads ? <div className='noSquads'></div>}
        <>
            <div className="userSquadListWrapper">
                <div className="userSquadListContainer">
                    {squads[0].Squads.map((squad, idx) => (
                        <div key={idx} className="userSquadsContainer">
                            <p className="userSquadName">{squad.squadName}</p>
                            <p className="userSquadPrimaryType">
                                {squad.primaryType}
                            </p>
                            <p className="userSquadCaptain">{profileName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserSquads;
