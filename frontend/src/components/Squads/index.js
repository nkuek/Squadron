import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findAllSquads } from '../../store/allSquads';
import { findUser } from '../../store/user';
import { Helmet } from 'react-helmet-async';

import ExploreSquads from './ExploreSquads';

import './squads.css';
import SocialSquads from './SocialSquads';
import TradingSquads from './TradingSquads';
import GamingSquads from './GamingSquads';
import SquadPage from './SquadPage';
import SquadCategoryPage from './SquadCategoryPage';

const Squads = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showTrading, setShowTrading] = useState(false);
    const [showGaming, setShowGaming] = useState(false);
    const [showSocial, setShowSocial] = useState(false);

    const allSquads = useSelector((state) => state.allSquads);
    const userSquads = null;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(async () => {
        await dispatch(findAllSquads());
        history.push('/squads/explore');
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(async () => {
        if (loggedInUser) {
            await dispatch(findUser(loggedInUser.username));
        }
    }, [dispatch]);

    const userGamingSquads = !userSquads
        ? null
        : userSquads.map((squad) => squad.primaryType === 'Gaming');
    const userTradingSquads = !userSquads
        ? null
        : userSquads.map((squad) => squad.primaryType === 'Trading');
    const userSocialSquads = !userSquads
        ? null
        : userSquads.map((squad) => squad.primaryType === 'Social');

    window.addEventListener('click', (e) => {
        if (showTrading) {
            if (!e.target.classList.contains('trading')) setShowTrading(false);
        } else if (showSocial) {
            if (!e.target.classList.contains('social')) setShowSocial(false);
        } else if (showGaming) {
            if (!e.target.classList.contains('gaming')) setShowGaming(false);
        }
        return window.removeEventListener('click', e);
    });

    const { gamingSquads, socialSquads, tradingSquads } = allSquads;

    const mySquads = loggedInUser.captain.concat(loggedInUser.squadmates);

    const rotateArrow = (e) => {
        e.target.children[2].classList.add('rotate');
    };

    return (
        isLoaded && (
            <>
                <div className="allSquadsPageWrapper">
                    <Helmet>
                        <title>Squads | Squadron</title>
                        <meta name="description" content="squads page"></meta>
                    </Helmet>
                    <div className="allSquadsPageContainer">
                        <div className="allSquadsPanelContainer">
                            <div
                                onClick={() => history.push('/squads/mysquads')}
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
                                    onClick={(e) => {
                                        setShowGaming(true);
                                        rotateArrow(e);
                                    }}
                                    className={`allSquadsCategory gaming ${
                                        showGaming ? 'activeCategory' : null
                                    }`}
                                >
                                    <span className="allSquadsPanelLabel gaming">
                                        Gaming
                                    </span>
                                    <i className="fas fa-gamepad allSquadsPanelIcon hidden gaming"></i>
                                    <i className="fas fa-angle-right"></i>
                                </div>
                                {showGaming && (
                                    <GamingSquads
                                        userGamingSquads={userGamingSquads}
                                    />
                                )}
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
                                    <i className="fas fa-angle-right"></i>
                                </div>
                                {showSocial && (
                                    <SocialSquads
                                        userSocialSquads={userSocialSquads}
                                    />
                                )}
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
                                    <i className="fas fa-angle-right"></i>
                                </div>
                                {showTrading && (
                                    <TradingSquads
                                        userTradingSquads={userTradingSquads}
                                    />
                                )}
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
                                <ExploreSquads allSquads={allSquads} />
                            </Route>
                            <Route exact path={`/squads/:squadId(\\d+)`}>
                                <SquadPage />
                            </Route>
                        </Switch>
                        <Switch>
                            <Route exact path="/squads/explore/gaming">
                                <SquadCategoryPage
                                    props={{
                                        squadCategory: 'Gaming Squads',
                                        squads: gamingSquads,
                                    }}
                                />
                            </Route>
                            <Route exact path="/squads/explore/trading">
                                <SquadCategoryPage
                                    props={{
                                        squadCategory: 'Trading Squads',
                                        squads: tradingSquads,
                                    }}
                                />
                            </Route>
                            <Route exact path="/squads/explore/social">
                                <SquadCategoryPage
                                    props={{
                                        squadCategory: 'Social Squads',
                                        squads: socialSquads,
                                    }}
                                />
                            </Route>
                            <Route exact path="/squads/mysquads">
                                <SquadCategoryPage
                                    props={{
                                        squadCategory: 'My Squads',
                                        squads: mySquads,
                                    }}
                                />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </>
        )
    );
};

export default Squads;
