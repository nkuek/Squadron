import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadGames } from '../../store/games';
import { AspectRatio } from 'react-aspect-ratio';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';

const Games = () => {
    const dispatch = useDispatch();
    const [ordering, setOrdering] = useState('');

    // useEffect(() => {
    //     dispatch(loadGames());
    // }, []);

    useEffect(() => {
        console.log(ordering);
        dispatch(loadGames(ordering));
    }, [ordering]);

    const games = useSelector((state) => state.games);

    const fetchMoreData = async () => {
        const moreData = fetch(games['0'].next).then((res) => console.log(res));
    };

    return Object.keys(games).length === 0 ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamesContainer">
            <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
            >
                <option value="">Most Popular</option>
                <option value="metacritic80,100">Rating</option>
                <option value="released">Release Date</option>
            </select>
            <ul className="gamesList">
                {Object.keys(games).map((idx) => {
                    const game = games[idx];
                    return (
                        <li key={idx} className="gameCard">
                            <div className="gameCardContainer">
                                <div className="gameImageContainer">
                                    <AspectRatio
                                        ratio="16/9"
                                        style={{
                                            maxWidth: '200px',
                                            minWidth: '100px',
                                            margin: '5px',
                                        }}
                                    >
                                        <img src={game.image} />
                                    </AspectRatio>
                                </div>
                                <div className="gameInformationWrapper">
                                    <div className="gameInformationContainer">
                                        <p className="gameName">{game.name}</p>
                                        <p className="rating">
                                            Metacritic: {game.rating}
                                        </p>
                                    </div>
                                </div>

                                <div></div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <button onClick={fetchMoreData}>Click</button>
        </div>
    );
};

export default Games;
