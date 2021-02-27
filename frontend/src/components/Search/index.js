import { Switch, Route, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import SearchIndex from './SearchIndex';

import './search.css';
import GamesSearch from './GamesSearch';
import UsersSearch from './UsersSearch';
import SquadsSearch from './SquadsSearch';

const Search = () => {
    let games = useSelector((state) => state.search.games);
    let squads = useSelector((state) => state.search.squads);
    let users = useSelector((state) => state.search.users);

    if (!games || !squads || !users) {
        games = JSON.parse(localStorage.getItem('search')).games;
        squads = JSON.parse(localStorage.getItem('search')).squads;
        users = JSON.parse(localStorage.getItem('search')).users;
    }
    const props = { games, squads, users };
    return (
        <div className="searchResultsWrapper">
            <Helmet>
                <title>Search - Squadron</title>
                <meta name="description" content="search results"></meta>
            </Helmet>
            <div className="searchResultsOuterContainer">
                <div className="searchResultsInnerContainer">
                    <div className="searchResultsContainer">
                        <div className="searchResultsTitle">
                            <h1>Search Results</h1>
                        </div>
                        <Switch>
                            <Route exact path="/search/:searchQuery">
                                <SearchIndex {...props} />
                            </Route>
                            <Route path="/search/:searchQuery/games">
                                <GamesSearch games={games} />
                            </Route>
                            <Route path="/search/:searchQuery/users">
                                <UsersSearch users={users} />
                            </Route>
                            <Route path="/search/:searchQuery/squads">
                                <SquadsSearch squads={squads} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
