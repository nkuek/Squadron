import { useSelector, useDispatch } from 'react-redux';

const UserSquads = () => {
    const squads = JSON.parse(localStorage.getItem('squads'));
    const userState = useSelector((state) => state.session.user);
    const userStorage = JSON.parse(localStorage.getItem('user'));
    // if (userState.username === userStorage.username)

    return (
        // {!squads ? <div className='noSquads'></div>}
        <>
            <div className="userSquadListWrapper">
                <div className="userSquadListContainer">
                    {squads.map((squadObj) =>
                        squadObj.Squads.map((squad, idx) => (
                            <a
                                key={idx}
                                href={`/squads/${squad.squadName}`}
                                className="squadLinkContainer"
                            >
                                <div className="userSquadContainer">
                                    <p className="userSquadName">
                                        {squad.squadName}
                                    </p>
                                    <p className="userSquadImage">Image Here</p>
                                    <p className="userSquadCaptain">
                                        Captain: {squadObj.username}
                                    </p>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default UserSquads;
