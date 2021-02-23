import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AspectRatio from 'react-aspect-ratio';
import { findGames } from '../../store/games';
import './game.css';

const GameInfo = () => {
    const dispatch = useDispatch();
    const { gameName } = useParams();

    useEffect(() => {
        dispatch(findGames(String(gameName)));
    }, [dispatch]);

    const game = useSelector((state) => state.games.game);
    return !game ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="gamePageWrapper">
            <h2 className="gameNameCard" style={{ paddingBottom: '20px' }}>
                {game.name}
            </h2>
            <div className="gamePageContainer">
                <AspectRatio
                    className="gamePageImageContainer"
                    ratio="16/9"
                    style={{
                        maxWidth: '500px',
                        minWidth: '300px',
                        margin: '5px',
                    }}
                >
                    <img src={game.image} />
                </AspectRatio>
                <div className="gamePageInfoContainer">
                    <div className="metacritic">
                        <p>Metacritic:</p>
                        <p
                            className="gameRating"
                            style={{
                                color:
                                    game.metacritic >= 90
                                        ? '#154f30'
                                        : game.metacritic >= 80
                                        ? 'lightgreen'
                                        : game.metacritic > 60
                                        ? 'yellow'
                                        : 'red',
                            }}
                        >
                            {game.metacritic}
                        </p>
                    </div>
                    <div className="metacritic">
                        <p>User Rating:</p>
                        <p
                            className="gameRating"
                            style={{
                                color:
                                    game.rating >= 4
                                        ? '#154f30'
                                        : game.rating >= 3
                                        ? 'lightgreen'
                                        : game.rating > 2
                                        ? 'yellow'
                                        : 'red',
                            }}
                        >
                            {game.rating}
                        </p>
                    </div>
                    <p>Release Date: {game.released}</p>
                </div>
            </div>
        </div>
    );
};

export default GameInfo;
