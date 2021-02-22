import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadGames } from '../../store/games';
import { AspectRatio } from 'react-aspect-ratio';
import { Link, Route } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import GameInfo from '../GameInfo';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';

const Games = () => {
    const dispatch = useDispatch();
    const [ordering, setOrdering] = useState('');
    const { setGame } = useGameContext();

    useEffect(() => {
        dispatch(loadGames(ordering));
    }, [ordering]);

    const games = useSelector((state) => state.games);

    return Object.keys(games).length === 0 ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamesContainer">
            <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
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
                                    to={`/games/${game.name}`}
                                    onClick={() => {
                                        setGame(game);
                                        console.log(game);
                                    }}
                                >
                                    <AspectRatio
                                        className="gameImageContainer"
                                        ratio="16/9"
                                        style={{
                                            maxWidth: '200px',
                                            minWidth: '100px',
                                            margin: '5px',
                                        }}
                                    >
                                        <img src={game.image} />
                                    </AspectRatio>
                                    <div className="gameInformationContainer">
                                        <p className="gameName">{game.name}</p>
                                        <div className="metacritic">
                                            <p>Metacritic:</p>
                                            <p
                                                className="gameRating"
                                                style={{
                                                    color:
                                                        game.rating >= 90
                                                            ? '#154f30'
                                                            : game.rating >= 80
                                                            ? 'lightgreen'
                                                            : game.rating > 60
                                                            ? 'yellow'
                                                            : 'red',
                                                }}
                                            >
                                                {game.rating}
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
