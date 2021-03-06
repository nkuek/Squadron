import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUser } from '../../../store/user';
import { useParams } from 'react-router-dom';

import { editUserAbout } from '../../../store/user';

const UserAbout = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showEditAbout, setShowEditAbout] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [showEditButton, setShowEditButton] = useState(true);
    const { userProfileName } = useParams();

    const user = useSelector((state) => state.userProfile);
    const loggedInUsername = useSelector(
        (state) => state.session.user.username
    );

    const [userAbout, setUserAbout] = useState('');
    console.log(userAbout);

    const handleEdit = () => {
        setShowEditButton(false);
        setShowEditAbout(true);
        setShowDescription(false);
    };

    const handleAboutFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editUserAbout({ userAbout, userId: user.id }));
        setShowEditAbout(false);
        setShowEditButton(true);
        setShowDescription(true);
    };

    useEffect(async () => {
        dispatch(findUser(userProfileName));
        setUserAbout(user.description);
        setIsLoaded(true);
    }, [dispatch]);

    const loggedInUserProfile = userProfileName === loggedInUsername;

    return (
        isLoaded && (
            <div className="userAboutWrapper">
                <div className="userAboutHeaderContainer">
                    <div className="userAboutHeader">Description</div>
                </div>
                {loggedInUserProfile && showEditButton && (
                    <div
                        onClick={handleEdit}
                        className="userAboutProfileEditButtonContainer"
                    >
                        <div className="userAboutProfileEditButton">Edit</div>
                    </div>
                )}
                <div className="userAboutContainer">
                    {showEditAbout && (
                        <div className="editAboutFormContainer">
                            <form className="editAboutForm">
                                <div className="editAboutFormInputContainer">
                                    <textarea
                                        className="editAboutFormInput"
                                        value={userAbout}
                                        onChange={(e) =>
                                            setUserAbout(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div
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
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="userAboutBodyContainer">
                        {showDescription && (
                            <div className="userAboutBody">
                                {user.description}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default UserAbout;
