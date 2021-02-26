import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import './search.css';

const Search = () => {
    const { games, squads, users } = JSON.parse(localStorage.getItem('search'));

    return !games && !squads && !users ? (
        <div className="loading">Loading...</div>
    ) : (
        <div className="searchResultsWrapper">
            <div className="searchResultsOuterContainer">
                <div className="searchResultsInnerContainer">
                    <div className="searchResultsContainer">
                        <div className="searchResultsHeader">
                            <h1>Search Results</h1>
                        </div>
                        <div className="searchResultsUsersContainer">
                            <div className="searchResultsUsersHeader">
                                <span className="searchResultsUsers">
                                    Users:
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
