import { csrfFetch } from './csrf';

export const SEARCH_QUERY = '/search/searchQuery';

export const search = (searchQuery) => ({
    type: SEARCH_QUERY,
    searchQuery,
});

export const getSearchResults = (searchQuery) => async (dispatch) => {
    const res = await csrfFetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ searchQuery }),
    });

    const searchResults = await res.json();
    dispatch(search(searchResults));
    return searchResults;
};

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return { ...state, ...action.searchQuery };
        default:
            return state;
    }
};

export default searchReducer;
