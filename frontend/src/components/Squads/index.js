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
        console.log(allSquads);
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
            <div>
                <h1>All Squads Should Appear Here!</h1>
            </div>
            <div className="squadPageWrapper">
                <div className="squadPageContainer">
                    <div className="squadPageHeaderContainer">
                        <p className="squadPageHeader">Squads</p>
                    </div>
                    <div className="squadsListContainer">
                        <div className="squadsListHeaderContainer">
                            <p className="squadType">Gaming</p>
                        </div>
                        <div className="squadsListBodyContainer">
                            {gamingSquads.map((squad) => {
                                <div className="squadList">
                                    <p className="squadListSquadName">
                                        {squad.name}
                                    </p>
                                    <p className="squadListSquadCaptain"></p>
                                </div>;
                            })}
                        </div>
                    </div>
                    <div className="squadsListContainer">
                        <div className="squadsListHeaderContainer">
                            <p className="squadType">Social</p>
                        </div>
                        <div className="squadsListBodyContainer"></div>
                    </div>
                    <div className="squadsListContainer">
                        <div className="squadsListHeaderContainer">
                            <p className="squadType">Trading</p>
                            <div className="squadsListBodyContainer"></div>
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
