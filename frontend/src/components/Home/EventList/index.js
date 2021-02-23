import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventCard from './EventCard';
const EventList = () => {
    const user = useSelector((state) => state.session.user);
    const testEvents = [
        {
            id: 1,
            title: 'Event #1',
            date: 'Today',
            squadId: 'The Global Elite',
            gameId: 'Counter-Strike: Global Offensive',
            image:
                'https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg',
        },
        {
            id: 2,
            title: 'Event #2',
            date: 'Tomorrow',
            squadId: 'Noobs',
            gameId: 'World of Warcraft',
            image:
                'https://media.rawg.io/media/games/0d9/0d930ea604ee240c5af30c58f73ddf48.jpg',
        },
        {
            id: 3,
            title: 'Event #3',
            date: 'Two Days From Now',
            squadId: 'Lorem Ipsum',
            gameId: 'Valheim',
            image:
                'https://media.rawg.io/media/screenshots/822/822b62b0b0e1940787d32565ac738e92.jpg',
        },
    ];
    return (
        <div
            className="homePageEventsContainer"
            style={user ? { margin: '100px 50px' } : {}}
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

export default EventList;
