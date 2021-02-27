import { Switch, Route, useHistory } from 'react-router-dom';

import SearchIndex from './SearchIndex';

import './search.css';
import GamesSearch from './GamesSearch';

const Search = () => {
    return (
        <div className="searchResultsWrapper">
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
                            <Route path="/search/games/:searchQuery">
                                <GamesSearch />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
