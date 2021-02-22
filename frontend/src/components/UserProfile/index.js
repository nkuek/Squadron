import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { username } = useParams();
    return (
        <div>
            <h1 style={{ color: 'white' }}>Hello, {username}!</h1>
        </div>
    );
};

export default UserProfile;
