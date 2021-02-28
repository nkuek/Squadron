import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { findAllSquads } from '../../store/squads';

import SquadPage from './SquadPage';
import GamingSquads from './GamingSquads';
import NewSquadForm from './NewSquadForm';

import './squads.css';

const Squads = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => {
        const allSquads = await dispatch(findAllSquads());
        localStorage.setItem('allSquads', JSON.stringify(allSquads));
    }, [dispatch]);

    const allSquads = useSelector((state) => state.squads);

    if (!allSquads.gamingSquads) {
        const { gamingSquads, socialSquads, tradingSquads } = JSON.parse(
            localStorage.getItem('allSquads')
        );
        allSquads.gamingSquads = gamingSquads;
        allSquads.socialSquads = socialSquads;
        allSquads.tradingSquads = tradingSquads;
    }

    const { gamingSquads, socialSquads, tradingSquads } = allSquads;

    return (
        <>
            <div className="allSquadsPageWrapper">
                <div className="allSquadsPageContainer">
                    <div className="allSquadsPanelContainer">
                        <div className="allSquadsPageHeaderContainer">
                            <span className="allSquadsPageHeader">Squads</span>
                        </div>

                        <div className="allSquadsCategoryContainer">
                            <div className="allSquadsCategory">
                                <NavLink to="/squads/gaming/">Gaming</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Switch>
                <Route exact path="/squads/gaming/">
                    <GamingSquads gamingSquads={gamingSquads} />
                </Route>
                <Route path="/squads/:squadId/">
                    <SquadPage />
                </Route>
            </Switch>
        </>
    );
};

export default Squads;
