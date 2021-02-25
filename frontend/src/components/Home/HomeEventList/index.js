import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventCard from '../../Events/EventCard';
import testEvents from '../../../mockData/testEvents.json';
const HomeEventList = () => {
    const user = useSelector((state) => state.session.user);

    return (
        <div
            style={{ marginTop: !user ? '30px' : '91px' }}
            className="homePageEventsContainer"
        >
            <div className="homePageEvents">
                <div className="homePageEventsHeader">
                    <h2 className="upcomingEvents">Upcoming Events</h2>
                    <Link to="/events" className="allEventsLink">
                        See all
                    </Link>
                </div>
                <ul className="homePageEventList">
                    <EventCard events={testEvents} />
                </ul>
            </div>
        </div>
    );
};

export default HomeEventList;
