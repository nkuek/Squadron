import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Link, useHistory } from 'react-router-dom';

import { loadGames } from '../../store/games';
import { setGameOrder } from '../../store/order';
import { findGames } from '../../store/game';

import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';

const Games = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const games = useSelector((state) => state.games);
    const order = localStorage.getItem('order');

    const [ordering, setOrdering] = useState(!order ? '' : order);

    useEffect(() => {
        dispatch(loadGames(ordering));
        localStorage.setItem('order', ordering);
    }, [ordering]);

    useEffect(() => {
        dispatch(setGameOrder(ordering));
    }, [ordering]);

    const handleClick = async (e) => {
        e.preventDefault();

        const gameParam = e.target.id;
        const gameState = await dispatch(findGames(String(gameParam)));

        localStorage.setItem('gameState', JSON.stringify(gameState));

        history.push(
            `/games/${gameParam
                .replace(':', '')
                .split(' ')
                .join('')
                .toLowerCase()}`
        );
    };

    return Object.keys(games).length === 0 ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamesWrapper">
            <div className="gamesContainer">
                <select
                    className="gamesOrder"
                    value={ordering}
                    onChange={(e) => {
                        setOrdering(e.target.value);
                    }}
                >
                    <option value="">Most Popular</option>
                    <option value="-metacritic">Rating</option>
                </select>
                <ul className="gamesList">
                    {Object.keys(games).map((idx) => {
                        const game = games[idx];
                        return (
                            <li key={idx} className="gameCard">
                                <div className="gameCardContainer">
                                    <Link
                                        onClick={(e) => handleClick(e)}
                                        id={game.name}
                                        to={`/games/${game.name
                                            .replace(':', '')
                                            .split(' ')
                                            .join('')
                                            .toLowerCase()}`}
                                    >
                                        <AspectRatio
                                            className="gameImageContainer"
                                            ratio="16/9"
                                            style={{
                                                marginRight: '15px',
                                                pointerEvents: 'none',
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
                                        <div
                                            className="gameInformationContainer"
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            <div className="nameContainer">
                                                <p className="gameName">
                                                    {game.name}
                                                </p>
                                            </div>
                                            <div className="gameInformation">
                                                <div className="metacritic">
                                                    <p>Metacritic:</p>
                                                    <p
                                                        className="gameRating"
                                                        style={{
                                                            color:
                                                                game.metacritic >=
                                                                90
                                                                    ? '#00ff00'
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
                                                <p className="gameGenres">
                                                    Genres:{' '}
                                                    {game.genres
                                                        ? game.genres.join(', ')
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Games;
