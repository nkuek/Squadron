import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadGames } from '../../store/games';
import { AspectRatio } from 'react-aspect-ratio';
import { Link } from 'react-router-dom';
import { setGameOrder } from '../../store/games';
import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';

const Games = () => {
    const dispatch = useDispatch();

    const games = useSelector((state) => state.games);
    const order = useSelector((state) => state.order);
    const [ordering, setOrdering] = useState('');
    useEffect(() => {
        dispatch(loadGames(ordering));
    }, [ordering]);

    useEffect(() => {
        dispatch(setGameOrder(ordering));
    }, [dispatch, ordering]);

    return Object.keys(games).length === 0 ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamesContainer">
            <select value={order} onChange={(e) => setOrdering(e.target.value)}>
                <option value="">Most Popular</option>
                <option value="-metacritic">Rating</option>
            </select>
            <ul className="gamesList">
                {Object.keys(games).map((idx) => {
                    const game = games[idx];
                    return (
                        <li key={idx} className="gameCard">
                            <div className="gameCardContainer">
                                <Link to={`/games/${game.name}`}>
                                    <AspectRatio
                                        className="gameImageContainer"
                                        ratio="16/9"
                                        style={{
                                            maxWidth: '200px',
                                            minWidth: '100px',
                                            margin: '5px',
                                        }}
                                    >
                                        <img
                                            src={
                                                !game.image
                                                    ? 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
                                                    : game.image
                                            }
                                        />
                                    </AspectRatio>
                                    <div className="gameInformationContainer">
                                        <p className="gameName">{game.name}</p>
                                        <div className="metacritic">
                                            <p>Metacritic:</p>
                                            <p
                                                className="gameRating"
                                                style={{
                                                    color:
                                                        game.metacritic >= 90
                                                            ? '#154f30'
                                                            : game.metacritic >=
                                                              80
                                                            ? 'lightgreen'
                                                            : game.metacritic >
                                                              60
                                                            ? 'yellow'
                                                            : game.metacritic <
                                                                  60 &&
                                                              game.metacritic >
                                                                  0
                                                            ? 'red'
                                                            : 'white',
                                                }}
                                            >
                                                {game.metacritic === 0
                                                    ? 'N/A'
                                                    : game.metacritic}
                                            </p>
                                        </div>
                                    </div>

                                    <div></div>
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Games;
