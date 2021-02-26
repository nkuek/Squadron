import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation';
import Home from './components/Home';
import * as sessionActions from './store/session';
import './index.css';
import About from './components/About';
import Games from './components/Games';
import GameInfo from './components/GameInfo';
import Events from './components/Events';
import UserProfile from './components/UserProfile';
import NewSquadForm from './components/NewSquadForm';
import PageNotFound from './components/PageNotFound';
import Squads from './components/Squads';
import Search from './components/Search';

import { findUserSquads } from './store/squads';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector((state) => state.session.user);
    localStorage.setItem('user', JSON.stringify(user));

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(findUserSquads(user));
        }
    }, [dispatch]);

    return (
        isLoaded && (
            <>
                <Navigation />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/about">
                        <About />
                    </Route>

                    <Route exact path="/login">
                        <LoginForm />
                    </Route>

                    <Route path="/users/:username">
                        <UserProfile />
                    </Route>

                    <Route exact path="/events">
                        <Events />
                    </Route>

                    <Route exact path="/games">
                        <Games />
                    </Route>

                    <Route path="/games/:gameName">
                        <GameInfo />
                    </Route>

                    <Route exact path="/register">
                        <SignupForm />
                    </Route>

                    <Route exact path="/squads">
                        <Squads />
                    </Route>

                    <Route exact path="/squads/create">
                        <NewSquadForm />
                    </Route>
                    <Route path="/search/:searchParam">
                        <Search />
                    </Route>

                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </>
        )
    );
}

export default App;
