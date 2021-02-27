//User Profile Index
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
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

    useEffect(async () => {
        const user = await dispatch(findUser(userProfileName));
        localStorage.setItem('user', JSON.stringify(user));

        history.push(`/users/${userProfileName}/squads`);
    }, []);

    return (
        <>
            <Helmet>
                <title>{userProfileName}'s Profile - Squadron</title>
                <meta content="description" content="profile page"></meta>
            </Helmet>
            <div className="userProfileWrapper">
                <div className="userProfileOuterContainer">
                    <div className="userProfileInnerContainer">
                        <div className="userProfileHeader">
                            <div className="username">
                                <h1 className="profileUsername">
                                    {userProfileName}
                                </h1>
                            </div>
                            <div className="profileNavBar">
                                <NavLink
                                    to={`/users/${userProfileName}/squads`}
                                >
                                    Squads
                                </NavLink>
                                <NavLink to={`/users/${userProfileName}/games`}>
                                    Games
                                </NavLink>
                                <NavLink to={`/users/${userProfileName}/about`}>
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
    );
};

export default UserProfile;
