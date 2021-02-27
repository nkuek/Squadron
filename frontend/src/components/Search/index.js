import { Switch, Route, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SearchIndex from './SearchIndex';

import './search.css';
import GamesSearch from './GamesSearch';
import UsersSearch from './UsersSearch';

const Search = () => {
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
                                <SearchIndex />
                            </Route>
                            <Route path="/search/:searchQuery/games">
                                <GamesSearch />
                            </Route>
                            <Route path="/search/:searchQuery/users">
                                <UsersSearch />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
