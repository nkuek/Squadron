import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Event from './Event';
import './events.css';

const Events = () => {
    const user = useSelector((state) => state.session.user);
    if (!user) return <Redirect to="/login" />;
    return (
        <>
            <div className="eventsPageContainer">
                <div className="eventsPageHeader">Feature Coming Soon!</div>
            </div>
            <Route path="/events/:eventId">
                <Event />
            </Route>
        </>
    );
};

export default Events;
