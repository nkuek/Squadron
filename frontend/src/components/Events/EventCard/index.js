import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AspectRatio } from 'react-aspect-ratio';

import { findGames } from '../../../store/game';

const EventCard = ({ events }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Finds game in database and stores it in local storage so it can be loaded in the game info component
    const handleClick = async (e) => {
        e.preventDefault();

        const gameParam = e.target.id;
        const gameState = await dispatch(findGames(String(gameParam)));

        history.push(`/games/${gameParam}`);
    };

    return events.map((event) => (
        <li key={event.id} className="eventItem">
            <div className="eventItemWrapper">
                <div className="eventItemContent">
                    <NavLink className="eventLink" to={`/events/${event.id}`}>
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
                                            src={event.image}
                                        ></img>
                                    </picture>
                                </AspectRatio>
                            </div>
                            <div className="informationContainer">
                                <p className="eventDate">{event.date}</p>
                                <p className="eventTitle">{event.title}</p>
                                <p className="eventSquad">{event.squadId}</p>
                                <div className="eventGameLinkContainer">
                                    <Link
                                        id={event.gameId}
                                        to={`/games/${event.gameId}`}
                                        onClick={(e) => handleClick(e)}
                                        // value={event.gameId}
                                        // onClick={handleClick}
                                        className="eventGame"
                                    >
                                        {event.gameId}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </li>
    ));
};

export default EventCard;
