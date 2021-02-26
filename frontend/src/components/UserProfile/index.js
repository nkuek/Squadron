import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import { findUserSquads } from '../../store/squads';
import UserProfileNav from './UserProfileNav';
import UserSquads from './UserSquads';
import UserGames from './UserGames';
import UserAbout from './UserAbout';
import './userprofile.css';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { username } = useParams();
    useEffect(async () => {
        const squads = await dispatch(findUserSquads(username));
        localStorage.setItem('squads', JSON.stringify(squads.user));
    }, [dispatch]);

    useEffect(() => {
        history.push(`/users/${username}/squads`);
    }, []);

    return (
        <>
            <div className="userProfileWrapper">
                <div className="userProfileOuterContainer">
                    <div className="userProfileInnerContainer">
                        <div className="userProfileHeader">
                            <div className="username">
                                <h1 className="profileUsername">{username}</h1>
                            </div>
                            <UserProfileNav username={username} />
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
};

export default UserProfile;
