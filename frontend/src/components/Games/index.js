import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadGames } from '../../store/games';

const Games = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(loadGames());
    // }, []);

    const games = useSelector((state) => state.games);
    if (!games) dispatch(loadGames());

    return (
        <div className="gamesContainer">
            <ul className="gamesList">
                {games.map((game, idx) => (
                    <li key={idx} className="gameCard">
                        <div className="gameCardContainer">
                            <img
                                className="gameImage"
                                src={game.background_image}
                            ></img>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Games;
