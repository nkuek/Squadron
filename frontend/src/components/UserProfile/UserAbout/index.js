import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUser } from '../../../store/user';
import { useParams } from 'react-router-dom';

const UserAbout = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { userProfileName } = useParams();

    useEffect(async () => {
        await dispatch(findUser(userProfileName));
        setIsLoaded(true);
    }, []);

    const { user } = useSelector((state) => state.userProfile);

    return (
        <div className="userAboutWrapper">
            <div className="userAboutContainer">
                <div className="userAboutBody">{user.description}</div>
            </div>
        </div>
    );
};

export default UserAbout;
