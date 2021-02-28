import { Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { findAllSquads } from '../../store/squads';

import SquadPage from './SquadPage';

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

    console.log(gamingSquads.map((squad) => squad.captain.username));
    return (
        <>
            <div className="squadPageWrapper">
                <div className="squadPageContainer">
                    <div className="squadPanelContainer">
                        <div className="squadPageHeaderContainer">
                            <span className="squadPageHeader">Squads</span>
                        </div>
                        <div className="squadsListContainer">
                            <div className="squadsListHeaderContainer">
                                <span className="squadType">Gaming</span>
                            </div>
                            <div className="squadsListBodyContainer">
                                {gamingSquads.map((squad) => {
                                    <div className="squadList">
                                        <div className="squadListSquadName">
                                            {squad.squadName}
                                        </div>
                                        <div className="squadListSquadCaptain">
                                            {squad.captain.username}
                                        </div>
                                    </div>;
                                })}
                            </div>
                        </div>
                        <div className="squadsListContainer">
                            <div className="squadsListHeaderContainer">
                                <span className="squadType">Social</span>
                            </div>
                            <div className="squadsListBodyContainer"></div>
                        </div>
                        <div className="squadsListContainer">
                            <div className="squadsListHeaderContainer">
                                <span className="squadType">Trading</span>
                                <div className="squadsListBodyContainer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Route path="/squads/:squadId">
                <SquadPage />
            </Route>
        </>
    );
};

export default Squads;
