//User Profile Index
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';

import UserProfileNav from './UserProfileNav';
import UserSquads from './UserSquads';
import UserGames from './UserGames';
import UserAbout from './UserAbout';
import { findUser } from '../../store/user';

import './userprofile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { userProfileName } = useParams();
    const history = useHistory();

    useEffect(async () => {
        const userProfile = await dispatch(findUser(userProfileName));
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        if (!userProfile) {
            return <Redirect to="/pagenotfound" />;
        }
        history.push(`/users/${userProfileName}/squads`);
    }, []);

    return (
        <>
            <div className="userProfileWrapper">
                <div className="userProfileOuterContainer">
                    <div className="userProfileInnerContainer">
                        <div className="userProfileHeader">
                            <div className="username">
                                <h1 className="profileUsername">
                                    {userProfileName}
                                </h1>
                            </div>
                            <UserProfileNav username={userProfileName} />
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
