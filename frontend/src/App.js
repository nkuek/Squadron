import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import Event from './components/Events/Event';
import UserProfile from './components/UserProfile';
import NewSquadForm from './components/NewSquadForm';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
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
                    <Route exact path="/users/:username">
                        <UserProfile />
                    </Route>
                    <Route exact path="/events">
                        <Events />
                    </Route>
                    <Route path="/events/:eventId">
                        <Event />
                    </Route>
                    <Route exact path="/games">
                        <Games />
                    </Route>
                    <Route path={`/games/:gameName`}>
                        <GameInfo />
                    </Route>
                    <Route exact path="/register">
                        <SignupForm />
                    </Route>
                    <Route path="/squads/register">
                        <NewSquadForm />
                    </Route>
                    <Route>
                        <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                            404 Page Not Found
                        </h1>
                    </Route>
                </Switch>
            </>
        )
    );
}

export default App;
