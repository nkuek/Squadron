import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AspectRatio } from 'react-aspect-ratio';

const EventCard = ({ events }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const games = useSelector((state) => state.games);
    const handleClick = (e) => {
        e.stopPropagation();
        console.log(e);
        history.push(`/games/${e.target.innerHTML}`);
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
                                        to={`/games/${event.gameId}`}
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
