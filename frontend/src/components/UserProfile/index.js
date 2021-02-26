import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import { findMySquads } from '../../store/squads';
import UserProfileNav from './UserProfileNav';
import UserSquads from './UserSquads';
import UserGames from './UserGames';
import UserAbout from './UserAbout';
import './userprofile.css';

const UserProfile = () => {
    const dispatch = useDispatch();

    const { squads } = useSelector((state) => state.squads);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(findMySquads(user.id));
    }, [dispatch]);

    return (
        <>
            <div className="userProfileWrapper">
                <div className="userProfileOuterContainer">
                    <div className="userProfileInnerContainer">
                        <div className="userProfileHeader">
                            <div className="username">
                                <h1 className="profileUsername">
                                    {user.username}
                                </h1>
                            </div>
                            <UserProfileNav />
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
            </div>
        </>
    );
};

export default UserProfile;
