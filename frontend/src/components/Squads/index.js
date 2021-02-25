import { Route } from 'react-router-dom';

import SquadPage from './SquadPage';

const Squads = () => {
    return (
        <>
            <div>
                <h1>All Squads Should Appear Here!</h1>
            </div>
            <Route path="/squads/:squadId">
                <SquadPage />
            </Route>
        </>
    );
};

export default Squads;
