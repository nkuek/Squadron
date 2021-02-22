import AspectRatio from 'react-aspect-ratio';

const GameInfo = ({ game }) => {
    return (
        <div className="gamePageWrapper">
            <h2 className="gameName" style={{ paddingBottom: '20px' }}>
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
                                        : game.metacritic > 2
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
