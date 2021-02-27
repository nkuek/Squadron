import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import SearchIndex from './SearchIndex';

import './search.css';

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
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
