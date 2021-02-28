//User Profile Index
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import UserSquads from './UserSquads';
import UserGames from './UserGames';
import UserAbout from './UserAbout';
import { findUser } from '../../store/user';

import './userprofile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    let { userProfileName } = useParams();
    const history = useHistory();
    let userProfile = useSelector((state) => state.userProfile);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        const user = await dispatch(findUser(userProfileName));
        console.log(user);
        console.log(user === 'No user found');

        if (user === 'No user found') history.push('/pagenotfound');
        setIsLoaded(true);
        history.push(`/users/${userProfileName}/squads`);
    }, []);

    return (
        isLoaded && (
            <>
                <Helmet>
                    <title>
                        {userProfile.user.username}'s Profile - Squadron
                    </title>
                    <meta content="description" content="profile page"></meta>
                </Helmet>
                <div className="userProfileWrapper">
                    <div className="userProfileOuterContainer">
                        <div className="userProfileInnerContainer">
                            <div className="userProfileHeader">
                                <div className="username">
                                    <h1 className="profileUsername">
                                        {userProfile.user.username}
                                    </h1>
                                </div>
                                <div className="userProfilePicture">
                                    <img
                                        height="200px"
                                        width="200px"
                                        style={{ borderRadius: '100%' }}
                                        src={userProfile.user.profilePicture}
                                    ></img>
                                </div>
                                <div className="profileNavBar">
                                    <NavLink
                                        to={`/users/${userProfile.user.username}/squads`}
                                    >
                                        Squads
                                    </NavLink>
                                    <NavLink
                                        to={`/users/${userProfile.user.username}/games`}
                                    >
                                        Games
                                    </NavLink>
                                    <NavLink
                                        to={`/users/${userProfile.user.username}/about`}
                                    >
                                        About
                                    </NavLink>
                                </div>
                            </div>
                            <Switch>
                                <Route path="/users/:userProfileName/squads">
                                    <UserSquads />
                                </Route>
                                <Route path="/users/:userProfileName/games">
                                    <UserGames />
                                </Route>
                                <Route path="/users/:userProfileName/about">
                                    <UserAbout />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default UserProfile;
