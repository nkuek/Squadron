import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadGames } from '../../store/games';

const Games = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadGames());
    }, []);
    const games = useSelector((state) => state.games);

    return (
        <div>
            <ul>
                {games.map((game, idx) => (
                    <li key={idx}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Games;
