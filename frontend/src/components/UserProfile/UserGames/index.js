import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AspectRatio } from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';

const UserGames = () => {
    const userProfile = useSelector((state) => state.userProfile);
    const history = useHistory();

    const handleLinkClick = (e) => {
        e.preventDefault();
        sessionStorage.setItem('scrollPosition', window.pageYOffset);
        history.push(`/games/${e.target.id}`);
    };

    const userGames = userProfile && userProfile.usergames;

    return !userGames ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <>
            <div className="userGamesWrapper">
                <div className="userGamesContainer">
                    <div className="userGamesBodyContainer">
                        <div className="userGamesBody">
                            {userGames.length === 0 ? (
                                <>
                                    <div>This is where I'd put my games...</div>
                                    <img src="https://memegenerator.net/img/images/300x300/5724553.jpg"></img>
                                    <div>IF I HAD ANY!</div>
                                </>
                            ) : (
                                <>
                                    <ul>
                                        {userGames.map((game, idx) => (
                                            <li key={idx} className="gameCard">
                                                <div className="gameCardContainer">
                                                    <Link
                                                        onClick={
                                                            handleLinkClick
                                                        }
                                                        id={game.name}
                                                        to={`/games/${game.name}`}
                                                    >
                                                        <AspectRatio
                                                            className="gameImageContainer"
                                                            ratio="16/9"
                                                            style={{
                                                                marginRight:
                                                                    '15px',
                                                                pointerEvents:
                                                                    'none',
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
                                                                pointerEvents:
                                                                    'none',
                                                            }}
                                                        >
                                                            <div className="nameContainer">
                                                                <p className="gameName">
                                                                    {game.name}
                                                                </p>
                                                            </div>
                                                            <div className="gameInformation">
                                                                <div className="metacritic">
                                                                    <p>
                                                                        Metacritic:
                                                                    </p>
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
                                                                        {game.metacritic ===
                                                                        0
                                                                            ? 'N/A'
                                                                            : game.metacritic}
                                                                    </p>
                                                                </div>
                                                                <p className="gameGenres">
                                                                    Genres:{' '}
                                                                    {game.genres
                                                                        ? game.genres.join(
                                                                              ', '
                                                                          )
                                                                        : 'N/A'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserGames;
