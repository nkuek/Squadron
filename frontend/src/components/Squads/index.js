import { NavLink, Route, useHistory, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findAllSquads } from '../../store/squads';

import GamingSquads from './GamingSquads';
import NewSquadForm from './NewSquadForm';
import ExploreSquads from './ExploreSquads';

import './squads.css';

const Squads = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        await dispatch(findAllSquads());
        setIsLoaded(true);
        history.push('/squads/gaming/');
    }, [dispatch]);

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
                                <div className="allSquadsCategory">
                                    <div>
                                        <span className="allSquadsPanelLabel">
                                            Gaming
                                        </span>
                                        <i className="fas fa-gamepad allSquadsPanelIcon hidden"></i>
                                    </div>
                                </div>
                                <div className="allSquadsCategory">
                                    <div>
                                        <span className="allSquadsPanelLabel">
                                            Social
                                        </span>

                                        <i className="fas fa-user allSquadsPanelIcon hidden"></i>
                                    </div>
                                </div>
                                <div className="allSquadsCategory">
                                    <div to="/squads/trading/">
                                        <span className="allSquadsPanelLabel">
                                            Trading
                                        </span>
                                        <i className="fas fa-store allSquadsPanelIcon hidden"></i>
                                    </div>
                                </div>
                                <div className="allSquadsCategory">
                                    <div>
                                        <span className="allSquadsPanelLabel">
                                            Explore
                                        </span>
                                        <i className="far fa-compass allSquadsPanelIcon hidden"></i>
                                    </div>
                                </div>
                                <ExploreSquads allSquads={allSquads} />

                                <div className="allSquadsCategory">
                                    <NavLink to="/squads/create/">
                                        <span className="allSquadsPanelLabel">
                                            Create Squad
                                        </span>
                                        <i className="fas fa-plus allSquadsPanelIcon hidden"></i>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default Squads;
