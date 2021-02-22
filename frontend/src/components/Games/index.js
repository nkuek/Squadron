import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadGames } from '../../store/games';
import { AspectRatio } from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';
import './games.css';

const Games = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGames());
    }, []);

    const games = useSelector((state) => state.games);

    return Object.keys(games).length === 0 ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamesContainer">
            <ul className="gamesList">
                {Object.keys(games).map((idx) => {
                    const game = games[idx];
                    return (
                        <li key={idx} className="gameCard">
                            <div className="gameCardContainer">
                                <div className="imageContainer">
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
                                <p className="gameName">{game.name}</p>
                                <div></div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Games;
