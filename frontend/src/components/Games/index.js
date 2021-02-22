import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadGames } from '../../store/games';

const Games = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGames());
    }, []);

    const games = useSelector((state) => state.games);

    return Object.keys(games).length === 0 ? (
        <h1>Loading...</h1>
    ) : (
        <div className="gamesContainer">
            <ul className="gamesList">
                {Object.keys(games).map((idx) => {
                    const game = games[idx];
                    return (
                        <li key={idx} className="gameCard">
                            <div className="gameCardContainer">
                                <img
                                    className="gameImage"
                                    src={game.image}
                                    style={{ aspectRatio: 2 / 3 }}
                                ></img>
                                <p style={{ color: 'white' }}>{game.name}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Games;
