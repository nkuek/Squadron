import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findAllSquads } from '../../store/squads';

import ExploreSquads from './ExploreSquads';

import './squads.css';
import SocialSquads from './SocialSquads';
import TradingSquads from './TradingSquads';
import GamingSquads from './GamingSquads';
import SquadPage from './SquadPage';

const Squads = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showTrading, setShowTrading] = useState(false);
    const [showGaming, setShowGaming] = useState(false);
    const [showSocial, setShowSocial] = useState(false);

    useEffect(async () => {
        await dispatch(findAllSquads());
        setIsLoaded(true);
        history.push('/squads/gaming/');
    }, [dispatch]);

    window.addEventListener('click', (e) => {
        if (showTrading) {
            if (!e.target.classList.contains('trading')) setShowTrading(false);
        } else if (showSocial) {
            if (!e.target.classList.contains('social')) setShowSocial(false);
        } else if (showGaming) {
            if (!e.target.classList.contains('gaming')) setShowGaming(false);
        }
    });

    const allSquads = useSelector((state) => state.squads);

    const { gamingSquads, socialSquads, tradingSquads } = allSquads;

    return (
        isLoaded && (
            <>
                <div className="allSquadsPageWrapper">
                    <div className="allSquadsPageContainer">
                        <div className="allSquadsPanelContainer">
                            <div className="allSquadsPageHeaderContainer">
                                <span className="allSquadsPageHeader">
                                    Squads
                                </span>
                                <div className="allSquadsPanelIcon hidden panelHeader">
                                    S
                                </div>
                            </div>

                            <div className="allSquadsCategoryContainer">
                                <div
                                    onClick={() => setShowGaming(true)}
                                    className={`allSquadsCategory gaming ${
                                        showGaming ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel">
                                        Gaming
                                    </span>
                                    <i className="fas fa-gamepad allSquadsPanelIcon hidden"></i>
                                </div>
                                {showGaming && <GamingSquads />}
                                <div
                                    onClick={() => setShowSocial(true)}
                                    className={`allSquadsCategory social ${
                                        showSocial ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel">
                                        Social
                                    </span>

                                    <i className="fas fa-user allSquadsPanelIcon hidden"></i>
                                </div>
                                {showSocial && <SocialSquads />}
                                <div
                                    onClick={() => setShowTrading(true)}
                                    className={`allSquadsCategory trading ${
                                        showTrading ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel">
                                        Trading
                                    </span>
                                    <i className="fas fa-store allSquadsPanelIcon hidden"></i>
                                </div>
                                {showTrading && <TradingSquads />}
                                <div className="allSquadsCategory squadCategoryLink">
                                    <NavLink to="/squads/explore">
                                        <span className="allSquadsPanelLabel">
                                            Explore
                                        </span>
                                        <i className="far fa-compass allSquadsPanelIcon hidden"></i>
                                    </NavLink>
                                </div>

                                <div className="allSquadsCategory squadCategoryLink">
                                    <NavLink to="/squads/create/">
                                        <span className="allSquadsPanelLabel">
                                            Create Squad
                                        </span>
                                        <i className="fas fa-plus allSquadsPanelIcon hidden"></i>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/squads/explore">
                                <ExploreSquads allSquads={allSquads} />
                            </Route>
                            <Route exact path="/squads/:squadId">
                                <SquadPage />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </>
        )
    );
};

export default Squads;
