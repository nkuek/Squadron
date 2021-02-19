import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import './index.css';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);
    return (
        <>
            <Switch>
                <Route exact path="/login">
                    <LoginFormPage />
                </Route>
                <Route exact path="/register">
                    <SignupFormPage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
