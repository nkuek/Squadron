//User Profile Index
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import UserSquads from './UserSquads';
import UserGames from './UserGames';
import UserAbout from './UserAbout';
import { findUser } from '../../store/user';

import PageNotFound from '../PageNotFound';

import './userprofile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    let { userProfileName } = useParams();
    const history = useHistory();
    // let userProfile = useSelector((state) => state.userProfile);
    const [isLoaded, setIsLoaded] = useState(false);
    let userProfile = useSelector((state) => state.userProfile);

    useEffect(async () => {
        if (userProfileName !== userProfile.username) {
            const user = await dispatch(findUser(userProfileName));
            if (!user) return <PageNotFound />;
            setIsLoaded(true);
        }
    }, [dispatch]);

    return !userProfile ? (
        <PageNotFound />
    ) : (
        <>
            {/* <Helmet>
                <title>{userProfile.username}'s Profile - Squadron</title>
                <meta content="description" content="profile page"></meta>
            </Helmet> */}
            <div className="userProfileWrapper">
                <div className="userProfileOuterContainer">
                    <div className="userProfileInnerContainer">
                        <div className="userProfileHeader">
                            <div className="username">
                                <h1 className="profileUsername">
                                    {userProfile.username}
                                </h1>
                            </div>
                            <div className="userProfilePicture">
                                <img
                                    height="200px"
                                    width="200px"
                                    style={{ borderRadius: '100%' }}
                                    src={userProfile.profilePicture}
                                ></img>
                            </div>
                            <div className="profileNavBar">
                                <NavLink
                                    to={`/users/${userProfile.username}/squads`}
                                >
                                    Squads
                                </NavLink>
                                <NavLink
                                    to={`/users/${userProfile.username}/games`}
                                >
                                    Games
                                </NavLink>
                                <NavLink
                                    to={`/users/${userProfile.username}/about`}
                                >
                                    About
                                </NavLink>
                            </div>
                        </div>
                        <Switch>
                            <Route path="/users/:username/squads">
                                <UserSquads />
                            </Route>
                            <Route path="/users/:username/games">
                                <UserGames />
                            </Route>
                            <Route path="/users/:username/about">
                                <UserAbout />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    );
    // );
};

export default UserProfile;
