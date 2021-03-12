import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';

import { loadGames, moreGames } from '../../store/games';
import { setGameOrder } from '../../store/order';
import { addGame } from '../../store/user';

import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';

const Games = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { games: initialGames } = useSelector((state) => state.games);
    const usergames = useSelector((state) => state.userProfile.usergames);
    const order = JSON.parse(localStorage.getItem('ordering'));
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let [ordering, setOrdering] = useState(order ? order : '');
    const [isLoaded, setIsLoaded] = useState(false);
    const [games, setGames] = useState(initialGames);

    const addedGames = usergames && usergames.map((game) => game.name);

    const handleLinkClick = (e) => {
        e.preventDefault();
        sessionStorage.setItem('scrollPosition', window.pageYOffset);
        history.push(`/games/${e.target.id}`);
    };

    const fetchMoreData = async () => {
        const next = games[Object.keys(games).length - 1].next;
        const nextGames = await dispatch(moreGames(next));
        setGames([...games, ...nextGames]);
    };

    const handleAddGame = async (e, gameName) => {
        e.stopPropagation();
        dispatch(addGame(loggedInUser.id, gameName));
        document.querySelector('.addGameContainer').style.display = 'none';
    };

    useEffect(async () => {
        const games = await dispatch(loadGames(ordering));
        setGames(games);
        setIsLoaded(true);
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem('scrollPosition');
        }
    }, [ordering]);

    useEffect(() => {
        dispatch(setGameOrder(ordering));
        localStorage.setItem('ordering', JSON.stringify(ordering));
    }, [ordering]);

    return !isLoaded || !usergames ? (
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
                                        onClick={handleLinkClick}
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
                                    {loggedInUser &&
                                        !addedGames.includes(game.name) && (
                                            <div className="addGameContainer">
                                                <div
                                                    onClick={(e) =>
                                                        handleAddGame(
                                                            e,
                                                            game.name
                                                        )
                                                    }
                                                    className="addGame"
                                                >
                                                    Add to My Games List
                                                </div>
                                                <div
                                                    onClick={(e) =>
                                                        handleAddGame(
                                                            e,
                                                            game.name
                                                        )
                                                    }
                                                    className="addGamePlus fas fa-plus"
                                                ></div>
                                            </div>
                                        )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <InfiniteScroll
                dataLength={games.length}
                next={fetchMoreData}
                hasMore={true}
                loader={
                    <h2 style={{ color: 'white', textAlign: 'center' }}>
                        Loading...
                    </h2>
                }
                scrollableTarget="root"
            ></InfiniteScroll>
        </div>
    );
};

export default Games;
