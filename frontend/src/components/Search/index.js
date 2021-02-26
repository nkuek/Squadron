import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Search = () => {
    const dispatch = useDispatch();
    const { searchParam } = useParams();

    return (
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
