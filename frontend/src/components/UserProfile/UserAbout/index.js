import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUser } from '../../../store/user';
import { useParams } from 'react-router-dom';

import { editUserAbout } from '../../../store/user';

const UserAbout = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showEditAbout, setShowEditAbout] = useState(false);
    const { userProfileName } = useParams();

    const user = useSelector((state) => state.userProfile);
    const loggedInUsername = useSelector(
        (state) => state.session.user.username
    );

    const [userAbout, setUserAbout] = useState(user.description);

    const handleEdit = () => {
        setShowEditAbout(true);
    };

    const handleAboutFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserAbout({ userAbout, userId: user.id }));
        setShowEditAbout(false);
    };

    useEffect(async () => {
        dispatch(findUser(userProfileName));
        setIsLoaded(true);
    }, [dispatch]);

    const loggedInUserProfile = userProfileName === loggedInUsername;

    return (
        isLoaded && (
            <div className="userAboutWrapper">
                <div className="userAboutContainer">
                    {loggedInUserProfile && (
                        <div
                            onClick={handleEdit}
                            className="userAboutProfileEditButtonContainer"
                        >
                            <div className="userAboutProfileEditButton">
                                Edit
                            </div>
                        </div>
                    )}
                    {showEditAbout && (
                        <div className="editAboutFormContainer">
                            <div className="editAboutForm">
                                <div className="editAboutFormInputContainer">
                                    <input
                                        className="editAboutFormInput"
                                        value={userAbout}
                                        onChange={(e) =>
                                            setUserAbout(e.target.value)
                                        }
                                    ></input>
                                </div>
                                <form
                                    onClick={handleAboutFormSubmit}
                                    className="editAboutFormButtons"
                                >
                                    <button
                                        // onClick={handleAboutFormSubmit}
                                        type="submit"
                                        className="editAboutFormSubmit"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => setShowEditAbout(false)}
                                        className="editAboutFormSubmit"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                    <div className="userAboutBodyContainer">
                        <div className="userAboutBody">{user.description}</div>
                    </div>
                </div>
            </div>
        )
    );
};

export default UserAbout;
