import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';

import { loadGames, moreGames } from '../../store/games';
import { setGameOrder } from '../../store/order';
import { findGames } from '../../store/game';

import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';
import GameInfo from '../GameInfo';

const Games = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { games } = useSelector((state) => state.games);
    const order = localStorage.getItem('order');

    const [ordering, setOrdering] = useState(!order ? '' : order);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadGames(ordering)).then(() => setIsLoaded(true));
    }, [ordering]);

    useEffect(() => {
        dispatch(setGameOrder(ordering));
    }, [ordering]);

    const fetchMoreData = () => {
        const next = games[Object.keys(games).length - 1].next;
        setTimeout(() => {
            dispatch(moreGames(next));
        }, 1000);
    };
    return !isLoaded ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamesWrapper">
            <Helmet>
                <title>Games - Squadron</title>
                <meta name="description" content="list of all games"></meta>
            </Helmet>
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
                    {games.map((game, idx) => {
                        return (
                            <li key={idx} className="gameCard">
                                <div className="gameCardContainer">
                                    <Link
                                        id={game.name}
                                        to={`/games/${game.name}`}
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
                                            style={{
                                                pointerEvents: 'none',
                                            }}
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
                <InfiniteScroll
                    dataLength={games.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={
                        <h3 style={{ color: 'white', textAlign: 'center' }}>
                            Loading...
                        </h3>
                    }
                ></InfiniteScroll>
            </div>
        </div>
    );
};

export default Games;
