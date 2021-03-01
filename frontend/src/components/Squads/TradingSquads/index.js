import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { findUser } from '../../../store/user';

const TradingSquads = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    useEffect(async () => {
        await dispatch(findUser(loggedInUser.username));
        setIsLoaded(true);
    }, [dispatch]);

    const userSquads = useSelector((state) => state.squads);

    return isLoaded && <div>Trading squads go here</div>;
};

export default TradingSquads;
