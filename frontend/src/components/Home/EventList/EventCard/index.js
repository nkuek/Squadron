import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { loadGames } from './store/games';
import { AspectRatio } from 'react-aspect-ratio';

const EventCard = ({ events }) => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(loadGames());
    // }, []);

    const games = useSelector((state) => state.games);
    return events.map((event) => (
        <li key={event.id} className="eventItem">
            <div className="eventItemWrapper">
                <div className="eventItemContent">
                    <Link className="eventLink" to={`/events/${event.id}`}>
                        <div className="eventContainer">
                            <div className="imageContainerWrapper">
                                <AspectRatio
                                    ratio="16/9"
                                    style={{
                                        maxWidth: '600px',
                                        objectFit: 'cover',
                                        position: 'relative',
                                        width: '100%',
                                        height: 'inherit',
                                    }}
                                    className="imageContainer"
                                >
                                    <picture>
                                        <img
                                            className="image"
                                            src="https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg"
                                        ></img>
                                    </picture>
                                </AspectRatio>
                            </div>
                            <div className="informationContainer">
                                <p className="eventDate">{event.date}</p>
                                <p className="eventTitle">{event.title}</p>
                                <p className="eventSquad">{event.squadId}</p>
                                <Link
                                    to={`/games/${event.gameId}`}
                                    className="eventGame"
                                >
                                    {event.gameId}
                                </Link>
                                <p className="eventUser">{event.userId}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </li>
    ));
};

export default EventCard;
