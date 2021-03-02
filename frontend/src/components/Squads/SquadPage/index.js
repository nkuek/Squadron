import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findSquad } from '../../../store/userSquads';

const SquadPage = () => {
    const dispatch = useDispatch();
    const { squadId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(findSquad(squadId));
        setIsLoaded(true);
    }, [dispatch]);

    return !isLoaded ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <>
            <div className="squadPageWrapper">
                <div className="squadPageContainer">
                    <div className="squadPageHeaderContainer">
                        <div className="squadPageHeader">
                            <div className="squadPageCoverImage">
                                Image Goes Here
                            </div>
                            <div className="squadPageSquadName"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SquadPage;
