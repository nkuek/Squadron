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
                    <Route exact path="/games">
                        <Games />
                    </Route>
                    <Route exact path="/register">
                        <SignupForm />
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
