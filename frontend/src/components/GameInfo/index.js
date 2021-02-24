import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AspectRatio from 'react-aspect-ratio';
import './game.css';

const GameInfo = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(resetGameState());
    // }, [dispatch]);

    // let game = useSelector((state) => state.game);

    const game = JSON.parse(localStorage.getItem('gameState'));

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
                <div className="gamePageInfoContainer">
                    <div className="metacriticContainer">
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
                                        : game.metacritic < 60 &&
                                          game.metacritic > 0
                                        ? 'red'
                                        : 'white',
                            }}
                        >
                            {game.metacritic === 0 ? 'N/A' : game.metacritic}
                        </p>
                    </div>
                    <div className="metacriticContainer">
                        <p>User Rating:</p>
                        <p
                            className="gameRating"
                            style={{
                                color:
                                    game.rating >= 4
                                        ? '#00ff00'
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
                    <p className="gameReleaseDate">
                        Release Date: {game.released}
                    </p>
                    <p className="gameGenres">
                        Genres:{' '}
                        {game.genres.length > 1
                            ? game.genres.join(', ')
                            : game.genres.length === 1
                            ? game.genres
                            : 'N/A'}
                    </p>
                    <p className="gamePlatforms">
                        Platforms:{' '}
                        {game.platforms.length > 1
                            ? game.platforms.join(', ')
                            : game.platforms.length === 1
                            ? game.platforms
                            : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameInfo;
