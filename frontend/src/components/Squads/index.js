import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findAllSquads } from '../../store/squads';
import { Helmet } from 'react-helmet-async';

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
    }, [dispatch]);

    window.addEventListener('click', (e) => {
        if (showTrading) {
            if (
                !e.target.classList.contains(
                    'trading' || e.target.classList.contains('explore')
                )
            )
                setShowTrading(false);
        } else if (showSocial) {
            if (
                !e.target.classList.contains('social') ||
                e.target.classList.contains('explore')
            )
                setShowSocial(false);
        } else if (showGaming) {
            if (
                !e.target.classList.contains('gaming') ||
                e.target.classList.contains('explore')
            )
                setShowGaming(false);
        }
        return window.removeEventListener('click', e);
    });

    return (
        isLoaded && (
            <>
                <div className="allSquadsPageWrapper">
                    <Helmet>
                        <title>Squads - Squadron</title>
                        <meta name="description" content="squads page"></meta>
                    </Helmet>
                    <div className="allSquadsPageContainer">
                        <div className="allSquadsPanelContainer">
                            <div
                                onClick={history.push('/squads')}
                                className="allSquadsPageHeaderContainer"
                            >
                                <span className="allSquadsPageHeader">
                                    Your Squads
                                </span>
                                <span className="allSquadsPanelIcon hidden panelHeader">
                                    S
                                </span>
                            </div>
                            <hr className="allSquadsSeparator"></hr>
                            <div className="allSquadsCategoryContainer">
                                <div
                                    onClick={() => setShowGaming(true)}
                                    className={`allSquadsCategory gaming ${
                                        showGaming ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel gaming">
                                        Gaming
                                    </span>
                                    <i className="fas fa-gamepad allSquadsPanelIcon hidden gaming"></i>
                                </div>
                                {showGaming && <GamingSquads />}
                                <div
                                    onClick={() => setShowSocial(true)}
                                    className={`allSquadsCategory social ${
                                        showSocial ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel social">
                                        Social
                                    </span>

                                    <i className="fas fa-user allSquadsPanelIcon hidden social"></i>
                                </div>
                                {showSocial && <SocialSquads />}
                                <div
                                    onClick={() => setShowTrading(true)}
                                    className={`allSquadsCategory trading ${
                                        showTrading ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel trading">
                                        Trading
                                    </span>
                                    <i className="fas fa-store allSquadsPanelIcon hidden trading"></i>
                                </div>
                                {showTrading && <TradingSquads />}
                                <hr className="allSquadsSeparator"></hr>
                                <div className="allSquadsCategory squadCategoryLink explore">
                                    <NavLink to="/squads/explore">
                                        <span className="allSquadsPanelLabel explore">
                                            Explore
                                        </span>
                                        <i className="far fa-compass allSquadsPanelIcon hidden explore"></i>
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
                                <ExploreSquads />
                            </Route>
                            <Route exact path={`/squads/:squadId(\\d+)`}>
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
