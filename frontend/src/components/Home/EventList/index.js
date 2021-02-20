import { Link } from 'react-router-dom';
import EventCard from './EventCard';
const EventList = () => {
    const testEvents = [
        {
            id: 1,
            title: 'Event #1',
            date: 'Today',
            squadId: 'The Global Elite',
            gameId: 'Counter-Strike: Global Offensive',
        },
        {
            id: 2,
            title: 'Event #2',
            date: 'Tomorrow',
            squadId: 'Noobs',
            gameId: 'World of Warcraft',
        },
        {
            id: 3,
            title: 'Event #3',
            date: 'Two Days From Now',
            squadId: 'Lorem Ipsum',
            gameId: 'Valheim',
        },
    ];
    return (
        <div className="homePageEventsContainer">
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

export default EventList;
