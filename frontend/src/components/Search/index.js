import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Search = () => {
    const { games, squads, users } = JSON.parse(localStorage.getItem('search'));

    return !games && !squads && !users ? (
        <div className="loading">Loading...</div>
    ) : (
        <div className="searchResultWrapper">
            <div className="searchResultContainer">
                <div className="searchResultHeader">
                    <h1>Hello from Search</h1>
                </div>
            </div>
        </div>
    );
};

export default Search;
