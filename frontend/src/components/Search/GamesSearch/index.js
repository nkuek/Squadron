import { useSelector, useDispatch } from 'react-redux';
import { AspectRatio } from 'react-aspect-ratio';
import { Link, useHistory } from 'react-router-dom';
import { findGames } from '../../../store/game';

const GamesSearch = ({ games }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();

        const gameParam = e.target.id;
        const gameState = await dispatch(findGames(String(gameParam)));

        localStorage.setItem('gameState', JSON.stringify(gameState));

        history.push(`/games/${gameParam}`);
    };
    // let games = useSelector((state) => state.search.games);
    // if (!games) games = JSON.parse(localStorage.getItem('search')).games;
    // console.log(games);

    return (
        <ul className="gamesList">
            {games.map((game, idx) => (
                <li key={idx} className="gameCard">
                    <div className="gameCardContainer">
                        <Link
                            onClick={(e) => handleClick(e)}
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
                                style={{ pointerEvents: 'none' }}
                            >
                                <div className="nameContainer">
                                    <p className="gameName">{game.name}</p>
                                </div>
                                <div className="gameInformation">
                                    <div className="metacritic">
                                        <p>Metacritic:</p>
                                        <p
                                            className="gameRating"
                                            style={{
                                                color:
                                                    game.metacritic >= 90
                                                        ? '#00ff00'
                                                        : game.metacritic >= 80
                                                        ? 'lightgreen'
                                                        : game.metacritic > 60
                                                        ? 'yellow'
                                                        : game.metacritic <
                                                              60 &&
                                                          game.metacritic > 0
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
            ))}
        </ul>
    );
};

export default GamesSearch;
