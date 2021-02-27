import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { findGames } from '../../../store/game';
import { findUser } from '../../../store/user';

const SearchIndex = () => {
    let games = useSelector((state) => state.search.games);
    let squads = useSelector((state) => state.search.squads);
    let users = useSelector((state) => state.search.users);

    const history = useHistory();
    const dispatch = useDispatch();

    if (!games || !squads || !users) {
        games = JSON.parse(localStorage.getItem('search')).games;
        squads = JSON.parse(localStorage.getItem('search')).squads;
        users = JSON.parse(localStorage.getItem('search')).users;
    }
    const handleUserResults = (e) => {
        e.preventDefault();
    };

    const handleSquadResults = (e) => {
        e.preventDefault();
    };

    const handleGameResults = async (e) => {
        e.preventDefault();
        const game = await dispatch(findGames(e.target.id));
        localStorage.setItem('gameState', JSON.stringify(game));
        history.push(`/games/${e.target.id}`);
    };

    return (
        <div className="searchResultsInformationContainer">
            <div className="resultsContainer">
                <div className="searchResultsHeader">
                    <div className="searchResultsLabel">
                        <span>Users:</span>
                    </div>
                    {users.length > 5 && (
                        <a href="/search/users/" className="seeAllResults">
                            See all
                        </a>
                    )}
                </div>
                <div className="searchResults">
                    {users.length > 0 ? (
                        users.slice(0, 5).map((user, idx) => (
                            <div className="searchLinkContainer">
                                <a
                                    id={user.username}
                                    onClick={handleUserResults}
                                    key={idx}
                                    href={`/users/${user.username}`}
                                >
                                    {user.username}
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="searchLinkContainer">No results</div>
                    )}
                </div>
            </div>

            <div className="resultsContainer">
                <div className="searchResultsHeader">
                    <span className="searchResultsLabel">Squads:</span>
                    {squads.length > 5 && <a href="/search/squads">See all</a>}
                </div>
                <div className="searchResults">
                    {squads.length > 0 ? (
                        squads.slice(0, 5).map((squad, idx) => (
                            <div key={idx} className="searchLinkContainer">
                                <a
                                    id={squad.squadName}
                                    onClick={handleSquadResults}
                                    href={`/squads/${squad.squadName
                                        .split(' ')
                                        .join('')}`}
                                >
                                    {squad.squadName}
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="searchLinkContainer">No results</div>
                    )}
                </div>
            </div>

            <div className="resultsContainer">
                <div className="searchResultsHeader">
                    <span className="searchResultsLabel">Games:</span>
                    {games.length > 5 && <a href="/search/games">See all</a>}
                </div>
                <div className="searchResults">
                    {games.length > 0 ? (
                        games.slice(0, 5).map((game, idx) => (
                            <div key={idx} className="searchLinkContainer">
                                <a
                                    id={game.name}
                                    onClick={handleGameResults}
                                    href={`/games/${game.name
                                        .replaceAll(
                                            /[&\/\\#,+()$~%.'\-":*?<>{}]/g,
                                            ''
                                        )
                                        .split(' ')
                                        .join('')}`}
                                >
                                    {game.name}
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="searchLinkContainer">No results</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchIndex;
