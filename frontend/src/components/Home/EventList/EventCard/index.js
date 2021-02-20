import { Link } from 'react-router-dom';

const EventCard = ({ events }) => {
    return events.map((event) => (
        <li key={event.id} className="eventItem">
            <Link to={`/events/${event.id}`}>
                <table className="eventContainer">
                    <thead>
                        <tr>
                            <td className="eventDate">{event.date}</td>
                        </tr>
                        <tr>
                            <th className="eventTitle">{event.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="eventSquad">{event.squadId}</td>
                        </tr>
                        <tr>
                            <td className="eventGame">{event.gameId}</td>
                        </tr>
                        <tr>
                            <td className="eventUser">{event.userId}</td>
                        </tr>
                    </tbody>
                </table>
            </Link>
        </li>
    ));
};

export default EventCard;
