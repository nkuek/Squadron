import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUser } from '../../../store/user';
import { useParams } from 'react-router-dom';

const UserAbout = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { userProfileName } = useParams();

    const { user } = useSelector((state) => state.userProfile);
    const loggedInUsername = useSelector(
        (state) => state.session.user.username
    );

    useEffect(async () => {
        await dispatch(findUser(userProfileName));
        setIsLoaded(true);
    }, []);

    const loggedInUserProfile = userProfileName === loggedInUsername;

    return (
        <div className="userAboutWrapper">
            <div className="userAboutContainer">
                {loggedInUserProfile && (
                    <div className="userAboutProfileEditButtonContainer">
                        <div className="userAboutProfileEditButton">Edit</div>
                    </div>
                )}
                <div className="userAboutBodyContainer">
                    <div className="userAboutBody">{user.description}</div>
                </div>
            </div>
        </div>
    );
};

export default UserAbout;
