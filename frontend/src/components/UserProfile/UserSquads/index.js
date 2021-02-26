import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const UserSquads = () => {
    const squads = JSON.parse(localStorage.getItem('squads'));
    const userState = useSelector((state) => state.session.user);

    const { username } = useParams();
    let profileName =
        userState.username === username ? 'Your' : `${userState.username}'s`;

    if (userState.username === username) profileName = 'Your';

    return (
        // {!squads ? <div className='noSquads'></div>}
        <>
            <div className="userSquadListWrapper">
                <div className="userSquadListContainer"></div>
            </div>
        </>
    );
};

export default UserSquads;
