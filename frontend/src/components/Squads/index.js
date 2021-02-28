import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { findAllSquads } from '../../store/squads';

import SquadPage from './SquadPage';
import GamingSquads from './GamingSquads';
import NewSquadForm from './NewSquadForm';

import './squads.css';
import SocialSquads from './SocialSquads';
import TradingSquads from './TradingSquads';

const Squads = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(async () => {
        const allSquads = await dispatch(findAllSquads());
        localStorage.setItem('allSquads', JSON.stringify(allSquads));
        history.push('/squads/gaming/');
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
                            <div className="allSquadsCategory">
                                <NavLink to="/squads/social/">Social</NavLink>
                            </div>
                            <div className="allSquadsCategory">
                                <NavLink to="/squads/trading/">Trading</NavLink>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/squads/gaming/">
                            <GamingSquads gamingSquads={gamingSquads} />
                        </Route>
                        <Route exact path="/squads/social">
                            <SocialSquads socialSquads={socialSquads} />
                        </Route>
                        <Route exact path="/squads/trading">
                            <TradingSquads tradingSquads={tradingSquads} />
                        </Route>
                        <Route path="/squads/:squadId/">
                            <SquadPage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default Squads;
