import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import './index.css';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/login">
                    <LoginFormPage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
