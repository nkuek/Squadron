import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findGames } from '../../../store/game';
import { findUser } from '../../../store/user';
import { getSearchResults } from '../../../store/search';
import { useState, useEffect } from 'react';

const SearchIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const { searchQuery } = useParams();

    useEffect(async () => {
        await dispatch(getSearchResults(searchQuery));
        setIsLoaded(true);
    }, [dispatch]);

    const users = useSelector((state) => state.search.users);
    const games = useSelector((state) => state.search.games);
    const squads = useSelector((state) => state.search.squads);

    const handleUserResults = async (e) => {
        e.preventDefault();
        await dispatch(findUser(e.target.id));
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadResults = async (e) => {
        e.preventDefault();
    };

    const handleGameResults = async (e) => {
        e.preventDefault();
        const game = await dispatch(findGames(e.target.id));
        history.push(`/games/${e.target.id}`);
    };
    return !isLoaded ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="searchResultsInformationContainer">
            <div className="resultsContainer">
                <div className="searchResultsHeader">
                    <div className="searchResultsLabel">
                        <span>
                            {users.length > 0 && `· ${users.length} result(s)`}
                        </span>
                    </div>
                    {users.length > 5 && (
                        <Link
                            to={`/search/${searchQuery}/users/`}
                            className="seeAllResults"
                        >
                            See all
                        </Link>
                    )}
                </div>
                <div className="searchResults">
                    {users.length > 0 ? (
                        users.slice(0, 5).map((user, idx) => (
                            <div key={idx} className="searchLinkContainer">
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
                    <span className="searchResultsLabel">
                        Squads{' '}
                        {squads.length > 0 && `· ${squads.length} result(s)`}
                    </span>
                    {squads.length > 5 && (
                        <Link to={`/search/${searchQuery}/squads`}>
                            See all
                        </Link>
                    )}
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
                    <span className="searchResultsLabel">
                        Games{' '}
                        {games.length > 0 && `· ${games.length} result(s)`}
                    </span>
                    {games.length > 5 && (
                        <Link to={`/search/${searchQuery}/games`}>See all</Link>
                    )}
                </div>
                <div className="searchResults">
                    {games.length > 0 ? (
                        games.slice(0, 5).map((game, idx) => (
                            <div key={idx} className="searchLinkContainer">
                                <a
                                    id={game.name}
                                    onClick={handleGameResults}
                                    href={`/games/${game.name}`}
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
